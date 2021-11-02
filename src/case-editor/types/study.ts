import { SurveyDefinition } from "./surveyDefinition";

export interface Study {
    studyKey: string;
    outputFolderName?: string;
    surveys: SurveyDefinition[];
}