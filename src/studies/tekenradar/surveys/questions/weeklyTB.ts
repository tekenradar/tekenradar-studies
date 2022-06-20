import { Expression } from 'survey-engine/data_types';
import { Item } from 'case-editor-tools/surveys/types';
import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';


export class IntroWeeklyTBInit extends Item {
  markdownContent = `
# Wekelijkse tekenbeetmeldingen

Met de volgende vragen willen we meten of het aantal tekenbeten per week verandert. Daarom is het belangrijk de vragenlijst te blijven invullen, ook als je langere tijd géén tekenbeten hebt.

Geef het daadwerkelijke aantal tekenbeten op, ook als je meerdere tekenbeten op hetzelfde moment had.
`

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'IntroWeeklyTBInit');

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

export class IntroWeeklyTB extends Item {

  markdownContent = `
# Wekelijkse tekenbeetmeldingen

Met de volgende vraag willen we meten of het aantal tekenbeten per week verandert. Daarom is het belangrijk de vragenlijst te blijven invullen, ook als je langere tijd géén tekenbeten hebt.

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


export class WeeklyTBConsent extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'WeeklyTBConsent');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.consent({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'TODO: consent for weekly tb cohort - only in first one'],
      ]),
      checkBoxLabel: new Map([
        ["nl", "Toestemming geven"],
      ]),
      topDisplayCompoments: [
        ComponentGenerators.markdown({
          content: new Map([
            ["nl", `
TODO: add text
`]]),
        })
      ],
      dialogTitle: new Map([
        ["nl", "Toestemmingsformulier"],
      ]),
      dialogContent: new Map([
        ["nl", `
**Scroll naar beneden om de hele tekst te lezen, geef onderaan wel of geen toestemming.**

TODO: add consent text
        `]]),
      acceptBtn: new Map([
        ["nl", "Ja, ik geef toestemming"],
      ]),
      rejectBtn: new Map([
        ["nl", "Ik doe toch niet mee"],
      ]),
    })
  }
}


export class NewStudies extends Item {
  optionKeys = {
    yes: 'a'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'NewStudies');

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
        ['nl', 'TODO: can we contact you for additional studies in future? (appears only at first)'],
      ]),
      responseOptions: [
        {
          key: this.optionKeys.yes, role: 'option',
          content: new Map([
            ["nl", "Ja"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Nee"],
          ])
        },
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
      questionText: [
        {
          content: new Map([
            ['nl', `Hoeveel tekenbeten had je vandaag, `],
          ])
        },
        {
          date: SurveyEngine.timestampWithOffset({ days: 0 }),
          //dateFormat: 'EEEE (dd.MM)',
          dateFormat: 'EEEE (dd.MM.)',
          languageCodes: ['nl']
        }
      ],
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
      questionText: [
        {
          content: new Map([
            ['nl', `Hoeveel teken had je gisteren `],
          ])
        },
        {
          date: SurveyEngine.timestampWithOffset({ days: -1 }),
          dateFormat: 'EEEE (dd.MM.)',
          languageCodes: ['nl']
        },
        {
          content: new Map([
            ['nl', `?`],
          ])
        },
      ],
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
      questionText: [
        {
          content: new Map([
            ['nl', `Hoeveel teken had je eergisteren, `],
          ])
        },
        {
          date: SurveyEngine.timestampWithOffset({ days: -2 }),
          dateFormat: 'EEEE (dd.MM.)',
          languageCodes: ['nl']
        },
        {
          content: new Map([
            ['nl', `?`],
          ])
        }
      ],
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
      questionText: [
        {
          content: new Map([
            ['nl', `Hoeveel teken had je afgelopen `],
          ])
        },
        {
          date: SurveyEngine.timestampWithOffset({ days: -3 }),
          dateFormat: 'EEEE (dd.MM.)',
          languageCodes: ['nl']
        },
        {
          content: new Map([
            ['nl', `?`],
          ])
        }
      ],
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
      questionText: [
        {
          content: new Map([
            ['nl', `Hoeveel teken had je afgelopen `],
          ])
        },
        {
          date: SurveyEngine.timestampWithOffset({ days: -4 }),
          dateFormat: 'EEEE (dd.MM.)',
          languageCodes: ['nl']
        },
        {
          content: new Map([
            ['nl', `?`],
          ])
        }
      ],
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
      questionText: [
        {
          content: new Map([
            ['nl', `Hoeveel teken had je afgelopen `],
          ])
        },
        {
          date: SurveyEngine.timestampWithOffset({ days: -5 }),
          dateFormat: 'EEEE (dd.MM.)',
          languageCodes: ['nl']
        },
        {
          content: new Map([
            ['nl', `?`],
          ])
        }
      ],
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
      questionText: [
        {
          content: new Map([
            ['nl', `Hoeveel teken had je afgelopen `],
          ])
        },
        {
          date: SurveyEngine.timestampWithOffset({ days: -6 }),
          dateFormat: 'EEEE (dd.MM.)',
          languageCodes: ['nl']
        },
        {
          content: new Map([
            ['nl', `?`],
          ])
        }
      ],
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

