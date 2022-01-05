import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";

export const addExampleReminderMessage = {
  name: 'addExampleReminderMessage',
  rules: [
    StudyEngine.participantActions.messages.removeAll(),
    StudyEngine.participantActions.messages.add("reminderExample", StudyEngine.timestampWithOffset({ minutes: -20 })),
    StudyEngine.participantActions.messages.add("reminderExample", StudyEngine.timestampWithOffset({ minutes: 20 })),
  ]
}
