import { Expression } from 'survey-engine/data_types';
import { Group, Item } from 'case-editor-tools/surveys/types';
import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';


export class PreviousTickBitesGroup extends Group {

  Q1: PreviousTickBites1;
  Q2: PreviousTickBites2;


  constructor(parentKey: string, isRequired?: boolean, groupCondition?: Expression) {
    super(parentKey, 'PTBG');

    if (groupCondition) {
      this.groupEditor.setCondition(groupCondition)
    }
    this.Q1 = new PreviousTickBites1(this.key, isRequired);
    const q1Condition = SurveyEngine.singleChoice.none(this.Q1.key, this.Q1.optionKeys.none);
    this.Q2 = new PreviousTickBites2(this.key, isRequired, q1Condition);
  }

  buildGroup() {
    this.addItem(this.Q1.get());
    this.addItem(this.Q2.get());
  }
}


class PreviousTickBites1 extends Item {
  optionKeys = {
    none: 'a'
  }

  questionTextMain1 = [
    {
      content: new Map([
        ["nl", 'Hoeveel tekenbeten heb je '],
      ]),
    },
    {
      content: new Map([
        ["nl", "in de afgelopen 5 jaar "],
      ]),
      className: "text-primary"
    },
    {
      content: new Map([
        ["nl", "opgemerkt? (Tel de tekenbeet of tekenbeten die je nu meldt "],
      ]),
    }, 
    {
      content: new Map([
        ["nl", "niet "],
      ]),
      className: "text-primary"
    },
    {
      content: new Map([
        ["nl", "mee.)"],
      ]),
    }
  ]

  questionTextMain_Chronic = [
    {
      content: new Map([
        ["nl", 'Hoeveel tekenbeten heb je '],
      ]),
    },
    {
      content: new Map([
        ["nl", "in de afgelopen 5 jaar "],
      ]),
      className: "text-primary"
    },
    {
      content: new Map([
        ["nl", "opgemerkt?"],
      ]),
    },
  ]


  questionTextMainWeekly = [
    {
      content: new Map([
        ["nl", 'Als je deze tekenbeet niet meetelt, hoeveel tekenbeten heb je dan '],
      ]),
    },
    {
      content: new Map([
        ["nl", "in de afgelopen 5 jaar "],
      ]),
      className: "text-primary"
    },
    {
      content: new Map([
        ["nl", "opgemerkt? (Tel de tekenbeet of tekenbeten die je nu meldt "],
      ]),
    }, 
    {
      content: new Map([
        ["nl", "niet "],
      ]),
      className: "text-primary"
    },
    {
      content: new Map([
        ["nl", "mee.)"],
      ]),
    }
  ]


  constructor(parentKey: string, isRequired?: boolean, condition?: Expression) {
    super(parentKey, 'PTB1');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.isPartOf('Chronicflow') ? this.questionTextMain_Chronic : this.isPartOf('LPplus_part1') ? this.questionTextMain_Chronic : (this.isPartOf('WeeklyTB') ? this.questionTextMainWeekly : this.questionTextMain1),
      responseOptions: [
        {
          key: this.optionKeys.none, role: 'option',
          content: new Map([
            ["nl", "Geen tekenbeten"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "1 - 3 tekenbeten"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "4 - 10 tekenbeten"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "11 - 50 tekenbeten"],
          ])
        },
        {
          key: 'e', role: 'option',
          content: new Map([
            ["nl", "Meer dan 50 tekenbeten"],
          ])
        },
      ]
    })
  }
}



class PreviousTickBites2 extends Item {
  questionTextMain1 = [
    {
      content: new Map([
        ["nl", 'Hoeveel tekenbeten heb je '],
      ]),
    },
    {
      content: new Map([
        ["nl", "in de afgelopen 3 maanden "],
      ]),
      className: "text-primary"
    },
    {
      content: new Map([
        ["nl", "opgemerkt? (Tel de tekenbeet of tekenbeten die je nu meldt "],
      ]),
    },
    {
      content: new Map([
        ["nl", "niet "],
      ]),
      className: "text-primary"
    },
    {
      content: new Map([
        ["nl", "mee.)"],
      ]),
    }
  ]

  questionTextMain_Chronic = [
    {
      content: new Map([
        ["nl", 'Hoeveel tekenbeten heb je '],
      ]),
    },
    {
      content: new Map([
        ["nl", "in de afgelopen 3 maanden "],
      ]),
      className: "text-primary"
    },
    {
      content: new Map([
        ["nl", "opgemerkt?"],
      ]),
    },
  ]

  questionTextMainWeekly = [
    {
      content: new Map([
        ["nl", 'Als je deze tekenbeet niet meetelt, hoeveel tekenbeten heb je dan '],
      ]),
    },
    {
      content: new Map([
        ["nl", "in de afgelopen 3 maanden "],
      ]),
      className: "text-primary"
    },
    {
      content: new Map([
        ["nl", "opgemerkt? (Tel de tekenbeet die je nu meldt "],
      ]),
    },
    {
      content: new Map([
        ["nl", "niet "],
      ]),
      className: "text-primary"
    },
    {
      content: new Map([
        ["nl", "mee.)"],
      ]),
    },
  ]


  constructor(parentKey: string, isRequired?: boolean, condition?: Expression) {
    super(parentKey, 'PTB2');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.isPartOf('Chronicflow') ? this.questionTextMain_Chronic : this.isPartOf('LPplus_part1') ? this.questionTextMain_Chronic : (this.isPartOf('WeeklyTB') ? this.questionTextMainWeekly : this.questionTextMain1),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Geen tekenbeten"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "1 - 3 tekenbeten"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "4 - 10 tekenbeten"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "11 - 50 tekenbeten"],
          ])
        },
        {
          key: 'e', role: 'option',
          content: new Map([
            ["nl", "Meer dan 50 tekenbeten"],
          ])
        },
      ]
    })
  }
}


export class PrevTBHeader extends Item {

  markdownContent = `
# Afgelopen jaren

    `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'PrevTB');

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
