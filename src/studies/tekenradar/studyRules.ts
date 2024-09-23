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
  isSurveyExpired, aEMflagLogic, kEMflagLogic, quitFollowUp, reAssignWeeklyToTheEndOfList, removeAllT0Surveys,
  removeFollowUpMessagesForSurvey, resetToPDiffStart, takeOverFlagIfExist, takeOverSurveyIfAssigned,
  updateAgeFlags, updateGenderFlag, updatePostalCodeFlag, updateTbExposureFlag, PHQ_15_noneflagLogic
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
import { surveyKeys } from "./surveys/globalConstants";
import { DeleteContactData } from "./surveys/DeleteContactData";
import { postalCodesForNMGStudy } from "./surveys/globalConstants";
import { LPplus_part1 } from "./surveys/LPplus_part1";

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
  WeeklyTBReport: {
    key: 'weeklyTB'
  },
}

const contentServiceName = 'content-service';
const lppSubmissionHandler = 'lpp-submission-handler';
const researcherBackendNames = {
  T0_Invites: 'researcher-backend-t0-invites'
};

export const emailKeys = {
  FlowReminder: 'Flow_reminder',
  StandardflowReminder: 'Standardflow_reminder',
  EMfotoReminder: 'EMfoto_reminder',
  EMcheckReminder: 'EMcheck_reminder',
}

export const researcherNotificationTypes = {
  participantFound: {
    messageType: 'participantFound',
    categoryFlag: {
      key: 'categoryFlag',
      values: {
        kEM: 'kEM',
        aEM: 'aEM'
      }
    }
  }
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
    StudyEngine.participantActions.removeFlag(ParticipantFlags.kEM.key),
    StudyEngine.participantActions.removeFlag(ParticipantFlags.aEM.key),
    StudyEngine.participantActions.startNewStudySession(),
  ),
  handlePDiffRuleFor_TBflow(),
  handlePDiffRuleFor_EMflow(),
  handlePDiffRuleFor_FEflow(),
  handlePDiffRuleFor_LBflow(),
  handlePDiffRuleFor_Chronicflow(),
  handlePDiffRuleFor_WeeklyTB(),
)

/**
 *
 */
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
  updateTbExposureFlag(TBflow_Adults.PTB.Q1.key),
  updatePostalCodeFlag(TBflow_Adults.P1.key),
  reAssignWeeklyToTheEndOfList(),
  // Map data aggregation:
  StudyEngine.if(
    StudyEngine.singleChoice.any(TBflow_Adults.Q3.Q1.key, TBflow_Adults.Q3.Q1.optionKeys.precies, TBflow_Adults.Q3.Q1.optionKeys.ongeveer, TBflow_Adults.Q3.Q1.optionKeys.denkWeten),
    StudyEngine.participantActions.externalEventHandler(contentServiceName)
  ),
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
    StudyEngine.getResponseValueAsNum(TBflow_Adults.Q4.key, `${responseGroupKey}.${numericInputKey}`), 'int'
  ),
  StudyEngine.participantActions.reports.updateData(reports.TBReport.key, reports.TBReport.location,
    StudyEngine.getResponseValueAsStr(TBflow_Adults.Q5.key, `${responseGroupKey}.${inputKey}`), 'string'
  ),
)

/**
 *
 */
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
  updateTbExposureFlag(TBflow_Kids.PTB.Q1.key),
  reAssignWeeklyToTheEndOfList(),
  // Map data aggregation:
  StudyEngine.if(
    StudyEngine.singleChoice.any(TBflow_Kids.Q3.Q1.key, TBflow_Kids.Q3.Q1.optionKeys.precies, TBflow_Kids.Q3.Q1.optionKeys.ongeveer, TBflow_Kids.Q3.Q1.optionKeys.denkWeten),
    StudyEngine.participantActions.externalEventHandler(contentServiceName)
  ),
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
const addEMcheckReminderEmail = () => StudyEngine.participantActions.messages.add(emailKeys.EMcheckReminder, StudyEngine.timestampWithOffset({ days: 21 }));

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
  aEMflagLogic(),
  reAssignWeeklyToTheEndOfList(),
  updateTbExposureFlag(EMflow_Adults.PTB.Q1.key),
  // Map data aggregation:
  StudyEngine.if(
    StudyEngine.singleChoice.any(EMflow_Adults.TBOtherG.Q3.Q1.key, EMflow_Adults.TBOtherG.Q3.Q1.optionKeys.precies, EMflow_Adults.TBOtherG.Q3.Q1.optionKeys.ongeveer, EMflow_Adults.TBOtherG.Q3.Q1.optionKeys.denkWeten),
    StudyEngine.participantActions.externalEventHandler(contentServiceName)
  ),
  // Report:
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
  updateTbExposureFlag(EMflow_Kids.PTB.Q1.key),
  // Map data aggregation:
  StudyEngine.if(
    StudyEngine.singleChoice.any(EMflow_Kids.TBOtherG.Q3.Q1.key, EMflow_Kids.TBOtherG.Q3.Q1.optionKeys.precies, EMflow_Kids.TBOtherG.Q3.Q1.optionKeys.ongeveer, EMflow_Kids.TBOtherG.Q3.Q1.optionKeys.denkWeten),
    StudyEngine.participantActions.externalEventHandler(contentServiceName)
  ),
  // Report:
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
  updateTbExposureFlag(Feverflow_Adults.PTB.Q1.key),
  // Map data aggregation:
  StudyEngine.if(
    StudyEngine.singleChoice.any(Feverflow_Adults.TBOtherG.Q3.Q1.key, Feverflow_Adults.TBOtherG.Q3.Q1.optionKeys.precies, Feverflow_Adults.TBOtherG.Q3.Q1.optionKeys.ongeveer, Feverflow_Adults.TBOtherG.Q3.Q1.optionKeys.denkWeten),
    StudyEngine.participantActions.externalEventHandler(contentServiceName)
  ),
  // Report:
  StudyEngine.participantActions.reports.init(reports.FeverReport.key),
  StudyEngine.participantActions.reports.setReportIcon(reports.FeverReport.key, reports.FeverReport.key)
);

/**
 *
 */
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
  updateTbExposureFlag(LBflow_Adults.PTB.Q1.key),
  // Map data aggregation:
  StudyEngine.if(
    StudyEngine.singleChoice.any(LBflow_Adults.TBOtherG.Q3.Q1.key, LBflow_Adults.TBOtherG.Q3.Q1.optionKeys.precies, LBflow_Adults.TBOtherG.Q3.Q1.optionKeys.ongeveer, LBflow_Adults.TBOtherG.Q3.Q1.optionKeys.denkWeten),
    StudyEngine.participantActions.externalEventHandler(contentServiceName)
  ),
  // Report:
  StudyEngine.participantActions.reports.init(reports.LBReport.key),
  StudyEngine.participantActions.reports.setReportIcon(reports.LBReport.key, reports.LBReport.key)
);


/**
 *
 */
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
  updateTbExposureFlag(LBflow_Kids.PTB.Q1.key),
  // Map data aggregation:
  StudyEngine.if(
    StudyEngine.singleChoice.any(LBflow_Kids.TBOtherG.Q3.Q1.key, LBflow_Kids.TBOtherG.Q3.Q1.optionKeys.precies, LBflow_Kids.TBOtherG.Q3.Q1.optionKeys.ongeveer, LBflow_Kids.TBOtherG.Q3.Q1.optionKeys.denkWeten),
    StudyEngine.participantActions.externalEventHandler(contentServiceName)
  ),
  // Report:
  StudyEngine.participantActions.reports.init(reports.LBReport.key),
  StudyEngine.participantActions.reports.setReportIcon(reports.LBReport.key, reports.LBReport.key)
);

/**
 *
 */
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
  updateTbExposureFlag(Chronicflow_Adults.PTB.Q1.key),
  // Map data aggregation:
  StudyEngine.if(
    StudyEngine.singleChoice.any(Chronicflow_Adults.TBOtherG.Q3.Q1.key, Chronicflow_Adults.TBOtherG.Q3.Q1.optionKeys.precies, Chronicflow_Adults.TBOtherG.Q3.Q1.optionKeys.ongeveer, Chronicflow_Adults.TBOtherG.Q3.Q1.optionKeys.denkWeten),
    StudyEngine.participantActions.externalEventHandler(contentServiceName)
  ),
  // Report:
  StudyEngine.participantActions.reports.init(reports.ChronicReport.key),
  StudyEngine.participantActions.reports.setReportIcon(reports.ChronicReport.key, reports.ChronicReport.key)
);

/**
 *
 */
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
  updateTbExposureFlag(Chronicflow_Kids.PTB.Q1.key),
  // Map data aggregation:
  StudyEngine.if(
    StudyEngine.singleChoice.any(Chronicflow_Kids.TBOtherG.Q3.Q1.key, Chronicflow_Kids.TBOtherG.Q3.Q1.optionKeys.precies, Chronicflow_Kids.TBOtherG.Q3.Q1.optionKeys.ongeveer, Chronicflow_Kids.TBOtherG.Q3.Q1.optionKeys.denkWeten),
    StudyEngine.participantActions.externalEventHandler(contentServiceName)
  ),
  // Report:
  StudyEngine.participantActions.reports.init(reports.ChronicReport.key),
  StudyEngine.participantActions.reports.setReportIcon(reports.ChronicReport.key, reports.ChronicReport.key)
);


/**
 *
 */
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
        StudyEngine.consent.accepted(T0_Invites.aEMInviteGroup.UitnodigingOnderzoekConsent.key),
        StudyEngine.consent.accepted(T0_Invites.aEMInviteGroup.aEMUitnodigingOnderzoekConsent.key),
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
    ),
    StudyEngine.participantActions.updateFlag(ParticipantFlags.consents.defaultStudy.key, ParticipantFlags.consents.defaultStudy.values.accepted)
  ),
  // Update flag for contact info
  StudyEngine.if(
    StudyEngine.or(
      StudyEngine.consent.accepted(T0_Invites.StandardInviteGroup.UitnodigingAanvullendOnderzoekConsent.key),
      StudyEngine.consent.accepted(T0_Invites.aEMInviteGroup.aEMUitnodigingOnderzoekConsent.key),
      StudyEngine.consent.accepted(T0_Invites.kEMInviteGroup.kEMUitnodigingOnderzoekConsent.key),
      StudyEngine.consent.accepted(T0_Invites.LPplusInviteGroup.BiobankUitnodigingAanvullendOnderzoekConsent.key)
    ),
    // Then:
    StudyEngine.do(
      StudyEngine.participantActions.updateFlag(ParticipantFlags.contactData.key, ParticipantFlags.contactData.values.active),
      StudyEngine.participantActions.updateFlag(ParticipantFlags.consents.additionalStudies.key, ParticipantFlags.consents.additionalStudies.values.accepted),
      StudyEngine.participantActions.assignedSurveys.add(surveyKeys.DeleteContactData, 'optional', undefined, StudyEngine.timestampWithOffset({ days: 12 * 7 })),
      // if aEM - send notification
      StudyEngine.ifThen(
        StudyEngine.participantState.hasParticipantFlagKeyAndValue(
          ParticipantFlags.aEM.key,
          ParticipantFlags.aEM.values.likely
        ),
        StudyEngine.notifyResearcher(researcherNotificationTypes.participantFound.messageType,
          researcherNotificationTypes.participantFound.categoryFlag.key,
          researcherNotificationTypes.participantFound.categoryFlag.values.aEM
        )
      ),
      // if kEM - send notification:
      StudyEngine.ifThen(
        StudyEngine.participantState.hasParticipantFlagKeyAndValue(
          ParticipantFlags.kEM.key,
          ParticipantFlags.kEM.values.likely
        ),
        StudyEngine.notifyResearcher(researcherNotificationTypes.participantFound.messageType,
          researcherNotificationTypes.participantFound.categoryFlag.key,
          researcherNotificationTypes.participantFound.categoryFlag.values.kEM
        )
      ),
    ),
    // Else:
    StudyEngine.participantActions.updateFlag(ParticipantFlags.consents.additionalStudies.key, ParticipantFlags.consents.additionalStudies.values.rejected)
  ),
  //  StudyEngine.if(
  //    StudyEngine.or(
  //      StudyEngine.hasResponseKeyWithValue(T0_Invites.aEMInviteGroup.Contactgegevens.PC4contact.key, [responseGroupKey, inputKey].join('.'), '6511'),
  //      StudyEngine.hasResponseKeyWithValue(T0_Invites.aEMInviteGroup.Contactgegevens.PC4contact.key, [responseGroupKey, inputKey].join('.'), '6512'),
  //      StudyEngine.singleChoice.any(T0_Invites.aEMInviteGroup.NijmegenReis.key, T0_Invites.aEMInviteGroup.NijmegenReis.optionKeys.yes)
  //    ),

  //per 01-10-2024 LE stopped by removing updating of the NMG flag (Lola per 1-10 dit stukje code uitscripten)
  StudyEngine.if(
    StudyEngine.or(...postalCodesForNMGStudy.map(postalCode => StudyEngine.hasResponseKeyWithValue(T0_Invites.aEMInviteGroup.Contactgegevens.PC4contact.key, [responseGroupKey, inputKey].join('.'), postalCode)),
      StudyEngine.singleChoice.any(T0_Invites.aEMInviteGroup.NijmegenReis.key, T0_Invites.aEMInviteGroup.NijmegenReis.optionKeys.yes)),
    StudyEngine.participantActions.updateFlag(ParticipantFlags.NMG.key, ParticipantFlags.NMG.values.true),
  ),
  StudyEngine.if(
    StudyEngine.consent.accepted(T0_Invites.LPplusInviteGroup.BiobankUitnodigingAanvullendOnderzoekConsent.key),
    StudyEngine.participantActions.updateFlag(ParticipantFlags.BioB.key, ParticipantFlags.BioB.values.true),
  ),
  StudyEngine.participantActions.externalEventHandler(researcherBackendNames.T0_Invites),
  StudyEngine.participantActions.externalEventHandler(lppSubmissionHandler),
  reAssignWeeklyToTheEndOfList(),
)


//I think this might work. Explained:
//- IF condition true, update flag
//- condition => any of the postal codes match OR the single choice question has the answer yes
//(not sure if this is the correct condition, feel free to modify)
//- the syntax with the three dots, and map:
//- three dots (…): take the array/list and insert here one by one (saves you writing it 600 times)
//- .map ( postalCodes.map ) -> returns a list of the same size but replaces each item by: iterate over the list of postal codes, and instead each of the entries (4 digit string), use the exrpession as defined (response has a specific key and value (current postal code)

//I did not test this at the moment.











/**
 *
 */
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
  // Add reminder email to check for EM later
  StudyEngine.ifThen(
    StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.flow.key, ParticipantFlags.flow.values.TBflow),
    addEMcheckReminderEmail(),
  ),
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
  // Add reminder email to check for EM later
  StudyEngine.ifThen(
    StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.flow.key, ParticipantFlags.flow.values.TBflow),
    addEMcheckReminderEmail(),
  ),
);

const handleSubmit_WeeklyTB = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(WeeklyTB.key),
  // Then:
  StudyEngine.participantActions.updateFlag(ParticipantFlags.weeklyTBreporter.key, ParticipantFlags.weeklyTBreporter.values.true),
  StudyEngine.participantActions.assignedSurveys.remove(WeeklyTB.key, 'all'),
  StudyEngine.participantActions.assignedSurveys.add(WeeklyTB.key, 'normal', StudyEngine.timestampWithOffset({ hours: 1 })),
  StudyEngine.ifThen(
    StudyEngine.not(StudyEngine.participantState.hasSurveyKeyAssigned(QuitWeeklyTB.key)),
    StudyEngine.participantActions.assignedSurveys.add(QuitWeeklyTB.key, 'optional'),
  ),
  // Consent through weekly TB
  StudyEngine.ifThen(
    StudyEngine.consent.accepted(WeeklyTB.ConsentGroup.Consent.key),
    StudyEngine.participantActions.updateFlag(ParticipantFlags.consents.defaultStudy.key, ParticipantFlags.consents.defaultStudy.values.accepted),
  ),
  // Additional studies consent through weekly TB
  StudyEngine.ifThen(
    StudyEngine.singleChoice.any(WeeklyTB.ConsentGroup.NewStudies.key, WeeklyTB.ConsentGroup.NewStudies.optionKeys.yes),
    StudyEngine.participantActions.updateFlag(ParticipantFlags.consents.additionalStudies.key, ParticipantFlags.consents.additionalStudies.values.accepted),
  ),
  updateGenderFlag(WeeklyTB.P2.key),
  updatePostalCodeFlag(WeeklyTB.P1.key),
  updateTbExposureFlag(WeeklyTB.PTB.Q1.key),
  // Add report:
  StudyEngine.participantActions.reports.init(reports.WeeklyTBReport.key),
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
      // StudyEngine.participantActions.assignedSurveys.add(EMfoto.key, 'optional', undefined, StudyEngine.timestampWithOffset({ days: 222 })),
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


const handleSubmit_DeleteContactData = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(surveyKeys.DeleteContactData),
  // Then:
  StudyEngine.ifThen(
    StudyEngine.singleChoice.any(DeleteContactData.Confirm.key, DeleteContactData.Confirm.optionKeys.yes),
    // Then
    StudyEngine.participantActions.confidentialResponses.removeAll(),
    StudyEngine.participantActions.assignedSurveys.remove(surveyKeys.DeleteContactData, 'all'),
    StudyEngine.participantActions.updateFlag(
      ParticipantFlags.contactData.key,
      ParticipantFlags.contactData.values.manual
    )
  )
)

const handleSubmit_LPPlus_part1 = StudyEngine.ifThen(
  StudyEngine.checkSurveyResponseKey('LPplus_part1'),
  // Then:
  StudyEngine.participantActions.updateFlag('LPplus', 'likely'),
  StudyEngine.participantActions.externalEventHandler(lppSubmissionHandler),
  PHQ_15_noneflagLogic(),
  updateGenderFlag(LPplus_part1.LPplusContactgegevens.Gender.key),
  StudyEngine.participantActions.updateFlag(
    ParticipantFlags.ageFromPDiff.key,
    StudyEngine.getSelectedKeys(LPplus_part1.LPplusContactgegevens.BirthYear.key, 'rg.ddg'),
  ),
)

const handleSubmit_LPPlus_part2 = StudyEngine.ifThen(
  StudyEngine.checkSurveyResponseKey('LPplus_part2'),
  // Then:
  StudyEngine.participantActions.externalEventHandler(lppSubmissionHandler),
)

const handleSubmit_LPPlus_part3 = StudyEngine.ifThen(
  StudyEngine.checkSurveyResponseKey('LPplus_part3'),
  // Then:
  StudyEngine.participantActions.externalEventHandler(lppSubmissionHandler),
)


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


const handleAutoContactDataDeletion = () => StudyEngine.ifThen(
  isSurveyExpired(surveyKeys.DeleteContactData),
  /*StudyEngine.and(
    StudyEngine.participantState.lastSubmissionDateOlderThan(StudyEngine.timestampWithOffset({ days: 12 * 7 }), surveyKeys.T0_Invites),
    StudyEngine.participantState.hasSurveyKeyAssigned(surveyKeys.DeleteContactData),
  ),*/
  // Then:
  StudyEngine.participantActions.confidentialResponses.removeAll(),
  StudyEngine.participantActions.assignedSurveys.remove(surveyKeys.DeleteContactData, 'all'),
  StudyEngine.participantActions.updateFlag(
    ParticipantFlags.contactData.key,
    ParticipantFlags.contactData.values.autoRemove
  )
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
  handleSubmit_DeleteContactData,
  // LPplus:
  handleSubmit_LPPlus_part1,
  handleSubmit_LPPlus_part2,
  handleSubmit_LPPlus_part3,
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
  handleAutoContactDataDeletion(),
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
      takeOverFlagIfExist(ParticipantFlags.tbExposure.key),
      takeOverFlagIfExist(ParticipantFlags.NMG.key),
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
