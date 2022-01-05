import { DetectTickBite, EMTextPDiff, EMTickBite, FeverTickBite, IntroPDiff, LymeTickBite1, LymeTickBite2, MedicationLyme } from './questions/PDiffQuestions'
import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { SurveyEngine } from 'case-editor-tools/surveys';
import { Age } from './questions/demographie';
import { FunctioningText } from './questions/standard';

export class PDiffDef extends SurveyDefinition {

  T1: IntroPDiff;
  Q1: DetectTickBite;
  Q2: FeverTickBite;
  T2: EMTextPDiff;
  Q3: EMTickBite;
  Q4: LymeTickBite1;
  Q5: LymeTickBite2;
  Q6: MedicationLyme;
  Q7: Age;


  constructor(isRequired?: boolean) {
    super({
      surveyKey: 'PDiff',
      name: new Map([
        ['en', 'Test']
      ]),
      description: new Map([
        ['en', 'Test']
      ]),
      durationText: new Map([
        ['en', 'Test']
      ]),
      availableFor: 'public',
    });

    const required = isRequired !== undefined ? isRequired : false;

    this.T1 = new IntroPDiff(this.key, required);
    this.Q1 = new DetectTickBite(this.key, required);
    const q1Condition = SurveyEngine.singleChoice.any(this.Q1.key, this.Q1.optionKeys.yes);

    this.Q2 = new FeverTickBite(this.key, required, q1Condition);
    this.T2 = new EMTextPDiff(this.key, required);
    this.Q3 = new EMTickBite(this.key, required);
    this.Q4 = new LymeTickBite1(this.key, required);
    const q4Condition = SurveyEngine.singleChoice.any(this.Q4.key, this.Q4.optionKeys.yes);

    this.Q5 = new LymeTickBite2(this.key, required, q4Condition);
    this.Q6 = new MedicationLyme(this.key, required, q4Condition);
    this.Q7 = new Age(this.key, required);
  }


  buildSurvey() {

    this.addItem(this.T1.get());
    this.addItem(this.Q1.get());
    this.addItem(this.Q2.get());
    this.addItem(this.T2.get());
    this.addItem(this.Q3.get());
    this.addItem(this.Q4.get());
    this.addItem(this.Q5.get());
    this.addItem(this.Q6.get());
    this.addItem(this.Q7.get());
  }

}


export const PDiff = new PDiffDef(false);
