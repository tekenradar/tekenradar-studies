import { StudyRules } from "case-editor-tools/types/studyRules";
import { Expression } from "survey-engine/data_types";
import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { PDiff } from "./surveys/PDiff";
import { TBflow_Adults } from "./surveys/TBflow_Adults";
import { Standardflow_Adults } from "./surveys/Standardflow_Adults";
import {
  assignStandardFlow,
  assignT0Invite,
  finishFollowUp,
  handleExpired_removeSurvey, handlePDiffRuleFor_Chronicflow, handlePDiffRuleFor_EMflow, handlePDiffRuleFor_FEflow,
  handlePDiffRuleFor_LBflow, handlePDiffRuleFor_TBflow, handlePDiffRuleFor_WeeklyTB,
  initFollowUpFlow_Adults,
  initFollowUpFlow_Kids,
  isSurveyExpired, kEMflagLogic, quitFollowUp, reAssignWeeklyToTheEndOfList, removeAllT0Surveys, removeFollowUpMessagesForSurvey, resetToPDiffStart, takeOverFlagIfExist, takeOverSurveyIfAssigned, updateAgeFlags, updateGenderFlag, updatePostalCodeFlag
} from "./utils/studyRuleUtils";
import { EMflow_Adults } from "./surveys/EMflow_Adults";
import { EMflow_Kids } from "./surveys/EMflow_Kids";
import { LBflow_Adults } from "./surveys/LBflow_Adults";
import { LBflow_Kids } from "./surveys/LBflow_Kids";
import { Feverflow_Adults } from "./surveys/Feverflow_Adults";
import { Chronicflow_Adults } from "./surveys/Chronicflow_Adults";
import { Chronicflow_Kids } from "./surveys/Chronicflow_Kids";
import { WeeklyTB } from "./surveys/WeeklyTB";
import { Standardflow_Kids } from "./surveys/Standardflow_Kids";
import { EMfoto } from "./surveys/EMfoto";
import { T3_Adults } from "./surveys/T3_Adults";
import { T6_Adults } from "./surveys/T6_Adults";
import { T9_Adults } from "./surveys/T9_Adults";
import { T12_Adults } from "./surveys/T12_Adults";
import { T12_Kids } from "./surveys/T12_Kids";
import { T9_Kids } from "./surveys/T9_Kids";
import { T6_Kids } from "./surveys/T6_Kids";
import { T3_Kids } from "./surveys/T3_Kids";
import { ParticipantFlags } from "./participantFlags";
import { TBflow_Kids } from "./surveys/TBflow_Kids";
import { T0_Invites } from "./surveys/T0_Invites";
import { inputKey, multipleChoiceKey, numericInputKey, responseGroupKey } from "case-editor-tools/constants/key-definitions";
import { QuitWeeklyTB } from "./surveys/QuitWeekly";
import { QuitFollowUp } from "./surveys/QuitFollowUp";

const reports = {
  FollowUpReport: {
    key: 'followUp',
  },
  TBReport: {
    key: 'TB',
    environment: 'environment',
    activity: 'activity',
    count: 'count',
    location: 'location',
  },
  EMReport: {
    key: 'EM'
  },
  FeverReport: {
    key: 'Fever'
  },
  LBReport: {
    key: 'LB'
  },
  ChronicReport: {
    key: 'chronic'
  },
}

export const emailKeys = {
  FlowReminder: 'Flow_reminder',
  StandardflowReminder: 'Standardflow_reminder',
  EMfotoReminder: 'EMfoto_reminder',
}

const handleSubmit_PDiff = StudyEngine.ifThen(
  // IF:
  StudyEngine.checkSurveyResponseKey(PDiff.key),
  // THEN:
  removeAllT0Surveys(),
  StudyEngine.ifThen(
    StudyEngine.not(
      StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.active)
    ),
    updateAgeFlags(),
    resetToPDiffStart(),
    StudyEngine.participantActions.startNewStudySession(),
  ),
  handlePDiffRuleFor_TBflow(),
  handlePDiffRuleFor_EMflow(),
  handlePDiffRuleFor_FEflow(),
  handlePDiffRuleFor_LBflow(),
  handlePDiffRuleFor_Chronicflow(),
  handlePDiffRuleFor_WeeklyTB(),
)


const handleSubmit_TBflow_Adults = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(TBflow_Adults.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(TBflow_Adults.key, 'all'),
  StudyEngine.ifThen(
    // If not in an active follow up:
    StudyEngine.not(
      StudyEngine.participantState.hasParticipantFlagKeyAndValue(
        ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.active
      ),
    ),
    // Then:
    assignT0Invite(),
  ),
  // gender category:
  updateGenderFlag(TBflow_Adults.P2.key),
  updatePostalCodeFlag(TBflow_Adults.P1.key),
  reAssignWeeklyToTheEndOfList(),
  // Report:
  StudyEngine.participantActions.reports.init(reports.TBReport.key),
  StudyEngine.participantActions.reports.setReportIcon(reports.TBReport.key, reports.TBReport.key),
  StudyEngine.participantActions.reports.updateData(reports.TBReport.key, reports.TBReport.environment,
    StudyEngine.getSelectedKeys(TBflow_Adults.Q1.key, `${responseGroupKey}.${multipleChoiceKey}`), 'keyList'
  ),
  StudyEngine.participantActions.reports.updateData(reports.TBReport.key, reports.TBReport.activity,
    StudyEngine.getSelectedKeys(TBflow_Adults.Q2.key, `${responseGroupKey}.${multipleChoiceKey}`), 'keyList'
  ),
  StudyEngine.participantActions.reports.updateData(reports.TBReport.key, reports.TBReport.count,
    StudyEngine.getResponseValueAsStr(TBflow_Adults.Q4.key, `${responseGroupKey}.${numericInputKey}`), 'int'
  ),
  StudyEngine.participantActions.reports.updateData(reports.TBReport.key, reports.TBReport.location,
    StudyEngine.getResponseValueAsStr(TBflow_Adults.Q5.key, `${responseGroupKey}.${inputKey}`), 'string'
  ),
)


const handleSubmit_TBflow_Kids = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(TBflow_Kids.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(TBflow_Kids.key, 'all'),
  StudyEngine.ifThen(
    // If not in an active follow up:
    StudyEngine.not(
      StudyEngine.participantState.hasParticipantFlagKeyAndValue(
        ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.active
      ),
    ),
    // Then:
    assignT0Invite(),
  ),
  // Gender category:
  updateGenderFlag(TBflow_Kids.P2.key),
  updatePostalCodeFlag(TBflow_Kids.P1.key),
  reAssignWeeklyToTheEndOfList(),
  // Report:
  StudyEngine.participantActions.reports.init(reports.TBReport.key),
  StudyEngine.participantActions.reports.setReportIcon(reports.TBReport.key, reports.TBReport.key),
  StudyEngine.participantActions.reports.updateData(reports.TBReport.key, reports.TBReport.environment,
    StudyEngine.getSelectedKeys(TBflow_Kids.Q1.key, `${responseGroupKey}.${multipleChoiceKey}`), 'keyList'
  ),
  StudyEngine.participantActions.reports.updateData(reports.TBReport.key, reports.TBReport.activity,
    StudyEngine.getSelectedKeys(TBflow_Kids.Q2.key, `${responseGroupKey}.${multipleChoiceKey}`), 'keyList'
  ),
  StudyEngine.participantActions.reports.updateData(reports.TBReport.key, reports.TBReport.count,
    StudyEngine.getResponseValueAsStr(TBflow_Kids.Q4.key, `${responseGroupKey}.${numericInputKey}`), 'int'
  ),
  StudyEngine.participantActions.reports.updateData(reports.TBReport.key, reports.TBReport.location,
    StudyEngine.getResponseValueAsStr(TBflow_Kids.Q5.key, `${responseGroupKey}.${inputKey}`), 'string'
  ),
)

const addEMfotoReminderEmail = () => StudyEngine.participantActions.messages.add(emailKeys.EMfotoReminder, StudyEngine.timestampWithOffset({ days: 2 }));

const assignEMfotoSurvey = () => StudyEngine.do(
  StudyEngine.participantActions.assignedSurveys.add(EMfoto.key, 'immediate', undefined, StudyEngine.timestampWithOffset({ days: 222 })),
  addEMfotoReminderEmail(),
)

const handleSubmit_EMflow_Adults = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(EMflow_Adults.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(EMflow_Adults.key, 'all'),
  StudyEngine.participantActions.messages.remove(emailKeys.FlowReminder),
  assignEMfotoSurvey(),
  StudyEngine.ifThen(
    // if not in a follow up yet:
    StudyEngine.not(
      StudyEngine.participantState.hasParticipantFlagKeyAndValue(
        ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.active
      ),
    ),
    // Then:
    assignT0Invite(),
  ),
  reAssignWeeklyToTheEndOfList(),
  StudyEngine.participantActions.reports.init(reports.EMReport.key),
  StudyEngine.participantActions.reports.setReportIcon(reports.EMReport.key, reports.EMReport.key)
);

const handleSubmit_EMflow_Kids = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(EMflow_Kids.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(EMflow_Kids.key, 'all'),
  StudyEngine.participantActions.messages.remove(emailKeys.FlowReminder),
  assignEMfotoSurvey(),
  StudyEngine.ifThen(
    // if not in a follow up yet:
    StudyEngine.not(
      StudyEngine.participantState.hasParticipantFlagKeyAndValue(
        ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.active
      ),
    ),
    // Then:
    assignT0Invite(),
  ),
  kEMflagLogic(),
  reAssignWeeklyToTheEndOfList(),
  StudyEngine.participantActions.reports.init(reports.EMReport.key),
  StudyEngine.participantActions.reports.setReportIcon(reports.EMReport.key, reports.EMReport.key)
);

const handleSubmit_Feverflow_Adults = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(Feverflow_Adults.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(Feverflow_Adults.key, 'all'),
  StudyEngine.participantActions.messages.remove(emailKeys.FlowReminder),
  StudyEngine.ifThen(
    // if not in a follow up yet:
    StudyEngine.not(
      StudyEngine.participantState.hasParticipantFlagKeyAndValue(
        ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.active
      ),
    ),
    // Then:
    assignT0Invite(),
  ),
  reAssignWeeklyToTheEndOfList(),
  StudyEngine.participantActions.reports.init(reports.FeverReport.key),
  StudyEngine.participantActions.reports.setReportIcon(reports.FeverReport.key, reports.FeverReport.key)
);

const handleSubmit_LBflow_Adults = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(LBflow_Adults.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(LBflow_Adults.key, 'all'),
  StudyEngine.participantActions.messages.remove(emailKeys.FlowReminder),
  assignEMfotoSurvey(),
  StudyEngine.ifThen(
    // if not in a follow up yet:
    StudyEngine.not(
      StudyEngine.participantState.hasParticipantFlagKeyAndValue(
        ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.active
      ),
    ),
    // Then:
    assignT0Invite(),
  ),
  reAssignWeeklyToTheEndOfList(),
  StudyEngine.participantActions.reports.init(reports.LBReport.key),
  StudyEngine.participantActions.reports.setReportIcon(reports.LBReport.key, reports.LBReport.key)
);




const handleSubmit_LBflow_Kids = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(LBflow_Kids.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(LBflow_Kids.key, 'all'),
  StudyEngine.participantActions.messages.remove(emailKeys.FlowReminder),
  assignEMfotoSurvey(),
  StudyEngine.ifThen(
    // if not in a follow up yet:
    StudyEngine.not(
      StudyEngine.participantState.hasParticipantFlagKeyAndValue(
        ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.active
      ),
    ),
    // Then:
    assignT0Invite(),
  ),
  reAssignWeeklyToTheEndOfList(),
  StudyEngine.participantActions.reports.init(reports.LBReport.key),
  StudyEngine.participantActions.reports.setReportIcon(reports.LBReport.key, reports.LBReport.key)
);


const handleSubmit_Chronicflow_Adults = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(Chronicflow_Adults.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(Chronicflow_Adults.key, 'all'),
  StudyEngine.participantActions.messages.remove(emailKeys.FlowReminder),
  StudyEngine.ifThen(
    // if not in a follow up yet:
    StudyEngine.not(
      StudyEngine.participantState.hasParticipantFlagKeyAndValue(
        ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.active
      ),
    ),
    // Then:
    assignT0Invite(),
  ),
  reAssignWeeklyToTheEndOfList(),
  StudyEngine.participantActions.reports.init(reports.ChronicReport.key),
  StudyEngine.participantActions.reports.setReportIcon(reports.ChronicReport.key, reports.ChronicReport.key)
);


const handleSubmit_Chronicflow_Kids = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(Chronicflow_Kids.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(Chronicflow_Kids.key, 'all'),
  StudyEngine.participantActions.messages.remove(emailKeys.FlowReminder),
  StudyEngine.ifThen(
    // if not in a follow up yet:
    StudyEngine.not(
      StudyEngine.participantState.hasParticipantFlagKeyAndValue(
        ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.active
      ),
    ),
    // Then:
    assignT0Invite(),
  ),
  reAssignWeeklyToTheEndOfList(),
  StudyEngine.participantActions.reports.init(reports.ChronicReport.key),
  StudyEngine.participantActions.reports.setReportIcon(reports.ChronicReport.key, reports.ChronicReport.key)
);

const handleSubmit_T0_Invites = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(T0_Invites.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(T0_Invites.key, 'all'),
  StudyEngine.ifThen(
    // If want to participate in follow up: (and not yet in follow up)
    StudyEngine.and(
      StudyEngine.or(
        StudyEngine.consent.accepted(T0_Invites.StandardInviteGroup.UitnodigingOnderzoekConsent.key),
        StudyEngine.consent.accepted(T0_Invites.kEMInviteGroup.UitnodigingOnderzoekConsent.key),
        StudyEngine.consent.accepted(T0_Invites.kEMInviteGroup.kEMUitnodigingOnderzoekConsent.key),
      ),
      StudyEngine.not(
        StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.active)
      )
    ),
    StudyEngine.if(
      StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.ageCategory.key, ParticipantFlags.ageCategory.values.child),
      // if child participant:
      assignStandardFlow('kids'),
      // else:
      assignStandardFlow('adults'),
    )
  ),
  reAssignWeeklyToTheEndOfList(),
);

const handleSubmit_Standardflow_Adults = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(Standardflow_Adults.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(Standardflow_Adults.key, 'all'),
  StudyEngine.participantActions.messages.remove(emailKeys.StandardflowReminder),
  StudyEngine.ifThen(
    StudyEngine.not(
      StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.active)
    ),
    initFollowUpFlow_Adults(),
    StudyEngine.participantActions.updateFlag(ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.active)
  ),
  updateGenderFlag(Standardflow_Adults.P2.key),
  updatePostalCodeFlag(Standardflow_Adults.P1.key),
);


const handleSubmit_Standardflow_Kids = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(Standardflow_Kids.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(Standardflow_Kids.key, 'all'),
  StudyEngine.participantActions.messages.remove(emailKeys.StandardflowReminder),
  StudyEngine.ifThen(
    StudyEngine.not(
      StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.active)
    ),
    initFollowUpFlow_Kids(),
    StudyEngine.participantActions.updateFlag(ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.active)
  ),
  // Gender category:
  updateGenderFlag(Standardflow_Kids.P2.key),
  updatePostalCodeFlag(Standardflow_Kids.P1.key),
);

const handleSubmit_WeeklyTB = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(WeeklyTB.key),
  // Then:
  StudyEngine.participantActions.updateFlag(ParticipantFlags.weeklyTBreporter.key, ParticipantFlags.weeklyTBreporter.values.true),
  StudyEngine.participantActions.assignedSurveys.remove(WeeklyTB.key, 'all'),
  StudyEngine.participantActions.assignedSurveys.add(WeeklyTB.key, 'normal', StudyEngine.timestampWithOffset({ hours: 1 })),
  updateGenderFlag(WeeklyTB.P2.key),
  updatePostalCodeFlag(WeeklyTB.P1.key),
);

const handleSubmit_Emfoto = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(EMfoto.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(EMfoto.key, 'all'),
  StudyEngine.if(
    StudyEngine.hasResponseKey(EMfoto.Q1.key, 'rg'),
    // Then:
    StudyEngine.do(
      StudyEngine.participantActions.messages.remove(emailKeys.EMfotoReminder),
      StudyEngine.participantActions.assignedSurveys.add(EMfoto.key, 'optional', undefined, StudyEngine.timestampWithOffset({ days: 222 })),
    ),
    // Else: add again for later
    StudyEngine.participantActions.assignedSurveys.add(EMfoto.key, 'prio', undefined, StudyEngine.timestampWithOffset({ days: 222 })),
  )
);


// -----------------------------------------------
const handleSubmit_T3_Adults = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(T3_Adults.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(T3_Adults.key, 'all'),
  StudyEngine.participantActions.reports.init(reports.FollowUpReport.key),
  StudyEngine.participantActions.reports.setReportIcon(reports.FollowUpReport.key, reports.FollowUpReport.key),
  removeFollowUpMessagesForSurvey(T3_Adults.key)
);

const handleSubmit_T6_Adults = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(T6_Adults.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(T6_Adults.key, 'all'),
  StudyEngine.participantActions.reports.init(reports.FollowUpReport.key),
  StudyEngine.participantActions.reports.setReportIcon(reports.FollowUpReport.key, reports.FollowUpReport.key),
  removeFollowUpMessagesForSurvey(T6_Adults.key)
);

const handleSubmit_T9_Adults = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(T9_Adults.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(T9_Adults.key, 'all'),
  StudyEngine.participantActions.reports.init(reports.FollowUpReport.key),
  StudyEngine.participantActions.reports.setReportIcon(reports.FollowUpReport.key, reports.FollowUpReport.key),
  removeFollowUpMessagesForSurvey(T9_Adults.key)
);

const handleSubmit_T12_Adults = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(T12_Adults.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(T12_Adults.key, 'all'),
  StudyEngine.participantActions.reports.init(reports.FollowUpReport.key),
  StudyEngine.participantActions.reports.setReportIcon(reports.FollowUpReport.key, reports.FollowUpReport.key),
  StudyEngine.participantActions.updateFlag(ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.finished),
  removeFollowUpMessagesForSurvey(T12_Adults.key)
);

const handleSubmit_T3_Kids = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(T3_Kids.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(T3_Kids.key, 'all'),
  StudyEngine.participantActions.reports.init(reports.FollowUpReport.key),
  StudyEngine.participantActions.reports.setReportIcon(reports.FollowUpReport.key, reports.FollowUpReport.key),
  removeFollowUpMessagesForSurvey(T3_Kids.key)
);

const handleSubmit_T6_Kids = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(T6_Kids.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(T6_Kids.key, 'all'),
  StudyEngine.participantActions.reports.init(reports.FollowUpReport.key),
  StudyEngine.participantActions.reports.setReportIcon(reports.FollowUpReport.key, reports.FollowUpReport.key),
  StudyEngine.participantActions.reports.setReportIcon(reports.FollowUpReport.key, reports.FollowUpReport.key),
  removeFollowUpMessagesForSurvey(T6_Kids.key)
);

const handleSubmit_T9_Kids = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(T9_Kids.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(T9_Kids.key, 'all'),
  StudyEngine.participantActions.reports.init(reports.FollowUpReport.key),
  StudyEngine.participantActions.reports.setReportIcon(reports.FollowUpReport.key, reports.FollowUpReport.key),
  removeFollowUpMessagesForSurvey(T9_Kids.key)
);

const handleSubmit_T12_Kids = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(T12_Kids.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(T12_Kids.key, 'all'),
  StudyEngine.participantActions.reports.init(reports.FollowUpReport.key),
  StudyEngine.participantActions.reports.setReportIcon(reports.FollowUpReport.key, reports.FollowUpReport.key),
  StudyEngine.participantActions.updateFlag(ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.finished),
  removeFollowUpMessagesForSurvey(T12_Kids.key)
);

const handleSubmit_QuitFollowUp = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(QuitFollowUp.key),
  // Then:
  StudyEngine.ifThen(
    StudyEngine.singleChoice.any(QuitFollowUp.Confirm.key, QuitFollowUp.Confirm.optionKeys.yes),
    // Then
    quitFollowUp(),
  ),
);

const handleSubmit_QuitWeeklyTB = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(QuitWeeklyTB.key),
  // Then:
  StudyEngine.ifThen(
    StudyEngine.singleChoice.any(QuitWeeklyTB.Confirm.key, QuitWeeklyTB.Confirm.optionKeys.yes),
    // Then
    StudyEngine.participantActions.assignedSurveys.remove(WeeklyTB.key, 'all'),
    StudyEngine.participantActions.removeFlag(ParticipantFlags.weeklyTBreporter.key),
    StudyEngine.participantActions.assignedSurveys.remove(QuitWeeklyTB.key, 'all'),
  )
);


// -----------------------------------------------
const handleExpired_T0_Invites = StudyEngine.ifThen(
  isSurveyExpired(T0_Invites.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(T0_Invites.key, 'all'),
)

const handleExpired_Standardflow = () => StudyEngine.do(
  StudyEngine.ifThen(
    isSurveyExpired(Standardflow_Kids.key),
    // Then:
    StudyEngine.participantActions.assignedSurveys.remove(Standardflow_Kids.key, 'all'),
  ),
  StudyEngine.ifThen(
    isSurveyExpired(Standardflow_Adults.key),
    // Then:
    StudyEngine.participantActions.assignedSurveys.remove(Standardflow_Adults.key, 'all'),
  ),
)

const handleExpired_T12_Adults = StudyEngine.ifThen(
  isSurveyExpired(T12_Adults.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(T12_Adults.key, 'all'),
  finishFollowUp(),
)

const handleExpired_T12_Kids = StudyEngine.ifThen(
  isSurveyExpired(T12_Kids.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(T12_Kids.key, 'all'),
  finishFollowUp(),
)


/**
 * SUBMIT RULE LIST
 */
const submitRules: Expression[] = [
  handleSubmit_PDiff,
  // TBflow:
  handleSubmit_TBflow_Adults,
  handleSubmit_TBflow_Kids,
  // EMflow:
  handleSubmit_EMflow_Adults,
  handleSubmit_EMflow_Kids,
  // Feverflow:
  handleSubmit_Feverflow_Adults,
  // LBflow:
  handleSubmit_LBflow_Adults,
  handleSubmit_LBflow_Kids,
  // Chronicflow:
  handleSubmit_Chronicflow_Adults,
  handleSubmit_Chronicflow_Kids,
  // Study Invites:
  handleSubmit_T0_Invites,
  // Standardflow:
  handleSubmit_Standardflow_Adults,
  handleSubmit_Standardflow_Kids,
  // WeeklyTB:
  handleSubmit_WeeklyTB,
  // Emfoto:
  handleSubmit_Emfoto,
  // Followup:
  handleSubmit_T3_Adults,
  handleSubmit_T3_Kids,
  handleSubmit_T6_Adults,
  handleSubmit_T6_Kids,
  handleSubmit_T9_Adults,
  handleSubmit_T9_Kids,
  handleSubmit_T12_Adults,
  handleSubmit_T12_Kids,
  handleSubmit_QuitFollowUp,
  handleSubmit_QuitWeeklyTB,
]


/**
 * TIMER RULE LIST
 */
const timerRules: Expression[] = [
  handleExpired_T0_Invites,
  handleExpired_Standardflow(),
  handleExpired_removeSurvey(T3_Adults.key),
  handleExpired_removeSurvey(T6_Adults.key),
  handleExpired_removeSurvey(T9_Adults.key),
  handleExpired_T12_Adults,
  handleExpired_removeSurvey(T3_Kids.key),
  handleExpired_removeSurvey(T6_Kids.key),
  handleExpired_removeSurvey(T9_Kids.key),
  handleExpired_T12_Kids,
]


/**
 * MERGE RULE LIST
 */
const mergeRules: Expression[] = [
  StudyEngine.if(
    StudyEngine.participantState.incomingParticipantState.hasParticipantFlagKeyAndValue(
      ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.active,
    ),
    // if has already an active follow up:
    StudyEngine.do(
      StudyEngine.if(
        // if is in no flow or TB flow:
        StudyEngine.or(
          StudyEngine.not(
            StudyEngine.participantState.hasParticipantFlagKey(ParticipantFlags.flow.key)
          ),
          StudyEngine.participantState.hasParticipantFlagKeyAndValue(
            ParticipantFlags.flow.key, ParticipantFlags.flow.values.TBflow,
          ),
        ),
        // then:
        StudyEngine.do(
          // upgrade to EMflow
          StudyEngine.ifThen(
            StudyEngine.participantState.incomingParticipantState.hasParticipantFlagKeyAndValue(
              ParticipantFlags.flow.key, ParticipantFlags.flow.values.EMflow,
            ),
            StudyEngine.if(
              StudyEngine.participantState.hasParticipantFlagKeyAndValue(
                ParticipantFlags.ageCategory.key, ParticipantFlags.ageCategory.values.child,
              ),
              // if child:
              assignStandardFlow('kids'),
              // else:
              assignStandardFlow('adults')
            ),
            StudyEngine.participantActions.updateFlag(
              ParticipantFlags.flow.key, ParticipantFlags.flow.values.EMflow,
            )
          ),
          // upgrade to FEflow
          StudyEngine.ifThen(
            StudyEngine.participantState.incomingParticipantState.hasParticipantFlagKeyAndValue(
              ParticipantFlags.flow.key, ParticipantFlags.flow.values.FEflow,
            ),
            StudyEngine.if(
              StudyEngine.participantState.hasParticipantFlagKeyAndValue(
                ParticipantFlags.ageCategory.key, ParticipantFlags.ageCategory.values.child,
              ),
              // if child:
              assignStandardFlow('kids'),
              // else:
              assignStandardFlow('adults')
            ),
            StudyEngine.participantActions.updateFlag(
              ParticipantFlags.flow.key, ParticipantFlags.flow.values.FEflow,
            )
          ),
          // upgrade to LBflow
          StudyEngine.ifThen(
            StudyEngine.participantState.incomingParticipantState.hasParticipantFlagKeyAndValue(
              ParticipantFlags.flow.key, ParticipantFlags.flow.values.LBflow,
            ),
            StudyEngine.if(
              StudyEngine.participantState.hasParticipantFlagKeyAndValue(
                ParticipantFlags.ageCategory.key, ParticipantFlags.ageCategory.values.child,
              ),
              // if child:
              assignStandardFlow('kids'),
              // else:
              assignStandardFlow('adults')
            ),
            StudyEngine.participantActions.updateFlag(
              ParticipantFlags.flow.key, ParticipantFlags.flow.values.LBflow,
            )
          ),
          // upgrade to Chronicflow
          StudyEngine.ifThen(
            StudyEngine.participantState.incomingParticipantState.hasParticipantFlagKeyAndValue(
              ParticipantFlags.flow.key, ParticipantFlags.flow.values.Chronicflow,
            ),
            StudyEngine.if(
              StudyEngine.participantState.hasParticipantFlagKeyAndValue(
                ParticipantFlags.ageCategory.key, ParticipantFlags.ageCategory.values.child,
              ),
              // if child:
              assignStandardFlow('kids'),
              // else:
              assignStandardFlow('adults')
            ),
            StudyEngine.participantActions.updateFlag(
              ParticipantFlags.flow.key, ParticipantFlags.flow.values.Chronicflow,
            )
          ),
        )
      )
    ),
    // if has no active follow up:
    StudyEngine.do(
      takeOverFlagIfExist(ParticipantFlags.flow.key),
      takeOverFlagIfExist(ParticipantFlags.followUp.key),
      takeOverFlagIfExist(ParticipantFlags.ageCategory.key),
      takeOverFlagIfExist(ParticipantFlags.genderCategory.key),
      takeOverFlagIfExist(ParticipantFlags.postalCode.key),
      StudyEngine.if(
        StudyEngine.participantState.hasParticipantFlagKeyAndValue(
          ParticipantFlags.weeklyTBreporter.key, ParticipantFlags.weeklyTBreporter.values.false,
        ),
        takeOverFlagIfExist(ParticipantFlags.weeklyTBreporter.key),
      ),
      takeOverSurveyIfAssigned(Standardflow_Adults.key),
      takeOverSurveyIfAssigned(Standardflow_Kids.key),
      takeOverSurveyIfAssigned(EMflow_Adults.key),
      takeOverSurveyIfAssigned(EMflow_Kids.key),
      takeOverSurveyIfAssigned(Feverflow_Adults.key),
      takeOverSurveyIfAssigned(LBflow_Adults.key),
      takeOverSurveyIfAssigned(LBflow_Kids.key),
      takeOverSurveyIfAssigned(Chronicflow_Adults.key),
      takeOverSurveyIfAssigned(Chronicflow_Kids.key),
    )
  )
]



/**
 * STUDY RULES
 */
export const studyRules = new StudyRules(
  undefined,
  submitRules,
  timerRules,
  mergeRules,
)
