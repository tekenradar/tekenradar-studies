import { StudyEngine } from 'case-editor-tools/expression-utils/studyEngineExpressions';
import { SurveyEngine } from 'case-editor-tools/surveys';
import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { ParticipantFlags } from '../participantFlags';
import { applyRequiredQuestions, surveyKeys } from './globalConstants';
import { Doctor, LymeTherapy1, LymeTherapy2, LymeTherapy4, LymeTherapy5, LymeTherapy6 } from './questions/diagnosisTherapy';
import { DoctorEM, EM_B1, EM_B2, EM_B3, EM_B6, EMHeader, ReportHeader } from './questions/EM';
import { FormerLymeGroup } from './questions/formerLymeGroup';
import { PreviousTickBitesGroup } from './questions/prevTickBites';
import { TickBiteOtherGroup } from './questions/tickBite';


class EMflow_AdultsDef extends SurveyDefinition {

  H1: ReportHeader;
  TBOtherG: TickBiteOtherGroup;

  H2: EMHeader;
  EM_B1: EM_B1;
  EM_B2: EM_B2;

  EM_B3: EM_B3;
  Q13: DoctorEM;
  Q14: Doctor;
  EM_B6: EM_B6;

  Q16: LymeTherapy1;
  Q17: LymeTherapy2;
  Q18: LymeTherapy4;
  Q19: LymeTherapy5;
  Q20: LymeTherapy6;

  FLG: FormerLymeGroup;
  PTB: PreviousTickBitesGroup;


  constructor(isRequired?: boolean) {
    super({
      surveyKey: surveyKeys.EMflow_Adults,
      name: new Map([
        ['nl', 'Erythema migrans melding']
      ]),
      description: new Map([
        ['nl', 'Klik hier om je melding af te ronden.']
      ]),
      durationText: new Map([
        ['nl', 'Invullen duurt ongeveer 10-20 minuten.']
      ]),
      availableFor: 'temporary_participants',
      requireLoginBeforeSubmission: true,
    });

    const required = isRequired !== undefined ? isRequired : false;

    this.H1 = new ReportHeader(this.key, required);
    this.TBOtherG = new TickBiteOtherGroup(this.key, isRequired);

    this.H2 = new EMHeader(this.key, required);
    this.EM_B1 = new EM_B1(this.key, required);
    //TODO: if date more than 3 months ago, exclusion from lyme studies by setting flag
    this.EM_B2 = new EM_B2(this.key, required);
    //TODO: if option b from EM2 is selected, exclusion from lyme studies by setting flag
    this.EM_B3 = new EM_B3(this.key, required);
    //TODO: if EM < 5cm, exclusion from lyme studies by setting flag
    this.Q13 = new DoctorEM(this.key, required);
    const Q13condition = SurveyEngine.singleChoice.any(this.Q13.key, this.Q13.optionKeys.yes);

    this.Q14 = new Doctor(this.key, required, Q13condition);
    this.EM_B6 = new EM_B6(this.key, required, Q13condition);
    //TODO: if b from EM4 is selected, exclusion from lyme studies by setting flag

    this.Q16 = new LymeTherapy1(this.key, required);
    ////TODO: if b from LymeTherapy1 is selected, exclusion from lyme studies by setting flag
    const Q16condition = SurveyEngine.singleChoice.any(this.Q16.key, this.Q16.optionKeys.Tabletten);
    this.Q17 = new LymeTherapy2(this.key, required, Q16condition);
    this.Q18 = new LymeTherapy4(this.key, required, Q16condition);
    const Q18condition = SurveyEngine.singleChoice.any(this.Q18.key, this.Q18.optionKeys.yes);
    this.Q19 = new LymeTherapy5(this.key, required, Q18condition);
    this.Q20 = new LymeTherapy6(this.key, required, Q18condition);

    this.FLG = new FormerLymeGroup(this.key, isRequired);
    this.PTB = new PreviousTickBitesGroup(this.key, isRequired, SurveyEngine.logic.not(
      SurveyEngine.participantFlags.hasKey(ParticipantFlags.tbExposure.key)
    ));

    this.editor.setPrefillRules([
      StudyEngine.prefillRules.PREFILL_SLOT_WITH_VALUE(this.TBOtherG.Q4.key, 'rg.num', 1)
    ])
  }

  buildSurvey() {

    this.addItem(this.H1.get());
    this.addItem(this.TBOtherG.get());

    this.addPageBreak();
    this.addItem(this.H2.get());
    this.addItem(this.EM_B1.get());
    this.addItem(this.EM_B2.get());
    this.addItem(this.EM_B3.get());
    this.addItem(this.Q13.get());
    this.addItem(this.Q14.get());
    this.addItem(this.EM_B6.get());
    this.addItem(this.Q16.get());
    this.addItem(this.Q17.get());
    this.addItem(this.Q18.get());
    this.addItem(this.Q19.get());
    this.addItem(this.Q20.get())
    this.addItem(this.FLG.get());
    this.addItem(this.PTB.get());
  }
}

export const EMflow_Adults = new EMflow_AdultsDef(applyRequiredQuestions);
