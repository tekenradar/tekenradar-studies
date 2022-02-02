import { Expression, SurveySingleItem } from 'survey-engine/data_types';
import { Item } from 'case-editor-tools/surveys/types';
import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';
import { SingleChoiceOptionTypes as SCOptions, ClozeItemTypes } from 'case-editor-tools/surveys';


export class IntroWeeklyTB extends Item {

  markdownContent = `
# Wekelijkse tekenbeetmeldingen

Met de volgende vragen willen we meten of het aantal tekenbeten per week verandert. Daarom is het belangrijk de vragenlijst te blijven invullen, ook als je langere tijd géén tekenbeten hebt.

Geef het daadwerkelijke aantal tekenbeten op, ook als je meerdere tekenbeten op hetzelfde moment had.
`

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'IntroWeeklyTB');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.display({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      content: [
        ComponentGenerators.markdown({
          content: new Map([
            ["nl", this.markdownContent],
          ]),
          className: ''
        })
      ]
    })
  }
}


export class NumberTickBitesWeekly extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'WeeklyTB1');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.numericInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: //SurveyEngine.timestampWithOffset({ seconds: 0 }),
      new Map([
        ['nl', 'Hoeveel tekenbeten heb je gehad in de afgelopen week?'],
      ]),
      titleClassName: 'sticky-top',
      inputMaxWidth: '80px',
      inputLabel: new Map([
        ['nl', '']
      ]),
      componentProperties: {
        min: 0,
        max: 100
      }
    })
  }
}



export class NumberTickBites2a extends Item {

  date = new Date();

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'WeeklyTB2a');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.numericInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText:
      new Map([//TODO Peter: Insert current date as format: "week day (day.month.)" example: "zondag (19 december)"
        ['nl', `Hoeveel tekenbeten had je vandaag ${this.date.getDay()}.${this.date.getMonth()}.?`],
      ]),
      titleClassName: 'sticky-top',
      inputMaxWidth: '80px',
      inputLabel: new Map([
        ['nl', '']
      ]),
      componentProperties: {
        min: 0,
        max: 100
      }
    })
  }
}


export class NumberTickBites2b extends Item {

  date = new Date();

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'WeeklyTB2b');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.numericInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText:
      new Map([//TODO Peter: Insert current date as format: "week day (day.month.)" example: "zondag (19 december)"
        ['nl', `Hoeveel teken had je gisteren ?`],
      ]),
      titleClassName: 'sticky-top',
      inputMaxWidth: '80px',
      inputLabel: new Map([
        ['nl', '']
      ]),
      componentProperties: {
        min: 0,
        max: 100
      }
    })
  }
}


export class NumberTickBites2c extends Item {

  date = new Date();

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'WeeklyTB2c');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.numericInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText:
      new Map([//TODO Peter: Insert current date as format: "week day (day.month.)" example: "zondag (19 december)"
        ['nl', `Hoeveel teken had je eergisteren,?`],
      ]),
      titleClassName: 'sticky-top',
      inputMaxWidth: '80px',
      inputLabel: new Map([
        ['nl', '']
      ]),
      componentProperties: {
        min: 0,
        max: 100
      }
    })
  }
}


export class NumberTickBites2d extends Item {

  date = new Date();

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'WeeklyTB2d');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.numericInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText:
      new Map([//TODO Peter: Insert current date as format: "week day (day.month.)" example: "zondag (19 december)"
        ['nl', `Hoeveel teken had je afgelopen ?`],
      ]),
      titleClassName: 'sticky-top',
      inputMaxWidth: '80px',
      inputLabel: new Map([
        ['nl', '']
      ]),
      componentProperties: {
        min: 0,
        max: 100
      }
    })
  }
}


export class NumberTickBites2e extends Item {

  date = new Date();

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'WeeklyTB2e');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.numericInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText:
      new Map([//TODO Peter: Insert current date as format: "week day (day.month.)" example: "zondag (19 december)"
        ['nl', `Hoeveel teken had je afgelopen ?`],
      ]),
      titleClassName: 'sticky-top',
      inputMaxWidth: '80px',
      inputLabel: new Map([
        ['nl', '']
      ]),
      componentProperties: {
        min: 0,
        max: 100
      }
    })
  }
}



export class NumberTickBites2f extends Item {

  date = new Date();

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'WeeklyTB2f');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.numericInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText:
      new Map([//TODO Peter: Insert current date as format: "week day (day.month.)" example: "zondag (19 december)"
        ['nl', `Hoeveel teken had je afgelopen ?`],
      ]),
      titleClassName: 'sticky-top',
      inputMaxWidth: '80px',
      inputLabel: new Map([
        ['nl', '']
      ]),
      componentProperties: {
        min: 0,
        max: 100
      }
    })
  }
}



export class NumberTickBites2g extends Item {

  date = new Date();

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'WeeklyTB2g');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.numericInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText:
      new Map([//TODO Peter: Insert current date as format: "week day (day.month.)" example: "zondag (19 december)"
        ['nl', `Hoeveel teken had je afgelopen ?`],
      ]),
      titleClassName: 'sticky-top',
      inputMaxWidth: '80px',
      inputLabel: new Map([
        ['nl', '']
      ]),
      componentProperties: {
        min: 0,
        max: 100
      }
    })
  }
}


export class OutroWeeklyTB extends Item {

  markdownContent = `
##### Hartelijk dank voor het invullen van deze vragen. Volgende week sturen we je weer een email om te vragen hoeveel tekenbeten je hebt gehad.
`

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'OutroWeeklyTB');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.display({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      content: [
        ComponentGenerators.markdown({
          content: new Map([
            ["nl", this.markdownContent],
          ]),
          className: ''
        })
      ]
    })
  }
}


export class RemarkWeeklyTB extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'RWeeklyTB');

    this.isRequired = isRequired;
    this.condition = condition;
  }
  //TODO: size of text input field?
  buildItem() {
    return SurveyItems.multilineTextInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Als je nog extra informatie bij bovenstaande vragen hebt kun je dit hieronder invullen. (Let op: deze informatie wordt bij de door jou ingevulde vragenlijst opgeslagen en niet direct door de onderzoekers bekeken.)'],
      ]),
      inputLabelText: new Map([
        ['nl', 'Insturen opmerking:'],
      ]),
    })
  }
}
