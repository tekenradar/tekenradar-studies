import { SurveyDefinition } from "case-editor-tools/surveys/types";
import { Group1 } from "../questionPools/exampleGroup";
import { Q1 } from "../questionPools/exampleQuestions";


class T0Def extends SurveyDefinition {
  // 1:
  Q1: Q1;
  G1: Group1;

  // 2:
  constructor() {
    super({
      surveyKey: 'T0',
      name: new Map([
        ['en', 'Very simple questionaire']
      ]),
      description: new Map([
        ['en', 'Descrition']
      ]),
      durationText: new Map([
        ['en', 'couple of seconds']
      ]),
    });

    this.Q1 = new Q1(this.key);   // key of this item T0.Q1
    this.G1 = new Group1(this.key);
  }

  // 3:
  buildSurvey() {
    this.addItem(this.Q1.get());
    this.addItem(this.G1.get());
  }
}

export const T0 = new T0Def();
