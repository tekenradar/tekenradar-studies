import { Study } from "case-editor-tools/types/study";
import { PDiff } from "./surveys/PDiff";
import { EMflow_Adults } from "./surveys/EMflow_Adults";
import { TBflow_Adults } from "./surveys/TBflow_Adults";
import { LBflow_Adults } from "./surveys/LBflow_Adults";
import { Chronicflow_Adults } from "./surveys/Chronicflow_Adults";
import { Feverflow_Adults } from "./surveys/Feverflow_Adults";
import { Standardflow_Adults } from "./surveys/Standardflow_Adults";
import { studyRules } from "./studyRules";
import { TBflow_Kids } from "./surveys/TBflow_Kids";
import { Chronicflow_Kids } from "./surveys/Chronicflow_Kids";
import { EMflow_Kids } from "./surveys/EMflow_Kids";
import { LBflow_Kids } from "./surveys/LBflow_Kids";
import { Standardflow_Kids } from "./surveys/Standardflow_Kids";
import { WeeklyTB } from "./surveys/WeeklyTB";
import { EMfoto } from "./surveys/EMfoto";
import { T3_Adults } from "./surveys/T3_Adults";
import { T6_Adults } from "./surveys/T6_Adults";
import { T9_Adults } from "./surveys/T9_Adults";
import { T12_Adults } from "./surveys/T12_Adults";
import { T3_Kids } from "./surveys/T3_Kids";
import { T6_Kids } from "./surveys/T6_Kids";
import { T9_Kids } from "./surveys/T9_Kids";
import { T12_Kids } from "./surveys/T12_Kids";
import { changeFollowupTimingToNow } from "./customRules/changeFollowupTiming";
import { T0_Invites } from "./surveys/T0_Invites";
import { participantMessages } from "./messageConfigs/participantMessages";
import { weeklyTBMessage } from "./messageConfigs/weeklyTBMessage";
import { QuitFollowUp } from "./surveys/QuitFollowUp";
import { QuitWeeklyTB } from "./surveys/QuitWeekly";
import { DeleteContactData } from "./surveys/DeleteContactData";
import { researcherNotificationMessages } from "./messageConfigs/researcherNotifications";
import { WorkshopEntry } from "./surveys/WorkshopEntry";
import { WorkshopFU1a } from "./surveys/WorkshopFU1a";
import { WorkshopFU1b } from "./surveys/WorkshopFU1b";

export const TekenradarStudy: Study = {
  studyKey: 'tekenradar',
  studyRules: studyRules,
  surveys: [
    PDiff,
    TBflow_Adults, EMflow_Adults, LBflow_Adults, Chronicflow_Adults, Feverflow_Adults, TBflow_Kids, EMflow_Kids, LBflow_Kids, Chronicflow_Kids,
    T0_Invites,
    Standardflow_Kids, Standardflow_Adults,
    T3_Adults, T6_Adults, T9_Adults, T12_Adults,
    T3_Kids, T6_Kids, T9_Kids, T12_Kids,
    WeeklyTB, EMfoto,
    QuitFollowUp, QuitWeeklyTB, DeleteContactData,
    WorkshopEntry, WorkshopFU1a, WorkshopFU1b,
  ],
  customStudyRules: [
    changeFollowupTimingToNow,
  ],
  messageConfigs: [
    participantMessages,
    researcherNotificationMessages,
    weeklyTBMessage,
  ]
}
