import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { T12_Adults_key, T12_Kids_key, T3_Adults_key, T3_Kids_key, T6_Adults_key, T6_Kids_key, T9_Adults_key, T9_Kids_key } from "../utils/studyRuleUtils";

import { addFollowUpSurvey, removeFollowUpMessagesForSurvey } from "../utils/studyRuleUtils";

export const changeFollowupTimingToNow = {
  name: 'changeFollowupTimingToNow',
  rules: [
    StudyEngine.ifThen(
      // If:
      StudyEngine.participantState.hasSurveyKeyAssigned(T3_Adults_key),
      // Then:
      StudyEngine.participantActions.assignedSurveys.remove(T3_Adults_key, 'all'),
      StudyEngine.participantActions.assignedSurveys.remove(T6_Adults_key, 'all'),
      StudyEngine.participantActions.assignedSurveys.remove(T9_Adults_key, 'all'),
      StudyEngine.participantActions.assignedSurveys.remove(T12_Adults_key, 'all'),
      removeFollowUpMessagesForSurvey(T3_Adults_key),
      removeFollowUpMessagesForSurvey(T6_Adults_key),
      removeFollowUpMessagesForSurvey(T9_Adults_key),
      removeFollowUpMessagesForSurvey(T12_Adults_key),
      addFollowUpSurvey(T3_Adults_key, 0, 89),
      addFollowUpSurvey(T6_Adults_key, 0, 89),
      addFollowUpSurvey(T9_Adults_key, 0, 89),
      addFollowUpSurvey(T12_Adults_key, 0, 89),
    ),
    StudyEngine.ifThen(
      // If:
      StudyEngine.participantState.hasSurveyKeyAssigned(T3_Kids_key),
      // Then:
      StudyEngine.participantActions.assignedSurveys.remove(T3_Kids_key, 'all'),
      StudyEngine.participantActions.assignedSurveys.remove(T6_Kids_key, 'all'),
      StudyEngine.participantActions.assignedSurveys.remove(T9_Kids_key, 'all'),
      StudyEngine.participantActions.assignedSurveys.remove(T12_Kids_key, 'all'),
      removeFollowUpMessagesForSurvey(T3_Kids_key),
      removeFollowUpMessagesForSurvey(T6_Kids_key),
      removeFollowUpMessagesForSurvey(T9_Kids_key),
      removeFollowUpMessagesForSurvey(T12_Kids_key),
      addFollowUpSurvey(T3_Kids_key, 0, 89),
      addFollowUpSurvey(T6_Kids_key, 0, 89),
      addFollowUpSurvey(T9_Kids_key, 0, 89),
      addFollowUpSurvey(T12_Kids_key, 0, 89),
    )
  ]
}
