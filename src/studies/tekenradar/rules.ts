import { StudyRules } from "case-editor-tools/types/studyRules";
import { Expression } from "survey-engine/data_types";
import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { PDiff } from "./surveys/PDiff";
import { ExampleSurvey } from "./surveys/ExampleSurvey";

const handlePDiffSubmit = StudyEngine.ifThen(
  StudyEngine.checkSurveyResponseKey(PDiff.key),
  // then do:
  StudyEngine.participantActions.assignedSurveys.add(ExampleSurvey.key, 'immediate'),
)

const handleExampleSurveySubmit = StudyEngine.ifThen(
  StudyEngine.checkSurveyResponseKey(ExampleSurvey.key),
  // then do:
  StudyEngine.participantActions.assignedSurveys.remove(ExampleSurvey.key, 'all'),
  StudyEngine.participantActions.assignedSurveys.add(PDiff.key, 'normal'),
)

const submitRules: Expression[] = [
  handlePDiffSubmit,
  handleExampleSurveySubmit,
]

/**
 * STUDY RULES
 */
export const studyRules = new StudyRules(
  undefined,
  submitRules,
)
