import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { MessageConfig } from "case-editor-tools/types/messageConfig";
import { headerOverrides } from "./common";

export const participantMessages: MessageConfig = {
  sendTo: 'scheduled-participant-messages',
  messageType: 'study-reminder',
  condition: StudyEngine.gt(2, 1),
  defaultLanguage: 'nl',
  label: 'Schedule for participant study messages',
  period: { days: 1 },
  sendingTime: { hour: 2, minute: 0 },
  translations: [],
  headerOverrides: headerOverrides,
}
