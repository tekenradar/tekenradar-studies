import { Expression } from 'survey-engine/data_types';
import { Item, Group } from 'case-editor-tools/surveys/types';
import { SurveyItems } from 'case-editor-tools/surveys';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';

export class HADSGroup extends Group {
  Header: Q_instructions;
  Q_a: Q_a;
  Q_b: Q_b;
  Q_c: Q_c;
  Q_d: Q_d;
  Q_e: Q_e;
  Q_f: Q_f;
  Q_g: Q_g;
  Q_h: Q_h;
  Q_i: Q_i;
  Q_j: Q_j;
  Q_k: Q_k;
  Q_l: Q_l;
  Q_m: Q_m;
  Q_n: Q_n;

  constructor(parentKey: string, isRequired?: boolean, condition?: Expression) {
    super(parentKey, 'HADSGroup');

    this.groupEditor.setCondition(condition);

    const required = isRequired !== undefined ? isRequired : false;

    this.Header = new Q_instructions(this.key);
    this.Q_a = new Q_a(this.key, required);
    this.Q_b = new Q_b(this.key, required);
    this.Q_c = new Q_c(this.key, required);
    this.Q_d = new Q_d(this.key, required);
    this.Q_e = new Q_e(this.key, required);
    this.Q_f = new Q_f(this.key, required);
    this.Q_g = new Q_g(this.key, required);
    this.Q_h = new Q_h(this.key, required);
    this.Q_i = new Q_i(this.key, required);
    this.Q_j = new Q_j(this.key, required);
    this.Q_k = new Q_k(this.key, required);
    this.Q_l = new Q_l(this.key, required);
    this.Q_m = new Q_m(this.key, required);
    this.Q_n = new Q_n(this.key, required);

  }

  buildGroup() {
    this.addItem(this.Header.get());

    this.addItem(this.Q_a.get());
    this.addItem(this.Q_b.get());
    this.addItem(this.Q_c.get());
    this.addItem(this.Q_d.get());
    this.addItem(this.Q_e.get());
    this.addItem(this.Q_f.get());
    this.addItem(this.Q_g.get());
    this.addItem(this.Q_h.get());
    this.addItem(this.Q_i.get());
    this.addItem(this.Q_j.get());
    this.addItem(this.Q_k.get());
    this.addItem(this.Q_l.get());
    this.addItem(this.Q_m.get());
    this.addItem(this.Q_n.get());
  }
}


class Q_instructions extends Item {
  markdownContent_F1 = `
# Angst en depressie

Het is bekend dat emoties bij de meeste ziektes een belangrijke rol spelen.

Met deze vragenlijst willen wij te weten te komen hoe je je voelt. Lees iedere vraag goed door en geef je antwoord aan met een kruisje in het hokje dat het beste weergeeft hoe je je gedurende de **afgelopen week** gevoeld hebt.

Denk niet te lang na over een antwoord. Het gaat bij deze uitspraken om je eigen indruk. Er bestaan geen foute antwoorden, elk antwoord is goed, zolang het maar je eigen indruk weergeeft.
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
            ["nl", this.markdownContent_F1],
          ]),
          className: ''
        })
      ]
    })
  }
}

export class Q_a extends Item {
  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q_a');

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
        ['nl', 'Ik voel me gespannen:'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "meestal"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "vaak"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "af en toe, soms"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "helemaal niet"],
          ])
        },
      ]
    })
  }
}

export class Q_b extends Item {
  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q_b');

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
        ["nl", "Ik geniet nog steeds van de dingen waar ik vroeger van genoot:"],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "zeker zo veel"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "wel wat minder"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "duidelijk minder"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "eigenlijk nauwelijks nog"],
          ])
        },
      ]
    });
  }
}

export class Q_c extends Item {
  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q_c');

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
        ["nl", "Ik heb een soort angstgevoel alsof er iets vreselijks zal gebeuren:"],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "jazeker, en vrij erg"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "ja, maar niet zo erg"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "een beetje, maar het hindert me niet"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "helemaal niet"],
          ])
        },
      ]
    });
  }
}

export class Q_d extends Item {
  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q_d');

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
        ["nl", "Ik kan  best lachen en de dingen van de vrolijke kant zien:"],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "net zoveel als vroeger"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "nu wel wat minder"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "duidelijk minder"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "helemaal niet"],
          ])
        },
      ]
    });
  }
}

export class Q_e extends Item {
  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q_e');

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
        ["nl", "Ik maak me ongerust:"],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "heel erg vaak"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "vaak"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "af en toe, maar niet zo vaak"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "heel soms"],
          ])
        },
      ]
    });
  }
}

export class Q_f extends Item {
  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q_f');

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
        ["nl", "Ik voel me opgewekt:"],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "helemaal niet"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "heel af en toe"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "soms"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "meestal"],
          ])
        },
      ]
    });
  }
}

export class Q_g extends Item {
  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q_g');

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
        ["nl", "Ik kan best rustig zitten en me ontspannen:"],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "jazeker"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "meestal"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "af en toe"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "helemaal niet"],
          ])
        },
      ]
    });
  }
}

export class Q_h extends Item {
  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q_h');

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
        ["nl", "Ik heb het gevoel dat alles moeizamer gaat:"],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "bijna altijd"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "heel vaak"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "soms"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "helemaal niet"],
          ])
        },
      ]
    });
  }
}

export class Q_i extends Item {
  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q_i');

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
        ["nl", "Ik heb een soort angstig, gespannen gevoel in mijn buik:"],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "helemaal niet"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "soms"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "vrij vaak"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "heel vaak"],
          ])
        },

      ]
    });
  }
}

export class Q_j extends Item {
  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q_j');

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
        ["nl", "Het interesseert me niet meer hoe ik eruit zie:"],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "inderdaad, helemaal niet meer"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "niet meer zoveel als eigenlijk zou moeten"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "het interesseert me wel, maar iets minder dan vroeger"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "het interesseert me nog net zoveel als vroeger"],
          ])
        },
      ]
    });
  }
}

export class Q_k extends Item {
  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q_k');

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
        ["nl", "Ik ben onrustig en voel dat ik iets te doen moet hebben:"],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "inderdaad, heel duidelijk"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "duidelijk"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "enigszins"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "helemaal niet"],
          ])
        },
      ]
    });
  }
}

export class Q_l extends Item {
  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q_l');

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
        ["nl", "Ik verheug me van tevoren op dingen die komen gaan:"],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "net zoveel als vroeger"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "een beetje minder dan vroeger"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "veel minder dan vroeger"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "bijna nooit"],
          ])
        },
      ]
    });
  }
}

export class Q_m extends Item {
  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q_m');

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
        ["nl", "Ik raak plotseling in paniek:"],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "inderdaad, zeer vaak"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "tamelijk vaak"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "soms"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "helemaal nooit"],
          ])
        },
      ]
    });
  }
}

export class Q_n extends Item {
  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q_n');

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
        ["nl", "Ik kan van een goed boek genieten, of van zoiets als een radio- of televisieprogramma:"],
      ]),
      responseOptions: [
        {
          key: '1', role: 'option',
          content: new Map([
            ["nl", "vaak"],
          ])
        },
        {
          key: '2', role: 'option',
          content: new Map([
            ["nl", "tamelijk vaak"],
          ])
        },
        {
          key: '3', role: 'option',
          content: new Map([
            ["nl", "af en toe"],
          ])
        },
        {
          key: '4', role: 'option',
          content: new Map([
            ["nl", "heel zelden"],
          ])
        },

      ]
    });
  }
}
