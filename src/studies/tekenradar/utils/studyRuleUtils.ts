import { clozeKey, numericInputKey, responseGroupKey, singleChoiceKey } from "case-editor-tools/constants/key-definitions";
import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { Duration } from "case-editor-tools/types/duration";
import { Expression } from "survey-engine/data_types";
import { ParticipantFlags } from "../participantFlags";
import { emailKeys } from "../studyRules";

import { hasChronicflowCondition, hasEMFlowCondition, hasFEflowCondition, hasLBflowCondition, hasTBFlowCondition, hasWeeklyTBCondition } from "./pdiffRules";
import PDiff from "../surveys/PDiff.json";
import { extractSurveyKey } from "../surveys/utils";
import WeeklyTB from "../surveys/WeeklyTB.json";
import QuitWeeklyTB from "../surveys/QuitWeekly.json";
import Standardflow_Adults from "../surveys/Standardflow_Adults.json";
import Standardflow_Kids from "../surveys/Standardflow_Kids.json";
import TBflow_Adults from "../surveys/TBflow_Adults.json";
import TBflow_Kids from "../surveys/TBflow_Kids.json";
import EMflow_Adults from "../surveys/EMflow_Adults.json";
import EMflow_Kids from "../surveys/EMflow_Kids.json";
import Feverflow_Adults from "../surveys/Feverflow_Adults.json";
import LBflow_Adults from "../surveys/LBflow_Adults.json";
import LBflow_Kids from "../surveys/LBflow_Kids.json";
import Chronicflow_Adults from "../surveys/Chronicflow_Adults.json";
import Chronicflow_Kids from "../surveys/Chronicflow_Kids.json";
import T0_Invites from "../surveys/T0_Invites.json";
import QuitFollowUp from "../surveys/QuitFU.json";
import T3_Adults from "../surveys/T3_Adults.json";
import T6_Adults from "../surveys/T6_Adults.json";
import T9_Adults from "../surveys/T9_Adults.json";
import T12_Adults from "../surveys/T12_Adults.json";
import T3_Kids from "../surveys/T3_Kids.json";
import T6_Kids from "../surveys/T6_Kids.json";
import T9_Kids from "../surveys/T9_Kids.json";
import T12_Kids from "../surveys/T12_Kids.json";
import LPplus_part1 from "../surveys/LPplus_part1.json";
import EMfoto from "../surveys/EMfoto.json";
import DeleteContactData from "../surveys/DelContactData.json";

export const PDiff_key = extractSurveyKey(PDiff);
export const WeeklyTB_key = extractSurveyKey(WeeklyTB);
export const QuitWeeklyTB_key = extractSurveyKey(QuitWeeklyTB);
export const Standardflow_Adults_key = extractSurveyKey(Standardflow_Adults);
export const Standardflow_Kids_key = extractSurveyKey(Standardflow_Kids);
export const TBflow_Adults_key = extractSurveyKey(TBflow_Adults);
export const TBflow_Kids_key = extractSurveyKey(TBflow_Kids);
export const EMflow_Adults_key = extractSurveyKey(EMflow_Adults);
export const EMflow_Kids_key = extractSurveyKey(EMflow_Kids);
export const Feverflow_Adults_key = extractSurveyKey(Feverflow_Adults);
export const LBflow_Adults_key = extractSurveyKey(LBflow_Adults);
export const LBflow_Kids_key = extractSurveyKey(LBflow_Kids);
export const Chronicflow_Adults_key = extractSurveyKey(Chronicflow_Adults);
export const Chronicflow_Kids_key = extractSurveyKey(Chronicflow_Kids);
export const T0_Invites_key = extractSurveyKey(T0_Invites);
export const QuitFollowUp_key = extractSurveyKey(QuitFollowUp);
export const T3_Adults_key = extractSurveyKey(T3_Adults);
export const T6_Adults_key = extractSurveyKey(T6_Adults);
export const T9_Adults_key = extractSurveyKey(T9_Adults);
export const T12_Adults_key = extractSurveyKey(T12_Adults);
export const T3_Kids_key = extractSurveyKey(T3_Kids);
export const T6_Kids_key = extractSurveyKey(T6_Kids);
export const T9_Kids_key = extractSurveyKey(T9_Kids);
export const T12_Kids_key = extractSurveyKey(T12_Kids);
export const LPplus_part1_key = extractSurveyKey(LPplus_part1);
export const EMfoto_key = extractSurveyKey(EMfoto);
export const DeleteContactData_key = extractSurveyKey(DeleteContactData);


const isChildParticipant = () => StudyEngine.lt(
  StudyEngine.getResponseValueAsNum(`${PDiff_key}.Age`, 'rg.num'),
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
    StudyEngine.participantActions.assignedSurveys.add(WeeklyTB_key, 'prio'),
    StudyEngine.participantActions.assignedSurveys.add(QuitWeeklyTB_key, 'optional'),
  ),
)


export const assignStandardFlow = (version: 'adults' | 'kids') => StudyEngine.do(
  StudyEngine.participantActions.assignedSurveys.remove(version === 'adults' ? Standardflow_Adults_key : Standardflow_Kids_key, 'all'),
  StudyEngine.participantActions.assignedSurveys.add(version === 'adults' ? Standardflow_Adults_key : Standardflow_Kids_key, 'immediate', 0, StudyEngine.timestampWithOffset({ days: 7 * 6 })),
  StudyEngine.participantActions.messages.add(emailKeys.StandardflowReminder, StudyEngine.timestampWithOffset({ hours: 24 })),
);

export const removeAllT0Surveys = () => StudyEngine.do(
  StudyEngine.participantActions.assignedSurveys.remove(TBflow_Adults_key, 'all'),
  StudyEngine.participantActions.assignedSurveys.remove(TBflow_Kids_key, 'all'),
  StudyEngine.participantActions.assignedSurveys.remove(EMflow_Adults_key, 'all'),
  StudyEngine.participantActions.assignedSurveys.remove(EMflow_Kids_key, 'all'),
  StudyEngine.participantActions.assignedSurveys.remove(Feverflow_Adults_key, 'all'),
  StudyEngine.participantActions.assignedSurveys.remove(LBflow_Adults_key, 'all'),
  StudyEngine.participantActions.assignedSurveys.remove(LBflow_Kids_key, 'all'),
  StudyEngine.participantActions.assignedSurveys.remove(Chronicflow_Adults_key, 'all'),
  StudyEngine.participantActions.assignedSurveys.remove(Chronicflow_Kids_key, 'all'),
  StudyEngine.participantActions.assignedSurveys.remove(T0_Invites_key, 'all'),
  StudyEngine.participantActions.assignedSurveys.remove(Standardflow_Kids_key, 'all'),
  StudyEngine.participantActions.assignedSurveys.remove(Standardflow_Adults_key, 'all'),
  StudyEngine.participantActions.messages.remove(emailKeys.FlowReminder),
  StudyEngine.participantActions.messages.remove(emailKeys.StandardflowReminder),
)

export const assignT0Invite = () => StudyEngine.do(
  StudyEngine.participantActions.assignedSurveys.remove(T0_Invites_key, 'all'),
  StudyEngine.participantActions.assignedSurveys.add(T0_Invites_key, 'immediate', 0, StudyEngine.timestampWithOffset({
    days: 1
  })),
)

export const reAssignWeeklyToTheEndOfList = () => StudyEngine.ifThen(
  StudyEngine.participantState.hasSurveyKeyAssigned(WeeklyTB_key),
  // Then: remove weekly and add again to the end of the list
  StudyEngine.participantActions.assignedSurveys.remove(WeeklyTB_key, 'all'),
  StudyEngine.if(
    StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.weeklyTBreporter.key, ParticipantFlags.weeklyTBreporter.values.true),
    // Then:
    StudyEngine.participantActions.assignedSurveys.add(WeeklyTB_key, 'normal'),
    // Else:
    StudyEngine.participantActions.assignedSurveys.add(WeeklyTB_key, 'immediate'),
  ),
  StudyEngine.ifThen(
    StudyEngine.not(StudyEngine.participantState.hasSurveyKeyAssigned(QuitWeeklyTB_key)),
    StudyEngine.participantActions.assignedSurveys.add(QuitWeeklyTB_key, 'optional'),
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
    StudyEngine.participantActions.updateFlag(
      ParticipantFlags.ageCategory.key,
      ParticipantFlags.ageCategory.values.child
    ),
    // ELSE:
    StudyEngine.participantActions.updateFlag(
      ParticipantFlags.ageCategory.key,
      ParticipantFlags.ageCategory.values.adult
    )
  ),
  // Also store the actual age into a flag:
  StudyEngine.participantActions.updateFlag(
    ParticipantFlags.ageFromPDiff.key,
    StudyEngine.getResponseValueAsNum(`${PDiff_key}.Age`, 'rg.num'),
  ),
)

const EM_B1_optionKeys = {
  period: {
    key: 'a',
    dateValue: '2',
  },
  unknown: 'b',
}

const EM_B2_optionKeys = {
  yes: 'a',
}

const EM_B6_optionKeys = {
  yes: 'a',
  no: 'b',
}

const LT2_optionKeys = {
  name: '2',
  dose: '4',
  numberPerDay: '6',
  dayCount: '10',
}

const LT4_optionKeys = {
  yes: 'a',
  no: 'b'
}

const FLG_FLD_optionKeys = {
  yes: 'a',
  no: 'b'
}

const FLG_Q3_optionKeys = {
  yes: 'a',
  no: 'b'
}

export const kEMflagLogic = () => StudyEngine.ifThen(
  // if:
  StudyEngine.and(
    StudyEngine.singleChoice.any(`${EMflow_Kids_key}.EM_B2`, EM_B2_optionKeys.yes),
    StudyEngine.gte(
      StudyEngine.getResponseValueAsNum(`${EMflow_Kids_key}.EM_B3`, `${responseGroupKey}.${numericInputKey}`),
      3
    ),
    StudyEngine.or(
      StudyEngine.and(
        StudyEngine.singleChoice.any(`${EMflow_Kids_key}.EM_B1`, EM_B1_optionKeys.period.key),
        StudyEngine.gt(
          StudyEngine.getResponseValueAsNum(`${EMflow_Kids_key}.EM_B1`, `${responseGroupKey}.${singleChoiceKey}.${EM_B1_optionKeys.period.key}.${EM_B1_optionKeys.period.dateValue}`),
          StudyEngine.timestampWithOffset({ days: -90 })
        ),
      ),
      StudyEngine.singleChoice.any(`${EMflow_Kids_key}.EM_B1`, EM_B1_optionKeys.unknown),
    ),
    StudyEngine.and(
      StudyEngine.singleChoice.any(`${EMflow_Kids_key}.EM_B6`, EM_B6_optionKeys.yes),
      StudyEngine.gte(
        StudyEngine.getResponseValueAsNum(`${EMflow_Kids_key}.LT2`, `${responseGroupKey}.${clozeKey}.${LT2_optionKeys.dayCount}`),
        3
      )
    ),
    StudyEngine.or(
      StudyEngine.singleChoice.any(`${EMflow_Kids_key}.LT4`, LT4_optionKeys.no),
      StudyEngine.gte(
        StudyEngine.getResponseValueAsNum(`${EMflow_Kids_key}.LT5`, `${responseGroupKey}.${clozeKey}.2`),
        StudyEngine.timestampWithOffset({ days: -8 })
      )
    ),
    StudyEngine.or(
      StudyEngine.singleChoice.any(`${EMflow_Kids_key}.FLG.FLD`, FLG_FLD_optionKeys.no),
      StudyEngine.singleChoice.any(`${EMflow_Kids_key}.FLG.Q3`, FLG_Q3_optionKeys.yes)
    )
  ),
  // Then:
  StudyEngine.participantActions.updateFlag(ParticipantFlags.kEM.key, ParticipantFlags.kEM.values.likely),
)

// LT 11-05-23
export const aEMflagLogic = () => StudyEngine.ifThen(
  // if:
  StudyEngine.and(
    StudyEngine.singleChoice.any(`${EMflow_Adults_key}.EM_B2`, EM_B2_optionKeys.yes),
    StudyEngine.gte(
      StudyEngine.getResponseValueAsNum(`${EMflow_Adults_key}.EM_B3`, `${responseGroupKey}.${numericInputKey}`),
      5
    ),
    StudyEngine.or(
      StudyEngine.and(
        StudyEngine.singleChoice.any(`${EMflow_Adults_key}.EM_B1`, EM_B1_optionKeys.period.key),
        StudyEngine.gt(
          StudyEngine.getResponseValueAsNum(`${EMflow_Adults_key}.EM_B1`, `${responseGroupKey}.${singleChoiceKey}.${EM_B1_optionKeys.period.key}.${EM_B1_optionKeys.period.dateValue}`),
          StudyEngine.timestampWithOffset({ days: -90 })
        ),
      ),
      StudyEngine.singleChoice.any(`${EMflow_Adults_key}.EM_B1`, EM_B1_optionKeys.unknown),
    ),
    StudyEngine.and(
      StudyEngine.singleChoice.any(`${EMflow_Adults_key}.EM_B6`, EM_B6_optionKeys.yes),
      StudyEngine.gte(
        StudyEngine.getResponseValueAsNum(`${EMflow_Adults_key}.LT2`, `${responseGroupKey}.${clozeKey}.${LT2_optionKeys.dayCount}`),
        3
      )
    ),
    StudyEngine.or(
      StudyEngine.singleChoice.any(`${EMflow_Adults_key}.LT4`, LT4_optionKeys.no),
      StudyEngine.gte(
        StudyEngine.getResponseValueAsNum(`${EMflow_Adults_key}.LT5`, `${responseGroupKey}.${clozeKey}.2`),
        StudyEngine.timestampWithOffset({ days: -5 })
      )
    ),
    StudyEngine.or(
      StudyEngine.singleChoice.any(`${EMflow_Adults_key}.FLG.FLD`, FLG_FLD_optionKeys.no),
      StudyEngine.singleChoice.any(`${EMflow_Adults_key}.FLG.Q3`, FLG_Q3_optionKeys.yes)
    )
  ),
  // Then:
  StudyEngine.participantActions.updateFlag(ParticipantFlags.aEM.key, ParticipantFlags.aEM.values.likely),
)

const LD1_optionKeys = {
  yes: 'a',
  no: 'b'
}

// LT 18-09-2025 adding flag for LB flow gebasseerd op de vraag is de ziekte van lyme vastgesteld door een arts (LD1= a(ja))
export const LBotherflagLogic = () => StudyEngine.ifThen(
  StudyEngine.singleChoice.any(`${LBflow_Adults_key}.LD1`, LD1_optionKeys.yes),
  StudyEngine.participantActions.updateFlag(ParticipantFlags.LBother.key, ParticipantFlags.LBother.values.likely),
)

export const updateGenderFlag = (genderQuestionKey: string) => StudyEngine.do(
  StudyEngine.ifThen(
    StudyEngine.singleChoice.any(genderQuestionKey, 'a'),
    StudyEngine.participantActions.updateFlag(ParticipantFlags.genderCategory.key, ParticipantFlags.genderCategory.values.male)
  ),
  StudyEngine.ifThen(
    StudyEngine.singleChoice.any(genderQuestionKey, 'b'),
    StudyEngine.participantActions.updateFlag(ParticipantFlags.genderCategory.key, ParticipantFlags.genderCategory.values.female)
  ),
  StudyEngine.ifThen(
    StudyEngine.singleChoice.any(genderQuestionKey, 'c'),
    StudyEngine.participantActions.updateFlag(ParticipantFlags.genderCategory.key, ParticipantFlags.genderCategory.values.other)
  ),
  StudyEngine.ifThen(
    StudyEngine.singleChoice.any(genderQuestionKey, 'd'),
    StudyEngine.participantActions.updateFlag(ParticipantFlags.genderCategory.key, ParticipantFlags.genderCategory.values.unknown)
  ),
)

export const updatePostalCodeFlag = (questionKey: string) => StudyEngine.ifThen(
  StudyEngine.hasResponseKey(questionKey, 'rg'),
  StudyEngine.participantActions.updateFlag(ParticipantFlags.postalCode.key, ParticipantFlags.postalCode.values.known)
)

export const updateTbExposureFlag = (questionKey: string) => StudyEngine.ifThen(
  StudyEngine.hasResponseKey(questionKey, 'rg'),
  StudyEngine.participantActions.updateFlag(ParticipantFlags.tbExposure.key, ParticipantFlags.tbExposure.values.known)
)


export const finishFollowUp = () => StudyEngine.do(
  StudyEngine.participantActions.assignedSurveys.remove(QuitFollowUp_key, 'all'),
  StudyEngine.participantActions.updateFlag(ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.finished),
  StudyEngine.participantActions.removeFlag(ParticipantFlags.postalCode.key),
  StudyEngine.participantActions.removeFlag(ParticipantFlags.tbExposure.key),
  StudyEngine.participantActions.removeFlag(ParticipantFlags.NMG.key),
  StudyEngine.participantActions.removeFlag(ParticipantFlags.kEM.key),
  StudyEngine.participantActions.removeFlag(ParticipantFlags.aEM.key),
  StudyEngine.participantActions.removeFlag(ParticipantFlags.LDexcluded.key),
  StudyEngine.participantActions.removeFlag(ParticipantFlags.LBother.key),
  StudyEngine.participantActions.removeFlag(ParticipantFlags.PHQ_15_none.key)
)

export const quitFollowUp = () => StudyEngine.do(
  StudyEngine.participantActions.assignedSurveys.removeAll(),
  StudyEngine.participantActions.messages.removeAll(),
  StudyEngine.participantActions.updateFlag(ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.quitted),
  StudyEngine.participantActions.removeFlag(ParticipantFlags.postalCode.key),
  StudyEngine.participantActions.removeFlag(ParticipantFlags.tbExposure.key),
  StudyEngine.participantActions.removeFlag(ParticipantFlags.NMG.key),
  StudyEngine.participantActions.removeFlag(ParticipantFlags.kEM.key),
  StudyEngine.participantActions.removeFlag(ParticipantFlags.aEM.key),
  StudyEngine.participantActions.removeFlag(ParticipantFlags.LDexcluded.key),
  StudyEngine.participantActions.removeFlag(ParticipantFlags.LBother.key),
  StudyEngine.participantActions.removeFlag(ParticipantFlags.PHQ_15_none.key),
  StudyEngine.ifThen(
    StudyEngine.or(
      StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.weeklyTBreporter.key, ParticipantFlags.weeklyTBreporter.values.true),
      StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.weeklyTBreporter.key, ParticipantFlags.weeklyTBreporter.values.init),
    ),
    StudyEngine.participantActions.assignedSurveys.add(WeeklyTB_key, 'normal', StudyEngine.timestampWithOffset({ hours: 1 })),
    StudyEngine.participantActions.assignedSurveys.add(QuitWeeklyTB_key, 'optional'),
  ),
)


const LP_15_cause_optionKeys = {
  lyme: 'a',
  covid: 'b',
  other: 'c',
  none: 'd'
}

//LT PHQ_15_none flag
export const PHQ_15_noneflagLogic = () => StudyEngine.ifThen(
  // if:
  StudyEngine.multipleChoice.any(`${LPplus_part1_key}.PHQ_15_cause`, LP_15_cause_optionKeys.none),
  StudyEngine.participantActions.updateFlag(ParticipantFlags.PHQ_15_none.key, ParticipantFlags.PHQ_15_none.values.true),
)

//DW LDexcluded (flag intended for Adults flow only)
export const LDexcluded_flagLogic = () => StudyEngine.ifThen(
  // if:
  StudyEngine.multipleChoice.any(`${LBflow_Adults_key}.LymeDiagnosis3alt1`, 'f'),
  StudyEngine.participantActions.updateFlag(ParticipantFlags.LDexcluded.key, ParticipantFlags.LDexcluded.values.true),
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
    StudyEngine.participantActions.assignedSurveys.add(TBflow_Kids_key, 'immediate'),
    // Else:
    StudyEngine.participantActions.assignedSurveys.add(TBflow_Adults_key, 'immediate'),
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
    StudyEngine.participantActions.assignedSurveys.add(EMflow_Kids_key, 'immediate'),
    // Else:
    StudyEngine.participantActions.assignedSurveys.add(EMflow_Adults_key, 'immediate'),
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
    StudyEngine.participantActions.assignedSurveys.add(TBflow_Kids_key, 'immediate'),
    // Else:
    StudyEngine.participantActions.assignedSurveys.add(Feverflow_Adults_key, 'immediate'),
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
    StudyEngine.participantActions.assignedSurveys.add(LBflow_Kids_key, 'immediate'),
    // Else:
    StudyEngine.participantActions.assignedSurveys.add(LBflow_Adults_key, 'immediate'),
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
      StudyEngine.participantActions.assignedSurveys.add(Chronicflow_Kids_key, 'immediate'),
      // Else:
      StudyEngine.participantActions.assignedSurveys.add(Chronicflow_Adults_key, 'immediate'),
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
    StudyEngine.participantActions.assignedSurveys.remove(WeeklyTB_key, 'all'),
    StudyEngine.participantActions.assignedSurveys.add(WeeklyTB_key, 'immediate'),
    StudyEngine.ifThen(
      StudyEngine.not(StudyEngine.participantState.hasSurveyKeyAssigned(QuitWeeklyTB_key)),
      StudyEngine.participantActions.assignedSurveys.add(QuitWeeklyTB_key, 'optional'),
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
  StudyEngine.participantActions.assignedSurveys.remove(T3_Adults_key, 'all'),
  StudyEngine.participantActions.assignedSurveys.remove(T6_Adults_key, 'all'),
  StudyEngine.participantActions.assignedSurveys.remove(T9_Adults_key, 'all'),
  StudyEngine.participantActions.assignedSurveys.remove(T12_Adults_key, 'all'),
  removeFollowUpMessagesForSurvey(T3_Adults_key),
  removeFollowUpMessagesForSurvey(T6_Adults_key),
  removeFollowUpMessagesForSurvey(T9_Adults_key),
  removeFollowUpMessagesForSurvey(T12_Adults_key),
  addFollowUpSurvey(T3_Adults_key, 90, 89),
  addFollowUpSurvey(T6_Adults_key, 180, 89),
  addFollowUpSurvey(T9_Adults_key, 270, 89),
  addFollowUpSurvey(T12_Adults_key, 360, 89),
  StudyEngine.participantActions.assignedSurveys.add(QuitFollowUp_key, 'optional'),
)

export const initFollowUpFlow_Kids = () => StudyEngine.do(
  // Reset any existing flow:
  StudyEngine.participantActions.assignedSurveys.remove(T3_Kids_key, 'all'),
  StudyEngine.participantActions.assignedSurveys.remove(T6_Kids_key, 'all'),
  StudyEngine.participantActions.assignedSurveys.remove(T9_Kids_key, 'all'),
  StudyEngine.participantActions.assignedSurveys.remove(T12_Kids_key, 'all'),
  removeFollowUpMessagesForSurvey(T3_Kids_key),
  removeFollowUpMessagesForSurvey(T6_Kids_key),
  removeFollowUpMessagesForSurvey(T9_Kids_key),
  removeFollowUpMessagesForSurvey(T12_Kids_key),
  // Init new flow:
  addFollowUpSurvey(T3_Kids_key, 90, 89),
  addFollowUpSurvey(T6_Kids_key, 180, 89),
  addFollowUpSurvey(T9_Kids_key, 270, 89),
  addFollowUpSurvey(T12_Kids_key, 360, 89),
  StudyEngine.participantActions.assignedSurveys.add(QuitFollowUp_key, 'optional'),
)


export const takeOverFlagIfExist = (key: string) => StudyEngine.if(
  StudyEngine.participantState.incomingParticipantState.hasParticipantFlagKey(key),
  StudyEngine.participantActions.updateFlag(
    key, StudyEngine.participantState.incomingParticipantState.getParticipantFlagValue(key),
  ),
)
export const takeOverSurveyIfAssigned = (key: string, priority: 'immediate' | 'normal' | 'optional' = 'immediate') => StudyEngine.ifThen(
  StudyEngine.participantState.incomingParticipantState.hasSurveyKeyAssigned(key),
  StudyEngine.participantActions.assignedSurveys.remove(key, 'all'),
  StudyEngine.participantActions.assignedSurveys.add(key, priority),
)
