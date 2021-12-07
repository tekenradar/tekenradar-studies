import { Study } from "case-editor-tools/types/study";
import { T0 } from "./surveys/T0";
import { Adults } from "./surveys/Adults";

export const TekenradarStudy: Study = {
    studyKey: 'tekenradar',
    surveys: [
        T0, Adults
    ]
}
