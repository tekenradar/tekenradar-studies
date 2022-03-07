import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { SurveyEngine } from 'case-editor-tools/surveys';
import { Cognition, Fatigue, Pregnant, Qualification, PHQ_15, PHQ_15_FU, AboutTekenradar, StandardText1, BackgroundHeader, GenHealthHeader, SymptomsHeader, FatigueHeader, CognitionHeader } from './questions/standard';
import { Residence, Gender } from './questions/demographie';
import { applyRequiredQuestions, surveyKeys } from './globalConstants';
import { SurveyEndGroup } from './questions/surveyEnd';
import { ParticipantFlags } from '../participantFlags';
import { TicP_Comorbidity, TicP_Group } from './questions/ticp';
import { IPQ } from './questions/ipq';
import { SF36 } from './questions/sf36';


class Standardflow_AdultsDef extends SurveyDefinition {
  H1: BackgroundHeader;
  AboutTekenradar: AboutTekenradar;
  T1: StandardText1;
  Qualification: Qualification;
  P1: Residence;
  P2: Gender;

  H2: GenHealthHeader;
  TicP_Comorbidity: TicP_Comorbidity;

  H3: SymptomsHeader;
  PHQ_15: PHQ_15;
  PHQ_15_FU: PHQ_15_FU;
  Pregnancy: Pregnant;

  SF36: SF36;

  H4: FatigueHeader;
  Q14: Fatigue;

  H5: CognitionHeader;
  Q15: Cognition;

  TicP: TicP_Group;
  IPQ: IPQ;
  EndGroup: SurveyEndGroup;


  constructor(isRequired?: boolean) {
    super({
      surveyKey: surveyKeys.Standardflow_Adults,
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
    this.H1 = new BackgroundHeader(this.key, required);
    this.AboutTekenradar = new AboutTekenradar(this.key, required);
    this.T1 = new StandardText1(this.key, required);
    this.Qualification = new Qualification(this.key, required);

    this.P1 = new Residence(this.key, required, SurveyEngine.logic.not(
      SurveyEngine.participantFlags.hasKey(ParticipantFlags.postalCode.key)
    ));
    this.P2 = new Gender(this.key, required, SurveyEngine.logic.not(
      SurveyEngine.participantFlags.hasKey(ParticipantFlags.genderCategory.key)
    ));

    this.H2 = new GenHealthHeader(this.key, required);
    this.TicP_Comorbidity = new TicP_Comorbidity(this.key, required);

    this.H3 = new SymptomsHeader(this.key, required);
    const isFemale = SurveyEngine.logic.or(
      SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.genderCategory.key, ParticipantFlags.genderCategory.values.female),
      SurveyEngine.singleChoice.any(this.P2.key, this.P2.optionKeys.female)
    );
    this.PHQ_15 = new PHQ_15(this.key, required, isFemale);
    this.PHQ_15_FU = new PHQ_15_FU(this.key, required);
    this.Pregnancy = new Pregnant(this.key, required, isFemale);

    this.SF36 = new SF36(this.key, required);

    this.H4 = new FatigueHeader(this.key, required);
    this.Q14 = new Fatigue(this.key, required);

    this.H5 = new CognitionHeader(this.key, required);
    this.Q15 = new Cognition(this.key, required);

    this.TicP = new TicP_Group(this.key, required);
    this.IPQ = new IPQ(this.key, isRequired);
    this.EndGroup = new SurveyEndGroup(this.key, false)
  }

  buildSurvey() {

    this.addItem(this.H1.get());
    this.addItem(this.AboutTekenradar.get());
    this.addItem(this.T1.get());
    this.addItem(this.Qualification.get());
    this.addItem(this.P1.get());
    this.addItem(this.P2.get());
    this.addPageBreak();

    this.addItem(this.H2.get());
    this.addItem(this.TicP_Comorbidity.get());
    this.addPageBreak();

    this.addItem(this.H3.get());
    this.addItem(this.PHQ_15.get());
    this.addItem(this.PHQ_15_FU.get());
    this.addItem(this.Pregnancy.get());
    this.addPageBreak();

    this.addItem(this.SF36.get());
    this.addPageBreak();

    this.addItem(this.H4.get());
    this.addItem(this.Q14.get());
    this.addPageBreak();

    this.addItem(this.H5.get());
    this.addItem(this.Q15.get());
    this.addPageBreak();

    this.addItem(this.TicP.get());
    this.addPageBreak();

    this.addItem(this.IPQ.get());
    this.addPageBreak();

    this.addItem(this.EndGroup.get());
  }
}

export const Standardflow_Adults = new Standardflow_AdultsDef(applyRequiredQuestions);
