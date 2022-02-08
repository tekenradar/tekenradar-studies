import { SurveyDefinition } from 'case-editor-tools/surveys/types';


class ExitFollowUp_Def extends SurveyDefinition {

  constructor(isRequired?: boolean) {
    super({
      surveyKey: 'ExitFollowUp',
      name: new Map([
        ['nl', 'Stoppen met vervolgvragenlijsten']
      ]),
      description: new Map([
        ['nl', 'Klik hier om je af te melden voor vragenlijsten']
      ]),
      durationText: new Map([
        ['nl', 'Invullen duurt minder dan 5 minuten']
      ]),
    });


    const required = isRequired !== undefined ? isRequired : false;



  }

  buildSurvey() {


  }
}

export const ExitFollowUp = new ExitFollowUp_Def();
