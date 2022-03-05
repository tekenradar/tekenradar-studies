import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { SurveyEngine } from 'case-editor-tools/surveys';
import { Qualification, PHQ_15, PHQ_15_FU, AboutTekenradar, StandardText1, QuestionsKids1, QuestionsKids2, SymptomsText1_Kids, SymptomsText2_Kids, TextQUKids } from './questions/standard';
import { Residence, Gender } from './questions/demographie';
import { Fatigue1G1_Kids, Fatigue1G3_Kids, Fatigue2G1_Kids, Fatigue2G3_Kids, Fatigue3G1_Kids, Fatigue3G3_Kids, FatigueText1G1_Kids, FatigueText1G3_Kids, FatigueText2G1_Kids, FatigueText2G2_Kids, FatigueText2G3_Kids, Functioning1F1_Kids, Functioning1F2_Kids, Functioning1F3_Kids, Functioning2F1_Kids, Functioning2F2_Kids, Functioning2F3_Kids, Functioning3F1_Kids, Functioning3F2_Kids, Functioning3F3_Kids, Functioning3F4_Kids, Functioning4F1_Kids, Functioning5F1_Kids, Functioning5F2_Kids, Functioning5F3_Kids, FunctioningText1F1_Kids, FunctioningText1F3_Kids, FunctioningText2F1_Kids, FunctioningText2F3_Kids, PainH1_Kids, PainH2_Kids, School1H1_Kids, School1H2_Kids, School2H1_Kids, School2H2_Kids, School3H1_Kids, School3H2_Kids, Strength_WeaknessI1Text_Kids, Strength_WeaknessI3Text_Kids, Strength_WeaknessI1_Kids, Strength_WeaknessI2Text_Kids, Strength_WeaknessI2_Kids, Strength_WeaknessI3_Kids, PainTextH1_Kids, PainTextH2_Kids, BackgroundText_Kids } from './questions/standard_Kids';
import { ParticipantFlags } from '../participantFlags';
import { applyRequiredQuestions, surveyKeys } from './globalConstants';
import { SurveyEndGroup } from './questions/surveyEnd';
import { TicP_Comorbidity, TicP_Group } from './questions/ticp';
import { IPQ_Parents } from './questions/ipq_parents';
import { IPQ } from './questions/ipq';


class Standardflow_KidsDef extends SurveyDefinition {

  T1: BackgroundText_Kids;
  AboutTekenradar: AboutTekenradar;
  T2: StandardText1;
  Q2: Qualification;
  P1: Residence;
  P2: Gender;
  T3: SymptomsText1_Kids;
  TicP_Comorbidity: TicP_Comorbidity;

  T4: SymptomsText2_Kids;
  Q6: QuestionsKids1;
  Q6_a: QuestionsKids2;
  T4_a: TextQUKids;
  PHQ_15: PHQ_15;
  PHQ_15_FU: PHQ_15_FU;

  TicP: TicP_Group;

  //NOTE: Awareness group is for teens here and for their parents at end of question flow.
  IPQ: IPQ;

  T8_F1: FunctioningText1F1_Kids;
  T8_F3: FunctioningText1F3_Kids;
  T9_F1: FunctioningText2F1_Kids;
  T9_F3: FunctioningText2F3_Kids;
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

  T10_G1: FatigueText1G1_Kids;
  T10_G3: FatigueText1G3_Kids;
  T11_G1: FatigueText2G1_Kids;
  T11_G2: FatigueText2G2_Kids;
  T11_G3: FatigueText2G3_Kids;

  Q24_G1: Fatigue1G1_Kids;
  Q24_G3: Fatigue1G3_Kids;
  Q25_G1: Fatigue2G1_Kids;
  Q25_G3: Fatigue2G3_Kids;
  Q26_G1: Fatigue3G1_Kids;
  Q26_G3: Fatigue3G3_Kids;


  T12_H1: PainTextH1_Kids;
  T12_H2: PainTextH2_Kids;
  Q27_H1: PainH1_Kids;
  Q27_H2: PainH2_Kids;
  Q28_H1: School1H1_Kids;
  Q28_H2: School1H2_Kids;
  Q29_H1: School2H1_Kids;
  Q29_H2: School2H2_Kids;
  Q30_H1: School3H1_Kids;
  Q30_H2: School3H2_Kids;

  T6_I1Kids: Strength_WeaknessI1Text_Kids;
  T6_I2Kids: Strength_WeaknessI2Text_Kids;
  T6_I3Kids: Strength_WeaknessI3Text_Kids;
  Q31_I1: Strength_WeaknessI1_Kids;
  Q31_I2: Strength_WeaknessI2_Kids;
  Q31_I3: Strength_WeaknessI3_Kids;

  IPQ_Parents: IPQ_Parents;
  EndGroup: SurveyEndGroup;

  constructor(isRequired?: boolean) {
    super({
      surveyKey: surveyKeys.Standardflow_Kids,
      name: new Map([
        ['nl', 'Tekenradarvragenlijst']
      ]),
      description: new Map([
        ['nl', 'Klik hier om je melding af te ronden.']
      ]),
      durationText: new Map([
        ['nl', 'Invullen duurt ongeveer 10 minuten.']
      ]),
      availableFor: 'temporary_participants',
      requireLoginBeforeSubmission: true,
    });


    const required = isRequired !== undefined ? isRequired : false;
    this.T1 = new BackgroundText_Kids(this.key, required);
    this.AboutTekenradar = new AboutTekenradar(this.key, required);
    this.T2 = new StandardText1(this.key, required);
    this.Q2 = new Qualification(this.key, required);

    this.P1 = new Residence(this.key, required, SurveyEngine.logic.not(
      SurveyEngine.participantFlags.hasKey(ParticipantFlags.postalCode.key)
    ));
    this.P2 = new Gender(this.key, required, SurveyEngine.logic.not(
      SurveyEngine.participantFlags.hasKey(ParticipantFlags.genderCategory.key)
    ));


    this.T3 = new SymptomsText1_Kids(this.key, required);
    this.TicP_Comorbidity = new TicP_Comorbidity(this.key, required);
    this.T4 = new SymptomsText2_Kids(this.key, required);
    this.Q6 = new QuestionsKids1(this.key, required);
    const Q6condition = SurveyEngine.singleChoice.any(this.Q6.key, this.Q6.optionKeys.parent);
    this.Q6_a = new QuestionsKids2(this.key, required, Q6condition);
    this.T4_a = new TextQUKids(this.key, required);
    const isFemale = SurveyEngine.logic.or(
      SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.genderCategory.key, ParticipantFlags.genderCategory.values.female),
      SurveyEngine.singleChoice.any(this.P2.key, this.P2.optionKeys.female)
    );
    this.PHQ_15 = new PHQ_15(this.key, required, isFemale);
    this.PHQ_15_FU = new PHQ_15_FU(this.key, required);

    this.TicP = new TicP_Group(this.key, required);

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


    this.IPQ = new IPQ(this.key, isRequired, cond_11younger18);

    this.T8_F1 = new FunctioningText1F1_Kids(this.key, required, cond_2younger8);
    this.T8_F3 = new FunctioningText1F3_Kids(this.key, required, cond_8younger18);
    this.T9_F1 = new FunctioningText2F1_Kids(this.key, required, cond_2younger8);
    this.T9_F3 = new FunctioningText2F3_Kids(this.key, required, cond_8younger18);

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

    this.T10_G1 = new FatigueText1G1_Kids(this.key, required, cond_2younger8);
    this.T10_G3 = new FatigueText1G3_Kids(this.key, required, cond_8younger18);
    this.T11_G1 = new FatigueText2G1_Kids(this.key, required, cond_2younger5);
    this.T11_G2 = new FatigueText2G2_Kids(this.key, required, cond_5younger8);
    this.T11_G3 = new FatigueText2G3_Kids(this.key, required, cond_8younger18);

    this.Q24_G1 = new Fatigue1G1_Kids(this.key, required, cond_2younger8);
    this.Q24_G3 = new Fatigue1G3_Kids(this.key, required, cond_8younger18);

    this.Q25_G1 = new Fatigue2G1_Kids(this.key, required, cond_2younger8);
    this.Q25_G3 = new Fatigue2G3_Kids(this.key, required, cond_8younger18);
    this.Q26_G1 = new Fatigue3G1_Kids(this.key, required, cond_2younger8);
    this.Q26_G3 = new Fatigue3G3_Kids(this.key, required, cond_8younger18);

    this.T12_H1 = new PainTextH1_Kids(this.key, required, cond_2younger8);
    this.T12_H2 = new PainTextH2_Kids(this.key, required, cond_8younger18);
    this.Q27_H1 = new PainH1_Kids(this.key, required, cond_2younger8);
    this.Q27_H2 = new PainH2_Kids(this.key, required, cond_8younger18);
    this.Q28_H1 = new School1H1_Kids(this.key, required, cond_2younger8);
    this.Q28_H2 = new School1H2_Kids(this.key, required, cond_8younger18);
    this.Q29_H1 = new School2H1_Kids(this.key, required, cond_2younger8);
    this.Q29_H2 = new School2H2_Kids(this.key, required, cond_8younger18);
    this.Q30_H1 = new School3H1_Kids(this.key, required, cond_2younger8);
    this.Q30_H2 = new School3H2_Kids(this.key, required, cond_8younger18);

    //skip following questions for TBflow
    const cond_notTBflow = SurveyEngine.logic.not(
      SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.flow.key, ParticipantFlags.flow.values.TBflow));

    this.T6_I1Kids = new Strength_WeaknessI1Text_Kids(this.key, required, SurveyEngine.logic.and(cond_notTBflow, cond_2younger5));
    this.T6_I2Kids = new Strength_WeaknessI2Text_Kids(this.key, required, SurveyEngine.logic.and(cond_notTBflow, cond_5younger11));
    this.T6_I3Kids = new Strength_WeaknessI3Text_Kids(this.key, required, SurveyEngine.logic.and(cond_notTBflow, cond_11younger18));
    this.Q31_I1 = new Strength_WeaknessI1_Kids(this.key, required, SurveyEngine.logic.and(cond_notTBflow, cond_2younger5));
    this.Q31_I2 = new Strength_WeaknessI2_Kids(this.key, required, SurveyEngine.logic.and(cond_notTBflow, cond_5younger11));
    this.Q31_I3 = new Strength_WeaknessI3_Kids(this.key, required, SurveyEngine.logic.and(cond_notTBflow, cond_11younger18));

    this.IPQ_Parents = new IPQ_Parents(this.key, required)
    this.EndGroup = new SurveyEndGroup(this.key, false)
  }

  buildSurvey() {

    this.addItem(this.T1.get());
    this.addItem(this.AboutTekenradar.get());
    this.addItem(this.T2.get());
    this.addItem(this.Q2.get());
    this.addItem(this.P1.get());
    this.addItem(this.P2.get());
    this.addPageBreak();

    this.addItem(this.T3.get());
    this.addItem(this.TicP_Comorbidity.get());
    this.addPageBreak();

    this.addItem(this.T4.get());
    this.addItem(this.Q6.get());
    this.addItem(this.Q6_a.get());
    this.addItem(this.T4_a.get());
    this.addItem(this.PHQ_15.get());
    this.addItem(this.PHQ_15_FU.get());
    this.addPageBreak();

    this.addItem(this.TicP.get());
    this.addPageBreak();

    this.addItem(this.IPQ.get());
    this.addPageBreak();

    this.addItem(this.T8_F1.get());
    this.addItem(this.T8_F3.get());
    this.addItem(this.T9_F1.get());
    this.addItem(this.T9_F3.get());
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
    this.addItem(this.T10_G1.get());
    this.addItem(this.T10_G3.get());
    this.addItem(this.T11_G1.get());
    this.addItem(this.T11_G2.get());
    this.addItem(this.T11_G3.get());

    this.addItem(this.Q24_G1.get());
    this.addItem(this.Q24_G3.get());
    this.addItem(this.Q25_G1.get());
    this.addItem(this.Q25_G3.get());
    this.addItem(this.Q26_G1.get());
    this.addItem(this.Q26_G3.get());

    this.addPageBreak();
    this.addItem(this.T12_H1.get());
    this.addItem(this.T12_H2.get());
    this.addItem(this.Q27_H1.get());
    this.addItem(this.Q27_H2.get());
    this.addItem(this.Q28_H1.get());
    this.addItem(this.Q28_H2.get());
    this.addItem(this.Q29_H1.get());
    this.addItem(this.Q29_H2.get());
    this.addItem(this.Q30_H1.get());
    this.addItem(this.Q30_H2.get());

    this.addPageBreak();
    this.addItem(this.T6_I1Kids.get());
    this.addItem(this.T6_I2Kids.get());
    this.addItem(this.T6_I3Kids.get());
    this.addItem(this.Q31_I1.get());
    this.addItem(this.Q31_I2.get());
    this.addItem(this.Q31_I3.get());
    this.addPageBreak();

    this.addItem(this.IPQ_Parents.get());
    this.addPageBreak();

    this.addItem(this.EndGroup.get());

  }
}

export const Standardflow_Kids = new Standardflow_KidsDef(applyRequiredQuestions);
