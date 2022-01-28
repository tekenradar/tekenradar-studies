import { StudyRules } from "case-editor-tools/types/studyRules";
import { Expression } from "survey-engine/data_types";
import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { PDiff } from "./surveys/PDiff";
import { TBflow_Adults } from "./surveys/TBflow_Adults";
import { Standardflow_Adults } from "./surveys/Standardflow_Adults";
import {
  handleExpired_removeSurvey, handlePDiffRuleFor_Chronicflow, handlePDiffRuleFor_EMflow, handlePDiffRuleFor_FEflow,
  handlePDiffRuleFor_LBflow, handlePDiffRuleFor_TBflow, handlePDiffRuleFor_WeeklyTB,
  initFollowUpFlow_Adults,
  initFollowUpFlow_Kids,
  isLoggedIn,
  isSurveyExpired, removeFollowUpMessagesForSurvey, updateAgeFlags
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
import { ExitFollowUp } from "./surveys/ExitFollowUp";
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

const reports = {
  FollowUpReport: {
    key: 'followUp',
  },
  TBReport: {
    key: 'TB'
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
  updateAgeFlags(),
  handlePDiffRuleFor_TBflow(),
  handlePDiffRuleFor_EMflow(),
  handlePDiffRuleFor_FEflow(),
  handlePDiffRuleFor_LBflow(),
  handlePDiffRuleFor_Chronicflow(),
  handlePDiffRuleFor_WeeklyTB(),
)

const assignStandardFlow = (version: 'adults' | 'kids') => StudyEngine.do(
  StudyEngine.participantActions.assignedSurveys.add(version === 'adults' ? Standardflow_Adults.key : Standardflow_Kids.key, 'immediate'),
  StudyEngine.participantActions.messages.add(emailKeys.StandardflowReminder, StudyEngine.timestampWithOffset({ hours: 24 })),
);

const handleSubmit_TBflow_Adults = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(TBflow_Adults.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(TBflow_Adults.key, 'all'),
  StudyEngine.participantActions.messages.remove(emailKeys.FlowReminder),
  StudyEngine.ifThen(
    StudyEngine.and(
      isLoggedIn(),
      StudyEngine.not(
        StudyEngine.participantState.hasParticipantFlagKeyAndValue(
          ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.active
        ),
      )
    ),
    // Then:
    assignStandardFlow('adults'),
    StudyEngine.ifThen(
      StudyEngine.participantState.hasSurveyKeyAssigned(WeeklyTB.key),
      // Then: remove weekly and add again to the end of the list
      StudyEngine.participantActions.assignedSurveys.remove(WeeklyTB.key, 'all'),
      StudyEngine.participantActions.assignedSurveys.add(WeeklyTB.key, 'immediate'),
    )
  ),
  StudyEngine.participantActions.reports.init(reports.TBReport.key)
  // TODO: add report details
)


const handleSubmit_TBflow_Kids = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(TBflow_Kids.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(TBflow_Kids.key, 'all'),
  StudyEngine.participantActions.messages.remove(emailKeys.FlowReminder),
  StudyEngine.ifThen(
    StudyEngine.and(
      isLoggedIn(),
      StudyEngine.not(
        StudyEngine.participantState.hasParticipantFlagKeyAndValue(
          ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.active
        ),
      )
    ),
    // Then:
    assignStandardFlow('kids'),
    StudyEngine.ifThen(
      StudyEngine.participantState.hasSurveyKeyAssigned(WeeklyTB.key),
      // Then: remove weekly and add again to the end of the list
      StudyEngine.participantActions.assignedSurveys.remove(WeeklyTB.key, 'all'),
      StudyEngine.participantActions.assignedSurveys.add(WeeklyTB.key, 'immediate'),
    )
  ),
  StudyEngine.participantActions.reports.init(reports.TBReport.key)
  // TODO: add report details
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
  StudyEngine.ifThen(
    StudyEngine.not(
      StudyEngine.participantState.hasParticipantFlagKeyAndValue(
        ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.active
      ),
    ),
    // Then:
    assignStandardFlow('adults'),
  ),
  assignEMfotoSurvey(),
  StudyEngine.ifThen(
    StudyEngine.participantState.hasSurveyKeyAssigned(WeeklyTB.key),
    // Then: remove weekly and add again to the end of the list
    StudyEngine.participantActions.assignedSurveys.remove(WeeklyTB.key, 'all'),
    StudyEngine.participantActions.assignedSurveys.add(WeeklyTB.key, 'immediate'),
  ),
  StudyEngine.participantActions.reports.init(reports.EMReport.key)
);


const handleSubmit_EMflow_Kids = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(EMflow_Kids.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(EMflow_Kids.key, 'all'),
  StudyEngine.participantActions.messages.remove(emailKeys.FlowReminder),
  StudyEngine.ifThen(
    StudyEngine.not(
      StudyEngine.participantState.hasParticipantFlagKeyAndValue(
        ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.active
      ),
    ),
    // Then:
    assignStandardFlow('kids'),
  ),
  assignEMfotoSurvey(),
  StudyEngine.ifThen(
    StudyEngine.participantState.hasSurveyKeyAssigned(WeeklyTB.key),
    // Then: remove weekly and add again to the end of the list
    StudyEngine.participantActions.assignedSurveys.remove(WeeklyTB.key, 'all'),
    StudyEngine.participantActions.assignedSurveys.add(WeeklyTB.key, 'immediate'),
  ),
  StudyEngine.participantActions.reports.init(reports.EMReport.key)
);

const handleSubmit_Feverflow_Adults = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(Feverflow_Adults.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(Feverflow_Adults.key, 'all'),
  StudyEngine.participantActions.messages.remove(emailKeys.FlowReminder),
  StudyEngine.ifThen(
    StudyEngine.not(
      StudyEngine.participantState.hasParticipantFlagKeyAndValue(
        ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.active
      ),
    ),
    // Then:
    assignStandardFlow('adults'),
  ),
  StudyEngine.ifThen(
    StudyEngine.participantState.hasSurveyKeyAssigned(WeeklyTB.key),
    // Then: remove weekly and add again to the end of the list
    StudyEngine.participantActions.assignedSurveys.remove(WeeklyTB.key, 'all'),
    StudyEngine.participantActions.assignedSurveys.add(WeeklyTB.key, 'immediate'),
  ),
  StudyEngine.participantActions.reports.init(reports.FeverReport.key)
);

const handleSubmit_LBflow_Adults = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(LBflow_Adults.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(LBflow_Adults.key, 'all'),
  StudyEngine.participantActions.messages.remove(emailKeys.FlowReminder),
  StudyEngine.ifThen(
    StudyEngine.not(
      StudyEngine.participantState.hasParticipantFlagKeyAndValue(
        ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.active
      ),
    ),
    // Then:
    assignStandardFlow('adults'),
  ),
  assignEMfotoSurvey(),
  StudyEngine.ifThen(
    StudyEngine.participantState.hasSurveyKeyAssigned(WeeklyTB.key),
    // Then: remove weekly and add again to the end of the list
    StudyEngine.participantActions.assignedSurveys.remove(WeeklyTB.key, 'all'),
    StudyEngine.participantActions.assignedSurveys.add(WeeklyTB.key, 'immediate'),
  ),
  StudyEngine.participantActions.reports.init(reports.LBReport.key)
);


const handleSubmit_LBflow_Kids = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(LBflow_Kids.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(LBflow_Kids.key, 'all'),
  StudyEngine.participantActions.messages.remove(emailKeys.FlowReminder),
  StudyEngine.ifThen(
    StudyEngine.not(
      StudyEngine.participantState.hasParticipantFlagKeyAndValue(
        ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.active
      ),
    ),
    // Then:
    assignStandardFlow('kids'),
  ),
  assignEMfotoSurvey(),
  StudyEngine.ifThen(
    StudyEngine.participantState.hasSurveyKeyAssigned(WeeklyTB.key),
    // Then: remove weekly and add again to the end of the list
    StudyEngine.participantActions.assignedSurveys.remove(WeeklyTB.key, 'all'),
    StudyEngine.participantActions.assignedSurveys.add(WeeklyTB.key, 'immediate'),
  ),
  StudyEngine.participantActions.reports.init(reports.LBReport.key)
);


const handleSubmit_Chronicflow_Adults = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(Chronicflow_Adults.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(Chronicflow_Adults.key, 'all'),
  StudyEngine.participantActions.messages.remove(emailKeys.FlowReminder),
  StudyEngine.ifThen(
    StudyEngine.not(
      StudyEngine.participantState.hasParticipantFlagKeyAndValue(
        ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.active
      ),
    ),
    // Then:
    assignStandardFlow('adults'),
  ),
  StudyEngine.ifThen(
    StudyEngine.participantState.hasSurveyKeyAssigned(WeeklyTB.key),
    // Then: remove weekly and add again to the end of the list
    StudyEngine.participantActions.assignedSurveys.remove(WeeklyTB.key, 'all'),
    StudyEngine.participantActions.assignedSurveys.add(WeeklyTB.key, 'immediate'),
  ),
  StudyEngine.participantActions.reports.init(reports.ChronicReport.key)
);


const handleSubmit_Chronicflow_Kids = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(Chronicflow_Kids.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(Chronicflow_Kids.key, 'all'),
  StudyEngine.participantActions.messages.remove(emailKeys.FlowReminder),
  StudyEngine.ifThen(
    StudyEngine.not(
      StudyEngine.participantState.hasParticipantFlagKeyAndValue(
        ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.active
      ),
    ),
    // Then:
    assignStandardFlow('kids'),
  ),
  StudyEngine.ifThen(
    StudyEngine.participantState.hasSurveyKeyAssigned(WeeklyTB.key),
    // Then: remove weekly and add again to the end of the list
    StudyEngine.participantActions.assignedSurveys.remove(WeeklyTB.key, 'all'),
    StudyEngine.participantActions.assignedSurveys.add(WeeklyTB.key, 'immediate'),
  ),
  StudyEngine.participantActions.reports.init(reports.ChronicReport.key)
);

const handleSubmit_Standardflow_Adults = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(Standardflow_Adults.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(Standardflow_Adults.key, 'all'),
  StudyEngine.participantActions.messages.remove(emailKeys.StandardflowReminder),
  StudyEngine.ifThen(
    StudyEngine.or(
      StudyEngine.not(StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.flow.key, ParticipantFlags.flow.values.TBflow)),
      // TODO: if TB and willing to participate: StudyEngine.singleChoice.any(Standardflow_Adults.Q1.key, Standardflow_Adults.Q1.)
    ),
    initFollowUpFlow_Adults(),
    StudyEngine.participantActions.updateFlag(ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.active)
  )
);

const handleSubmit_Standardflow_Kids = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(Standardflow_Kids.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(Standardflow_Kids.key, 'all'),
  StudyEngine.participantActions.messages.remove(emailKeys.StandardflowReminder),
  StudyEngine.ifThen(
    StudyEngine.or(
      StudyEngine.not(StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.flow.key, ParticipantFlags.flow.values.TBflow)),
      // TODO: if TB and willing to participate: StudyEngine.singleChoice.any(Standardflow_Adults.Q1.key, Standardflow_Adults.Q1.)
    ),
    initFollowUpFlow_Kids(),
    StudyEngine.participantActions.updateFlag(ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.active)
  )
);

const handleSubmit_WeeklyTB = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(WeeklyTB.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(WeeklyTB.key, 'all'),
  StudyEngine.participantActions.assignedSurveys.add(WeeklyTB.key, 'normal', StudyEngine.timestampWithOffset({ hours: 1 })),
);

const handleSubmit_Emfoto = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(EMfoto.key),
  // Then:
  StudyEngine.ifThen(
    // TODO: check condition to make sure photo was uploaded, only then remove:
    StudyEngine.hasResponseKey(EMfoto.Q1.key, 'rg'),
    // Then:
    StudyEngine.participantActions.assignedSurveys.remove(EMfoto.key, 'all'),
    StudyEngine.participantActions.messages.remove(emailKeys.EMfotoReminder),
  )
);


// -----------------------------------------------
const handleSubmit_T3_Adults = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(T3_Adults.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(T3_Adults.key, 'all'),
  StudyEngine.participantActions.reports.init(reports.FollowUpReport.key),
  removeFollowUpMessagesForSurvey(T3_Adults.key)
);

const handleSubmit_T6_Adults = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(T6_Adults.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(T6_Adults.key, 'all'),
  StudyEngine.participantActions.reports.init(reports.FollowUpReport.key),
  removeFollowUpMessagesForSurvey(T6_Adults.key)
);

const handleSubmit_T9_Adults = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(T9_Adults.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(T9_Adults.key, 'all'),
  StudyEngine.participantActions.reports.init(reports.FollowUpReport.key),
  removeFollowUpMessagesForSurvey(T9_Adults.key)
);

const handleSubmit_T12_Adults = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(T12_Adults.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(T12_Adults.key, 'all'),
  StudyEngine.participantActions.reports.init(reports.FollowUpReport.key),
  StudyEngine.participantActions.updateFlag(ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.finished),
  removeFollowUpMessagesForSurvey(T12_Adults.key)
);

const handleSubmit_T3_Kids = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(T3_Kids.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(T3_Kids.key, 'all'),
  StudyEngine.participantActions.reports.init(reports.FollowUpReport.key),
  removeFollowUpMessagesForSurvey(T3_Kids.key)
);

const handleSubmit_T6_Kids = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(T6_Kids.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(T6_Kids.key, 'all'),
  StudyEngine.participantActions.reports.init(reports.FollowUpReport.key),
  removeFollowUpMessagesForSurvey(T6_Kids.key)
);

const handleSubmit_T9_Kids = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(T9_Kids.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(T9_Kids.key, 'all'),
  StudyEngine.participantActions.reports.init(reports.FollowUpReport.key),
  removeFollowUpMessagesForSurvey(T9_Kids.key)
);

const handleSubmit_T12_Kids = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(T12_Kids.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(T12_Kids.key, 'all'),
  StudyEngine.participantActions.reports.init(reports.FollowUpReport.key),
  StudyEngine.participantActions.updateFlag(ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.finished),
  removeFollowUpMessagesForSurvey(T12_Kids.key)
);

const handleSubmit_ExitFollowUp = StudyEngine.ifThen(
  // If:
  StudyEngine.checkSurveyResponseKey(ExitFollowUp.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(ExitFollowUp.key, 'all'),
  // TODO: depending on questions remove follow up surveys (e.g., kids or adults)
  // TODO: remove all messages scheduled
  // TODO: set follow up flag to finished
);


// -----------------------------------------------
const handleExpired_T12_Adults = StudyEngine.ifThen(
  isSurveyExpired(T12_Adults.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(T12_Adults.key, 'all'),
  StudyEngine.participantActions.assignedSurveys.remove(ExitFollowUp.key, 'all'),
  StudyEngine.participantActions.updateFlag(ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.finished)
)

const handleExpired_T12_Kids = StudyEngine.ifThen(
  isSurveyExpired(T12_Kids.key),
  // Then:
  StudyEngine.participantActions.assignedSurveys.remove(T12_Kids.key, 'all'),
  StudyEngine.participantActions.assignedSurveys.remove(ExitFollowUp.key, 'all'),
  StudyEngine.participantActions.updateFlag(ParticipantFlags.followUp.key, ParticipantFlags.followUp.values.finished)
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
  handleSubmit_ExitFollowUp,
]


/**
 * TIMER RULE LIST
 */
const timerRules: Expression[] = [
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
  // handle update flow rule
  // handle follow up rule
  // handle weekly flow rule
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
