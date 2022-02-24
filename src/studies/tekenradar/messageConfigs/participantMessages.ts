import { MessageConfig } from "case-editor-tools/types/messageConfig";
import { headerOverrides } from "./common";

export const participantMessages: MessageConfig = {
  sendTo: 'scheduled-participant-messages',
  messageType: 'study-reminder',
  condition: undefined,
  defaultLanguage: 'nl',
  label: 'Schedule for participant study messages',
  period: { days: 1 },
  sendingTime: { hour: 13, minute: 0 },
  translations: [],
  headerOverrides: headerOverrides,
}
