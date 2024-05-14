import { StudyEngine } from 'case-editor-tools/expression-utils/studyEngineExpressions';
import { SurveyEngine } from 'case-editor-tools/surveys';
import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { ParticipantFlags } from '../participantFlags';
import { applyRequiredQuestions } from './globalConstants';
import { TicP_Group } from './questions/ticp';



class LPplus_part3Def extends SurveyDefinition {

  TicP: TicP_Group;
  //zorgconsumptie
  //werk
  //opvattingen over klachten
  //angst en depressie
  //lichamelijke activiteit
  //eind part 3




  //start vragenlijst opzet ==DIT STUKJE IS HET VOORBEELD
  //lijst met achter elkaarv volgende objecten in text =t1 tm ... en vragen Q1 tm...

  //afsluiting van de vragenlijst
  constructor(isRequired?: boolean) {
    super({
      surveyKey: 'LPplus_part3',
      name: new Map([
        ['nl', 'Lyme Prospect Plus Vragenlijst deel 3']
      ]),
      description: new Map([
        ['nl', 'Klik hier om deze vragenlijst af te ronden.']
      ]),
      durationText: new Map([
        ['nl', 'Invullen duurt ongeveer 10-20 minuten.']
      ]),
      availableFor: 'temporary_participants',
    });
    // @Peter: the availableFor value just above most likely needs to be different I gues??

    //flow informatie van de vragenlijst inclusief afhankelijkheden van de vragenlijst
    const required = isRequired !== undefined ? isRequired : false;
    //this.LPP1 = new IntroLPplus(this.key, required);
    this.TicP = new TicP_Group(this.key, required);

  }



  /// paginering en volgorde van de vragenlijst inclusief pagebreaks
  buildSurvey() {
    //this.addItem(this.LPP1.get());

    this.addItem(this.TicP.get());
    this.addPageBreak();
  }
}


export const LPplus_part3 = new LPplus_part3Def(applyRequiredQuestions);

