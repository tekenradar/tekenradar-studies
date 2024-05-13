import { StudyEngine } from 'case-editor-tools/expression-utils/studyEngineExpressions';
import { SurveyEngine } from 'case-editor-tools/surveys';
import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { ParticipantFlags } from '../participantFlags';
import { applyRequiredQuestions } from './globalConstants';
import { PreviousTickBitesGroup } from './questions/prevTickBites';
import { CovidHeader, Covid1, Covid2, Covid3, Covid4, Covid5 } from './questions/CovidQuestions';
import {
  NwEMLymeHeader, NweEMLyme1, NwEMLyme2, NwEMLyme3, NwEMLyme4,
  NwEMLyme5, NwEMLyme6, NwEMLyme7, NweEMLyme8
} from './questions/NwEMLyme';




class LPplus_part1Def extends SurveyDefinition {
  //LPP1: IntroLPplus;
  PTB: PreviousTickBitesGroup;
  NELH: NwEMLymeHeader;
  NEL1: NweEMLyme1;
  NEL2: NwEMLyme2;
  NEL3: NwEMLyme3;
  NEL4: NwEMLyme4;
  NEL5: NwEMLyme5;
  NEL6: NwEMLyme6;
  NEL7: NwEMLyme7;
  NEL8: NweEMLyme8;
  COVH: CovidHeader;
  COV1: Covid1;
  COV2: Covid2;
  COV3: Covid3;
  COV4: Covid4;
  COV5: Covid5;
  //achtergrond
  //TicP
  //medicatie
  //PHQ
  //CIS fatigue
  //CFQ
  //SF36
  //eind part 1




  //start vragenlijst opzet ==DIT STUKJE IS HET VOORBEELD
  //lijst met achter elkaarv volgende objecten in text =t1 tm ... en vragen Q1 tm...

  //afsluiting van de vragenlijst
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
    //this.LPP1 = new IntroLPplus(this.key, required);
    this.PTB = new PreviousTickBitesGroup(this.key, required);
    this.NELH = new NwEMLymeHeader(this.key, required);
    this.NEL1 = new NweEMLyme1(this.key, required);
    this.NEL2 = new NwEMLyme2(this.key, required);
    this.NEL3 = new NwEMLyme3(this.key, required);
    this.NEL4 = new NwEMLyme4(this.key, required);
    this.NEL5 = new NwEMLyme5(this.key, required);
    this.NEL6 = new NwEMLyme6(this.key, required);
    this.NEL7 = new NwEMLyme7(this.key, required);
    this.NEL8 = new NweEMLyme8(this.key, required);
    this.COVH = new CovidHeader(this.key, required);
    this.COV1 = new Covid1(this.key, required);
    this.COV2 = new Covid2(this.key, required);
    this.COV3 = new Covid3(this.key, required);
    this.COV4 = new Covid4(this.key, required);
    this.COV5 = new Covid5(this.key, required);

  }



  //     this.T1 = new IntroTB(this.key, required);
  //      this.Q6 = new RemoveTick1(this.key, required);
  //      const q6Condition = SurveyEngine.singleChoice.any(this.Q6.key, this.Q6.optionKeys.no);
  //      this.Q7 = new RemoveTick2(this.key, required, q6Condition);
  //     this.Q8 = new RemoveTick3(this.key, required, q6Condition);
  //     this.Q9 = new RemoveTick4(this.key, required, q6Condition);
  //      this.H1 = new TBGeneralHeader(this.key, required);
  //      const q15Condition = SurveyEngine.singleChoice.any(this.Q15.key, this.Q15.optionKeys.yes);
  //      this.Q16 = new Doctor(this.key, required, q15Condition);
  //      this.editor.setPrefillRules([
  //        StudyEngine.prefillRules.PREFILL_SLOT_WITH_VALUE(this.Q4.key, 'rg.num', 1)


  /// paginering en volgorde van de vragenlijst inclusief pagebreaks
  buildSurvey() {
    //this.addItem(this.LPP1.get());
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
    this.addItem(this.COVH.get());
    this.addItem(this.COV1.get());
    this.addItem(this.COV2.get());
    this.addItem(this.COV3.get());
    this.addItem(this.COV4.get());
    this.addItem(this.COV5.get());
  }
}


export const LPplus_part1 = new LPplus_part1Def(applyRequiredQuestions);

