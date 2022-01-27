import { SurveyDefinition } from "case-editor-tools/surveys/types";

class WeeklyTB_Def extends SurveyDefinition {
  // TODO:

  constructor(isRequired?: boolean) {
    super({
      surveyKey: 'WeeklyTB',
      name: new Map([
        ['nl', 'Wekelijkse tekenbeetvragenlijst']
      ]),
      description: new Map([
        ['nl', 'Klik hier om wekelijks je aantal tekenbeten door te geven.']
      ]),
      durationText: new Map([
        ['nl', 'Invullen duurt ongeveer 1 minuut.']
      ]),
    });


  }

  buildSurvey() {
    // TODO:
  }
}

export const WeeklyTB = new WeeklyTB_Def();
