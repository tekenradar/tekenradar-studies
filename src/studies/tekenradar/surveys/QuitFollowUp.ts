import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { applyRequiredQuestions, surveyKeys } from './globalConstants';
import { ConfirmFollowUpQuitting } from './questions/quitQuestions';
import { SurveyEndGroup } from './questions/surveyEnd';


class QuitFollowUp_Def extends SurveyDefinition {
  Confirm: ConfirmFollowUpQuitting;
  EndGroup: SurveyEndGroup;

  constructor(isRequired?: boolean) {
    super({
      surveyKey: surveyKeys.QuitFollowUp,
      name: new Map([
        ['nl', 'Alleen stoppen met vervolgvragenlijsten, maar mijn account behouden']
      ]),
      description: new Map([
        ['nl', 'Klik hier om je af te melden voor vragenlijsten']
      ]),
      durationText: new Map([
        ['nl', 'Invullen duurt minder dan 1 minute']
      ]),
    });


    const required = isRequired !== undefined ? isRequired : false;

    this.Confirm = new ConfirmFollowUpQuitting(this.key, required)
    this.EndGroup = new SurveyEndGroup(this.key, false);
  }

  buildSurvey() {
    this.addItem(this.Confirm.get())
    this.addItem(this.EndGroup.get())
  }
}

export const QuitFollowUp = new QuitFollowUp_Def(applyRequiredQuestions);
