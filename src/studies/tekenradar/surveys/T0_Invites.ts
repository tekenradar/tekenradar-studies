import { SurveyEngine } from 'case-editor-tools/surveys';
import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { applyRequiredQuestions, surveyKeys } from './globalConstants';
import { UitnodigingOnderzoek, UitnodigingOnderzoekText } from './questions/invitationQuestions';
import { SurveyEndGroup } from './questions/surveyEnd';


export class T0_InvitesDef extends SurveyDefinition {

  // Standard Tekenradar
  T1: UitnodigingOnderzoekText;
  Q1: UitnodigingOnderzoek;

  // Other studies
  // TODO:

  EndGroup: SurveyEndGroup;

  constructor(isRequired?: boolean) {
    super({
      surveyKey: surveyKeys.T0_Invites,
      name: new Map([
        ['nl', 'Uitnodiging tekenradar onderzoek']
      ]),
      description: new Map([
        ['nl', 'Klik hier om je melding af te ronden.']
      ]),
      durationText: new Map([
        ['nl', 'Invullen duurt ongeveer 1-5 minuten.']
      ]),
      availableFor: 'public',
    });

    const required = isRequired !== undefined ? isRequired : false;

    this.T1 = new UitnodigingOnderzoekText(this.key);
    this.Q1 = new UitnodigingOnderzoek(this.key, required);

    this.EndGroup = new SurveyEndGroup(this.key, false, SurveyEngine.singleChoice.none(this.Q1.key, this.Q1.optionKeys.yes))
  }


  buildSurvey() {
    this.addItem(this.T1.get());
    this.addItem(this.Q1.get());
    // TODO: additional studies

    this.addPageBreak()
    this.addItem(this.EndGroup.get());
  }
}


export const T0_Invites = new T0_InvitesDef(applyRequiredQuestions);
