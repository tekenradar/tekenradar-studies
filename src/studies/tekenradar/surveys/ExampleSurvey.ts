import { Item, SurveyDefinition } from 'case-editor-tools/surveys/types';
import { SingleChoiceOptionTypes, SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';

class SingleChoiceExample extends Item {
  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'SCG1');

    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Simple single choice question'],
      ]),
      responseOptions: [
        SingleChoiceOptionTypes.option('1',
          new Map([
            ['nl', 'Ja'],
          ]),
        ),
        SingleChoiceOptionTypes.option('0',
          new Map([
            ['nl', 'Nee'],
          ]),
        )
      ]
    })
  }
}


class ExampleSurveyDef extends SurveyDefinition {
  Q1: Item;

  constructor(isRequired?: boolean) {
    super({
      surveyKey: 'EXAMPLE',
      name: new Map([
        ['nl', 'Example survey']
      ]),
      description: new Map([
        ['nl', 'This survey contains different question types, to showcase how these can be used.']
      ]),
      durationText: new Map([
        ['nl', '3 min.']
      ]),
      availableFor: 'public',
    });

    const required = isRequired !== undefined ? isRequired : false;

    this.Q1 = new SingleChoiceExample(this.key, required);

  }


  buildSurvey() {
    this.addItem(this.Q1.get());

  }

}


export const ExampleSurvey = new ExampleSurveyDef(false);


