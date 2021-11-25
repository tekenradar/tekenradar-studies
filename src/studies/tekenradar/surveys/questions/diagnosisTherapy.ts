import { Expression } from 'survey-engine/lib/data_types';
import { Group, Item } from 'case-editor-tools/surveys/types';
import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';



export class FormerLymeGroup extends Group {

    Q1: FormerLymeDiagnosis;
    Q2: FormerLymeTherapy1;
    Q3: FormerLymeTherapy2;

    
    constructor(parentKey: string,isRequired?: boolean) {
        super(parentKey, 'FLG');

        const required = isRequired !== undefined ? isRequired : false;


        this.Q1 = new FormerLymeDiagnosis(this.key, required);
        const q1Condition = SurveyEngine.singleChoice.any(this.Q1.key, this.Q1.optionKeys.nameOfOption);
        this.Q2 = new FormerLymeTherapy1(this.key, required, q1Condition);
        this.Q3 = new FormerLymeTherapy2(this.key, required, q1Condition);

    }

    buildGroup() {

        this.addItem(this.Q1.get());
        this.addItem(this.Q2.get());
        this.addItem(this.Q3.get());

    }
}


export class LymeDiagnosisGroup extends Group {

  Q1: LymeDiagnosis1;
  Q2: LymeDiagnosis2;

  
  constructor(parentKey: string,isRequired?: boolean) {
      super(parentKey, 'LymeDiagG');

      const required = isRequired !== undefined ? isRequired : false;

      this.Q1 = new LymeDiagnosis1(this.key, required);
      const q1Condition = SurveyEngine.singleChoice.any(this.Q1.key, this.Q1.optionKeys.nameOfOption);
      this.Q2 = new LymeDiagnosis2(this.key, required, q1Condition);

  }

  buildGroup() {

      this.addItem(this.Q1.get());
      this.addItem(this.Q2.get());

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
        {//TODO: insert dropbox and text
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

  
export class Doctor extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Doc');

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



export class LymeTherapy1 extends Item {

  optionKeys = {
      nameOfOptionTabletten: 'a',
      nameOfOptionInfuus: 'b'
   }

   responseOptionLyme = [
    {
      key: 'a', role: 'option',
      content:  new Map([
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

  responseOptionEM = [
    {
      key: 'a', role: 'option',
      content:  new Map([
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
      responseOptions: this.isPartOf('LymeG') ? this.responseOptionLyme : this.responseOptionEM
    })
  }
}


export class LymeTherapy2 extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'LymeTher2');

    this.isRequired = isRequired;
    this.condition = condition;
  }
  //TODO: multiple items with text here
  //TODO: maybe multiple slots with text input???
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

//extra question for infusion medication. (not merged to one question due to key uniqueness)
export class LymeTherapy3 extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'LymeTher3');

    this.isRequired = isRequired;
    this.condition = condition;
  }
  //TODO: multiple items with text here
  //TODO: maybe multiple slots with text input???
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

//TODO: transfer to diagnosis and therapy and merge with lyme questions??
export class LymeTherapy4 extends Item {

  optionKeys = {
      nameOfOption: 'a'
   }

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
        ['nl', 'Ben je al met de antibioticakuur gestart?'],
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

  qTextLyme = new Map([[
    'nl', 'Wanneer heb je de eerste tablet antibiotica ingenomen of ben je gestart met het infuus?'
  ]]);
  qTextEM = new Map([[
    'nl', 'Wanneer heb je de eerste pil antibiotica ingenomen?'
  ]]);

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'LymeTher5');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  //TODO: insert date and time input
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
      questionText: this.isPartOf('LymeG')? this.qTextLyme : this.qTextEM,
    })
  }
}

