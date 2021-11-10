import { Study } from "case-editor-tools/types/study";
import { T0 } from "./surveys/T0";
import { TB_adults } from "./surveys/TB_adults";

export const TekenradarStudy: Study = {
    studyKey: 'tekenradar',
    surveys: [
        T0, TB_adults
    ]
}
