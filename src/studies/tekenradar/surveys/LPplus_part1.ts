import { StudyEngine } from 'case-editor-tools/expression-utils/studyEngineExpressions';
import { SurveyEngine } from 'case-editor-tools/surveys';
import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { ParticipantFlags } from '../participantFlags';
import { applyRequiredQuestions } from './globalConstants';
import { PreviousTickBitesGroup, PrevTBHeader } from './questions/prevTickBites';
import { CovidHeader, Covid1, Covid2, Covid3, Covid4, Covid5 } from './questions/CovidQuestions';
import {
  NwEMLymeHeader, NwEMLyme1, NwEMLyme2, NwEMLyme3, NwEMLyme4,
  NwEMLyme5, NwEMLyme6, NwEMLyme7, NwEMLyme8, NwEMLyme9, NwEMLyme10, NwEMLyme11, NwEMLyme12
} from './questions/NwEMLyme';
import {
  PHQ_15, Qualification, StandardText1, BackgroundHeader, PHQ_15_FU, Pregnant,
  SymptomsHeader, Fatigue, FatigueHeader, Cognition, CognitionHeader,
} from './questions/standard';
import { TicP_Comorbidity } from './questions/ticp';
import { Medication1, Medication2 } from './questions/medication';
import { SF36 } from './questions/sf36';



class LPplus_part1Def extends SurveyDefinition {
  PTBT: PrevTBHeader;
  PTB: PreviousTickBitesGroup;
  NELH: NwEMLymeHeader;
  NEL1: NwEMLyme1;
  //TODO in de multiplechoice van NEL1 moet nog een afhankelijkheid komen om te zorgen dat als men NEE aanvinkt, dat de andere twee dan uitgevinkt worden en andersom
  NEL2: NwEMLyme2;
  NEL3: NwEMLyme3;
  NEL4: NwEMLyme4;
  NEL5: NwEMLyme5;
  NEL6: NwEMLyme6;
  NEL7: NwEMLyme7;
  NEL8: NwEMLyme8;
  NEL9: NwEMLyme9;
  NEL10: NwEMLyme10;
  NEL11: NwEMLyme11;
  NEL12: NwEMLyme12;
  COVH: CovidHeader;
  COV1: Covid1;
  COV2: Covid2;
  COV3: Covid3;
  COV4: Covid4;
  COV5: Covid5;
  H1: BackgroundHeader;
  T1: StandardText1;
  Qualification: Qualification;
  TicP_comorbidity: TicP_Comorbidity;
  Med1: Medication1;
  Med2: Medication2;
  H3: SymptomsHeader;
  PHQ_15: PHQ_15;
  PHQ_15_FU: PHQ_15_FU;
  //TODO hier moeten ook de vragenover corona etc toegevoegd worden
  Pregnancy: Pregnant;
  H4: FatigueHeader;
  Q14: Fatigue;

  H5: CognitionHeader;
  Q15: Cognition;

  SF36: SF36;

  //eind part 1




  //start vragenlijst opzet

  //eerst het ticket
  constructor(isRequired?: boolean) {
    super({
      surveyKey: 'LPplus_part1',
      name: new Map([
        ['nl', 'Lyme Prospect Plus Vragenlijst deel 1']
      ]),
      description: new Map([
        ['nl', 'Klik hier om deze vragenlijst af te ronden.']
      ]),
      durationText: new Map([
        ['nl', 'Invullen duurt ongeveer 10-20 minuten.']
      ]),
      availableFor: 'temporary_participants',
    });
    // @Peter: the availableFor value just above most likely needs to be different I gues??

    //flow informatie van de vragenlijst inclusief afhankelijkheden van de vragenlijst
    const required = isRequired !== undefined ? isRequired : false;
    this.PTBT = new PrevTBHeader(this.key, required);
    this.PTB = new PreviousTickBitesGroup(this.key, required);

    this.NELH = new NwEMLymeHeader(this.key, required);
    this.NEL1 = new NwEMLyme1(this.key, required);
    const NEL1notnoCondition = SurveyEngine.multipleChoice.any(this.NEL1.key, this.NEL1.optionKeys.em, this.NEL1.optionKeys.lyme);
    const NEL1emCondition = SurveyEngine.multipleChoice.any(this.NEL1.key, this.NEL1.optionKeys.em);
    const NEL1lyCondition = SurveyEngine.multipleChoice.any(this.NEL1.key, this.NEL1.optionKeys.lyme);
    this.NEL2 = new NwEMLyme2(this.key, required, NEL1notnoCondition);
    this.NEL3 = new NwEMLyme3(this.key, required, NEL1emCondition);
    this.NEL4 = new NwEMLyme4(this.key, required, NEL1emCondition);
    const NEL4Condition = SurveyEngine.singleChoice.any(this.NEL4.key, this.NEL4.optionKeys.yes);
    this.NEL5 = new NwEMLyme5(this.key, required, NEL4Condition);
    this.NEL6 = new NwEMLyme6(this.key, required, NEL4Condition);
    this.NEL7 = new NwEMLyme7(this.key, required, NEL4Condition);
    const NEL7Condition = SurveyEngine.singleChoice.any(this.NEL7.key, this.NEL7.optionKeys.yes);
    this.NEL8 = new NwEMLyme8(this.key, required, NEL7Condition);
    this.NEL9 = new NwEMLyme9(this.key, required, NEL1lyCondition);
    const NEL9Condition = SurveyEngine.singleChoice.any(this.NEL9.key, this.NEL9.optionKeys.yes);
    this.NEL10 = new NwEMLyme10(this.key, required, NEL9Condition);
    this.NEL11 = new NwEMLyme11(this.key, required, NEL9Condition);
    const NEL11Condition = SurveyEngine.singleChoice.any(this.NEL11.key, this.NEL11.optionKeys.yes)
    this.NEL12 = new NwEMLyme12(this.key, required, NEL11Condition);

    this.COVH = new CovidHeader(this.key, required);
    this.COV1 = new Covid1(this.key, required);
    const COV1Condition = SurveyEngine.singleChoice.any(this.COV1.key, this.COV1.optionKeys.yes);
    this.COV2 = new Covid2(this.key, required, COV1Condition);
    this.COV3 = new Covid3(this.key, required, COV1Condition);
    this.COV4 = new Covid4(this.key, required, COV1Condition);
    const COV4Condition = SurveyEngine.singleChoice.any(this.COV4.key, this.COV4.optionKeys.no);
    this.COV5 = new Covid5(this.key, required, COV4Condition);

    this.H1 = new BackgroundHeader(this.key, required);
    this.T1 = new StandardText1(this.key, required);
    this.Qualification = new Qualification(this.key, required);

    this.TicP_comorbidity = new TicP_Comorbidity(this.key, required);
    this.Med1 = new Medication1(this.key, required)
    const Med1Condition = SurveyEngine.singleChoice.any(this.Med1.key, this.Med1.optionKeys.yes);
    this.Med2 = new Medication2(this.key, required, Med1Condition)

    this.H3 = new SymptomsHeader(this.key, required);
    const isFemale = SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.genderCategory.key, ParticipantFlags.genderCategory.values.female);
    this.PHQ_15 = new PHQ_15(this.key, required, isFemale);
    this.PHQ_15_FU = new PHQ_15_FU(this.key, required);
    this.Pregnancy = new Pregnant(this.key, required, isFemale);

    this.H4 = new FatigueHeader(this.key, required);
    this.Q14 = new Fatigue(this.key, required);

    this.H5 = new CognitionHeader(this.key, required);
    this.Q15 = new Cognition(this.key, required);

    this.SF36 = new SF36(this.key, required);

    //eind part 1

  }

  /// paginering en volgorde van de vragenlijst inclusief pagebreaks
  buildSurvey() {
    this.addItem(this.PTBT.get());
    this.addItem(this.PTB.get());
    this.addPageBreak();

    this.addItem(this.NELH.get());
    this.addItem(this.NEL1.get());
    this.addItem(this.NEL2.get());
    this.addItem(this.NEL3.get());
    this.addItem(this.NEL4.get());
    this.addItem(this.NEL5.get());
    this.addItem(this.NEL6.get());
    this.addItem(this.NEL7.get());
    this.addItem(this.NEL8.get());
    this.addItem(this.NEL9.get());
    this.addItem(this.NEL10.get());
    this.addItem(this.NEL11.get());
    this.addItem(this.NEL12.get());
    this.addPageBreak();

    this.addItem(this.COVH.get());
    this.addItem(this.COV1.get());
    this.addItem(this.COV2.get());
    this.addItem(this.COV3.get());
    this.addItem(this.COV4.get());
    this.addItem(this.COV5.get());
    this.addPageBreak();

    this.addItem(this.Qualification.get());
    this.addPageBreak();
    this.addItem(this.TicP_comorbidity.get());
    this.addItem(this.Med1.get());
    this.addItem(this.Med2.get());
    this.addPageBreak()

    this.addItem(this.H3.get());
    this.addItem(this.PHQ_15.get());
    this.addItem(this.PHQ_15_FU.get());
    this.addItem(this.Pregnancy.get());
    this.addPageBreak();

    this.addItem(this.H4.get());
    this.addItem(this.Q14.get());
    this.addPageBreak();

    this.addItem(this.H5.get());
    this.addItem(this.Q15.get());
    this.addPageBreak();

    this.addItem(this.SF36.get());
    this.addPageBreak();

    //CIS fatigue
    //CFQ
    //SF36
    //eind part 1
  }
}


export const LPplus_part1 = new LPplus_part1Def(applyRequiredQuestions);

