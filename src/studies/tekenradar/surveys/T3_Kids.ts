import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { FeverFU1, FeverFU2, MedicationFU1, MedicationFU2, NewTB, PreviousTickBites3, ReportedTB2, Text1FU, ThreeMonthsText_Kids, MedicationFUText_Kids, FU_LymeDiagGroup } from './questions/followup';
import { QuestionsKids1, QuestionsKids2, PHQ_15, PHQ_15_FU, SymptomsText2_Kids, TextQUKids } from './questions/standard';
import { SurveyEngine } from 'case-editor-tools/surveys';
import { Strength_WeaknessI1Text_Kids, Strength_WeaknessI1_Kids, Strength_WeaknessI2Text_Kids, Strength_WeaknessI2_Kids, Strength_WeaknessI3Text_Kids, Strength_WeaknessI3_Kids } from './questions/standard_Kids';
import { ParticipantFlags } from '../participantFlags';
import { applyRequiredQuestions, surveyKeys } from './globalConstants';
import { SurveyEndGroup } from './questions/surveyEnd';
import { TicP_Group } from './questions/ticp';
import { Pedsql_13_18, Pedsql_2_4, Pedsql_5_7, Pedsql_8_12 } from './questions/pedsql';
import { PedsqlFatigue_13_18, PedsqlFatigue_2_4, PedsqlFatigue_5_7, PedsqlFatigue_8_12 } from './questions/pedsqlFatigue';
import { VasPain_Group_2_7, VasPain_Group_8_18 } from './questions/vasPain';

class T3_KidsDef extends SurveyDefinition {

  T1: ThreeMonthsText_Kids;
  T2: Text1FU
  Q1: NewTB;
  Q2: ReportedTB2;
  Q3: PreviousTickBites3;
  Q4: FeverFU1;
  Q5: FeverFU2;
  FU_LymeDiag: FU_LymeDiagGroup;
  T4: MedicationFUText_Kids;
  Q12: MedicationFU1;
  Q13: MedicationFU2;

  T5: SymptomsText2_Kids;
  Q14: QuestionsKids1;
  Q14_a: QuestionsKids2;
  T6: TextQUKids;
  PHQ_15: PHQ_15;
  PHQ_15_FU: PHQ_15_FU;

  TicP: TicP_Group;

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


  T15_I1: Strength_WeaknessI1Text_Kids;
  T15_I2: Strength_WeaknessI2Text_Kids;
  T15_I3: Strength_WeaknessI3Text_Kids;
  Q31_I1: Strength_WeaknessI1_Kids;
  Q31_I2: Strength_WeaknessI2_Kids;
  Q31_I3: Strength_WeaknessI3_Kids;
  EndGroup: SurveyEndGroup;

  constructor(isRequired?: boolean) {
    super({
      surveyKey: surveyKeys.T3_Kids,
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

    // add 4 and 5 only for TB & EM flow at t=3months
    const showQ4 = SurveyEngine.logic.or(
      SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.flow.key, ParticipantFlags.flow.values.TBflow),
      SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.flow.key, ParticipantFlags.flow.values.EMflow),
    )
    this.Q4 = new FeverFU1(this.key, required, showQ4);
    const Q4condition = SurveyEngine.singleChoice.any(this.Q4.key, this.Q4.optionKeys.yes);
    this.Q5 = new FeverFU2(this.key, required, Q4condition);

    this.FU_LymeDiag = new FU_LymeDiagGroup(this.key, required);

    this.T4 = new MedicationFUText_Kids(this.key, required);
    this.Q12 = new MedicationFU1(this.key, required);

    //TODO: I think this is not very elegant. Ask Peter how to do this in a better way (without hardcoding response key)
    const Q12number = SurveyEngine.getResponseValueAsNum(this.Q12.key, 'rg.scg.b.number');
    this.Q13 = new MedicationFU2(this.key, required, Q12number);

    this.T5 = new SymptomsText2_Kids(this.key, required);
    this.Q14 = new QuestionsKids1(this.key, required);
    const Q14condition = SurveyEngine.singleChoice.any(this.Q14.key, this.Q14.optionKeys.parent);
    this.Q14_a = new QuestionsKids2(this.key, required, Q14condition);

    this.T6 = new TextQUKids(this.key, required);
    const isFemale = SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.genderCategory.key, ParticipantFlags.genderCategory.values.female);
    this.PHQ_15 = new PHQ_15(this.key, required, isFemale);
    this.PHQ_15_FU = new PHQ_15_FU(this.key, required);

    this.TicP = new TicP_Group(this.key, required);

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

    this.T15_I1 = new Strength_WeaknessI1Text_Kids(this.key, required, SurveyEngine.logic.and(cond_notTBflow, cond_2younger5));
    this.T15_I2 = new Strength_WeaknessI2Text_Kids(this.key, required, SurveyEngine.logic.and(cond_notTBflow, cond_5younger11));
    this.T15_I3 = new Strength_WeaknessI3Text_Kids(this.key, required, SurveyEngine.logic.and(cond_notTBflow, cond_11younger18));
    this.Q31_I1 = new Strength_WeaknessI1_Kids(this.key, required, SurveyEngine.logic.and(cond_notTBflow, cond_2younger5));
    this.Q31_I2 = new Strength_WeaknessI2_Kids(this.key, required, SurveyEngine.logic.and(cond_notTBflow, cond_5younger11));
    this.Q31_I3 = new Strength_WeaknessI3_Kids(this.key, required, SurveyEngine.logic.and(cond_notTBflow, cond_11younger18));
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

    this.addItem(this.FU_LymeDiag.get());
    this.addPageBreak();

    this.addItem(this.T4.get());
    this.addItem(this.Q12.get());
    this.addItem(this.Q13.get());
    this.addPageBreak();

    this.addItem(this.T5.get());
    this.addItem(this.Q14.get());
    this.addItem(this.Q14_a.get());
    this.addItem(this.T6.get());
    this.addItem(this.PHQ_15.get());
    this.addItem(this.PHQ_15_FU.get());
    this.addPageBreak();

    this.addItem(this.TicP.get());
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

export const T3_Kids = new T3_KidsDef(applyRequiredQuestions);
