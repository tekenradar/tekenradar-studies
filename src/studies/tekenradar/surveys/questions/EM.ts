import { Expression } from 'survey-engine/lib/data_types';
import { Group, Item } from 'case-editor-tools/surveys/types';
import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';
import { TickBiteOtherGroup } from './tickBite';



export class EMGroup extends Group {

  //TODO: tick bite report intro question and condition
  //TODO: intro text (different than EM/Lyme groups)

  G1_9: TickBiteOtherGroup;



  constructor(parentKey: string, isRequired?: boolean) {
      super(parentKey, 'EMG');

      this.G1_9 = new TickBiteOtherGroup(this.key,isRequired);

      
  }

  buildGroup() {

    this.addItem(this.G1_9.get());

    

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
  
  

class EM4 extends Item {

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
  

  //TODO: maybe merge with similar question in tickBite file
  class EM5 extends Item {

    constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
      super(parentKey, 'EM5');
  
      this.isRequired = isRequired;
      this.condition = condition;
    }
  
    buildItem() {
      return SurveyItems.multipleChoice({
        parentKey: this.parentKey,
        itemKey: this.itemKey,
        isRequired: this.isRequired,
        condition: this.condition,
        questionText: new Map([
          ['nl', 'Bij welke arts ben je toen geweest? (meerdere antwoorden mogelijk)'],
        ]),
        responseOptions: [
          {
            key: 'a', role: 'option',
            content: new Map([
              ["nl", "Huisarts"],
            ])
          },
          {
            key: 'b', role: 'option',
            content: new Map([
              ["nl", "Bedrijfsarts"],
            ])
          },
          {
            key: 'c', role: 'option',
            content: new Map([
              ["nl", "Specialist"],
            ])
          },
          {
            key: 'd', role: 'input',
            content: new Map([
              ["nl", "Ander soort arts, namelijk:"],
            ])
          },
        ]
      })
    }
  }
  
  
class EM6 extends Item {

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
  
