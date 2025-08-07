import { Expression } from 'survey-engine/data_types';
import { Item } from 'case-editor-tools/surveys/types';
import { SurveyItems } from 'case-editor-tools/surveys';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';
import { SingleChoiceOptionTypes as SCOptions, ClozeItemTypes } from 'case-editor-tools/surveys';


export class ReportHeader extends Item {

  markdownContent = `
### Melding
  `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'RepHeader');

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



export class EMTextKids extends Item {

  markdownContent = `
### Melding

De vragen hieronder zijn voor een minderjarige.

Ben je een ouder/verzorger dan kun je de antwoorden invullen voor/over je kind.
  `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'EMTextK');

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


export class EMHeader extends Item {

  markdownContent = `
# Erythema migrans

De volgende vragen gaan over je melding van erythema migrans.
  `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'EMHeader');

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

export class EMHeaderKids extends Item {

  markdownContent = `
# Erythema migrans

De vragen hieronder zijn voor een minderjarige. Ben je de ouder/verzorger dan kun je de antwoorden invullen voor/over je kind.
  `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'EMHeaderKids');

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


export class EM_B1 extends Item {
  optionKeys = {
    period: {
      key: 'a',
      dateValue: '2'
    },
    unknown: 'b'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'EM_B1');

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
        ['nl', 'Wanneer ontwikkelde zich de erythema migrans die je nu meldt?'],
      ]),
      responseOptions: [
        //TODO: correct date conditions and date field smaller.
        SCOptions.cloze({
          key: this.optionKeys.period.key, items: [
            ClozeItemTypes.text({
              key: '1', content: new Map(
                [['nl', "De erythema migrans ontwikkelde zich op"]]
              )
            }),
            ClozeItemTypes.dateInput({
              dateInputMode: 'YMD',
              key: this.optionKeys.period.dateValue,
            }),
            ClozeItemTypes.clozeLineBreak(),
            ClozeItemTypes.text({
              key: '3',
              content: new Map(
                [['nl', "Dit is de "]]
              )
            }),
            ClozeItemTypes.dropDown({
              key: '4', options: [
                SCOptions.option('1', new Map([['nl', "precieze"]])),
                SCOptions.option('2', new Map([['nl', "geschatte"]]))
              ]
            }),
            ClozeItemTypes.text({
              key: '5',
              content: new Map(
                [['nl', " datum."]]
              )
            }),
          ]
        }),
        {
          key: this.optionKeys.unknown, role: 'option',
          content: new Map([
            ["nl", "Onbekend"],
          ])
        },
      ]
    })
  }
}


export class EM_B2 extends Item {
  optionKeys = {
    yes: 'a',
    no: 'b'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'EM_B2');

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
        ['nl', 'Is de erythema migrans op dit moment nog zichtbaar?'],
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
        },
      ]
    })
  }
}



export class EM_B3 extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'EM_B3');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {//NOTE: input instead of dropdown
    return SurveyItems.numericInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Hoe groot is de erythema migrans?'],
      ]),
      questionSubText: new Map([
        ['nl', 'Meet hiervoor de doorsnede van de vlek, zie het voorbeeld op de foto. Als de EM niet meer zichtbaar is, maak dan een zo goed mogelijke schatting.'],
      ]),
      titleClassName: 'sticky-top',
      inputMaxWidth: '80px',
      inputLabel: new Map([
        ['nl', 'cm']
      ]),
      labelBehindInput: true,
      //contentBehindInput: true,
      componentProperties: {
        min: 0,
        max: 100
      },
      bottomDisplayCompoments: [
        ComponentGenerators.markdown({
          className: 'mt-2',
          content: new Map([
            ['nl', `
<img src="https://www.tekenradar.nl/assets/images/survey-content/em_example.png" width="100%" style="max-width: 500px"/>
            `]
          ])
        })
      ]
    })
  }
}



export class DoctorEM extends Item {

  optionKeys = {
    yes: 'a'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'EM_B4');

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
        ['nl', 'Ben je bij een arts geweest voor je erythema migrans?'],
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



export class EM_B6 extends Item {
  optionKeys = {
    yes: 'a',
    no: 'b'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'EM_B6');

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
        ['nl', 'Was de rode ring of vlek volgens je arts ontstaan door een tekenbeet?'],
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
        },
      ]
    })
  }
}


export class PhotoEM_Text extends Item {

  markdownContent = `
## Uploaden foto

Wij vragen je om een foto van je erythema migrans of andere huidafwijking door de ziekte van Lyme. Mocht je nu geen foto kunnen uploaden, dan ontvang je een herinnering per e-mail om dat later alsnog te doen. 
Heb je geen huidafwijking door de ziekte van Lyme dan kun je deze vraag overslaan.

Om een goed beeld te krijgen van de schaal van de foto vragen wij het een lineaal of meetlint (of een voorwerp met een standaardgrootte zoals een muntstuk) naast de huidafwijking op de foto te zetten. Zie de voorbeeldfoto.

<img src="https://www.tekenradar.nl/assets/images/survey-content/em_example.png" width="100%" style="max-width: 500px"/>
`

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'PhotoEMT');

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


export class UploadPhotoEM extends Item {
  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'PhotoEM');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.customQuestion({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Selecteer hier de foto van je erythema migrans of andere huidafwijking'],
      ]),
      responseItemDefs: [
        {
          key: 'file', role: 'file', mapToRole: 'input',
        }
      ]
    })
  }
}

export class DatePhotoEM extends Item {
  constructor(parentKey: string, required: boolean, condition?: Expression) {
    super(parentKey, 'DatePhotoEM');

    this.condition = condition;
    this.isRequired = required;
  }
  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Wanneer is deze foto genomen?'],
      ]),
    },
    {
      content: new Map([
        ["nl", "(je mag de datum schatten)"],
      ]),
      className: "fw-normal"
    },
  ]

  buildItem() {
    return SurveyItems.dateInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      isRequired: this.isRequired,
      questionText: this.questionTextMain,
      dateInputMode: 'YMD',
      maxRelativeDate: { delta: { days: 0 } },
      minRelativeDate: { delta: { years: -19 } },
    })
  }
}