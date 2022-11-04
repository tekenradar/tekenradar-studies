import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { ParticipantFlags } from "../participantFlags";
import { surveyKeys } from "../surveys/globalConstants";


export const removeConfidentialData = {
  name: 'removeConfidentialData',
  rules: [
    StudyEngine.do(
      StudyEngine.participantActions.confidentialResponses.removeAll(),
      StudyEngine.participantActions.assignedSurveys.remove(surveyKeys.DeleteContactData, 'all'),
      StudyEngine.participantActions.updateFlag(
        ParticipantFlags.contactData.key,
        ParticipantFlags.contactData.values.autoRemove
      )
    )
  ]
}
