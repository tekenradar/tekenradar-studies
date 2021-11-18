import { Expression } from 'survey-engine/lib/data_types';
import { Group, Item } from 'case-editor-tools/surveys/types';
import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';



export class FormerLymeGroup extends Group {

    Q1: FormerLymeDiagnosis;
    Q2: FormerLymeTherapy1;
    Q3: FormerLymeTherapy2;

    
    constructor(parentKey: string,isRequired?: boolean) {
        super(parentKey, 'FLG');


        this.Q1 = new FormerLymeDiagnosis(this.key, false);
        const q1Condition = SurveyEngine.singleChoice.any(this.Q1.key, this.Q1.optionKeys.nameOfOption);
        this.Q2 = new FormerLymeTherapy1(this.key, false, q1Condition);
        this.Q3 = new FormerLymeTherapy2(this.key, false, q1Condition);

    }

    buildGroup() {

        this.addItem(this.Q1.get());
        this.addItem(this.Q2.get());
        this.addItem(this.Q3.get());

    }
}


class FormerLymeDiagnosis extends Item {

    optionKeys = {
        nameOfOption: 'a'
     }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'FLD');

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
        ['nl', 'Is er bij jou ooit eerder een erythema migrans of een andere vorm van de ziekte van Lyme vastgesteld?'],
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


class FormerLymeTherapy1 extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'FLTher1');

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
        ['nl', 'Heb je een antibiotica kuur gekregen voor deze eerdere erythema migrans of andere vorm van de ziekte van Lyme?'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Nee"],
          ])
        },
        {//TODO input with following text
          key: 'b', role: 'input',
          content: new Map([
            ["nl", "Ja; hoe vaak: .......Antibioticakuren"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "Onbekend"],
          ])
        },
      ]
    })
  }
}



class FormerLymeTherapy2 extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'FLTher2');

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
        ['nl', 'Bent je toen hersteld van de eerdere erythema migrans of andere uiting van de ziekte van lyme?'],
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
            ["nl", "Nee, ik ben klachten blijven houden tot op heden"],
          ])
        },
      ]
    })
  }
}


//TODO: maybe transfer to tickbite file
export class GeneralTherapy extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'GenTher');

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
        ['nl', 'Heb je in de afgelopen 2 weken medicijnen gebruikt? Zo ja, welke medicijnen en tegen welke gezondheidsklachten?'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Nee"],
          ])
        },
        {//TODO: insert dropbox
          key: 'b', role: 'input',
          content: new Map([
            ["nl", "Ja, namelijk (bijvoorbeeld antibiotica, paracetemol, etc): Medicijn: .............select box with these options: Tegen erythema migrans/ziekte van Lyme ; Tegen iets anders dan de ziekte van Lyme"],
          ])
        },
      ]
    })
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
