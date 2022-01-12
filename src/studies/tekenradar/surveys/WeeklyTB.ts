import { SurveyDefinition } from "case-editor-tools/surveys/types";

class WeeklyTB_Def extends SurveyDefinition {
  // TODO:

  constructor(isRequired?: boolean) {
    super({
      surveyKey: 'WeelyTB',
      name: new Map([
        ['nl', 'Test']
      ]),
      description: new Map([
        ['nl', 'Test']
      ]),
      durationText: new Map([
        ['nl', 'Test']
      ]),
    });


  }

  buildSurvey() {
    // TODO:
  }
}

export const WeeklyTB = new WeeklyTB_Def();
