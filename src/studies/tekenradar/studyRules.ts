import { StudyRules } from "case-editor-tools/types/studyRules";
import { Expression } from "survey-engine/data_types";
import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import {
  assignStandardFlow,
  assignT0Invite,
  finishFollowUp,
  handleExpired_removeSurvey, handlePDiffRuleFor_Chronicflow, handlePDiffRuleFor_EMflow, handlePDiffRuleFor_FEflow,
  handlePDiffRuleFor_LBflow, handlePDiffRuleFor_TBflow, handlePDiffRuleFor_WeeklyTB,
  initFollowUpFlow_Adults,
  initFollowUpFlow_Kids,
  isSurveyExpired, aEMflagLogic, kEMflagLogic, LBotherflagLogic, quitFollowUp, reAssignWeeklyToTheEndOfList, removeAllT0Surveys,
  removeFollowUpMessagesForSurvey, resetToPDiffStart, takeOverFlagIfExist, takeOverSurveyIfAssigned,
  updateAgeFlags, updateGenderFlag, updatePostalCodeFlag, updateTbExposureFlag, PHQ_15_noneflagLogic, LDexcluded_flagLogic,
  Standardflow_Adults_key,
  Standardflow_Kids_key,
  DeleteContactData_key,
  WeeklyTB_key,
  QuitWeeklyTB_key
} from "./utils/studyRuleUtils";
import { ParticipantFlags } from "./participantFlags";
import { inputKey, multipleChoiceKey, numericInputKey, responseGroupKey } from "case-editor-tools/constants/key-definitions";


import { PDiff_key, TBflow_Adults_key, TBflow_Kids_key, EMfoto_key, EMflow_Adults_key, EMflow_Kids_key, Feverflow_Adults_key, LBflow_Adults_key, LBflow_Kids_key, Chronicflow_Adults_key, Chronicflow_Kids_key, T0_Invites_key, QuitFollowUp_key, T3_Adults_key, T6_Adults_key, T9_Adults_key, T12_Adults_key, T3_Kids_key, T6_Kids_key, T9_Kids_key, T12_Kids_key, LPplus_part1_key } from "./utils/studyRuleUtils";



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


const TBLoc_Q1_optionKeys = {
  precise: 'a',
  approximate: 'b',
  dontKnow: 'c',
}

const handleSubmit_PDiff = StudyEngine.ifThen(
  // IF:
  StudyEngine.checkSurveyResponseKey(PDiff_key),
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
    StudyEngine.participantActions.removeFlag(ParticipantFlags.LBother.key),
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
  StudyEngine.checkSurveyResponseKey(TBflow_Adults_key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(TBflow_Adults_key, 'all'),
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
  updateGenderFlag(`${TBflow_Adults_key}.P2`),
  updateTbExposureFlag(`${TBflow_Adults_key}.PTBG.PTB1`),
  updatePostalCodeFlag(`${TBflow_Adults_key}.P1`),
  reAssignWeeklyToTheEndOfList(),
  // Map data aggregation:
  StudyEngine.if(
    StudyEngine.singleChoice.any(
      `${TBflow_Adults_key}.TBLoc.Q1`,
      TBLoc_Q1_optionKeys.precise,
      TBLoc_Q1_optionKeys.approximate,
      TBLoc_Q1_optionKeys.dontKnow,
    ),
    StudyEngine.participantActions.externalEventHandler(contentServiceName)
  ),
  // Report:
  StudyEngine.participantActions.reports.init(reports.TBReport.key),
  StudyEngine.participantActions.reports.setReportIcon(reports.TBReport.key, reports.TBReport.key),
  StudyEngine.participantActions.reports.updateData(reports.TBReport.key, reports.TBReport.environment,
    StudyEngine.getSelectedKeys(`${TBflow_Adults_key}.TB_A1`, `${responseGroupKey}.${multipleChoiceKey}`), 'keyList'
  ),
  StudyEngine.participantActions.reports.updateData(reports.TBReport.key, reports.TBReport.activity,
    StudyEngine.getSelectedKeys(`${TBflow_Adults_key}.TB_A2`, `${responseGroupKey}.${multipleChoiceKey}`), 'keyList'
  ),
  StudyEngine.participantActions.reports.updateData(reports.TBReport.key, reports.TBReport.count,
    StudyEngine.getResponseValueAsNum(`${TBflow_Adults_key}.TB_A4`, `${responseGroupKey}.${numericInputKey}`), 'int'
  ),
  StudyEngine.participantActions.reports.updateData(reports.TBReport.key, reports.TBReport.location,
    StudyEngine.getResponseValueAsStr(`${TBflow_Adults_key}.TB_A5`, `${responseGroupKey}.${inputKey}`), 'string'
  ),
)

/**
 *
 */
const handleSubmit_TBflow_Kids = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(TBflow_Kids_key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(TBflow_Kids_key, 'all'),
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
  updateGenderFlag(`${TBflow_Kids_key}.P2`),
  updatePostalCodeFlag(`${TBflow_Kids_key}.P1`),
  updateTbExposureFlag(`${TBflow_Kids_key}.PTBG.PTB1`),
  reAssignWeeklyToTheEndOfList(),
  // Map data aggregation:
  StudyEngine.if(
    StudyEngine.singleChoice.any(
      `${TBflow_Kids_key}.TBLoc.Q1`,
      TBLoc_Q1_optionKeys.precise,
      TBLoc_Q1_optionKeys.approximate,
      TBLoc_Q1_optionKeys.dontKnow,
    ),
    StudyEngine.participantActions.externalEventHandler(contentServiceName)
  ),
  // Report:
  StudyEngine.participantActions.reports.init(reports.TBReport.key),
  StudyEngine.participantActions.reports.setReportIcon(reports.TBReport.key, reports.TBReport.key),
  StudyEngine.participantActions.reports.updateData(reports.TBReport.key, reports.TBReport.environment,
    StudyEngine.getSelectedKeys(`${TBflow_Kids_key}.TB_A1`, `${responseGroupKey}.${multipleChoiceKey}`), 'keyList'
  ),
  StudyEngine.participantActions.reports.updateData(reports.TBReport.key, reports.TBReport.activity,
    StudyEngine.getSelectedKeys(`${TBflow_Kids_key}.TB_A2`, `${responseGroupKey}.${multipleChoiceKey}`), 'keyList'
  ),
  StudyEngine.participantActions.reports.updateData(reports.TBReport.key, reports.TBReport.count,
    StudyEngine.getResponseValueAsStr(`${TBflow_Kids_key}.TB_A4`, `${responseGroupKey}.${numericInputKey}`), 'int'
  ),
  StudyEngine.participantActions.reports.updateData(reports.TBReport.key, reports.TBReport.location,
    StudyEngine.getResponseValueAsStr(`${TBflow_Kids_key}.TB_A5`, `${responseGroupKey}.${inputKey}`), 'string'
  ),
)

const addEMfotoReminderEmail = () => StudyEngine.participantActions.messages.add(emailKeys.EMfotoReminder, StudyEngine.timestampWithOffset({ days: 2 }));
const addEMcheckReminderEmail = () => StudyEngine.participantActions.messages.add(emailKeys.EMcheckReminder, StudyEngine.timestampWithOffset({ days: 21 }));

const assignEMfotoSurvey = () => StudyEngine.do(
  StudyEngine.participantActions.assignedSurveys.add(EMfoto_key, 'immediate', undefined, StudyEngine.timestampWithOffset({ days: 222 })),
  addEMfotoReminderEmail(),
)

const handleSubmit_EMflow_Adults = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(EMflow_Adults_key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(EMflow_Adults_key, 'all'),
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
  updateTbExposureFlag(`${EMflow_Adults_key}.PTBG.PTB1`),
  // Map data aggregation:
  StudyEngine.if(
    StudyEngine.singleChoice.any(
      `${EMflow_Adults_key}.TBOtherG.TBLoc.Q1`,
      TBLoc_Q1_optionKeys.precise,
      TBLoc_Q1_optionKeys.approximate,
      TBLoc_Q1_optionKeys.dontKnow,
    ),
    StudyEngine.participantActions.externalEventHandler(contentServiceName)
  ),
  // Report:
  StudyEngine.participantActions.reports.init(reports.EMReport.key),
  StudyEngine.participantActions.reports.setReportIcon(reports.EMReport.key, reports.EMReport.key)
);

const handleSubmit_EMflow_Kids = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(EMflow_Kids_key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(EMflow_Kids_key, 'all'),
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
  updateTbExposureFlag(`${EMflow_Kids_key}.PTBG.PTB1`),
  // Map data aggregation:
  StudyEngine.if(
    StudyEngine.singleChoice.any(
      `${EMflow_Kids_key}.TBOtherG.TBLoc.Q1`,
      TBLoc_Q1_optionKeys.precise,
      TBLoc_Q1_optionKeys.approximate,
      TBLoc_Q1_optionKeys.dontKnow,
    ),
    StudyEngine.participantActions.externalEventHandler(contentServiceName)
  ),
  // Report:
  StudyEngine.participantActions.reports.init(reports.EMReport.key),
  StudyEngine.participantActions.reports.setReportIcon(reports.EMReport.key, reports.EMReport.key)
);

const handleSubmit_Feverflow_Adults = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(Feverflow_Adults_key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(Feverflow_Adults_key, 'all'),
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
  updateTbExposureFlag(`${Feverflow_Adults_key}.PTBG.PTB1`),
  // Map data aggregation:
  StudyEngine.if(
    StudyEngine.singleChoice.any(
      `${Feverflow_Adults_key}.TBOtherG.TBLoc.Q1`,
      TBLoc_Q1_optionKeys.precise,
      TBLoc_Q1_optionKeys.approximate,
      TBLoc_Q1_optionKeys.dontKnow,
    ),
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
  StudyEngine.checkSurveyResponseKey(LBflow_Adults_key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(LBflow_Adults_key, 'all'),
  StudyEngine.participantActions.messages.remove(emailKeys.FlowReminder),
  assignEMfotoSurvey(),
  LDexcluded_flagLogic(),
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
  LBotherflagLogic(),
  reAssignWeeklyToTheEndOfList(),
  updateTbExposureFlag(`${LBflow_Adults_key}.PTBG.PTB1`),
  // Map data aggregation:
  StudyEngine.if(
    StudyEngine.singleChoice.any(
      `${LBflow_Adults_key}.TBOtherG.TBLoc.Q1`,
      TBLoc_Q1_optionKeys.precise,
      TBLoc_Q1_optionKeys.approximate,
      TBLoc_Q1_optionKeys.dontKnow,
    ),
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
  StudyEngine.checkSurveyResponseKey(LBflow_Kids_key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(LBflow_Kids_key, 'all'),
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
  updateTbExposureFlag(`${LBflow_Kids_key}.PTBG.PTB1`),
  // Map data aggregation:
  StudyEngine.if(
    StudyEngine.singleChoice.any(
      `${LBflow_Kids_key}.TBOtherG.TBLoc.Q1`,
      TBLoc_Q1_optionKeys.precise,
      TBLoc_Q1_optionKeys.approximate,
      TBLoc_Q1_optionKeys.dontKnow,
    ),
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
  StudyEngine.checkSurveyResponseKey(Chronicflow_Adults_key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(Chronicflow_Adults_key, 'all'),
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
  updateTbExposureFlag(`${Chronicflow_Adults_key}.PTBG.PTB1`),
  // Map data aggregation:
  StudyEngine.if(
    StudyEngine.singleChoice.any(
      `${Chronicflow_Adults_key}.TBOtherG.TBLoc.Q1`,
      TBLoc_Q1_optionKeys.precise,
      TBLoc_Q1_optionKeys.approximate,
      TBLoc_Q1_optionKeys.dontKnow,
    ),
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
  StudyEngine.checkSurveyResponseKey(Chronicflow_Kids_key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(Chronicflow_Kids_key, 'all'),
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
  updateTbExposureFlag(`${Chronicflow_Kids_key}.PTBG.PTB1`),
  // Map data aggregation:
  StudyEngine.if(
    StudyEngine.singleChoice.any(
      `${Chronicflow_Kids_key}.TBOtherG.TBLoc.Q1`,
      TBLoc_Q1_optionKeys.precise,
      TBLoc_Q1_optionKeys.approximate,
      TBLoc_Q1_optionKeys.dontKnow,
    ),
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
  StudyEngine.checkSurveyResponseKey(T0_Invites_key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(T0_Invites_key, 'all'),
  StudyEngine.ifThen(
    // If want to participate in follow up: (and not yet in follow up)
    StudyEngine.and(
      StudyEngine.or(
        StudyEngine.consent.accepted(`${T0_Invites_key}.STD.UitnTR_Consent`),
        StudyEngine.consent.accepted(`${T0_Invites_key}.aEM.UitnTR_Consent`),
        StudyEngine.consent.accepted(`${T0_Invites_key}.aEM.aEMUitnTR_Consent`),
        StudyEngine.consent.accepted(`${T0_Invites_key}.kEM.UitnTR_Consent`),
        //StudyEngine.consent.accepted(T0_Invites.kEMInviteGroup.kEMUitnodigingOnderzoekConsent.key), //LT uitgezet per 11-07-2025
        StudyEngine.consent.accepted(`${T0_Invites_key}.LBother.UitnTR_Consent`),
        StudyEngine.consent.accepted(`${T0_Invites_key}.LBother.LBotherUitnTR_Consent`),
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
      StudyEngine.consent.accepted(`${T0_Invites_key}.STD.UitnAO_Consent`),
      StudyEngine.consent.accepted(`${T0_Invites_key}.aEM.aEMUitnTR_Consent`),
      StudyEngine.consent.accepted(`${T0_Invites_key}.LBother.LBotherUitnTR_Consent`),
      //StudyEngine.consent.accepted(T0_Invites.kEMInviteGroup.kEMUitnodigingOnderzoekConsent.key), //LT uitgezet per 11-07-2025
      StudyEngine.consent.accepted(`${T0_Invites_key}.LPplusBB.UitnBiobankAO_Consent`)
    ),
    // Then:
    StudyEngine.do(
      StudyEngine.participantActions.updateFlag(ParticipantFlags.contactData.key, ParticipantFlags.contactData.values.active),
      StudyEngine.participantActions.updateFlag(ParticipantFlags.consents.additionalStudies.key, ParticipantFlags.consents.additionalStudies.values.accepted),
      StudyEngine.participantActions.assignedSurveys.add(DeleteContactData_key, 'optional', undefined, StudyEngine.timestampWithOffset({ days: 12 * 7 })),
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

  //per 01-10-2024 LE stopped by removing updating of the NMG flag (Lola per 1-10 dit stukje code uitgescript)
  //StudyEngine.if(
  //  StudyEngine.or(...postalCodesForNMGStudy.map(postalCode => StudyEngine.hasResponseKeyWithValue(T0_Invites.aEMInviteGroup.Contactgegevens.PC4contact.key, [responseGroupKey, inputKey].join('.'), postalCode)),
  //    StudyEngine.singleChoice.any(T0_Invites.aEMInviteGroup.NijmegenReis.key, T0_Invites.aEMInviteGroup.NijmegenReis.optionKeys.yes)),
  //  StudyEngine.participantActions.updateFlag(ParticipantFlags.NMG.key, ParticipantFlags.NMG.values.true),
  //),
  StudyEngine.if(
    StudyEngine.consent.accepted(`${T0_Invites_key}.LPplusBB.UitnBiobankAO_Consent`),
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
  StudyEngine.checkSurveyResponseKey(Standardflow_Adults_key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(Standardflow_Adults_key, 'all'),
  StudyEngine.participantActions.messages.remove(emailKeys.StandardflowReminder),
  StudyEngine.ifThen(
    StudyEngine.not(
      StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.active)
    ),
    initFollowUpFlow_Adults(),
    StudyEngine.participantActions.updateFlag(ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.active)
  ),
  updateGenderFlag(`${Standardflow_Adults_key}.P2`),
  updatePostalCodeFlag(`${Standardflow_Adults_key}.P1`),
  // Add reminder email to check for EM later
  StudyEngine.ifThen(
    StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.flow.key, ParticipantFlags.flow.values.TBflow),
    addEMcheckReminderEmail(),
  ),
);


const handleSubmit_Standardflow_Kids = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(Standardflow_Kids_key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(Standardflow_Kids_key, 'all'),
  StudyEngine.participantActions.messages.remove(emailKeys.StandardflowReminder),
  StudyEngine.ifThen(
    StudyEngine.not(
      StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.active)
    ),
    initFollowUpFlow_Kids(),
    StudyEngine.participantActions.updateFlag(ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.active)
  ),
  // Gender category:
  updateGenderFlag(`${Standardflow_Kids_key}.P2`),
  updatePostalCodeFlag(`${Standardflow_Kids_key}.P1`),
  // Add reminder email to check for EM later
  StudyEngine.ifThen(
    StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.flow.key, ParticipantFlags.flow.values.TBflow),
    addEMcheckReminderEmail(),
  ),
);

const handleSubmit_WeeklyTB = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(WeeklyTB_key),
  // Then:
  StudyEngine.participantActions.updateFlag(ParticipantFlags.weeklyTBreporter.key, ParticipantFlags.weeklyTBreporter.values.true),
  StudyEngine.participantActions.assignedSurveys.remove(WeeklyTB_key, 'all'),
  StudyEngine.participantActions.assignedSurveys.add(WeeklyTB_key, 'normal', StudyEngine.timestampWithOffset({ hours: 1 })),
  StudyEngine.ifThen(
    StudyEngine.not(StudyEngine.participantState.hasSurveyKeyAssigned(QuitWeeklyTB_key)),
    StudyEngine.participantActions.assignedSurveys.add(QuitWeeklyTB_key, 'optional'),
  ),
  // Consent through weekly TB
  StudyEngine.ifThen(
    StudyEngine.consent.accepted(`${WeeklyTB_key}.ConsentGroup.Consent`),
    StudyEngine.participantActions.updateFlag(ParticipantFlags.consents.defaultStudy.key, ParticipantFlags.consents.defaultStudy.values.accepted),
  ),
  // Additional studies consent through weekly TB
  StudyEngine.ifThen(
    StudyEngine.singleChoice.any(`${WeeklyTB_key}.ConsentGroup.NewStudies`, 'a'),
    StudyEngine.participantActions.updateFlag(ParticipantFlags.consents.additionalStudies.key, ParticipantFlags.consents.additionalStudies.values.accepted),
  ),
  updateGenderFlag(`${WeeklyTB_key}.P2`),
  updatePostalCodeFlag(`${WeeklyTB_key}.P1`),
  updateTbExposureFlag(`${WeeklyTB_key}.PTBG.PTB1`),
  // Add report:
  StudyEngine.participantActions.reports.init(reports.WeeklyTBReport.key),
);

const handleSubmit_Emfoto = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(EMfoto_key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(EMfoto_key, 'all'),
  StudyEngine.if(
    StudyEngine.hasResponseKey(`${EMfoto_key}.PhotoEM`, 'rg'),
    // Then:
    StudyEngine.do(
      StudyEngine.participantActions.messages.remove(emailKeys.EMfotoReminder),
      // StudyEngine.participantActions.assignedSurveys.add(EMfoto.key, 'optional', undefined, StudyEngine.timestampWithOffset({ days: 222 })),
    ),
    // Else: add again for later
    StudyEngine.participantActions.assignedSurveys.add(EMfoto_key, 'prio', undefined, StudyEngine.timestampWithOffset({ days: 222 })),
  )
);


// -----------------------------------------------
const handleSubmit_T3_Adults = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(T3_Adults_key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(T3_Adults_key, 'all'),
  StudyEngine.participantActions.reports.init(reports.FollowUpReport.key),
  StudyEngine.participantActions.reports.setReportIcon(reports.FollowUpReport.key, reports.FollowUpReport.key),
  removeFollowUpMessagesForSurvey(T3_Adults_key)
);

const handleSubmit_T6_Adults = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(T6_Adults_key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(T6_Adults_key, 'all'),
  StudyEngine.participantActions.reports.init(reports.FollowUpReport.key),
  StudyEngine.participantActions.reports.setReportIcon(reports.FollowUpReport.key, reports.FollowUpReport.key),
  removeFollowUpMessagesForSurvey(T6_Adults_key)
);

const handleSubmit_T9_Adults = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(T9_Adults_key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(T9_Adults_key, 'all'),
  StudyEngine.participantActions.reports.init(reports.FollowUpReport.key),
  StudyEngine.participantActions.reports.setReportIcon(reports.FollowUpReport.key, reports.FollowUpReport.key),
  removeFollowUpMessagesForSurvey(T9_Adults_key)
);

const handleSubmit_T12_Adults = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(T12_Adults_key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(T12_Adults_key, 'all'),
  StudyEngine.participantActions.reports.init(reports.FollowUpReport.key),
  StudyEngine.participantActions.reports.setReportIcon(reports.FollowUpReport.key, reports.FollowUpReport.key),
  StudyEngine.participantActions.updateFlag(ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.finished),
  removeFollowUpMessagesForSurvey(T12_Adults_key)
);

const handleSubmit_T3_Kids = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(T3_Kids_key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(T3_Kids_key, 'all'),
  StudyEngine.participantActions.reports.init(reports.FollowUpReport.key),
  StudyEngine.participantActions.reports.setReportIcon(reports.FollowUpReport.key, reports.FollowUpReport.key),
  removeFollowUpMessagesForSurvey(T3_Kids_key)
);

const handleSubmit_T6_Kids = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(T6_Kids_key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(T6_Kids_key, 'all'),
  StudyEngine.participantActions.reports.init(reports.FollowUpReport.key),
  StudyEngine.participantActions.reports.setReportIcon(reports.FollowUpReport.key, reports.FollowUpReport.key),
  StudyEngine.participantActions.reports.setReportIcon(reports.FollowUpReport.key, reports.FollowUpReport.key),
  removeFollowUpMessagesForSurvey(T6_Kids_key)
);

const handleSubmit_T9_Kids = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(T9_Kids_key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(T9_Kids_key, 'all'),
  StudyEngine.participantActions.reports.init(reports.FollowUpReport.key),
  StudyEngine.participantActions.reports.setReportIcon(reports.FollowUpReport.key, reports.FollowUpReport.key),
  removeFollowUpMessagesForSurvey(T9_Kids_key)
);

const handleSubmit_T12_Kids = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(T12_Kids_key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(T12_Kids_key, 'all'),
  StudyEngine.participantActions.reports.init(reports.FollowUpReport.key),
  StudyEngine.participantActions.reports.setReportIcon(reports.FollowUpReport.key, reports.FollowUpReport.key),
  StudyEngine.participantActions.updateFlag(ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.finished),
  removeFollowUpMessagesForSurvey(T12_Kids_key)
);

const handleSubmit_QuitFollowUp = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(QuitFollowUp_key),
  // Then:
  StudyEngine.ifThen(
    StudyEngine.singleChoice.any(`${QuitFollowUp_key}.QuitFU`, 'a'),
    // Then
    quitFollowUp(),
  ),
);

const handleSubmit_QuitWeeklyTB = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(QuitWeeklyTB_key),
  // Then:
  StudyEngine.ifThen(
    StudyEngine.singleChoice.any(`${QuitWeeklyTB_key}.QuitWeekyTB`, 'a'),
    // Then
    StudyEngine.participantActions.assignedSurveys.remove(WeeklyTB_key, 'all'),
    StudyEngine.participantActions.removeFlag(ParticipantFlags.weeklyTBreporter.key),
    StudyEngine.participantActions.assignedSurveys.remove(QuitWeeklyTB_key, 'all'),
  )
);


const handleSubmit_DeleteContactData = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(DeleteContactData_key),
  // Then:
  StudyEngine.ifThen(
    StudyEngine.singleChoice.any(`${DeleteContactData_key}.DeleteContactData`, 'a'),
    // Then
    StudyEngine.participantActions.confidentialResponses.removeAll(),
    StudyEngine.participantActions.assignedSurveys.remove(DeleteContactData_key, 'all'),
    StudyEngine.participantActions.updateFlag(
      ParticipantFlags.contactData.key,
      ParticipantFlags.contactData.values.manual
    )
  )
)

const handleSubmit_LPPlus_part1 = StudyEngine.ifThen(
  StudyEngine.checkSurveyResponseKey(LPplus_part1_key),
  // Then:
  StudyEngine.participantActions.updateFlag('LPplus', 'likely'),
  StudyEngine.participantActions.externalEventHandler(lppSubmissionHandler),
  PHQ_15_noneflagLogic(),
  updateGenderFlag(`${LPplus_part1_key}.Je gegevens.GENDER`),
  StudyEngine.participantActions.updateFlag(
    ParticipantFlags.ageFromPDiff.key,
    StudyEngine.getSelectedKeys(`${LPplus_part1_key}.Je gegevens.BirthYear`, 'rg.ddg'),
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
  isSurveyExpired(T0_Invites_key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(T0_Invites_key, 'all'),
)

const handleExpired_Standardflow = () => StudyEngine.do(
  StudyEngine.ifThen(
    isSurveyExpired(Standardflow_Kids_key),
    // Then:
    StudyEngine.participantActions.assignedSurveys.remove(Standardflow_Kids_key, 'all'),
  ),
  StudyEngine.ifThen(
    isSurveyExpired(Standardflow_Adults_key),
    // Then:
    StudyEngine.participantActions.assignedSurveys.remove(Standardflow_Adults_key, 'all'),
  ),
)

const handleExpired_T12_Adults = StudyEngine.ifThen(
  isSurveyExpired(T12_Adults_key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(T12_Adults_key, 'all'),
  finishFollowUp(),
)

const handleExpired_T12_Kids = StudyEngine.ifThen(
  isSurveyExpired(T12_Kids_key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(T12_Kids_key, 'all'),
  finishFollowUp(),
)


const handleAutoContactDataDeletion = () => StudyEngine.ifThen(
  isSurveyExpired(DeleteContactData_key),
  /*StudyEngine.and(
    StudyEngine.participantState.lastSubmissionDateOlderThan(StudyEngine.timestampWithOffset({ days: 12 * 7 }), surveyKeys.T0_Invites),
    StudyEngine.participantState.hasSurveyKeyAssigned(surveyKeys.DeleteContactData),
  ),*/
  // Then:
  StudyEngine.participantActions.confidentialResponses.removeAll(),
  StudyEngine.participantActions.assignedSurveys.remove(DeleteContactData_key, 'all'),
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
  handleExpired_removeSurvey(T3_Adults_key),
  handleExpired_removeSurvey(T6_Adults_key),
  handleExpired_removeSurvey(T9_Adults_key),
  handleExpired_T12_Adults,
  handleExpired_removeSurvey(T3_Kids_key),
  handleExpired_removeSurvey(T6_Kids_key),
  handleExpired_removeSurvey(T9_Kids_key),
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
          // take over weekly reporter state when creating new participant with follow-up flow
          StudyEngine.if(
            StudyEngine.participantState.hasParticipantFlagKeyAndValue(
              ParticipantFlags.weeklyTBreporter.key, ParticipantFlags.weeklyTBreporter.values.false,
            ),
            takeOverFlagIfExist(ParticipantFlags.weeklyTBreporter.key),
          ),
          takeOverSurveyIfAssigned(WeeklyTB_key, 'normal'),
          takeOverSurveyIfAssigned(QuitWeeklyTB_key, 'optional'),
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
      takeOverSurveyIfAssigned(Standardflow_Adults_key),
      takeOverSurveyIfAssigned(Standardflow_Kids_key),
      takeOverSurveyIfAssigned(EMflow_Adults_key),
      takeOverSurveyIfAssigned(EMflow_Kids_key),
      takeOverSurveyIfAssigned(Feverflow_Adults_key),
      takeOverSurveyIfAssigned(LBflow_Adults_key),
      takeOverSurveyIfAssigned(LBflow_Kids_key),
      takeOverSurveyIfAssigned(Chronicflow_Adults_key),
      takeOverSurveyIfAssigned(Chronicflow_Kids_key),
      takeOverSurveyIfAssigned(WeeklyTB_key, 'normal'),
      takeOverSurveyIfAssigned(QuitWeeklyTB_key, 'optional'),
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
