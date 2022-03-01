import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { ParticipantFlags } from "../participantFlags";
import { PDiff } from "../surveys/PDiff";


const Q6DateInputKey = `rg.scg.${PDiff.Q6.optionKeys.yes.option}.${PDiff.Q6.optionKeys.yes.dateInput}`;
const getQ6DateValue = () => StudyEngine.getResponseValueAsNum(PDiff.Q6.key, Q6DateInputKey);


export const hasTBFlowCondition = () => StudyEngine.and(
  StudyEngine.singleChoice.any(PDiff.Q1.key, PDiff.Q1.optionKeys.yes),
  StudyEngine.singleChoice.none(PDiff.Q2.key, PDiff.Q2.optionKeys.yes),
  StudyEngine.singleChoice.any(PDiff.Q3.key, PDiff.Q3.optionKeys.no),
  StudyEngine.singleChoice.any(PDiff.Q4.key, PDiff.Q4.optionKeys.no),
)

export const hasEMFlowCondition = () => StudyEngine.or(
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
)

export const hasFEflowCondition = () => StudyEngine.or(
  StudyEngine.and(
    StudyEngine.singleChoice.any(PDiff.Q1.key, PDiff.Q1.optionKeys.yes),
    StudyEngine.singleChoice.any(PDiff.Q2.key, PDiff.Q2.optionKeys.yes),
    StudyEngine.singleChoice.any(PDiff.Q3.key, PDiff.Q3.optionKeys.no),
    StudyEngine.singleChoice.any(PDiff.Q4.key, PDiff.Q4.optionKeys.no),
  ),
  StudyEngine.and(
    StudyEngine.singleChoice.any(PDiff.Q1.key, PDiff.Q1.optionKeys.yes),
    StudyEngine.singleChoice.any(PDiff.Q2.key, PDiff.Q2.optionKeys.yes),
    StudyEngine.singleChoice.any(PDiff.Q3.key, PDiff.Q3.optionKeys.no),
    StudyEngine.singleChoice.any(PDiff.Q4.key, PDiff.Q4.optionKeys.yes),
    StudyEngine.multipleChoice.any(PDiff.Q5.key, PDiff.Q5.optionKeys.fever),
    StudyEngine.multipleChoice.none(PDiff.Q5.key, PDiff.Q5.optionKeys.posTest, PDiff.Q5.optionKeys.andere),
  ),
)

export const hasLBflowCondition = () => StudyEngine.or(
  StudyEngine.and(
    StudyEngine.singleChoice.any(PDiff.Q3.key, PDiff.Q3.optionKeys.yes),
    StudyEngine.singleChoice.any(PDiff.Q4.key, PDiff.Q4.optionKeys.yes),
    StudyEngine.multipleChoice.any(PDiff.Q5.key, PDiff.Q5.optionKeys.andere),
    StudyEngine.or(
      StudyEngine.and(
        StudyEngine.singleChoice.any(PDiff.Q6.key, PDiff.Q6.optionKeys.yes.option),
        StudyEngine.gte(
          getQ6DateValue(),
          StudyEngine.timestampWithOffset({ days: -4 }),
        ),
      ),
      StudyEngine.singleChoice.any(PDiff.Q6.key, PDiff.Q6.optionKeys.startSoon)
    )
  ),
  StudyEngine.and(
    StudyEngine.singleChoice.any(PDiff.Q3.key, PDiff.Q3.optionKeys.no),
    StudyEngine.singleChoice.any(PDiff.Q4.key, PDiff.Q4.optionKeys.yes),
    // Q5 has no influence here
    StudyEngine.or(
      StudyEngine.and(
        StudyEngine.singleChoice.any(PDiff.Q6.key, PDiff.Q6.optionKeys.yes.option),
        StudyEngine.gte(
          getQ6DateValue(),
          StudyEngine.timestampWithOffset({ days: -4 }),
        ),
      ),
      StudyEngine.singleChoice.any(PDiff.Q6.key, PDiff.Q6.optionKeys.startSoon, PDiff.Q6.optionKeys.no)
    )
  ),
)

export const hasChronicflowCondition = () => {
  const Q6dateCondition = StudyEngine.and(
    StudyEngine.singleChoice.any(PDiff.Q6.key, PDiff.Q6.optionKeys.yes.option),
    StudyEngine.or(
      StudyEngine.lt(
        getQ6DateValue(),
        StudyEngine.timestampWithOffset({ days: -4 }),
      ),
      // Not defined, aka 0
      StudyEngine.not(
        StudyEngine.hasResponseKey(
          PDiff.Q6.key,
          Q6DateInputKey
        )
      ),
    )
  );

  return StudyEngine.or(
    StudyEngine.and(
      StudyEngine.singleChoice.any(PDiff.Q3.key, PDiff.Q3.optionKeys.yes),
      StudyEngine.singleChoice.any(PDiff.Q4.key, PDiff.Q4.optionKeys.yes),
      StudyEngine.multipleChoice.any(PDiff.Q5.key, PDiff.Q5.optionKeys.andere),
      Q6dateCondition
    ),
    StudyEngine.and(
      StudyEngine.singleChoice.any(PDiff.Q1.key, PDiff.Q1.optionKeys.yes),
      StudyEngine.singleChoice.none(PDiff.Q2.key, PDiff.Q2.optionKeys.yes),
      StudyEngine.singleChoice.any(PDiff.Q3.key, PDiff.Q3.optionKeys.no),
      StudyEngine.singleChoice.any(PDiff.Q4.key, PDiff.Q4.optionKeys.yes),
      Q6dateCondition
    ),
    StudyEngine.and(
      StudyEngine.singleChoice.any(PDiff.Q1.key, PDiff.Q1.optionKeys.no),
      StudyEngine.singleChoice.any(PDiff.Q3.key, PDiff.Q3.optionKeys.no),
      StudyEngine.singleChoice.any(PDiff.Q4.key, PDiff.Q4.optionKeys.yes),
      Q6dateCondition
    )
  )
}


export const hasWeeklyTBCondition = () => StudyEngine.or(
  // Already in weekly reporting:
  StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.weeklyTBreporter.key, ParticipantFlags.weeklyTBreporter.values.true),
  StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.weeklyTBreporter.key, ParticipantFlags.weeklyTBreporter.values.init),
  // Or wants to join:
  StudyEngine.singleChoice.any(
    PDiff.Q8.key,
    PDiff.Q8.optionKeys.yes,
    PDiff.Q8.optionKeys.alreadyDoing,
  ),
)
