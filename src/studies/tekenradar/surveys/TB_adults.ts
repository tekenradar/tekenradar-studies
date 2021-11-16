import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { TickBiteOnlyGroup } from './questions/tickBite';


class TB_adultsDef extends SurveyDefinition {
  G1: TickBiteOnlyGroup;


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

    this.G1 = new TickBiteOnlyGroup(this.key);

  }

  buildSurvey() {
    this.addItem(this.G1.get());
  }
}

export const TB_adults = new TB_adultsDef();
