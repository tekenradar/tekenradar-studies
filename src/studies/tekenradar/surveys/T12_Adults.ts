import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { LymeDiagnosis2 } from './questions/diagnosisTherapy';
import { LymeDiagnosis3, LymeDiagnosis4, LymeDiagnosis5, LymeDiagnosis6 } from './questions/lyme';
import { LymeFU, MedicationFU1, MedicationFU2, MedicationHeader, NewTB, PreviousTickBites3, ReportedTB2, SymptomsFU, Text1FU, Text2FU } from './questions/followup';
import { Cognition, CognitionHeader, Fatigue, FatigueHeader, Functioning1, Functioning2, Functioning3, Functioning4, Functioning5, FunctioningText, GenHealthHeader, Pregnant, PHQ_15, SF36, SymptomsHeader } from './questions/standard';
import { SurveyEngine } from 'case-editor-tools/surveys';
import { ParticipantFlags } from '../participantFlags';
import { applyRequiredQuestions, surveyKeys } from './globalConstants';
import { SurveyEndGroup } from './questions/surveyEnd';
import { TicP_Comorbidity, TicP_Group } from './questions/ticp';

class T12_AdultsDef extends SurveyDefinition {

  T1: Text1FU;
  Q1: NewTB;
  Q2: ReportedTB2;
  Q3: PreviousTickBites3;

  T2: Text2FU;
  Q6: LymeFU;
  Q7: LymeDiagnosis2;
  Q8: LymeDiagnosis3;
  Q9: LymeDiagnosis4;
  Q10: LymeDiagnosis5;
  Q11: LymeDiagnosis6;
  H1: MedicationHeader;
  Q12: MedicationFU1;
  Q13: MedicationFU2;
  H2: SymptomsHeader;
  PHQ_15: PHQ_15;
  SF36: SF36;
  Q16: Pregnant;
  T3: FunctioningText;
  Q17: Functioning1;
  Q18: Functioning2;
  Q19: Functioning3;
  Q20: Functioning4;
  Q21: Functioning5;
  H3: FatigueHeader;
  Q22: Fatigue;
  H4: CognitionHeader;
  Q23: Cognition;

  TicP: TicP_Group;

  H5: GenHealthHeader;
  TicP_Comorbidity: TicP_Comorbidity;
  Q27: SymptomsFU;
  EndGroup: SurveyEndGroup;


  constructor(isRequired?: boolean) {
    super({
      surveyKey: surveyKeys.T12_Adults,
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
    const Q1condition = SurveyEngine.singleChoice.any(this.Q1.key, this.Q1.optionKeys.yes);
    this.Q2 = new ReportedTB2(this.key, required, Q1condition);
    const Q2condition = SurveyEngine.singleChoice.any(this.Q2.key, this.Q2.optionKeys.no);
    const Q1_2condition = SurveyEngine.logic.and(Q1condition, Q2condition);
    this.Q3 = new PreviousTickBites3(this.key, required, Q1_2condition);

    this.T2 = new Text2FU(this.key, required);
    this.Q6 = new LymeFU(this.key, required);
    const Q6condition = SurveyEngine.singleChoice.any(this.Q6.key, this.Q6.optionKeys.yes);
    this.Q7 = new LymeDiagnosis2(this.key, required, Q6condition);
    this.Q8 = new LymeDiagnosis3(this.key, required, Q6condition);
    this.Q9 = new LymeDiagnosis4(this.key, required, Q6condition);
    this.Q10 = new LymeDiagnosis5(this.key, required, Q6condition);
    this.Q11 = new LymeDiagnosis6(this.key, required, Q6condition);
    this.H1 = new MedicationHeader(this.key, required);
    this.Q12 = new MedicationFU1(this.key, required);
    //TODO: I think this is not very elegant. Ask Peter how to do this in a better way (without hardcoding response key)
    const Q12number = SurveyEngine.getResponseValueAsNum(this.Q12.key, 'rg.scg.b.2');

    this.Q13 = new MedicationFU2(this.key, required, Q12number);

    this.H2 = new SymptomsHeader(this.key, required);
    const isFemale = SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.genderCategory.key, ParticipantFlags.genderCategory.values.female);
    this.PHQ_15 = new PHQ_15(this.key, required, isFemale);
    this.SF36 = new SF36(this.key, required);
    const cond_woman = SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.genderCategory.key, ParticipantFlags.genderCategory.values.female);
    this.Q16 = new Pregnant(this.key, required, cond_woman);
    this.T3 = new FunctioningText(this.key, required);
    this.Q17 = new Functioning1(this.key, required);
    this.Q18 = new Functioning2(this.key, required);
    this.Q19 = new Functioning3(this.key, required);
    this.Q20 = new Functioning4(this.key, required);
    this.Q21 = new Functioning5(this.key, required);

    this.H3 = new FatigueHeader(this.key, required);
    this.Q22 = new Fatigue(this.key, required);

    this.H4 = new CognitionHeader(this.key, required);
    this.Q23 = new Cognition(this.key, required);

    this.TicP = new TicP_Group(this.key, required);

    this.H5 = new GenHealthHeader(this.key, required);
    this.TicP_Comorbidity = new TicP_Comorbidity(this.key, required);
    this.Q27 = new SymptomsFU(this.key, required);
    this.EndGroup = new SurveyEndGroup(this.key, false);
  }

  buildSurvey() {

    this.addItem(this.T1.get());
    this.addItem(this.Q1.get());
    this.addItem(this.Q2.get());
    this.addItem(this.Q3.get());
    this.addPageBreak();

    this.addItem(this.T2.get());
    this.addItem(this.Q6.get());
    this.addItem(this.Q7.get());
    this.addItem(this.Q8.get());
    this.addItem(this.Q9.get());
    this.addItem(this.Q10.get());
    this.addItem(this.Q11.get());
    this.addPageBreak();

    this.addItem(this.H1.get());
    this.addItem(this.Q12.get());
    this.addItem(this.Q13.get());
    this.addPageBreak();

    this.addItem(this.H2.get());
    this.addItem(this.PHQ_15.get());
    this.addItem(this.SF36.get());
    this.addItem(this.Q16.get());
    this.addPageBreak();

    this.addItem(this.T3.get());
    this.addItem(this.Q17.get());
    this.addItem(this.Q18.get());
    this.addItem(this.Q19.get());
    this.addItem(this.Q20.get());
    this.addItem(this.Q21.get());
    this.addPageBreak();

    this.addItem(this.H3.get());
    this.addItem(this.Q22.get());
    this.addPageBreak();

    this.addItem(this.H4.get());
    this.addItem(this.Q23.get());
    this.addPageBreak();

    this.addItem(this.TicP.get());
    this.addPageBreak();

    this.addItem(this.H5.get());
    this.addItem(this.TicP_Comorbidity.get());
    this.addItem(this.Q27.get());

    this.addPageBreak();
    this.addItem(this.EndGroup.get());
  }
}

export const T12_Adults = new T12_AdultsDef(applyRequiredQuestions);
