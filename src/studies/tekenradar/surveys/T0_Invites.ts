import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { applyRequiredQuestions } from './globalConstants';
import { UitnodigingOnderzoek, UitnodigingOnderzoekText } from './questions/invitationQuestions';


export class T0_InvitesDef extends SurveyDefinition {

  // Standard Tekenradar
  T1: UitnodigingOnderzoekText;
  Q1: UitnodigingOnderzoek;

  // Other studies
  // TODO:


  constructor(isRequired?: boolean) {
    super({
      surveyKey: 'T0_Invites',
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
  }


  buildSurvey() {
    this.addItem(this.T1.get());
    this.addItem(this.Q1.get());
  }
}


export const T0_Invites = new T0_InvitesDef(applyRequiredQuestions);
