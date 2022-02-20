import { Expression } from 'survey-engine/data_types';
import { Group, Item } from 'case-editor-tools/surveys/types';
import { SingleChoiceOptionTypes, SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';
import { PreviousTickBitesGroup } from './prevTickBites';
import { Residence, Gender } from './demographie';
import { Doctor, FormerLymeGroup, GeneralTherapy1 } from './diagnosisTherapy';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';
import { SingleChoiceOptionTypes as SCOptions, ClozeItemTypes } from 'case-editor-tools/surveys';
import { ParticipantFlags } from '../../participantFlags';
import { generateLocStrings } from 'case-editor-tools/surveys/utils/simple-generators';
import { SurveySuffix, TextBorderFormat } from '../globalConstants';


export class TickBiteOtherGroup extends Group {

  Start: RecognisedTickBite;

  T1: IntroTB;
  Q1: EnvironmentTickBite;
  Q2: ActivityTickBite;
  Q3: TickBiteLocationGroup;
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
    this.Q3 = new TickBiteLocationGroup(this.key, required, QStartcondition);
    this.Q4 = new NumberTickBite(this.key, required, QStartcondition);
    this.Q5 = new LocationBodyTickBite(this.key, required, QStartcondition);

    this.Q6 = new RemoveTick2(this.key, required, QStartcondition);
    this.Q7 = new RemoveTick3(this.key, required, QStartcondition);
    this.Q8 = new RemoveTick4(this.key, required, QStartcondition);

    this.Q9 = new DurationTickBite(this.key, required, QStartcondition);

    this.Q10F = new DoctorTickBite(this.key, required, QStartcondition);
    const condDoc = SurveyEngine.singleChoice.any(this.Q10F.key, this.Q10F.optionKeys.yes);
    this.Q11F = new Doctor(this.key, required, condDoc);


  }

  buildGroup() {

    this.addItem(this.Start.get());

    this.addPageBreak();
    this.addItem(this.T1.get());
    this.addItem(this.Q1.get());
    this.addItem(this.Q2.get());
    this.addItem(this.Q3.get());
    this.addItem(this.Q4.get());
    this.addItem(this.Q5.get());
    this.addItem(this.Q6.get());
    this.addItem(this.Q7.get());
    this.addItem(this.Q8.get());
    this.addItem(this.Q9.get());

    //TODO: is this the recommended way to add fever survey questions in this group?
    if (this.isPartOf('Feverflow')) {
      this.addItem(this.Q10F.get()),
        this.addItem(this.Q11F.get())
    }


  }
}


export class IntroTB extends Item {

  markdownContentTBflow_Adults = `
  # Melden tekenbeet

  De volgende vragen gaan over de tekenbeet.

  Als je meerdere tekenbeten tegelijk hebt opgelopen, kun je dit als één tekenbeet melden.

  `

  markdownContentTBflow_Kids = `
  # Melden tekenbeet

  De volgende vragen gaan over de tekenbeet.

  Indien je meerdere tekenbeten tegelijk hebt opgelopen, kun je dit als één tekenbeet melden.

  `


  markdownContentEMflow_Kids = `
  # Tekenbeet

  De vragen hieronder zijn voor een minderjarige.
  Ben je een ouder/verzorger dan kun je de antwoorden invullen voor/over je kind.

  De volgende vragen gaan over de tekenbeet die vermoedelijk de huidige of meest recente erythema migrans of andere uiting van de ziekte van Lyme veroorzaakt heeft.
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
            ["nl", this.isPartOf('TBflow_Adults') ? this.markdownContentTBflow_Adults : (this.isPartOf('Feverflow') ? this.markdownContentFever : (this.isPartOf('TBflow_Kids') ? this.markdownContentTBflow_Kids : (this.isPartOf('EMflow_Kids') ? this.markdownContentEMflow_Kids : this.markdownContentOther)))],
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


export class TBGeneralHeader extends Item {

  markdownContentTBflow = `
  # Tekenbeten algemeen
  `


  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'kTB-B_Header');

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
            ["nl", this.markdownContentTBflow],
          ]),
          className: ''
        })
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
          'b',
          new Map([["nl", "Ja, deze heb ik eerder gemeld op Tekenradar.nl"]]),
          {
            className: TextBorderFormat,
          },
        ),
        SCOptions.cloze({
          key: 'c',
          className: TextBorderFormat,
          items: [
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
            ClozeItemTypes.clozeLineBreak(),
            ClozeItemTypes.text({
              key: '3',
              content: new Map(
                [['nl', "Dit is de "]]
              )
            }),
            ClozeItemTypes.dropDown({
              key: '4', options: [
                SCOptions.option('1', new Map([['nl', "exacte"]])),
                SCOptions.option('2', new Map([['nl', "geschatte"]]))
              ]
            }),
            ClozeItemTypes.text({
              key: '5',
              content: new Map(
                [['nl', " datum."]]
              )
            }),
          ]
        }),
        SCOptions.option(
          'd', new Map([["nl", "Onbekend"]]),
          {
            className: TextBorderFormat,
          }
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
    super(parentKey, 'TB.A1');

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
    super(parentKey, 'TB.A2');

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
        {// show option g only if participant age > 12 years
          key: 'g', role: 'input',
          content: new Map([
            ["nl", "Werkgerelateerde activiteit, namelijk:"],
          ]),
          displayCondition: this.isPartOf(SurveySuffix.Adults) ? undefined :
            SurveyEngine.compare.gt(SurveyEngine.participantFlags.getAsNum(ParticipantFlags.ageFromPDiff.key), 12)
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


class TickBiteLocationKnown extends Item {
  optionKeys = {
    precies: 'a',
    ongeveer: 'b',
    denkWeten: 'c',
    nee: 'd',
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q1');

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

class TickBiteMap extends Item {
  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q2');

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
        {
          key: 'map', role: 'map', content: generateLocStrings(new Map([
            ['nl', 'Klik op de kaart en plaats de teek (ongeveer) op de locatie waar je de tekenbeet hebt opgelopen. Zoom in om de locatie preciezer aan te kunnen geven']
          ]))
        }
      ]
    })
  }
}

export class TickBiteLocationGroup extends Group {
  Q1: TickBiteLocationKnown;
  Q2: TickBiteMap;

  constructor(parentKey: string, isRequired?: boolean, condition?: Expression) {
    super(parentKey, 'TBLoc');

    this.groupEditor.setCondition(condition);
    const required = isRequired !== undefined ? isRequired : false;


    this.Q1 = new TickBiteLocationKnown(this.key, required);
    const showMap = SurveyEngine.singleChoice.none(this.Q1.key, this.Q1.optionKeys.nee);
    this.Q2 = new TickBiteMap(this.key, required, showMap);

  }

  buildGroup() {
    this.addItem(this.Q1.get());
    this.addItem(this.Q2.get());
  }
}


export class NumberTickBite extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Door hoeveel teken ben je toen gebeten?'],
      ]),
    },
  ]

  questionTextMain_EMKids = [
    {
      content: new Map([
        ["nl", 'Door hoeveel teken was je gebeten?'],
      ]),
    },
  ]

  //questionText: this.isPartOf(SurveySuffix.Adults) ? this.questionTextMain_Adults : this.questionTextMain_Kids,
  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'TB.A4');

    this.isRequired = isRequired;
    this.condition = condition;
  }
  buildItem() {
    return SurveyItems.numericInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.isPartOf("EMflow_Kids") ? this.questionTextMain_EMKids : this.questionTextMain,
      titleClassName: 'sticky-top',
      inputMaxWidth: '80px',
      inputLabel: new Map([
        ['nl', '']
      ]),
      //TODO: default preset to 1, not implemented yet
      componentProperties: {
        min: 1,
        max: 100,
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
        ["nl", " (graag zo specifiek mogelijk aangeven, bijvoorbeeld: linkerbeen aan de buitenkant boven de enkel. Als je door meerdere teken gebeten bent graag alle locaties aangeven)"],
      ]),
      className: "fw-normal"
    },
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'TB.A5');

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
    super(parentKey, 'TB.A6');

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
    super(parentKey, 'TB.A7');

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

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Wanneer heb je de teek verwijderd?'],
      ]),
    },
    {
      content: new Map([
        ["nl", " (als je het niet meer precies weet, maak dan een schatting)"],
      ]),
      className: "fw-normal"
    },
  ]


  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'TB.A8');

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
        SCOptions.cloze({
          key: 'a',
          items: [
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
          key: 'b',
          className: TextBorderFormat,
          items: [
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
          key: 'c',
          className: TextBorderFormat,
          items: [
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
          key: 'd',
          className: TextBorderFormat,
          items: [
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
    super(parentKey, 'TB.A9');

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
    super(parentKey, 'TB.A12');

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
            ["nl", "1 tekenbeet gemeld dit jaar"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "2 tekenbeten gemeld dit jaar"],
          ])
        },
        {
          key: 'e', role: 'option',
          content: new Map([
            ["nl", "3-5 tekenbeten gemeld dit jaar"],
          ])
        },
        {
          key: 'f', role: 'option',
          content: new Map([
            ["nl", "5-10 tekenbeten gemeld dit jaar"],
          ])
        },
        {
          key: 'g', role: 'option',
          content: new Map([
            ["nl", "Meer dan 10 tekenbeten gemeld dit jaar"],
          ])
        },
      ]
    })
  }
}


export class DateTickBite extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'TB.B13');

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
          key: 'b',
          className: TextBorderFormat,
          items: [
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
          key: 'c',
          className: TextBorderFormat,
          items: [
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
          key: 'd',
          className: TextBorderFormat,
          items: [
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

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Hoe lang heeft de teek in de huid vastgezeten?'],
      ]),
    },
    {
      content: new Map([
        ["nl", " (als je het niet meer precies weet, maak dan een schatting)"],
      ]),
      className: "fw-normal"
    },
  ]


  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'TB.B14');

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
        SCOptions.cloze({
          key: 'a',
          items: [
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
          key: 'b',
          className: TextBorderFormat,
          items: [
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
          key: 'c',
          className: TextBorderFormat,
          items: [
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
              key: '3',
              placeholder: new Map([['nl', '-- kies een optie --']]),
              options: [
                SCOptions.option('1', new Map([['nl', "uren"]])),
                SCOptions.option('2', new Map([['nl', "dagen (rond af op hele dagen)"]]))
              ]
            }),
          ]
        }),
        SCOptions.option(
          'd', new Map([["nl", "Weet ik niet"]]),
          {
            className: TextBorderFormat,
          }
        )
      ]
    })
  }
}


export class DoctorTickBite extends Item {

  optionKeys = {
    yes: 'a'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'TB.B15');

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
