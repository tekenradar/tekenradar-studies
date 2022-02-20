import { SurveyEngine } from 'case-editor-tools/surveys';
import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { applyRequiredQuestions, surveyKeys } from './globalConstants';
import { FormerLymeGroup, GeneralTherapy1, GeneralTherapy2 } from './questions/diagnosisTherapy';
import { ReportHeader } from './questions/EM';
import { FeverText, FeverSymptom1, FeverSymptom2, FeverSymptom3, FeverSymptom4, FeverSymptom5, FeverSymptom6, FeverSymptom7, FeverTherapy, FeverOtherCause1, FeverOtherCause2, FeverOtherCause3, FeverOtherCause4 } from './questions/fever';
import { PreviousTickBitesGroup } from './questions/prevTickBites';
import { TickBiteOtherGroup } from './questions/tickBite';


class Feverflow_AdultsDef extends SurveyDefinition {

  H1: ReportHeader;
  G1_11: TickBiteOtherGroup;
  G12_14: FormerLymeGroup;
  Q15_a: GeneralTherapy1;
  Q15_b: GeneralTherapy2;

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
      surveyKey: surveyKeys.Feverflow_Adults,
      name: new Map([
        ['nl', 'Koorts na tekenbeetmelding']
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
    this.G1_11 = new TickBiteOtherGroup(this.key, isRequired);
    const Qstartcondition = SurveyEngine.singleChoice.any(this.G1_11.Start.key, this.G1_11.Start.optionKeys.yes);
    this.G12_14 = new FormerLymeGroup(this.key, isRequired, Qstartcondition);
    this.Q15_a = new GeneralTherapy1(this.key, required, Qstartcondition);
    const Q15_a_number = SurveyEngine.getResponseValueAsNum(this.Q15_a.key, 'rg.scg.b');
    this.Q15_b = new GeneralTherapy2(this.key, required, Q15_a_number);

    this.T1 = new FeverText(this.key, required);
    this.Q16 = new FeverSymptom1(this.key, required);
    const Q16condition = SurveyEngine.singleChoice.any(this.Q16.key, this.Q16.optionKeys.yes);
    this.Q17 = new FeverSymptom2(this.key, required, Q16condition);
    this.Q18 = new FeverSymptom3(this.key, required, Q16condition);
    const Q18condition = SurveyEngine.singleChoice.any(this.Q18.key, this.Q18.optionKeys.no);
    this.Q19 = new FeverSymptom4(this.key, required, Q18condition);
    const Q19condition = SurveyEngine.singleChoice.any(this.Q19.key, this.Q19.optionKeys.yes);
    this.Q20 = new FeverSymptom5(this.key, required, Q19condition);
    const Q20condition = SurveyEngine.singleChoice.any(this.Q20.key, this.Q20.optionKeys.yes);


    const Q18_20condition = SurveyEngine.logic.and(Q16condition, SurveyEngine.logic.or(SurveyEngine.logic.not(Q18condition), Q20condition));

    this.Q21 = new FeverSymptom6(this.key, required, Q18_20condition);
    this.Q22 = new FeverSymptom7(this.key, required, Q18_20condition);

    this.Q23 = new FeverTherapy(this.key, required, Q16condition);

    this.Q24 = new FeverOtherCause1(this.key, required);
    //const Q24condition = SurveyEngine.multipleChoice.none(this.Q24.key, this.Q24.optionKeys.nothing);
    const Q24anycondition = SurveyEngine.multipleChoice.any(this.Q24.key, this.Q24.optionKeys.a, this.Q24.optionKeys.b, this.Q24.optionKeys.c, this.Q24.optionKeys.d, this.Q24.optionKeys.e, this.Q24.optionKeys.f, this.Q24.optionKeys.g);
    this.Q25 = new FeverOtherCause2(this.key, required, Q24anycondition);


    this.Q26 = new FeverOtherCause3(this.key, required, Q24anycondition);
    this.Q27 = new FeverOtherCause4(this.key, required);

    this.G28_29 = new PreviousTickBitesGroup(this.key, isRequired)

  }

  buildSurvey() {

    this.addItem(this.H1.get());
    this.addItem(this.G1_11.get());
    this.addItem(this.G12_14.get());
    this.addItem(this.Q15_a.get());
    this.addItem(this.Q15_b.get());
    this.addPageBreak();

    this.addItem(this.T1.get());
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

export const Feverflow_Adults = new Feverflow_AdultsDef(applyRequiredQuestions);
