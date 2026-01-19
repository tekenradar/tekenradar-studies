import { Study } from "case-editor-tools/types/study";
import { studyRules } from "./studyRules";
import { changeFollowupTimingToNow } from "./customRules/changeFollowupTiming";
import { participantMessages } from "./messageConfigs/participantMessages";
import { weeklyTBMessage } from "./messageConfigs/weeklyTBMessage";
import { researcherNotificationMessages } from "./messageConfigs/researcherNotifications";
import { assignDeleteContactDataSurvey } from "./customRules/assignDeleteContactDataSurvey";
import { removeConfidentialData } from "./customRules/removeConfidentialData";


export const TekenradarStudy: Study = {
  studyKey: 'tekenradar',
  studyRules: studyRules,
  surveys: [],
  customStudyRules: [
    changeFollowupTimingToNow,
    assignDeleteContactDataSurvey,
    removeConfidentialData,
  ],
  messageConfigs: [
    participantMessages,
    researcherNotificationMessages,
    weeklyTBMessage,
  ]
}
