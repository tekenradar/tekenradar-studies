import { SurveyEngine } from 'case-editor-tools/surveys';
import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { LymeTherapy1, LymeTherapy2, LymeTherapy4, LymeTherapy5, FormerLymeGroup, LymeDiagnosis1, LymeDiagnosis2, LymeTherapy3 } from './questions/diagnosisTherapy';
import { LymeDiagnosis3, LymeDiagnosis4, LymeDiagnosis5, LymeDiagnosis6, LymeDiagnosis7 } from './questions/lyme';
import { PreviousTickBitesGroup } from './questions/prevTickBites';
import { TickBiteOtherGroup } from './questions/tickBite';


class LBflow_KidsDef extends SurveyDefinition {


  G1_9: TickBiteOtherGroup;

  //TODO: should header be shown?
  //Lyme questions here
  Q10: LymeDiagnosis1;
  Q11: LymeDiagnosis2;
  Q12: LymeDiagnosis3;
  Q13: LymeDiagnosis4;
  Q14: LymeDiagnosis5;
  Q15: LymeDiagnosis6;
  Q16: LymeDiagnosis7;

  Q17: LymeTherapy1;
  Q18: LymeTherapy2;
  Q19: LymeTherapy3;
  Q20: LymeTherapy4;
  Q21: LymeTherapy5;

  //Previous Tick Bites and former lyme disease at the end
  G22_24: FormerLymeGroup;
  G25_26: PreviousTickBitesGroup;

  constructor(isRequired?: boolean) {
    super({
      surveyKey: 'LBflow_Kids',
      name: new Map([
        ['nl', 'Andere lymeziekte melding']
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

    this.G1_9 = new TickBiteOtherGroup(this.key, isRequired);

    this.Q10 = new LymeDiagnosis1(this.key, required);
    const Q10condition = SurveyEngine.singleChoice.any(this.Q10.key, this.Q10.optionKeys.nameOfOption);
    this.Q11 = new LymeDiagnosis2(this.key, required, Q10condition);
    this.Q12 = new LymeDiagnosis3(this.key, required);
    this.Q13 = new LymeDiagnosis4(this.key, required);
    this.Q14 = new LymeDiagnosis5(this.key, required, Q10condition);

    this.Q15 = new LymeDiagnosis6(this.key, required);
    const Q15condition = SurveyEngine.singleChoice.any(this.Q15.key, this.Q15.optionKeys.nameOfOption);
    this.Q16 = new LymeDiagnosis7(this.key, required, Q15condition);

    this.Q17 = new LymeTherapy1(this.key, required);
    const Q17conditionTabletten = SurveyEngine.singleChoice.any(this.Q17.key, this.Q17.optionKeys.nameOfOptionTabletten);
    const Q17conditionInfuus = SurveyEngine.singleChoice.any(this.Q17.key, this.Q17.optionKeys.nameOfOptionInfuus);
    const Q17conditionAnyMed = SurveyEngine.singleChoice.any(this.Q17.key, this.Q17.optionKeys.nameOfOptionTabletten, this.Q17.optionKeys.nameOfOptionInfuus);
    this.Q18 = new LymeTherapy2(this.key, required, Q17conditionTabletten);
    this.Q19 = new LymeTherapy3(this.key, required, Q17conditionInfuus);


    this.Q20 = new LymeTherapy4(this.key, required, Q17conditionAnyMed);
    const Q20condition = SurveyEngine.singleChoice.any(this.Q20.key, this.Q20.optionKeys.nameOfOption);
    this.Q21 = new LymeTherapy5(this.key, required, Q20condition);

    this.G22_24 = new FormerLymeGroup(this.key, isRequired);
    this.G25_26 = new PreviousTickBitesGroup(this.key, isRequired);
  }

  buildSurvey() {

    this.addItem(this.G1_9.get());

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
    this.addItem(this.Q20.get());
    this.addItem(this.Q21.get());

    this.addItem(this.G22_24.get());
    this.addItem(this.G25_26.get());


  }
}

export const LBflow_Kids = new LBflow_KidsDef();
