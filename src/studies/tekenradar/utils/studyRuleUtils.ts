import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { ParticipantFlags } from "../participantFlags";
import { Chronicflow_Adults } from "../surveys/Chronicflow_Adults";
import { Chronicflow_Kids } from "../surveys/Chronicflow_Kids";
import { EMflow_Adults } from "../surveys/EMflow_Adults";
import { EMflow_Kids } from "../surveys/EMflow_Kids";
import { Feverflow_Adults } from "../surveys/Feverflow_Adults";
import { LBflow_Adults } from "../surveys/LBflow_Adults";
import { LBflow_Kids } from "../surveys/LBflow_Kids";
import { PDiff } from "../surveys/PDiff";
import { TBflow_Adults } from "../surveys/TBflow_Adults";
import { TBflow_Kids } from "../surveys/TBflow_Kids";
import { WeeklyTB } from "../surveys/WeeklyTB";

const isChildParticipant = () => StudyEngine.lt(
  StudyEngine.getResponseValueAsNum(PDiff.Q7.key, 'rg.num'),
  18,
)

/**
 *
 */
export const updateAgeFlags = () => StudyEngine.do(
  StudyEngine.if(
    // IF:
    isChildParticipant(),
    // THEN:
    StudyEngine.do(
      StudyEngine.participantActions.updateFlag(
        ParticipantFlags.ageCategory.key,
        ParticipantFlags.ageCategory.values.child
      ),
      // Also store the actual age into a flag for children:
      StudyEngine.participantActions.updateFlag(
        ParticipantFlags.ageFromPDiff.key,
        StudyEngine.getResponseValueAsNum(PDiff.Q7.key, 'rg.num'),
      ),
    ),
    // ELSE:
    StudyEngine.participantActions.updateFlag(
      ParticipantFlags.ageCategory.key,
      ParticipantFlags.ageCategory.values.adult
    )
  )
)

/**
 *
 */
export const handleTrigger_TBflow = () => StudyEngine.ifThen(
  // If:
  StudyEngine.and(
    StudyEngine.singleChoice.any(PDiff.Q1.key, PDiff.Q1.optionKeys.yes),
    StudyEngine.singleChoice.none(PDiff.Q2.key, PDiff.Q2.optionKeys.yes),
    StudyEngine.singleChoice.any(PDiff.Q3.key, PDiff.Q3.optionKeys.no),
    StudyEngine.singleChoice.any(PDiff.Q4.key, PDiff.Q4.optionKeys.no),
  ),
  // Then:
  StudyEngine.participantActions.updateFlag(ParticipantFlags.flow.key, ParticipantFlags.flow.values.TBflow),
  StudyEngine.if(
    isChildParticipant(),
    // Then:
    StudyEngine.participantActions.assignedSurveys.add(TBflow_Kids.key, 'immediate'),
    // Else:
    StudyEngine.participantActions.assignedSurveys.add(TBflow_Adults.key, 'immediate'),
  )
)

/**
 *
 */
export const handleTrigger_EMflow = () => StudyEngine.ifThen(
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
  // Then:
  StudyEngine.participantActions.updateFlag(ParticipantFlags.flow.key, ParticipantFlags.flow.values.EMflow),
  StudyEngine.if(
    isChildParticipant(),
    // Then:
    StudyEngine.participantActions.assignedSurveys.add(EMflow_Kids.key, 'immediate'),
    // Else:
    StudyEngine.participantActions.assignedSurveys.add(EMflow_Adults.key, 'immediate'),
  )
)

export const handleTrigger_FEflow = () => StudyEngine.ifThen(
  // If:
  StudyEngine.or(
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
  ),
  // Then:
  StudyEngine.participantActions.updateFlag(ParticipantFlags.flow.key, ParticipantFlags.flow.values.FEflow),
  StudyEngine.if(
    isChildParticipant(),
    // Then:
    StudyEngine.participantActions.assignedSurveys.add(TBflow_Kids.key, 'immediate'),
    // Else:
    StudyEngine.participantActions.assignedSurveys.add(Feverflow_Adults.key, 'immediate'),
  )
)

const Q6DateInputKey = `rg.scg.${PDiff.Q6.optionKeys.yes.option}.${PDiff.Q6.optionKeys.yes.dateInput}`;
const getQ6DateValue = () => StudyEngine.getResponseValueAsNum(PDiff.Q6.key, Q6DateInputKey);

export const handleTrigger_LBflow = () => StudyEngine.ifThen(
  // If:
  StudyEngine.or(
    StudyEngine.and(
      StudyEngine.singleChoice.any(PDiff.Q3.key, PDiff.Q3.optionKeys.yes),
      StudyEngine.singleChoice.any(PDiff.Q4.key, PDiff.Q4.optionKeys.yes),
      StudyEngine.multipleChoice.any(PDiff.Q5.key, PDiff.Q5.optionKeys.andere),
      StudyEngine.or(
        StudyEngine.and(
          StudyEngine.singleChoice.any(PDiff.Q6.key, PDiff.Q6.optionKeys.yes.option),
          StudyEngine.lte(
            getQ6DateValue(),
            StudyEngine.timestampWithOffset({ days: -4 }),
          ),
        ),
        StudyEngine.singleChoice.any(PDiff.Q6.key, PDiff.Q6.optionKeys.startSoon)
      )
    ),
    StudyEngine.and(
      StudyEngine.singleChoice.any(PDiff.Q3.key, PDiff.Q3.optionKeys.no),
      StudyEngine.singleChoice.any(PDiff.Q4.key, PDiff.Q4.optionKeys.no),
      // Q5 has no influence here
      StudyEngine.or(
        StudyEngine.and(
          StudyEngine.singleChoice.any(PDiff.Q6.key, PDiff.Q6.optionKeys.yes.option),
          StudyEngine.lte(
            getQ6DateValue(),
            StudyEngine.timestampWithOffset({ days: -4 }),
          ),
        ),
        StudyEngine.singleChoice.any(PDiff.Q6.key, PDiff.Q6.optionKeys.startSoon, PDiff.Q6.optionKeys.no)
      )
    ),
  ),
  // Then
  StudyEngine.participantActions.updateFlag(ParticipantFlags.flow.key, ParticipantFlags.flow.values.LBflow),
  StudyEngine.if(
    isChildParticipant(),
    // Then:
    StudyEngine.participantActions.assignedSurveys.add(LBflow_Kids.key, 'immediate'),
    // Else:
    StudyEngine.participantActions.assignedSurveys.add(LBflow_Adults.key, 'immediate'),
  )
)

export const handleTrigger_Chronicflow = () => {
  const Q6dateCondition = StudyEngine.and(
    StudyEngine.singleChoice.any(PDiff.Q6.key, PDiff.Q6.optionKeys.yes.option),
    StudyEngine.or(
      StudyEngine.gt(
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

  return StudyEngine.ifThen(
    // If:
    StudyEngine.or(
      StudyEngine.and(
        StudyEngine.singleChoice.any(PDiff.Q3.key, PDiff.Q3.optionKeys.yes),
        StudyEngine.singleChoice.any(PDiff.Q4.key, PDiff.Q4.optionKeys.yes),
        StudyEngine.multipleChoice.any(PDiff.Q5.key, PDiff.Q5.optionKeys.andere),
        Q6dateCondition
      ),
      StudyEngine.and(
        StudyEngine.singleChoice.none(PDiff.Q2.key, PDiff.Q2.optionKeys.yes),
        StudyEngine.singleChoice.any(PDiff.Q3.key, PDiff.Q3.optionKeys.no),
        StudyEngine.singleChoice.any(PDiff.Q4.key, PDiff.Q4.optionKeys.yes),
        Q6dateCondition
      )
    ),
    // Then
    StudyEngine.participantActions.updateFlag(ParticipantFlags.flow.key, ParticipantFlags.flow.values.Chronicflow),
    StudyEngine.if(
      isChildParticipant(),
      // Then:
      StudyEngine.participantActions.assignedSurveys.add(Chronicflow_Kids.key, 'immediate'),
      // Else:
      StudyEngine.participantActions.assignedSurveys.add(Chronicflow_Adults.key, 'immediate'),
    )
  )
}

export const handleTrigger_WeeklyTB = () => StudyEngine.if(
  // If:
  StudyEngine.singleChoice.any(
    PDiff.Q8.key,
    PDiff.Q8.optionKeys.yes
  ),
  // Then:
  StudyEngine.do(
    StudyEngine.participantActions.updateFlag(ParticipantFlags.weeklyTBreporter.key, ParticipantFlags.weeklyTBreporter.values.true),
    StudyEngine.participantActions.assignedSurveys.add(WeeklyTB.key, 'immediate'),
  ),
  // Else:
  StudyEngine.participantActions.updateFlag(ParticipantFlags.weeklyTBreporter.key, ParticipantFlags.weeklyTBreporter.values.false),
)
