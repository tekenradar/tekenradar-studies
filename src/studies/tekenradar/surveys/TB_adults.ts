import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { EMGroup } from './questions/EM';
import { FeverGroup } from './questions/fever';
import { LymeGroup } from './questions/lyme';
import { PDiffGroup } from './questions/PDiff';
import { TickBiteOnlyGroup } from './questions/tickBite';


class TB_adultsDef extends SurveyDefinition {

  Start: PDiffGroup;
  G1: TickBiteOnlyGroup;
  G2: FeverGroup;
  G3: LymeGroup;
  G4: EMGroup;


  constructor() {
    super({
      surveyKey: 'TB_adults',
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

    this.Start = new PDiffGroup(this.key,false);
    this.G1 = new TickBiteOnlyGroup(this.key,false);
    this.G2 = new FeverGroup(this.key,false);
    this.G3 = new LymeGroup(this.key, false);
    this.G4 = new EMGroup(this.key, false);

  }

  buildSurvey() {

    //this.addItem(this.Start.get());
    //this.addItem(this.G1.get());
    //this.addItem(this.G2.get());
    this.addItem(this.G3.get());
    this.addItem(this.G4.get());

  }
}

export const TB_adults = new TB_adultsDef();
