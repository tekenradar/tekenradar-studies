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
  updateAgeFlags, updateGenderFlag, updatePostalCodeFlag, updateTbExposureFlag
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

// MH create list of postalcodes for NGM flag
const postalCodes = ['3970', '3971', '3972', '3958', '3940', '3941', '3950', '3951', '3953', '3956', '3959', '3760', '3761', '3762', '3763', '3764', '3765', '3766', '3768', '3769', '3910', '3911',
  '3912', '3921', '3922', '3770', '3771', '3772', '3773', '3774', '3775', '3776', '3780', '3781', '3784', '3785', '3790', '3792', '3794', '3886', '4000', '4001', '4002', '4003', '4004', '4005', '4006',
  '4007', '4013', '4014', '4017', '4062', '4115', '4112', '4116', '4024', '4117', '4030', '4031', '4016', '4012', '4033', '4020', '4021', '4032', '4119', '4023', '4010', '4011', '4110', '4111', '6669',
  '4040', '4041', '4050', '4051', '4043', '4053', '4054', '4147', '4170', '4171', '4161', '4211', '4212', '4214', '4153', '4155', '4156', '4157', '4158', '4185', '4175', '4063', '4174', '4182', '4060',
  '4061', '4184', '4176', '4064', '4180', '4181', '4151', '4152', '4190', '4191', '4194', '4196', '4197', '6663', '6500', '6501', '6503', '6504', '6511', '6512', '6515', '6521', '6522', '6523', '6524',
  '6525', '6531', '6532', '6533', '6534', '6535', '6536', '6537', '6538', '6541', '6542', '6543', '6544', '6545', '6546', '6564', '6550', '6551', '6641', '6642', '6644', '6645', '6566', '6560', '6561',
  '6562', '6573', '6577', '6579', '6578', '6576', '6575', '6574', '6570', '6571', '6572', '6582', '6600', '6601', '6602', '6603', '6604', '6605', '6626', '6628', '6629', '6658', '6657', '6620', '6621',
  '6627', '6659', '6654', '6653', '6650', '6651', '6652', '6631', '6655', '6673', '6665', '3920', '6660', '6661', '6662', '6672', '6674', '6666', '6676', '6678', '6668', '6677', '6675', '6670', '6671',
  '6850', '6851', '6852', '6680', '6681', '6690', '6691', '6687', '6686', '6685', '6684', '6700', '6701', '6702', '6703', '6704', '6705', '6706', '6707', '6708', '6709', '6710', '6711', '6712', '6713',
  '6714', '6715', '6716', '6717', '6718', '6740', '6741', '6720', '6721', '6730', '6731', '6732', '6744', '6745', '6733', '7352', '6877', '6800', '6801', '6802', '6803', '6811', '6812', '6813', '6814',
  '6815', '6816', '6821', '6822', '6823', '6824', '6825', '6826', '6827', '6828', '6831', '6832', '6833', '6834', '6835', '6836', '6841', '6842', '6843', '6844', '6845', '6846', '6865', '6866', '6869',
  '6874', '6860', '6861', '6862', '6870', '6871', '6880', '6881', '6882', '6883', '6990', '6991', '6994', '6955', '6950', '6951', '6952', '6953', '6956', '6957', '6891', '6900', '6901', '6902', '6903',
  '6904', '6905', '6909', '6986', '6987', '6988', '6913', '6914', '6915', '6911', '6917', '6916', '6920', '6921', '6922', '6923', '6924', '6930', '6931', '6932', '6980', '6981', '6982', '6983', '6984',
  '5966', '5872', '5871', '5766', '5970', '5971', '5963', '5960', '5961', '5973', '5962', '5964', '5975', '5976', '5977', '5864', '5866', '5865', '5863', '5862', '5860', '5861', '5811', '5812', '5809',
  '5815', '5817', '5800', '5801', '5802', '5803', '5804', '5814', '5816', '5813', '5808', '5807', '5854', '5851', '5853', '5855', '5856', '6587', '6584', '6585', '6886', '6596', '6595', '6599', '6590',
  '6591', '6598', '5000', '5001', '5002', '5003', '5004', '5011', '5012', '5013', '5014', '5015', '5017', '5018', '5021', '5022', '5025', '5026', '5032', '5035', '5036', '5037', '5038', '5041', '5042',
  '5043', '5044', '5045', '5046', '5047', '5048', '5049', '5056', '5057', '5070', '5071', '5050', '5051', '5052', '5053', '5133', '5200', '5201', '5202', '5203', '5211', '5212', '5213', '5215', '5216',
  '5221', '5222', '5223', '5224', '5231', '5232', '5233', '5234', '5235', '5236', '5237', '5240', '5241', '5242', '5243', '5244', '5245', '5246', '5247', '5248', '5249', '5390', '5391', '5392', '5381',
  '5382', '5383', '5258', '5275', '5290', '5291', '5292', '5293', '5294', '5270', '5271', '5272', '5260', '5261', '5262', '5263', '5264', '5266', '5280', '5281', '5282', '5283', '5298', '5340', '5341',
  '5342', '5343', '5344', '5345', '5346', '5347', '5348', '5349', '5350', '5351', '5366', '5367', '5368', '9750', '5370', '5371', '5373', '5352', '5358', '5353', '5354', '5355', '5356', '5357', '5359',
  '5397', '5396', '5394', '5398', '5395', '5386', '5364', '5438', '5360', '5361', '5363', '5400', '5401', '5402', '5403', '5404', '5405', '5406', '5408', '5409', '5420', '5421', '5422', '5760', '5761',
  '5763', '5423', '5425', '5764', '5424', '5427', '5428', '5437', '5430', '5431', '5432', '5443', '5433', '5439', '5435', '5434', '5835', '5830', '5831', '5826', '5824', '5823', '5441', '5825', '5447',
  '5836', '5820', '5821', '5827', '5445', '5846', '5840', '5841', '5845', '5844', '5446', '5843', '5449', '5450', '5451', '5454', '5453', '5455', '5480', '5481', '5482', '5490', '5491', '5492', '5469',
  '5460', '5461', '5462', '5463', '5464', '5465', '5466', '5457', '5600', '5601', '5602', '5603', '5604', '5605', '5606', '5611', '5612', '5613', '5614', '5615', '5616', '5617', '5621', '5622', '5623',
  '5624', '5625', '5626', '5627', '5628', '5629', '5631', '5632', '5633', '5641', '5642', '5643', '5644', '5645', '5646', '5647', '5651', '5652', '5653', '5654', '5655', '5656', '5657', '5658', '5690',
  '5691', '5692', '5694', '5700', '5701', '5702', '5703', '5704', '5705', '5706', '5707', '5708', '5709', '5735', '5740', '5741', '5737', '5738', '5750', '5751', '5752', '5753', '5754', '5756', '5757',
  '5758', '5759']


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
  StudyEngine.if(
    StudyEngine.or(...postalCodes.map(postalCodes => StudyEngine.hasResponseKeyWithValue(T0_Invites.aEMInviteGroup.Contactgegevens.PC4contact.key, [responseGroupKey, inputKey].join('.'), postalCodes)),
      StudyEngine.singleChoice.any(T0_Invites.aEMInviteGroup.NijmegenReis.key, T0_Invites.aEMInviteGroup.NijmegenReis.optionKeys.yes)),
    StudyEngine.participantActions.updateFlag(ParticipantFlags.NMG.key, ParticipantFlags.NMG.values.true),
  ))


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
