import { clozeKey, numericInputKey, responseGroupKey, singleChoiceKey } from "case-editor-tools/constants/key-definitions";
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
import { QuitFollowUp } from "../surveys/QuitFollowUp";
import { QuitWeeklyTB } from "../surveys/QuitWeekly";
import { Standardflow_Adults } from "../surveys/Standardflow_Adults";
import { Standardflow_Kids } from "../surveys/Standardflow_Kids";
import { T0_Invites } from "../surveys/T0_Invites";
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
export const resetToPDiffStart = () => StudyEngine.do(
  StudyEngine.participantActions.assignedSurveys.removeAll(),
  StudyEngine.participantActions.messages.removeAll(),
  StudyEngine.ifThen(
    StudyEngine.or(
      StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.weeklyTBreporter.key, ParticipantFlags.weeklyTBreporter.values.true),
      StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.weeklyTBreporter.key, ParticipantFlags.weeklyTBreporter.values.init),
    ),
    StudyEngine.participantActions.assignedSurveys.add(WeeklyTB.key, 'prio'),
    StudyEngine.participantActions.assignedSurveys.add(QuitWeeklyTB.key, 'optional'),
  ),
)


export const assignStandardFlow = (version: 'adults' | 'kids') => StudyEngine.do(
  StudyEngine.participantActions.assignedSurveys.remove(version === 'adults' ? Standardflow_Adults.key : Standardflow_Kids.key, 'all'),
  StudyEngine.participantActions.assignedSurveys.add(version === 'adults' ? Standardflow_Adults.key : Standardflow_Kids.key, 'immediate', 0, StudyEngine.timestampWithOffset({ days: 7 * 6 })),
  StudyEngine.participantActions.messages.add(emailKeys.StandardflowReminder, StudyEngine.timestampWithOffset({ hours: 24 })),
);

export const removeAllT0Surveys = () => StudyEngine.do(
  StudyEngine.participantActions.assignedSurveys.remove(TBflow_Adults.key, 'all'),
  StudyEngine.participantActions.assignedSurveys.remove(TBflow_Kids.key, 'all'),
  StudyEngine.participantActions.assignedSurveys.remove(EMflow_Adults.key, 'all'),
  StudyEngine.participantActions.assignedSurveys.remove(EMflow_Kids.key, 'all'),
  StudyEngine.participantActions.assignedSurveys.remove(Feverflow_Adults.key, 'all'),
  StudyEngine.participantActions.assignedSurveys.remove(LBflow_Adults.key, 'all'),
  StudyEngine.participantActions.assignedSurveys.remove(LBflow_Kids.key, 'all'),
  StudyEngine.participantActions.assignedSurveys.remove(Chronicflow_Adults.key, 'all'),
  StudyEngine.participantActions.assignedSurveys.remove(Chronicflow_Kids.key, 'all'),
  StudyEngine.participantActions.assignedSurveys.remove(T0_Invites.key, 'all'),
  StudyEngine.participantActions.assignedSurveys.remove(Standardflow_Kids.key, 'all'),
  StudyEngine.participantActions.assignedSurveys.remove(Standardflow_Adults.key, 'all'),
  StudyEngine.participantActions.messages.remove(emailKeys.FlowReminder),
  StudyEngine.participantActions.messages.remove(emailKeys.StandardflowReminder),
)

export const assignT0Invite = () => StudyEngine.do(
  StudyEngine.participantActions.assignedSurveys.remove(T0_Invites.key, 'all'),
  StudyEngine.participantActions.assignedSurveys.add(T0_Invites.key, 'immediate', 0, StudyEngine.timestampWithOffset({
    days: 1
  })),
)

export const reAssignWeeklyToTheEndOfList = () => StudyEngine.ifThen(
  StudyEngine.participantState.hasSurveyKeyAssigned(WeeklyTB.key),
  // Then: remove weekly and add again to the end of the list
  StudyEngine.participantActions.assignedSurveys.remove(WeeklyTB.key, 'all'),
  StudyEngine.if(
    StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.weeklyTBreporter.key, ParticipantFlags.weeklyTBreporter.values.true),
    // Then:
    StudyEngine.participantActions.assignedSurveys.add(WeeklyTB.key, 'normal'),
    // Else:
    StudyEngine.participantActions.assignedSurveys.add(WeeklyTB.key, 'immediate'),
  ),
  StudyEngine.ifThen(
    StudyEngine.not(StudyEngine.participantState.hasSurveyKeyAssigned(QuitWeeklyTB.key)),
    StudyEngine.participantActions.assignedSurveys.add(QuitWeeklyTB.key, 'optional'),
  )
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

export const kEMflagLogic = () => StudyEngine.ifThen(
  // if:
  StudyEngine.and(
    StudyEngine.singleChoice.any(EMflow_Kids.EM_B2.key, EMflow_Kids.EM_B2.optionKeys.yes),
    StudyEngine.gte(
      StudyEngine.getResponseValueAsNum(EMflow_Kids.EM_B3.key, `${responseGroupKey}.${numericInputKey}`),
      3
    ),
    StudyEngine.or(
      StudyEngine.and(
        StudyEngine.singleChoice.any(EMflow_Kids.EM_B1.key, EMflow_Kids.EM_B1.optionKeys.period.key),
        StudyEngine.gt(
          StudyEngine.getResponseValueAsNum(EMflow_Kids.EM_B1.key, `${responseGroupKey}.${singleChoiceKey}.${EMflow_Kids.EM_B1.optionKeys.period.key}.${EMflow_Kids.EM_B1.optionKeys.period.dateValue}`),
          StudyEngine.timestampWithOffset({ days: -90 })
        ),
      ),
      StudyEngine.singleChoice.any(EMflow_Kids.EM_B1.key, EMflow_Kids.EM_B1.optionKeys.unknown),
    ),
    StudyEngine.and(
      StudyEngine.singleChoice.any(EMflow_Kids.EM_B6.key, EMflow_Kids.EM_B6.optionKeys.yes),
      StudyEngine.gte(
        StudyEngine.getResponseValueAsNum(EMflow_Kids.LT2.key, `${responseGroupKey}.${clozeKey}.${EMflow_Kids.LT2.optionKeys.dayCount}`),
        3
      )
    ),
    StudyEngine.or(
      StudyEngine.singleChoice.any(EMflow_Kids.LT4.key, EMflow_Kids.LT4.optionKeys.no),
      StudyEngine.gte(
        StudyEngine.getResponseValueAsNum(EMflow_Kids.LT5.key, `${responseGroupKey}.${clozeKey}.2`),
        StudyEngine.timestampWithOffset({ days: -7 })
      )
    ),
    StudyEngine.or(
      StudyEngine.singleChoice.any(EMflow_Kids.G20_22.FLD.key, EMflow_Kids.G20_22.FLD.optionKeys.no),
      StudyEngine.singleChoice.any(EMflow_Kids.G20_22.Q3.key, EMflow_Kids.G20_22.Q3.optionKeys.yes)
    )
  ),
  // Then:
  StudyEngine.participantActions.updateFlag(ParticipantFlags.kEM.key, ParticipantFlags.kEM.values.likely),
)

export const updateGenderFlag = (genderQuestionKey: string) => StudyEngine.do(
  StudyEngine.ifThen(
    StudyEngine.singleChoice.any(genderQuestionKey, Standardflow_Adults.P2.optionKeys.male),
    StudyEngine.participantActions.updateFlag(ParticipantFlags.genderCategory.key, ParticipantFlags.genderCategory.values.male)
  ),
  StudyEngine.ifThen(
    StudyEngine.singleChoice.any(genderQuestionKey, Standardflow_Adults.P2.optionKeys.female),
    StudyEngine.participantActions.updateFlag(ParticipantFlags.genderCategory.key, ParticipantFlags.genderCategory.values.female)
  ),
  StudyEngine.ifThen(
    StudyEngine.singleChoice.any(genderQuestionKey, Standardflow_Adults.P2.optionKeys.other),
    StudyEngine.participantActions.updateFlag(ParticipantFlags.genderCategory.key, ParticipantFlags.genderCategory.values.other)
  ),
  StudyEngine.ifThen(
    StudyEngine.singleChoice.any(genderQuestionKey, Standardflow_Adults.P2.optionKeys.unknown),
    StudyEngine.participantActions.updateFlag(ParticipantFlags.genderCategory.key, ParticipantFlags.genderCategory.values.unknown)
  ),
)

export const updatePostalCodeFlag = (questionKey: string) => StudyEngine.ifThen(
  StudyEngine.hasResponseKey(questionKey, 'rg'),
  StudyEngine.participantActions.updateFlag(ParticipantFlags.postalCode.key, ParticipantFlags.postalCode.values.known)
)

export const finishFollowUp = () => StudyEngine.do(
  StudyEngine.participantActions.assignedSurveys.remove(QuitFollowUp.key, 'all'),
  StudyEngine.participantActions.updateFlag(ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.finished),
  StudyEngine.participantActions.removeFlag(ParticipantFlags.postalCode.key),
  StudyEngine.participantActions.removeFlag(ParticipantFlags.kEM.key)
)

export const quitFollowUp = () => StudyEngine.do(
  // StudyEngine.participantActions.assignedSurveys.remove(QuitFollowUp.key, 'all'),
  StudyEngine.participantActions.assignedSurveys.removeAll(),
  StudyEngine.participantActions.messages.removeAll(),
  StudyEngine.participantActions.updateFlag(ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.quitted),
  StudyEngine.participantActions.removeFlag(ParticipantFlags.postalCode.key),
  StudyEngine.participantActions.removeFlag(ParticipantFlags.kEM.key),
  StudyEngine.ifThen(
    StudyEngine.or(
      StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.weeklyTBreporter.key, ParticipantFlags.weeklyTBreporter.values.true),
      StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.weeklyTBreporter.key, ParticipantFlags.weeklyTBreporter.values.init),
    ),
    StudyEngine.participantActions.assignedSurveys.add(WeeklyTB.key, 'normal', StudyEngine.timestampWithOffset({ hours: 1 })),
    StudyEngine.participantActions.assignedSurveys.add(QuitWeeklyTB.key, 'optional'),
  ),
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
  StudyEngine.if(
    StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.active),
    // If part of a follow-up:
    StudyEngine.ifThen(
      StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.flow.key, ParticipantFlags.flow.values.TBflow),
      StudyEngine.if(
        isChildParticipant(),
        // Then:
        assignStandardFlow('kids'),
        // Else:
        assignStandardFlow('adults'),
      ),
      StudyEngine.participantActions.updateFlag(ParticipantFlags.flow.key, ParticipantFlags.flow.values.EMflow),
      StudyEngine.if(
        isChildParticipant(),
        // Then:
        initFollowUpFlow_Kids(),
        // Else:
        initFollowUpFlow_Adults()
      ),
    ),
    // Else (not in a follow up):
    StudyEngine.participantActions.updateFlag(ParticipantFlags.flow.key, ParticipantFlags.flow.values.EMflow),
  ),
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
  StudyEngine.if(
    StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.active),
    // If part of a follow-up:
    StudyEngine.ifThen(
      StudyEngine.or(
        StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.flow.key, ParticipantFlags.flow.values.TBflow),
        StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.flow.key, ParticipantFlags.flow.values.EMflow),
      ),
      StudyEngine.ifThen(
        StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.flow.key, ParticipantFlags.flow.values.TBflow),
        StudyEngine.if(
          isChildParticipant(),
          // Then:
          assignStandardFlow('kids'),
          // Else:
          assignStandardFlow('adults'),
        ),
      ),
      StudyEngine.participantActions.updateFlag(ParticipantFlags.flow.key, ParticipantFlags.flow.values.FEflow),
      StudyEngine.if(
        isChildParticipant(),
        // Then:
        initFollowUpFlow_Kids(),
        // Else:
        initFollowUpFlow_Adults()
      ),
    ),
    // Else (not in a follow up):
    StudyEngine.participantActions.updateFlag(ParticipantFlags.flow.key, ParticipantFlags.flow.values.FEflow),
  ),
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
  StudyEngine.if(
    StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.active),
    // If part of a follow-up:
    StudyEngine.ifThen(
      StudyEngine.or(
        StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.flow.key, ParticipantFlags.flow.values.TBflow),
        StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.flow.key, ParticipantFlags.flow.values.EMflow),
        StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.flow.key, ParticipantFlags.flow.values.FEflow),
      ),
      StudyEngine.ifThen(
        StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.flow.key, ParticipantFlags.flow.values.TBflow),
        StudyEngine.if(
          isChildParticipant(),
          // Then:
          assignStandardFlow('kids'),
          // Else:
          assignStandardFlow('adults'),
        ),
      ),
      StudyEngine.participantActions.updateFlag(ParticipantFlags.flow.key, ParticipantFlags.flow.values.LBflow),
      StudyEngine.if(
        isChildParticipant(),
        // Then:
        initFollowUpFlow_Kids(),
        // Else:
        initFollowUpFlow_Adults()
      ),
    ),
    // Else (not in a follow up):
    StudyEngine.participantActions.updateFlag(ParticipantFlags.flow.key, ParticipantFlags.flow.values.LBflow),
  ),
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
    StudyEngine.if(
      StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.active),
      // If part of a follow-up:
      StudyEngine.ifThen(
        StudyEngine.or(
          StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.flow.key, ParticipantFlags.flow.values.TBflow),
          StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.flow.key, ParticipantFlags.flow.values.EMflow),
          StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.flow.key, ParticipantFlags.flow.values.FEflow),
          StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.flow.key, ParticipantFlags.flow.values.LBflow),
        ),
        StudyEngine.ifThen(
          StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.flow.key, ParticipantFlags.flow.values.TBflow),
          StudyEngine.if(
            isChildParticipant(),
            // Then:
            assignStandardFlow('kids'),
            // Else:
            assignStandardFlow('adults'),
          ),
        ),
        StudyEngine.participantActions.updateFlag(ParticipantFlags.flow.key, ParticipantFlags.flow.values.Chronicflow),
        StudyEngine.if(
          isChildParticipant(),
          // Then:
          initFollowUpFlow_Kids(),
          // Else:
          initFollowUpFlow_Adults()
        ),
      ),
      // Else (not in a follow up):
      StudyEngine.participantActions.updateFlag(ParticipantFlags.flow.key, ParticipantFlags.flow.values.Chronicflow),
    ),
  )
}

export const handlePDiffRuleFor_WeeklyTB = () => StudyEngine.if(
  // If:
  hasWeeklyTBCondition(),
  // Then:
  StudyEngine.do(
    StudyEngine.if(
      StudyEngine.not(
        StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.weeklyTBreporter.key, ParticipantFlags.weeklyTBreporter.values.true),
      ),
      StudyEngine.participantActions.updateFlag(ParticipantFlags.weeklyTBreporter.key, ParticipantFlags.weeklyTBreporter.values.init),
    ),
    StudyEngine.participantActions.assignedSurveys.remove(WeeklyTB.key, 'all'),
    StudyEngine.participantActions.assignedSurveys.add(WeeklyTB.key, 'immediate'),
    StudyEngine.ifThen(
      StudyEngine.not(StudyEngine.participantState.hasSurveyKeyAssigned(QuitWeeklyTB.key)),
      StudyEngine.participantActions.assignedSurveys.add(QuitWeeklyTB.key, 'optional'),
    )
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

export const addFollowUpSurvey = (surveyKey: string, startInDays: number, activeForDays: number) => {
  const inviteMessage = surveyKey + '_invite';
  const reminderMessage = surveyKey + '_reminder';
  return StudyEngine.do(
    StudyEngine.participantActions.assignedSurveys.add(
      surveyKey,
      'prio',
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


export const takeOverFlagIfExist = (key: string) => StudyEngine.if(
  StudyEngine.participantState.incomingParticipantState.hasParticipantFlagKey(key),
  StudyEngine.participantActions.updateFlag(
    key, StudyEngine.participantState.incomingParticipantState.getParticipantFlagValue(key),
  ),
)
export const takeOverSurveyIfAssigned = (key: string) => StudyEngine.ifThen(
  StudyEngine.participantState.incomingParticipantState.hasSurveyKeyAssigned(key),
  StudyEngine.participantActions.assignedSurveys.remove(key, 'all'),
  StudyEngine.participantActions.assignedSurveys.add(key, 'immediate'),
)
