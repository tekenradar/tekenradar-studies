import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { MessageConfig } from "case-editor-tools/types/messageConfig";
import { ParticipantFlags } from "../participantFlags";
import { surveyKeys } from "../surveys/globalConstants";
import { headerOverrides } from "./common";

export const weeklyTBMessage: MessageConfig = {
  sendTo: 'study-participants',
  messageType: 'weekly',
  condition: StudyEngine.and(
    StudyEngine.or(
      // is part of weekly cohort
      StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.weeklyTBreporter.key, ParticipantFlags.weeklyTBreporter.values.true),
      StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.weeklyTBreporter.key, ParticipantFlags.weeklyTBreporter.values.init),
    ),
    StudyEngine.participantState.lastSubmissionDateOlderThan(StudyEngine.timestampWithOffset({ days: -1 }), surveyKeys.WeeklyTB)
  ),
  defaultLanguage: 'nl',
  label: 'Reminder message for weekly TB reporter cohort',
  period: { days: 1 },
  sendingTime: { hour: 1, minute: 0 },
  translations: [{
    lang: 'nl',
    subject: 'De wekelijkse Tekenradar vragenlijst staat voor je klaar'
  }],
  headerOverrides: headerOverrides,
}
