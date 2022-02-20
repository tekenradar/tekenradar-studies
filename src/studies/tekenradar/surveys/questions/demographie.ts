import { Expression, SurveyGroupItem, SurveyItem, SurveySingleItem } from 'survey-engine/data_types';
import { SurveyDefinition, Group, Item } from 'case-editor-tools/surveys/types';
import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';
import { inputKey, responseGroupKey, singleChoiceKey } from "case-editor-tools/constants/key-definitions";
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';
import { toEditorSettings } from 'typescript';
import { SurveyEditor } from 'case-editor-tools/surveys/survey-editor/survey-editor';
import { expWithArgs, generateLocStrings } from 'case-editor-tools/surveys/utils/simple-generators';


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
      inputLabel: new Map([
        ['nl', 'jaar']
      ]),
      labelBehindInput: true,
      componentProperties: {
        min: 0,
        max: 120
      }
    })
  }
}


export class Residence extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'P1');

    this.isRequired = isRequired;
    this.condition = condition;

  }

  buildItem() {
    return SurveyItems.textInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Wat zijn de 4 cijfers van je postcode?'],
      ]),
      titleClassName: 'sticky-top',
      customValidations: [
        {
          key: 'r2',
          type: 'hard',
          rule: SurveyEngine.logic.or(
            expWithArgs('not', expWithArgs('hasResponse', this.key, responseGroupKey)),
            expWithArgs('checkResponseValueWithRegex', this.key, [responseGroupKey, inputKey].join('.'), '^[0-9][0-9][0-9][0-9]$'),
          )
        }
      ],
      bottomDisplayCompoments: [
        {
          role: 'error',
          content: generateLocStrings(new Map([
            ["nl", "Voer de eerste vier cijfers van je postcode in"],
          ])),
          displayCondition: expWithArgs('not', expWithArgs('getSurveyItemValidation', 'this', 'r2'))
        }
      ]
    })
  }
}


export class Gender extends Item {
  optionKeys = {
    male: 'a',
    female: 'b',
    other: 'c',
    unknown: 'd',
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'P2');

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
        ['nl', 'Wat is je geslacht?'],
      ]),
      responseOptions: [
        {
          key: this.optionKeys.male, role: 'option',
          content: new Map([
            ["nl", "Man"],
          ])
        },
        {
          key: this.optionKeys.female, role: 'option',
          content: new Map([
            ["nl", "Vrouw"],
          ])
        },
        {
          key: this.optionKeys.other, role: 'option',
          content: new Map([
            ["nl", "Geen van bovenstaande"],
          ])
        },
        {
          key: this.optionKeys.unknown, role: 'option',
          content: new Map([
            ["nl", "Wil ik niet zeggen"],
          ])
        },
      ]
    })
  }
}
