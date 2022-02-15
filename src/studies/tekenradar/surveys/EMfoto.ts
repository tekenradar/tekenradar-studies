import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { applyRequiredQuestions } from './globalConstants';
import { PhotoEM_Text, UploadPhotoEM } from './questions/EM';


class EMfoto_Def extends SurveyDefinition {


  T1: PhotoEM_Text;
  Q1: UploadPhotoEM;

  constructor(isRequired?: boolean) {
    super({
      surveyKey: 'EMfoto',
      name: new Map([
        ['nl', 'Foto van rode ring of vlek (erythema migrans) uploaden']
      ]),
      description: new Map([
        ['nl', 'Klik hier om je foto te uploaden']
      ]),
      durationText: new Map([
        ['nl', 'Uploaden duurt minder dan 1 minuut']
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

export const EMfoto = new EMfoto_Def(applyRequiredQuestions);
