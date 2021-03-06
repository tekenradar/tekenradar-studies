import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { SurveyEngine } from 'case-editor-tools/surveys';
import { Qualification, PHQ_15, PHQ_15_FU, AboutTekenradar, StandardText1, QuestionsKids1, QuestionsKids2, SymptomsText1_Kids, SymptomsText2_Kids, TextQUKids } from './questions/standard';
import { Residence, Gender } from './questions/demographie';
import { Strength_WeaknessI1Text_Kids, Strength_WeaknessI3Text_Kids, Strength_WeaknessI2Text_Kids, BackgroundText_Kids, SQD3_2_4, SQD3_5_11, SQD3_11_18 } from './questions/standard_Kids';
import { ParticipantFlags } from '../participantFlags';
import { applyRequiredQuestions, surveyKeys } from './globalConstants';
import { SurveyEndGroup } from './questions/surveyEnd';
import { TicP_Comorbidity, TicP_Group } from './questions/ticp';
import { IPQ_Parents } from './questions/ipq_parents';
import { IPQ } from './questions/ipq';
import { Pedsql_13_18, Pedsql_2_4, Pedsql_5_7, Pedsql_8_12 } from './questions/pedsql';
import { PedsqlFatigue_13_18, PedsqlFatigue_2_4, PedsqlFatigue_5_7, PedsqlFatigue_8_12 } from './questions/pedsqlFatigue';
import { VasPain_Group_2_7, VasPain_Group_8_18 } from './questions/vasPain';


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

  Pedsql_2_4: Pedsql_2_4;
  Pedsql_5_7: Pedsql_5_7;
  Pedsql_8_12: Pedsql_8_12;
  Pedsql_13_18: Pedsql_13_18;

  PedsqlFatigue_2_4: PedsqlFatigue_2_4;
  PedsqlFatigue_5_7: PedsqlFatigue_5_7;
  PedsqlFatigue_8_12: PedsqlFatigue_8_12;
  PedsqlFatigue_13_18: PedsqlFatigue_13_18;

  VasPain_2_7: VasPain_Group_2_7;
  VasPain_8_18: VasPain_Group_8_18;

  T6_I1Kids: Strength_WeaknessI1Text_Kids;
  T6_I2Kids: Strength_WeaknessI2Text_Kids;
  T6_I3Kids: Strength_WeaknessI3Text_Kids;
  SQD3_2_4: SQD3_2_4;
  SQD3_5_11: SQD3_5_11;
  SQD3_11_18: SQD3_11_18;

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

    this.Pedsql_2_4 = new Pedsql_2_4(this.key, required, cond_2younger5);
    this.Pedsql_5_7 = new Pedsql_5_7(this.key, required, cond_5younger8);
    this.Pedsql_8_12 = new Pedsql_8_12(this.key, required, cond_8younger13);
    this.Pedsql_13_18 = new Pedsql_13_18(this.key, required, cond_13younger18);

    this.PedsqlFatigue_2_4 = new PedsqlFatigue_2_4(this.key, required, cond_2younger5);
    this.PedsqlFatigue_5_7 = new PedsqlFatigue_5_7(this.key, required, cond_5younger8);
    this.PedsqlFatigue_8_12 = new PedsqlFatigue_8_12(this.key, required, cond_8younger13);
    this.PedsqlFatigue_13_18 = new PedsqlFatigue_13_18(this.key, required, cond_13younger18);

    this.VasPain_2_7 = new VasPain_Group_2_7(this.key, required, cond_2younger8);
    this.VasPain_8_18 = new VasPain_Group_8_18(this.key, required, cond_8younger18);

    //skip following questions for TBflow
    const cond_notTBflow = SurveyEngine.logic.not(
      SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.flow.key, ParticipantFlags.flow.values.TBflow));

    this.T6_I1Kids = new Strength_WeaknessI1Text_Kids(this.key, required, SurveyEngine.logic.and(cond_notTBflow, cond_2younger5));
    this.T6_I2Kids = new Strength_WeaknessI2Text_Kids(this.key, required, SurveyEngine.logic.and(cond_notTBflow, cond_5younger11));
    this.T6_I3Kids = new Strength_WeaknessI3Text_Kids(this.key, required, SurveyEngine.logic.and(cond_notTBflow, cond_11younger18));
    this.SQD3_2_4 = new SQD3_2_4(this.key, required, SurveyEngine.logic.and(cond_notTBflow, cond_2younger5));
    this.SQD3_5_11 = new SQD3_5_11(this.key, required, SurveyEngine.logic.and(cond_notTBflow, cond_5younger11));
    this.SQD3_11_18 = new SQD3_11_18(this.key, required, SurveyEngine.logic.and(cond_notTBflow, cond_11younger18));

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

    this.addItem(this.Pedsql_2_4.get());
    this.addItem(this.Pedsql_5_7.get());
    this.addItem(this.Pedsql_8_12.get());
    this.addItem(this.Pedsql_13_18.get());
    this.addPageBreak();

    this.addItem(this.PedsqlFatigue_2_4.get());
    this.addItem(this.PedsqlFatigue_5_7.get());
    this.addItem(this.PedsqlFatigue_8_12.get());
    this.addItem(this.PedsqlFatigue_13_18.get());
    this.addPageBreak();

    this.addItem(this.VasPain_2_7.get());
    this.addItem(this.VasPain_8_18.get());
    this.addPageBreak();

    this.addItem(this.T6_I1Kids.get());
    this.addItem(this.T6_I2Kids.get());
    this.addItem(this.T6_I3Kids.get());
    this.addItem(this.SQD3_2_4.get());
    this.addItem(this.SQD3_5_11.get());
    this.addItem(this.SQD3_11_18.get());
    this.addPageBreak();

    this.addItem(this.IPQ_Parents.get());
    this.addPageBreak();

    this.addItem(this.EndGroup.get());

  }
}

export const Standardflow_Kids = new Standardflow_KidsDef(applyRequiredQuestions);
