import { SurveyEngine } from 'case-editor-tools/surveys';
import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { applyRequiredQuestions } from './globalConstants';
import { Doctor, LymeTherapy1, LymeTherapy2, LymeTherapy4, LymeTherapy5, FormerLymeGroup } from './questions/diagnosisTherapy';
import { DoctorEM, EM1, EM2, EM3, EM4, EMHeaderKids, EMTextKids, PhotoEM_Text, UploadPhotoEM } from './questions/EM';
import { PreviousTickBitesGroup } from './questions/prevTickBites';
import { TickBiteOtherGroup } from './questions/tickBite';


class EMflow_KidsDef extends SurveyDefinition {

  H1: EMTextKids;
  G1_9: TickBiteOtherGroup;

  H2: EMHeaderKids;
  Q10: EM1;
  Q11: EM2;

  Q12: EM3;
  Q13: DoctorEM;
  Q14: Doctor;
  Q15: EM4;

  Q16: LymeTherapy1;
  Q17: LymeTherapy2;
  Q18: LymeTherapy4;
  Q19: LymeTherapy5;

  G20_22: FormerLymeGroup;
  G23_24: PreviousTickBitesGroup;

  T1: PhotoEM_Text;
  Q25: UploadPhotoEM;

  constructor(isRequired?: boolean) {
    super({
      surveyKey: 'EMflow_Kids',
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
    this.Q10 = new EM1(this.key, required);
    //TODO: if date more than 3 months ago, exclusion from lyme studies by setting flag
    this.Q11 = new EM2(this.key, required);
    //TODO: if option b from EM2 is selected, exclusion from lyme studies by setting flag
    this.Q12 = new EM3(this.key, required);
    //TODO: if EM < 5cm, exclusion from lyme studies by setting flag
    this.Q13 = new DoctorEM(this.key, required);
    const Q13condition = SurveyEngine.singleChoice.any(this.Q13.key, this.Q13.optionKeys.yes);

    this.Q14 = new Doctor(this.key, required, Q13condition);
    this.Q15 = new EM4(this.key, required, Q13condition);
    //TODO: if b from EM4 is selected, exclusion from lyme studies by setting flag

    this.Q16 = new LymeTherapy1(this.key, required);
    ////TODO: if b from LymeTherapy1 is selected, exclusion from lyme studies by setting flag
    const Q16condition = SurveyEngine.singleChoice.any(this.Q16.key, this.Q16.optionKeys.Tabletten);
    this.Q17 = new LymeTherapy2(this.key, required, Q16condition);
    this.Q18 = new LymeTherapy4(this.key, required, Q16condition);
    const Q18condition = SurveyEngine.singleChoice.any(this.Q18.key, this.Q18.optionKeys.yes);
    this.Q19 = new LymeTherapy5(this.key, required, Q18condition);

    this.G20_22 = new FormerLymeGroup(this.key, isRequired);
    this.G23_24 = new PreviousTickBitesGroup(this.key, isRequired);

    this.T1 = new PhotoEM_Text(this.key, required);
    this.Q25 = new UploadPhotoEM(this.key, required);
  }

  buildSurvey() {

    //TODO: same T1a text for kids several times in EMflow
    this.addItem(this.H1.get());
    this.addItem(this.G1_9.get());

    this.addPageBreak();
    this.addItem(this.H2.get());
    this.addItem(this.Q10.get());
    this.addItem(this.Q11.get());
    this.addItem(this.Q12.get());
    this.addItem(this.Q13.get());
    this.addItem(this.Q14.get());
    this.addItem(this.Q15.get());
    this.addItem(this.Q16.get());
    this.addItem(this.Q17.get());
    this.addItem(this.Q18.get());
    this.addItem(this.Q19.get());

    this.addItem(this.G20_22.get());
    this.addItem(this.G23_24.get());

    this.addPageBreak();
    this.addItem(this.T1.get());
    this.addItem(this.Q25.get());
  }
}

export const EMflow_Kids = new EMflow_KidsDef(applyRequiredQuestions);
