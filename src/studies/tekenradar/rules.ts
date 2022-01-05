import { StudyRules } from "case-editor-tools/types/studyRules";
import { Expression } from "survey-engine/data_types";
import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { PDiff } from "./surveys/PDiff";
import { ExampleSurvey } from "./surveys/ExampleSurvey";

const handlePDiffSubmit = StudyEngine.ifThen(
  StudyEngine.checkSurveyResponseKey(PDiff.key),

  // TODO: implement flow decisions

  // TBflow
  StudyEngine.ifThen(
    // If:
    StudyEngine.and(
      StudyEngine.singleChoice.any(PDiff.Q1.key, PDiff.Q1.optionKeys.yes),
      StudyEngine.singleChoice.none(PDiff.Q2.key, PDiff.Q2.optionKeys.yes),
      StudyEngine.singleChoice.any(PDiff.Q3.key, PDiff.Q3.optionKeys.no),
      StudyEngine.singleChoice.any(PDiff.Q4.key, PDiff.Q4.optionKeys.no),
    ),
    // Then:
    StudyEngine.if(
      StudyEngine.lt(
        StudyEngine.getResponseValueAsNum(PDiff.Q7.key, 'rg.num'),
        18,
      ),
      StudyEngine.do(
        StudyEngine.participantActions.updateFlag('ageCategory', 'child'),
      ),
      StudyEngine.do(
        StudyEngine.participantActions.updateFlag('ageCategory', 'adult')
      )
    )
  ),

  // then do
  // StudyEngine.participantActions.assignedSurveys.add(ExampleSurvey.key, 'immediate'),
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
