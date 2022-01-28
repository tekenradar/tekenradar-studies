import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { Duration } from "case-editor-tools/types/duration";
import { Expression } from "survey-engine/data_types";
import { ParticipantFlags } from "../participantFlags";
import { emailKeys } from "../studyRules";
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
import { hasChronicflowCondition, hasEMFlowCondition, hasFEflowCondition, hasLBflowCondition, hasTBFlowCondition, hasWeeklyTBCondition } from "./pdiffRules";

const isChildParticipant = () => StudyEngine.lt(
  StudyEngine.getResponseValueAsNum(PDiff.Q7.key, 'rg.num'),
  18,
)

export const isLoggedIn = () => StudyEngine.participantState.hasStudyStatus('active')

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
export const handlePDiffRuleFor_TBflow = () => StudyEngine.ifThen(
  // If:
  hasTBFlowCondition(),
  // Then:
  StudyEngine.if(
    isChildParticipant(),
    // Then:
    StudyEngine.participantActions.assignedSurveys.add(TBflow_Kids.key, 'immediate'),
    // Else:
    StudyEngine.participantActions.assignedSurveys.add(TBflow_Adults.key, 'immediate'),
  ),
  StudyEngine.if(
    // if not in a follow up flow:
    StudyEngine.not(
      StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.active)
    ),
    // then:
    StudyEngine.participantActions.updateFlag(ParticipantFlags.flow.key, ParticipantFlags.flow.values.TBflow),
  )
)

/**
 * PDIFF - EM FLOW
 */
export const handlePDiffRuleFor_EMflow = () => StudyEngine.ifThen(
  // If:
  hasEMFlowCondition(),
  // Then:
  StudyEngine.if(
    isChildParticipant(),
    // Then:
    StudyEngine.participantActions.assignedSurveys.add(EMflow_Kids.key, 'immediate'),
    // Else:
    StudyEngine.participantActions.assignedSurveys.add(EMflow_Adults.key, 'immediate'),
  ),
  StudyEngine.participantActions.messages.add(emailKeys.FlowReminder, StudyEngine.timestampWithOffset({ hours: 24 })),
  StudyEngine.ifThen(
    StudyEngine.or(
      // not in a follow up:
      StudyEngine.not(
        StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.active)
      ),
      // or in an other flow:
      StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.flow.key, ParticipantFlags.flow.values.TBflow)
    ),
    // then:
    StudyEngine.participantActions.updateFlag(ParticipantFlags.flow.key, ParticipantFlags.flow.values.EMflow),
    StudyEngine.participantActions.removeFlag(ParticipantFlags.followUp.key), // Reset follow up if there was any
  )
)

/**
 * PDIFF - FE FLOW
 */
export const handlePDiffRuleFor_FEflow = () => StudyEngine.ifThen(
  // If:
  hasFEflowCondition(),
  // Then:
  StudyEngine.if(
    isChildParticipant(),
    // Then:
    StudyEngine.participantActions.assignedSurveys.add(TBflow_Kids.key, 'immediate'),
    // Else:
    StudyEngine.participantActions.assignedSurveys.add(Feverflow_Adults.key, 'immediate'),
  ),
  StudyEngine.participantActions.messages.add(emailKeys.FlowReminder, StudyEngine.timestampWithOffset({ hours: 24 })),
  StudyEngine.ifThen(
    StudyEngine.or(
      // not in a follow up:
      StudyEngine.not(
        StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.active)
      ),
      // or in an other flow:
      StudyEngine.or(
        StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.flow.key, ParticipantFlags.flow.values.TBflow),
        StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.flow.key, ParticipantFlags.flow.values.EMflow),
      )
    ),
    // then:
    StudyEngine.participantActions.updateFlag(ParticipantFlags.flow.key, ParticipantFlags.flow.values.FEflow),
    StudyEngine.participantActions.removeFlag(ParticipantFlags.followUp.key), // Reset follow up if there was any
  )
)

/**
 * PDIFF - LB FLOW
 */
export const handlePDiffRuleFor_LBflow = () => StudyEngine.ifThen(
  // If:
  hasLBflowCondition(),
  // Then
  StudyEngine.if(
    isChildParticipant(),
    // Then:
    StudyEngine.participantActions.assignedSurveys.add(LBflow_Kids.key, 'immediate'),
    // Else:
    StudyEngine.participantActions.assignedSurveys.add(LBflow_Adults.key, 'immediate'),
  ),
  StudyEngine.participantActions.messages.add(emailKeys.FlowReminder, StudyEngine.timestampWithOffset({ hours: 24 })),
  StudyEngine.ifThen(
    StudyEngine.or(
      // not in a follow up:
      StudyEngine.not(
        StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.active)
      ),
      // or in an other flow:
      StudyEngine.or(
        StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.flow.key, ParticipantFlags.flow.values.TBflow),
        StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.flow.key, ParticipantFlags.flow.values.EMflow),
        StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.flow.key, ParticipantFlags.flow.values.FEflow),
      )
    ),
    // then:
    StudyEngine.participantActions.updateFlag(ParticipantFlags.flow.key, ParticipantFlags.flow.values.LBflow),
    StudyEngine.participantActions.removeFlag(ParticipantFlags.followUp.key), // Reset follow up if there was any
  )
)

/**
 * PDIFF - Chronic FLOW
 */
export const handlePDiffRuleFor_Chronicflow = () => {
  return StudyEngine.ifThen(
    // If:
    hasChronicflowCondition(),
    // Then:
    StudyEngine.if(
      isChildParticipant(),
      // Then:
      StudyEngine.participantActions.assignedSurveys.add(Chronicflow_Kids.key, 'immediate'),
      // Else:
      StudyEngine.participantActions.assignedSurveys.add(Chronicflow_Adults.key, 'immediate'),
    ),
    StudyEngine.participantActions.messages.add(emailKeys.FlowReminder, StudyEngine.timestampWithOffset({ hours: 24 })),
    StudyEngine.ifThen(
      StudyEngine.or(
        // not in a follow up:
        StudyEngine.not(
          StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.active)
        ),
        // or in an other flow:
        StudyEngine.or(
          StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.flow.key, ParticipantFlags.flow.values.TBflow),
          StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.flow.key, ParticipantFlags.flow.values.EMflow),
          StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.flow.key, ParticipantFlags.flow.values.FEflow),
          StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.flow.key, ParticipantFlags.flow.values.LBflow),
        )
      ),
      // then:
      StudyEngine.participantActions.updateFlag(ParticipantFlags.flow.key, ParticipantFlags.flow.values.Chronicflow),
      StudyEngine.participantActions.removeFlag(ParticipantFlags.followUp.key), // Reset follow up if there was any
    )
  )
}

export const handlePDiffRuleFor_WeeklyTB = () => StudyEngine.if(
  // If:
  hasWeeklyTBCondition(),
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
  StudyEngine.participantActions.assignedSurveys.remove(T3_Adults.key, 'all'),
  StudyEngine.participantActions.assignedSurveys.remove(T6_Adults.key, 'all'),
  StudyEngine.participantActions.assignedSurveys.remove(T9_Adults.key, 'all'),
  StudyEngine.participantActions.assignedSurveys.remove(T12_Adults.key, 'all'),
  removeFollowUpMessagesForSurvey(T3_Adults.key),
  removeFollowUpMessagesForSurvey(T6_Adults.key),
  removeFollowUpMessagesForSurvey(T9_Adults.key),
  removeFollowUpMessagesForSurvey(T12_Adults.key),
  addFollowUpSurvey(T3_Adults.key, 90, 89),
  addFollowUpSurvey(T6_Adults.key, 180, 89),
  addFollowUpSurvey(T9_Adults.key, 270, 89),
  addFollowUpSurvey(T12_Adults.key, 360, 89),
)

export const initFollowUpFlow_Kids = () => StudyEngine.do(
  // Reset any existing flow:
  StudyEngine.participantActions.assignedSurveys.remove(T3_Kids.key, 'all'),
  StudyEngine.participantActions.assignedSurveys.remove(T6_Kids.key, 'all'),
  StudyEngine.participantActions.assignedSurveys.remove(T9_Kids.key, 'all'),
  StudyEngine.participantActions.assignedSurveys.remove(T12_Kids.key, 'all'),
  removeFollowUpMessagesForSurvey(T3_Kids.key),
  removeFollowUpMessagesForSurvey(T6_Kids.key),
  removeFollowUpMessagesForSurvey(T9_Kids.key),
  removeFollowUpMessagesForSurvey(T12_Kids.key),
  // Init new flow:
  addFollowUpSurvey(T3_Kids.key, 90, 89),
  addFollowUpSurvey(T6_Kids.key, 180, 89),
  addFollowUpSurvey(T9_Kids.key, 270, 89),
  addFollowUpSurvey(T12_Kids.key, 360, 89),
)
