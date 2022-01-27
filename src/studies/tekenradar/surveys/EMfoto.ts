import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { PhotoEM_Text, UploadPhotoEM } from './questions/EM';


class EMfoto_Def extends SurveyDefinition {


  T1: PhotoEM_Text;
  Q1: UploadPhotoEM;

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



    this.T1 = new PhotoEM_Text(this.key, required);
    this.Q1 = new UploadPhotoEM(this.key, required);

  }

  buildSurvey() {


    this.addItem(this.T1.get());
    this.addItem(this.Q1.get());
  }
}

export const EMfoto = new EMfoto_Def(true);
