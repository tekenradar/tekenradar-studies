import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { LymeDiagnosis2 } from './questions/diagnosisTherapy';
import { LymeDiagnosis3, LymeDiagnosis4, LymeDiagnosis5, LymeDiagnosis6 } from './questions/lyme';
import {FeverFU1, FeverFU2, LymeFU, MedicationFU1, MedicationFU2, NewTB, PreviousTickBites3, ReportedTB2, Text1FU, Text2FU } from './questions/followup';
import { Fatigue, Functioning1, Functioning2, Functioning3, FunctioningText, Pregnant, Qualification, Symptoms1, Symptoms2, Symptoms3, Tekenradar, Text1Standard } from './questions/standard';
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
    Q8: Pregnant;
    T2: FunctioningText;
    Q9: Functioning1;
    Q10: Functioning2;
    Q11: Functioning3;
    Q14: Fatigue;


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
        this.Q8 = new Pregnant(this.key, required);
        this.T2 = new FunctioningText(this.key, required);
        this.Q9 = new Functioning1(this.key, required);
        this.Q10 = new Functioning2(this.key, required);
        this.Q11 = new Functioning3(this.key, required);
        this.Q14 = new Fatigue(this.key, required);


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
        this.addItem(this.Q8.get());
        this.addItem(this.T2.get());
        this.addItem(this.Q9.get());
        this.addItem(this.Q10.get());
        this.addItem(this.Q11.get());
        this.addItem(this.Q14.get());
    }
}

export const Standardflow_Adults = new Standardflow_AdultsDef();