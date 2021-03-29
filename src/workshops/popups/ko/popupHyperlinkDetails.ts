import * as ko from "knockout";
import template from "./popupHyperlinkDetails.html";
import { Component, Param, Event, OnMounted } from "@paperbits/common/ko/decorators";
import { HyperlinkModel } from "@paperbits/common/permalinks";


@Component({
    selector: "popup-hyperlink-details",
    template: template
})
export class PopupHyperlinkDetails {
    public target: ko.Observable<string>;

    constructor() {
        this.target = ko.observable();
    }

    @Param()
    public hyperlink: HyperlinkModel;

    @Event()
    public onHyperlinkChange: (hyperlink: HyperlinkModel) => void;

    @OnMounted()
    public async initialize(): Promise<void> {
        this.target(this.hyperlink.target);
        this.target.subscribe(this.applyChanges);
    }

    public applyChanges(): void {
        this.hyperlink.target = this.target();

        if (this.onHyperlinkChange) {
            this.onHyperlinkChange(this.hyperlink);
        }
    }
 }