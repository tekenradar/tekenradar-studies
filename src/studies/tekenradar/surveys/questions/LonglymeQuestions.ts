import { Expression } from 'survey-engine/data_types';
import { Item } from 'case-editor-tools/surveys/types';
import { SurveyEngine, SurveyItems, MultipleChoiceOptionTypes as MCOptions, ClozeItemTypes } from 'case-editor-tools/surveys';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';


export class LonglymeHeader extends Item {

  markdownContent = `
# Langdurige klachten na de ziekte van Lyme

    `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'LLH');

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

export class Longlyme1 extends Item {

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
        ["nl", "afgelopen jaren "],
      ]),
      className: "text-primary"
    },
    {
      content: new Map([
        ["nl", '—sinds start van deelname aan het voorgaande LymeProspect of Tekenradar vragenlijstonderzoek— last gehad van langdurige klachten na een erythema migrans of andere vorm van de ziekte van Lyme? '],
      ])
    }]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'LL1');

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
          'Met langdurige klachten bedoelen we klachten die langer dan zes maanden aanhouden en binnen zes maanden na behandeling voor de erythema migrans of andere vorm van de ziekte van Lyme ontstaan zijn. '],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Ja, ik heb last (gehad) van langdurige klachten na een erythema migrans of andere vorm van de ziekte van Lyme."],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Nee"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "Niet van toepassing, ik heb geen erythema migrans of andere vorm van de ziekte van Lyme gehad."],
          ])
        },
      ]
    })
  }
}

export class Longlyme2 extends Item {
  constructor(parentKey: string, required: boolean, condition?: Expression) {
    super(parentKey, 'LL2');


    this.condition = condition;
    this.isRequired = required;
  }
  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Wanneer kreeg je de erythema migrans of andere vorm van de ziekte van Lyme, waarna je langdurig klachten hield? '],
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


export class Longlyme3a extends Item {
  constructor(parentKey: string, required: boolean, condition?: Expression) {
    super(parentKey, 'LL3a');

    this.condition = condition;
    this.isRequired = required;
  }
  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Sinds wanneer heb je last van langdurige klachten na de erythema migrans of andere vorm van de ziekte van Lyme? '],
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

export class Longlyme3b extends Item {

  optionKeys = {
    other: 'k',
  }

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Welke langdurige klachten na de erythema migrans of andere vorm van ziekte van Lyme had of heb je? '],
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
    super(parentKey, 'LL3b');

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
        MCOptions.cloze({
          key: this.optionKeys.other,
          items: [
            ClozeItemTypes.text({
              key: 'k', content: new Map(
                [['nl', "Andere klachten, namelijk:"]]
              )
            }),
            ClozeItemTypes.textInput({
              key: 'input',
            }),
          ]
        }),
      ],
      customValidations: [
        {
          key: 'LL3b', rule:
            SurveyEngine.logic.or(
              SurveyEngine.multipleChoice.none(this.key, this.optionKeys.other),
              SurveyEngine.logic.and(
                SurveyEngine.multipleChoice.any(this.key, this.optionKeys.other),
                SurveyEngine.hasResponse(this.key, `rg.mcg.${this.optionKeys.other}.input`),
              )
            ),
          type: 'hard'
        }
      ]
    })
  }
}


export class Longlyme3c extends Item {

  optionKeys = {
    daily: 'a',
    weekly: 'b',
    monthly: 'c',
    sometimes: 'd',
    other: 'e'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'LL3c');

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
            ["nl", "Minder dan één keer per maand"],
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


export class Longlyme4 extends Item {

  optionKeys = {
    no: 'b'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'LL4');

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
        ['nl', 'Heb je nog steeds langdurige klachten na een erythema migrans of andere vorm van de ziekte van Lyme?'],
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


export class Longlyme5 extends Item {
  constructor(parentKey: string, required: boolean, condition?: Expression) {
    super(parentKey, 'LL5');

    this.condition = condition;
    this.isRequired = required;
  }
  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Vanaf wanneer waren de langdurige klachten na de erythema migrans of andere vorm van de ziekte van Lyme weg? '],
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

