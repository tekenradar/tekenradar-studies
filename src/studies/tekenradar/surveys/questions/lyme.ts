import { Expression } from 'survey-engine/lib/data_types';
import { Group, Item } from 'case-editor-tools/surveys/types';
import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';
import { EnvironmentTickBite, ActivityTickBite, PositionTickBite, NumberTickBite, LocationBodyTickBite, RemoveTick2, RemoveTick3, RemoveTick4, DurationTickBite } from './tickBite';
import { PreviousTickBitesGroup } from './prevTickBites'
import { FormerLymeGroup } from './diagnosisTherapy'


export class LymeGroup extends Group {

    //TODO: inital question and inital text
    Q1: EnvironmentTickBite;
    Q2: ActivityTickBite;
    Q3: PositionTickBite;
    Q4: NumberTickBite;
    Q5: LocationBodyTickBite;

    Q6: RemoveTick2;
    Q7: RemoveTick3;
    Q8: RemoveTick4;

    //other question order than TickBite group starts here
    Q9: DurationTickBite;

    //Lyme questions here
    Q10: LymeDiagnosis1;
    Q11: LymeDiagnosis2;
    Q12: LymeDiagnosis3;
    Q13: LymeDiagnosis4;
    Q14: LymeDiagnosis5;
    Q15: LymeDiagnosis6;
    Q16: LymeDiagnosis7;

    Q17: LymeTherapy1;
    Q18: LymeTherapy2;
    Q19: LymeTherapy3;
    Q20: LymeTherapy4;
    Q21: LymeTherapy5;

    //Previous Tick Bites and former lyme disease at the end
    G22_24: FormerLymeGroup;
    G25_26: PreviousTickBitesGroup;



    constructor(parentKey: string) {
        super(parentKey, 'TBG');

        this.Q1 = new EnvironmentTickBite(this.key, false);
        this.Q2 = new ActivityTickBite(this.key, false);
        this.Q3 = new PositionTickBite(this.key, false);
        this.Q4 = new NumberTickBite(this.key, false);
        this.Q5 = new LocationBodyTickBite(this.key, false);
        
        this.Q6 = new RemoveTick2(this.key, false);
        this.Q7 = new RemoveTick3(this.key,false);
        this.Q8 = new RemoveTick4(this.key, false);

        this.Q9 = new DurationTickBite(this.key,false)

        this.Q10 = new LymeDiagnosis1(this.key,false);
        const Q10condition = SurveyEngine.singleChoice.any(this.Q10.key, this.Q10.optionKeys.nameOfOption);
        this.Q11 = new LymeDiagnosis2(this.key,false,Q10condition);
        this.Q12 = new LymeDiagnosis3(this.key,false);
        this.Q13 = new LymeDiagnosis4(this.key,false);
        this.Q14 = new LymeDiagnosis5(this.key,false);
        this.Q15 = new LymeDiagnosis6(this.key,false);
        this.Q16 = new LymeDiagnosis7(this.key,false);

        this.Q17 = new LymeTherapy1(this.key,false);
        this.Q18 = new LymeTherapy2(this.key,false);
        this.Q19 = new LymeTherapy3(this.key,false);
        this.Q20 = new LymeTherapy4(this.key,false);
        this.Q21 = new LymeTherapy5(this.key,false);

        this.G22_24 = new FormerLymeGroup(this.key);
        this.G25_26 = new PreviousTickBitesGroup(this.key);

    }

    buildGroup() {

        this.addItem(this.Q1.get());
        this.addItem(this.Q2.get());
        this.addItem(this.Q3.get());
        this.addPageBreak();

        this.addItem(this.Q4.get());
        this.addItem(this.Q5.get());
        this.addItem(this.Q6.get());
        this.addItem(this.Q7.get());
        this.addItem(this.Q8.get());
        this.addItem(this.Q9.get());
        this.addPageBreak();

        this.addItem(this.Q10.get());
        this.addItem(this.Q11.get());
        this.addItem(this.Q12.get());
        this.addItem(this.Q13.get());
        this.addItem(this.Q14.get());
        this.addItem(this.Q15.get());
        this.addItem(this.Q16.get());
        this.addPageBreak();

        this.addItem(this.Q17.get());
        this.addItem(this.Q18.get());
        this.addItem(this.Q19.get());
        this.addItem(this.Q20.get());
        this.addItem(this.Q21.get());
        this.addPageBreak();

        this.addItem(this.G22_24.get());
        this.addItem(this.G25_26.get());
        this.addPageBreak();


    }
}


export class LymeDiagnosis1 extends Item {

    optionKeys = {
        nameOfOption: 'a'
     }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'LD1');

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
        ['nl', 'Is de ziekte van Lyme vastgesteld door een arts?'],
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



export class LymeDiagnosis2 extends Item {

    constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
      super(parentKey, 'LD2');
  
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
          ['nl', 'Welke arts heeft de ziekte van Lyme bij je vastgesteld?'],
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
              ["nl", "Internist"],
            ])
          },
          {
            key: 'd', role: 'option',
            content: new Map([
              ["nl", "Neuroloog"],
            ])
          },
          {
            key: 'e', role: 'option',
            content: new Map([
              ["nl", "Reumatoloog"],
            ])
          },
          {
            key: 'f', role: 'option',
            content: new Map([
              ["nl", "Dermatoloog"],
            ])
          },
          {
            key: 'g', role: 'option',
            content: new Map([
              ["nl", "Cardioloog"],
            ])
          },
          {
            key: 'h', role: 'option',
            content: new Map([
              ["nl", "Oogarts"],
            ])
          },
          {
            key: 'i', role: 'input',
            content: new Map([
              ["nl", "Andere arts namelijk "],
            ])
          },
          {
            key: 'j', role: 'option',
            content: new Map([
              ["nl", "Weet ik niet"],
            ])
          },
        ]
      })
    }
  }


  export class LymeDiagnosis3 extends Item {

    constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
      super(parentKey, 'LD3');
  
      this.isRequired = isRequired;
      this.condition = condition;
    }
    //TODO: size of text input field?
    buildItem() {
      return SurveyItems.multilineTextInput({
        parentKey: this.parentKey,
        itemKey: this.itemKey,
        isRequired: this.isRequired,
        condition: this.condition,
        questionText: new Map([
          ['nl', 'Welke klachten door de ziekte van Lyme heb/had je? Geef hier een uitgebreide beschrijving van je  klachten en vermeld hierbij ook hoe dit bij jou is vastgesteld, bijvoorbeeld door middel van een ruggeprik, huidbiopt of bloedafname.'],
        ]),
      })
    }
  }
  
export class LymeDiagnosis4 extends Item {

    constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
      super(parentKey, 'LD4');
  
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
          ['nl', 'Wanneer zijn deze klachten door de ziekte van Lyme ontstaan?'],
        ]),
        responseOptions: [
          {//TODO: is this correct dutch in the first option?
            key: 'a', role: 'date',
            content: new Map([
              ["nl", "Datum bij benadering"],
            ])
          },
          {//disable b if a is selected
            key: 'b', role: 'option',
            content: new Map([
              ["nl", "Weet niet"],
            ])
          },
          {
            key: 'c', role: 'input',
            content: new Map([
              ["nl", "Opmerkingen"],
            ])
          },
        ]
      })
    }
  }
  
   
export class LymeDiagnosis5 extends Item {

    constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
      super(parentKey, 'LD5');
  
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
          ['nl', 'Wanneer heeft de arts deze uiting van de ziekte van Lyme bij jou vastgesteld?'],
        ]),
        responseOptions: [
          {//TODO: is this correct dutch in the first option?
            key: 'a', role: 'date',
            content: new Map([
              ["nl", "Datum bij benadering"],
            ])
          },
          {
            key: 'b', role: 'option',
            content: new Map([
              ["nl", "Weet niet"],
            ])
          },
        ]
      })
    }
  }
  
   
export class LymeDiagnosis6 extends Item {

    constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
      super(parentKey, 'LD6');
  
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
          ['nl', 'Heb je op dit moment nog klachten door  de ziekte van Lyme?'],
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
  
   
export class LymeDiagnosis7 extends Item {

    constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
      super(parentKey, 'LD7');
  
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
          ['nl', 'Ben je hiervoor in een ziekenhuis opgenomen?'],
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
  


  export class LymeTherapy1 extends Item {

    constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
      super(parentKey, 'LymeTher1');
  
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
          ['nl', 'Heb je antibiotica voorgeschreven gekregen van je arts?'],
        ]),
        responseOptions: [
          {
            key: 'a', role: 'option',
            content: new Map([
              ["nl", "Ja, tabletten antibiotica"],
            ])
          },
          {
            key: 'b', role: 'option',
            content: new Map([
              ["nl", "Ja, antibiotica via een infuus"],
            ])
          },
          {
            key: 'c', role: 'input',
            content: new Map([
              ["nl", "Nee, omdat:"],
            ])
          },
        ]
      })
    }
  }
  

  export class LymeTherapy2 extends Item {

    constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
      super(parentKey, 'LymeTher2');
  
      this.isRequired = isRequired;
      this.condition = condition;
    }
    //TODO: multiple line of text here
    buildItem() {
      return SurveyItems.multilineTextInput({
        parentKey: this.parentKey,
        itemKey: this.itemKey,
        isRequired: this.isRequired,
        condition: this.condition,
        questionText: new Map([
          ['nl', 'Welke antibiotica heb je gekregen? (Dit kun je aflezen van de verpakking)'],
        ]),
      })
    }
  }
  
  //TODO: or merge therapy question 2 and 3 to one question with case differentiation
  export class LymeTherapy3 extends Item {

    constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
      super(parentKey, 'LymeTher3');
  
      this.isRequired = isRequired;
      this.condition = condition;
    }
    //TODO: multiple line of text here
    buildItem() {
      return SurveyItems.multilineTextInput({
        parentKey: this.parentKey,
        itemKey: this.itemKey,
        isRequired: this.isRequired,
        condition: this.condition,
        questionText: new Map([
          ['nl', 'Welke antibiotica heb je gekregen? (Dit kun je aflezen van de verpakking)'],
        ]),
      })
    }
  }
  

  export class LymeTherapy4 extends Item {

    constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
      super(parentKey, 'LymeTher4');
  
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
          ['nl', 'Ben je reeds met de antibioticakuur gestart?'],
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

  

  export class LymeTherapy5 extends Item {

    constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
      super(parentKey, 'LymeTher5');
  
      this.isRequired = isRequired;
      this.condition = condition;
    }
  
    //TODO: check date input mode
    buildItem() {
      return SurveyItems.dateInput({
        parentKey: this.parentKey,
        itemKey: this.itemKey,
        isRequired: this.isRequired,
        condition: this.condition,
        dateInputMode: 'YMD',
            placeholderText: new Map([
                ["nl", "dd-mm-jjjj"],
            ]),
        questionText: new Map([
          ['nl', 'Wanneer heb je de eerste tablet antibiotica ingenomen of ben je gestart met het infuus?'],
        ]),
      })
    }
  }
  
  