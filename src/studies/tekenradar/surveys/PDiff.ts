import { DetectTickBite, EMTextPDiff, EMTickBite, FeverTickBite, FlowStartText, IntroPDiff, LymeTickBite1, LymeTickBite2, MedicationLyme, SurveyValidationText, WeeklyFlow, WeeklyFlowPretext } from './questions/PDiffQuestions'
import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { SurveyEngine } from 'case-editor-tools/surveys';
import { Age } from './questions/demographie';
import { applyRequiredQuestions } from './globalConstants';

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
  Q8pretext: WeeklyFlowPretext;
  Q8: WeeklyFlow;
  FS: FlowStartText;
  SV: SurveyValidationText;


  constructor(isRequired?: boolean) {
    super({
      surveyKey: 'PDiff',
      name: new Map([
        ['nl', 'Melding doen']
      ]),
      description: new Map([
        ['nl', 'diff, start all flows, questions D1 through D7']
      ]),
      durationText: new Map([
        ['nl', '']
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
    this.Q8pretext = new WeeklyFlowPretext(this.key);
    this.Q8 = new WeeklyFlow(this.key, required, [
      SurveyEngine.singleChoice.none(this.Q1.key, this.Q1.optionKeys.no),
      SurveyEngine.singleChoice.none(this.Q3.key, this.Q3.optionKeys.no),
      SurveyEngine.singleChoice.none(this.Q4.key, this.Q4.optionKeys.no),
    ]);
    this.SV = new SurveyValidationText(this.key, SurveyEngine.logic.and(
      SurveyEngine.logic.not(SurveyEngine.getSurveyItemValidation(this.Q8.key, 'pdiff')),
      SurveyEngine.hasResponse(this.Q1.key, 'rg'),
      SurveyEngine.hasResponse(this.Q3.key, 'rg'),
      SurveyEngine.hasResponse(this.Q4.key, 'rg'),
      SurveyEngine.hasResponse(this.Q8.key, 'rg'),
    ));

    /**
     * START TEXTS
     */
    const EMFlowActive = SurveyEngine.logic.or(
      SurveyEngine.logic.and(
        SurveyEngine.singleChoice.any(this.Q3.key, this.Q3.optionKeys.yes),
        SurveyEngine.singleChoice.any(this.Q4.key, this.Q4.optionKeys.no),
      ),
      SurveyEngine.logic.and(
        SurveyEngine.singleChoice.any(this.Q3.key, this.Q3.optionKeys.yes),
        SurveyEngine.singleChoice.any(this.Q4.key, this.Q4.optionKeys.yes),
        SurveyEngine.multipleChoice.none(this.Q5.key, this.Q5.optionKeys.andere),
      ),
      SurveyEngine.logic.and(
        SurveyEngine.singleChoice.any(this.Q3.key, this.Q3.optionKeys.yes),
        SurveyEngine.singleChoice.any(this.Q4.key, this.Q4.optionKeys.yes),
        SurveyEngine.multipleChoice.any(this.Q5.key, this.Q5.optionKeys.andere),
        SurveyEngine.singleChoice.any(this.Q6.key, this.Q6.optionKeys.no),
      ),
    );

    const Q6DateInputKey = `rg.scg.${this.Q6.optionKeys.yes.option}.${this.Q6.optionKeys.yes.dateInput}`;
    const getQ6DateValue = () => SurveyEngine.getResponseValueAsNum(this.Q6.key, Q6DateInputKey);

    const LBFlowActive = SurveyEngine.logic.or(
      SurveyEngine.logic.and(
        SurveyEngine.singleChoice.any(this.Q3.key, this.Q3.optionKeys.yes),
        SurveyEngine.singleChoice.any(this.Q4.key, this.Q4.optionKeys.yes),
        SurveyEngine.multipleChoice.any(this.Q5.key, this.Q5.optionKeys.andere),
        SurveyEngine.logic.or(
          SurveyEngine.logic.and(
            SurveyEngine.singleChoice.any(this.Q6.key, this.Q6.optionKeys.yes.option),
            SurveyEngine.compare.gte(
              getQ6DateValue(),
              SurveyEngine.timestampWithOffset({ days: -4 }),
            ),
          ),
          SurveyEngine.singleChoice.any(this.Q6.key, this.Q6.optionKeys.startSoon)
        )
      ),
      SurveyEngine.logic.and(
        SurveyEngine.singleChoice.any(this.Q3.key, this.Q3.optionKeys.no),
        SurveyEngine.singleChoice.any(this.Q4.key, this.Q4.optionKeys.yes),
        // Q5 has no influence here
        SurveyEngine.logic.or(
          SurveyEngine.logic.and(
            SurveyEngine.singleChoice.any(this.Q6.key, this.Q6.optionKeys.yes.option),
            SurveyEngine.compare.gte(
              getQ6DateValue(),
              SurveyEngine.timestampWithOffset({ days: -4 }),
            ),
          ),
          SurveyEngine.singleChoice.any(this.Q6.key, this.Q6.optionKeys.startSoon, this.Q6.optionKeys.no)
        )
      ),
    )

    const Q6dateCondition = SurveyEngine.logic.and(
      SurveyEngine.singleChoice.any(this.Q6.key, this.Q6.optionKeys.yes.option),
      SurveyEngine.logic.or(
        SurveyEngine.compare.lt(
          getQ6DateValue(),
          SurveyEngine.timestampWithOffset({ days: -4 }),
        ),
        // Not defined, aka 0
        SurveyEngine.logic.not(
          SurveyEngine.hasResponse(
            this.Q6.key,
            Q6DateInputKey
          )
        ),
      )
    );


    const ChronicflowActive = SurveyEngine.logic.or(
      SurveyEngine.logic.and(
        SurveyEngine.singleChoice.any(this.Q3.key, this.Q3.optionKeys.yes),
        SurveyEngine.singleChoice.any(this.Q4.key, this.Q4.optionKeys.yes),
        SurveyEngine.multipleChoice.any(this.Q5.key, this.Q5.optionKeys.andere),
        Q6dateCondition
      ),
      SurveyEngine.logic.and(
        SurveyEngine.singleChoice.none(this.Q2.key, this.Q2.optionKeys.yes),
        SurveyEngine.singleChoice.any(this.Q3.key, this.Q3.optionKeys.no),
        SurveyEngine.singleChoice.any(this.Q4.key, this.Q4.optionKeys.yes),
        Q6dateCondition
      )
    );

    const FeverFlowActive = SurveyEngine.logic.and(
      SurveyEngine.compare.gte(
        SurveyEngine.getResponseValueAsNum(this.Q7.key, 'rg.num'),
        18
      ),
      SurveyEngine.logic.or(
        SurveyEngine.logic.and(
          SurveyEngine.singleChoice.any(this.Q1.key, this.Q1.optionKeys.yes),
          SurveyEngine.singleChoice.any(this.Q2.key, this.Q2.optionKeys.yes),
          SurveyEngine.singleChoice.any(this.Q3.key, this.Q3.optionKeys.no),
          SurveyEngine.singleChoice.any(this.Q4.key, this.Q4.optionKeys.no),
        ),
        SurveyEngine.logic.and(
          SurveyEngine.singleChoice.any(this.Q1.key, this.Q1.optionKeys.yes),
          SurveyEngine.singleChoice.any(this.Q2.key, this.Q2.optionKeys.yes),
          SurveyEngine.singleChoice.any(this.Q3.key, this.Q3.optionKeys.no),
          SurveyEngine.singleChoice.any(this.Q4.key, this.Q4.optionKeys.yes),
          SurveyEngine.multipleChoice.any(this.Q5.key, this.Q5.optionKeys.fever),
          SurveyEngine.multipleChoice.none(this.Q5.key, this.Q5.optionKeys.posTest, this.Q5.optionKeys.andere),
        ),
      ));

    this.FS = new FlowStartText(this.key, {
      showItem: SurveyEngine.logic.and(
        SurveyEngine.logic.not(
          SurveyEngine.isLoggedIn()
        ),
        SurveyEngine.logic.or(
          EMFlowActive, LBFlowActive, ChronicflowActive, FeverFlowActive
        ),
      ),
      EMFlowActive: EMFlowActive,
      LBFlowActive: LBFlowActive,
      ChronicflowActive: ChronicflowActive,
      FeverFlowActive: FeverFlowActive,
    })
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
    this.addItem(this.Q8pretext.get());
    this.addItem(this.Q8.get());
    this.addItem(this.SV.get());
    this.addItem(this.Q7.get());
    this.addItem(this.FS.get());
  }
}


export const PDiff = new PDiffDef(applyRequiredQuestions);
