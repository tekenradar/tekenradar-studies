import { SurveyEngine } from 'case-editor-tools/surveys';
import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { FormerLymeGroup, GeneralTherapy } from './questions/diagnosisTherapy';
import { FeverText, FeverSymptom1, FeverSymptom2, FeverSymptom3, FeverSymptom4, FeverSymptom5, FeverSymptom6, FeverSymptom7, FeverTherapy, FeverOtherCause1, FeverOtherCause2, FeverOtherCause3, FeverOtherCause4 } from './questions/fever';
import { PreviousTickBitesGroup } from './questions/prevTickBites';
import { TickBiteOtherGroup } from './questions/tickBite';


class Feverflow_AdultsDef extends SurveyDefinition {


  G1_11: TickBiteOtherGroup;
  G12_14: FormerLymeGroup;
  Q15: GeneralTherapy;

  T1: FeverText;
  Q16: FeverSymptom1;
  Q17: FeverSymptom2;
  Q18: FeverSymptom3;
  Q19: FeverSymptom4;
  Q20: FeverSymptom5;
  Q21: FeverSymptom6;
  Q22: FeverSymptom7;
  Q23: FeverTherapy;
  Q24: FeverOtherCause1;
  Q25: FeverOtherCause2;
  Q26: FeverOtherCause3;
  Q27: FeverOtherCause4;

  G28_29: PreviousTickBitesGroup;

  constructor(isRequired?: boolean) {
    super({
      surveyKey: 'Feverflow_Adults',
      name: new Map([
        ['nl', 'feverflow adults title']
      ]),
      description: new Map([
        ['nl', 'Test']
      ]),
      durationText: new Map([
        ['nl', 'Test']
      ]),
    });


    const required = isRequired !== undefined ? isRequired : false;

    this.G1_11 = new TickBiteOtherGroup(this.key, isRequired);
    this.G12_14 = new FormerLymeGroup(this.key, isRequired);
    this.Q15 = new GeneralTherapy(this.key, required);

    this.T1 = new FeverText(this.key, required);
    this.Q16 = new FeverSymptom1(this.key, required);
    const Q16condition = SurveyEngine.singleChoice.any(this.Q16.key, this.Q16.optionKeys.nameOfOption);
    this.Q17 = new FeverSymptom2(this.key, required, Q16condition);
    this.Q18 = new FeverSymptom3(this.key, required, Q16condition);
    const Q18condition = SurveyEngine.singleChoice.any(this.Q18.key, this.Q18.optionKeys.nameOfOption);
    this.Q19 = new FeverSymptom4(this.key, required, Q18condition);
    const Q19condition = SurveyEngine.singleChoice.any(this.Q19.key, this.Q19.optionKeys.nameOfOption);
    this.Q20 = new FeverSymptom5(this.key, required, Q19condition);
    const Q20condition = SurveyEngine.singleChoice.any(this.Q20.key, this.Q20.optionKeys.nameOfOption);


    const Q18_20condition = SurveyEngine.logic.or(SurveyEngine.logic.not(Q18condition), Q20condition);

    this.Q21 = new FeverSymptom6(this.key, required, Q18_20condition);
    this.Q22 = new FeverSymptom7(this.key, required, Q18_20condition);

    this.Q23 = new FeverTherapy(this.key, required, Q16condition);

    this.Q24 = new FeverOtherCause1(this.key, required);
    const Q24condition = SurveyEngine.multipleChoice.none(this.Q24.key, this.Q24.optionKeys.nameOfOption);
    this.Q25 = new FeverOtherCause2(this.key, required, Q24condition);
    this.Q26 = new FeverOtherCause3(this.key, required, Q24condition);
    this.Q27 = new FeverOtherCause4(this.key, required, Q24condition);

    this.G28_29 = new PreviousTickBitesGroup(this.key, isRequired)

  }

  buildSurvey() {


    this.addItem(this.G1_11.get());
    this.addItem(this.G12_14.get());
    this.addItem(this.Q15.get());
    this.addItem(this.Q16.get());
    this.addItem(this.Q17.get());
    this.addItem(this.Q18.get());
    this.addItem(this.Q19.get());
    this.addItem(this.Q20.get());
    this.addItem(this.Q21.get());
    this.addItem(this.Q22.get());
    this.addItem(this.Q23.get());
    this.addItem(this.Q24.get());
    this.addItem(this.Q25.get());
    this.addItem(this.Q26.get());
    this.addItem(this.Q27.get());
    this.addItem(this.G28_29.get());

  }
}

export const Feverflow_Adults = new Feverflow_AdultsDef();
