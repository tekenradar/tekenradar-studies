import { Expression, SurveyItem } from "survey-engine/lib/data_types";
import { ItemEditor } from "../survey-editor/item-editor";
import { generatePageBreak } from "../utils/simple-generators";

export abstract class Group {
    groupEditor: ItemEditor;
    key: string;
    private parentKey: string;

    constructor(parentKey: string, groupKey: string, selectionMethod?: Expression) {
        this.parentKey = parentKey;
        this.key = [this.parentKey, groupKey].join('.');
        this.groupEditor = new ItemEditor(undefined, {
            itemKey: this.key,
            isGroup: true
        });
        if (!selectionMethod) {
            this.groupEditor.setSelectionMethod({ name: 'sequential' });
        } else {
            this.groupEditor.setSelectionMethod(selectionMethod);
        }
    }

    abstract buildGroup(): void;

    /**
     * Check if this group is currently part of a path, by checking if the key attribute exists in the path of the group.
     * @param partialKey Is this key segment included somewhere in the parent key of this item.
     * @returns
     */
    isPartOf(partialKey: string): boolean {
        return this.parentKey.includes(partialKey)
    }

    /**
     * Use this method to retrieve the generated survey item
     * @returns
     */
    get() {
        this.buildGroup();
        return this.groupEditor.getItem();
    }

    addPageBreak() {
        this.groupEditor.addSurveyItem(generatePageBreak(this.key));
    }

    addItem(item: SurveyItem, pageBreakAfter?: boolean) {
        this.groupEditor.addSurveyItem(item);
        if (pageBreakAfter) {
            this.addPageBreak();
        }
    }
}
