import { SurveyEngine } from 'case-editor-tools/surveys';
import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { ParticipantFlags } from '../participantFlags';
import { applyRequiredQuestions, surveyKeys } from './globalConstants';
import { kEMInviteGroup, StandardInviteGroup, aEMInviteGroup, LPplusBBInviteGroup } from './questions/invitationQuestions';
//import { aEMInviteGroup, StandardInviteGroup } from './questions/invitationQuestions';//kvdw LE
import { SurveyEndGroup } from './questions/surveyEnd';


export class T0_InvitesDef extends SurveyDefinition {
  StandardInviteGroup: StandardInviteGroup;
  kEMInviteGroup: kEMInviteGroup;
  aEMInviteGroup: aEMInviteGroup; //kvdw LE
  LPplusInviteGroup: LPplusBBInviteGroup; //MH LPplus
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

    this.StandardInviteGroup = new StandardInviteGroup(this.key, required, SurveyEngine.logic.and(
      SurveyEngine.logic.not(SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.kEM.key, ParticipantFlags.kEM.values.likely)),
      SurveyEngine.logic.not(SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.aEM.key, ParticipantFlags.aEM.values.likely)),
      SurveyEngine.logic.not(SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.LPplus.key, ParticipantFlags.LPplus.values.likely))), //MH
    );
    this.kEMInviteGroup = new kEMInviteGroup(this.key, required, SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.kEM.key, ParticipantFlags.kEM.values.likely));
    this.aEMInviteGroup = new aEMInviteGroup(this.key, required, SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.aEM.key, ParticipantFlags.aEM.values.likely));
    this.LPplusInviteGroup = new LPplusBBInviteGroup(this.key, required, SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.LPplus.key, ParticipantFlags.LPplus.values.likely)); //MH


    //this.StandardInviteGroup = new StandardInviteGroup(this.key, required, SurveyEngine.logic.not(
    //  SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.kEM.key, ParticipantFlags.kEM.values.likely)
    //));
    //this.kEMInviteGroup = new kEMInviteGroup(this.key, required, SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.kEM.key, ParticipantFlags.kEM.values.likely));

    //kvdw LE:
    //this.StandardInviteGroup = new StandardInviteGroup(this.key, required, SurveyEngine.logic.not(
    //  SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.aEM.key, ParticipantFlags.aEM.values.likely)
    //));
    //this.aEMInviteGroup = new aEMInviteGroup(this.key, required, SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.aEM.key, ParticipantFlags.aEM.values.likely));


    this.EndGroup = new SurveyEndGroup(this.key, false, SurveyEngine.logic.and(
      SurveyEngine.logic.not(SurveyEngine.singleChoice.any(this.StandardInviteGroup.UitnodigingOnderzoek.key, this.StandardInviteGroup.UitnodigingOnderzoek.optionKeys.yes)),
      SurveyEngine.logic.not(SurveyEngine.singleChoice.any(this.kEMInviteGroup.kEMUitnodigingOnderzoek.key, this.kEMInviteGroup.kEMUitnodigingOnderzoek.optionKeys.yes)),
      SurveyEngine.logic.not(SurveyEngine.singleChoice.any(this.kEMInviteGroup.UitnodigingOnderzoek.key, this.kEMInviteGroup.UitnodigingOnderzoek.optionKeys.yes)),
      //kvdw LE:
      SurveyEngine.logic.not(SurveyEngine.singleChoice.any(this.aEMInviteGroup.aEMUitnodigingOnderzoek.key, this.aEMInviteGroup.aEMUitnodigingOnderzoek.optionKeys.yes)),
      SurveyEngine.logic.not(SurveyEngine.singleChoice.any(this.aEMInviteGroup.UitnodigingOnderzoek.key, this.aEMInviteGroup.UitnodigingOnderzoek.optionKeys.yes)),
      //MH LPplus:
      SurveyEngine.logic.not(SurveyEngine.singleChoice.any(this.LPplusInviteGroup.BiobankUitnodigingAanvullendOnderzoek.key, this.LPplusInviteGroup.BiobankUitnodigingAanvullendOnderzoek.optionKeys.yes)),
      //SurveyEngine.logic.not(SurveyEngine.singleChoice.any(this.LPplusInviteGroup.BiobankUitnodigingAanvullendOnderzoekConsent.key, this.LPplusInviteGroup.BiobankUitnodigingAanvullendOnderzoek.optionKeys.yes)),

    ))
  }


  buildSurvey() {
    this.addItem(this.StandardInviteGroup.get());
    this.addItem(this.kEMInviteGroup.get());
    this.addItem(this.aEMInviteGroup.get());//kvdw LE
    this.addItem(this.LPplusInviteGroup.get());//MH LPplus
    this.addPageBreak();
    this.addItem(this.EndGroup.get());
  }
}


export const T0_Invites = new T0_InvitesDef(applyRequiredQuestions);
