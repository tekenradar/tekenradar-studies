import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { LymeDiagnosis2 } from './questions/diagnosisTherapy';
import { LymeDiagnosis3, LymeDiagnosis4, LymeDiagnosis5, LymeDiagnosis6 } from './questions/lyme';
import {FeverFU1, FeverFU2, LymeFU, MedicationFU1, MedicationFU2, NewTB, PreviousTickBites3, ReportedTB2, Text1FU, Text2FU } from './questions/followup';
import { Qualification, Symptoms1, Symptoms2, Symptoms3, Tekenradar, Text1Standard } from './questions/standard';
import { Residence, Gender } from './questions/demographie';



class Standardflow_AdultsDef extends SurveyDefinition {

    Q1: Tekenradar;
    T1: Text1Standard;
    Q2: Qualification;
    Q3: Residence;
    Q4: Gender;
    Q5: Symptoms1;
    Q6: Symptoms2;
    Q7: Symptoms3;


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
        this.T1 = new Text1Standard(this.key, required);
        this.Q2 = new Qualification(this.key, required);
        this.Q3 = new Residence(this.key, required);
        this.Q4 = new Gender(this.key, required);
        this.Q5 = new Symptoms1(this.key, required);
        this.Q6 = new Symptoms2(this.key, required);
        this.Q7 = new Symptoms3(this.key, required);



    }

    buildSurvey() {

        this.addItem(this.Q1.get());
        this.addItem(this.T1.get());
        this.addItem(this.Q2.get());
        this.addItem(this.Q3.get());
        this.addItem(this.Q4.get());
        this.addItem(this.Q5.get());
        this.addItem(this.Q6.get());
        this.addItem(this.Q7.get());

    }
}

export const Standardflow_Adults = new Standardflow_AdultsDef();