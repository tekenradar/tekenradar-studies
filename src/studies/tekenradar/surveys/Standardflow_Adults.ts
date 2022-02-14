import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { SurveyEngine } from 'case-editor-tools/surveys';
import { Cognition, Fatigue, Functioning1, Functioning2, Functioning3, Functioning4, Functioning5, FunctioningText, Pregnant, Qualification, Symptoms1, Symptoms2, Symptoms3, Tekenradar, StandardText1, MedCare1, MedCareText1, MedCareText2, MedCare2, MedCareText3, Awareness1, AwarenessText, AwarenessGroup, BackgroundHeader, GenHealthHeader, SymptomsHeader, FatigueHeader, CognitionHeader } from './questions/standard';
import { Residence, Gender } from './questions/demographie';
import { applyRequiredQuestions } from './globalConstants';


class Standardflow_AdultsDef extends SurveyDefinition {

  H1: BackgroundHeader;
  Q1: Tekenradar;
  T1: StandardText1;
  Q2: Qualification;
  Q3: Residence;
  Q4: Gender;

  H2: GenHealthHeader;
  Q5: Symptoms1;

  H3: SymptomsHeader;
  Q6: Symptoms2;
  Q7: Symptoms3;
  Q8: Pregnant;
  T2: FunctioningText;
  Q9: Functioning1;
  Q10: Functioning2;
  Q11: Functioning3;
  Q12: Functioning4;
  Q13: Functioning5;

  H4: FatigueHeader;
  Q14: Fatigue;
  H5: CognitionHeader;
  Q15: Cognition;
  T3: MedCareText1;
  Q16: MedCare1;
  T4: MedCareText2;
  Q17: MedCare2;
  T5: MedCareText3;
  G18_25: AwarenessGroup;


  constructor(isRequired?: boolean) {
    super({
      surveyKey: 'Standardflow_Adults',
      name: new Map([
        ['nl', 'Tekenradarvragenlijst']
      ]),
      description: new Map([
        ['nl', 'Klik hier om je melding af te ronden.']
      ]),
      durationText: new Map([
        ['nl', 'Invullen duurt ongeveer 10 minuten.']
      ]),
      availableFor: 'temporary_participants',
      requireLoginBeforeSubmission: true,
    });


    const required = isRequired !== undefined ? isRequired : false;
    this.H1 = new BackgroundHeader(this.key, required);
    this.Q1 = new Tekenradar(this.key, required);
    this.T1 = new StandardText1(this.key, required);
    this.Q2 = new Qualification(this.key, required);
    this.Q3 = new Residence(this.key, required);
    this.Q4 = new Gender(this.key, required);
    const Q4condition = SurveyEngine.singleChoice.any(this.Q4.key, this.Q4.optionKeys.woman);

    this.H2 = new GenHealthHeader(this.key, required);
    this.Q5 = new Symptoms1(this.key, required);

    this.H3 = new SymptomsHeader(this.key, required);
    this.Q6 = new Symptoms2(this.key, required);
    this.Q7 = new Symptoms3(this.key, required);
    this.Q8 = new Pregnant(this.key, required, Q4condition);

    this.T2 = new FunctioningText(this.key, required);
    this.Q9 = new Functioning1(this.key, required);
    this.Q10 = new Functioning2(this.key, required);
    this.Q11 = new Functioning3(this.key, required);
    this.Q12 = new Functioning4(this.key, required);
    this.Q13 = new Functioning5(this.key, required);

    this.H4 = new FatigueHeader(this.key, required);
    this.Q14 = new Fatigue(this.key, required);

    this.H5 = new CognitionHeader(this.key, required);
    this.Q15 = new Cognition(this.key, required);

    this.T3 = new MedCareText1(this.key, required);
    this.Q16 = new MedCare1(this.key, required);
    const Q16number = SurveyEngine.getResponseValueAsNum(this.Q16.key, 'rg.scg.a');
    this.T4 = new MedCareText2(this.key, required);
    this.Q17 = new MedCare2(this.key, required, Q16number);
    this.T5 = new MedCareText3(this.key, required, Q16number);

    this.G18_25 = new AwarenessGroup(this.key, isRequired);

  }

  buildSurvey() {

    this.addItem(this.H1.get());
    this.addItem(this.Q1.get());
    this.addItem(this.T1.get());
    this.addItem(this.Q2.get());
    this.addItem(this.Q3.get());
    this.addItem(this.Q4.get());

    this.addPageBreak();
    this.addItem(this.H2.get());
    this.addItem(this.Q5.get());

    this.addPageBreak();
    this.addItem(this.H3.get());
    this.addItem(this.Q6.get());
    this.addItem(this.Q7.get());
    this.addItem(this.Q8.get());

    this.addPageBreak();
    this.addItem(this.T2.get());
    this.addItem(this.Q9.get());
    this.addItem(this.Q10.get());
    this.addItem(this.Q11.get());
    this.addItem(this.Q12.get());
    this.addItem(this.Q13.get());

    this.addPageBreak();
    this.addItem(this.H4.get());
    this.addItem(this.Q14.get());

    this.addPageBreak();
    this.addItem(this.H5.get());
    this.addItem(this.Q15.get());

    this.addPageBreak();
    this.addItem(this.T3.get());
    this.addItem(this.Q16.get());
    this.addItem(this.T4.get());
    this.addItem(this.Q17.get());
    this.addItem(this.T5.get());

    this.addPageBreak();
    this.addItem(this.G18_25.get());

  }
}

export const Standardflow_Adults = new Standardflow_AdultsDef(applyRequiredQuestions);
