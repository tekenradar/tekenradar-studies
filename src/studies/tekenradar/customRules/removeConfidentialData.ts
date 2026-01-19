import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { ParticipantFlags } from "../participantFlags";
import { DeleteContactData_key } from "../utils/studyRuleUtils";


export const removeConfidentialData = {
  name: 'removeConfidentialData',
  rules: [
    StudyEngine.do(
      StudyEngine.participantActions.confidentialResponses.removeAll(),
      StudyEngine.participantActions.assignedSurveys.remove(DeleteContactData_key, 'all'),
      StudyEngine.participantActions.updateFlag(
        ParticipantFlags.contactData.key,
        ParticipantFlags.contactData.values.autoRemove
      )
    )
  ]
}
