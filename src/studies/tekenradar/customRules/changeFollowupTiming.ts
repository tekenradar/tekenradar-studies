import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { T12_Adults } from "../surveys/T12_Adults";
import { T12_Kids } from "../surveys/T12_Kids";
import { T3_Adults } from "../surveys/T3_Adults";
import { T3_Kids } from "../surveys/T3_Kids";
import { T6_Adults } from "../surveys/T6_Adults";
import { T6_Kids } from "../surveys/T6_Kids";
import { T9_Adults } from "../surveys/T9_Adults";
import { T9_Kids } from "../surveys/T9_Kids";
import { addFollowUpSurvey, removeFollowUpMessagesForSurvey } from "../utils/studyRuleUtils";

export const changeFollowupTimingToNow = {
  name: 'changeFollowupTimingToNow',
  rules: [
    StudyEngine.ifThen(
      // If:
      StudyEngine.participantState.hasSurveyKeyAssigned(T3_Adults.key),
      // Then:
      StudyEngine.participantActions.assignedSurveys.remove(T3_Adults.key, 'all'),
      StudyEngine.participantActions.assignedSurveys.remove(T6_Adults.key, 'all'),
      StudyEngine.participantActions.assignedSurveys.remove(T9_Adults.key, 'all'),
      StudyEngine.participantActions.assignedSurveys.remove(T12_Adults.key, 'all'),
      removeFollowUpMessagesForSurvey(T3_Adults.key),
      removeFollowUpMessagesForSurvey(T6_Adults.key),
      removeFollowUpMessagesForSurvey(T9_Adults.key),
      removeFollowUpMessagesForSurvey(T12_Adults.key),
      addFollowUpSurvey(T3_Adults.key, 0, 89),
      addFollowUpSurvey(T6_Adults.key, 0, 89),
      addFollowUpSurvey(T9_Adults.key, 0, 89),
      addFollowUpSurvey(T12_Adults.key, 0, 89),
    ),
    StudyEngine.ifThen(
      // If:
      StudyEngine.participantState.hasSurveyKeyAssigned(T3_Kids.key),
      // Then:
      StudyEngine.participantActions.assignedSurveys.remove(T3_Kids.key, 'all'),
      StudyEngine.participantActions.assignedSurveys.remove(T6_Kids.key, 'all'),
      StudyEngine.participantActions.assignedSurveys.remove(T9_Kids.key, 'all'),
      StudyEngine.participantActions.assignedSurveys.remove(T12_Kids.key, 'all'),
      removeFollowUpMessagesForSurvey(T3_Kids.key),
      removeFollowUpMessagesForSurvey(T6_Kids.key),
      removeFollowUpMessagesForSurvey(T9_Kids.key),
      removeFollowUpMessagesForSurvey(T12_Kids.key),
      addFollowUpSurvey(T3_Kids.key, 0, 89),
      addFollowUpSurvey(T6_Kids.key, 0, 89),
      addFollowUpSurvey(T9_Kids.key, 0, 89),
      addFollowUpSurvey(T12_Kids.key, 0, 89),
    )
  ]
}
