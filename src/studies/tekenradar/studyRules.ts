import { StudyRules } from "case-editor-tools/types/studyRules";
import { Expression } from "survey-engine/data_types";
import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { PDiff } from "./surveys/PDiff";
import { TBflow_Adults } from "./surveys/TBflow_Adults";
import { Standardflow_Adults } from "./surveys/Standardflow_Adults";
import { handleTrigger_Chronicflow, handleTrigger_EMflow, handleTrigger_FEflow, handleTrigger_LBflow, handleTrigger_TBflow, handleTrigger_WeeklyTB, updateAgeFlags } from "./utils/studyRuleUtils";


const handlePDiffSubmit = StudyEngine.ifThen(
  // IF:
  StudyEngine.checkSurveyResponseKey(PDiff.key),
  // THEN:
  updateAgeFlags(),
  handleTrigger_TBflow(),
  handleTrigger_EMflow(),
  handleTrigger_FEflow(),
  handleTrigger_LBflow(),
  handleTrigger_Chronicflow(),
  handleTrigger_WeeklyTB(),
)

const handleTBFlow_AdultsSubmit = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(TBflow_Adults.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(TBflow_Adults.key, 'all'),
  StudyEngine.participantActions.assignedSurveys.add(Standardflow_Adults.key, 'immediate'),
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
