import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { applyRequiredQuestions, surveyKeys } from './globalConstants';
import { ExplanationDeletingContactData, ConfirmDeletingContactData } from './questions/quitQuestions';
import { SurveyEndGroup } from './questions/surveyEnd';


class DeleteContactData_Def extends SurveyDefinition {
  Explanation: ExplanationDeletingContactData;
  Confirm: ConfirmDeletingContactData;
  EndGroup: SurveyEndGroup;

  constructor(isRequired?: boolean) {
    super({
      surveyKey: surveyKeys.DeleteContactData,
      name: new Map([
        ['nl', 'Intrekken toestemming contactgegevens']
      ]),
      description: new Map([
        ['nl', 'Klink hier om je toestemming in te trekken voor het bewaren van contactgevens']
      ]),
      durationText: new Map([
        ['nl', 'Invullen duurt minder dan 1 minuut']
      ]),
    });


    const required = isRequired !== undefined ? isRequired : false;

    this.Explanation = new ExplanationDeletingContactData(this.key)
    this.Confirm = new ConfirmDeletingContactData(this.key, required)
    this.EndGroup = new SurveyEndGroup(this.key, false);
  }

  buildSurvey() {
    this.addItem(this.Explanation.get())
    this.addItem(this.Confirm.get())
    this.addItem(this.EndGroup.get())
  }
}

export const DeleteContactData = new DeleteContactData_Def(applyRequiredQuestions);
