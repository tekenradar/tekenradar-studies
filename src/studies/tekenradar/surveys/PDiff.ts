import { PDiffGroup } from './questions/PDiffQuestions'
import { SurveyDefinition } from 'case-editor-tools/surveys/types';

export class PDiff extends SurveyDefinition {

    
    G1: PDiffGroup;
    
  
    constructor(parentKey: string, isRequired?: boolean) {
      super({
      surveyKey: 'PDiff',
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
  
      //const required = isRequired !== undefined ? isRequired : false;
  
      this.G1 = new PDiffGroup(this.key, isRequired);

    }
  
  
    buildSurvey() {
  
      this.addItem(this.G1.get());
  
    }
  
  }
  