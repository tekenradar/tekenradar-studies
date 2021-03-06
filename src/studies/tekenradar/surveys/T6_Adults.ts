import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { LymeDiagnosis2 } from './questions/diagnosisTherapy';
import { LymeDiagnosis3, LymeDiagnosis4, LymeDiagnosis5, LymeDiagnosis6 } from './questions/lyme';
import { FU_LymeDiagGroup, MedicationFU1, MedicationFU2, MedicationHeader, NewTB, PreviousTickBites3, ReportedTB2, Text1FU } from './questions/followup';
import { Cognition, CognitionHeader, Fatigue, FatigueHeader, Pregnant, PHQ_15, PHQ_15_FU, SymptomsHeader } from './questions/standard';
import { SurveyEngine } from 'case-editor-tools/surveys';
import { ParticipantFlags } from '../participantFlags';
import { applyRequiredQuestions, surveyKeys } from './globalConstants';
import { SurveyEndGroup } from './questions/surveyEnd';
import { TicP_Group } from './questions/ticp';
import { SF36 } from './questions/sf36';

class T6_AdultsDef extends SurveyDefinition {

  T1: Text1FU;
  Q1: NewTB;
  Q2: ReportedTB2;
  Q3: PreviousTickBites3;
  FU_LymeDiag: FU_LymeDiagGroup;
  H1: MedicationHeader;
  Q12: MedicationFU1;
  Q13: MedicationFU2;

  H2: SymptomsHeader;
  PHQ_15: PHQ_15;
  PHQ_15_FU: PHQ_15_FU;

  Pregnant: Pregnant;

  SF36: SF36;
  H3: FatigueHeader;
  Q22: Fatigue;
  H4: CognitionHeader;
  Q23: Cognition;

  TicP: TicP_Group;

  EndGroup: SurveyEndGroup;


  constructor(isRequired?: boolean) {
    super({
      surveyKey: surveyKeys.T6_Adults,
      name: new Map([
        ['nl', 'Nieuwe Tekenradar-vragenlijst: 6 maanden']
      ]),
      description: new Map([
        ['nl', 'Zes maanden geleden ben je met het Tekenradar-onderzoek begonnen. Klik hier om naar de vervolgvragenlijst te gaan.']
      ]),
      durationText: new Map([
        ['nl', 'Invullen duurt ongeveer 10 tot 20 minuten.']
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

    this.FU_LymeDiag = new FU_LymeDiagGroup(this.key, required);
    this.H1 = new MedicationHeader(this.key, required);
    this.Q12 = new MedicationFU1(this.key, required);
    //TODO: I think this is not very elegant. Ask Peter how to do this in a better way (without hardcoding response key)
    const Q12number = SurveyEngine.getResponseValueAsNum(this.Q12.key, 'rg.scg.b.number');

    this.Q13 = new MedicationFU2(this.key, required, Q12number);

    this.H2 = new SymptomsHeader(this.key, required);
    const isFemale = SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.genderCategory.key, ParticipantFlags.genderCategory.values.female);
    this.PHQ_15 = new PHQ_15(this.key, required, isFemale);
    this.PHQ_15_FU = new PHQ_15_FU(this.key, required);
    const cond_woman = SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.genderCategory.key, ParticipantFlags.genderCategory.values.female);
    this.Pregnant = new Pregnant(this.key, required, cond_woman);
    this.SF36 = new SF36(this.key, required);

    this.H3 = new FatigueHeader(this.key, required);
    this.Q22 = new Fatigue(this.key, required);

    this.H4 = new CognitionHeader(this.key, required);
    this.Q23 = new Cognition(this.key, required);

    this.TicP = new TicP_Group(this.key, required);
    this.EndGroup = new SurveyEndGroup(this.key, false);

  }

  buildSurvey() {

    this.addItem(this.T1.get());
    this.addItem(this.Q1.get());
    this.addItem(this.Q2.get());
    this.addItem(this.Q3.get());
    this.addPageBreak();

    this.addItem(this.FU_LymeDiag.get());
    this.addPageBreak();

    this.addItem(this.H1.get());
    this.addItem(this.Q12.get());
    this.addItem(this.Q13.get());
    this.addPageBreak();

    this.addItem(this.H2.get());
    this.addItem(this.PHQ_15.get());
    this.addItem(this.PHQ_15_FU.get());
    this.addItem(this.Pregnant.get());
    this.addPageBreak();

    this.addItem(this.SF36.get());
    this.addPageBreak();

    this.addItem(this.H3.get());
    this.addItem(this.Q22.get());
    this.addPageBreak();

    this.addItem(this.H4.get());
    this.addItem(this.Q23.get());
    this.addPageBreak();

    this.addItem(this.TicP.get());
    this.addPageBreak();

    this.addItem(this.EndGroup.get());
  }
}

export const T6_Adults = new T6_AdultsDef(applyRequiredQuestions);
