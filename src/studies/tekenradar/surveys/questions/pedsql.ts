import { Expression } from 'survey-engine/data_types';
import { Item, Group } from 'case-editor-tools/surveys/types';
import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';


export class Pedsql_2_4 extends Group {
  Header: FunctioningText1F1_Kids;
  Q1: Q1F1;
  Q2: Q2F1;
  Q3: Q3F1;
  Q4pre: Q4preF1_Kids;
  Q4: Q4F1;

  constructor(parentKey: string, isRequired?: boolean, condition?: Expression) {
    super(parentKey, 'Pedsql_2_4');

    this.groupEditor.setCondition(condition);

    const required = isRequired !== undefined ? isRequired : false;

    this.Header = new FunctioningText1F1_Kids(this.key);
    this.Q1 = new Q1F1(this.key, required);
    this.Q2 = new Q2F1(this.key, required);
    this.Q3 = new Q3F1(this.key, required);
    this.Q4pre = new Q4preF1_Kids(this.key, required);

    const Q4condition = SurveyEngine.singleChoice.any(this.Q4pre.key, this.Q4pre.optionKeys.yes);
    this.Q4 = new Q4F1(this.key, required, Q4condition);
  }

  buildGroup() {
    this.addItem(this.Header.get());

    this.addItem(this.Q1.get());
    this.addItem(this.Q2.get());
    this.addItem(this.Q3.get());
    this.addItem(this.Q4pre.get());
    this.addItem(this.Q4.get());
  }
}


export class Pedsql_5_7 extends Group {
  Header: FunctioningText1F1_Kids;
  Q1: Q1F2;
  Q2: Q2F2;
  Q3: Q3F2;
  Q4: Q4F2;

  constructor(parentKey: string, isRequired?: boolean, condition?: Expression) {
    super(parentKey, 'Pedsql_5_7');

    this.groupEditor.setCondition(condition);

    const required = isRequired !== undefined ? isRequired : false;

    this.Header = new FunctioningText1F1_Kids(this.key);
    this.Q1 = new Q1F2(this.key, required);
    this.Q2 = new Q2F2(this.key, required);
    this.Q3 = new Q3F2(this.key, required);
    this.Q4 = new Q4F2(this.key, required);
  }

  buildGroup() {
    this.addItem(this.Header.get());

    this.addItem(this.Q1.get());
    this.addItem(this.Q2.get());
    this.addItem(this.Q3.get());
    this.addItem(this.Q4.get());
  }
}


export class Pedsql_8_12 extends Group {
  Header: FunctioningText1F3_Kids;
  Q1: Q1F3;
  Q2: Q2F3;
  Q3: Q3F3;
  Q4: Q4F3;

  constructor(parentKey: string, isRequired?: boolean, condition?: Expression) {
    super(parentKey, 'Pedsql_8_12');

    this.groupEditor.setCondition(condition);

    const required = isRequired !== undefined ? isRequired : false;

    this.Header = new FunctioningText1F3_Kids(this.key);
    this.Q1 = new Q1F3(this.key, required);
    this.Q2 = new Q2F3(this.key, required);
    this.Q3 = new Q3F3(this.key, required);
    this.Q4 = new Q4F3(this.key, required);
  }

  buildGroup() {
    this.addItem(this.Header.get());

    this.addItem(this.Q1.get());
    this.addItem(this.Q2.get());
    this.addItem(this.Q3.get());
    this.addItem(this.Q4.get());
  }
}


export class Pedsql_13_18 extends Group {
  Header: FunctioningText1F3_Kids;
  Q1: Q1F3;
  Q2: Q2F3;
  Q3: Q3F4;
  Q4: Q4F3;

  constructor(parentKey: string, isRequired?: boolean, condition?: Expression) {
    super(parentKey, 'Pedsql_13_18');

    this.groupEditor.setCondition(condition);

    const required = isRequired !== undefined ? isRequired : false;

    this.Header = new FunctioningText1F3_Kids(this.key);
    this.Q1 = new Q1F3(this.key, required);
    this.Q2 = new Q2F3(this.key, required);
    this.Q3 = new Q3F4(this.key, required);
    this.Q4 = new Q4F3(this.key, required);
  }

  buildGroup() {
    this.addItem(this.Header.get());

    this.addItem(this.Q1.get());
    this.addItem(this.Q2.get());
    this.addItem(this.Q3.get());
    this.addItem(this.Q4.get());
  }
}

const optionHint = ComponentGenerators.markdown({
  content: new Map([['nl', `
0 = Nooit, 1 = Bijna nooit, 2 = Soms, 3 = Vaak, 4 = Bijna altijd
        `]])
});

const scaleOptions = [
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
  }
];


class FunctioningText1F1_Kids extends Item {
  markdownContent_F1 = `
# Functioneren
De vragen hieronder zijn voor **een ouder/verzorger**.

Hieronder staat een lijst van dingen die een probleem kunnen zijn voor je kind. Kun je ons vertellen **hoe vaak** je kind in de **afgelopen week** met elk van deze dingen problemen heeft gehad? Vink het cijfer aan dat het beste van toepassing is. Je kunt kiezen uit:
  - **0** als het **nooit** een probleem is
  - **1** als het **bijna nooit** een probleem is
  - **2** als het **soms** een probleem is
  - **3** als het **vaak** een probleem is
  - **4** als het **bijna altijd** een probleem is

Er zijn geen goede of foute antwoorden.

##### Hoe vaak heeft je kind in de **afgelopen week** problemen gehad met ...
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
          content: new Map([ // this.isPartOf("Followupflow_Kids") ? this.qTextKids : this.qTextMain,
            ["nl", this.markdownContent_F1],
          ]),
          className: ''
        })
      ]
    })
  }
}


class Q1F1 extends Item {

  questionTextMain = [
    /*{
        content: new Map([
            ["nl", 'Hoe vaak heeft je kind in de '],
        ]),
    },
    {
        content: new Map([
            ["nl", " afgelopen week"],
        ]),
        className: "text-decoration-underline"
    },*/
    {
      content: new Map([
        ["nl", "Lichamelijk functioneren (problemen met…)"],
      ]),
    }
  ]


  option_c = [
    {
      content: new Map([
        ["nl", "Deelnemen aan actief spel of lichamelijke oefeningen"],
      ]),
    }
  ]


  option_e = [
    {
      content: new Map([
        ["nl", "Baden"],
      ]),
    }
  ]


  option_f = [
    {
      content: new Map([
        ["nl", "Helpen met speelgoed opruimen"],
      ]),
    }
  ]



  option_g = [
    {
      content: new Map([
        ["nl", "Het hebben van pijn"],
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
      topDisplayCompoments: [optionHint],
      scaleOptions: scaleOptions,
      rows: [
        {
          key: 'a', content: new Map([
            ["nl", "Meer dan één straat op en neer lopen"],
          ])
        },
        {
          key: 'b',
          content: new Map([
            ["nl", "Rennen"],
          ]),
        },
        {
          key: 'c',
          content: this.option_c,
          //displayCondition: this.condition_F1,
        },
        {
          key: 'd',
          content: new Map([
            ["nl", "Iets zwaars optillen"],
          ]),
        },
        {
          key: 'e',
          content: this.option_e,
        },
        {
          key: 'f',
          content: this.option_f,
        },
        {
          key: 'g',
          content: this.option_g,
        },
        {
          key: 'h',
          content: new Map([
            ["nl", "Weinig energie hebben"],
          ])
        },
      ]
    })
  }
}

class Q2F1 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", "Emotioneel functioneren (problemen met…)"],
      ]),
    }
  ]


  option_e = [
    {
      content: new Map([
        ["nl", "Zich zorgen maken/bang zijn"],
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
      topDisplayCompoments: [optionHint],
      scaleOptions: scaleOptions,
      rows: [
        {
          key: 'a', content: new Map([
            ["nl", "Zich angstig of bang voelen"],
          ])
        },
        {
          key: 'b',
          content: new Map([
            ["nl", "Zich verdrietig of somber voelen"],
          ])
        },
        {
          key: 'c',
          content: new Map([
            ["nl", "Zich boos voelen"],
          ])
        },
        {
          key: 'd',
          content: new Map([
            ["nl", "Moeite met slapen"],
          ]),
        },
        {
          key: 'e',
          content: this.option_e,
        },
      ]
    })
  }
}


class Q3F1 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", "Sociaal functioneren (problemen met…)"],
      ]),
    }
  ]


  option_a = [
    {
      content: new Map([
        ["nl", "Spelen met andere kinderen"],
      ]),
    }
  ]

  option_d = [
    {
      content: new Map([
        ["nl", "Bepaalde dingen niet kunnen die andere kinderen van zijn/haar leeftijd wel kunnen"],
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
      topDisplayCompoments: [optionHint],
      scaleOptions: scaleOptions,
      rows: [
        {
          key: 'a', content: this.option_a,
        },
        {
          key: 'b',
          content: new Map([
            ["nl", "Andere kinderen willen zijn/haar vriend(in) niet zijn"],
          ])
        },
        {
          key: 'c',
          content: new Map([
            ["nl", "Gepest worden door andere kinderen"],
          ])
        },
        {
          key: 'd',
          content: this.option_d,
        },
        {
          key: 'e',
          content: new Map([
            ["nl", "Mee kunnen blijven doen tijdens het spelen met andere kinderen"],
          ])
        },
      ]
    })
  }
}


class Q4preF1_Kids extends Item {
  optionKeys = {
    yes: 'a'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q4pre');

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
        ['nl', 'Gaat je kind naar school, kinderdagverblijf of naar de peuterspeelzaal?'],
      ]),
      responseOptions: [
        {
          key: this.optionKeys.yes, role: 'option',
          content: new Map([
            ["nl", "Ja, mijn kind gaat naar school, kinderdagverblijf of naar de peuterspeelzaal"],
          ]),
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Nee, mijn kind gaat (nog) niet naar school, kinderdagverblijf of naar de peuterspeelzaal"],
          ])
        },
      ]
    })
  }
}


class Q4F1 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", "Functioneren op school (problemen met…)"],
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
      topDisplayCompoments: [optionHint],
      scaleOptions: scaleOptions,
      rows: [
        {
          key: 'a', content: new Map([
            ["nl", "Dezelfde school activiteiten doen als de andere kinderen"],
          ])
        },
        {
          key: 'b',
          content: new Map([
            ["nl", "Niet naar school/peuterspeelzaal gaan vanwege zich niet lekker voelen"],
          ])
        },
        {
          key: 'c',
          content: new Map([
            ["nl", "Niet naar school/peuterspeelzaal gaan omdat hij/zij naar de dokter of het ziekenhuis moet"],
          ])
        },
      ]
    })
  }
}


class Q1F2 extends Item {
  questionTextMain = [
    {
      content: new Map([
        ["nl", "Lichamelijk functioneren (problemen met…)"],
      ]),
    }
  ]


  option_c = [
    {
      content: new Map([
        ["nl", "Deelnemen aan sportactiviteiten of lichamelijke oefeningen"],
      ]),
    }
  ]


  option_e = [
    {
      content: new Map([
        ["nl", "Zelfstandig een bad of douche nemen"],
      ]),
    }
  ]

  option_f = [
    {
      content: new Map([
        ["nl", "Karweitjes doen, zoals het opruimen van zijn / haar speelgoed"],
      ]),
    }
  ]



  option_g = [
    {
      content: new Map([
        ["nl", "Het hebben van wondjes of pijn"],
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
      topDisplayCompoments: [optionHint],
      scaleOptions: scaleOptions,
      rows: [
        {
          key: 'a', content: new Map([
            ["nl", "Meer dan één straat op en neer lopen"],
          ])
        },
        {
          key: 'b',
          content: new Map([
            ["nl", "Rennen"],
          ]),
        },
        {
          key: 'c',
          content: this.option_c,
          //displayCondition: this.condition_F1,
        },
        {
          key: 'd',
          content: new Map([
            ["nl", "Iets zwaars optillen"],
          ]),
        },
        {
          key: 'e',
          content: this.option_e,
        },
        {
          key: 'f',
          content: this.option_f,
        },
        {
          key: 'g',
          content: this.option_g,
        },
        {
          key: 'h',
          content: new Map([
            ["nl", "Weinig energie hebben"],
          ])
        },
      ]
    })
  }
}


class Q2F2 extends Item {
  questionTextMain = [
    {
      content: new Map([
        ["nl", "Emotioneel functioneren (problemen met…)"],
      ]),
    }
  ]


  option_e = [
    {
      content: new Map([
        ["nl", "Zorgen maken over wat hem/ haar zal overkomen"],
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
      topDisplayCompoments: [optionHint],
      scaleOptions: scaleOptions,
      rows: [
        {
          key: 'a', content: new Map([
            ["nl", "Zich angstig of bang voelen"],
          ])
        },
        {
          key: 'b',
          content: new Map([
            ["nl", "Zich verdrietig of somber voelen"],
          ])
        },
        {
          key: 'c',
          content: new Map([
            ["nl", "Zich boos voelen"],
          ])
        },
        {
          key: 'd',
          content: new Map([
            ["nl", "Moeite met slapen"],
          ]),
        },
        {
          key: 'e',
          content: this.option_e,
        },
      ]
    })
  }
}


class Q3F2 extends Item {
  questionTextMain = [
    {
      content: new Map([
        ["nl", "Sociaal functioneren (problemen met…)"],
      ]),
    }
  ]


  option_a = [
    {
      content: new Map([
        ["nl", "Op kunnen schieten met andere kinderen"],
      ]),
    }
  ]

  option_d = [
    {
      content: new Map([
        ["nl", "Kan bepaalde dingen niet die andere kinderen van zijn/ haar leeftijd wel kunnen"],
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
      topDisplayCompoments: [optionHint],
      scaleOptions: scaleOptions,
      rows: [
        {
          key: 'a', content: this.option_a,
        },
        {
          key: 'b',
          content: new Map([
            ["nl", "Andere kinderen willen zijn/haar vriend(in) niet zijn"],
          ])
        },
        {
          key: 'c',
          content: new Map([
            ["nl", "Gepest worden door andere kinderen"],
          ])
        },
        {
          key: 'd',
          content: this.option_d,
        },
        {
          key: 'e',
          content: new Map([
            ["nl", "Mee kunnen blijven doen tijdens het spelen met andere kinderen"],
          ])
        },
      ]
    })
  }
}


class Q4F2 extends Item {
  questionTextMain = [
    {
      content: new Map([
        ["nl", "School functioneren (problemen met ...)"],
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
      topDisplayCompoments: [optionHint],
      scaleOptions: scaleOptions,
      rows: [
        {
          key: 'a', content: new Map([
            ["nl", "Opletten tijdens de les"],
          ])
        },
        {
          key: 'b',
          content: new Map([
            ["nl", "Dingen vergeten"],
          ])
        },
        {
          key: 'c',
          content: new Map([
            ["nl", "Bijblijven met schoolwerk"],
          ])
        },
        {
          key: 'd',
          content: new Map([
            ["nl", "Niet naar school gaan vanwege niet lekker voelen  "],
          ])
        },
        {
          key: 'e',
          content: new Map([
            ["nl", "Niet naar school gaan om naar de dokter of het ziekenhuis te moeten"],
          ])
        },
      ]
    })
  }
}


class FunctioningText1F3_Kids extends Item {
  markdownContent_F3 = `
  # Functioneren
  De vragen hieronder zijn voor een minderjarige. Als een ouder/verzorger helpt met invullen laat dan **je kind zelf** de antwoorden kiezen.

  Op deze pagina staat een lijst van dingen die een probleem voor jou kunnen zijn. Kun je ons vertellen **hoe vaak** je in de **afgelopen week** met elk van deze dingen problemen hebt gehad?
  Klik het bolletje aan bij:
  - **0** als het **nooit** een probleem is
  - **1** als het **bijna nooit** een probleem is
  - **2** als het **soms** een probleem is
  - **3** als het **vaak** een probleem is
  - **4** als het **bijna altijd** een probleem is

  Er zijn geen goede of foute antwoorden.

  ##### Hoe vaak heb je in de **afgelopen week** problemen gehad met...
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
          content: new Map([ // this.isPartOf("Followupflow_Kids") ? this.qTextKids : this.qTextMain,
            ["nl", this.markdownContent_F3],
          ]),
          className: ''
        })
      ]
    })
  }
}


class Q1F3 extends Item {
  questionTextMain = [
    {
      content: new Map([
        ["nl", "Over mijn gezondheid en activiteiten (problemen met ... )"],
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
      topDisplayCompoments: [optionHint],
      scaleOptions: scaleOptions,
      rows: [
        {
          key: 'a', content: new Map([
            ["nl", "Het is voor mij moeilijk om meer dan één straat op en neer te lopen"],
          ])
        },
        {
          key: 'b',
          content: new Map([
            ["nl", "Het is voor mij moeilijk om te rennen"],
          ])
        },
        {
          key: 'c',
          content: new Map([
            ["nl", "Het is voor mij moeilijk om te sporten of lichamelijke oefeningen te doen"],
          ])
        },
        {
          key: 'd',
          content: new Map([
            ["nl", "Het is voor mij moeilijk om iets zwaars op te tillen"],
          ]),
        },
        {
          key: 'e',
          content: new Map([
            ["nl", "Het is voor mij moeilijk om zelfstandig een bad of douche te nemen"],
          ])
        },
        {
          key: 'f',
          content: new Map([
            ["nl", "Het is voor mij moeilijk om karweitjes rond het huis te doen"],
          ])
        },
        {
          key: 'g',
          content: new Map([
            ["nl", "Ik heb wondjes of pijn"],
          ])
        },
        {
          key: 'h',
          content: new Map([
            ["nl", "Ik heb weinig energie"],
          ])
        },
      ]
    })
  }
}


class Q2F3 extends Item {
  questionTextMain = [
    {
      content: new Map([
        ["nl", "Over mijn gevoelens (problemen met ... )"],
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
      topDisplayCompoments: [optionHint],
      scaleOptions: scaleOptions,
      rows: [
        {
          key: 'a', content: new Map([
            ["nl", "Ik voel me angstig of bang"],
          ])
        },
        {
          key: 'b',
          content: new Map([
            ["nl", "Ik voel me verdrietig of somber"],
          ])
        },
        {
          key: 'c',
          content: new Map([
            ["nl", "Ik voel me boos"],
          ])
        },
        {
          key: 'd',
          content: new Map([
            ["nl", "Ik heb moeite met slapen"],
          ]),
        },
        {
          key: 'e',
          content: new Map([
            ["nl", "Ik maak me zorgen over wat mij zal overkomen"],
          ])
        },
      ]
    })
  }
}


class Q3F3 extends Item {
  questionTextMain = [
    {
      content: new Map([
        ["nl", "Hoe ik met anderen op kan schieten (problemen met ... )"],
      ]),
    }
  ]


  option_a = [
    {
      content: new Map([
        ["nl", "Ik heb problemen om met andere kinderen op te schieten"],
      ]),
    }
  ]

  option_b = [
    {
      content: new Map([
        ["nl", "Andere kinderen willen mijn vriend(in) niet zijn"],
      ]),
    }
  ]

  option_c = [
    {
      content: new Map([
        ["nl", "Andere kinderen pesten mij"],
      ]),
    }
  ]

  option_d = [
    {
      content: new Map([
        ["nl", "Ik kan bepaalde dingen niet die andere kinderen van mijn leeftijd wel kunnen"],
      ]),
    }
  ]


  option_e = [
    {
      content: new Map([
        ["nl", "Het is moeilijk mee te kunnen blijven doen als ik met andere kinderen speel"],
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
      topDisplayCompoments: [optionHint],
      scaleOptions: scaleOptions,
      rows: [
        {
          key: 'a',
          content: this.option_a,
        },
        {
          key: 'b',
          content: this.option_b,
        },
        {
          key: 'c',
          content: this.option_c,
        },
        {
          key: 'd',
          content: this.option_d,
        },
        {
          key: 'e',
          content: this.option_e,
        },
      ]
    })
  }
}


class Q4F3 extends Item {
  questionTextMain = [
    {
      content: new Map([
        ["nl", "Over school (problemen met ... )"],
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
      topDisplayCompoments: [optionHint],
      scaleOptions: scaleOptions,
      rows: [
        {
          key: 'a', content: new Map([
            ["nl", "Het is moeilijk om op te letten tijdens de les"],
          ])
        },
        {
          key: 'b',
          content: new Map([
            ["nl", "Ik vergeet dingen"],
          ])
        },
        {
          key: 'c',
          content: new Map([
            ["nl", "Ik heb moeite om mijn huiswerk bij te houden"],
          ])
        },
        {
          key: 'd',
          content: new Map([
            ["nl", "Ik ga niet naar school, omdat ik me niet lekker voel"],
          ])
        },
        {
          key: 'e',
          content: new Map([
            ["nl", "Ik ga niet naar school, omdat ik naar de dokter of het ziekenhuis moet"],
          ])
        },
      ]
    })
  }
}


class Q3F4 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", "Hoe ik met anderen op kan schieten (problemen met ... )"],
      ]),
    }
  ]


  option_a = [
    {
      content: new Map([
        ["nl", "Ik heb problemen om met andere tieners op te schieten"],
      ]),
    }
  ]


  option_b = [
    {
      content: new Map([
        ["nl", "Andere tieners willen mijn vriend(in) niet zijn"],
      ]),
    }
  ]

  option_c = [
    {
      content: new Map([
        ["nl", "Andere tieners pesten mij"],
      ]),
    }
  ]

  option_d = [
    {
      content: new Map([
        ["nl", "Ik kan bepaalde dingen niet die andere tieners van mijn leeftijd wel kunnen"],
      ]),
    }
  ]

  option_e = [
    {
      content: new Map([
        ["nl", "Het is moeilijk om mee te kunnen blijven doen met mijn leeftijdsgenoten"],
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
      topDisplayCompoments: [optionHint],
      scaleOptions: scaleOptions,
      rows: [
        {
          key: 'a',
          content: this.option_a,
        },
        {
          key: 'b',
          content: this.option_b,
        },
        {
          key: 'c',
          content: this.option_c,
        },
        {
          key: 'd',
          content: this.option_d,
        },
        {
          key: 'e',
          content: this.option_e,
        },
      ]
    })
  }
}
