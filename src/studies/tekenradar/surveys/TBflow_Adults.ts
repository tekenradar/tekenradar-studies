import { SurveyEngine } from 'case-editor-tools/surveys';
import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { ChronicGroup } from './questions/chronic';
import { EMGroup } from './questions/EM';
import { FeverGroup } from './questions/fever';
import { LymeGroup } from './questions/lyme';
import { TickBiteOnlyGroup } from './questions/tickBite';


class TBflow_AdultsDef extends SurveyDefinition {

  //TODO: maybe better to write questions direct in this survey and not as one TickBiteOnlyGroup?
  G1: TickBiteOnlyGroup;

  constructor(isRequired?: boolean) {
    super({
      surveyKey: 'TBflow_Adults',
      name: new Map([
        ['nl', 'Melden tekenbeet (TB-A)']
      ]),
      description: new Map([
        ['nl', 'TB-flow, questions TB-A-1 through 19']
      ]),
      durationText: new Map([
        ['nl', 'Test']
      ]),
      availableFor: 'temporary_participants',
    });

    this.G1 = new TickBiteOnlyGroup(this.key, isRequired);
  }

  buildSurvey() {

    this.addItem(this.G1.get());

  }
}

export const TBflow_Adults = new TBflow_AdultsDef();
