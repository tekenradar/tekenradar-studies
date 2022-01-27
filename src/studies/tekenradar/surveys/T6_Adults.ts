import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { LymeDiagnosis2 } from './questions/diagnosisTherapy';
import { LymeDiagnosis3, LymeDiagnosis4, LymeDiagnosis5, LymeDiagnosis6 } from './questions/lyme';
import { FeverFU1, FeverFU2, LymeFU, MedicationFU1, MedicationFU2, NewTB, PreviousTickBites3, ReportedTB2, SymptomsFU, Text1FU, Text2FU } from './questions/followup';
import { Cognition, Fatigue, Functioning1, Functioning2, Functioning3, Functioning4, Functioning5, FunctioningText, MedCare1, MedCare2, MedCareText1, MedCareText2, MedCareText3, Pregnant, Symptoms1, Symptoms2, Symptoms3 } from './questions/standard';
import { SurveyEngine } from 'case-editor-tools/surveys';

class T6_AdultsDef extends SurveyDefinition {

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
  Q14: Symptoms2;
  Q15: Symptoms3;
  Q16: Pregnant;
  T3: FunctioningText;
  Q17: Functioning1;
  Q18: Functioning2;
  Q19: Functioning3;
  Q20: Functioning4;
  Q21: Functioning5;
  Q22: Fatigue;
  Q23: Cognition;
  T4: MedCareText1;
  Q24: MedCare1;
  T5: MedCareText2;
  Q25: MedCare2;
  T6: MedCareText3;
  Q26: Symptoms1;
  Q27: SymptomsFU;


  constructor(isRequired?: boolean) {
    super({
      surveyKey: 'Followupflow_Adults',
      name: new Map([
        ['nl', 'Vervolgvragenlijst']
      ]),
      description: new Map([
        ['nl', 'Klik hier om naar de vragenlijst te gaan']
      ]),
      durationText: new Map([
        ['nl', 'Invullen duurt ongeveer 10-20 minuten.']
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
    this.Q12 = new MedicationFU1(this.key, required);
    //TODO: I think this is not very elegant. Ask Peter how to do this in a better way (without hardcoding response key)
    const Q12number = SurveyEngine.getResponseValueAsNum(this.Q12.key, 'rg.scg.b.2');

    this.Q13 = new MedicationFU2(this.key, required, Q12number);
    this.Q14 = new Symptoms2(this.key, required);
    this.Q15 = new Symptoms3(this.key, required);
    this.Q16 = new Pregnant(this.key, required);
    this.T3 = new FunctioningText(this.key, required);
    this.Q17 = new Functioning1(this.key, required);
    this.Q18 = new Functioning2(this.key, required);
    this.Q19 = new Functioning3(this.key, required);
    this.Q20 = new Functioning4(this.key, required);
    this.Q21 = new Functioning5(this.key, required);
    this.Q22 = new Fatigue(this.key, required);
    this.Q23 = new Cognition(this.key, required);

    this.T4 = new MedCareText1(this.key, required);
    this.Q24 = new MedCare1(this.key, required);
    const Q24number = SurveyEngine.getResponseValueAsNum(this.Q24.key, 'rg.scg.a');
    this.T5 = new MedCareText2(this.key, required);
    this.Q25 = new MedCare2(this.key, required, Q24number);
    this.T6 = new MedCareText3(this.key, required, Q24number);

    this.Q26 = new Symptoms1(this.key, required);
    this.Q27 = new SymptomsFU(this.key, required);

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
    this.addItem(this.Q16.get());
    this.addItem(this.T3.get());
    this.addItem(this.Q17.get());
    this.addItem(this.Q18.get());
    this.addItem(this.Q19.get());
    this.addItem(this.Q20.get());
    this.addItem(this.Q21.get());
    this.addItem(this.Q22.get());
    this.addItem(this.Q23.get());
    this.addItem(this.T4.get());
    this.addItem(this.Q24.get());
    this.addItem(this.T5.get());
    this.addItem(this.Q25.get());
    this.addItem(this.T6.get());
    this.addItem(this.Q26.get());
    this.addItem(this.Q27.get());

  }
}

export const T6_Adults = new T6_AdultsDef();
