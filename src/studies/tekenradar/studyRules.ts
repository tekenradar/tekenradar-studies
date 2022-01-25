import { StudyRules } from "case-editor-tools/types/studyRules";
import { Expression } from "survey-engine/data_types";
import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { PDiff } from "./surveys/PDiff";
import { TBflow_Adults } from "./surveys/TBflow_Adults";
import { Standardflow_Adults } from "./surveys/Standardflow_Adults";
import {
  handleTrigger_Chronicflow, handleTrigger_EMflow, handleTrigger_FEflow, handleTrigger_LBflow,
  handlePDiffNormal_TBflow, handlePDiffUpdate_TBflow,
  handleTrigger_WeeklyTB, updateAgeFlags
} from "./utils/studyRuleUtils";


const handlePDiffSubmit = StudyEngine.ifThen(
  // IF:
  StudyEngine.checkSurveyResponseKey(PDiff.key),
  // THEN:
  // If first or renewed PDiff:
  StudyEngine.if(
    // If last PDiff, old enough:
    StudyEngine.participantState.lastSubmissionDateOlderThan(StudyEngine.timestampWithOffset({ years: -1, days: 6 * 7 }), PDiff.key),
    // Then: start as new - ignore previous flows:
    StudyEngine.do(
      updateAgeFlags(),
      handlePDiffNormal_TBflow(),
      handleTrigger_EMflow(),
      handleTrigger_FEflow(),
      handleTrigger_LBflow(),
      handleTrigger_Chronicflow(),
      handleTrigger_WeeklyTB(),
    ),
    // Else:
    StudyEngine.do(
      handlePDiffUpdate_TBflow(),
      handleTrigger_WeeklyTB(),
    )
  )
)

const handleTBFlow_AdultsSubmit = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(TBflow_Adults.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(TBflow_Adults.key, 'all'),
  StudyEngine.participantActions.assignedSurveys.add(Standardflow_Adults.key, 'immediate'),
  /*
  StudyEngine.participantActions.reports.init('test1'),
  StudyEngine.participantActions.reports.updateData('test1', 'key1', 'hello'),
  StudyEngine.participantActions.reports.updateData('test1', 'key1', 'value1'),
  StudyEngine.participantActions.reports.updateData('test2', 'key1', 'hello'),
  StudyEngine.participantActions.reports.updateData('test2', 'key2', 'hello'),
  StudyEngine.participantActions.reports.removeData('test2', 'key2'),
  StudyEngine.participantActions.reports.init('test3'),
  StudyEngine.participantActions.reports.cancel('test3'),
  */
)

const handleStandardflow_AdultsSubmit = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(Standardflow_Adults.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(Standardflow_Adults.key, 'all'),
)


const submitRules: Expression[] = [
  handlePDiffSubmit,
  handleTBFlow_AdultsSubmit,
  handleStandardflow_AdultsSubmit,
  // TODO: add other submit rules
]

const mergeRules: Expression[] = [
  // handle update flow rule
  // handle follow up rule
  // handle weekly flow rule
]

/**
 * STUDY RULES
 */
export const studyRules = new StudyRules(
  undefined,
  submitRules,
  undefined,
  mergeRules,
)
