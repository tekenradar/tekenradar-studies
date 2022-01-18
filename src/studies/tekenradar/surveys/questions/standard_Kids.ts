import { Expression } from 'survey-engine/data_types';
import { Item, Group } from 'case-editor-tools/surveys/types';
import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';
import { SingleChoiceOptionTypes as SCOptions, ClozeItemTypes } from 'case-editor-tools/surveys';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';
import { ParticipantFlags } from '../../participantFlags';




export class QuestionsKids extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'QuKids');

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
        ['nl', 'Wie vult op dit moment de vragen in deze vragenlijst in?'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Ikzelf, degene jonger dan 18 jaar"],
          ])
        },
        {
          key: 'b', role: 'input',
          content: new Map([//TODO: insert radion button subitems here
            ["nl", "Een ouder/verzorger van degene jonger dan 18 jaar, namelijk:"],
          ])
        },
      ]
    })
  }
}



export class TextQUKids extends Item {

  markdownContent = `
Let op: bovenaan de pagina staat steeds wie de vragen kan beantwoorden (zie ook hierboven)! Soms is dat degene over/voor wie de vragenlijst wordt ingevuld, soms een ouder/verzorger, en soms maakt het niet.
    `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'TextQuKids');

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



export class FunctioningText1F1_Kids extends Item {

  condition_F1: Expression;

  markdownContent_F1 = `
# Functioneren
De vragen hieronder zijn voor **een ouder/verzorger**.

Hieronder staat een lijst van dingen die een probleem kunnen zijn voor uw kind. Kunt u ons vertellen **hoe vaak** uw kind in de **afgelopen week** met elk van deze dingen problemen heeft gehad? Vink het cijfer aan dat het beste van toepassing is. U kunt kiezen uit:
  - **0** als het **nooit** een probleem is
  - **1** als het **bijna nooit** een probleem is
  - **2** als het **soms** een probleem is
  - **3** als het **vaak** een probleem is
  - **4** als het **bijna altijd** een probleem is

Er zijn geen goede of foute antwoorden.
    `

  markdownContent_F3 = `
  # Functioneren
  De vragen hieronder zijn voor een minderjarige. Als een ouder/verzorger helpt met invullen laat dan **uw kind zelf** de antwoorden kiezen.

  Op deze pagina staat een lijst van dingen die een probleem voor jou kunnen zijn. Kun je ons vertellen **hoe vaak** je in de **afgelopen week** met elk van deze dingen problemen hebt gehad?
  Klik het bolletje aan bij:
  - **0** als het **nooit** een probleem is
  - **1** als het **bijna nooit** een probleem is
  - **2** als het **soms** een probleem is
  - **3** als het **vaak** een probleem is
  - **4** als het **bijna altijd** een probleem is

  Er zijn geen goede of foute antwoorden.
      `

  constructor(parentKey: string, isRequired: boolean, condition1: Expression, condition2: Expression) {
    super(parentKey, 'kS_F1Text1');

    this.isRequired = isRequired;
    this.condition = condition1;
    this.condition_F1 = condition2;

  }

  buildItem() {
    return SurveyItems.display({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      content: [
        ComponentGenerators.markdown({
          content: new Map([ // this.isPartOf("Followupflow_Kids") ? this.qTextKids : this.qTextMain,
            ["nl",  this.condition_F1 ? this.markdownContent_F1 : this.markdownContent_F3],
          ]),
          className: ''
        })
      ]
    })
  }
}



export class FunctioningText2F1_Kids extends Item {

  condition_F1: Expression;
  markdownContent_F1 = `
Hoe vaak heeft uw kind in de **afgelopen week** problemen gehad met:
    `

  markdownContent_F3 = `
Hoe vaak heb je in de **afgelopen week** problemen gehad met...
    `

  constructor(parentKey: string, isRequired: boolean, condition1: Expression, condition2: Expression) {
    super(parentKey, 'kS_F1Text2');

    this.isRequired = isRequired;
    this.condition = condition1;
    this.condition_F1 = condition2;
  }

  buildItem() {
    return SurveyItems.display({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      content: [
        ComponentGenerators.markdown({
          content: new Map([
            ["nl", this.condition_F1 ? this.markdownContent_F1 : this.markdownContent_F3],
          ]),
          className: ''
        })
      ]
    })
  }
}

export class Functioning1F1_Kids extends Item {

  condition_F1: Expression;
  questionTextMain = [
    /*{
        content: new Map([
            ["nl", 'Hoe vaak heeft uw kind in de '],
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


  options_c = {
    F1: new Map([
      ["nl", "Deelnemen aan actief spel of lichamelijke oefeningen"],
    ]),
    F2: new Map([
      ["nl", "Deelnemen aan sportactiviteiten of lichamelijke oefeningen"],
    ]),
  }


  option_c_f1 = [
    {
      content: new Map([
          ["nl", "Deelnemen aan actief spel of lichamelijke oefeningen"],
      ]),
    }
  ]

  option_c_f2 = [
    {
      content: new Map([
          ["nl", "Deelnemen aan sportactiviteiten of lichamelijke oefeningen"],
      ]),
    }
  ]

  option_e_f1 = [
    {
      content: new Map([
          ["nl", "Baden"],
      ]),
    }
  ]

  option_e_f2 = [
    {
      content: new Map([
          ["nl", "Zelfstandig een bad of douche nemen"],
      ]),
    }
  ]

  option_f_f1 = [
    {
      content: new Map([
          ["nl", "Helpen met speelgoed opruimen"],
      ]),
    }
  ]

  option_f_f2 = [
    {
      content: new Map([
          ["nl", "Karweitjes doen, zoals het opruimen van zijn / haar speelgoed"],
      ]),
    }
  ]


  option_g_f1 = [
    {
      content: new Map([
          ["nl", "Het hebben van pijn"],
      ]),
    }
  ]

  option_g_f2 = [
    {
      content: new Map([
          ["nl", "Het hebben van wondjes of pijn"],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition1: Expression, condition2: Expression) {
    super(parentKey, 'Func1kS_F1');

    this.isRequired = isRequired;
    this.condition = condition1;
    this.condition_F1 = condition2;
  }

  buildItem() {
    return SurveyItems.responsiveSingleChoiceArray({
      defaultMode: 'table',
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      scaleOptions: [
        {
          key: '0', content: new Map([
            ["nl", "Nooit"],
          ])
        }, {
          key: '1', content: new Map([
            ["nl", "Bijna nooit"],
          ])
        }, {
          key: '2', content: new Map([
            ["nl", "Soms"],
          ])
        }, {
          key: '3', content: new Map([
            ["nl", "Vaak"],
          ])
        }, {
          key: '4', content: new Map([
            ["nl", "Bijna altijd"],
          ])
        }
      ],
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
          key: 'c_F1',
          content: this.options_c.F1,
          //displayCondition: this.condition_F1,
        },
        {
          key: 'c_F2',
          content: this.options_c.F2,
        },
        {
          key: 'd',
          content: new Map([
            ["nl", "Iets zwaars optillen"],
          ]),
        },
        {
          key: 'e',
          content: this.condition_F1 ? this.option_e_f1 : this.option_e_f2,
        },
        {
          key: 'f',
          content: this.condition_F1 ? this.option_f_f1 : this.option_f_f2,
        },
        {
          key: 'g',
          content: this.condition_F1 ? this.option_g_f1 : this.option_g_f2,
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


export class Functioning1F3_Kids extends Item {


  questionTextMain = [
    {
      content: new Map([
          ["nl", "Over mijn gezondheid en activiteiten (problemen met ... )"],
      ]),
    }
  ]


  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Func1kS_F3');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.responsiveSingleChoiceArray({
      defaultMode: 'table',
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      scaleOptions: [
        {
          key: '0', content: new Map([
            ["nl", "Nooit"],
          ])
        }, {
          key: '1', content: new Map([
            ["nl", "Bijna nooit"],
          ])
        }, {
          key: '2', content: new Map([
            ["nl", "Soms"],
          ])
        }, {
          key: '3', content: new Map([
            ["nl", "Vaak"],
          ])
        }, {
          key: '4', content: new Map([
            ["nl", "Bijna altijd"],
          ])
        }
      ],
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


export class Functioning2F1_Kids extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", "Emotioneel functioneren (problemen met…)"],
      ]),
    }
  ]


  option_e_f1 = [
    {
      content: new Map([
          ["nl", "Zich zorgen maken/bang zijn"],
      ]),
    }
  ]

  option_e_f2 = [
    {
      content: new Map([
          ["nl", "Zorgen maken over wat hem/ haar zal overkomen"],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition: Expression, condition2: Expression) {
    super(parentKey, 'Func2kS_F1');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.responsiveSingleChoiceArray({
      defaultMode: 'table',
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      scaleOptions: [
        {
          key: '0', content: new Map([
            ["nl", "Nooit"],
          ])
        }, {
          key: '1', content: new Map([
            ["nl", "Bijna nooit"],
          ])
        }, {
          key: '2', content: new Map([
            ["nl", "Soms"],
          ])
        }, {
          key: '3', content: new Map([
            ["nl", "Vaak"],
          ])
        }, {
          key: '4', content: new Map([
            ["nl", "Bijna altijd"],
          ])
        }
      ],
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
          content: new Map([
            ["nl", "Zich zorgen maken/bang zijn"],
          ])
        },
      ]
    })
  }
}


export class Functioning2F3_Kids extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", "Over mijn gevoelens (problemen met ... )"],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Func2kS_F3');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.responsiveSingleChoiceArray({
      defaultMode: 'table',
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      scaleOptions: [
        {
          key: '0', content: new Map([
            ["nl", "Nooit"],
          ])
        }, {
          key: '1', content: new Map([
            ["nl", "Bijna nooit"],
          ])
        }, {
          key: '2', content: new Map([
            ["nl", "Soms"],
          ])
        }, {
          key: '3', content: new Map([
            ["nl", "Vaak"],
          ])
        }, {
          key: '4', content: new Map([
            ["nl", "Bijna altijd"],
          ])
        }
      ],
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



export class Functioning3F1_Kids extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", "Sociaal functioneren (problemen met…)"],
      ]),
    }
  ]


  option_a_f1 = [
    {
      content: new Map([
          ["nl", "Spelen met andere kinderen"],
      ]),
    }
  ]

  option_a_f2 = [
    {
      content: new Map([
          ["nl", "Op kunnen schieten met andere kinderen"],
      ]),
    }
  ]

  option_d_f1 = [
    {
      content: new Map([
          ["nl", "Bepaalde dingen niet kunnen die andere kinderen van zijn/haar leeftijd wel kunnen"],
      ]),
    }
  ]

  option_d_f2 = [
    {
      content: new Map([
          ["nl", "Kan bepaalde dingen niet die andere kinderen van zijn/ haar leeftijd wel kunnen"],
      ]),
    }
  ]


  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Func3kS_F1');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.responsiveSingleChoiceArray({
      defaultMode: 'table',
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      scaleOptions: [
        {
          key: '0', content: new Map([
            ["nl", "Nooit"],
          ])
        }, {
          key: '1', content: new Map([
            ["nl", "Bijna nooit"],
          ])
        }, {
          key: '2', content: new Map([
            ["nl", "Soms"],
          ])
        }, {
          key: '3', content: new Map([
            ["nl", "Vaak"],
          ])
        }, {
          key: '4', content: new Map([
            ["nl", "Bijna altijd"],
          ])
        }
      ],
      rows: [
        {
          key: 'a', content: new Map([
            ["nl", "Spelen met andere kinderen"],
          ])
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
          content: new Map([
            ["nl", "Bepaalde dingen niet kunnen die andere kinderen van zijn/haar leeftijd wel kunnen"],
          ]),
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


export class Functioning3F3_Kids extends Item {

  condition_F3: Expression;

  questionTextMain = [
    {
      content: new Map([
        ["nl", "Hoe ik met anderen op kan schieten (problemen met ... )"],
      ]),
    }
  ]


  option_a_f3 = [
    {
      content: new Map([
          ["nl", "Ik heb problemen om met andere kinderen op te schieten"],
      ]),
    }
  ]

  option_a_f4 = [
    {
      content: new Map([
          ["nl", "Ik heb problemen om met andere tieners op te schieten"],
      ]),
    }
  ]


  option_b_f3 = [
    {
      content: new Map([
          ["nl", "Andere kinderen willen mijn vriend(in) niet zijn"],
      ]),
    }
  ]

  option_b_f4 = [
    {
      content: new Map([
          ["nl", "Andere tieners willen mijn vriend(in) niet zijn"],
      ]),
    }
  ]

  option_c_f3 = [
    {
      content: new Map([
          ["nl", "Andere kinderen pesten mij"],
      ]),
    }
  ]

  option_c_f4 = [
    {
      content: new Map([
          ["nl", "Andere tieners pesten mij"],
      ]),
    }
  ]

  option_d_f3 = [
    {
      content: new Map([
          ["nl", "Ik kan bepaalde dingen niet die andere kinderen van mijn leeftijd wel kunnen"],
      ]),
    }
  ]

  option_d_f4 = [
    {
      content: new Map([
          ["nl", "Ik kan bepaalde dingen niet die andere tieners van mijn leeftijd wel kunnen"],
      ]),
    }
  ]

  option_e_f3 = [
    {
      content: new Map([
          ["nl", "Het is moeilijk mee te kunnen blijven doen als ik met andere kinderen speel"],
      ]),
    }
  ]

  option_e_f4 = [
    {
      content: new Map([
          ["nl", "Het is moeilijk om mee te kunnen blijven doen met mijn leeftijdsgenoten"],
      ]),
    }
  ]


  constructor(parentKey: string, isRequired: boolean, condition1: Expression, condition2: Expression) {
    super(parentKey, 'Func3kS_F3');

    this.isRequired = isRequired;
    this.condition = condition1;
    this.condition_F3 = condition2;
  }

  buildItem() {
    return SurveyItems.responsiveSingleChoiceArray({
      defaultMode: 'table',
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      scaleOptions: [
        {
          key: '0', content: new Map([
            ["nl", "Nooit"],
          ])
        }, {
          key: '1', content: new Map([
            ["nl", "Bijna nooit"],
          ])
        }, {
          key: '2', content: new Map([
            ["nl", "Soms"],
          ])
        }, {
          key: '3', content: new Map([
            ["nl", "Vaak"],
          ])
        }, {
          key: '4', content: new Map([
            ["nl", "Bijna altijd"],
          ])
        }
      ],
      rows: [
        {
          key: 'a',
          content:this.condition_F3 ? this.option_a_f3 : this.option_a_f4
        },
        {
          key: 'b',
          content: new Map([
            ["nl", "Andere tieners willen mijn vriend(in) niet zijn"],
          ])
        },
        {
          key: 'c',
          content: new Map([
            ["nl", "Andere tieners pesten mij"],
          ])
        },
        {
          key: 'd',
          content: new Map([
            ["nl", "Ik kan bepaalde dingen niet die andere tieners van mijn leeftijd wel kunnen"],
          ]),
        },
        {
          key: 'e',
          content: new Map([
            ["nl", "Het is moeilijk om mee te kunnen blijven doen met mijn leeftijdsgenoten"],
          ])
        },
      ]
    })
  }
}



export class Functioning4F1_Kids extends Item {

  optionKeys = {
    nameOfOption: 'a'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Func4kS_F1');

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
        ['nl', 'Gaat uw kind naar school, kinderdagverblijf of naar de peuterspeelzaal?'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
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

export class Functioning5F1_Kids extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", "Functioneren op school (problemen met…)"],
      ]),
    }
  ]


  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Func5kS_F1');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.responsiveSingleChoiceArray({
      defaultMode: 'table',
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      scaleOptions: [
        {
          key: '0', content: new Map([
            ["nl", "Nooit"],
          ])
        }, {
          key: '1', content: new Map([
            ["nl", "Bijna nooit"],
          ])
        }, {
          key: '2', content: new Map([
            ["nl", "Soms"],
          ])
        }, {
          key: '3', content: new Map([
            ["nl", "Vaak"],
          ])
        }, {
          key: '4', content: new Map([
            ["nl", "Bijna altijd"],
          ])
        }
      ],
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


export class Functioning5F2_Kids extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", "School functioneren (problemen met ...)"],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Func5kS_F2');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.responsiveSingleChoiceArray({
      defaultMode: 'table',
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      scaleOptions: [
        {
          key: '0', content: new Map([
            ["nl", "Nooit"],
          ])
        }, {
          key: '1', content: new Map([
            ["nl", "Bijna nooit"],
          ])
        }, {
          key: '2', content: new Map([
            ["nl", "Soms"],
          ])
        }, {
          key: '3', content: new Map([
            ["nl", "Vaak"],
          ])
        }, {
          key: '4', content: new Map([
            ["nl", "Bijna altijd"],
          ])
        }
      ],
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


export class Functioning5F3_Kids extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", "Over school (problemen met ... )"],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Func5kS_F3');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.responsiveSingleChoiceArray({
      defaultMode: 'table',
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      scaleOptions: [
        {
          key: '0', content: new Map([
            ["nl", "Nooit"],
          ])
        }, {
          key: '1', content: new Map([
            ["nl", "Bijna nooit"],
          ])
        }, {
          key: '2', content: new Map([
            ["nl", "Soms"],
          ])
        }, {
          key: '3', content: new Map([
            ["nl", "Vaak"],
          ])
        }, {
          key: '4', content: new Map([
            ["nl", "Bijna altijd"],
          ])
        }
      ],
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





export class Strength_Weakness_Kids extends Item {


  questionTextMain = [
    {
      content: new Map([
          ["nl", "Mijn kind:"],
      ]),
    }
  ]


  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'S-I1-SDQ3');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.responsiveSingleChoiceArray({
      defaultMode: 'table',
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      scaleOptions: [
        {
          key: '1', content: new Map([
            ["nl", "Niet waar"],
          ])
        }, {
          key: '2', content: new Map([
            ["nl", "Een beetje waar"],
          ])
        }, {
          key: '3', content: new Map([
            ["nl", "Zeker waar"],
          ])
        }
      ],
      rows: [
        {
          key: 'a', content: new Map([
            ["nl", "Houdt rekening met gevoelens van anderen"],
          ])
        },
        {
          key: 'b',
          content: new Map([
            ["nl", "Rusteloos, overactief, kan niet lang stilzitten"],
          ])
        },
        {
          key: 'c',
          content: new Map([
            ["nl", "Klaagt vaak over hoofdpijn, buikpijn, of misselijkheid"],
          ])
        },
        {
          key: 'd',
          content: new Map([
            ["nl", "Deelt makkelijk met andere kinderen (bijvoorbeeld speelgoed, snoep, potloden, enz.)"],
          ]),
        },
        {
          key: 'e',
          content: new Map([
            ["nl", "Heeft vaak driftbuien of woede-uitbarstingen"],
          ])
        },
        {
          key: 'f',
          content: new Map([
            ["nl", "Nogal op zichzelf, neigt er toe alleen te spelen"],
          ])
        },
        {
          key: 'g',
          content: new Map([
            ["nl", "Doorgaans gehoorzaam, doet gewoonlijk wat volwassenen vragen"],
          ])
        },
        {
          key: 'h',
          content: new Map([
            ["nl", "Heeft veel zorgen, lijkt vaak over dingen in te zitten"],
          ])
        },
        {
          key: 'i',
          content: new Map([
            ["nl", "Behulpzaam als iemand zich heeft bezeerd, van streek is of zich ziek voel"],
          ])
        },
        {
          key: 'j',
          content: new Map([
            ["nl", "Constant aan het wiebelen of friemelen"],
          ])
        },
        {
          key: 'k',
          content: new Map([
            ["nl", "Heeft minstens één goede vriend of vriendin"],
          ])
        },
        {
          key: 'l',
          content: new Map([
            ["nl", "Vecht vaak met andere kinderen of pest ze"],
          ])
        },
        {
          key: 'm',
          content: new Map([
            ["nl", "Vaak ongelukkig, in de put of in tranen"],
          ])
        },
        {
          key: 'n',
          content: new Map([
            ["nl", "Wordt over het algemeen aardig gevonden door andere kinderen"],
          ])
        },
        {
          key: 'o',
          content: new Map([
            ["nl", "Gemakkelijk afgeleid, heeft moeite om zich te concentreren"],
          ])
        },
        {
          key: 'p',
          content: new Map([
            ["nl", "Zenuwachtig of zich vastklampend in nieuwe situaties, verliest makkelijk zelfvertrouwen"],
          ])
        },
        {
          key: 'q',
          content: new Map([
            ["nl", "Aardig tegen jongere kinderen"],
          ])
        },
        {
          key: 'r',
          content: new Map([
            ["nl", "Maakt vaak ruzie met volwassenen"],
          ])
        },
        {
          key: 's',
          content: new Map([
            ["nl", "Wordt getreiterd of gepest door andere kinderen"],
          ])
        },
        {
          key: 't',
          content: new Map([
            ["nl", "Biedt vaak vrijwillig hulp aan anderen (ouders, leerkrachten, andere kinderen)"],
          ])
        },
        {
          key: 'u',
          content: new Map([
            ["nl", "Kan stoppen en nadenken voor iets te doen"],
          ])
        },
        {
          key: 'v',
          content: new Map([
            ["nl", "Kan gemeen doen tegen anderen"],
          ])
        },
        {
          key: 'w',
          content: new Map([
            ["nl", "Kan beter opschieten met volwassenen dan met andere kinderen"],
          ])
        },
        {
          key: 'x',
          content: new Map([
            ["nl", "Voor heel veel bang, is snel angstig"],
          ])
        },
        {
          key: 'y',
          content: new Map([
            ["nl", "Maakt opdrachten af, kan de aandacht goed vasthouden"],
          ])
        },
      ]
    })
  }
}



export class Awareness_Kids6 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'In hoeverre bent u bezorgd over de erythema migrans of andere ziekte van Lyme van uw kind?'],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'kS-J6');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.responsiveBipolarLikertArray({
      defaultMode: 'withLabelRow',
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      scaleOptions: [
        {
          key: '0',
        }, {
          key: '1',
        }, {
          key: '2',
        }, {
          key: '3',
        }, {
          key: '4',
        }, {
          key: '5',
        }, {
          key: '6',
        }, {
          key: '7',
        }, {
          key: '8',
        }, {
          key: '9',
        }, {
          key: '10',
      },
      ],
      rows: [
          {
            key: 'a',
              startLabel: new Map([
                  ['de', 'Helemaal niet bezorgd']
              ]),
              endLabel: new Map([
                  ['de', 'Uitermate bezorgd']
              ]),
          },
      ],
      withLabelRowModeProps: {
        useBottomLabel: true,
      }
    })
  }
}

