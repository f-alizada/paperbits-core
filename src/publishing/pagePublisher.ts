import * as Utils from "@paperbits/common/utils";
import { IPublisher, HtmlPage, HtmlPagePublisher } from "@paperbits/common/publishing";
import { IBlobStorage } from "@paperbits/common/persistence";
import { IPageService, PageContract } from "@paperbits/common/pages";
import { ISiteService } from "@paperbits/common/sites";
import { SitemapBuilder } from "./sitemapBuilder";


export class PagePublisher implements IPublisher {
    constructor(
        private readonly pageService: IPageService,
        private readonly siteService: ISiteService,
        private readonly outputBlobStorage: IBlobStorage,
        private readonly htmlPagePublisher: HtmlPagePublisher
    ) {
    }

    public async renderPage(page: HtmlPage): Promise<string> {
        const htmlContent = await this.htmlPagePublisher.createHtml(page);
        return "<!DOCTYPE html>" + htmlContent;
    }

    public async publish(): Promise<void> {
        const pages = await this.pageService.search("");
        const results = [];
        const settings = await this.siteService.getSiteSettings();
        const sitemapBuilder = new SitemapBuilder(settings.site.hostname);

        const renderAndUpload = async (page: PageContract): Promise<void> => {
            const htmlPage: HtmlPage = {
                title: [page.title, settings.site.title].join(" - "),
                description: page.description || settings.site.description,
                keywords: page.keywords || settings.site.keywords,
                permalink: page.permalink,
                author: settings.site.author,
                openGraph: {
                    type: page.permalink === "/" ? "website" : "article",
                    title: page.title,
                    description: page.description || settings.site.description,
                    url: page.permalink,
                    siteName: settings.site.title
                    // image: { ... }
                }
            };

            const htmlContent = await this.renderPage(htmlPage);

            let permalink = page.permalink;

            const regex = /\/[\w]+\.html$/gm;
            const isHtmlFile = regex.test(permalink);

            if (!isHtmlFile) {
                /* if filename has no *.html extension we publish it to a dedicated folder with index.html */
                permalink = `${permalink}/index.html`;
            }

            const contentBytes = Utils.stringToUnit8Array(htmlContent);
            await this.outputBlobStorage.uploadBlob(permalink, contentBytes, "text/html");
        };

        for (const page of pages) {
            results.push(renderAndUpload(page));
            sitemapBuilder.appendPermalink(page.permalink);
        }

        await Promise.all(results);

        const sitemap = sitemapBuilder.buildSitemap();
        const contentBytes = Utils.stringToUnit8Array(sitemap);
        await this.outputBlobStorage.uploadBlob("sitemap.xml", contentBytes, "text/xml");
    }
}