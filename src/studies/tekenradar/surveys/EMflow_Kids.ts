import { StudyEngine } from 'case-editor-tools/expression-utils/studyEngineExpressions';
import { SurveyEngine } from 'case-editor-tools/surveys';
import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { applyRequiredQuestions, surveyKeys } from './globalConstants';
import { Doctor, LymeTherapy1, LymeTherapy2, LymeTherapy4, LymeTherapy5, FormerLymeGroup } from './questions/diagnosisTherapy';
import { DoctorEM, EM_B1, EM_B2, EM_B3, EM_B6, EMHeaderKids, EMTextKids } from './questions/EM';
import { PreviousTickBitesGroup } from './questions/prevTickBites';
import { TickBiteOtherGroup } from './questions/tickBite';


class EMflow_KidsDef extends SurveyDefinition {

  H1: EMTextKids;
  G1_9: TickBiteOtherGroup;

  H2: EMHeaderKids;
  EM_B1: EM_B1;
  EM_B2: EM_B2;

  EM_B3: EM_B3;
  Q13: DoctorEM;
  Q14: Doctor;
  EM_B6: EM_B6;

  LT1: LymeTherapy1;
  LT2: LymeTherapy2;
  LT4: LymeTherapy4;
  LT5: LymeTherapy5;

  G20_22: FormerLymeGroup;
  G23_24: PreviousTickBitesGroup;


  constructor(isRequired?: boolean) {
    super({
      surveyKey: surveyKeys.EMflow_Kids,
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

    this.H1 = new EMTextKids(this.key, required);
    this.G1_9 = new TickBiteOtherGroup(this.key, isRequired);
    this.H2 = new EMHeaderKids(this.key, required);
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

    this.LT1 = new LymeTherapy1(this.key, required);
    ////TODO: if b from LymeTherapy1 is selected, exclusion from lyme studies by setting flag
    const Q16condition = SurveyEngine.singleChoice.any(this.LT1.key, this.LT1.optionKeys.Tabletten);
    this.LT2 = new LymeTherapy2(this.key, required, Q16condition);
    this.LT4 = new LymeTherapy4(this.key, required, Q16condition);
    const Q18condition = SurveyEngine.singleChoice.any(this.LT4.key, this.LT4.optionKeys.yes);
    this.LT5 = new LymeTherapy5(this.key, required, Q18condition);

    this.G20_22 = new FormerLymeGroup(this.key, isRequired);
    this.G23_24 = new PreviousTickBitesGroup(this.key, isRequired);

    this.editor.setPrefillRules([
      StudyEngine.prefillRules.PREFILL_SLOT_WITH_VALUE(this.G1_9.Q4.key, 'rg.num', 1)
    ])
  }

  buildSurvey() {


    this.addItem(this.H1.get());
    this.addItem(this.G1_9.get());

    this.addPageBreak();
    this.addItem(this.H2.get());
    this.addItem(this.EM_B1.get());
    this.addItem(this.EM_B2.get());
    this.addItem(this.EM_B3.get());
    this.addItem(this.Q13.get());
    this.addItem(this.Q14.get());
    this.addItem(this.EM_B6.get());
    this.addItem(this.LT1.get());
    this.addItem(this.LT2.get());
    this.addItem(this.LT4.get());
    this.addItem(this.LT5.get());

    this.addItem(this.G20_22.get());
    this.addItem(this.G23_24.get());
  }
}

export const EMflow_Kids = new EMflow_KidsDef(applyRequiredQuestions);
