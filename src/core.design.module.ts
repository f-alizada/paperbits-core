import { Hinter } from "@paperbits/common/tutorials/hinter";
import { Confirmation } from "./workshops/confirmation/ko/confirmation";
import { LightboxBindingHandler } from "./ko/bindingHandlers/bindingHandlers.lightbox";
import { GridBindingHandler } from "./ko/bindingHandlers/bindingHandlers.grid";
import { DraggablesBindingHandler } from "./ko/bindingHandlers/bindingHandlers.draggables";
import { CoreModule } from "./core.module";
import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { VideoPlayerDesignModule } from "./video-player/videoPlayer.design.module";
import { PictureDesignModule } from "./picture/picture.design.module";
import { YoutubePlayerDesignModule } from "./youtube-player/youtubePlayer.design.module";
import { ButtonEditorModule } from "./button/ko/buttonEditor.module";
import { TestimonialsEditorModule } from "./testimonials/ko/testimonialsEditor.module";
import { ColumnEditorModule } from "./column/ko/columnEditor.module";
import { SectionEditorModule } from "./section/ko/sectionEditor.module";
import { RowEditorModule } from "./row/ko/rowEditor.module";
import { BlockWorkshopModule } from "./workshops/block/ko/block.module";
import { BlogDesignModule } from "./workshops/blog/ko/blog.design.module";
import { PageDesignModule } from "./workshops/page/ko/page.design.module";
import { MediaWorkshopModule } from "./workshops/media/ko/media.module";
import { NavigationWorkshopModule } from "./workshops/navigation/ko/navigation.module";
import { SettingsWorkshopModule } from "./workshops/settings/ko/settings.module";
import { Workshops } from "./workshops/ko/workshops";
import { TextblockEditorModule } from "./textblock/ko/textblockEditor.module";
import { DropbucketModule } from "./workshops/dropbucket/ko/dropbucket.module";
import { ViewportSelector } from "./workshops/viewports/ko/viewport-selector";
import { LocaleSelector, LocaleEditor } from "./workshops/localization/ko";
import { HostBindingHandler, BalloonBindingHandler, ResizableBindingHandler, SurfaceBindingHandler, ContextualCommandBindingHandler } from "./ko/bindingHandlers";
import { MediaHandlers, HtmlEditorProvider } from "@paperbits/common/editing";
import { HyperlinkSelector } from "./workshops/hyperlinks/ko/hyperlinkSelector";
import { WidgetSelector } from "./workshops/widgets/ko/widgetSelector";
import { UrlSelector, UrlHyperlinkDetails } from "./workshops/urls/ko";
import { LayoutDesignModule } from "./layout/ko/layout.design.module";
import { UrlHyperlinkProvider } from "@paperbits/common/urls/urlHyperlinkProvider";
import { MediaHyperlinkProvider } from "@paperbits/common/media";
import { DragManager } from "@paperbits/common/ui/draggables";
import { UnhandledErrorHandler } from "@paperbits/common/errors";
import { PlaceholderViewModel } from "./placeholder/ko/placeholderViewModel";
import { DefaultViewManager, Tooltip } from "./ko/ui";
import { KnockoutValidation } from "./ko/validation/validators";
import { CropperBindingHandler } from "./workshops/cropper/cropper";
import { GridEditor } from "./grid/ko";
import { CardEditorModule } from "./card/ko/cardEditor.module";
import { MediaPermalinkResolver } from "@paperbits/common/media/mediaPermalinkResolver.design";
import { GridEditorModule } from "./grid-layout-section/ko/gridEditor.module";
import { GridCellEditorModule } from "./grid-cell/ko/gridCellEditor.module";
import { Tray } from "./workshops/tray/tray";
import { CollapsiblePanelEditorModule } from "./collapsible-panel/ko";
import { MenuEditorModule } from "./menu/ko";
import { Spinner } from "./ko";
import { DesignerUserService } from "./ko/ui/designerUserService";
import { RoleSelector, RoleInput } from "./workshops/roles/ko";
import "./ko/bindingHandlers/bindingHandlers.dialog";
import "./ko/bindingHandlers/bindingHandlers.activate";
import "./ko/bindingHandlers/bindingHandlers.whenInView";
import { ContentEditorModule } from "./content/ko";
import { ViewStack } from "@paperbits/common/ui/viewStack";
import { MediaDisplay } from "./workshops/media/ko/mediaDisplay";
import { Lightbox } from "./workshops/media/ko/lightbox";
import { MapDesignModule } from "./map/map.design.module";
import { MemoryCache } from "@paperbits/common/caching";
import { CarouselDesignModule } from "./carousel/ko";
import { TabPanelDesignModule } from "./tabs/tabPanel.design.module";
import { TableDesignModule } from "./table/ko";
import { TableCellDesignModule } from "./table-cell/tableCell.design.module";
// import { DividerDesignModule } from "./divider/divider.design.module";
import { LocalStorageSettingsProvider } from "@paperbits/common/configuration";
import { PopupDesignModule, PopupHandlers, PopupModelBinder } from "./popup";
import { Bag } from "@paperbits/common";
import { ComponentBinder } from "@paperbits/common/editing/componentBinder";
import { PopupHostViewModelBinder } from "./popup/ko/popupHostViewModelBinder";
import { PopupEditor, PopupViewModel, PopupViewModelBinder } from "./popup/ko";
import { PopupHost } from "./popup/ko/popupHost";
import { PopupSelector } from "./workshops/popups/ko";
import { PopupPermalinkResolver, PopupService } from "@paperbits/common/popups";
import { PopupHostModelBinder } from "./popup/popupHostModelBinder";
import { DismissButtonDesignModule } from "./dismiss-button/dismissButton.design.module";
import { StickToBindingHandler } from "./ko/bindingHandlers/bindingHandlers.stickTo";


export class CoreDesignModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bindModule(new CoreModule());
        injector.bindCollection("styleGroups");
        injector.bindCollection("dropHandlers");
        injector.bindCollectionLazily("workshopSections");
        injector.bindCollection("trayCommands");
        injector.bindCollection("hyperlinkProviders");
        injector.bindInstance<Bag<ComponentBinder>>("componentBinders", {});
        injector.bindSingleton("viewManager", DefaultViewManager);
        injector.bindSingleton("tray", Tray);
        injector.bindSingleton("viewStack", ViewStack);
        injector.bind("mediaDisplay", MediaDisplay);
        injector.bindSingleton("changesCache", MemoryCache);
        injector.bind("mediaHyperlinkProvider", MediaHyperlinkProvider);
        injector.bind("urlHyperlinkProvider", UrlHyperlinkProvider);
        injector.bind("gridEditor", GridEditor);
        injector.bindToCollection("autostart", KnockoutValidation);
        injector.bindToCollection("autostart", ResizableBindingHandler);
        injector.bindToCollection("autostart", CropperBindingHandler);
        injector.bindToCollection("autostart", BalloonBindingHandler);
        injector.bindToCollection("autostart", UnhandledErrorHandler);
        injector.bindToCollection("autostart", SurfaceBindingHandler);
        injector.bindToCollection("autostart", ContextualCommandBindingHandler);
        injector.bind("tooltip", Tooltip);
        injector.bindSingleton("dragManager", DragManager);
        injector.bindSingleton("lightbox", Lightbox);
        injector.bind("placeholderWidget", PlaceholderViewModel);
        injector.bindSingleton("htmlEditorProvider", HtmlEditorProvider);
        injector.bindSingleton("mediaHandler", MediaHandlers);
        injector.bind("workshops", Workshops);
        injector.bind("viewportSelector", ViewportSelector);
        injector.bind("localeSelector", LocaleSelector);
        injector.bind("localeEditor", LocaleEditor);
        injector.bind("hyperlinkSelector", HyperlinkSelector);
        injector.bind("widgetSelector", WidgetSelector);
        injector.bind("urlSelector", UrlSelector);
        injector.bind("urlHyperlinkDetails", UrlHyperlinkDetails);
        injector.bind("confirmation", Confirmation);
        injector.bind("roleSelector", RoleSelector);
        injector.bind("roleInput", RoleInput);
        injector.bind("spinner", Spinner);
        injector.bind("localSettings", LocalStorageSettingsProvider);
        injector.bindModule(new MapDesignModule());
        injector.bindToCollection("permalinkResolvers", MediaPermalinkResolver, "mediaPermalinkResolver");
        injector.bindModule(new TextblockEditorModule());
        injector.bindModule(new PictureDesignModule());
        injector.bindModule(new ButtonEditorModule());
        injector.bindModule(new VideoPlayerDesignModule());
        injector.bindModule(new YoutubePlayerDesignModule());
        injector.bindModule(new TestimonialsEditorModule());
        injector.bindModule(new MenuEditorModule());
        injector.bindModule(new DropbucketModule());
        injector.bindModule(new PageDesignModule());
        // injector.bindModule(new BlogDesignModule());
        injector.bindModule(new MediaWorkshopModule());
        injector.bindModule(new LayoutDesignModule());
        injector.bindModule(new BlockWorkshopModule());
        injector.bindModule(new NavigationWorkshopModule());
        injector.bindModule(new SettingsWorkshopModule());
        injector.bindModule(new ColumnEditorModule());
        injector.bindModule(new RowEditorModule());
        injector.bindModule(new SectionEditorModule());
        injector.bindModule(new GridEditorModule());
        injector.bindModule(new GridCellEditorModule());
        injector.bindModule(new ContentEditorModule());
        injector.bindModule(new CardEditorModule());
        injector.bindModule(new CollapsiblePanelEditorModule());
        injector.bindModule(new CarouselDesignModule());
        injector.bindModule(new TabPanelDesignModule());
        injector.bindModule(new TableDesignModule());
        injector.bindModule(new TableCellDesignModule());
        injector.bindModule(new DismissButtonDesignModule());

        injector.bind("popup", PopupViewModel);
        injector.bind("popupHost", PopupHost);
        injector.bind("popupEditor", PopupEditor);
        injector.bind("popupSelector", PopupSelector);
        injector.bindSingleton("popupService", PopupService);
        injector.bindToCollection("modelBinders", PopupHostModelBinder, "popupHostModelBinder");
        injector.bindToCollection("viewModelBinders", PopupViewModelBinder);
        injector.bindToCollection("widgetHandlers", PopupHandlers);
        injector.bindToCollection("permalinkResolvers", PopupPermalinkResolver, "popupPermalinkResolver");
        injector.bindToCollection("modelBinders", PopupModelBinder, "popupModelBinder");
        injector.bindToCollection("viewModelBinders", PopupHostViewModelBinder, "popupHostViewModelBinder");

        // injector.bindModule(new DividerDesignModule());
        injector.bindToCollection("hyperlinkProviders", UrlHyperlinkProvider);
        injector.bindToCollection("autostart", HostBindingHandler);
        injector.bindToCollection("autostart", DraggablesBindingHandler);
        injector.bindToCollection("autostart", GridBindingHandler);
        injector.bindToCollection("autostart", LightboxBindingHandler);
        injector.bindToCollection("autostart", StickToBindingHandler);
        injector.bindToCollection("autostart", Hinter);
        injector.bindInstance("reservedPermalinks", ["/", "/404", "/500"]);
        injector.resolve("workshopSections");


        const userService = new DesignerUserService();
        injector.bindInstance("userService", userService);
        injector.bindInstance("designerUserService", userService);
    }
}