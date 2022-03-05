import { Expression } from 'survey-engine/data_types';
import { Item, Group } from 'case-editor-tools/surveys/types';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';
import { SurveyItems } from 'case-editor-tools/surveys';


export class SF36 extends Group {
  Header: Header;
  Q1: Functioning1;
  Q2: Functioning2;
  Q3: Functioning3;
  Q4: Functioning4;
  Q5: Functioning5;

  constructor(parentKey: string, isRequired?: boolean, condition?: Expression) {
    super(parentKey, 'SF36');

    this.groupEditor.setCondition(condition);

    const required = isRequired !== undefined ? isRequired : false;

    this.Header = new Header(this.key);
    this.Q1 = new Functioning1(this.key, required);
    this.Q2 = new Functioning2(this.key, required);
    this.Q3 = new Functioning3(this.key, required);
    this.Q4 = new Functioning4(this.key, required);
    this.Q5 = new Functioning5(this.key, required);
  }

  buildGroup() {
    this.addItem(this.Header.get());

    this.addItem(this.Q1.get());
    this.addItem(this.Q2.get());
    this.addItem(this.Q3.get());
    this.addItem(this.Q4.get());
    this.addItem(this.Q5.get());
  }
}


class Header extends Item {

  markdownContent = `
# Functioneren

In deze vragenlijst wordt naar je gezondheid gevraagd.
Wanneer je twijfelt over het antwoord op een vraag, probeer dan het antwoord te geven dat het meest van toepassing is.

De volgende vragen gaan over dagelijkse bezigheden.
    `

  constructor(parentKey: string, condition?: Expression) {
    super(parentKey, 'Header');
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

class Functioning1 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Word je door je gezondheid '],
      ]),
    },
    {
      content: new Map([
        ["nl", "op dit moment "],
      ]),
      className: "text-primary"
    },
    {
      content: new Map([
        ["nl", "beperkt bij deze bezigheden. Zo ja, in welke mate?"],
      ]),
    },
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q1');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.responsiveSingleChoiceArray({
      defaultMode: 'horizontal',
      responsiveModes: {
        md: 'table',
        sm: 'horizontal'
      },
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      scaleOptions: [
        {
          key: '1', content: new Map([
            ["nl", "Ernstig beperkt"],
          ])
        }, {
          key: '2', content: new Map([
            ["nl", "Een beetje beperkt"],
          ])
        }, {
          key: '3', content: new Map([
            ["nl", "Helemaal niet beperkt"],
          ])
        }
      ],
      rows: [
        {
          key: 'a', content: new Map([
            ["nl", "Forse inspanning (zoals hardlopen, zware voorwerpen tillen, inspannend sporten)"],
          ])
        },
        {
          key: 'b',
          content: new Map([
            ["nl", "Matige inspanning (zoals het verplaatsen van een tafel, stofzuigen, fietsen)"],
          ])
        },
        {
          key: 'c',
          content: new Map([
            ["nl", "Tillen of boodschappen dragen"],
          ])
        },
        {
          key: 'd',
          content: new Map([
            ["nl", "Een paar trappen oplopen"],
          ]),
        },
        {
          key: 'e',
          content: new Map([
            ["nl", "Een trap oplopen"],
          ])
        },
        {
          key: 'f',
          content: new Map([
            ["nl", "Buigen, knielen, of bukken"],
          ])
        },
        {
          key: 'g',
          content: new Map([
            ["nl", "Meer dan een kilometer lopen"],
          ])
        },
        {
          key: 'h',
          content: new Map([
            ["nl", "Een halve kilometer lopen"],
          ])
        },
        {
          key: 'i',
          content: new Map([
            ["nl", "Honderd meter lopen"],
          ])
        },
        {
          key: 'j',
          content: new Map([
            ["nl", "Jezelf wassen en aankleden"],
          ])
        }
      ]
    })
  }
}


class Functioning2 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'In hoeverre heeft je lichamelijke gezondheid of hebben je emotionele problemen je de '],
      ]),
    },
    {
      content: new Map([
        ["nl", "afgelopen 4 weken "],
      ]),
      className: "text-primary"
    },
    {
      content: new Map([
        ["nl", "belemmerd in je normale sociale bezigheden met gezin, vrienden, buren of anderen?"],
      ]),
    },
  ]


  constructor(parentKey: string, isRequired?: boolean, condition?: Expression) {
    super(parentKey, 'Q2');

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
            ["nl", "Helemaal niet"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Enigszins"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "Nogal"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "Veel"],
          ])
        },
        {
          key: 'e', role: 'option',
          content: new Map([
            ["nl", "Heel erg veel"],
          ])
        }
      ]
    })
  }
}


class Functioning3 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Hoe vaak hebben je lichamelijke gezondheid of emotionele problemen gedurende de '],
      ]),
    },
    {
      content: new Map([
        ["nl", "afgelopen 4 weken "],
      ]),
      className: "text-primary"
    },
    {
      content: new Map([
        ["nl", "je sociale activiteiten (zoals bezoek aan vrienden of naaste familieleden) belemmerd?"],
      ]),
    },
  ]

  constructor(parentKey: string, isRequired?: boolean, condition?: Expression) {
    super(parentKey, 'Q3');

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
            ["nl", "Voortdurend"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Meestal"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "Soms"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "Zelden"],
          ])
        },
        {
          key: 'e', role: 'option',
          content: new Map([
            ["nl", "Nooit"],
          ])
        }
      ]
    })
  }
}



class Functioning4 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Hoeveel pijn had je de '],
      ]),
    },
    {
      content: new Map([
        ["nl", "afgelopen 4 weken"],
      ]),
      className: "text-primary"
    },
    {
      content: new Map([
        ["nl", "?"],
      ]),
    },
  ]


  constructor(parentKey: string, isRequired?: boolean, condition?: Expression) {
    super(parentKey, 'Q4');

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
            ["nl", "Geen"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Heel licht"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "Licht"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "Nogal"],
          ])
        },
        {
          key: 'e', role: 'option',
          content: new Map([
            ["nl", "Ernstig"],
          ])
        },
        {
          key: 'f', role: 'option',
          content: new Map([
            ["nl", "Heel ernstig"],
          ])
        }
      ]
    })
  }
}


class Functioning5 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'In welke mate heeft pijn je de '],
      ]),
    },
    {
      content: new Map([
        ["nl", "afgelopen 4 weken "],
      ]),
      className: "text-primary"
    },
    {
      content: new Map([
        ["nl", "belemmerd bij je normale werkzaamheden (zowel werk buitenshuis als huishoudelijk werk)?"],
      ]),
    },
  ]
  constructor(parentKey: string, isRequired?: boolean, condition?: Expression) {
    super(parentKey, 'Q5');

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
            ["nl", "Helemaal niet"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Een klein beetje"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "Nogal"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "Veel"],
          ])
        },
        {
          key: 'e', role: 'option',
          content: new Map([
            ["nl", "Heel erg veel"],
          ])
        }
      ]
    })
  }
}
