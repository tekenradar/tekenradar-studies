import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { ParticipantFlags } from "../participantFlags";
import { WorkshopEntry } from "../surveys/WorkshopEntry";

export const workshopStudyInvite = {
  name: 'workshopStudyInvite',
  rules: [
    StudyEngine.if(
      StudyEngine.and(
        StudyEngine.not(
          StudyEngine.participantState.hasSurveyKeyAssigned(WorkshopEntry.key),
        ),
        StudyEngine.not(
          StudyEngine.participantState.hasParticipantFlagKey(ParticipantFlags.workshop.key),
        ),
        StudyEngine.participantState.hasParticipantFlagKeyAndValue(
          ParticipantFlags.flow.key,
          ParticipantFlags.flow.values.FEflow
        ),
        StudyEngine.participantState.hasParticipantFlagKeyAndValue(
          ParticipantFlags.followUp.key,
          ParticipantFlags.followUp.values.active
        ),
      ),
      StudyEngine.do(
        StudyEngine.participantActions.assignedSurveys.add(WorkshopEntry.key, 'prio'),
        StudyEngine.participantActions.messages.add('Flow_reminder', StudyEngine.timestampWithOffset({ days: 0 }))
      )
    )
  ]
}
