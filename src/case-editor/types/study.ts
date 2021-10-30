import { SurveyDefinition } from "./surveyDefinition";

export interface Study {
    studyKey: string;
    surveys: SurveyDefinition[];
}