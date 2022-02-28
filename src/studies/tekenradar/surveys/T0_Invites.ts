import { SurveyEngine } from 'case-editor-tools/surveys';
import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { ParticipantFlags } from '../participantFlags';
import { applyRequiredQuestions, surveyKeys } from './globalConstants';
import { kEMInviteGroup, StandardInviteGroup } from './questions/invitationQuestions';
import { SurveyEndGroup } from './questions/surveyEnd';


export class T0_InvitesDef extends SurveyDefinition {
  StandardInviteGroup: StandardInviteGroup;
  kEMInviteGroup: kEMInviteGroup;
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

    this.StandardInviteGroup = new StandardInviteGroup(this.key, required, SurveyEngine.logic.not(
      SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.kEM.key, ParticipantFlags.kEM.values.likely)
    ));
    this.kEMInviteGroup = new kEMInviteGroup(this.key, required, SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.kEM.key, ParticipantFlags.kEM.values.likely));

    this.EndGroup = new SurveyEndGroup(this.key, false, SurveyEngine.logic.and(
      SurveyEngine.logic.not(SurveyEngine.singleChoice.any(this.StandardInviteGroup.UitnodigingOnderzoek.key, this.StandardInviteGroup.UitnodigingOnderzoek.optionKeys.yes)),
      SurveyEngine.logic.not(SurveyEngine.singleChoice.any(this.kEMInviteGroup.UitnodigingOnderzoek.key, this.kEMInviteGroup.UitnodigingOnderzoek.optionKeys.yes)),
    ))
  }


  buildSurvey() {
    this.addItem(this.StandardInviteGroup.get());
    this.addItem(this.kEMInviteGroup.get());
    this.addPageBreak();
    this.addItem(this.EndGroup.get());
  }
}


export const T0_Invites = new T0_InvitesDef(applyRequiredQuestions);
