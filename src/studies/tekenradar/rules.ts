import { StudyRules } from "case-editor-tools/types/studyRules";
import { Expression } from "survey-engine/data_types";
import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { PDiff } from "./surveys/PDiff";
import { ExampleSurvey } from "./surveys/ExampleSurvey";

const isChildParticipant = () => StudyEngine.lt(
  StudyEngine.getResponseValueAsNum(PDiff.Q7.key, 'rg.num'),
  18,
)

const handleTriggerTBFlowLogic = () => StudyEngine.if(
  // If:
  StudyEngine.and(
    StudyEngine.singleChoice.any(PDiff.Q1.key, PDiff.Q1.optionKeys.yes),
    StudyEngine.singleChoice.none(PDiff.Q2.key, PDiff.Q2.optionKeys.yes),
    StudyEngine.singleChoice.any(PDiff.Q3.key, PDiff.Q3.optionKeys.no),
    StudyEngine.singleChoice.any(PDiff.Q4.key, PDiff.Q4.optionKeys.no),
  ),
  // Then:
  StudyEngine.if(
    isChildParticipant(),
    StudyEngine.do(
      StudyEngine.participantActions.updateFlag('ageCategory', 'child'),
      // TODO: add surveys according to TBkids flow
    ),
    StudyEngine.do(
      StudyEngine.participantActions.updateFlag('ageCategory', 'adult')
      // TODO: add surveys according to TBflow
    )
  )
);

const handleTriggerEMFlowLogic = () => StudyEngine.if(
  // If:
  StudyEngine.or(
    StudyEngine.and(
      StudyEngine.singleChoice.any(PDiff.Q3.key, PDiff.Q3.optionKeys.yes),
      StudyEngine.singleChoice.any(PDiff.Q4.key, PDiff.Q4.optionKeys.no),
    ),
    StudyEngine.and(
      StudyEngine.singleChoice.any(PDiff.Q3.key, PDiff.Q3.optionKeys.yes),
      StudyEngine.singleChoice.any(PDiff.Q4.key, PDiff.Q4.optionKeys.yes),
      StudyEngine.multipleChoice.none(PDiff.Q5.key, PDiff.Q5.optionKeys.andere),
    ),
    StudyEngine.and(
      StudyEngine.singleChoice.any(PDiff.Q3.key, PDiff.Q3.optionKeys.yes),
      StudyEngine.singleChoice.any(PDiff.Q4.key, PDiff.Q4.optionKeys.yes),
      StudyEngine.multipleChoice.any(PDiff.Q5.key, PDiff.Q5.optionKeys.andere),
      StudyEngine.singleChoice.any(PDiff.Q6.key, PDiff.Q6.optionKeys.no),
    ),
  ),
  // Then
  StudyEngine.if(
    isChildParticipant(),
    StudyEngine.do(
      StudyEngine.participantActions.updateFlag('ageCategory', 'child'),
      // TODO: add surveys according to TBkids flow
    ),
    StudyEngine.do(
      StudyEngine.participantActions.updateFlag('ageCategory', 'adult')
      // TODO: add surveys according to TBflow
    )
  )
)

const handlePDiffSubmit = StudyEngine.ifThen(
  StudyEngine.checkSurveyResponseKey(PDiff.key),

  // TODO: implement flow decisions
  handleTriggerTBFlowLogic(),
  handleTriggerEMFlowLogic(),

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
