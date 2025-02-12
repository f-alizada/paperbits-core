import { DragSession } from "@paperbits/common/ui/draggables";
import { ViewManager, IContextCommandSet } from "@paperbits/common/ui";
import { switchToParentCommand } from "@paperbits/common/ui/commands";
import { IWidgetHandler, WidgetContext } from "@paperbits/common/editing";
import { WidgetModel } from "@paperbits/common/widgets";


export class ContentHandlers implements IWidgetHandler {
    constructor(private readonly viewManager: ViewManager) { }

    public canAccept(dragSession: DragSession): boolean {
        return dragSession.sourceBinding.name === "section";
    }

    public getContextCommands(context: WidgetContext): IContextCommandSet {
        const contextCommands: IContextCommandSet = {};
        const activeLayer = this.viewManager.getActiveLayer();

        if (context.model.widgets.length === 0 && activeLayer === context.model["type"]) {
            contextCommands.hoverCommands = [{
                controlType: "toolbox-button",
                color: "#2b87da",
                iconClass: "paperbits-icon paperbits-simple-add",
                position: "center",
                tooltip: "Add section",
                component: {
                    name: "grid-layout-selector",
                    params: {
                        heading: "Add section",
                        onSelect: (model: WidgetModel) => {
                            context.model.widgets.push(model);
                            context.binding.applyChanges();
                            this.viewManager.clearContextualCommands();
                        }
                    }
                }
            }];
        }
        else {
            contextCommands.hoverCommands = [];
        }

        contextCommands.selectCommands = [
            switchToParentCommand(context)
        ];

        return contextCommands;
    }
}