import { SurveyItems } from "case-editor-tools/surveys";
import { Item } from "case-editor-tools/surveys/types";

export class Q1 extends Item {
  // 1: Attributes
  // --

  // 2: init
  constructor(
    parentKey: string,
    // optional attribute
  ) {
    const itemKey = "Q1";
    super(parentKey, itemKey);
  }


  // 3: build
  buildItem() {
    return SurveyItems.singleChoice({
      // do not change:
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      // custimise here:
      questionText: new Map([
        ['en', 'Do you like the color green?'],
      ]),
      responseOptions: [
        { key: '0', role: 'option', content: new Map([['en', 'No']]) },
        { key: '1', role: 'option', content: new Map([['en', 'Maybe']]) },
      ]
    });
  }
}
