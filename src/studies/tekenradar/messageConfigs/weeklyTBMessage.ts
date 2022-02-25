import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { MessageConfig } from "case-editor-tools/types/messageConfig";
import { ParticipantFlags } from "../participantFlags";
import { headerOverrides } from "./common";

export const weeklyTBMessage: MessageConfig = {
  sendTo: 'study-participants',
  messageType: 'study-reminder',
  condition: StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.weeklyTBreporter.key, ParticipantFlags.weeklyTBreporter.values.true), // is part of weekly cohort
  defaultLanguage: 'nl',
  label: 'Reminder message for weekly TB reporter cohort',
  period: { days: 7 },
  sendingTime: { hour: 1, minute: 0 },
  translations: [{
    lang: 'nl',
    subject: 'De wekelijkse Tekenradarvragenlijst staat voor je klaar'
  }],
  headerOverrides: headerOverrides,
}
