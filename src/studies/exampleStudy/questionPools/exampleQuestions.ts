import { SurveyItems } from 'case-editor-tools/surveys';
import { Item } from 'case-editor-tools/surveys/types';

export class Q1 extends Item {
  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'Q1')
    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      // do not change:
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      // change:
      questionText: new Map([
        ['en', 'Question text']
      ]),
      responseOptions: [
        { key: '1', role: 'option', content: new Map([['en', 'Option 1 with nice text']]) },
        { key: '2', role: 'option', content: new Map([['en', 'Option 2']]) },
      ]
    });
  }
}
