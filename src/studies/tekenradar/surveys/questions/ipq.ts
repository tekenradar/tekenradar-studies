import { Expression } from 'survey-engine/data_types';
import { Item, Group } from 'case-editor-tools/surveys/types';
import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';
import { ParticipantFlags } from '../../participantFlags';
import { SurveySuffix } from '../globalConstants';


export class IPQ extends Group {
  Header: Header;
  Q1: Awareness1;
  Q2: Awareness2;
  Q3: Awareness3;
  Q4: Awareness4;
  Q5: Awareness5;
  Q6: Awareness6;
  Q7: Awareness7;
  Q8: Awareness8;

  constructor(parentKey: string, isRequired?: boolean, condition?: Expression) {
    super(parentKey, 'IPQ');

    this.groupEditor.setCondition(condition);

    const required = isRequired !== undefined ? isRequired : false;

    const cond_adults = SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.ageCategory.key, ParticipantFlags.ageCategory.values.adult);
    const cond_kids = SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.ageCategory.key, ParticipantFlags.ageCategory.values.child);

    this.Header = new Header(this.key);
    this.Q1 = new Awareness1(this.key, required);
    this.Q2 = new Awareness2(this.key, required);
    this.Q3 = new Awareness3(this.key, required);
    this.Q4 = new Awareness4(this.key, required);
    this.Q5 = new Awareness5(this.key, required);
    this.Q6 = new Awareness6(this.key, required);
    this.Q7 = new Awareness7(this.key, required);
    this.Q8 = new Awareness8(this.key, required);
  }

  buildGroup() {
    this.addItem(this.Header.get());

    this.addItem(this.Q1.get());
    this.addItem(this.Q2.get());
    this.addItem(this.Q3.get());
    this.addItem(this.Q4.get());
    this.addItem(this.Q5.get());
    this.addItem(this.Q6.get());
    this.addItem(this.Q7.get());
    this.addItem(this.Q8.get());
  }
}


export class Header extends Item {
  markdownContentKids = `
# Klachten perceptie

De vragen hieronder zijn voor een minderjarige.
Als een ouder/verzorger helpt met invullen laat dan **je kind zelf** de antwoorden kiezen.

Klik alsjeblieft bij elke vraag het getal aan dat je mening het beste weergeeft:
`

  markdownContentAdults = `
# Klachten perceptie

Klik alsjeblieft bij elke vraag het getal aan dat je mening het beste weergeeft:
`

  constructor(parentKey: string, condition?: Expression) {
    super(parentKey, 'AwareT');

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
            ["nl", this.isPartOf(SurveySuffix.Kids) ? this.markdownContentKids : this.markdownContentAdults],
          ]),
          className: ''
        })
      ]
    })
  }
}


class Awareness1 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Hoeveel invloed heeft de tekenbeet, erythema migrans of andere ziekte van Lyme op je leven?'],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q1');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.responsiveSingleChoiceArray({
      defaultMode: 'horizontal',
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      scaleOptions: [
        {
          key: '0', content: new Map([
            ["nl", "0"],
          ])
        }, {
          key: '1', content: new Map([
            ["nl", "1"],
          ])
        }, {
          key: '2', content: new Map([
            ["nl", "2"],
          ])
        },
        {
          key: '3', content: new Map([
            ["nl", "3"],
          ])
        }, {
          key: '4', content: new Map([
            ["nl", "4"],
          ])
        }, {
          key: '5', content: new Map([
            ["nl", "5"],
          ])
        },
        {
          key: '6', content: new Map([
            ["nl", "6"],
          ])
        }, {
          key: '7', content: new Map([
            ["nl", "7"],
          ])
        }, {
          key: '8', content: new Map([
            ["nl", "8"],
          ])
        }, {
          key: '9', content: new Map([
            ["nl", "9"],
          ])
        }, {
          key: '10', content: new Map([
            ["nl", "10"],
          ])
        }
      ],
      rows: [
        {
          key: 'a', content: new Map([
            ["nl", "0 = Helemaal geen invloed, 10 = Zeer veel invloed"],
          ])
        },
      ],
    })
  }
}


class Awareness2 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Hoe lang denk je dat de tekenbeet, erythema migrans of andere ziekte van Lyme zal duren?'],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q2');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.responsiveSingleChoiceArray({
      defaultMode: 'horizontal',
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      scaleOptions: [
        {
          key: '0', content: new Map([
            ["nl", "0"],
          ])
        }, {
          key: '1', content: new Map([
            ["nl", "1"],
          ])
        }, {
          key: '2', content: new Map([
            ["nl", "2"],
          ])
        }, {
          key: '3', content: new Map([
            ["nl", "3"],
          ])
        }, {
          key: '4', content: new Map([
            ["nl", "4"],
          ])
        }, {
          key: '5', content: new Map([
            ["nl", "5"],
          ])
        }, {
          key: '6', content: new Map([
            ["nl", "6"],
          ])
        }, {
          key: '7', content: new Map([
            ["nl", "7"],
          ])
        }, {
          key: '8', content: new Map([
            ["nl", "8"],
          ])
        }, {
          key: '9', content: new Map([
            ["nl", "9"],
          ])
        }, {
          key: '10', content: new Map([
            ["nl", "10"],
          ])
        }
      ],
      rows: [
        {
          key: 'a', content: new Map([
            ["nl", "0 = Heel erg kort, 10 = Mijn hele leven"],
          ])
        },
      ],
      /*   {
           key: 'a',
           startLabel: new Map([
             ['de', 'Heel erg kort']
           ]),
           endLabel: new Map([
             ['de', 'Mijn hele leven']
           ]),
         },
       ],*/
      // withLabelRowModeProps: {
      //   useBottomLabel: true,
      // }
    })
  }
}


class Awareness3 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'In hoeverre meen je de tekenbeet, erythema migrans of andere ziekte van Lyme zelf te kunnen beheersen?'],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q3');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.responsiveSingleChoiceArray({
      defaultMode: 'horizontal',
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      scaleOptions: [
        {
          key: '0', content: new Map([
            ["nl", "0"],
          ])
        }, {
          key: '1', content: new Map([
            ["nl", "1"],
          ])
        }, {
          key: '2', content: new Map([
            ["nl", "2"],
          ])
        }, {
          key: '3', content: new Map([
            ["nl", "3"],
          ])
        }, {
          key: '4', content: new Map([
            ["nl", "4"],
          ])
        }, {
          key: '5', content: new Map([
            ["nl", "5"],
          ])
        }, {
          key: '6', content: new Map([
            ["nl", "6"],
          ])
        }, {
          key: '7', content: new Map([
            ["nl", "7"],
          ])
        }, {
          key: '8', content: new Map([
            ["nl", "8"],
          ])
        }, {
          key: '9', content: new Map([
            ["nl", "9"],
          ])
        }, {
          key: '10', content: new Map([
            ["nl", "10"],
          ])
        }
      ],
      rows: [
        {
          key: 'a', content: new Map([
            ["nl", "0 = Helemaal geen beheersing, 10 = Zeer veel beheersing"],
          ])
        },
      ],
    })
  }
}



class Awareness4 extends Item {

  questionTextMain_Adults = [
    {
      content: new Map([
        ["nl", 'In hoeverre denk je dat behandeling helpt bij de tekenbeet, erythema migrans of andere ziekte van Lyme?'],
      ]),
    }
  ]

  questionTextMain_Kids = [
    {
      content: new Map([
        ["nl", 'In hoeverre denk je dat behandeling helpt bij de tekenbeet, erythema migrans of andere ziekte van Lyme?'],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q4');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.responsiveSingleChoiceArray({
      defaultMode: 'horizontal',
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.isPartOf(SurveySuffix.Kids) ? this.questionTextMain_Kids : this.questionTextMain_Adults,
      scaleOptions: [
        {
          key: '0', content: new Map([
            ["nl", "0"],
          ])
        }, {
          key: '1', content: new Map([
            ["nl", "1"],
          ])
        }, {
          key: '2', content: new Map([
            ["nl", "2"],
          ])
        }, {
          key: '3', content: new Map([
            ["nl", "3"],
          ])
        }, {
          key: '4', content: new Map([
            ["nl", "4"],
          ])
        }, {
          key: '5', content: new Map([
            ["nl", "5"],
          ])
        }, {
          key: '6', content: new Map([
            ["nl", "6"],
          ])
        }, {
          key: '7', content: new Map([
            ["nl", "7"],
          ])
        }, {
          key: '8', content: new Map([
            ["nl", "8"],
          ])
        }, {
          key: '9', content: new Map([
            ["nl", "9"],
          ])
        }, {
          key: '10', content: new Map([
            ["nl", "10"],
          ])
        }
      ],
      rows: [
        {
          key: 'a', content: new Map([
            ["nl", "0 = Helemaal niet, 10 = Zeer veel"],
          ])
        },
      ],
    })
  }
}


class Awareness5 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'In hoeverre ervaar je lichamelijke klachten van de tekenbeet, erythema migrans of andere ziekte van Lyme?'],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q5');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.responsiveSingleChoiceArray({
      defaultMode: 'horizontal',
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      scaleOptions: [
        {
          key: '0', content: new Map([
            ["nl", "0"],
          ])
        }, {
          key: '1', content: new Map([
            ["nl", "1"],
          ])
        }, {
          key: '2', content: new Map([
            ["nl", "2"],
          ])
        }, {
          key: '3', content: new Map([
            ["nl", "3"],
          ])
        }, {
          key: '4', content: new Map([
            ["nl", "4"],
          ])
        }, {
          key: '5', content: new Map([
            ["nl", "5"],
          ])
        }, {
          key: '6', content: new Map([
            ["nl", "6"],
          ])
        }, {
          key: '7', content: new Map([
            ["nl", "7"],
          ])
        }, {
          key: '8', content: new Map([
            ["nl", "8"],
          ])
        }, {
          key: '9', content: new Map([
            ["nl", "9"],
          ])
        }, {
          key: '10', content: new Map([
            ["nl", "10"],
          ])
        }
      ],
      rows: [
        {
          key: 'a', content: new Map([
            ["nl", "0 = Helemaal geen klachten, 10 = Veel ernstige klachten"],
          ])
        },
      ],
    })
  }
}


class Awareness6 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'In hoeverre ben je bezorgd over de tekenbeet, erythema migrans of andere ziekte van Lyme?'],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q6');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.responsiveSingleChoiceArray({
      defaultMode: 'horizontal',
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      scaleOptions: [
        {
          key: '0', content: new Map([
            ["nl", "0"],
          ])
        }, {
          key: '1', content: new Map([
            ["nl", "1"],
          ])
        }, {
          key: '2', content: new Map([
            ["nl", "2"],
          ])
        }, {
          key: '3', content: new Map([
            ["nl", "3"],
          ])
        }, {
          key: '4', content: new Map([
            ["nl", "4"],
          ])
        }, {
          key: '5', content: new Map([
            ["nl", "5"],
          ])
        }, {
          key: '6', content: new Map([
            ["nl", "6"],
          ])
        }, {
          key: '7', content: new Map([
            ["nl", "7"],
          ])
        }, {
          key: '8', content: new Map([
            ["nl", "8"],
          ])
        }, {
          key: '9', content: new Map([
            ["nl", "9"],
          ])
        }, {
          key: '10', content: new Map([
            ["nl", "10"],
          ])
        }
      ],
      rows: [
        {
          key: 'a', content: new Map([
            ["nl", "0 = Helemaal niet bezorgd, 10 = Zeer bezorgd"],
          ])
        },
      ],
    })
  }
}


class Awareness7 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'In hoeverre heb je het gevoel dat je de tekenbeet, erythema migrans of andere ziekte van Lyme begrijpt?'],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q7');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.responsiveSingleChoiceArray({
      defaultMode: 'horizontal',
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      scaleOptions: [
        {
          key: '0', content: new Map([
            ["nl", "0"],
          ])
        }, {
          key: '1', content: new Map([
            ["nl", "1"],
          ])
        }, {
          key: '2', content: new Map([
            ["nl", "2"],
          ])
        }, {
          key: '3', content: new Map([
            ["nl", "3"],
          ])
        }, {
          key: '4', content: new Map([
            ["nl", "4"],
          ])
        }, {
          key: '5', content: new Map([
            ["nl", "5"],
          ])
        }, {
          key: '6', content: new Map([
            ["nl", "6"],
          ])
        }, {
          key: '7', content: new Map([
            ["nl", "7"],
          ])
        }, {
          key: '8', content: new Map([
            ["nl", "8"],
          ])
        }, {
          key: '9', content: new Map([
            ["nl", "9"],
          ])
        }, {
          key: '10', content: new Map([
            ["nl", "10"],
          ])
        }
      ],
      rows: [
        {
          key: 'a', content: new Map([
            ["nl", "0 = Ik begrijp mijn ziekte helemaal niet, 10 = Ik begrijp mijn ziekte helemaal"],
          ])
        },
      ],
    })
  }
}


class Awareness8 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'In hoeverre heeft de tekenbeet, erythema migrans of andere ziekte van Lyme invloed op je gemoedstoestand? (b.v. maakt het je boos, angstig, van streek, of somber?)'],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q8');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.responsiveSingleChoiceArray({
      defaultMode: 'horizontal',
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      footnoteText: new Map([
        ["nl", "© A.A. Kaptein, I.M. van Korlaar, M. Scharloo. Medische Psychologie, LUMC, 2004."]
      ]),
      scaleOptions: [
        {
          key: '0', content: new Map([
            ["nl", "0"],
          ])
        }, {
          key: '1', content: new Map([
            ["nl", "1"],
          ])
        }, {
          key: '2', content: new Map([
            ["nl", "2"],
          ])
        }, {
          key: '3', content: new Map([
            ["nl", "3"],
          ])
        }, {
          key: '4', content: new Map([
            ["nl", "4"],
          ])
        }, {
          key: '5', content: new Map([
            ["nl", "5"],
          ])
        }, {
          key: '6', content: new Map([
            ["nl", "6"],
          ])
        }, {
          key: '7', content: new Map([
            ["nl", "7"],
          ])
        }, {
          key: '8', content: new Map([
            ["nl", "8"],
          ])
        }, {
          key: '9', content: new Map([
            ["nl", "9"],
          ])
        }, {
          key: '10', content: new Map([
            ["nl", "10"],
          ])
        }
      ],
      rows: [
        {
          key: 'a', content: new Map([
            ["nl", "0 = Helemaal geen invloed, 10 = Zeer veel invloed"],
          ])
        },
      ],
    })
  }
}
