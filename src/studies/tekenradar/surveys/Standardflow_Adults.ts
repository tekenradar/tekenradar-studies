import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { LymeDiagnosis2 } from './questions/diagnosisTherapy';
import { LymeDiagnosis3, LymeDiagnosis4, LymeDiagnosis5, LymeDiagnosis6 } from './questions/lyme';
import {FeverFU1, FeverFU2, LymeFU, MedicationFU1, MedicationFU2, NewTB, PreviousTickBites3, ReportedTB2, SymptomsFU1, SymptomsFU2, Text1FU, Text2FU } from './questions/followup';
import { Tekenradar } from './questions/standard';


class Standardflow_AdultsDef extends SurveyDefinition {

    Q1: Tekenradar;


    constructor(isRequired?: boolean) {
        super({
            surveyKey: 'Standardflow_Adults',
            name: new Map([
                ['en', 'Test']
            ]),
            description: new Map([
                ['en', 'Test']
            ]),
            durationText: new Map([
                ['en', 'Test']
            ]),
        });


        const required = isRequired !== undefined ? isRequired : false;
        this.Q1 = new Tekenradar(this.key, required);


    }

    buildSurvey() {

        this.addItem(this.Q1.get());

      
    }
}

export const Standardflow_Adults = new Standardflow_AdultsDef();