import { Expression, SurveyGroupItem, SurveyItem, SurveySingleItem } from 'survey-engine/lib/data_types';
import { SurveyDefinition, Group, Item } from 'case-editor-tools/surveys/types';
import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';


export class Age extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Age');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.numericInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Wat is de leeftijd van degene voor wie deze melding wordt gedaan?'],
      ]),
      titleClassName: 'sticky-top',
      inputMaxWidth: '80px',
      content: new Map([
        ['nl', 'jaar']
      ]),
      contentBehindInput: true,
      componentProperties: {
        min: 0,
        max: 120
      }
    })
  }
}

//free text input
export class Residence extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Res');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.multilineTextInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Woonplaats van de persoon met de tekenbeet:'],
      ]),
      titleClassName: 'sticky-top',
    })
  }
}


class Gender extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'gender');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Geslacht.'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Man"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Vrouw"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "Geen van bovenstaande"],
          ])
        },
      ]
    })
  }
}

