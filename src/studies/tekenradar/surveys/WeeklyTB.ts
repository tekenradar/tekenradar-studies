import { SurveyDefinition } from "case-editor-tools/surveys/types";
import { IntroWeeklyTB, NumberTickBitesWeekly } from "./questions/weeklyTB";

class WeeklyTB_Def extends SurveyDefinition {
  // TODO:

  T1: IntroWeeklyTB;
  Q1: NumberTickBitesWeekly;

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
      availableFor: 'temporary_participants',
      requireLoginBeforeSubmission: true,
    });

    const required = isRequired !== undefined ? isRequired : false;
    this.T1 = new IntroWeeklyTB(this.key, required);
    this.Q1 = new NumberTickBitesWeekly(this.key, required);

  }

  buildSurvey() {
    // TODO:
    this.addItem(this.T1.get());
    this.addItem(this.Q1.get());
  }
}

export const WeeklyTB = new WeeklyTB_Def();
