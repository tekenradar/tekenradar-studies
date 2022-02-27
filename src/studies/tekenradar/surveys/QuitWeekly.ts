import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { applyRequiredQuestions, surveyKeys } from './globalConstants';
import { SurveyEndGroup } from './questions/surveyEnd';
import { ConfirmWeeklyTBQuitting } from './questions/quitQuestions';


class QuitWeeklyTB_Def extends SurveyDefinition {
  Confirm: ConfirmWeeklyTBQuitting;
  EndGroup: SurveyEndGroup;

  constructor(isRequired?: boolean) {
    super({
      surveyKey: surveyKeys.QuitWeeklyTB,
      name: new Map([
        ['nl', 'Stoppen met wekelijkse tekenbeetvragenlijst']
      ]),
      description: new Map([
        ['nl', 'Klik hier om je af te melden voor vragenlijsten']
      ]),
      durationText: new Map([
        ['nl', 'Invullen duurt minder dan 1 minute']
      ]),
    });


    const required = isRequired !== undefined ? isRequired : false;

    this.Confirm = new ConfirmWeeklyTBQuitting(this.key, required)
    this.EndGroup = new SurveyEndGroup(this.key, false);
  }

  buildSurvey() {
    this.addItem(this.Confirm.get())
    this.addItem(this.EndGroup.get())
  }
}

export const QuitWeeklyTB = new QuitWeeklyTB_Def(applyRequiredQuestions);
