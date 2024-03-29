import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { FU_LymeDiagGroup, MedicationFU1, MedicationFU2, MedicationHeader, NewTB, PreviousTickBites3, ReportedTB2, SymptomsFU, Text1FU } from './questions/followup';
import { Cognition, CognitionHeader, Fatigue, FatigueHeader, GenHealthHeader, Pregnant, PHQ_15, PHQ_15_FU, SymptomsHeader } from './questions/standard';
import { SurveyEngine } from 'case-editor-tools/surveys';
import { ParticipantFlags } from '../participantFlags';
import { applyRequiredQuestions, surveyKeys } from './globalConstants';
import { SurveyEndGroup } from './questions/surveyEnd';
import { TicP_Comorbidity, TicP_Group } from './questions/ticp';
import { SF36 } from './questions/sf36';

class T12_AdultsDef extends SurveyDefinition {

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

  H5: GenHealthHeader;
  TicP_Comorbidity: TicP_Comorbidity;
  Q27: SymptomsFU;
  EndGroup: SurveyEndGroup;


  constructor(isRequired?: boolean) {
    super({
      surveyKey: surveyKeys.T12_Adults,
      name: new Map([
        ['nl', 'Laatste Tekenradar-vragenlijst: 12 maanden']
      ]),
      description: new Map([
        ['nl', 'Twaalf maanden geleden ben je met het Tekenradar-onderzoek begonnen. Klik hier om naar de laatste vervolgvragenlijst te gaan.']
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

    this.addItem(this.H5.get());
    this.addItem(this.TicP_Comorbidity.get());
    this.addItem(this.Q27.get());

    this.addPageBreak();
    this.addItem(this.EndGroup.get());
  }
}

export const T12_Adults = new T12_AdultsDef(applyRequiredQuestions);
