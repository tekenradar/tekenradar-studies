import { SurveyDefinition } from "case-editor-tools/surveys/types";
import { G1 } from "../questionPools/exampleGroup";
import { Q1 } from "../questionPools/exampleQuestions";

export class T0 extends SurveyDefinition {
  Q1: Q1;
  G1: G1;

  constructor() {
    super({
      surveyKey: 'T0',
      name: new Map([
        ['en', 'Test']
      ]),
      description: new Map([
        ['en', 'Test']
      ]),
      durationText: new Map([
        ['en', 'Test']
      ]),
    })


    this.Q1 = new Q1(this.key, false);
    this.G1 = new G1(this.key)

  }

  buildSurvey() {
    this.addItem(this.G1.get()) // T0.G1.Q1
    this.addItem(this.Q1.get()) // T0.Q1
  }

}
