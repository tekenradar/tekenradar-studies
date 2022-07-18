import { SurveyEngine } from 'case-editor-tools/surveys';
import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { applyRequiredQuestions, surveyKeys } from './globalConstants';
import { EntryQ1, EntryQ2 } from './questions/workshopQuestion';


class WorkshopEntryDef extends SurveyDefinition {
  Q1: EntryQ1;
  Q2: EntryQ2;


  constructor(isRequired?: boolean) {
    super({
      surveyKey: surveyKeys.WorkshopEntry,
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

    this.Q1 = new EntryQ1(this.key, required);
    this.Q2 = new EntryQ2(this.key, SurveyEngine.singleChoice.any(
      this.Q1.key,
      this.Q1.optionKeys.yes
    ), required);
  }

  buildSurvey() {
    this.addItem(this.Q1.get());
    this.addItem(this.Q2.get());
  }
}

export const WorkshopEntry = new WorkshopEntryDef(applyRequiredQuestions);
