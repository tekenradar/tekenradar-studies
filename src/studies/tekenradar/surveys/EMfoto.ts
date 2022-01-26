import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { PhotoEM } from './questions/EM';


class EMfoto_Def extends SurveyDefinition {


  T1: PhotoEM;

  constructor(isRequired?: boolean) {
    super({
      surveyKey: 'EMfoto',
      name: new Map([
        ['nl', 'Upload a photo']
      ]),
      description: new Map([
        ['nl', 'Test']
      ]),
      durationText: new Map([
        ['nl', 'Test']
      ]),
    });

    const required = isRequired !== undefined ? isRequired : false;



    this.T1 = new PhotoEM(this.key, required);

  }

  buildSurvey() {


    this.addItem(this.T1.get());
    //TODO: upload photo text and example photo here.
  }
}

export const EMfoto = new EMfoto_Def(true);
