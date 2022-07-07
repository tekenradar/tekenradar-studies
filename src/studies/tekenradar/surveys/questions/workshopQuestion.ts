import { SurveyItems } from "case-editor-tools/surveys";
import { Item } from "case-editor-tools/surveys/types";


export class EntryQ1 extends Item {
  optionKeys = {
    yes: 'a',
    no: 'b',
  }

  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'Q1');

    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Question 1 of the entry survey?'],
      ]),
      responseOptions: [
        {
          key: this.optionKeys.yes, role: 'option',
          content: new Map([
            ["nl", "Ja"],
          ])
        },
        {
          key: this.optionKeys.no, role: 'option',
          content: new Map([
            ["nl", "Nee"],
          ])
        }
      ]
    })
  }
}

export class EntryQ2 extends Item {
  optionKeys = {
    yes: 'a',
    no: 'b',
  }

  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'Q2');

    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Question 2 of the entry survey?'],
      ]),
      responseOptions: [
        {
          key: this.optionKeys.yes, role: 'option',
          content: new Map([
            ["nl", "Ja"],
          ])
        },
        {
          key: this.optionKeys.no, role: 'option',
          content: new Map([
            ["nl", "Nee"],
          ])
        }
      ]
    })
  }
}
