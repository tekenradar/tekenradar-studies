import { SurveyDefinition } from "case-editor-tools/surveys/types";
import { Gender, Residence } from "./questions/demographie";
import { PreviousTickBitesGroup } from "./questions/prevTickBites";
import { IntroWeeklyTB, NumberTickBites2a, NumberTickBites2b, NumberTickBites2c, NumberTickBites2d, NumberTickBites2e, NumberTickBites2f, NumberTickBites2g, NumberTickBitesWeekly, OutroWeeklyTB, RemarkWeeklyTB } from "./questions/weeklyTB";

class WeeklyTB_Def extends SurveyDefinition {
  // TODO:

  T1: IntroWeeklyTB;
  Q1: NumberTickBitesWeekly;
  Q2a: NumberTickBites2a;
  Q2b: NumberTickBites2b;
  Q2c: NumberTickBites2c;
  Q2d: NumberTickBites2d;
  Q2e: NumberTickBites2e;
  Q2f: NumberTickBites2f;
  Q2g: NumberTickBites2g;
  Q3: Residence;
  Q4: Gender;
  G5_6: PreviousTickBitesGroup;
  Q7: OutroWeeklyTB;
  Q8: RemarkWeeklyTB;


  constructor(isRequired?: boolean) {
    super({
      surveyKey: 'WeeklyTB',
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

    const required = isRequired !== undefined ? isRequired : false;
    this.T1 = new IntroWeeklyTB(this.key, required);
    this.Q1 = new NumberTickBitesWeekly(this.key, required);
    this.Q2a = new NumberTickBites2a(this.key, required);
    this.Q2b = new NumberTickBites2b(this.key, required);
    this.Q2c = new NumberTickBites2c(this.key, required);
    this.Q2d = new NumberTickBites2d(this.key, required);
    this.Q2e = new NumberTickBites2e(this.key, required);
    this.Q2f = new NumberTickBites2f(this.key, required);
    this.Q2g = new NumberTickBites2g(this.key, required);
    this.Q3 = new Residence(this.key, required);
    this.Q4 = new Gender(this.key, required);
    this.G5_6 = new PreviousTickBitesGroup(this.key, isRequired);
    this.Q7 = new OutroWeeklyTB(this.key, required);
    this.Q8 = new RemarkWeeklyTB(this.key, required);

  }

  buildSurvey() {
    // TODO:
    this.addItem(this.T1.get());
    this.addItem(this.Q1.get());
    this.addItem(this.Q2a.get());
    this.addItem(this.Q2b.get());
    this.addItem(this.Q2c.get());
    this.addItem(this.Q2d.get());
    this.addItem(this.Q2e.get());
    this.addItem(this.Q2f.get());
    this.addItem(this.Q2g.get());
    this.addItem(this.Q3.get());
    this.addItem(this.Q4.get());
    this.addItem(this. G5_6.get());
    this.addItem(this.Q7.get());
    this.addItem(this.Q8.get());
  }
}

export const WeeklyTB = new WeeklyTB_Def();
