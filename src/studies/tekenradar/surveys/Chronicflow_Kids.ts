import { SurveyEngine } from 'case-editor-tools/surveys';
import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { ChronicGroup, ChronicLymeDiagnosis1, ChronicLymeDiagnosis2, ChronicLymeTherapy1, ChronicLymeTherapy2 } from './questions/chronic';
import { Doctor, LymeTherapy1, LymeTherapy2, LymeTherapy4, LymeTherapy5, FormerLymeGroup, LymeDiagnosis1, LymeDiagnosis2, LymeTherapy3, LymeDiagnosisGroup } from './questions/diagnosisTherapy';
import { DoctorEM, EM1, EM2, EM3, EM4, EMGroup, PhotoEM } from './questions/EM';
import { LymeDiagnosis3, LymeDiagnosis4, LymeDiagnosis5, LymeDiagnosis6, LymeDiagnosis7 } from './questions/lyme';
import { PreviousTickBitesGroup } from './questions/prevTickBites';
import { TickBiteOnlyGroup, TickBiteOtherGroup } from './questions/tickBite';


class Chronicflow_KidsDef extends SurveyDefinition {

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
        surveyKey: 'Chronicflow_Kids',
        name: new Map([
          ['en', 'Test']
        ]),
        description: new Map([
          ['en', 'Test']
        ]),
        durationText: new Map([
          ['en', 'Test']
        ]),
      });

      
      const required = isRequired !== undefined ? isRequired : false;

      this.G1_9 = new TickBiteOtherGroup(this.key,isRequired);

      this.G10_11 = new LymeDiagnosisGroup(this.key,isRequired);
      
      this.Q12 = new ChronicLymeDiagnosis1(this.key,required);
      this.Q13 = new ChronicLymeDiagnosis2(this.key,required);
      this.Q14 = new ChronicLymeTherapy1(this.key,required);
      this.Q15 = new ChronicLymeTherapy2(this.key,required);

      this.G16_17 = new PreviousTickBitesGroup(this.key,isRequired);

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

export const Chronicflow_Kids = new Chronicflow_KidsDef();