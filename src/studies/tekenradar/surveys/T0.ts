import { Group, Item, SurveyDefinition } from "case-editor-tools/surveys/types";
import { Expression } from 'survey-engine/data_types';
import { ComponentGenerators } from "case-editor-tools/surveys/utils/componentGenerators";
import { SurveyEngine, SurveyItems } from "case-editor-tools/surveys";

/*const commonHealthQuestionOptions = [
  ComponentGenerators.option({
    key: '1', content: new Map([['en', 'Option 1']])
  }),
  ComponentGenerators.option({
    key: '2', content: new Map([['en', 'Option 2']])
  })
]*/

class QuestionAboutMedicalHistory extends Item {
  qTextA = new Map([[
    'en', 'Text A'
  ]]);
  qTextB = new Map([[
    'en', 'Text B'
  ]]);

  constructor(parentKey: string, isRequired: boolean, condtion?: Expression) {
    super(parentKey, 'QMEDHIST');

    this.isRequired = isRequired;
    this.condition = condtion;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.isPartOf('T0') ? this.qTextA : this.qTextB,
      responseOptions: //commonHealthQuestionOptions,
        [
          {//TODO: is this correct dutch in the first option?
            //(bij benadering stands after date input)
            key: 'a', role: 'date',
            content: new Map([
              ["nl", "Datum bij benadering"],
            ])
          },
          {
            key: 'b', role: 'option',
            content: new Map([
              ["nl", "Weet niet"],
            ])
          },
        ]
      /* content: new Map([
           ['en', 'Hello']
       ]),*/
    })
  }
}


class LymeGroup extends Group {
  QMEDHIST: QuestionAboutMedicalHistory;

  constructor(parentKey: string) {
    super(parentKey, 'LG');

    this.QMEDHIST = new QuestionAboutMedicalHistory(this.key, false);
  }

  buildGroup() {
    this.addItem(this.QMEDHIST.get());
    this.addPageBreak();
  }
}

class G2 extends Group {
  Q1: QuestionAboutMedicalHistory;
  Q3: LymeGroup;

  constructor(parentKey: string, G1key: string) {
    super(parentKey, 'G2');

    const q1Condition = SurveyEngine.singleChoice.any(G1key, '2');

    this.Q1 = new QuestionAboutMedicalHistory(this.key, false, q1Condition);
    this.Q3 = new LymeGroup(this.key);
  }

  buildGroup() {
    this.addItem(this.Q1.get());
    this.addPageBreak();
    this.addItem(this.Q3.get());
  }
}

class G3 extends Group {
  Q1: QuestionAboutMedicalHistory;
  Q3: LymeGroup;

  constructor(parentKey: string, q1Condition: Expression) {
    super(parentKey, 'G3');

    this.Q1 = new QuestionAboutMedicalHistory(this.key, false, q1Condition);
    this.Q3 = new LymeGroup(this.key);

    // this.groupEditor.setCondition(condition);
  }

  buildGroup() {
    this.addItem(this.Q1.get());
    this.addPageBreak();
    this.addItem(this.Q3.get());
  }
}


class T0Def extends SurveyDefinition {
  G1: LymeGroup;
  G2: G2;
  G3: G3;

  constructor() {
    super({
      surveyKey: 'T1',
      name: new Map([
        ['en', 'Test']
      ]),
      description: new Map([
        ['en', 'Test']
      ]),
      durationText: new Map([
        ['en', 'Test']
      ]),
    });

    this.G1 = new LymeGroup(this.key);
    this.G2 = new G2(this.key, this.G1.QMEDHIST.key);

    const cond = SurveyEngine.singleChoice.any(this.G1.QMEDHIST.key, '1');
    this.G3 = new G3(this.key, cond);
  }

  buildSurvey() {
    this.addItem(this.G1.get());
    this.addItem(this.G2.get());
    this.addItem(this.G3.get());
  }
}

export const T0 = new T0Def();

