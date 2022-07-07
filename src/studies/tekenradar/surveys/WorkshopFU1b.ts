import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { applyRequiredQuestions, surveyKeys } from './globalConstants';

class WorkshopFU1bDef extends SurveyDefinition {
  constructor(isRequired?: boolean) {
    super({
      surveyKey: surveyKeys.WorkshopFU1b,
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

  }

  buildSurvey() {


  }
}

export const WorkshopFU1b = new WorkshopFU1bDef(applyRequiredQuestions);
