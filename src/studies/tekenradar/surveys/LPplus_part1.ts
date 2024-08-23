import { StudyEngine } from 'case-editor-tools/expression-utils/studyEngineExpressions';
import { SurveyEngine } from 'case-editor-tools/surveys';
import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { ParticipantFlags } from '../participantFlags';
import { applyRequiredQuestions, surveyKeys } from './globalConstants';
import { PreviousTickBitesGroup, PrevTBHeader } from './questions/prevTickBites';
import { CovidHeader, Covid1, Covid2, Covid3, Covid4, Covid5 } from './questions/CovidQuestions';
import {
  NwEMLymeHeader, NwEMLyme1, NwEMLyme2, NwEMLyme3, NwEMLyme4,
  NwEMLyme5, NwEMLyme6, NwEMLyme7, NwEMLyme8, NwEMLyme9, NwEMLyme10, NwEMLyme11, NwEMLyme12, NwEMLyme13, NwEMLyme14
} from './questions/NwEMLyme';
import {
  PHQ_15, PHQ_15_cause, PHQ_15_FU2, PHQ_15_FU3, Qualification, StandardText1, BackgroundHeader, PHQ_15_FU, Pregnant,
  SymptomsHeader, Fatigue, FatigueHeader, Cognition, CognitionHeader, GenHealthHeader,
} from './questions/standard';
import { TicP_Comorbidity } from './questions/ticp';
import { Medication1, Medication2 } from './questions/medication';
import { SF36 } from './questions/sf36';
import { LPplusUitnodigingOnderzoek, LPplusUitnodigingOnderzoekConsent, LPplusUitnodigingOnderzoekText, LPplusUitnodigingOnderzoek_q2, UitnodigingOnderzoekText } from './questions/invitationQuestions'
import { EndGroup_LPPlusNP } from './questions/surveyEnd';

//Todo: there are some questins dependent on certain flags: sex, age, participant type, the flags need still be set and then the questions checked.
// the PHQ questionaire is not really pretty at the moment in the sense that in the PHQ_cause question has the option "geen klachten",
// it would be prettier to get this from the questionaire itself, or if not possible using a thing to make "geen" a "single" choice option.

class LPplus_part1Def extends SurveyDefinition {
  // hier moet de IC verklaring voor geplakt worden
  //LPplusInviteGroup: LPplusInviteGroup; //MH LPplus
  //EndGroup: SurveyEndGroup;
  InvitationHeader: LPplusUitnodigingOnderzoekText;
  LPplusUitnodigingOnderzoek: LPplusUitnodigingOnderzoek;
  LPplusUitnodigingOnderzoek_q2: LPplusUitnodigingOnderzoek_q2;
  LPplusUitnodigingOnderzoekConsent: LPplusUitnodigingOnderzoekConsent;
  EndGroup_LPPlusNP: EndGroup_LPPlusNP;
  PTBT: PrevTBHeader;
  PTB: PreviousTickBitesGroup;
  NELH: NwEMLymeHeader;
  NEL1: NwEMLyme1;
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
  NEL13: NwEMLyme13;
  NEL14: NwEMLyme14;

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
  GenH_Header: GenHealthHeader;
  PHQ_15: PHQ_15;
  PHQ_15_cause: PHQ_15_cause
  PHQ_15_FU: PHQ_15_FU;
  PHQ_15_FU2: PHQ_15_FU2;
  PHQ_15_FU3: PHQ_15_FU3;
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
      surveyKey: surveyKeys.LPplus_part1,
      name: new Map([
        ['nl', 'LymeProspect Plus Vragenlijst deel 1']
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
    // MH hier moet de IC ook toegevoegs worden
    this.InvitationHeader = new LPplusUitnodigingOnderzoekText(this.key);
    this.LPplusUitnodigingOnderzoek = new LPplusUitnodigingOnderzoek(this.key, required);
    const LPPCondition = SurveyEngine.singleChoice.any(this.LPplusUitnodigingOnderzoek.key, this.LPplusUitnodigingOnderzoek.optionKeys.yes);
    const LPPgeendeelname = SurveyEngine.singleChoice.any(this.LPplusUitnodigingOnderzoek.key, this.LPplusUitnodigingOnderzoek.optionKeys.no);
    this.LPplusUitnodigingOnderzoek_q2 = new LPplusUitnodigingOnderzoek_q2(this.key, required);
    this.LPplusUitnodigingOnderzoekConsent = new LPplusUitnodigingOnderzoekConsent(this.key, required, LPPCondition);
    this.EndGroup_LPPlusNP = new EndGroup_LPPlusNP(this.key, false, LPPgeendeelname);
    //    this.LPplusInviteGroup = new LPplusInviteGroup(this.key, required, SurveyEngine.logic.and(
    //      SurveyEngine.logic.not(SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.LPplus.key, ParticipantFlags.LPplus.values.likely))), //MH
    //    );
    //    this.LPplusInviteGroup = new LPplusInviteGroup(this.key, required, SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.LPplus.key, ParticipantFlags.LPplus.values.likely)); //MH

    //    this.EndGroup = new SurveyEndGroup(this.key, false, SurveyEngine.logic.and(
    //MH LPplus:
    //      SurveyEngine.logic.not(SurveyEngine.singleChoice.any(this.LPplusInviteGroup.LPplusUitnodigingOnderzoek.key, this.LPplusInviteGroup.LPplusUitnodigingOnderzoek.optionKeys.yes)),
    //SurveyEngine.logic.not(SurveyEngine.singleChoice.any(this.LPplusInviteGroup.BiobankUitnodigingAanvullendOnderzoekConsent.key, this.LPplusInviteGroup.BiobankUitnodigingAanvullendOnderzoek.optionKeys.yes)),
    //   ));

    this.PTBT = new PrevTBHeader(this.key, required, LPPCondition);
    this.PTB = new PreviousTickBitesGroup(this.key, required, LPPCondition);

    this.NELH = new NwEMLymeHeader(this.key, required, LPPCondition);
    this.NEL1 = new NwEMLyme1(this.key, required, LPPCondition);
    const NEL1emCondition = SurveyEngine.singleChoice.any(this.NEL1.key, this.NEL1.optionKeys.em);
    const NEL1lyCondition = SurveyEngine.singleChoice.any(this.NEL1.key, this.NEL1.optionKeys.lyme);
    this.NEL2 = new NwEMLyme2(this.key, required, NEL1emCondition);
    this.NEL3 = new NwEMLyme3(this.key, required, NEL1emCondition);
    this.NEL4 = new NwEMLyme4(this.key, required, NEL1emCondition);
    const NEL4Condition = SurveyEngine.singleChoice.any(this.NEL4.key, this.NEL4.optionKeys.yes);
    this.NEL5 = new NwEMLyme5(this.key, required, NEL4Condition);
    this.NEL6 = new NwEMLyme6(this.key, required, NEL4Condition);
    this.NEL7 = new NwEMLyme7(this.key, required, NEL4Condition);
    const NEL7Condition = SurveyEngine.singleChoice.any(this.NEL7.key, this.NEL7.optionKeys.yes);
    this.NEL8 = new NwEMLyme8(this.key, required, NEL7Condition);
    this.NEL9 = new NwEMLyme9(this.key, required, NEL1lyCondition);
    this.NEL10 = new NwEMLyme10(this.key, required, NEL1lyCondition);
    const NEL10Condition = SurveyEngine.singleChoice.any(this.NEL10.key, this.NEL10.optionKeys.yes);
    this.NEL11 = new NwEMLyme11(this.key, required, NEL10Condition);
    this.NEL12 = new NwEMLyme12(this.key, required, NEL10Condition);
    const NEL12Condition = SurveyEngine.singleChoice.any(this.NEL12.key, this.NEL12.optionKeys.yes)
    this.NEL13 = new NwEMLyme13(this.key, required, NEL12Condition);
    const NEL1number = SurveyEngine.getResponseValueAsNum(this.NEL1.key, `rg.scg.${this.NEL1.optionKeys.yes_number}`);
    this.NEL14 = new NwEMLyme14(this.key, required, NEL1number);


    this.COVH = new CovidHeader(this.key, required, LPPCondition);
    this.COV1 = new Covid1(this.key, required, LPPCondition);
    const COV1Condition = SurveyEngine.singleChoice.any(this.COV1.key, this.COV1.optionKeys.yes);
    this.COV2 = new Covid2(this.key, required, COV1Condition);
    this.COV3 = new Covid3(this.key, required, COV1Condition);
    this.COV4 = new Covid4(this.key, required, COV1Condition);
    const COV4Condition = SurveyEngine.singleChoice.any(this.COV4.key, this.COV4.optionKeys.no);
    this.COV5 = new Covid5(this.key, required, COV4Condition);

    this.H1 = new BackgroundHeader(this.key, required, LPPCondition);
    this.T1 = new StandardText1(this.key, required, LPPCondition);
    this.Qualification = new Qualification(this.key, required, LPPCondition);

    this.GenH_Header = new GenHealthHeader(this.key, required, LPPCondition);
    this.TicP_comorbidity = new TicP_Comorbidity(this.key, required, LPPCondition);
    this.Med1 = new Medication1(this.key, required, LPPCondition)
    const Med1Condition = SurveyEngine.singleChoice.any(this.Med1.key, this.Med1.optionKeys.yes);
    this.Med2 = new Medication2(this.key, required, Med1Condition)

    this.H3 = new SymptomsHeader(this.key, required, LPPCondition);
    const isFemale = SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.genderCategory.key, ParticipantFlags.genderCategory.values.female);
    this.PHQ_15 = new PHQ_15(this.key, required, LPPCondition);
    this.PHQ_15_cause = new PHQ_15_cause(this.key, required, LPPCondition);
    const PHQ15causeLymeCondition = SurveyEngine.multipleChoice.any(this.PHQ_15_cause.key, this.PHQ_15_cause.optionKeys.lyme)
    const PHQ15causeCovidCondition = SurveyEngine.multipleChoice.any(this.PHQ_15_cause.key, this.PHQ_15_cause.optionKeys.covid)
    const PHQ15causeOtherCondition = SurveyEngine.multipleChoice.any(this.PHQ_15_cause.key, this.PHQ_15_cause.optionKeys.other)
    this.PHQ_15_FU = new PHQ_15_FU(this.key, required, PHQ15causeLymeCondition);
    this.PHQ_15_FU2 = new PHQ_15_FU2(this.key, required, PHQ15causeCovidCondition);
    this.PHQ_15_FU3 = new PHQ_15_FU3(this.key, required, PHQ15causeOtherCondition);
    this.Pregnancy = new Pregnant(this.key, required, isFemale);

    this.H4 = new FatigueHeader(this.key, required, LPPCondition);
    this.Q14 = new Fatigue(this.key, required, LPPCondition);

    this.H5 = new CognitionHeader(this.key, required, LPPCondition);
    this.Q15 = new Cognition(this.key, required, LPPCondition);

    this.SF36 = new SF36(this.key, required, LPPCondition);

    //eind part 1

  }

  /// paginering en volgorde van de vragenlijst inclusief pagebreaks
  buildSurvey() {
    //MH IC verklaring hier ook toevoegen
    this.addItem(this.InvitationHeader.get())
    this.addItem(this.LPplusUitnodigingOnderzoek.get());//MH LPplus
    this.addItem(this.LPplusUitnodigingOnderzoek_q2.get());//MH LPplus
    this.addPageBreak();

    this.addItem(this.EndGroup_LPPlusNP.get());
    this.addPageBreak();

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
    this.addItem(this.NEL13.get());
    this.addItem(this.NEL14.get());

    this.addPageBreak();

    this.addItem(this.COVH.get());
    this.addItem(this.COV1.get());
    this.addItem(this.COV2.get());
    this.addItem(this.COV3.get());
    this.addItem(this.COV4.get());
    this.addItem(this.COV5.get());
    this.addPageBreak();

    this.addItem(this.H1.get())
    this.addItem(this.T1.get())
    this.addItem(this.Qualification.get());
    this.addPageBreak();
    this.addItem(this.GenH_Header.get())
    this.addItem(this.TicP_comorbidity.get());
    this.addItem(this.Med1.get());
    this.addItem(this.Med2.get());
    this.addPageBreak()

    this.addItem(this.H3.get());
    this.addItem(this.PHQ_15.get());
    this.addItem(this.PHQ_15_cause.get());
    this.addItem(this.PHQ_15_FU.get());
    this.addItem(this.PHQ_15_FU2.get());
    this.addItem(this.PHQ_15_FU3.get());
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
  }
}


export const LPplus_part1 = new LPplus_part1Def(applyRequiredQuestions);

