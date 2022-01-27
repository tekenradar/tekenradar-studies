import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { Duration } from "case-editor-tools/types/duration";
import { Expression } from "survey-engine/data_types";
import { ParticipantFlags } from "../participantFlags";
import { Chronicflow_Adults } from "../surveys/Chronicflow_Adults";
import { Chronicflow_Kids } from "../surveys/Chronicflow_Kids";
import { EMflow_Adults } from "../surveys/EMflow_Adults";
import { EMflow_Kids } from "../surveys/EMflow_Kids";
import { Feverflow_Adults } from "../surveys/Feverflow_Adults";
import { LBflow_Adults } from "../surveys/LBflow_Adults";
import { LBflow_Kids } from "../surveys/LBflow_Kids";
import { PDiff } from "../surveys/PDiff";
import { Standardflow_Adults } from "../surveys/Standardflow_Adults";
import { Standardflow_Kids } from "../surveys/Standardflow_Kids";
import { T12_Adults } from "../surveys/T12_Adults";
import { T12_Kids } from "../surveys/T12_Kids";
import { T3_Adults } from "../surveys/T3_Adults";
import { T3_Kids } from "../surveys/T3_Kids";
import { T6_Adults } from "../surveys/T6_Adults";
import { T6_Kids } from "../surveys/T6_Kids";
import { T9_Adults } from "../surveys/T9_Adults";
import { T9_Kids } from "../surveys/T9_Kids";
import { TBflow_Adults } from "../surveys/TBflow_Adults";
import { TBflow_Kids } from "../surveys/TBflow_Kids";
import { WeeklyTB } from "../surveys/WeeklyTB";

const isChildParticipant = () => StudyEngine.lt(
  StudyEngine.getResponseValueAsNum(PDiff.Q7.key, 'rg.num'),
  18,
)

const isLoggedIn = () => StudyEngine.participantState.hasStudyStatus('active')

const hasSurveyKeyValidUntilSoonerThan = (surveyKey: string, delta: Duration, reference?: number | Expression) => {
  return StudyEngine.gt(
    StudyEngine.timestampWithOffset(delta, reference),
    StudyEngine.participantState.getSurveyKeyAssignedUntil(surveyKey),
  )
}

export const isSurveyExpired = (surveyKey: string) => StudyEngine.and(
  StudyEngine.participantState.hasSurveyKeyAssigned(surveyKey),
  hasSurveyKeyValidUntilSoonerThan(surveyKey, { seconds: 0 })
)

export const handleExpired_removeSurvey = (surveyKey: string) => StudyEngine.ifThen(
  isSurveyExpired(surveyKey),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(surveyKey, 'all'),
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
 * PDIFF - TB FLOW
 */
const hasTBFlowCondition = () => StudyEngine.and(
  StudyEngine.singleChoice.any(PDiff.Q1.key, PDiff.Q1.optionKeys.yes),
  StudyEngine.singleChoice.none(PDiff.Q2.key, PDiff.Q2.optionKeys.yes),
  StudyEngine.singleChoice.any(PDiff.Q3.key, PDiff.Q3.optionKeys.no),
  StudyEngine.singleChoice.any(PDiff.Q4.key, PDiff.Q4.optionKeys.no),
)

export const handlePDiffNormal_TBflow = () => StudyEngine.ifThen(
  // If:
  hasTBFlowCondition(),
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

export const handlePDiffUpdate_TBflow = () => StudyEngine.ifThen(
  // If:
  hasTBFlowCondition(),
  // Then:
  StudyEngine.if(
    isChildParticipant(),
    // Then:
    StudyEngine.participantActions.assignedSurveys.add(TBflow_Kids.key, 'immediate'),
    // Else:
    StudyEngine.participantActions.assignedSurveys.add(TBflow_Adults.key, 'immediate'),
  )
)

/**
 * PDIFF - EM FLOW
 */
const hasEMFlowCondition = () => StudyEngine.or(
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

export const handlePDiffNormal_EMflow = () => StudyEngine.ifThen(
  // If:
  hasEMFlowCondition(),
  // Then:
  StudyEngine.participantActions.updateFlag(ParticipantFlags.flow.key, ParticipantFlags.flow.values.EMflow),
  StudyEngine.if(
    isChildParticipant(),
    // Then:
    StudyEngine.do(
      StudyEngine.participantActions.assignedSurveys.add(EMflow_Kids.key, 'immediate'),
      StudyEngine.participantActions.assignedSurveys.add(Standardflow_Kids.key, 'immediate'),
    ),
    // Else:
    StudyEngine.do(
      StudyEngine.participantActions.assignedSurveys.add(EMflow_Adults.key, 'immediate'),
      StudyEngine.participantActions.assignedSurveys.add(Standardflow_Adults.key, 'immediate'),
    ),
  )
)

export const handlePDiffUpdate_EMflow = () => StudyEngine.ifThen(
  // If:
  hasEMFlowCondition(),
  // Then:
  /*StudyEngine.ifThen(
    StudyEngine.participantState.
      // Then:
      StudyEngine.participantActions.updateFlag(ParticipantFlags.flow.key, ParticipantFlags.flow.values.EMflow),
  ),
  StudyEngine.if(
    isChildParticipant(),
    // Then:
    StudyEngine.participantActions.assignedSurveys.add(EMflow_Kids.key, 'immediate'),
    // Else:
    StudyEngine.participantActions.assignedSurveys.add(EMflow_Adults.key, 'immediate'),
  )*/
)


/**
 * PDIFF - FE FLOW
 */
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
  StudyEngine.or(
    // Already in weekly reporting:
    StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.weeklyTBreporter.key, ParticipantFlags.weeklyTBreporter.values.true),
    // Or wants to join:
    StudyEngine.singleChoice.any(
      PDiff.Q8.key,
      PDiff.Q8.optionKeys.yes,
      PDiff.Q8.optionKeys.alreadyDoing,
    ),
  ),
  // Then:
  StudyEngine.do(
    StudyEngine.participantActions.updateFlag(ParticipantFlags.weeklyTBreporter.key, ParticipantFlags.weeklyTBreporter.values.true),
    StudyEngine.participantActions.assignedSurveys.remove(WeeklyTB.key, 'all'),
    StudyEngine.participantActions.assignedSurveys.add(WeeklyTB.key, 'immediate'),
  ),
  // Else:
  StudyEngine.participantActions.updateFlag(ParticipantFlags.weeklyTBreporter.key, ParticipantFlags.weeklyTBreporter.values.false),
)


/**
 * FOLLOW UP FLOW UTILS
 */
export const removeFollowUpMessagesForSurvey = (surveyKey: string) => {
  const inviteMessage = surveyKey + '_invite';
  const reminderMessage = surveyKey + '_reminder';

  return StudyEngine.do(
    StudyEngine.participantActions.messages.remove(inviteMessage),
    StudyEngine.participantActions.messages.remove(reminderMessage),
  )
}

const addFollowUpSurvey = (surveyKey: string, startInDays: number, activeForDays: number) => {
  const inviteMessage = surveyKey + '_invite';
  const reminderMessage = surveyKey + '_reminder';
  return StudyEngine.do(
    StudyEngine.participantActions.assignedSurveys.add(
      surveyKey,
      'normal',
      StudyEngine.timestampWithOffset({
        days: startInDays,
      }), StudyEngine.timestampWithOffset({
        days: startInDays + activeForDays,
      })),
    StudyEngine.participantActions.messages.add(
      inviteMessage,
      StudyEngine.timestampWithOffset({
        days: startInDays,
      })),
    StudyEngine.participantActions.messages.add(
      reminderMessage,
      StudyEngine.timestampWithOffset({
        days: startInDays + 7,
      })),
    StudyEngine.participantActions.messages.add(
      reminderMessage,
      StudyEngine.timestampWithOffset({
        days: startInDays + 14,
      })),
  )
}


export const initFollowUpFlow_Adults = () => StudyEngine.do(
  addFollowUpSurvey(T3_Adults.key, 90, 89),
  addFollowUpSurvey(T6_Adults.key, 180, 89),
  addFollowUpSurvey(T9_Adults.key, 270, 89),
  addFollowUpSurvey(T12_Adults.key, 360, 89),
)

export const initFollowUpFlow_Kids = () => StudyEngine.do(
  addFollowUpSurvey(T3_Kids.key, 90, 89),
  addFollowUpSurvey(T6_Kids.key, 180, 89),
  addFollowUpSurvey(T9_Kids.key, 270, 89),
  addFollowUpSurvey(T12_Kids.key, 360, 89),
)
