import { StudyEngine } from 'case-editor-tools/expression-utils/studyEngineExpressions';
import { SurveyEngine } from 'case-editor-tools/surveys';
import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { ParticipantFlags } from '../participantFlags';
import { applyRequiredQuestions } from './globalConstants';
import { TicP_Group, TicP_werk1, TicP_werk2, TicP_werk3, TicP_werk4, TicP_werk5, TicP_werk6, TicP_werkHeader } from './questions/ticp';
import { IPAQ_Header, IPAQ } from './questions/ipaq';
import { HADSGroup } from './questions/hads';
import { CBRQ_Header, CBRQ1, CBRQ_Header2, CBRQ2 } from './questions/cbrq';
import { SurveyEndGroup } from './questions/surveyEnd';


class LPplus_part3Def extends SurveyDefinition {
  //zorgconsumptie
  TicP: TicP_Group;
  //werk
  TWHeader: TicP_werkHeader;
  TW1: TicP_werk1;
  TW2: TicP_werk2;
  TW3: TicP_werk3;
  TW4: TicP_werk4;
  TW5: TicP_werk5;
  TW6: TicP_werk6;
  //opvattingen over klachten
  CBRQ_Header: CBRQ_Header
  CBRQ1: CBRQ1
  CBRQ_Header2: CBRQ_Header2
  CBRQ2: CBRQ2
  //angst en depressie
  HADS: HADSGroup;
  //lichamelijke activiteit
  IPAQ_Header: IPAQ_Header
  IPAQ: IPAQ;
  //eind part 3
  EndGroup: SurveyEndGroup;




  //start vragenlijst opzet ==DIT STUKJE IS HET VOORBEELD
  //lijst met achter elkaarv volgende objecten in text =t1 tm ... en vragen Q1 tm..

  //afsluiting van de vragenlijst
  constructor(isRequired?: boolean) {
    super({
      surveyKey: 'LPplus_part3',
      name: new Map([
        ['nl', 'LymeProspect-Plus Vragenlijst deel 3']
      ]),
      description: new Map([
        ['nl', 'Klik hier om deze vragenlijst af te ronden.']
      ]),
      durationText: new Map([
        ['nl', 'Invullen duurt ongeveer 10-20 minuten.']
      ]),
      availableFor: 'temporary_participants',
    });

    // Define the skip condition: Check if ageFromPDiff exists and is greater than 2007
    const skipSurveyCondition = SurveyEngine.compare.lt(
      SurveyEngine.participantFlags.getAsNum('ageFromPDiff'),
      2007 // Skip if birth year is greater than 2006 (younger than 18 in 2024)
    );

    // Flow information for the survey with conditions
    const required = isRequired !== undefined ? isRequired : false;

    this.TicP = new TicP_Group(this.key, required);
    this.TWHeader = new TicP_werkHeader(this.key, required, skipSurveyCondition);
    this.TW1 = new TicP_werk1(this.key, required, skipSurveyCondition);
    const TW1werktCondition = SurveyEngine.logic.and(
      skipSurveyCondition,
      SurveyEngine.singleChoice.any(this.TW1.key, this.TW1.optionKeys.loon, this.TW1.optionKeys.zzp)
    );
    this.TW2 = new TicP_werk2(this.key, required, TW1werktCondition);
    this.TW3 = new TicP_werk3(this.key, required, TW1werktCondition);
    this.TW4 = new TicP_werk4(this.key, required, TW1werktCondition);
    this.TW5 = new TicP_werk5(this.key, required, TW1werktCondition);
    const TW5Condition = SurveyEngine.logic.and(
      skipSurveyCondition,
      SurveyEngine.singleChoice.any(this.TW5.key, this.TW5.optionKeys.yes)
    );
    this.TW6 = new TicP_werk6(this.key, required, TW5Condition);

    const showCBRQ = SurveyEngine.logic.and(
      skipSurveyCondition,
      SurveyEngine.logic.not(
        SurveyEngine.participantFlags.hasKeyAndValue(
          ParticipantFlags.PHQ_15_none.key,
          ParticipantFlags.PHQ_15_none.values.true
        )
      )
    );

    this.CBRQ_Header = new CBRQ_Header(this.key, required, showCBRQ);
    this.CBRQ1 = new CBRQ1(this.key, required, showCBRQ);
    this.CBRQ_Header2 = new CBRQ_Header2(this.key, required, showCBRQ);
    this.CBRQ2 = new CBRQ2(this.key, required, showCBRQ);

    this.HADS = new HADSGroup(this.key, required, skipSurveyCondition);
    this.IPAQ_Header = new IPAQ_Header(this.key, required, skipSurveyCondition);
    this.IPAQ = new IPAQ(this.key, required, skipSurveyCondition);
    this.EndGroup = new SurveyEndGroup(this.key, false);
  }



  /// paginering en volgorde van de vragenlijst inclusief pagebreaks
  buildSurvey() {
    //this.addItem(this.LPP1.get());



    this.addItem(this.TicP.get());
    this.addPageBreak();
    this.addItem(this.TWHeader.get());
    this.addItem(this.TW1.get());
    this.addItem(this.TW2.get());
    this.addItem(this.TW3.get());
    this.addItem(this.TW4.get());
    this.addItem(this.TW5.get());
    this.addItem(this.TW6.get());
    this.addPageBreak();
    this.addItem(this.CBRQ_Header.get());
    this.addItem(this.CBRQ1.get());
    this.addPageBreak();
    this.addItem(this.CBRQ_Header2.get());
    this.addItem(this.CBRQ2.get());
    this.addPageBreak();
    this.addItem(this.HADS.get());
    this.addPageBreak();
    this.addItem(this.IPAQ_Header.get());
    this.addItem(this.IPAQ.get());
    this.addPageBreak();
    this.addItem(this.EndGroup.get());

  }
}


export const LPplus_part3 = new LPplus_part3Def(applyRequiredQuestions);

