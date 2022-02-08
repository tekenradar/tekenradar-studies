import { Expression } from 'survey-engine/data_types';
import { Group, Item } from 'case-editor-tools/surveys/types';
import { SingleChoiceOptionTypes, SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';
import { PreviousTickBitesGroup } from './prevTickBites';
import { Residence, Gender } from './demographie';
import { Doctor, FormerLymeGroup, GeneralTherapy1 } from './diagnosisTherapy';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';
import { SingleChoiceOptionTypes as SCOptions, ClozeItemTypes } from 'case-editor-tools/surveys';


export class TickBiteOtherGroup extends Group {

  Start: RecognisedTickBite;

  T1: IntroTB;
  Q1: EnvironmentTickBite;
  Q2: ActivityTickBite;
  Q3: PositionTickBite;
  Q4: NumberTickBite;
  Q5: LocationBodyTickBite;

  //Note: RemoveTick1 is not part of surveys from other groups than TB
  Q6: RemoveTick2;
  Q7: RemoveTick3;
  Q8: RemoveTick4;

  Q9: DurationTickBite;

  Q10F: DoctorTickBite;
  Q11F: Doctor;



  constructor(parentKey: string, isRequired?: boolean) {
    super(parentKey, 'TBOtherG');

    const required = isRequired !== undefined ? isRequired : false;

    this.Start = new RecognisedTickBite(this.key, required);
    const QStartcondition = SurveyEngine.singleChoice.any(this.Start.key, this.Start.optionKeys.yes);

    this.T1 = new IntroTB(this.key, required, QStartcondition);
    this.Q1 = new EnvironmentTickBite(this.key, required, QStartcondition);
    this.Q2 = new ActivityTickBite(this.key, required, QStartcondition);
    this.Q3 = new PositionTickBite(this.key, required, QStartcondition);
    this.Q4 = new NumberTickBite(this.key, required, QStartcondition);
    this.Q5 = new LocationBodyTickBite(this.key, required, QStartcondition);

    this.Q6 = new RemoveTick2(this.key, required, QStartcondition);
    this.Q7 = new RemoveTick3(this.key, required, QStartcondition);
    this.Q8 = new RemoveTick4(this.key, required, QStartcondition);

    this.Q9 = new DurationTickBite(this.key, required, QStartcondition);

    this.Q10F = new DoctorTickBite(this.key, required, QStartcondition);
    this.Q11F = new Doctor(this.key, required, QStartcondition);


  }

  buildGroup() {

    this.addItem(this.Start.get());
    this.addItem(this.T1.get());
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

    //TODO: is this the recommended way to add fever survey questions in this group?
    if (this.isPartOf('Feverflow')) {
      this.addItem(this.Q10F.get()),
        this.addItem(this.Q11F.get())
    }


  }
}


export class IntroTB extends Item {

  markdownContentOnly = `
  # Melden tekenbeet

  De volgende vragen gaan over de tekenbeet. \
  Als je meerdere tekenbeten tegelijk hebt opgelopen, kun je dit als één tekenbeet melden.

  `

  markdownContentOther = `
  # Tekenbeet

  De volgende vragen gaan over de tekenbeet die vermoedelijk de huidige of meest recente erythema migrans of andere uiting van de ziekte van Lyme veroorzaakt heeft.

  `

  markdownContentFever = `
  # Melden tekenbeet

  Als je meerdere tekenbeten tegelijk hebt opgelopen, kun je dit als één tekenbeet melden.

  `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'IntroTB');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.display({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      content: [
        ComponentGenerators.markdown({
          content: new Map([
            ["nl", this.isPartOf('TBOnlyG') ? this.markdownContentOnly : (this.isPartOf('Feverflow') ? this.markdownContentFever : this.markdownContentOther)],
          ]),
          className: ''
        })
        /* this.isPartOf('FeverG') ? this.qTextFever : this.qTextOther,
         ComponentGenerators.markdown({
             content: new Map([
                 ["nl", this.markdownContent],
             ]),
             className: ''
         })*/
      ]
    })
  }
}


export class RecognisedTickBite extends Item {
  optionKeys = {
    yes: 'c',
  }

  qTextFever = new Map([[
    'nl', 'Heb je de tekenbeet, waardoor je vermoedelijk de koorts hebt gekregen, al gemeld?'
  ]]);
  qTextOther = new Map([[
    'nl', 'Heb je de tekenbeet, waardoor je vermoedelijk de erythema migrans of andere ziekte van Lyme die je nu meldt hebt gekregen, opgemerkt?'
  ]]);

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'RecTB');

    this.isRequired = isRequired;
    this.condition = condition;

  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.isPartOf('Feverflow') ? this.qTextFever : this.qTextOther,
      //helpGroupContent: this.getHelpGroupContent(),
      responseOptions: [
        SCOptions.option(
          'a', new Map([["nl", "Nee"]])
        ),
        SCOptions.option(
          'b', new Map([["nl", "Ja, deze heb ik eerder gemeld op Tekenradar.nl"]])
        ),
        SCOptions.cloze({
          key: 'c', items: [
            ClozeItemTypes.text({
              key: '1', content: new Map(
                [['nl', "Ja, de datum dat ik de tekenbeet heb opgelopen is"]]
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
              key: '3',
              content: new Map(
                [['nl', "bij benadering?"]]
              )
            })
          ]
        }),
        SCOptions.option(
          'd', new Map([["nl", "Onbekend"]])
        ),
      ]
    })
  }
}


export class EnvironmentTickBite extends Item {
  questionTextMain = [
    {
      content: new Map([
        ["nl", 'In welk type omgeving heb je de tekenbeet opgelopen? '],
      ]),
    },
    {
      content: new Map([
        ["nl", "(meerdere antwoorden mogelijk)"],
      ]),
      className: "fw-normal"
    },

  ]


  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'EnvTB');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.multipleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Tuin"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Bos"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "Heide"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "Weiland"],
          ])
        },
        {
          key: 'e', role: 'option',
          content: new Map([
            ["nl", "Stadspark"],
          ])
        },
        {
          key: 'f', role: 'option',
          content: new Map([
            ["nl", "Duinen"],
          ])
        },
        {
          key: 'g', role: 'option',
          content: new Map([
            ["nl", "Moerasgebied"],
          ])
        },
        {
          key: 'h', role: 'input',
          content: new Map([
            ["nl", "Anders, namelijk:"],
          ])
        },
        {
          key: 'i', role: 'option',
          content: new Map([
            ["nl", "Weet ik niet"],
          ])
        },
      ]
    })
  }
}


export class ActivityTickBite extends Item {
  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Bij welke activiteit heb je de tekenbeet opgelopen? '],
      ]),
    },
    {
      content: new Map([
        ["nl", "(meerdere antwoorden mogelijk)"],
      ]),
      className: "fw-normal"
    },
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'ActTB');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.multipleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Wandelen"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Hond uitlaten"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "Tuinieren"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "Picknicken"],
          ])
        },
        {
          key: 'e', role: 'option',
          content: new Map([
            ["nl", "Groenbeheer"],
          ])
        },
        {
          key: 'f', role: 'option',
          content: new Map([
            ["nl", "Spelen"],
          ])
        },
        {//TODO: show option g only if participant age > 12 years
          key: 'g', role: 'input',
          content: new Map([
            ["nl", "Werk gerelateerde activiteit, mijn beroep is:"],
          ])
        },
        {
          key: 'h', role: 'input',
          content: new Map([
            ["nl", "Anders, namelijk:"],
          ])
        },
        {
          key: 'i', role: 'option',
          content: new Map([
            ["nl", "Weet ik niet"],
          ])
        },
      ]
    })
  }
}


export class PositionTickBite extends Item {
  optionKeys = {
    precies: 'a',
    ongeveer: 'b',
    denkWeten: 'c',
    nee: 'd',
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'PosTB');

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
        ['nl', 'Weet je de locatie waar je de tekenbeet (vermoedelijk) hebt opgelopen?'],
      ]),
      responseOptions: [
        {
          key: this.optionKeys.precies, role: 'option',
          content: new Map([
            ["nl", "Ja, ik weet het precies"],
          ])
        },
        {
          key: this.optionKeys.ongeveer, role: 'option',
          content: new Map([
            ["nl", "Ja, ik weet het ongeveer"],
          ])
        },
        {
          key: this.optionKeys.denkWeten, role: 'option',
          content: new Map([
            ["nl", "Ja, ik denk het te weten"],
          ])
        },
        {
          key: this.optionKeys.nee, role: 'option',
          content: new Map([
            ["nl", "Nee, ik weet het niet"],
          ])
        },
      ]
    })
  }
}

export class TickBiteMap extends Item {
  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'PosTBmap');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.customQuestion({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Weet je de locatie waar je de tekenbeet (vermoedelijk) hebt opgelopen?'],
      ]),
      responseItemDefs: [
        { key: 'map', role: 'map', }
      ]
    })
  }
}


export class NumberTickBite extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'NumTB');

    this.isRequired = isRequired;
    this.condition = condition;
  }
  buildItem() {
    return SurveyItems.numericInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Door hoeveel teken ben je nu gebeten?'],
      ]),
      titleClassName: 'sticky-top',
      inputMaxWidth: '80px',
      inputLabel: new Map([
        ['nl', '']
      ]),
      //TODO: default preset to 1, not implemented yet
      componentProperties: {
        min: 1,
        max: 20,
      }
    })
  }
}


export class LocationBodyTickBite extends Item {
  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Wat was de locatie van de tekenbeet op je  lichaam?'],
      ]),
    },
    {
      content: new Map([
        ["nl", " (graag zo specifiek mogelijk aangeven, bijvoorbeeld: linker been aan de buitenkant boven de enkel. Als je door meerdere teken gebeten bent graag alle lokaties aangeven)"],
      ]),
      className: "fw-normal"
    },
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'LocTB');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.multilineTextInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain
    })
  }
}


export class RemoveTick1 extends Item {

  optionKeys = {
    no: 'b'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'RemT1');

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
        ['nl', 'Zit de teek nog vast op het lichaam?'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
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


export class RemoveTick2 extends Item {
  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'RemT2');

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
        ['nl', 'Heb je de teek bewaard?'],
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


export class RemoveTick3 extends Item {
  drop_options = [
    SCOptions.option('0', new Map([['nl', "0"]])), SCOptions.option('1', new Map([['nl', "1"]])), SCOptions.option('2', new Map([['nl', "2"]])),
    SCOptions.option('3', new Map([['nl', "3"]])), SCOptions.option('4', new Map([['nl', "4"]])), SCOptions.option('5', new Map([['nl', "5"]])),
    SCOptions.option('6', new Map([['nl', "6"]])), SCOptions.option('7', new Map([['nl', "7"]])), SCOptions.option('8', new Map([['nl', "8"]])),
    SCOptions.option('9', new Map([['nl', "9"]])), SCOptions.option('10', new Map([['nl', "10"]])), SCOptions.option('11', new Map([['nl', "11"]])),
    SCOptions.option('12', new Map([['nl', "12"]])), SCOptions.option('13', new Map([['nl', "13"]])), SCOptions.option('14', new Map([['nl', "14"]])),
    SCOptions.option('15', new Map([['nl', "15"]])), SCOptions.option('16', new Map([['nl', "16"]])), SCOptions.option('17', new Map([['nl', "17"]])),
    SCOptions.option('18', new Map([['nl', "18"]])), SCOptions.option('19', new Map([['nl', "19"]])), SCOptions.option('20', new Map([['nl', "20"]])),
    SCOptions.option('21', new Map([['nl', "21"]])), SCOptions.option('22', new Map([['nl', "22"]])), SCOptions.option('23', new Map([['nl', "23"]])),
    SCOptions.option('24', new Map([['nl', "24"]]))
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'RemT3');

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
        ['nl', 'Wanneer heb je de teek verwijderd?'],
      ]),
      responseOptions: [
        SCOptions.cloze({
          key: 'a', items: [
            ClozeItemTypes.text({
              key: '1', content: new Map(
                [['nl', "Vandaag, tussen"]]
              )
            }),
            ClozeItemTypes.timeInput({
              key: '2',
              defaultValue: '13:00',
              inputLabelText: new Map([["nl", " en"],]),
              labelBehindInput: true
            }),//TODO: strictly speaking, this number hast to be greater than or equal to the number above.
            ClozeItemTypes.timeInput({
              key: '3',
              defaultValue: '13:00',
              inputLabelText: new Map([["nl", " uur"],]),
              labelBehindInput: true,
            }),
          ]
        }),
        SCOptions.cloze({
          key: 'b', items: [
            ClozeItemTypes.text({
              key: '1', content: new Map(
                [['nl', "Gisteren, tussen"]]
              )
            }),
            ClozeItemTypes.timeInput({
              key: '2',
              defaultValue: '13:00',
              inputLabelText: new Map([["nl", " en"],]),
              labelBehindInput: true
            }),//TODO: strictly speaking, this number hast to be greater than or equal to the number above.
            ClozeItemTypes.timeInput({
              key: '3',
              defaultValue: '13:00',
              inputLabelText: new Map([["nl", " uur"],]),
              labelBehindInput: true,
            }),
          ]
        }),
        SCOptions.cloze({
          key: 'c', items: [
            ClozeItemTypes.text({
              key: '1', content: new Map(
                [['nl', "Eergisteren, tussen"]]
              )
            }),
            ClozeItemTypes.timeInput({
              key: '2',
              defaultValue: '13:00',
              inputLabelText: new Map([["nl", " en"],]),
              labelBehindInput: true
            }),//TODO: strictly speaking, this number hast to be greater than or equal to the number above.
            ClozeItemTypes.timeInput({
              key: '3',
              defaultValue: '13:00',
              inputLabelText: new Map([["nl", " uur"],]),
              labelBehindInput: true,
            }),
          ]
        }),
        SCOptions.cloze({
          key: 'd', items: [
            ClozeItemTypes.text({
              key: '1', content: new Map(
                [['nl', "Eerder namelijk,"]]
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
                [['nl', " (dag/maand/jaar)"]]
              )
            }),
            ClozeItemTypes.clozeLineBreak(),
            ClozeItemTypes.text({
              key: '4', content: new Map(
                [['nl', "tussen"]]
              )
            }),
            ClozeItemTypes.timeInput({
              key: '5',
              defaultValue: '13:00',
              inputLabelText: new Map([["nl", " en"],]),
              labelBehindInput: true
            }),//TODO: strictly speaking, this number hast to be greater than or equal to the number above.
            ClozeItemTypes.timeInput({
              key: '6',
              defaultValue: '13:00',
              inputLabelText: new Map([["nl", " uur"],]),
              labelBehindInput: true,
            }),
          ]
        }),
      ]
    })
  }
}


export class RemoveTick4 extends Item {


  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Wie heeft de teek verwijderd?'],
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
    super(parentKey, 'RemT4');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.multipleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "De teek viel er vanzelf af"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Huisarts"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "Ik zelf"],
          ])
        },
        {
          key: 'd', role: 'input',
          content: new Map([
            ["nl", "Iemand anders, namelijk:"],
          ])
        },
        {
          key: 'e', role: 'option',
          content: new Map([
            ["nl", "Onbewust / per ongeluk verwijderd (bijvoorbeeld door te krabben of bij het afdrogen)"],
          ])
        },
      ]
    })
  }
}



export class ReportedTickBites extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q12');

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
        ['nl', 'Hoeveel tekenbeten heb je sinds het begin van dit jaar (dus vanaf 1 januari) op Tekenradar gemeld?'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Ik heb nog nooit een tekenbeet gemeld op tekenradar"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Geen tekenbeten gemeld dit jaar"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "1 tekenbeet gemeld"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "2 tekenbeten gemeld"],
          ])
        },
        {
          key: 'e', role: 'option',
          content: new Map([
            ["nl", "3-5 tekenbeten gemeld"],
          ])
        },
        {
          key: 'f', role: 'option',
          content: new Map([
            ["nl", "5-10 tekenbeten gemeld"],
          ])
        },
        {
          key: 'g', role: 'option',
          content: new Map([
            ["nl", "Meer dan 10 tekenbeten gemeld"],
          ])
        },
      ]
    })
  }
}


export class DateTickBite extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'DTB');

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
        ['nl', 'Wanneer heb je de tekenbeet (vermoedelijk) opgelopen?'],
      ]),
      responseOptions: [
        SCOptions.cloze({
          key: 'a', items: [
            ClozeItemTypes.text({
              key: '1', content: new Map(
                [['nl', "Vandaag, tussen"]]
              )
            }),
            ClozeItemTypes.timeInput({
              key: '2',
              defaultValue: '13:00',
              inputLabelText: new Map([["nl", " en"],]),
              labelBehindInput: true
            }),//TODO: strictly speaking, this number hast to be greater than or equal to the number above.
            ClozeItemTypes.timeInput({
              key: '3',
              defaultValue: '13:00',
              inputLabelText: new Map([["nl", " uur"],]),
              labelBehindInput: true,
            }),
          ]
        }),
        SCOptions.cloze({
          key: 'b', items: [
            ClozeItemTypes.text({
              key: '1', content: new Map(
                [['nl', "Gisteren, tussen"]]
              )
            }),
            ClozeItemTypes.timeInput({
              key: '2',
              defaultValue: '13:00',
              inputLabelText: new Map([["nl", " en"],]),
              labelBehindInput: true
            }),//TODO: strictly speaking, this number hast to be greater than or equal to the number above.
            ClozeItemTypes.timeInput({
              key: '3',
              defaultValue: '13:00',
              inputLabelText: new Map([["nl", " uur"],]),
              labelBehindInput: true,
            }),
          ]
        }),
        SCOptions.cloze({
          key: 'c', items: [
            ClozeItemTypes.text({
              key: '1', content: new Map(
                [['nl', "Eergisteren, tussen"]]
              )
            }),
            ClozeItemTypes.timeInput({
              key: '2',
              defaultValue: '13:00',
              inputLabelText: new Map([["nl", " en"],]),
              labelBehindInput: true
            }),//TODO: strictly speaking, this number hast to be greater than or equal to the number above.
            ClozeItemTypes.timeInput({
              key: '3',
              defaultValue: '13:00',
              inputLabelText: new Map([["nl", " uur"],]),
              labelBehindInput: true,
            }),
          ]
        }),
        SCOptions.cloze({
          key: 'd', items: [
            ClozeItemTypes.text({
              key: '1', content: new Map(
                [['nl', "Eerder, op"]]
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
                [['nl', " (dag/maand/jaar)"]]
              )
            }),
            ClozeItemTypes.clozeLineBreak(),
            ClozeItemTypes.text({
              key: '4', content: new Map(
                [['nl', "tussen"]]
              )
            }),
            ClozeItemTypes.timeInput({
              key: '5',
              defaultValue: '13:00',
              inputLabelText: new Map([["nl", " en"],]),
              labelBehindInput: true
            }),//TODO: strictly speaking, this number hast to be greater than or equal to the number above.
            ClozeItemTypes.timeInput({
              key: '6',
              defaultValue: '13:00',
              inputLabelText: new Map([["nl", " uur"],]),
              labelBehindInput: true,
            }),
          ]
        }),
      ]
    })
  }
}


export class DurationTickBite extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'DurTB');

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
        ['nl', 'Hoe lang heeft de teek in de huid vastgezeten?'],
      ]),
      responseOptions: [
        SCOptions.cloze({
          key: 'a', items: [
            ClozeItemTypes.text({
              key: '1', content: new Map(
                [['nl', "Korter dan 12 uur, namelijk"]]
              )
            }),
            ClozeItemTypes.numberInput({
              key: '2',
              inputLabel: new Map([["nl", " uur"],]),
              labelBehindInput: true,
              inputMaxWidth: '80px',
              componentProperties: {
                min: 0,
                max: 12,
              }
            }),
          ]
        }),
        SCOptions.cloze({
          key: 'b', items: [
            ClozeItemTypes.text({
              key: '1', content: new Map(
                [['nl', "12 - 24 uur, namelijk"]]
              )
            }),
            ClozeItemTypes.numberInput({
              key: '2',
              inputLabel: new Map([["nl", " uur"],]),
              labelBehindInput: true,
              inputMaxWidth: '80px',
              componentProperties: {
                min: 12,
                max: 24
              }
            }),
          ]
        }),
        SCOptions.cloze({
          key: 'c', items: [
            ClozeItemTypes.text({
              key: '1', content: new Map(
                [['nl', "Langer dan 24 uur, namelijk"]]
              )
            }),
            ClozeItemTypes.numberInput({
              key: '2',
              inputLabel: new Map([["nl", " "],]),
              labelBehindInput: true,
              inputMaxWidth: '80px',
              componentProperties: {
                min: 0,
              }
            }),
            ClozeItemTypes.dropDown({
              key: '3', options: [
                SCOptions.option('1', new Map([['nl', "uren"]])),
                SCOptions.option('2', new Map([['nl', "dagen (rond a.u.b. af op hele dagen)"]]))
              ]
            }),
          ]
        }),
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "Weet ik niet"],
          ])
        },
      ]
    })
  }
}


export class DoctorTickBite extends Item {

  optionKeys = {
    yes: 'a'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'DocTB');

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
        ['nl', 'Is er een arts bezocht voor de tekenbeet?'],
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



