import { Study } from "case-editor-tools/types/study";
import { T0 } from "./surveys/T0";
import { PDiff } from "./surveys/PDiff";
import { EMflow_Adults } from "./surveys/EMflow_Adults";
import { TBflow_Adults } from "./surveys/TBflow_Adults";
import { LBflow_Adults } from "./surveys/LBflow_Adults";
import { Chronicflow_Adults } from "./surveys/Chronicflow_Adults";
import { Feverflow_Adults } from "./surveys/Feverflow_Adults";
import { Followupflow_Adults } from "./surveys/Followupflow_Adults";
import { Standardflow_Adults } from "./surveys/Standardflow_Adults";
import { studyRules } from "./rules";
import { ExampleSurvey } from "./surveys/ExampleSurvey";
import { addExampleReminderMessage } from "./customRules/exampleReminder";
import { TBflow_Kids } from "./surveys/TBflow_Kids";
import { Chronicflow_Kids } from "./surveys/Chronicflow_Kids";
import { EMflow_Kids } from "./surveys/EMflow_Kids";
import { LBflow_Kids } from "./surveys/LBflow_Kids";

export const TekenradarStudy: Study = {
  studyKey: 'default',
  outputFolderName: 'tekenradar',
  studyRules: studyRules,
  surveys: [
    PDiff, TBflow_Adults, EMflow_Adults, LBflow_Adults, Chronicflow_Adults, Feverflow_Adults, Followupflow_Adults, Standardflow_Adults,
    ExampleSurvey, TBflow_Kids, EMflow_Kids, LBflow_Kids, Chronicflow_Kids
  ],
  customStudyRules: [
    addExampleReminderMessage
  ]
}
