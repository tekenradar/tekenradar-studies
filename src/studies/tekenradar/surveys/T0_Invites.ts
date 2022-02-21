import { SurveyEngine } from 'case-editor-tools/surveys';
import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { applyRequiredQuestions, surveyKeys } from './globalConstants';
import { ContactgegevensGroup, UitnodigingAanvullendOnderzoek, UitnodigingAanvullendOnderzoekText, UitnodigingOnderzoek, UitnodigingOnderzoekText } from './questions/invitationQuestions';
import { SurveyEndGroup } from './questions/surveyEnd';


export class T0_InvitesDef extends SurveyDefinition {

  // Standard Tekenradar
  T1: UitnodigingOnderzoekText;
  Q1: UitnodigingOnderzoek;

  // Other studies
  T2: UitnodigingAanvullendOnderzoekText;
  Q2: UitnodigingAanvullendOnderzoek;
  Contactgegevens: ContactgegevensGroup;

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

    const showAdditionalStudyInvite = SurveyEngine.singleChoice.any(this.Q1.key, this.Q1.optionKeys.yes);

    this.T2 = new UitnodigingAanvullendOnderzoekText(this.key, showAdditionalStudyInvite);
    this.Q2 = new UitnodigingAanvullendOnderzoek(this.key, required, showAdditionalStudyInvite);
    this.Contactgegevens = new ContactgegevensGroup(this.key, required, SurveyEngine.singleChoice.any(this.Q2.key, this.Q2.optionKeys.yes));

    this.EndGroup = new SurveyEndGroup(this.key, false, SurveyEngine.singleChoice.none(this.Q1.key, this.Q1.optionKeys.yes))
  }


  buildSurvey() {
    this.addItem(this.T1.get());
    this.addItem(this.Q1.get());
    this.addPageBreak()
    this.addItem(this.T2.get());
    this.addItem(this.Q2.get());
    this.addItem(this.Contactgegevens.get())
    this.addPageBreak()

    this.addItem(this.EndGroup.get());
  }
}


export const T0_Invites = new T0_InvitesDef(applyRequiredQuestions);
