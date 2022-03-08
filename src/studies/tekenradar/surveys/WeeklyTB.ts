import { SurveyEngine } from "case-editor-tools/surveys";
import { SurveyDefinition } from "case-editor-tools/surveys/types";
import { Gender, Residence } from "./questions/demographie";
import { PreviousTickBitesGroup } from "./questions/prevTickBites";
import { IntroWeeklyTB, IntroWeeklyTBInit, NumberTickBites2a, NumberTickBites2b, NumberTickBites2c, NumberTickBites2d, NumberTickBites2e, NumberTickBites2f, NumberTickBites2g, NumberTickBitesWeekly } from "./questions/weeklyTB";
import { ParticipantFlags } from '../participantFlags';
import { applyRequiredQuestions } from "./globalConstants";
import { SurveyEndGroup } from "./questions/surveyEnd";
import { surveyKeys } from "./globalConstants";

class WeeklyTB_Def extends SurveyDefinition {

  T1_init: IntroWeeklyTBInit;
  T1: IntroWeeklyTB;
  Q1: NumberTickBitesWeekly;
  Q2a: NumberTickBites2a;
  Q2b: NumberTickBites2b;
  Q2c: NumberTickBites2c;
  Q2d: NumberTickBites2d;
  Q2e: NumberTickBites2e;
  Q2f: NumberTickBites2f;
  Q2g: NumberTickBites2g;
  P1: Residence;
  P2: Gender;
  PTB: PreviousTickBitesGroup;
  EndGroup: SurveyEndGroup;


  constructor(isRequired?: boolean) {
    super({
      surveyKey: surveyKeys.WeeklyTB,
      name: new Map([
        ['nl', 'Wekelijkse tekenbeetvragenlijst']
      ]),
      description: new Map([
        ['nl', 'Klik hier om wekelijks je aantal tekenbeten door te geven.']
      ]),
      durationText: new Map([
        ['nl', 'Invullen duurt ongeveer 1 minuut.']
      ]),
      availableFor: 'temporary_participants',
      requireLoginBeforeSubmission: true,
    });


    const InitCond = SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.weeklyTBreporter.key, ParticipantFlags.weeklyTBreporter.values.init);
    const required = isRequired !== undefined ? isRequired : false;
    this.T1_init = new IntroWeeklyTBInit(this.key, required, InitCond);
    this.T1 = new IntroWeeklyTB(this.key, required, SurveyEngine.logic.not(InitCond));
    this.Q1 = new NumberTickBitesWeekly(this.key, required);
    const Q1cond = SurveyEngine.compare.gt(SurveyEngine.getResponseValueAsNum(this.Q1.key, 'rg.num'), 0);
    this.Q2a = new NumberTickBites2a(this.key, required, Q1cond);
    this.Q2b = new NumberTickBites2b(this.key, required, Q1cond);
    this.Q2c = new NumberTickBites2c(this.key, required, Q1cond);
    this.Q2d = new NumberTickBites2d(this.key, required, Q1cond);
    this.Q2e = new NumberTickBites2e(this.key, required, Q1cond);
    this.Q2f = new NumberTickBites2f(this.key, required, Q1cond);
    this.Q2g = new NumberTickBites2g(this.key, required, Q1cond);

    this.P1 = new Residence(this.key, required, SurveyEngine.logic.not(
      SurveyEngine.participantFlags.hasKey(ParticipantFlags.postalCode.key)
    ));
    this.P2 = new Gender(this.key, required, SurveyEngine.logic.not(
      SurveyEngine.participantFlags.hasKey(ParticipantFlags.genderCategory.key)
    ));

    // Show only in first weekly report:
    this.PTB = new PreviousTickBitesGroup(this.key, isRequired, SurveyEngine.logic.not(
      SurveyEngine.participantFlags.hasKey(ParticipantFlags.tbExposure.key)
    ));

    this.EndGroup = new SurveyEndGroup(this.key, false, undefined);
  }

  buildSurvey() {

    this.addItem(this.T1_init.get());
    this.addItem(this.T1.get());
    this.addItem(this.Q1.get());
    this.addItem(this.Q2a.get());
    this.addItem(this.Q2b.get());
    this.addItem(this.Q2c.get());
    this.addItem(this.Q2d.get());
    this.addItem(this.Q2e.get());
    this.addItem(this.Q2f.get());
    this.addItem(this.Q2g.get());
    this.addItem(this.P1.get());
    this.addItem(this.P2.get());
    this.addItem(this.PTB.get());
    this.addPageBreak();
    this.addItem(this.EndGroup.get());
  }
}

export const WeeklyTB = new WeeklyTB_Def(applyRequiredQuestions);
