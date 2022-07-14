import { SurveyItems } from "case-editor-tools/surveys";
import { Expression } from 'survey-engine/data_types';
import { Item } from "case-editor-tools/surveys/types";


export class EntryQ1 extends Item {
  optionKeys = {
    yes: 'a',
    no: 'b',
  }

  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'Q1');

    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Question 1 of the entry survey?'],
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
        }
      ]
    })
  }
}

export class EntryQ2 extends Item {
  optionKeys = {
    yes: 'a',
    no: 'b',
  }

  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'Q2');

    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Question 2 of the entry survey?'],
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
        }
      ]
    })
  }
}

export class FU1aQ1 extends Item {
  optionKeys = {
    correctAnswer: 'a',
    b: 'b',
    c: 'c',
    d: 'd',
  }

  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'Q1');

    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.multipleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Question 1 of the FUa 1 survey?'],
      ]),
      questionSubText: new Map([
        ['nl', 'Add some explanation here'],
      ]),
      responseOptions: [
        {
          key: this.optionKeys.correctAnswer, role: 'option',
          content: new Map([
            ["nl", "Option a"],
          ])
        },
        {
          key: this.optionKeys.b, role: 'option',
          content: new Map([
            ["nl", "Option b"],
          ])
        },
        {
          key: this.optionKeys.c, role: 'option',
          content: new Map([
            ["nl", "Option c"],
          ])
        },
        {
          key: this.optionKeys.d, role: 'option',
          content: new Map([
            ["nl", "Option d"],
          ])
        }
      ]
    })
  }
}

export class FU1aQ2 extends Item {

  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'Q2');

    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.responsiveSingleChoiceArray({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Question 2 of the FUa 1 survey?'],
      ]),
      questionSubText: new Map([
        ['nl', 'Add some explanation here'],
      ]),
      defaultMode: 'table',
      responsiveModes: {
        md: 'table',
        sm: 'horizontal'
      },
      scaleOptions: [
        {
          key: '1', content: new Map([
            ['nl', 'Option 1'],
          ])
        },
        {
          key: '2', content: new Map([
            ['nl', 'Middle'],
          ])
        },
        {
          key: '3', content: new Map([
            ['nl', 'Highest'],
          ])
        },
      ],
      rows: [
        {
          key: 'a',
          content: new Map([
            ['nl', 'Row 1 with longer text, so to display how that works'],
          ]),
        },
        {
          key: 'b',
          content: new Map([
            ['nl', 'Row 2'],
          ]),
        },
        {
          key: 'c',
          content: new Map([
            ['nl', 'Row 3'],
          ]),
        }
      ]
    })
  }
}


export class FU1bQ1 extends Item {
  optionKeys = {
    correctAnswer: '1',
    b: 'b',
    c: 'c',
    d: 'd',
  }

  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'Q1');

    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.multipleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Question 1 of the FUb 1 survey?'],
      ]),
      questionSubText: new Map([
        ['nl', 'Add some explanation here'],
      ]),
      responseOptions: [
        {
          key: this.optionKeys.correctAnswer, role: 'option',
          content: new Map([
            ["nl", "Option a"],
          ])
        },
        {
          key: this.optionKeys.b, role: 'option',
          content: new Map([
            ["nl", "Option b"],
          ])
        },
        {
          key: this.optionKeys.c, role: 'numberInput',
          content: new Map([
            ["nl", "Option c"],
          ])
        },
        {
          key: this.optionKeys.d, role: 'input',
          content: new Map([
            ["nl", "Option d"],
          ])
        }
      ],
      /*customValidations: [{
        key: 'v1',
        rule: SurveyEngine.logic.and(
          SurveyEngine.multipleChoice.any(this.key, this.optionKeys.d),
          SurveyEngine.hasResponse(this.key, 'rg.mcg.d.input'),
        ),
        type: 'hard'
      }]*/
    })
  }
}


export class FU1bQ2 extends Item {

  constructor(parentKey: string, condition: Expression, isRequired: boolean) {
    super(parentKey, 'Q2');

    this.condition = condition;
    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.responsiveBipolarLikertArray({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Question 2 of the FUb 1 survey?'],
      ]),
      questionSubText: new Map([
        ['nl', 'Add some explanation here'],
      ]),
      defaultMode: "withLabelRow",
      /*responsiveModes: {
        md: 'table',
      },*/
      scaleOptions: [
        { key: '1' },
        { key: '2' },
        { key: '3' },
        { key: '4' },
        { key: '5' },
        { key: '6' },
        { key: '7' },
        { key: '8' },
      ],
      rows: [
        {
          key: 'a',
          startLabel: new Map([
            ['nl', 'start'],
          ]),
          endLabel: new Map([
            ['nl', 'end'],
          ]),
        },
        {
          key: 'b',
          startLabel: new Map([
            ['nl', 'left'],
          ]),
          endLabel: new Map([
            ['nl', 'right'],
          ]),
        },
        {
          key: 'c',
          startLabel: new Map([
            ['nl', 'low'],
          ]),
          endLabel: new Map([
            ['nl', 'high'],
          ]),
        },
      ]
    })
  }
}
