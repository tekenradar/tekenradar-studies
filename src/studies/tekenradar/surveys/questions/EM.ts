import { Expression } from 'survey-engine/lib/data_types';
import { Group, Item } from 'case-editor-tools/surveys/types';
import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';
import { TickBiteOtherGroup } from './tickBite';
import { Doctor, FormerLymeGroup } from './diagnosisTherapy';
import { PreviousTickBitesGroup } from './prevTickBites';
import { LymeTherapy1, LymeTherapy5 } from './lyme';



export class EMGroup extends Group {

  //TODO: tick bite report intro question and condition
  //TODO: intro text (different than EM/Lyme groups)

  G1_9: TickBiteOtherGroup;
  Q10: EM1;
  Q11: EM2;
  Q12: EM3;
  Q13: DoctorEM;
  Q14: Doctor;
  Q15: EM4;

  Q16: LymeTherapy1;
  Q17: LymeTherapy5;



  G17_19: FormerLymeGroup;
  G20_21: PreviousTickBitesGroup;


  //TODO: photo upload and corresponding text

  constructor(parentKey: string, isRequired?: boolean) {
      super(parentKey, 'EMG');

      const required = isRequired !== undefined ? isRequired : false;

      this.G1_9 = new TickBiteOtherGroup(this.key,isRequired);
      this.Q10 = new EM1(this.key,required);
      this.Q11 = new EM2(this.key,required);
      this.Q12 = new EM3(this.key,required);
      this.Q13 = new DoctorEM(this.key,required);
      this.Q14 = new Doctor(this.key,required);
      this.Q15 = new EM4(this.key,required);

      this.Q16 = new LymeTherapy1(this.key,required);
      this.Q17 = new LymeTherapy5(this.key,required);

      this.G17_19 = new FormerLymeGroup(this.key,isRequired);
      this.G20_21 = new PreviousTickBitesGroup(this.key,isRequired);

  }

  buildGroup() {

    //this.addItem(this.G1_9.get());

    this.addItem(this.Q16.get());
    this.addItem(this.Q17.get());

  }
}




//TODO: change name of questions
class EM1 extends Item {


  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'EM1');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Wanneer ontwikkelde zich de huidige erythema migrans die je nu meldt?'],
      ]),
      responseOptions: [
        {//TODO1: correct date mode and 'bij benadering?' after date input.
          //TODO2: exclude patients with date more than 3 months ago?
          key: 'a', role: 'date',
          content: new Map([
            ["nl", "Datum dat de erythema migrans zich ontwikkelde:"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Onbekend"],
          ])
        },
      ]
    })
  }
}


class EM2 extends Item {

    constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
      super(parentKey, 'EM2');
  
      this.isRequired = isRequired;
      this.condition = condition;
    }
  
    buildItem() {
      return SurveyItems.singleChoice({
        parentKey: this.parentKey,
        itemKey: this.itemKey,
        isRequired: this.isRequired,
        condition: this.condition,
        questionText: new Map([
          ['nl', 'Is de erythema migrans op dit moment nog zichtbaar?'],
        ]),
        responseOptions: [
          {
            key: 'a', role: 'option',
            content: new Map([
              ["nl", "Ja"],
            ])
          },
          {
            key: 'b', role: 'option',
            content: new Map([
              ["nl", "Nee"],
            ])
          },
        ]
      })
    }
  }
  

  
class EM3 extends Item {

    constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
      super(parentKey, 'EM3');
  
      this.isRequired = isRequired;
      this.condition = condition;
    }
  
    buildItem() {//NOTE: input instead of dropdown
      return SurveyItems.numericInput({
        parentKey: this.parentKey,
        itemKey: this.itemKey,
        isRequired: this.isRequired,
        condition: this.condition,
        questionText: new Map([
          ['nl', 'Hoe groot is de erythema migrans? Meet hiervoor de doorsnede van de vlek, zie het voorbeeld op de foto. Als de EM niet meer zichtbaar is, maak dan een zo goed mogelijke schatting.'],
        ]),
        titleClassName: 'sticky-top',
        inputMaxWidth: '80px',
        content: new Map([
          ['nl', 'cm']
        ]),
        contentBehindInput: true,
        componentProperties: {
         min: 0,
         max: 100
        }
      })
    }
  }
  
  

class DoctorEM extends Item {

    constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
      super(parentKey, 'EM4');
  
      this.isRequired = isRequired;
      this.condition = condition;
    }
  
    buildItem() {
      return SurveyItems.singleChoice({
        parentKey: this.parentKey,
        itemKey: this.itemKey,
        isRequired: this.isRequired,
        condition: this.condition,
        questionText: new Map([
          ['nl', 'Ben je bij een arts geweest voor je erythema migrans?'],
        ]),
        responseOptions: [
          {
            key: 'a', role: 'option',
            content: new Map([
              ["nl", "Ja"],
            ])
          },
          {
            key: 'b', role: 'option',
            content: new Map([
              ["nl", "Nee"],
            ])
          },
        ]
      })
    }
  }
  
  
  
class EM4 extends Item {

    constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
      super(parentKey, 'EM6');
  
      this.isRequired = isRequired;
      this.condition = condition;
    }
  
    buildItem() {
      return SurveyItems.singleChoice({
        parentKey: this.parentKey,
        itemKey: this.itemKey,
        isRequired: this.isRequired,
        condition: this.condition,
        questionText: new Map([
          ['nl', 'Was de rode ring of vlek volgens je huisarts ontstaan door een tekenbeet?'],
        ]),
        responseOptions: [
          {
            key: 'a', role: 'option',
            content: new Map([
              ["nl", "Ja"],
            ])
          },
          {
            key: 'b', role: 'option',
            content: new Map([
              ["nl", "Nee"],
            ])
          },
        ]
      })
    }
  }
  
