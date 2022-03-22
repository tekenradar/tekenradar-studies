import { Expression } from 'survey-engine/data_types';
import { Item, Group } from 'case-editor-tools/surveys/types';
import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';
import { SingleChoiceOptionTypes as SCOptions, ClozeItemTypes } from 'case-editor-tools/surveys';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';
import { ParticipantFlags } from '../../participantFlags';


export class IPQ_Parents extends Group {

  Header: Header;
  Q1: Awareness_Kids1;
  Q2: Awareness_Kids2;
  Q3: Awareness_Kids3;
  Q4: Awareness_Kids4;
  Q5: Awareness_Kids5;
  Q6: Awareness_Kids6;
  Q7: Awareness_Kids7;
  Q8: Awareness_Kids8;

  constructor(parentKey: string, isRequired?: boolean, condition?: Expression) {
    super(parentKey, 'IPQ_Parents');

    this.groupEditor.setCondition(condition);

    const required = isRequired !== undefined ? isRequired : false;

    this.Header = new Header(this.key, required);
    this.Q1 = new Awareness_Kids1(this.key, required);
    this.Q2 = new Awareness_Kids2(this.key, required);
    this.Q3 = new Awareness_Kids3(this.key, required);
    this.Q4 = new Awareness_Kids4(this.key, required);
    this.Q5 = new Awareness_Kids5(this.key, required);
    this.Q6 = new Awareness_Kids6(this.key, required);
    this.Q7 = new Awareness_Kids7(this.key, required);
    this.Q8 = new Awareness_Kids8(this.key, required);
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


class Header extends Item {

  markdownContent = `
# Klachten perceptie
LET OP: De vragen hieronder zijn voor een **ouder/verzorger**. Als je deze vragenlijst voor jezelf invult, vraag dan je ouder/verzorger de antwoorden op onderstaande vragen te geven.

Klik alsjeblieft bij elke vraag het getal aan dat je mening het beste weergeeft:
 `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Header');

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



class Awareness_Kids1 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Hoeveel invloed heeft de tekenbeet, erythema migrans of andere ziekte van lyme van je kind op je leven?'],
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


class Awareness_Kids2 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Hoe lang denk je dat de tekenbeet, erythema migrans of andere ziekte van lyme van je kind zal duren?'],
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
            ["nl", "0 = Heel erg kort, 10 = Het hele leven"],
          ])
        },
      ],
    })
  }
}


class Awareness_Kids3 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'In hoeverre meen je dat de tekenbeet, erythema migrans of andere ziekte van lyme van je kind te beheersen is?'],
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

class Awareness_Kids4 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'In hoeverre denk je dat de behandeling van je kind helpt bij de tekenbeet, erythema migrans of andere ziekte van lyme?'],
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
            ["nl", "0 = Helemaal niet, 10 = Zeer veel"],
          ])
        },
      ],
    })
  }
}



class Awareness_Kids5 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'In hoeverre ervaart je kind lichamelijke klachten van de tekenbeet, erythema migrans of andere ziekte van Lyme?'],
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


class Awareness_Kids6 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'In hoeverre ben je bezorgd over de tekenbeet, erythema migrans of andere ziekte van Lyme van je kind?'],
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


class Awareness_Kids7 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'In hoeverre heb je het gevoel dat je de tekenbeet, erythema migrans of andere ziekte van Lyme van je kind begrijpt?'],
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
            ["nl", "0 = Ik begrijp de ziekte helemaal niet, 10 = Ik begrijp de ziekte helemaal"],
          ])
        },
      ],
    })
  }
}


class Awareness_Kids8 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'In hoeverre heeft de tekenbeet, erythema migrans of andere ziekte van Lyme van je kind invloed op je gemoedstoestand? (b.v. maakt het je boos, angstig, van streek, of somber?)'],
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
