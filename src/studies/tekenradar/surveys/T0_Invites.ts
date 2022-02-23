import { SurveyEngine } from 'case-editor-tools/surveys';
import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { applyRequiredQuestions, surveyKeys } from './globalConstants';
import { ContactgegevensGroup, UitnodigingAanvullendOnderzoek, UitnodigingAanvullendOnderzoekConsent, UitnodigingAanvullendOnderzoekText, UitnodigingOnderzoek, UitnodigingOnderzoekConsent, UitnodigingOnderzoekText } from './questions/invitationQuestions';
import { SurveyEndGroup } from './questions/surveyEnd';


export class T0_InvitesDef extends SurveyDefinition {

  // Standard Tekenradar
  T1: UitnodigingOnderzoekText;
  UitnodigingOnderzoek: UitnodigingOnderzoek;
  UitnodigingOnderzoekConsent: UitnodigingOnderzoekConsent;

  // Other studies
  T2: UitnodigingAanvullendOnderzoekText;
  UitnodigingAanvullendOnderzoek: UitnodigingAanvullendOnderzoek;
  UitnodigingAanvullendOnderzoekConsent: UitnodigingAanvullendOnderzoekConsent;
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
    this.UitnodigingOnderzoek = new UitnodigingOnderzoek(this.key, required);
    this.UitnodigingOnderzoekConsent = new UitnodigingOnderzoekConsent(this.key, required, SurveyEngine.singleChoice.any(this.UitnodigingOnderzoek.key, this.UitnodigingOnderzoek.optionKeys.yes));

    const showAdditionalStudyInvite = SurveyEngine.singleChoice.any(this.UitnodigingOnderzoek.key, this.UitnodigingOnderzoek.optionKeys.yes);
    this.T2 = new UitnodigingAanvullendOnderzoekText(this.key, showAdditionalStudyInvite);
    this.UitnodigingAanvullendOnderzoek = new UitnodigingAanvullendOnderzoek(this.key, required, showAdditionalStudyInvite);
    this.UitnodigingAanvullendOnderzoekConsent = new UitnodigingAanvullendOnderzoekConsent(this.key, required, SurveyEngine.singleChoice.any(this.UitnodigingAanvullendOnderzoek.key, this.UitnodigingAanvullendOnderzoek.optionKeys.yes));
    this.Contactgegevens = new ContactgegevensGroup(this.key, required, SurveyEngine.singleChoice.any(this.UitnodigingAanvullendOnderzoek.key, this.UitnodigingAanvullendOnderzoek.optionKeys.yes));

    this.EndGroup = new SurveyEndGroup(this.key, false, SurveyEngine.logic.not(SurveyEngine.singleChoice.any(this.UitnodigingOnderzoek.key, this.UitnodigingOnderzoek.optionKeys.yes)))
  }


  buildSurvey() {
    this.addItem(this.T1.get());
    this.addItem(this.UitnodigingOnderzoek.get());
    this.addItem(this.UitnodigingOnderzoekConsent.get());
    this.addPageBreak()
    this.addItem(this.T2.get());
    this.addItem(this.UitnodigingAanvullendOnderzoek.get());
    this.addItem(this.UitnodigingAanvullendOnderzoekConsent.get());
    this.addItem(this.Contactgegevens.get())
    this.addPageBreak()
    this.addPageBreak();
    this.addItem(this.EndGroup.get());
  }
}


export const T0_Invites = new T0_InvitesDef(applyRequiredQuestions);
