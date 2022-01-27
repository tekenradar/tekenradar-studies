import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { ChronicLymeDiagnosis1, ChronicLymeDiagnosis2, ChronicLymeTherapy1, ChronicLymeTherapy2 } from './questions/chronic';
import { LymeDiagnosisGroup } from './questions/diagnosisTherapy';
import { PreviousTickBitesGroup } from './questions/prevTickBites';
import { TickBiteOtherGroup } from './questions/tickBite';


class Chronicflow_AdultsDef extends SurveyDefinition {

  G1_9: TickBiteOtherGroup

  G10_11: LymeDiagnosisGroup;

  //TODO: should header be shown?
  //Lyme questions here
  Q12: ChronicLymeDiagnosis1;
  Q13: ChronicLymeDiagnosis2;
  Q14: ChronicLymeTherapy1;
  Q15: ChronicLymeTherapy2;

  G16_17: PreviousTickBitesGroup;

  constructor(isRequired?: boolean) {
    super({
      surveyKey: 'Chronicflow_Adults',
      name: new Map([
        ['nl', 'Chronische klachten na lymeziekte melding']
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

    this.G10_11 = new LymeDiagnosisGroup(this.key, isRequired);

    this.Q12 = new ChronicLymeDiagnosis1(this.key, required);
    this.Q13 = new ChronicLymeDiagnosis2(this.key, required);
    this.Q14 = new ChronicLymeTherapy1(this.key, required);
    this.Q15 = new ChronicLymeTherapy2(this.key, required);

    this.G16_17 = new PreviousTickBitesGroup(this.key, isRequired);

  }

  buildSurvey() {

    this.addItem(this.G1_9.get());

    this.addItem(this.G10_11.get());
    this.addItem(this.Q12.get());
    this.addItem(this.Q13.get());
    this.addItem(this.Q14.get());
    this.addItem(this.Q15.get());
    this.addItem(this.G16_17.get());

  }
}

export const Chronicflow_Adults = new Chronicflow_AdultsDef();
