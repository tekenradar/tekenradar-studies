import { Expression } from 'survey-engine/data_types';
import { Item } from 'case-editor-tools/surveys/types';
import { SurveyItems } from 'case-editor-tools/surveys';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';


export class CovidHeader extends Item {

  markdownContent = `
# Coronavirus (COVID-19)

    `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Covid19');

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

export class Covid1 extends Item {

  optionKeys = {
    yes: 'a'
  }
  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Heb je in de '],
      ]),
    },
    {
      content: new Map([
        ["nl", "afgelopen 5 jaar "],
      ]),
      className: "text-primary"
    },
    {
      content: new Map([
        ["nl", "last gehad van langdurige klachten na een infectie met het coronavirus (post-COVID of Long COVID)? "],
      ])
    }]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'COV1');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      questionSubText: new Map([
        ['nl',
          'Met langdurige klachten bedoelen we klachten die langer dan twee maanden aanhouden en binnen drie maanden na coronavirusinfectie ontstaan zijn.'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
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

export class Covid2 extends Item {
  constructor(parentKey: string, required: boolean, condition?: Expression) {
    super(parentKey, 'COV2');


    this.condition = condition;
    this.isRequired = required;
  }
  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Wanneer kreeg je de coronavirus infectie, waarna je langdurig klachten hield? '],
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


export class Covid3a extends Item {
  constructor(parentKey: string, required: boolean, condition?: Expression) {
    super(parentKey, 'COV3a');

    this.condition = condition;
    this.isRequired = required;
  }
  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Sinds wanneer heb je last van langdurige klachten na de coronavirus infectie? '],
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

export class Covid3b extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Welke langdurige klachten na de coronavirus infectie had of heb je? '],
      ]),
    },
    {
      content: new Map([
        ["nl", " (meerdere antwoorden mogelijk)"],
      ]),
      className: "fw-normal"
    },
  ]


  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'COV3b');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.multipleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Vermoeidheid"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Concentratieproblemen"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "Slaapproblemen"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "Hoofdpijn"],
          ])
        },
        {
          key: 'e', role: 'option',
          content: new Map([
            ["nl", "Spierpijn/gewrichtspijn (niet sportgerelateerd)"],
          ])
        },
        {
          key: 'f', role: 'option',
          content: new Map([
            ["nl", "Zenuwpijn"],
          ])
        },
        {
          key: 'g', role: 'option',
          content: new Map([
            ["nl", "Kortademig (snel buiten adem) of benauwd"],
          ])
        },
        {
          key: 'h', role: 'option',
          content: new Map([
            ["nl", "Verergering van klachten bij inspanning (PEM, post-exertionele malaise)"],
          ])
        },
        {
          key: 'i', role: 'option',
          content: new Map([
            ["nl", "Duizeligheid en hartkloppingen bij opstaan of oprichten (POTS, posturaal orthostatische tachycardiesydroom)"],
          ])
        },
        {
          key: 'j', role: 'option',
          content: new Map([
            ["nl", "Reuk- of smaakverlies"],
          ])
        },
        //TODO: text field mandatory or not?
        {
          key: 'k', role: 'input',
          content: new Map([
            ["nl", "Andere klachten, namelijk:"],
          ])
        },
      ]
    })
  }
}


export class Covid3c extends Item {

  optionKeys = {
    daily: 'a',
    weekly: 'b',
    monthly: 'c',
    sometimes: 'd',
    other: 'e'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'COV3c');

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
        ['nl', 'Ervaar je deze klachten dagelijks of periodiek?'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Dagelijks"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Wekelijks"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "Elke maand"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "Minder dan een keer per maand"],
          ])
        },
        {
          key: 'e', role: 'input',
          content: new Map([
            ["nl", "Anders, namelijk:"],
          ])
        },
      ]
    })
  }
}


export class Covid4 extends Item {

  optionKeys = {
    no: 'b'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'COV4');

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
        ['nl', 'Heb je nog steeds langdurige klachten na een infectie met het coronavirus?'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
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


export class Covid5 extends Item {
  constructor(parentKey: string, required: boolean, condition?: Expression) {
    super(parentKey, 'COV5');

    this.condition = condition;
    this.isRequired = required;
  }
  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Vanaf wanneer waren de langdurige klachten na het coronavirus weg? '],
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
      // minRelativeDate: { delta: { years: -19 } },
    })
  }
}

