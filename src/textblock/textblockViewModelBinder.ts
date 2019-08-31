import { TextblockModel } from "./textblockModel";
import { TextblockViewModel } from "./ko/textblockViewModel";
import { ViewModelBinder } from "@paperbits/common/widgets";
import { IEventManager } from "@paperbits/common/events";
import { Bag } from "@paperbits/common";

export class TextblockViewModelBinder implements ViewModelBinder<TextblockModel, TextblockViewModel> {
    constructor(
        private readonly htmlEditorFactory,
        private readonly eventManager: IEventManager
    ) { }

    public async modelToViewModel(model: TextblockModel, viewModel?: TextblockViewModel, bindingContext?: Bag<any>): Promise<TextblockViewModel> {
        if (!viewModel) {
            viewModel = new TextblockViewModel(this.htmlEditorFactory.createHtmlEditor());
        }

        model.htmlEditor = viewModel.htmlEditor;

        viewModel.state(model.state);
        // textblockViewModel.readonly(!!model.readonly);

        const widgetBinding /*: IWidgetBinding */ = {
            displayName: "Text",
            readonly: bindingContext ? bindingContext.readonly : false,
            model: model,
            flow: "block",
            editor: "html-editor",
            editorResize: "horizontally",
            applyChanges: (changes) => {
                this.modelToViewModel(model, viewModel, bindingContext);
                this.eventManager.dispatchEvent("onContentUpdate");
            }
        };

        viewModel["widgetBinding"] = widgetBinding;

        return viewModel;
    }

    public canHandleModel(model: TextblockModel): boolean {
        return model instanceof TextblockModel;
    }
}