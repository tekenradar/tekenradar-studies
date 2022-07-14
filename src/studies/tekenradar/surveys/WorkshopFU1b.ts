import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { applyRequiredQuestions, surveyKeys } from './globalConstants';
import { FU1bQ1, FU1bQ2 } from './questions/workshopQuestion';
import { Expression } from 'survey-engine/data_types';
import { SurveyEngine } from 'case-editor-tools/surveys';

class WorkshopFU1bDef extends SurveyDefinition {
  FU1bQ1: FU1bQ1; // select box
  FU1bQ2: FU1bQ2; // polar scale

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

    this.FU1bQ1 = new FU1bQ1(this.key, required)
    const condition = SurveyEngine.multipleChoice.any(
      this.FU1bQ1.key,
      //
      this.FU1bQ1.optionKeys.correctAnswer,
      this.FU1bQ1.optionKeys.b,
    );
    this.FU1bQ2 = new FU1bQ2(this.key, condition, required)

  }

  buildSurvey() {
    this.addItem(this.FU1bQ1.get())
    // this.addPageBreak();
    this.addItem(this.FU1bQ2.get())
  }
}

export const WorkshopFU1b = new WorkshopFU1bDef(applyRequiredQuestions);
