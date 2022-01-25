import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { SurveyEngine } from 'case-editor-tools/surveys';
import { Cognition, Fatigue, Functioning1, Functioning2, Functioning3, Functioning4, Functioning5, FunctioningText, Pregnant, Qualification, Symptoms1, Symptoms2, Symptoms3, Tekenradar, StandardText1, MedCare1, MedCareText1, MedCareText2, MedCare2, MedCareText3, Awareness1, AwarenessText, AwarenessGroup, QuestionsKids1, QuestionsKids2 } from './questions/standard';
import { Residence, Gender } from './questions/demographie';
import { Text1FUKids } from './questions/followup';
import { AwarenessKidsGroup, Fatigue1G1_Kids, Fatigue1G3_Kids, Fatigue2G1_Kids, Fatigue2G3_Kids, Fatigue3G1_Kids, Fatigue3G3_Kids, FatigueText1G1_Kids, FatigueText1G3_Kids, FatigueText2G1_Kids, FatigueText2G2_Kids, FatigueText2G3_Kids, Functioning1F1_Kids, Functioning1F2_Kids, Functioning1F3_Kids, Functioning2F1_Kids, Functioning2F2_Kids, Functioning2F3_Kids, Functioning3F1_Kids, Functioning3F2_Kids, Functioning3F3_Kids, Functioning3F4_Kids, Functioning4F1_Kids, Functioning5F1_Kids, Functioning5F2_Kids, Functioning5F3_Kids, FunctioningText1F1_Kids, FunctioningText1F3_Kids, FunctioningText2F1_Kids, FunctioningText2F3_Kids, PainH1_Kids, PainH2_Kids, School1H1_Kids, School1H2_Kids, School2H1_Kids, School2H2_Kids, School3H1_Kids, School3H2_Kids, Strength_WeaknessI1Text_Kids, Strength_WeaknessI3Text_Kids, Strength_WeaknessI1_Kids } from './questions/standard_Kids';
import { ParticipantFlags } from '../participantFlags';


class Standardflow_KidsDef extends SurveyDefinition {

  T1_Kids: Text1FUKids;
  Q1: Tekenradar;
  T1: StandardText1;
  Q2: Qualification;
  Q3: Residence;
  Q4: Gender;
  Q5: Symptoms1;
  Q6: QuestionsKids1;
  Q6_a: QuestionsKids2;
  Q7: Symptoms2;
  Q8: Symptoms3;

  T2: MedCareText1;
  Q9: MedCare1;
  T3: MedCareText2;
  Q10: MedCare2;
  T4: MedCareText3;

  //NOTE: Awareness group is for teens here and for their parents at end of question flow.
  G11_18: AwarenessGroup;

  //TODO: wait for feedback and update function groups
  T2_F1: FunctioningText1F1_Kids;
  T2_F3: FunctioningText1F3_Kids;
  T3_F1: FunctioningText2F1_Kids;
  T3_F3: FunctioningText2F3_Kids;
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

  T4_G1: FatigueText1G1_Kids;
  T4_G3: FatigueText1G3_Kids;
  T5_G1: FatigueText2G1_Kids;
  T5_G2: FatigueText2G2_Kids;
  T5_G3: FatigueText2G3_Kids;

  Q24_G1: Fatigue1G1_Kids;
  Q24_G3: Fatigue1G3_Kids;
  Q25_G1: Fatigue2G1_Kids;
  Q25_G3: Fatigue2G3_Kids;
  Q26_G1: Fatigue3G1_Kids;
  Q26_G3: Fatigue3G3_Kids;

  Q27_H1: PainH1_Kids;
  Q27_H2: PainH2_Kids;
  Q28_H1: School1H1_Kids;
  Q28_H2: School1H2_Kids;
  Q29_H1: School2H1_Kids;
  Q29_H2: School2H2_Kids;
  Q30_H1: School3H1_Kids;
  Q30_H2: School3H2_Kids;

  T6_I1Kids: Strength_WeaknessI1Text_Kids;
  T6_I3Kids: Strength_WeaknessI3Text_Kids;
  Q31: Strength_WeaknessI1_Kids;
  G32_39: AwarenessKidsGroup;

  constructor(isRequired?: boolean) {
    super({
      surveyKey: 'Standardflow_Kids',
      name: new Map([
        ['nl', 'Test']
      ]),
      description: new Map([
        ['nl', 'Test']
      ]),
      durationText: new Map([
        ['nl', 'Test']
      ]),
      availableFor: 'temporary_participants'
    });


    const required = isRequired !== undefined ? isRequired : false;
    this.T1_Kids = new Text1FUKids(this.key, required);
    this.Q1 = new Tekenradar(this.key, required);
    this.T1 = new StandardText1(this.key, required);
    this.Q2 = new Qualification(this.key, required);
    this.Q3 = new Residence(this.key, required);
    this.Q4 = new Gender(this.key, required);

    this.Q5 = new Symptoms1(this.key, required);
    this.Q6 = new QuestionsKids1(this.key, required);
    const Q6condition = SurveyEngine.singleChoice.any(this.Q6.key, this.Q6.optionKeys.nameOfOption);
    this.Q6_a = new QuestionsKids2(this.key, required, Q6condition);
    this.Q7 = new Symptoms2(this.key, required);
    this.Q8 = new Symptoms3(this.key, required);

    this.T2 = new MedCareText1(this.key, required);
    this.Q9 = new MedCare1(this.key, required);
    const Q9condition = SurveyEngine.singleChoice.any(this.Q9.key, this.Q9.optionKeys.nameOfOption);
    this.T3 = new MedCareText2(this.key, required, Q9condition);
    this.Q10 = new MedCare2(this.key, required, Q9condition);
    this.T4 = new MedCareText3(this.key, required, Q9condition);

    this.G11_18 = new AwarenessGroup(this.key, isRequired);

    //TODO: update this one
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

      //TODO: restructure
    const cond_younger8 = SurveyEngine.compare.lt(AgeFromPDiff, 8);
    const cond_olderequal8 = SurveyEngine.logic.not(cond_younger8);

    const cond_younger11 = SurveyEngine.compare.lt(AgeFromPDiff, 11);
    const cond_olderequal11 = SurveyEngine.logic.not(cond_younger11);


    this.T2_F1 = new FunctioningText1F1_Kids(this.key, required, cond_2younger8);
    this.T2_F3 = new FunctioningText1F3_Kids(this.key, required, cond_8younger18);
    this.T3_F1 = new FunctioningText2F1_Kids(this.key, required, cond_2younger8);
    this.T3_F3 = new FunctioningText2F3_Kids(this.key, required, cond_8younger18);

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
    const Q22condition = SurveyEngine.singleChoice.any(this.Q22_F1.key, this.Q22_F1.optionKeys.nameOfOption);

    this.Q23_F1 = new Functioning5F1_Kids(this.key, required, Q22condition);
    this.Q23_F2 = new Functioning5F2_Kids(this.key, required, cond_5younger8);
    this.Q23_F3 = new Functioning5F3_Kids(this.key, required, cond_8younger18);

    this.T4_G1 = new FatigueText1G1_Kids(this.key, required, cond_2younger8);
    this.T4_G3 = new FatigueText1G3_Kids(this.key, required, cond_8younger18);
    this.T5_G1 = new FatigueText2G1_Kids(this.key, required, cond_2younger5);
    this.T5_G2 = new FatigueText2G2_Kids(this.key, required, cond_5younger8);
    this.T5_G3 = new FatigueText2G3_Kids(this.key, required, cond_8younger18);

    this.Q24_G1 = new Fatigue1G1_Kids(this.key, required, cond_2younger8);
    this.Q24_G3 = new Fatigue1G3_Kids(this.key, required, cond_8younger18);

    this.Q25_G1 = new Fatigue2G1_Kids(this.key, required, cond_2younger8);
    this.Q25_G3 = new Fatigue2G3_Kids(this.key, required, cond_8younger18);
    this.Q26_G1 = new Fatigue3G1_Kids(this.key, required, cond_2younger8);
    this.Q26_G3 = new Fatigue3G3_Kids(this.key, required, cond_8younger18);

    this.Q27_H1 = new PainH1_Kids(this.key, required, cond_2younger8);
    this.Q27_H2 = new PainH2_Kids(this.key, required, cond_8younger18);
    this.Q28_H1 = new School1H1_Kids(this.key, required, cond_2younger8);
    this.Q28_H2 = new School1H2_Kids(this.key, required, cond_8younger18);
    this.Q29_H1 = new School2H1_Kids(this.key, required, cond_2younger8);
    this.Q29_H2 = new School2H2_Kids(this.key, required, cond_8younger18);
    this.Q30_H1 = new School3H1_Kids(this.key, required, cond_2younger8);
    this.Q30_H2 = new School3H2_Kids(this.key, required, cond_8younger18);

    this.T6_I1Kids = new Strength_WeaknessI1Text_Kids(this.key, required, cond_younger11);
    this.T6_I3Kids = new Strength_WeaknessI3Text_Kids(this.key, required, cond_olderequal11);
    this.Q31 = new Strength_WeaknessI1_Kids(this.key, required);
    this.G32_39 = new AwarenessKidsGroup(this.key, required)
  }

  buildSurvey() {

    this.addItem(this.T1_Kids.get());
    this.addItem(this.Q1.get());
    this.addItem(this.T1.get());
    this.addItem(this.Q2.get());
    this.addItem(this.Q3.get());
    this.addItem(this.Q4.get());

    this.addItem(this.Q5.get());
    this.addItem(this.Q6.get());
    this.addItem(this.Q6_a.get());
    this.addItem(this.Q7.get());
    this.addItem(this.Q8.get());

    this.addItem(this.T2.get());
    this.addItem(this.Q9.get());
    this.addItem(this.T3.get());
    this.addItem(this.Q10.get());
    this.addItem(this.T4.get());

    this.addItem(this.G11_18.get());

    this.addItem(this.T2_F1.get());
    this.addItem(this.T2_F3.get());
    this.addItem(this.T3_F1.get());
    this.addItem(this.T3_F3.get());
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

    this.addItem(this.T4_G1.get());
    this.addItem(this.T4_G3.get());
    this.addItem(this.T5_G1.get());
    this.addItem(this.T5_G2.get());
    this.addItem(this.T5_G3.get());

    this.addItem(this.Q24_G1.get());
    this.addItem(this.Q24_G3.get());
    this.addItem(this.Q25_G1.get());
    this.addItem(this.Q25_G3.get());
    this.addItem(this.Q26_G1.get());
    this.addItem(this.Q26_G3.get());

    this.addItem(this.Q27_H1.get());
    this.addItem(this.Q27_H2.get());
    this.addItem(this.Q28_H1.get());
    this.addItem(this.Q28_H2.get());
    this.addItem(this.Q29_H1.get());
    this.addItem(this.Q29_H2.get());
    this.addItem(this.Q30_H1.get());
    this.addItem(this.Q30_H2.get());

    this.addItem(this.T6_I1Kids.get());
    this.addItem(this.T6_I3Kids.get());
    this.addItem(this.Q31.get());
    this.addItem(this.G32_39.get());

  }
}

export const Standardflow_Kids = new Standardflow_KidsDef();
