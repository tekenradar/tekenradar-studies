import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { LymeDiagnosis2 } from './questions/diagnosisTherapy';
import { LymeDiagnosis3, LymeDiagnosis4, LymeDiagnosis5, LymeDiagnosis6 } from './questions/lyme';
import {FeverFU1, FeverFU2, LymeFU, MedicationFU1, MedicationFU2, NewTB, PreviousTickBites3, ReportedTB2, SymptomsFU, Text1FU, Text2FU } from './questions/followup';
import { Symptoms1 } from './questions/standard';
import { SurveyEngine } from 'case-editor-tools/surveys';

class Followupflow_AdultsDef extends SurveyDefinition {

    T1: Text1FU;
    Q1: NewTB;
    Q2: ReportedTB2;
    Q3: PreviousTickBites3;
    Q4: FeverFU1;
    Q5: FeverFU2;
    T2: Text2FU;
    Q6: LymeFU;
    Q7: LymeDiagnosis2;
    Q8: LymeDiagnosis3;
    Q9: LymeDiagnosis4;
    Q10: LymeDiagnosis5;
    Q11: LymeDiagnosis6;
    Q12: MedicationFU1;
    Q13: MedicationFU2;
    Q14: Symptoms1;
    Q15: SymptomsFU;


    constructor(isRequired?: boolean) {
        super({
            surveyKey: 'Followupflow_Adults',
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

        this.T1 = new Text1FU(this.key, required);
        this.Q1 = new NewTB(this.key, required);
        const Q1condition = SurveyEngine.singleChoice.any(this.Q1.key, this.Q1.optionKeys.nameOfOption);
        this.Q2 = new ReportedTB2(this.key, required, Q1condition);
        const Q2condition = SurveyEngine.singleChoice.any(this.Q2.key, this.Q2.optionKeys.nameOfOption);
        const Q1_2condition = SurveyEngine.logic.and(Q1condition, Q2condition);
        this.Q3 = new PreviousTickBites3(this.key, required, Q1_2condition);

        //TODO: add 4 and 5 only for TB & EM flow at t=3months
        this.Q4 = new FeverFU1(this.key, required);
        const Q4condition = SurveyEngine.singleChoice.any(this.Q4.key, this.Q4.optionKeys.nameOfOption);
        this.Q5 = new FeverFU2(this.key, required, Q4condition);

        this.T2 = new Text2FU(this.key, required);
        this.Q6 = new LymeFU(this.key, required);
        const Q6condition = SurveyEngine.singleChoice.any(this.Q6.key, this.Q6.optionKeys.nameOfOption);
        this.Q7 = new LymeDiagnosis2(this.key, required, Q6condition);
        this.Q8 = new LymeDiagnosis3(this.key, required, Q6condition);
        this.Q9 = new LymeDiagnosis4(this.key, required, Q6condition);
        this.Q10 = new LymeDiagnosis5(this.key, required, Q6condition);
        this.Q11 = new LymeDiagnosis6(this.key, required, Q6condition);
        this.Q12 = new MedicationFU1(this.key, required, Q6condition);
        this.Q13 = new MedicationFU2(this.key, required, Q6condition);
        this.Q14 = new Symptoms1(this.key, required, Q6condition);
        this.Q15 = new SymptomsFU(this.key, required, Q6condition);

    }

    buildSurvey() {

        this.addItem(this.T1.get());
        this.addItem(this.Q1.get());
        this.addItem(this.Q2.get());
        this.addItem(this.Q3.get());
        this.addItem(this.Q4.get());
        this.addItem(this.Q5.get());

        this.addItem(this.T2.get());
        this.addItem(this.Q6.get());
        this.addItem(this.Q7.get());
        this.addItem(this.Q8.get());
        this.addItem(this.Q9.get());
        this.addItem(this.Q10.get());
        this.addItem(this.Q11.get());
        this.addItem(this.Q12.get());
        this.addItem(this.Q13.get());
        this.addItem(this.Q14.get());
        this.addItem(this.Q15.get());
        
    }
}

export const Followupflow_Adults = new Followupflow_AdultsDef();