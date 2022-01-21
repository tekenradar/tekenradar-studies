import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { SurveyEngine } from 'case-editor-tools/surveys';
import { Cognition, Fatigue, Functioning1, Functioning2, Functioning3, Functioning4, Functioning5, FunctioningText, Pregnant, Qualification, Symptoms1, Symptoms2, Symptoms3, Tekenradar, StandardText1, MedCare1, MedCareText1, MedCareText2, MedCare2, MedCareText3, Awareness1, AwarenessText, AwarenessGroup, QuestionsKids1, QuestionsKids2 } from './questions/standard';
import { Residence, Gender } from './questions/demographie';
import { Text1FUKids } from './questions/followup';
import { AwarenessKidsGroup, Fatigue1F1_Kids, Fatigue2F1_Kids, Fatigue3F1_Kids, FatigueText1F1_Kids, FatigueText2F1_Kids, Functioning1F1_Kids, Functioning1F3_Kids, Functioning2F1_Kids, Functioning2F3_Kids, Functioning3F1_Kids, Functioning3F3_Kids, Functioning4F1_Kids, Functioning5F1_Kids, Functioning5F3_Kids, FunctioningText1F1_Kids, FunctioningText2F1_Kids, PainKids, SchoolKids1, SchoolKids2, SchoolKids3, Strength_Weakness_Kids } from './questions/standard_Kids';
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
  T2_Kids: FunctioningText1F1_Kids;
  T3_Kids: FunctioningText2F1_Kids;
  Q19_a: Functioning1F1_Kids;
  Q19_b: Functioning1F3_Kids;
  Q20_a: Functioning2F1_Kids;
  Q20_b: Functioning2F3_Kids;
  Q21_a: Functioning3F1_Kids;
  Q21_b: Functioning3F3_Kids;
  Q22: Functioning4F1_Kids;
  Q23_a: Functioning5F1_Kids;
  Q23_b: Functioning5F3_Kids;

  T4_Kids: FatigueText1F1_Kids;
  T5_Kids: FatigueText2F1_Kids;
  Q24: Fatigue1F1_Kids;
  Q25: Fatigue2F1_Kids;
  Q26: Fatigue3F1_Kids;

  Q27: PainKids;
  Q28: SchoolKids1;
  Q29: SchoolKids2;
  Q30: SchoolKids3;

  Q31: Strength_Weakness_Kids;
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

    const cond_younger8 = SurveyEngine.compare.lt(AgeFromPDiff, 8);
    const cond_olderequal8 = SurveyEngine.logic.not(cond_younger8);

    this.T2_Kids = new FunctioningText1F1_Kids(this.key, required, cond_olderequal2, cond_younger8);
    this.T3_Kids = new FunctioningText2F1_Kids(this.key, required, cond_olderequal2, cond_younger8);

    this.Q19_a = new Functioning1F1_Kids(this.key, required, cond_2younger8, cond_2younger5);
    this.Q19_b = new Functioning1F3_Kids(this.key, required, cond_8younger18);
    //continue cond here
    this.Q20_a = new Functioning2F1_Kids(this.key, required, cond_2younger8, cond_2younger5);
    this.Q20_b = new Functioning2F3_Kids(this.key, required, cond_8younger18);
    this.Q21_a = new Functioning3F1_Kids(this.key, required, cond_younger8);
    this.Q21_b = new Functioning3F3_Kids(this.key, required, cond_8younger18, cond_8younger13);
    this.Q22 = new Functioning4F1_Kids(this.key, required, cond_2younger5);
    const Q22condition = SurveyEngine.singleChoice.any(this.Q22.key, this.Q22.optionKeys.nameOfOption);
    this.Q23_a = new Functioning5F1_Kids(this.key, required, Q22condition);//TODO: cond her
    this.Q23_b = new Functioning5F3_Kids(this.key, required, cond_olderequal8);

    this.T4_Kids = new FatigueText1F1_Kids(this.key, required, cond_olderequal2, cond_younger8);
    this.T5_Kids = new FatigueText2F1_Kids(this.key, required, cond_olderequal2, cond_younger8);
    this.Q24 = new Fatigue1F1_Kids(this.key, required);
    this.Q25 = new Fatigue2F1_Kids(this.key, required);
    this.Q26 = new Fatigue3F1_Kids(this.key, required);

    this.Q27 = new PainKids(this.key, required);
    this.Q28 = new SchoolKids1(this.key, required);
    this.Q29 = new SchoolKids2(this.key, required);
    this.Q30 = new SchoolKids3(this.key, required);

    this.Q31 = new Strength_Weakness_Kids(this.key, required);
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

    this.addItem(this.T2_Kids.get());
    this.addItem(this.T3_Kids.get());
    this.addItem(this.Q19_a.get());
    this.addItem(this.Q19_b.get());
    this.addItem(this.Q20_a.get());
    this.addItem(this.Q20_b.get());
    this.addItem(this.Q21_a.get());
    this.addItem(this.Q21_b.get());
    this.addItem(this.Q22.get());
    this.addItem(this.Q23_a.get());
    this.addItem(this.Q23_b.get());

    this.addItem(this.T4_Kids.get());
    this.addItem(this.T5_Kids.get());
    this.addItem(this.Q24.get());
    this.addItem(this.Q25.get());
    this.addItem(this.Q26.get());

    this.addItem(this.Q27.get());
    this.addItem(this.Q28.get());
    this.addItem(this.Q29.get());

    this.addItem(this.Q30.get());
    this.addItem(this.Q31.get());
    this.addItem(this.G32_39.get());

  }
}

export const Standardflow_Kids = new Standardflow_KidsDef();
