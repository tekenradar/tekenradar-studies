import { SurveyEngine } from 'case-editor-tools/surveys';
import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { ChronicGroup } from './questions/chronic';
import { EMGroup } from './questions/EM';
import { FeverGroup } from './questions/fever';
import { LymeGroup } from './questions/lyme';
import { TickBiteOnlyGroup } from './questions/tickBite';

/*

class AdultsDef extends SurveyDefinition {

  Start: PDiffGroup;
  G1: TickBiteOnlyGroup;
  G2: EMGroup;
  G3: LymeGroup;
  G4: ChronicGroup;
  G5: FeverGroup;


  constructor() {
    super({
      surveyKey: 'Adults',
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
/* 
    this.Start = new PDiffGroup(this.key, false);

    const rule1 = SurveyEngine.logic.and(
      SurveyEngine.singleChoice.any(this.Start.Q1.key, 'b'),
      SurveyEngine.singleChoice.any(this.Start.Q3.key, 'b'),
      SurveyEngine.singleChoice.any(this.Start.Q4.key, 'b')
    )

    const rule2 = SurveyEngine.logic.and(
      SurveyEngine.singleChoice.any(this.Start.Q1.key, 'a'),
      SurveyEngine.singleChoice.any(this.Start.Q2.key, 'b'),
      SurveyEngine.singleChoice.any(this.Start.Q3.key, 'b'),
      SurveyEngine.singleChoice.any(this.Start.Q4.key, 'b')
    )

    const rule3 = SurveyEngine.logic.or(
      SurveyEngine.logic.and(
        SurveyEngine.singleChoice.any(this.Start.Q3.key, 'a'),
        SurveyEngine.singleChoice.any(this.Start.Q4.key, 'b')
      ),
      SurveyEngine.logic.and(
        SurveyEngine.singleChoice.any(this.Start.Q3.key, 'a'),
        SurveyEngine.singleChoice.any(this.Start.Q4.key, 'a'),
        SurveyEngine.multipleChoice.none(this.Start.Q5.key, 'c'),
      ),
      SurveyEngine.logic.and(
        SurveyEngine.singleChoice.any(this.Start.Q3.key, 'a'),
        SurveyEngine.singleChoice.any(this.Start.Q4.key, 'a'),
        SurveyEngine.multipleChoice.any(this.Start.Q5.key, 'c'),
        SurveyEngine.singleChoice.any(this.Start.Q6.key, 'c')
      )
    )

    const rule4 = SurveyEngine.logic.or(
      SurveyEngine.logic.and(
        SurveyEngine.singleChoice.any(this.Start.Q1.key, 'a'),
        SurveyEngine.singleChoice.any(this.Start.Q2.key, 'a'),
        SurveyEngine.singleChoice.any(this.Start.Q3.key, 'b'),
        SurveyEngine.singleChoice.any(this.Start.Q4.key, 'b')
      ),
      SurveyEngine.logic.and(
        SurveyEngine.singleChoice.any(this.Start.Q1.key, 'a'),
        SurveyEngine.singleChoice.any(this.Start.Q2.key, 'a'),
        SurveyEngine.singleChoice.any(this.Start.Q3.key, 'b'),
        SurveyEngine.singleChoice.any(this.Start.Q4.key, 'a'),
        SurveyEngine.multipleChoice.any(this.Start.Q5.key, 'a'),
        SurveyEngine.multipleChoice.none(this.Start.Q5.key, 'b', 'c')
      )
    )

    const rule5 = SurveyEngine.logic.or(
      SurveyEngine.logic.and(
        SurveyEngine.singleChoice.any(this.Start.Q3.key, 'a'),
        SurveyEngine.singleChoice.any(this.Start.Q4.key, 'a'),
        SurveyEngine.multipleChoice.any(this.Start.Q5.key, 'c'),
        //Pdif6 = a AND <= 4days ago OR b
        //TODO: convert date value to number
        SurveyEngine.logic.or(
          SurveyEngine.logic.and(
            SurveyEngine.singleChoice.any(this.Start.Q6.key, 'a'),
            SurveyEngine.compare.lte(SurveyEngine.singleChoice.getDateValue(this.Start.Q6.key, 'a'), 4)
          ),
          SurveyEngine.singleChoice.any(this.Start.Q6.key, 'b')
        )
      ),
      SurveyEngine.logic.and(
        SurveyEngine.singleChoice.any(this.Start.Q3.key, 'b'),
        SurveyEngine.singleChoice.any(this.Start.Q4.key, 'b'),
        SurveyEngine.multipleChoice.any(this.Start.Q5.key, 'a', 'b', 'c'),
        //Pdif6 = a AND <= 4days ago OR b OR c
        //TODO: convert date value to number
        SurveyEngine.logic.or(
          SurveyEngine.logic.and(
            SurveyEngine.singleChoice.any(this.Start.Q6.key, 'a'),
            SurveyEngine.compare.lte(SurveyEngine.singleChoice.getDateValue(this.Start.Q6.key, 'a'), 4)
          ),
          SurveyEngine.singleChoice.any(this.Start.Q6.key, 'b', 'c')
        )
      )
    )

    const rule6 = SurveyEngine.logic.or(
      SurveyEngine.logic.and(
        SurveyEngine.singleChoice.any(this.Start.Q3.key, 'a'),
        SurveyEngine.singleChoice.any(this.Start.Q4.key, 'a'),
        SurveyEngine.multipleChoice.any(this.Start.Q5.key, 'c'),
        //Pdif6 = a AND > 4days ago OR empty
        //TODO: convert date value to number
        SurveyEngine.logic.and(
          SurveyEngine.singleChoice.any(this.Start.Q6.key, 'a'),
          SurveyEngine.logic.or(
            SurveyEngine.compare.gt(SurveyEngine.singleChoice.getDateValue(this.Start.Q6.key, 'a'), 4),
            SurveyEngine.compare.eq(SurveyEngine.singleChoice.getDateValue(this.Start.Q6.key, 'a'), '')
          )
        )
      ),
      SurveyEngine.logic.and(
        SurveyEngine.singleChoice.any(this.Start.Q2.key, 'b', 'c'),
        SurveyEngine.singleChoice.any(this.Start.Q3.key, 'b'),
        SurveyEngine.singleChoice.any(this.Start.Q4.key, 'a'),
        //Pdif6 = a AND > 4days ago OR empty
        //TODO: convert date value to number
        SurveyEngine.logic.and(
          SurveyEngine.singleChoice.any(this.Start.Q6.key, 'a'),
          SurveyEngine.logic.or(
            SurveyEngine.compare.gt(SurveyEngine.singleChoice.getDateValue(this.Start.Q6.key, 'a'), 4),
            SurveyEngine.compare.eq(SurveyEngine.singleChoice.getDateValue(this.Start.Q6.key, 'a'), '')
          )
        )
      ) 

      //TODO: kids response age here
      //const ruleKids_Adults = SurveyEngine.getResponseValueAsNum(this.Start.Q7.key)

    )

    this.G1 = new TickBiteOnlyGroup(this.key, false, rule2);
    this.G2 = new EMGroup(this.key, false, rule3);
    this.G3 = new LymeGroup(this.key, false, rule5);
    this.G4 = new ChronicGroup(this.key, false, rule6);
    this.G5 = new FeverGroup(this.key, false, rule4);

  }

  buildSurvey() {

    this.addItem(this.Start.get());
    this.addItem(this.G1.get());
    this.addItem(this.G2.get());
    this.addItem(this.G3.get());
    this.addItem(this.G4.get());
    this.addItem(this.G5.get());

  }
}

export const Adults = new AdultsDef();
*/