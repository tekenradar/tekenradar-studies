import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { MessageConfig } from "case-editor-tools/types/messageConfig";
import { headerOverrides } from "./common";

export const researcherNotificationMessages: MessageConfig = {
  sendTo: 'researcher-notifications',
  messageType: 'researcher-notifications',
  condition: StudyEngine.gt(2, 1),
  defaultLanguage: 'nl',
  label: 'Researcher notification messages',
  period: { hours: 1 },
  sendingTime: { hour: 17, minute: 0 },
  translations: [],
  headerOverrides: headerOverrides,
}
