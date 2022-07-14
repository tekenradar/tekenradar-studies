import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { applyRequiredQuestions, surveyKeys } from './globalConstants';
import { FU1aQ1, FU1aQ2 } from './questions/workshopQuestion';

class WorkshopFU1aDef extends SurveyDefinition {
  FU1aQ1: FU1aQ1; // select box
  FU1aQ2: FU1aQ2; // likert scale

  constructor(isRequired?: boolean) {
    super({
      surveyKey: surveyKeys.WorkshopFU1a,
      name: new Map([
        ['nl', 'TODO: add survey card title']
      ]),
      description: new Map([
        ['nl', 'TODO: add survey card description']
      ]),
      durationText: new Map([
        ['nl', 'TODO: add survey card additional text']
      ]),
    });

    const required = isRequired !== undefined ? isRequired : false;

    this.FU1aQ1 = new FU1aQ1(this.key, required);
    this.FU1aQ2 = new FU1aQ2(this.key, required);
  }

  buildSurvey() {
    this.addItem(this.FU1aQ1.get())
    this.addItem(this.FU1aQ2.get())

  }
}

export const WorkshopFU1a = new WorkshopFU1aDef(applyRequiredQuestions);
