import { SurveyDefinition } from 'case-editor-tools/surveys/types';


class ExitFollowUp_Def extends SurveyDefinition {

  constructor(isRequired?: boolean) {
    super({
      surveyKey: 'ExitFollowUp',
      name: new Map([
        ['nl', 'TODO: Wants to quit flow']
      ]),
      description: new Map([
        ['nl', 'Test']
      ]),
      durationText: new Map([
        ['nl', 'Test']
      ]),
    });


    const required = isRequired !== undefined ? isRequired : false;



  }

  buildSurvey() {


  }
}

export const ExitFollowUp = new ExitFollowUp_Def();
