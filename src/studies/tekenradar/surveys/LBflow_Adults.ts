import { StudyEngine } from 'case-editor-tools/expression-utils/studyEngineExpressions';
import { SurveyEngine } from 'case-editor-tools/surveys';
import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { ParticipantFlags } from '../participantFlags';
import { applyRequiredQuestions } from './globalConstants';
import { LymeTherapy1, LymeTherapy2, LymeTherapy4, LymeTherapy5, LymeDiagnosis1, LymeDiagnosis2, LymeTherapy3 } from './questions/diagnosisTherapy';
import { ReportHeader } from './questions/EM';
import { FormerLymeGroup } from './questions/formerLymeGroup';
import { LymeDiagnosis3alt1, LymeDiagnosis3alt2a, LymeDiagnosis3alt2b, LymeDiagnosis3alt2c, LymeDiagnosis3alt2d, LymeDiagnosis4, LymeDiagnosis5, LymeDiagnosis6, LymeDiagnosis7, LymeHeader } from './questions/lyme';
import { PreviousTickBitesGroup } from './questions/prevTickBites';
import { TickBiteOtherGroup } from './questions/tickBite';


class LBflow_AdultsDef extends SurveyDefinition {


  H1: ReportHeader;
  TBOtherG: TickBiteOtherGroup;

  H2: LymeHeader;
  Q10: LymeDiagnosis1;
  Q11: LymeDiagnosis2;
  Q12: LymeDiagnosis3alt1;
  Q12a: LymeDiagnosis3alt2a;
  Q12b: LymeDiagnosis3alt2b;
  Q12c: LymeDiagnosis3alt2c;
  Q12d: LymeDiagnosis3alt2d;
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
  FLG: FormerLymeGroup;
  PTB: PreviousTickBitesGroup;

  constructor(isRequired?: boolean) {
    super({
      surveyKey: 'LBflow_Adults',
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

    this.H1 = new ReportHeader(this.key, required);
    this.TBOtherG = new TickBiteOtherGroup(this.key, isRequired);

    this.H2 = new LymeHeader(this.key, required);
    this.Q10 = new LymeDiagnosis1(this.key, required);
    const Q10condition = SurveyEngine.singleChoice.any(this.Q10.key, this.Q10.optionKeys.yes);
    this.Q11 = new LymeDiagnosis2(this.key, required, Q10condition);
    this.Q12 = new LymeDiagnosis3alt1(this.key, required);
    this.Q12a = new LymeDiagnosis3alt2a(this.key,required, SurveyEngine.multipleChoice.any(this.Q12.key, 'a'));
    this.Q12b = new LymeDiagnosis3alt2b(this.key,required, SurveyEngine.multipleChoice.any(this.Q12.key, 'b'));
    this.Q12c = new LymeDiagnosis3alt2c(this.key,required, SurveyEngine.multipleChoice.any(this.Q12.key, 'c'));
    this.Q12d = new LymeDiagnosis3alt2d(this.key,required, SurveyEngine.multipleChoice.any(this.Q12.key, 'd'));
    this.Q13 = new LymeDiagnosis4(this.key, required);
    this.Q14 = new LymeDiagnosis5(this.key, required, Q10condition);

    this.Q15 = new LymeDiagnosis6(this.key, required);
    const Q15condition = SurveyEngine.singleChoice.any(this.Q15.key, this.Q15.optionKeys.yes);
    this.Q16 = new LymeDiagnosis7(this.key, required, Q15condition);

    this.Q17 = new LymeTherapy1(this.key, required);
    const Q17conditionTabletten = SurveyEngine.singleChoice.any(this.Q17.key, this.Q17.optionKeys.Tabletten);
    const Q17conditionInfuus = SurveyEngine.singleChoice.any(this.Q17.key, this.Q17.optionKeys.Infuus);
    const Q17conditionAnyMed = SurveyEngine.singleChoice.any(this.Q17.key, this.Q17.optionKeys.Tabletten, this.Q17.optionKeys.Infuus);
    this.Q18 = new LymeTherapy2(this.key, required, Q17conditionTabletten);
    this.Q19 = new LymeTherapy3(this.key, required, Q17conditionInfuus);


    this.Q20 = new LymeTherapy4(this.key, required, Q17conditionAnyMed);
    const Q20condition = SurveyEngine.singleChoice.any(this.Q20.key, this.Q20.optionKeys.yes);
    this.Q21 = new LymeTherapy5(this.key, required, Q20condition);

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
    this.addItem(this.Q10.get());
    this.addItem(this.Q11.get());
    this.addItem(this.Q12.get());
    this.addItem(this.Q12a.get());
    this.addItem(this.Q12b.get());
    this.addItem(this.Q12c.get());
    this.addItem(this.Q12d.get());
    this.addItem(this.Q13.get());
    this.addItem(this.Q14.get());
    this.addItem(this.Q15.get());
    this.addItem(this.Q16.get());

    this.addItem(this.Q17.get());
    this.addItem(this.Q18.get());
    this.addItem(this.Q19.get());
    this.addItem(this.Q20.get());
    this.addItem(this.Q21.get());

    this.addItem(this.FLG.get());
    this.addItem(this.PTB.get());
  }
}

export const LBflow_Adults = new LBflow_AdultsDef(applyRequiredQuestions);
