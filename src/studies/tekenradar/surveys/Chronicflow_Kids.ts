import { StudyEngine } from 'case-editor-tools/expression-utils/studyEngineExpressions';
import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { applyRequiredQuestions } from './globalConstants';
import { ChronicLymeDiagnosis1, ChronicLymeDiagnosis2, ChronicLymeTherapy1, ChronicLymeTherapy2 } from './questions/chronic';
import { LymeDiagnosisGroup } from './questions/diagnosisTherapy';
import { ReportHeader } from './questions/EM';
import { LymeHeader } from './questions/lyme';
import { PreviousTickBitesGroup } from './questions/prevTickBites';
import { TickBiteOtherGroup } from './questions/tickBite';


class Chronicflow_KidsDef extends SurveyDefinition {

  H1: ReportHeader;
  G1_9: TickBiteOtherGroup

  H2: LymeHeader;
  G10_11: LymeDiagnosisGroup;

  Q12: ChronicLymeDiagnosis1;
  Q13: ChronicLymeDiagnosis2;
  Q14: ChronicLymeTherapy1;
  Q15: ChronicLymeTherapy2;

  G16_17: PreviousTickBitesGroup;

  constructor(isRequired?: boolean) {
    super({
      surveyKey: 'Chronicflow_Kids',
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

    this.H1 = new ReportHeader(this.key, required);
    this.G1_9 = new TickBiteOtherGroup(this.key, isRequired);

    this.H2 = new LymeHeader(this.key, required);
    this.G10_11 = new LymeDiagnosisGroup(this.key, isRequired);

    this.Q12 = new ChronicLymeDiagnosis1(this.key, required);
    this.Q13 = new ChronicLymeDiagnosis2(this.key, required);
    this.Q14 = new ChronicLymeTherapy1(this.key, required);
    this.Q15 = new ChronicLymeTherapy2(this.key, required);

    this.G16_17 = new PreviousTickBitesGroup(this.key, isRequired);

    this.editor.setPrefillRules([
      StudyEngine.prefillRules.PREFILL_SLOT_WITH_VALUE(this.G1_9.Q4.key, 'rg.num', 1)
    ])
  }

  buildSurvey() {

    this.addItem(this.H1.get());
    this.addItem(this.G1_9.get());
    this.addPageBreak();

    this.addItem(this.H2.get());
    this.addItem(this.G10_11.get());
    this.addItem(this.Q12.get());
    this.addItem(this.Q13.get());
    this.addItem(this.Q14.get());
    this.addItem(this.Q15.get());
    this.addItem(this.G16_17.get());

  }
}

export const Chronicflow_Kids = new Chronicflow_KidsDef(applyRequiredQuestions);
