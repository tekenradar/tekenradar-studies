import { SurveyItems } from "case-editor-tools/surveys";
import { Group, Item } from "case-editor-tools/surveys/types";

export class Group1 extends Group {
  // 1:
  Q1: Q1;
  Q2: Q2;

  // 2:
  constructor(parentKey: string) {
    super(parentKey, 'Group1')

    // <parent>.Group1

    this.Q1 = new Q1(this.key, true);
    // this.Q1 = new Q1(this.key, false);
    this.Q2 = new Q2(this.key);
  }

  // 3:
  buildGroup() {
    this.addItem(this.Q2.get());
    this.addPageBreak();
    this.addItem(this.Q1.get());
  }

}

class Q1 extends Item {
  // 1: Attributes
  // --

  // 2: init
  constructor(
    parentKey: string,
    isRequired: boolean,
    // optional attribute
  ) {
    const itemKey = "Q1";
    super(parentKey, itemKey);

    this.isRequired = isRequired;
  }


  // 3: build
  buildItem() {
    return SurveyItems.singleChoice({
      // do not change:
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      // customise here:
      questionText: new Map([
        ['en', 'Do you like the color red?'],
      ]),
      responseOptions: [
        { key: '0', role: 'option', content: new Map([['en', 'No']]) },
        { key: '1', role: 'option', content: new Map([['en', 'Maybe']]) },
        { key: '1', role: 'option', content: new Map([['en', 'Maybe']]) },
      ]
    });
  }
}


class Q2 extends Item {
  // 1: Attributes
  // --

  // 2: init
  constructor(
    parentKey: string,
    // optional attribute
  ) {
    const itemKey = "Q2";
    super(parentKey, itemKey);
  }


  // 3: build
  buildItem() {
    return SurveyItems.multipleChoice({
      // do not change:
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      // custimise here:
      questionText: new Map([
        ['en', 'What other colors do you like?'],
      ]),
      responseOptions: [
        { key: '0', role: 'option', content: new Map([['en', 'yellow']]) },
        { key: '1', role: 'option', content: new Map([['en', 'grey']]) },
      ]
    });
  }
}
