import { Expression } from "survey-engine/lib/data_types";
import { StudyRules } from "./studyRules";
import { SurveyDefinition } from "./surveyDefinition";

export interface Study {
    studyKey: string;
    outputFolderName?: string;
    surveys: SurveyDefinition[];

    // normal study rules
    studyRules?: StudyRules;

    customStudyRules?: Array<{
        name: string;
        rules: Expression[];
    }>;
}