import { Study } from "../../case-editor/types/study";
import { studyRules } from "./rules";

export const InfectieradarStudy: Study = {
    studyKey: 'default',
    outputFolderName: 'infectieradar',
    surveys: [],
    studyRules: studyRules,
}