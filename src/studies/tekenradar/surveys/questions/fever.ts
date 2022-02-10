import { Expression } from 'survey-engine/data_types';
import { Group, Item } from 'case-editor-tools/surveys/types';
import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';
import { TickBiteOtherGroup } from './tickBite';
import { FormerLymeGroup, GeneralTherapy1 } from './diagnosisTherapy';
import { PreviousTickBitesGroup } from './prevTickBites';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';




export class FeverGroup extends Group {

  G1_11: TickBiteOtherGroup;
  G12_14: FormerLymeGroup;
  Q15: GeneralTherapy1;

  T1: FeverText;
  Q16: FeverSymptom1;
  Q17: FeverSymptom2;
  Q18: FeverSymptom3;
  Q19: FeverSymptom4;
  Q20: FeverSymptom5;
  Q21: FeverSymptom6;
  Q22: FeverSymptom7;
  Q23: FeverTherapy;
  Q24: FeverOtherCause1;
  Q25: FeverOtherCause2;
  Q26: FeverOtherCause3;
  Q27: FeverOtherCause4;

  G28_29: PreviousTickBitesGroup;



  constructor(parentKey: string, isRequired?: boolean, condition?: Expression) {
    super(parentKey, 'FeverG');

    this.groupEditor.setCondition(condition);

    const required = isRequired !== undefined ? isRequired : false;

    this.G1_11 = new TickBiteOtherGroup(this.key, isRequired);
    //TODO: show this only if first answer is c
    this.G12_14 = new FormerLymeGroup(this.key, isRequired);
    this.Q15 = new GeneralTherapy1(this.key, required);

    this.T1 = new FeverText(this.key, required);
    this.Q16 = new FeverSymptom1(this.key, required);
    const Q16condition = SurveyEngine.singleChoice.any(this.Q16.key, this.Q16.optionKeys.yes);
    this.Q17 = new FeverSymptom2(this.key, required, Q16condition);
    this.Q18 = new FeverSymptom3(this.key, required, Q16condition);
    const Q18condition = SurveyEngine.singleChoice.any(this.Q18.key, this.Q18.optionKeys.no);
    this.Q19 = new FeverSymptom4(this.key, required, Q18condition);
    const Q19condition = SurveyEngine.singleChoice.any(this.Q19.key, this.Q19.optionKeys.yes);
    this.Q20 = new FeverSymptom5(this.key, required, Q19condition);
    const Q20condition = SurveyEngine.singleChoice.any(this.Q20.key, this.Q20.optionKeys.yes);


    const Q18_20condition = SurveyEngine.logic.or(SurveyEngine.logic.not(Q18condition), Q20condition);

    this.Q21 = new FeverSymptom6(this.key, required, Q18_20condition);
    this.Q22 = new FeverSymptom7(this.key, required, Q18_20condition);

    this.Q23 = new FeverTherapy(this.key, required, Q16condition);

    this.Q24 = new FeverOtherCause1(this.key, required);
    const Q24condition = SurveyEngine.multipleChoice.none(this.Q24.key, this.Q24.optionKeys.nothing);
    this.Q25 = new FeverOtherCause2(this.key, required, Q24condition);
    this.Q26 = new FeverOtherCause3(this.key, required, Q24condition);
    this.Q27 = new FeverOtherCause4(this.key, required, Q24condition);

    this.G28_29 = new PreviousTickBitesGroup(this.key, isRequired)

  }


  buildGroup() {

    this.addItem(this.G1_11.get());
    this.addItem(this.G12_14.get());
    this.addItem(this.Q15.get());
    this.addPageBreak();

    this.addItem(this.Q16.get());
    this.addItem(this.Q17.get());
    this.addItem(this.Q18.get());
    this.addItem(this.Q19.get());
    this.addItem(this.Q20.get());
    this.addItem(this.Q21.get());
    this.addItem(this.Q22.get());
    this.addItem(this.Q23.get());
    this.addPageBreak();

    this.addItem(this.Q24.get());
    this.addItem(this.Q25.get());
    this.addItem(this.Q26.get());
    this.addItem(this.Q27.get());
    this.addItem(this.G28_29.get());
    this.addPageBreak();

  }

}




export class FeverText extends Item {

  markdownContent = `
# Tekenbeet en gezondheid

De volgende vragen gaan over je tekenbeet en je gezondheid.
  `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'FeverT');

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
            ["nl", this.markdownContent],
          ]),
          className: ''
        })
      ]
    })
  }
}



export class FeverSymptom1 extends Item {

  optionKeys = {
    yes: 'a'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'FS1');

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
        ['nl', 'Heb je sinds de tekenbeet koorts gekregen of gehad?'],
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


export class FeverSymptom2 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Binnen hoeveel weken '],
      ]),
    },
    {
      content: new Map([
        ["nl", "na "],
      ]),
      className: "text-primary"
    },
    {
      content: new Map([
        ["nl", 'de tekenbeet kreeg je koorts?'],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'FS2');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.dropDown({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      //TODO: maybe "weken na de tekenbeet" as seperate text after dropbox
      responseOptions: [
        {
          key: '1', role: 'option',
          content: new Map([
            ["nl", "1 weken na de tekenbeet"],
          ])
        },
        {
          key: '2', role: 'option',
          content: new Map([
            ["nl", "2 weken na de tekenbeet"],
          ]),
        }, {
          key: '3', role: 'option',
          content: new Map([
            ["nl", "3 weken na de tekenbeet"],
          ]),
        }, {
          key: '4', role: 'option',
          content: new Map([
            ["nl", "4 weken na de tekenbeet"],
          ]),
        }, {
          key: '5', role: 'option',
          content: new Map([
            ["nl", "5 weken na de tekenbeet"],
          ]),
        }, {
          key: '6', role: 'option',
          content: new Map([
            ["nl", "6 weken na de tekenbeet"],
          ]),
        }, {
          key: '7', role: 'option',
          content: new Map([
            ["nl", "7 weken na de tekenbeet"],
          ]),
        }, {
          key: '8', role: 'option',
          content: new Map([
            ["nl", "8 weken na de tekenbeet"],
          ]),
        }, {
          key: '9', role: 'option',
          content: new Map([
            ["nl", "9 weken na de tekenbeet"],
          ]),
        }, {
          key: '10', role: 'option',
          content: new Map([
            ["nl", "10 weken na de tekenbeet"],
          ]),
        }, {
          key: '11', role: 'option',
          content: new Map([
            ["nl", "10 of meer weken na de tekenbeet"],
          ]),
        },
      ],
    })
  }
}


export class FeverSymptom3 extends Item {

  optionKeys = {
    no: 'b'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'FS3');

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
        ['nl', 'Is de koorts gemeten met een thermometer?'],
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


export class FeverSymptom4 extends Item {

  optionKeys = {
    yes: 'a'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'FS4');

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
        ['nl', 'Heb je nu nog koorts?'],
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


export class FeverSymptom5 extends Item {

  optionKeys = {
    yes: 'a'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'FS5');

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
        ['nl', 'Kun je alsnog je temperatuur met een thermometer opmeten?'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Ja, ik ga nu meteen mijn temperatuur opmeten"],
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


export class FeverSymptom6 extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'FS6');

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
        ['nl', 'Met wat voor thermometer of meetmethode heb je de temperatuur gemeten?'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Oormeting"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Okselmeting"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "Tongmeting"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "Rectale meting (via de anus)"],
          ])
        },
        //TODO: mandatory text field if selected
        {
          key: 'e', role: 'input',
          content: new Map([
            ["nl", "Anders namelijk (bijvoorbeeld infrarood voorhoofdmeting):"],
          ])
        },
      ]
    })
  }
}



export class FeverSymptom7 extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'FS7');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.numericSlider({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Hoeveel graden Celsius was de koorts (maximaal) na de tekenbeet?'],
      ]),
      //questionSubText: new Map([
      //  ["nl", "Mijn reukvermogen op dit moment: (geen reukvermogen 0 - uitstekend reukvermogen 100)."],
      //]),
      sliderLabel: new Map([
        ["nl", "Jouw selectie:"],
      ]),
      noResponseLabel: new Map([
        ["nl", "Sleep de knop naar de juiste temperatuur."],
      ]),
      //TODO: set default value 37.0 --> better no default value to control if input has been made
      min: 35.0,
      max: 42.0,
      stepSize: 0.1,
    })
  }
}


export class FeverTherapy extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'FT');

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
        ['nl', 'Heb je tijdens de koorts paracetamol gebruikt?'],
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


export class FeverOtherCause1 extends Item {

  optionKeys = {
    nothing: 'h'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'FOC1');

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
        ['nl', 'Is er in de afgelopen 4 weken één van de onderstaande ziektebeelden bij je vastgesteld? (meerdere antwoorden mogelijk)'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Longontsteking of andere luchtweginfectie (pneumonie, bronchitis)"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Bijholteontsteking of oorontsteking (sinusitis, otitis)"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "Keelontsteking (tonsillitis, faryngitis, laryngitis)"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "Buikgriep: misselijkheid, braken, diarree  (gastro-enteritis, gastritis, enteritis)"],
          ])
        },
        {
          key: 'e', role: 'option',
          content: new Map([
            ["nl", "Blaasontsteking, urineweginfectie of nierbekkenontsteking (cystitis, pyelonefritis)"],
          ])
        },
        {
          key: 'f', role: 'option',
          content: new Map([
            ["nl", "Huidinfectie (erysipelas, cellulitis)"],
          ])
        },
        //TODO: text field mandatory or not?
        {
          key: 'g', role: 'input',
          content: new Map([
            ["nl", "Anders, namelijk:"],
          ])
        },
        //TODO: disable other option if h is selected?
        {
          key: 'h', role: 'option',
          content: new Map([
            ["nl", "Geen van bovenstaande"],
          ])
        },
      ]
    })
  }
}


export class FeverOtherCause2 extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'FOC2');

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
        ['nl', 'Welke arts(en) heeft/hebben bovenstaande ziektebeeld(en) vastgesteld? (meerdere antwoorden mogelijk)'],
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
            ["nl", "Internist"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "Cardioloog"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "Longarts"],
          ])
        },
        {
          key: 'e', role: 'option',
          content: new Map([
            ["nl", "Chirurg"],
          ])
        },
        {
          key: 'f', role: 'option',
          content: new Map([
            ["nl", "Neuroloog"],
          ])
        },
        //TODO: text field mandatory or not?
        {
          key: 'g', role: 'input',
          content: new Map([
            ["nl", "Andere arts namelijk"],
          ])
        },
        //TODO: disable other option if h is selected?
        {
          key: 'h', role: 'option',
          content: new Map([
            ["nl", "Weet ik niet"],
          ])
        },
        //TODO: not mandatory
        //TODO: disable other option if i is selected?
        {
          key: 'i', role: 'input',
          content: new Map([
            ["nl", "Niet vastgesteld door een arts, of zelf vastgesteld, of anders namelijk"],
          ])
        },
      ]
    })
  }
}




export class FeverOtherCause3 extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'FOC3');

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
        ['nl', 'Welk onderzoek is hiervoor bij jou gedaan in de afgelopen 4 weken? (meerdere antwoorden mogelijk)'],
      ]),
      responseOptions: [
        //TODO: disable other option if a is selected?
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Geen onderzoek"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Bloedonderzoek"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "Slijm/speeksel onderzoek (sputum)"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "Urineonderzoek"],
          ])
        },
        {
          key: 'e', role: 'option',
          content: new Map([
            ["nl", "Ontlastingsonderzoek"],
          ])
        },
        {
          key: 'f', role: 'option',
          content: new Map([
            ["nl", "Huidonderzoek"],
          ])
        },
        {
          key: 'g', role: 'option',
          content: new Map([
            ["nl", "Ontstekingsvocht/pusonderzoek"],
          ])
        },
        {
          key: 'h', role: 'option',
          content: new Map([
            ["nl", "Longfoto (röntgenfoto/CT-scan)"],
          ])
        },
        //TODO: text field mandatory or not?
        {
          key: 'i', role: 'input',
          content: new Map([
            ["nl", "Ander onderzoek, namelijk:"],
          ])
        },
      ]
    })
  }
}


export class FeverOtherCause4 extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'FOC4');

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
        ['nl', 'Welke nieuwe klachten heb je sinds 4 weken (of heb je in de afgelopen 4 weken gehad)? (meerdere antwoorden mogelijk)'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Hoesten"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Hoofdpijn"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "Oorpijn"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "Loopneus"],
          ])
        },
        {
          key: 'e', role: 'option',
          content: new Map([
            ["nl", "Keelpijn"],
          ])
        },
        {
          key: 'f', role: 'option',
          content: new Map([
            ["nl", "Buikpijn"],
          ])
        },
        {
          key: 'g', role: 'option',
          content: new Map([
            ["nl", "Diarree (meer dan 5 maal per dag dunne ontlasting)"],
          ])
        },
        {
          key: 'h', role: 'option',
          content: new Map([
            ["nl", "Plasklachten (pijn bij het plassen en veranderde kleur/geur)"],
          ])
        },
        {
          key: 'i', role: 'option',
          content: new Map([
            ["nl", "Huidafwijkingen"],
          ])
        },
        //TODO: text field mandatory or not?
        {
          key: 'j', role: 'input',
          content: new Map([
            ["nl", "Andere klachten, namelijk:"],
          ])
        },
        //TODO: disable other option if k is selected? Or disbable k if one of the other is selected?
        {
          key: 'k', role: 'option',
          content: new Map([
            ["nl", "Geen van bovenstaande klachten"],
          ])
        },
      ]
    })
  }
}
