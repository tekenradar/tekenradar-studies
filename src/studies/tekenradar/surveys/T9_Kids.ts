import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { MedicationFU1, MedicationFU2, NewTB, PreviousTickBites3, ReportedTB2, Text1FU, ThreeMonthsText_Kids, MedicationFUText_Kids, FU_LymeDiagGroup } from './questions/followup';
import { QuestionsKids1, QuestionsKids2, PHQ_15, PHQ_15_FU, SymptomsText2_Kids, TextQUKids } from './questions/standard';
import { SurveyEngine } from 'case-editor-tools/surveys';
import { PainH1_Kids, PainH2_Kids, PainTextH1_Kids, PainTextH2_Kids, School1H1_Kids, School1H2_Kids, School2H1_Kids, School2H2_Kids, School3H1_Kids, School3H2_Kids } from './questions/standard_Kids';
import { ParticipantFlags } from '../participantFlags';
import { applyRequiredQuestions, surveyKeys } from './globalConstants';
import { SurveyEndGroup } from './questions/surveyEnd';
import { TicP_Group } from './questions/ticp';
import { Pedsql_13_18, Pedsql_2_4, Pedsql_5_7, Pedsql_8_12 } from './questions/pedsql';
import { PedsqlFatigue_13_18, PedsqlFatigue_2_4, PedsqlFatigue_5_7, PedsqlFatigue_8_12 } from './questions/pedsqlFatigue';

class T9_KidsDef extends SurveyDefinition {

  T1: ThreeMonthsText_Kids;
  T2: Text1FU
  Q1: NewTB;
  Q2: ReportedTB2;
  Q3: PreviousTickBites3;

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

  EndGroup: SurveyEndGroup;


  constructor(isRequired?: boolean) {
    super({
      surveyKey: surveyKeys.T9_Kids,
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

    this.EndGroup = new SurveyEndGroup(this.key, false);
  }

  buildSurvey() {

    this.addItem(this.T1.get());
    this.addItem(this.T2.get());
    this.addItem(this.Q1.get());
    this.addItem(this.Q2.get());
    this.addItem(this.Q3.get());
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

    this.addItem(this.EndGroup.get());
  }
}

export const T9_Kids = new T9_KidsDef(applyRequiredQuestions);
