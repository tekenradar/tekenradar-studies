import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { LymeDiagnosis2 } from './questions/diagnosisTherapy';
import { LymeDiagnosis3, LymeDiagnosis4, LymeDiagnosis5, LymeDiagnosis6 } from './questions/lyme';
import { FeverFU1, FeverFU2, LymeFU, MedicationFU1, MedicationFU2, NewTB, PreviousTickBites3, ReportedTB2, SymptomsFU, Text1FU, ThreeMonthsText_Kids, Text2FU, MedicationFUText_Kids } from './questions/followup';
import { MedCare1, MedCare2, MedCareText1, MedCareText2, MedCareText3, QuestionsKids1, QuestionsKids2, Symptoms1, Symptoms2, Symptoms3, SymptomsText1_Kids, SymptomsText2_Kids, TextQUKids } from './questions/standard';
import { SurveyEngine } from 'case-editor-tools/surveys';
import { Fatigue1G1_Kids, Fatigue1G3_Kids, Fatigue2G1_Kids, Fatigue2G3_Kids, Fatigue3G1_Kids, Fatigue3G3_Kids, FatigueText1G1_Kids, FatigueText1G3_Kids, FatigueText2G1_Kids, FatigueText2G2_Kids, FatigueText2G3_Kids, Functioning1F1_Kids, Functioning1F2_Kids, Functioning1F3_Kids, Functioning2F1_Kids, Functioning2F2_Kids, Functioning2F3_Kids, Functioning3F1_Kids, Functioning3F2_Kids, Functioning3F3_Kids, Functioning3F4_Kids, Functioning4F1_Kids, Functioning5F1_Kids, Functioning5F2_Kids, Functioning5F3_Kids, FunctioningText1F1_Kids, FunctioningText1F3_Kids, FunctioningText2F1_Kids, FunctioningText2F3_Kids, PainH1_Kids, PainH2_Kids, PainTextH1_Kids, PainTextH2_Kids, School1H1_Kids, School1H2_Kids, School2H1_Kids, School2H2_Kids, School3H1_Kids, School3H2_Kids, Strength_WeaknessI1Text_Kids, Strength_WeaknessI1_Kids, Strength_WeaknessI2Text_Kids, Strength_WeaknessI2_Kids, Strength_WeaknessI3Text_Kids, Strength_WeaknessI3_Kids } from './questions/standard_Kids';
import { ParticipantFlags } from '../participantFlags';
import { applyRequiredQuestions, surveyKeys } from './globalConstants';
import { SurveyEndGroup } from './questions/surveyEnd';

class T6_KidsDef extends SurveyDefinition {

  T1: ThreeMonthsText_Kids;
  T2: Text1FU
  Q1: NewTB;
  Q2: ReportedTB2;
  Q3: PreviousTickBites3;
  Q4: FeverFU1;
  Q5: FeverFU2;
  T3: Text2FU;
  Q6: LymeFU;
  Q7: LymeDiagnosis2;
  Q8: LymeDiagnosis3;
  Q9: LymeDiagnosis4;
  Q10: LymeDiagnosis5;
  Q11: LymeDiagnosis6;
  T4: MedicationFUText_Kids;
  Q12: MedicationFU1;
  Q13: MedicationFU2;

  T5: SymptomsText2_Kids;
  Q14: QuestionsKids1;
  Q14_a: QuestionsKids2;
  T6: TextQUKids;
  Q15: Symptoms2;
  Q16: Symptoms3;

  T7: MedCareText1;
  Q17: MedCare1;
  T8: MedCareText2;
  Q18: MedCare2;
  T9: MedCareText3;

  T10_F1: FunctioningText1F1_Kids;
  T10_F3: FunctioningText1F3_Kids;
  T11_F1: FunctioningText2F1_Kids;
  T11_F3: FunctioningText2F3_Kids;
  Q19_F1: Functioning1F1_Kids;
  Q19_F2: Functioning1F2_Kids;
  Q19_F3: Functioning1F3_Kids;
  Q20_F1: Functioning2F1_Kids;
  Q20_F2: Functioning2F2_Kids;
  Q20_F3: Functioning2F3_Kids;

  Q21_F1: Functioning3F1_Kids;
  Q21_F2: Functioning3F2_Kids;
  Q21_F3: Functioning3F3_Kids;
  Q21_F4: Functioning3F4_Kids;

  Q22_F1: Functioning4F1_Kids;

  Q23_F1: Functioning5F1_Kids;
  Q23_F2: Functioning5F2_Kids;
  Q23_F3: Functioning5F3_Kids;

  T12_G1: FatigueText1G1_Kids;
  T12_G3: FatigueText1G3_Kids;
  T13_G1: FatigueText2G1_Kids;
  T13_G2: FatigueText2G2_Kids;
  T13_G3: FatigueText2G3_Kids;

  Q24_G1: Fatigue1G1_Kids;
  Q24_G3: Fatigue1G3_Kids;
  Q25_G1: Fatigue2G1_Kids;
  Q25_G3: Fatigue2G3_Kids;
  Q26_G1: Fatigue3G1_Kids;
  Q26_G3: Fatigue3G3_Kids;

  T14_H1: PainTextH1_Kids;
  T14_H2: PainTextH2_Kids;
  Q27_H1: PainH1_Kids;
  Q27_H2: PainH2_Kids;
  Q28_H1: School1H1_Kids;
  Q28_H2: School1H2_Kids;
  Q29_H1: School2H1_Kids;
  Q29_H2: School2H2_Kids;
  Q30_H1: School3H1_Kids;
  Q30_H2: School3H2_Kids;


  T15_I1: Strength_WeaknessI1Text_Kids;
  T15_I2: Strength_WeaknessI2Text_Kids;
  T15_I3: Strength_WeaknessI3Text_Kids;
  Q31_I1: Strength_WeaknessI1_Kids;
  Q31_I2: Strength_WeaknessI2_Kids;
  Q31_I3: Strength_WeaknessI3_Kids;
  EndGroup: SurveyEndGroup;

  constructor(isRequired?: boolean) {
    super({
      surveyKey: surveyKeys.T6_Kids,
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

    this.T1 = new ThreeMonthsText_Kids(this.key, required);
    this.T2 = new Text1FU(this.key, required);
    this.Q1 = new NewTB(this.key, required);
    const Q1condition = SurveyEngine.singleChoice.any(this.Q1.key, this.Q1.optionKeys.yes);
    this.Q2 = new ReportedTB2(this.key, required, Q1condition);
    const Q2condition = SurveyEngine.singleChoice.any(this.Q2.key, this.Q2.optionKeys.no);
    this.Q3 = new PreviousTickBites3(this.key, required, Q2condition);
    this.Q4 = new FeverFU1(this.key, required, Q1condition);
    const Q4condition = SurveyEngine.singleChoice.any(this.Q4.key, this.Q4.optionKeys.yes);
    this.Q5 = new FeverFU2(this.key, required, Q4condition);

    this.T3 = new Text2FU(this.key, required);
    this.Q6 = new LymeFU(this.key, required);
    const Q6condition = SurveyEngine.singleChoice.any(this.Q6.key, this.Q6.optionKeys.yes);
    this.Q7 = new LymeDiagnosis2(this.key, required, Q6condition);
    this.Q8 = new LymeDiagnosis3(this.key, required, Q6condition);
    this.Q9 = new LymeDiagnosis4(this.key, required, Q6condition);
    this.Q10 = new LymeDiagnosis5(this.key, required, Q6condition);
    this.Q11 = new LymeDiagnosis6(this.key, required, Q6condition);

    this.T4 = new MedicationFUText_Kids(this.key, required);
    this.Q12 = new MedicationFU1(this.key, required);

    //TODO: I think this is not very elegant. Ask Peter how to do this in a better way (without hardcoding response key)
    const Q12number = SurveyEngine.getResponseValueAsNum(this.Q12.key, 'rg.scg.b.2');
    this.Q13 = new MedicationFU2(this.key, required, Q12number);

    this.T5 = new SymptomsText2_Kids(this.key, required);
    this.Q14 = new QuestionsKids1(this.key, required);
    const Q14condition = SurveyEngine.singleChoice.any(this.Q14.key, this.Q14.optionKeys.parent);
    this.Q14_a = new QuestionsKids2(this.key, required, Q14condition);

    this.T6 = new TextQUKids(this.key, required);
    const isFemale = SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.genderCategory.key, ParticipantFlags.genderCategory.values.female);
    this.Q15 = new Symptoms2(this.key, required, isFemale);
    this.Q16 = new Symptoms3(this.key, required);

    this.T7 = new MedCareText1(this.key, required);
    this.Q17 = new MedCare1(this.key, required);
    const Q17number = SurveyEngine.getResponseValueAsNum(this.Q17.key, 'rg.scg.a');
    this.T8 = new MedCareText2(this.key, required);
    this.Q18 = new MedCare2(this.key, required, Q17number);
    this.T9 = new MedCareText3(this.key, required, Q17number);

    //different branches per age here
    const AgeFromPDiff = SurveyEngine.participantFlags.getAsNum(ParticipantFlags.ageFromPDiff.key);
    const cond_younger2 = SurveyEngine.compare.lt(AgeFromPDiff, 2);
    const cond_olderequal2 = SurveyEngine.logic.not(cond_younger2);
    const cond_2younger5 = SurveyEngine.logic.and(
      SurveyEngine.compare.gte(AgeFromPDiff, 2),
      SurveyEngine.compare.lt(AgeFromPDiff, 5));
    const cond_5younger8 = SurveyEngine.logic.and(
      SurveyEngine.compare.gte(AgeFromPDiff, 5),
      SurveyEngine.compare.lt(AgeFromPDiff, 8));
    const cond_8younger13 = SurveyEngine.logic.and(
      SurveyEngine.compare.gte(AgeFromPDiff, 8),
      SurveyEngine.compare.lt(AgeFromPDiff, 13));
    const cond_13younger18 = SurveyEngine.logic.and(
      SurveyEngine.compare.gte(AgeFromPDiff, 13),
      SurveyEngine.compare.lt(AgeFromPDiff, 18));
    const cond_2younger8 = SurveyEngine.logic.and(
      SurveyEngine.compare.gte(AgeFromPDiff, 2),
      SurveyEngine.compare.lt(AgeFromPDiff, 8));
    const cond_8younger18 = SurveyEngine.logic.and(
      SurveyEngine.compare.gte(AgeFromPDiff, 8),
      SurveyEngine.compare.lt(AgeFromPDiff, 18));
    const cond_5younger11 = SurveyEngine.logic.and(
      SurveyEngine.compare.gte(AgeFromPDiff, 5),
      SurveyEngine.compare.lt(AgeFromPDiff, 11));
    const cond_11younger18 = SurveyEngine.logic.and(
      SurveyEngine.compare.gte(AgeFromPDiff, 11),
      SurveyEngine.compare.lt(AgeFromPDiff, 18));

    this.T10_F1 = new FunctioningText1F1_Kids(this.key, required, cond_2younger8);
    this.T10_F3 = new FunctioningText1F3_Kids(this.key, required, cond_8younger18);
    this.T11_F1 = new FunctioningText2F1_Kids(this.key, required, cond_2younger8);
    this.T11_F3 = new FunctioningText2F3_Kids(this.key, required, cond_8younger18);


    this.Q19_F1 = new Functioning1F1_Kids(this.key, required, cond_2younger5);
    this.Q19_F2 = new Functioning1F2_Kids(this.key, required, cond_5younger8);
    this.Q19_F3 = new Functioning1F3_Kids(this.key, required, cond_8younger18);

    this.Q20_F1 = new Functioning2F1_Kids(this.key, required, cond_2younger5);
    this.Q20_F2 = new Functioning2F2_Kids(this.key, required, cond_5younger8);
    this.Q20_F3 = new Functioning2F3_Kids(this.key, required, cond_8younger18);

    this.Q21_F1 = new Functioning3F1_Kids(this.key, required, cond_2younger5);
    this.Q21_F2 = new Functioning3F2_Kids(this.key, required, cond_5younger8);
    this.Q21_F3 = new Functioning3F3_Kids(this.key, required, cond_8younger13);
    this.Q21_F4 = new Functioning3F4_Kids(this.key, required, cond_13younger18);

    this.Q22_F1 = new Functioning4F1_Kids(this.key, required, cond_2younger5);
    const Q22condition = SurveyEngine.singleChoice.any(this.Q22_F1.key, this.Q22_F1.optionKeys.yes);

    this.Q23_F1 = new Functioning5F1_Kids(this.key, required, Q22condition);
    this.Q23_F2 = new Functioning5F2_Kids(this.key, required, cond_5younger8);
    this.Q23_F3 = new Functioning5F3_Kids(this.key, required, cond_8younger18);

    this.T12_G1 = new FatigueText1G1_Kids(this.key, required, cond_2younger8);
    this.T12_G3 = new FatigueText1G3_Kids(this.key, required, cond_8younger18);
    this.T13_G1 = new FatigueText2G1_Kids(this.key, required, cond_2younger5);
    this.T13_G2 = new FatigueText2G2_Kids(this.key, required, cond_5younger8);
    this.T13_G3 = new FatigueText2G3_Kids(this.key, required, cond_8younger18);

    this.Q24_G1 = new Fatigue1G1_Kids(this.key, required, cond_2younger8);
    this.Q24_G3 = new Fatigue1G3_Kids(this.key, required, cond_8younger18);

    this.Q25_G1 = new Fatigue2G1_Kids(this.key, required, cond_2younger8);
    this.Q25_G3 = new Fatigue2G3_Kids(this.key, required, cond_8younger18);
    this.Q26_G1 = new Fatigue3G1_Kids(this.key, required, cond_2younger8);
    this.Q26_G3 = new Fatigue3G3_Kids(this.key, required, cond_8younger18);

    this.T14_H1 = new PainTextH1_Kids(this.key, required, cond_2younger8);
    this.T14_H2 = new PainTextH2_Kids(this.key, required, cond_8younger18);
    this.Q27_H1 = new PainH1_Kids(this.key, required, cond_2younger8);
    this.Q27_H2 = new PainH2_Kids(this.key, required, cond_8younger18);
    this.Q28_H1 = new School1H1_Kids(this.key, required, cond_2younger8);
    this.Q28_H2 = new School1H2_Kids(this.key, required, cond_8younger18);
    this.Q29_H1 = new School2H1_Kids(this.key, required, cond_2younger8);
    this.Q29_H2 = new School2H2_Kids(this.key, required, cond_8younger18);
    this.Q30_H1 = new School3H1_Kids(this.key, required, cond_2younger8);
    this.Q30_H2 = new School3H2_Kids(this.key, required, cond_8younger18);

    this.T15_I1 = new Strength_WeaknessI1Text_Kids(this.key, required, cond_2younger5);
    this.T15_I2 = new Strength_WeaknessI2Text_Kids(this.key, required, cond_5younger11);
    this.T15_I3 = new Strength_WeaknessI3Text_Kids(this.key, required, cond_11younger18);
    this.Q31_I1 = new Strength_WeaknessI1_Kids(this.key, required, cond_2younger5);
    this.Q31_I2 = new Strength_WeaknessI2_Kids(this.key, required, cond_5younger11);
    this.Q31_I3 = new Strength_WeaknessI3_Kids(this.key, required, cond_11younger18);
    this.EndGroup = new SurveyEndGroup(this.key, false);

  }

  buildSurvey() {

    this.addItem(this.T1.get());
    this.addItem(this.T2.get());
    this.addItem(this.Q1.get());
    this.addItem(this.Q2.get());
    this.addItem(this.Q3.get());
    this.addItem(this.Q4.get());
    this.addItem(this.Q5.get());

    this.addPageBreak();
    this.addItem(this.T3.get());
    this.addItem(this.Q6.get());
    this.addItem(this.Q7.get());
    this.addItem(this.Q8.get());
    this.addItem(this.Q9.get());
    this.addItem(this.Q10.get());
    this.addItem(this.Q11.get());

    this.addPageBreak();
    this.addItem(this.T4.get());
    this.addItem(this.Q12.get());
    this.addItem(this.Q13.get());

    this.addPageBreak();
    this.addItem(this.T5.get());
    this.addItem(this.Q14.get());
    this.addItem(this.Q14_a.get());
    this.addItem(this.T6.get());
    this.addItem(this.Q15.get());
    this.addItem(this.Q16.get());

    this.addPageBreak();
    this.addItem(this.T7.get());
    this.addItem(this.Q17.get());
    this.addItem(this.T8.get());
    this.addItem(this.Q18.get());
    this.addItem(this.T9.get());

    this.addPageBreak();
    this.addItem(this.T10_F1.get());
    this.addItem(this.T10_F3.get());
    this.addItem(this.T11_F1.get());
    this.addItem(this.T11_F3.get());
    this.addItem(this.Q19_F1.get());
    this.addItem(this.Q19_F2.get());
    this.addItem(this.Q19_F3.get());
    this.addItem(this.Q20_F1.get());
    this.addItem(this.Q20_F2.get());
    this.addItem(this.Q20_F3.get());

    this.addItem(this.Q21_F1.get());
    this.addItem(this.Q21_F2.get());
    this.addItem(this.Q21_F3.get());
    this.addItem(this.Q21_F4.get());

    this.addItem(this.Q22_F1.get());
    this.addItem(this.Q23_F1.get());
    this.addItem(this.Q23_F2.get());
    this.addItem(this.Q23_F3.get());

    this.addPageBreak();
    this.addItem(this.T12_G1.get());
    this.addItem(this.T12_G3.get());
    this.addItem(this.T13_G1.get());
    this.addItem(this.T13_G2.get());
    this.addItem(this.T13_G3.get());
    this.addItem(this.Q24_G1.get());
    this.addItem(this.Q24_G3.get());
    this.addItem(this.Q25_G1.get());
    this.addItem(this.Q25_G3.get());
    this.addItem(this.Q26_G1.get());
    this.addItem(this.Q26_G3.get());

    this.addPageBreak();
    this.addItem(this.T14_H1.get());
    this.addItem(this.T14_H2.get());
    this.addItem(this.Q27_H1.get());
    this.addItem(this.Q27_H2.get());
    this.addItem(this.Q28_H1.get());
    this.addItem(this.Q28_H2.get());
    this.addItem(this.Q29_H1.get());
    this.addItem(this.Q29_H2.get());
    this.addItem(this.Q30_H1.get());
    this.addItem(this.Q30_H2.get());

    this.addPageBreak();
    this.addItem(this.T15_I1.get());
    this.addItem(this.T15_I2.get());
    this.addItem(this.T15_I3.get());
    this.addItem(this.Q31_I1.get());
    this.addItem(this.Q31_I2.get());
    this.addItem(this.Q31_I3.get());

    this.addPageBreak();
    this.addItem(this.EndGroup.get());
  }
}

export const T6_Kids = new T6_KidsDef(applyRequiredQuestions);
