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
        ["nl", "last gehad van langdurige klachten na een infectie met het coronavirus (COVID-19)? "],
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
      // minRelativeDate: { delta: { years: -19 } },
    })
  }
}

export class Covid3 extends Item {


  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Welke langdurige klachten had of heb je?'],
      ]),
      className: "row"
    },
    {
      content: new Map([
        ["nl", "Geef hier een beknopte beschrijving van je  klachten, sinds wanneer je hier last van hebt en of dit dagelijks of periodiek is."],
      ]),
      className: "row"
    },
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'COV3');

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
      questionText: this.questionTextMain
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

