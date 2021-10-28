import { Expression, SurveySingleItem } from "survey-engine/lib/data_types";


export abstract class Item {
    key: string;
    item: SurveySingleItem;
    protected itemKey: string;
    protected parentKey: string;

    protected condition?: Expression;
    protected isRequired?: boolean;

    constructor(parentKey: string, itemKey: string) {
        this.parentKey = parentKey;
        this.itemKey = itemKey;
        this.key = [this.parentKey, itemKey].join('.');
        this.item = {
            version: 0,
            key: "not defined"
        }
    }

    abstract buildItem(): SurveySingleItem;

    /**
     * Check if this item is currently part of a path, by checking if the key attribute exists in the path of the group.
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
        this.item = this.buildItem();
        return this.item;
    }
}
