import { Expression } from 'survey-engine/data_types';
import { Group, Item, OptionDef } from 'case-editor-tools/surveys/types';
import { SingleChoiceOptionTypes, SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';
import { SingleChoiceOptionTypes as SCOptions, ClozeItemTypes } from 'case-editor-tools/surveys';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';
import { SurveySuffix } from '../globalConstants';
import { responseGroupKey, inputKey, dropDownKey } from 'case-editor-tools/constants/key-definitions';



export class FormerLymeGroup extends Group {
  FLD: FormerLymeDiagnosis;
  Q2: FormerLymeTherapy1;
  Q3: FormerLymeTherapy2;


  constructor(parentKey: string, isRequired?: boolean, condition?: Expression) {
    super(parentKey, 'FLG');

    this.groupEditor.setCondition(condition);
    const required = isRequired !== undefined ? isRequired : false;


    this.FLD = new FormerLymeDiagnosis(this.key, required);
    const q1Condition = SurveyEngine.singleChoice.any(this.FLD.key, this.FLD.optionKeys.yes);
    this.Q2 = new FormerLymeTherapy1(this.key, required, q1Condition);
    this.Q3 = new FormerLymeTherapy2(this.key, required, q1Condition);

  }

  buildGroup() {

    this.addItem(this.FLD.get());
    this.addItem(this.Q2.get());
    this.addItem(this.Q3.get());

  }
}


export class LymeDiagnosisGroup extends Group {

  Q1: LymeDiagnosis1;
  Q2: LymeDiagnosis2;


  constructor(parentKey: string, isRequired?: boolean) {
    super(parentKey, 'LymeDiagG');

    const required = isRequired !== undefined ? isRequired : false;

    this.Q1 = new LymeDiagnosis1(this.key, required);
    const q1Condition = SurveyEngine.singleChoice.any(this.Q1.key, this.Q1.optionKeys.yes);
    this.Q2 = new LymeDiagnosis2(this.key, required, q1Condition);

  }

  buildGroup() {

    this.addItem(this.Q1.get());
    this.addItem(this.Q2.get());

  }
}




class FormerLymeDiagnosis extends Item {
  optionKeys = {
    yes: 'a',
    no: 'b'
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
          key: this.optionKeys.yes, role: 'option',
          content: new Map([
            ["nl", "Ja"],
          ])
        },
        {
          key: this.optionKeys.no, role: 'option',
          content: new Map([
            ["nl", "Nee"],
          ])
        },
      ]
    })
  }
}



class FormerLymeTherapy1 extends Item {

  optionKeys = {
    yes: 'b'
  }

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
        SCOptions.cloze({
          key: this.optionKeys.yes, items: [
            ClozeItemTypes.text({
              key: '1', content: new Map(
                [['nl', "Ja, aantal antibioticakuren:"]]
              )
            }),
            ClozeItemTypes.numberInput({
              key: '2',
              inputLabel: new Map([['nl', '']]), //emptied by kvdw
              labelBehindInput: true,
              inputMaxWidth: '70px',
              componentProperties: {
                min: 0
              }
            }),
          ]
        }),
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
  optionKeys = {
    yes: 'a'
  }

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
        ['nl', 'Ben je toen hersteld van de eerdere erythema migrans of andere vorm van de ziekte van Lyme?'],
      ]),
      responseOptions: [
        {
          key: this.optionKeys.yes, role: 'option',
          content: new Map([
            ["nl", "Ja"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Nee, ik ben tot op heden klachten blijven houden"],
          ])
        },
      ]
    })
  }
}


//TODO: maybe transfer to tickbite file
export class GeneralTherapy1 extends Item {


  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Heb je in de '],
      ]),
    },
    {
      content: new Map([
        ["nl", "afgelopen 2 weken "],
      ]),
      className: "text-primary"
    },
    {
      content: new Map([
        ["nl", "medicijnen gebruikt? Bijvoorbeeld antibiotica, paracetamol, etc."],
      ]),
    },
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'GenT1');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Nee"],
          ])
        },
        SingleChoiceOptionTypes.numberInput({
          key: 'b',
          inputLabel: new Map([['nl', 'Ja, aantal medicijnen: ']]),
          labelBehindInput: false,
          inputMaxWidth: '80px',
          componentProperties: {
            min: 0,
            max: 30
          }
        }),
        /*           ClozeItemTypes.text({ //inputMaxWidth: '80px',
                     key: '2', content: new Map(
                       [['nl', ",namelijk (bijvoorbeeld antibiotica, paracetemol, etc):"]]
                     )
                   }),*/
      ]
    })
  }
}


export class GeneralTherapy2 extends Item {
  gtValue: Expression;


  constructor(parentKey: string, isRequired: boolean, condition: Expression) {
    super(parentKey, 'GenT2');

    this.isRequired = isRequired;
    this.condition = SurveyEngine.compare.gt(condition, 0);
    this.gtValue = condition;
  }

  buildItem() {
    const cItems: Array<OptionDef> = [];
    Array.from({ length: 30 }).forEach((_, index) => {
      cItems.push(ClozeItemTypes.text({
        key: `row-${index + 1}-label`,
        content: new Map(
          [['nl', `Medicijn ${index + 1}:`]]
        ),
        displayCondition: SurveyEngine.compare.gt(this.gtValue, index),
      }));
      cItems.push(ClozeItemTypes.textInput({
        key: `row-${index + 1}-input`,
        displayCondition: SurveyEngine.compare.gt(this.gtValue, index),
      }));
      cItems.push(ClozeItemTypes.dropDown({
        key: `row-${index + 1}-dropdown`, options: [
          SCOptions.option('1', new Map([['nl', "Tegen erythema migrans/ziekte van Lyme "]])),
          SCOptions.option('2', new Map([['nl', "Tegen iets anders dan de ziekte van Lyme"]]))
        ],
        displayCondition: SurveyEngine.compare.gt(this.gtValue, index),
      }));
      cItems.push(ClozeItemTypes.clozeLineBreak());
    })


    const cVal: Array<Expression> = [];
    Array.from({ length: 30 }).forEach((_, index) => {
      cVal.push(SurveyEngine.logic.or(
        SurveyEngine.logic.and(
          SurveyEngine.hasResponse(this.key, `rg.cloze.row-${index + 1}-input`),
          SurveyEngine.hasResponse(this.key, `rg.cloze.row-${index + 1}-dropdown`)),
        SurveyEngine.logic.not(SurveyEngine.compare.gt(this.gtValue, index)),
        )
      );
    })

    return SurveyItems.clozeQuestion({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', "Welke medicijnen en tegen welke gezondheidsklachten? (bijvoorbeeld antibiotica, paracetemol, etc):"],
      ]),
      items: cItems,
      customValidations: [
        {
          key: 'GenT2', rule:
            SurveyEngine.logic.and(...cVal),
            type: 'hard'
        }
      ]
    })
  }
}



export class LymeDiagnosis1 extends Item {

  optionKeys = {
    yes: 'a'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'LB_B1');

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
          key: this.optionKeys.yes, role: 'option',
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
    super(parentKey, 'LB_B2');

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

  questionTextMain_Adults = [
    {
      content: new Map([
        ["nl", 'Bij welke arts ben je toen geweest?'],
      ]),
    },
    {
      content: new Map([
        ["nl", " (meerdere antwoorden mogelijk)"],
      ]),
      className: "fw-normal"
    },
  ]

  questionTextMain_Kids = [
    {
      content: new Map([
        ["nl", 'Bij welke arts ben je geweest?'],
      ]),
    },
    {
      content: new Map([
        ["nl", " (meerdere antwoorden mogelijk)"],
      ]),
      className: "fw-normal"
    },
  ]

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
      questionText: this.isPartOf(SurveySuffix.Adults) ? this.questionTextMain_Adults : this.questionTextMain_Kids,
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
          key: 'c', role: 'input',
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
    Tabletten: 'a',
    Infuus: 'b'
  }

  responseOptionLyme = [
    {
      key: this.optionKeys.Tabletten, role: 'option',
      content: new Map([
        ["nl", "Ja, tabletten antibiotica"],
      ])
    },
    {
      key: this.optionKeys.Infuus, role: 'option',
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

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'LT1');

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
      responseOptions: this.isPartOf('LBflow') ? this.responseOptionLyme : this.responseOptionEM
    })
  }
}


export class LymeTherapy2 extends Item {
  optionKeys = {
    dayCount: '10',
  }

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Welke antibiotica heb je gekregen?'],
      ]),
    },
    {
      content: new Map([
        ["nl", " (Dit kun je aflezen van de verpakking)"],
      ]),
      className: "fw-normal"
    },
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'LT2');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.clozeQuestion({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      items: [
        ClozeItemTypes.text({
          key: '1', content: new Map(
            [['nl', "Naam van het middel:"]]
          )
        }),
        ClozeItemTypes.textInput({
          key: '2',
        }),
        ClozeItemTypes.clozeLineBreak(),
        ClozeItemTypes.text({
          key: '3', content: new Map(
            [['nl', "dosis (mg per pil):"]]
          )
        }),
        ClozeItemTypes.textInput({
          key: '4',
        }),
        ClozeItemTypes.clozeLineBreak(),
        ClozeItemTypes.text({
          key: '5', content: new Map(
            [['nl', "aantal pillen per dag"]]
          )
        }),
        ClozeItemTypes.textInput({
          key: '6',
        }),
        ClozeItemTypes.clozeLineBreak(),
        ClozeItemTypes.text({
          key: '7', content: new Map(
            [['nl', "Op welk tijdstip neem je de pillen in? (bijvoorbeeld ‘s ochtends en ‘s avonds):"]]
          )
        }),
        ClozeItemTypes.textInput({
          key: '8',
        }),
        ClozeItemTypes.clozeLineBreak(),
        ClozeItemTypes.text({
          key: '9', content: new Map(
            [['nl', "aantal dagen innemen:"]]
          )
        }),
        ClozeItemTypes.numberInput({
          key: this.optionKeys.dayCount,
          inputLabel: new Map([['nl', 'dagen']]),
          labelBehindInput: true,
          componentProperties: {
            min: 0
          }
        }),
        ClozeItemTypes.clozeLineBreak(),
        ClozeItemTypes.text({
          key: '13', content: new Map(
            [['nl', "overige informatie:"]]
          )
        }),
        ClozeItemTypes.textInput({
          key: '14',
        })
      ],
    })
  }
}





//extra question for infusion medication. (not merged to one question due to key uniqueness)
export class LymeTherapy3 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Welke antibiotica heb je gekregen?'],
      ]),
    },
    {
      content: new Map([
        ["nl", " (Dit kun je aflezen van de verpakking)"],
      ]),
      className: "fw-normal"
    },
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'LT3');

    this.isRequired = isRequired;
    this.condition = condition;
  }
  buildItem() {
    return SurveyItems.clozeQuestion({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      items: [
        ClozeItemTypes.text({
          key: '1', content: new Map(
            [['nl', "Naam van het middel:"]]
          )
        }),
        ClozeItemTypes.textInput({
          key: '2',
        }),
        ClozeItemTypes.clozeLineBreak(),
        ClozeItemTypes.text({
          key: '3', content: new Map(
            [['nl', "aantal dagen infuus:"]]
          )
        }),
        ClozeItemTypes.numberInput({
          key: '4',
          inputLabel: new Map([['en', 'dagen']]),
          labelBehindInput: true,
          inputMaxWidth: '80px',
          componentProperties: {
            min: 0,
          }
        }),
        ClozeItemTypes.clozeLineBreak(),
        ClozeItemTypes.text({
          key: '5', content: new Map(
            [['nl', "overige informatie:"]]
          )
        }),
        ClozeItemTypes.textInput({
          key: '6',
        })
      ],
    })
  }
}

//TODO: transfer to diagnosis and therapy and merge with lyme questions??
export class LymeTherapy4 extends Item {

  optionKeys = {
    yes: 'a',
    no: 'b'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'LT4');

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
          key: this.optionKeys.yes, role: 'option',
          content: new Map([
            ["nl", "Ja"],
          ])
        },
        {
          key: this.optionKeys.no, role: 'option',
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
    super(parentKey, 'LT5');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.clozeQuestion({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.isPartOf('LBflow') ? this.qTextLyme : this.qTextEM,
      items: [
        ClozeItemTypes.text({
          key: '1', content: new Map(
            [['nl', "Op"]]
          )
        }),
        ClozeItemTypes.dateInput({
          dateInputMode: 'YMD',
          key: '2',
          maxRelativeDate: {
            reference: SurveyEngine.timestampWithOffset({ seconds: 0 }),
            delta: { seconds: 0 }
          }
        }),
        ClozeItemTypes.text({
          key: '3', content: new Map(
            [['nl', "(dag/maand/jaar) tussen"]]
          )
        }),
        ClozeItemTypes.timeInput({
          key: '4',
          defaultValue: '--:--',
          inputLabelText: new Map([["nl", " en"],]),
          labelBehindInput: true
        }),//TODO: strictly speaking, this number hast to be greater than or equal to the number above.
        ClozeItemTypes.timeInput({
          key: '5',
          defaultValue: '--:--',
          inputLabelText: new Map([["nl", " uur"],]),
          labelBehindInput: true,
        }),
      ],
    })
  }
}

function expWithArgs(arg0: string, arg1: any): Expression {
  throw new Error('Function not implemented.');
}

