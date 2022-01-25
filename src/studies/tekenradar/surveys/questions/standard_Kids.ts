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
  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'kS_F1Text1');

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
          content: new Map([ // this.isPartOf("Followupflow_Kids") ? this.qTextKids : this.qTextMain,
            ["nl",  this.markdownContent_F1 ],
          ]),
          className: ''
        })
      ]
    })
  }
}



export class FunctioningText1F3_Kids extends Item {


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

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'kS_F3Text1');

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
          content: new Map([ // this.isPartOf("Followupflow_Kids") ? this.qTextKids : this.qTextMain,
            ["nl", this.markdownContent_F3],
          ]),
          className: ''
        })
      ]
    })
  }
}



export class FunctioningText2F1_Kids extends Item {

  markdownContent_F1 = `
Hoe vaak heeft uw kind in de **afgelopen week** problemen gehad met:
    `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'kS_F1Text2');

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
            ["nl",  this.markdownContent_F1],
          ]),
          className: ''
        })
      ]
    })
  }
}



export class FunctioningText2F3_Kids extends Item {

  markdownContent_F3 = `
Hoe vaak heb je in de **afgelopen week** problemen gehad met...
    `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'kS_F3Text2');

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
            ["nl", this.markdownContent_F3],
          ]),
          className: ''
        })
      ]
    })
  }
}

export class Functioning1F1_Kids extends Item {

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
    super(parentKey, 'Func1kS_F1');

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


export class Functioning1F2_Kids extends Item {

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
    super(parentKey, 'Func1kS_F2');

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


  option_e = [
    {
      content: new Map([
          ["nl", "Zich zorgen maken/bang zijn"],
      ]),
    }
  ]


  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
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
          content: this.option_e,
        },
      ]
    })
  }
}


export class Functioning2F2_Kids extends Item {

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
    super(parentKey, 'Func2kS_F2');

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
          content: this.option_e,
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


export class Functioning3F2_Kids extends Item {

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
    super(parentKey, 'Func3kS_F2');

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



export class Functioning3F3_Kids extends Item {

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
    super(parentKey, 'Func3kS_F3');

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


export class Functioning3F4_Kids extends Item {

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
    super(parentKey, 'Func3kS_F4');

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


export class FatigueText1G1_Kids extends Item {


  markdownContent_G1 = `
# Vermoeidheid
De vragen hieronder zijn voor **een ouder/verzorger**.

Hieronder staat een lijst van dingen die een probleem kunnen zijn voor uw kind. Kunt u ons vertellen **hoe vaak** uw kind in de **afgelopen week** met elk van deze dingen problemen heeft gehad? Vink het cijfer aan dat het beste van toepassing is. U kunt kiezen uit:
  - **0** als het **nooit** een probleem is
  - **1** als het **bijna nooit** een probleem is
  - **2** als het **soms** een probleem is
  - **3** als het **vaak** een probleem is
  - **4** als het **bijna altijd** een probleem is

Er zijn geen goede of foute antwoorden.
    `


  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'kS_G1Text1');

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
          content: new Map([ // this.isPartOf("Followupflow_Kids") ? this.qTextKids : this.qTextMain,
            ["nl", this.markdownContent_G1 ],
          ]),
          className: ''
        })
      ]
    })
  }
}


export class FatigueText1G3_Kids extends Item {


  markdownContent_G3 = `
  # Vermoedheid
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

  constructor(parentKey: string, isRequired: boolean, condition: Expression) {
    super(parentKey, 'kS_G3Text1');

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
          content: new Map([ // this.isPartOf("Followupflow_Kids") ? this.qTextKids : this.qTextMain,
            ["nl",  this.markdownContent_G3],
          ]),
          className: ''
        })
      ]
    })
  }
}


export class FatigueText2G1_Kids extends Item {

  markdownContent_G1 = `
Hoe vaak heeft uw kind in de afgelopen week problemen gehad met:
    `


  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'kS_G1Text2');

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
            ["nl", this.markdownContent_G1],
          ]),
          className: ''
        })
      ]
    })
  }
}


export class FatigueText2G2_Kids extends Item {

  markdownContent_G2 = `
Hoezeer heeft uw kind in de afgelopen week een probleem gehad met:
    `


  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'kS_G2Text2');

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
            ["nl", this.markdownContent_G2],
          ]),
          className: ''
        })
      ]
    })
  }
}


export class FatigueText2G3_Kids extends Item {


  markdownContent_G3 = `
Hoezeer is dit voor jou in de AFGELOPEN WEEK een probleem geweest:
    `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'kS_G3Text2');

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
            ["nl", this.markdownContent_G3],
          ]),
          className: ''
        })
      ]
    })
  }
}



export class Fatigue1F1_Kids extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", "Algemene vermoeidheid (problemen met...)"],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'kS-G1-1');

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
            ["nl", "Moe voelen"],
          ])
        },
        {
          key: 'b',
          content: new Map([
            ["nl", "Lichamelijk zwak voelen (niet sterk)"],
          ])
        },
        {
          key: 'c',
          content: new Map([
            ["nl", "Te moe voelen om dingen te doen die hij/zij leuk vindt"],
          ])
        },
        {
          key: 'd',
          content: new Map([
            ["nl", "Te moe voelen om tijd door te brengen met zijn/haar vrienden"],
          ])
        },
        {
          key: 'e',
          content: new Map([
            ["nl", "Moeite om dingen af te maken"],
          ])
        },
        {
          key: 'f',
          content: new Map([
            ["nl", "Moeite om aan dingen te beginnen"],
          ])
        },
      ]
    })
  }
}


export class Fatigue2F1_Kids extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", "Slaap/Rust vermoeidheid (problemen met...)"],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'kS-G1-2');

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
            ["nl", "Veel slapen"],
          ])
        },
        {
          key: 'b',
          content: new Map([
            ["nl", "Moeite om de nacht door te slapen"],
          ])
        },
        {
          key: 'c',
          content: new Map([
            ["nl", "Moe voelen wanneer hij/zij 's ochtends wakker wordt"],
          ])
        },
        {
          key: 'd',
          content: new Map([
            ["nl", "Veel rusten"],
          ])
        },
        {
          key: 'e',
          content: new Map([
            ["nl", "Veel dutjes doen"],
          ])
        },
        {
          key: 'f',
          content: new Map([
            ["nl", "Veel tijd in bed doorbrengen"],
          ])
        },
      ]
    })
  }
}


export class Fatigue3F1_Kids extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", "Cognitieve vermoeidheid (problemen met...)"],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'kS-G1-3');

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
            ["nl", "Moeite om zijn/haar aandacht bij dingen te houden"],
          ])
        },
        {
          key: 'b',
          content: new Map([
            ["nl", "Moeite om te onthouden wat mensen hem/haar vertellen"],
          ])
        },
        {
          key: 'c',
          content: new Map([
            ["nl", "Moeite om te onthouden wat hij/zij net gehoord heeft"],
          ])
        },
        {
          key: 'd',
          content: new Map([
            ["nl", "Moeite met snel denken"],
          ])
        },
        {
          key: 'e',
          content: new Map([
            ["nl", "Moeite te onthouden waar hij/zij net aan dacht"],
          ])
        },
        {
          key: 'f',
          content: new Map([
            ["nl", "Moeite om meer dan één ding tegelijk te onthouden"],
          ])
        },
      ]
    })
  }
}



export class PainKids extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Hoe veel pijn heeft uw kind gehad '],
      ]),
    },
    {
      content: new Map([
        ["nl", "de afgelopen week"],
      ]),
      className: "text-primary"
    },
    {
      content: new Map([
        ["nl", "? Plaats het blokje op de lijn waar die het best de ernst de pijn van uw kind"],
      ]),
    },
    {
      content: new Map([
        ["nl", " weergeeft."],
      ]),
      className: "text-primary"
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'kS-H1_1');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.numericSlider({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      //questionSubText: new Map([
      //  ["nl", "Mijn reukvermogen op dit moment: (geen reukvermogen 0 - uitstekend reukvermogen 100)."],
      //]),
      //TODO: bipolar slider label???
      sliderLabel: new Map([
        ["nl", "Geen pijn - veel pijn"],
      ]),
      noResponseLabel: new Map([
        ["nl", "Klik op het blokje om een plaats op de lijn te kiezen."],
      ]),
      min: 0,
      max: 10,
      stepSize: 1,
    })
  }
}


export class SchoolKids1 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Wat is het aantal lesuren '],
      ]),
    },
    {
      content: new Map([
        ["nl", "per week "],
      ]),
      className: "text-primary"
    },
    {
      content: new Map([
        ["nl", "dat geroosterd is voor kinderen uit de klas van uw kind? Of als uw kind nog niet op school zit: het aantal uren dat uw kind op een kinderdagverblijf of speelzaal stond ingeroosterd."],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'kS-H1_2');

    this.isRequired = isRequired;
    this.condition = condition;
  }
  //TODO: size of text input field?
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


export class SchoolKids2 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Aantal lesuren '],
      ]),
    },
    {
      content: new Map([
        ["nl", "in de afgelopen 2 (!) weken "],
      ]),
      className: "text-primary"
    },
    {
      content: new Map([
        ["nl", "dat uw kind gevolgd heeft (of aantal uren aanwezig op kinderdagverblijf/speelzaal):"],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'kS-H1_3');

    this.isRequired = isRequired;
    this.condition = condition;
  }
  //TODO: size of text input field?
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


export class SchoolKids3 extends Item {


  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Hoeveel schoolverzuim (of kinderdagverblijf of speelzaal verzuim) heeft uw kind '],
      ]),
    },
    {
      content: new Map([
        ["nl", "het laatste half jaar "],
      ]),
      className: "text-primary"
    },
    {
      content: new Map([
        ["nl", "ongeveer gehad?"],
      ]),
    }
  ]


  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'kS-H1_4');

    this.isRequired = isRequired;
    this.condition = condition;
  }
  //TODO: size of text input field?
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

//TODO here
export class Strength_WeaknessI1Text_Kids extends Item {

  markdownContent_F1 = `
# Sterke Kanten en Moeilijkheden

De vragen hieronder zijn voor **een ouder/verzorger**.

De volgende vragen gaan over gedragingen van kinderen. Wilt u bij iedere vraag aankruisen of dit ‘niet waar’, ‘een beetje waar’ of ‘zeker waar’ is voor uw kind. Wilt u uw antwoorden baseren op het gedrag van uw kind gedurende de laatste zes maanden. Het is van belang dat u alle vragen beantwoordt, ook als u niet helemaal zeker bent of als u de vraag niet geheel passend vindt voor uw kind.
    `

  constructor(parentKey: string, isRequired: boolean, condition1?: Expression) {
    super(parentKey, 'kS-I1-SDQ-Text');

    this.isRequired = isRequired;
    this.condition = condition1;
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


export class Strength_WeaknessI3Text_Kids extends Item {

  markdownContent_F3 = `
# Sterke Kanten en Moeilijkheden

De vragen hieronder zijn voor een minderjarige. Als een ouder/verzorger helpt met invullen laat dan **uw kind zelf de** antwoorden kiezen.

Wil je alsjeblieft bij iedere vraag een antwoord kiezen door op het bolletje te klikken bij 'Niet waar', 'Een beetje waar' of 'Zeker waar'. Het is belangrijk dat je alle vragen zo goed mogelijk beantwoordt, ook als je niet helemaal zeker bent of als je de vraag raar vindt. Wil je alsjeblieft bij je antwoorden denken hoe dat bij jou de laatste zes maanden is geweest.

    `

  constructor(parentKey: string, isRequired: boolean, condition1?: Expression) {
    super(parentKey, 'kS-I3-SDQ-Text');

    this.isRequired = isRequired;
    this.condition = condition1;
  }

  buildItem() {
    return SurveyItems.display({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      content: [
        ComponentGenerators.markdown({
          content: new Map([
            ["nl", this.markdownContent_F3],
          ]),
          className: ''
        })
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
    super(parentKey, 'kS-I-SDQ');

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


export class AwarenessKidsGroup extends Group {

  T1: Awareness_KidsText;
  Q1: Awareness_Kids1;
  Q2: Awareness_Kids2;
  Q3: Awareness_Kids3;
  Q4: Awareness_Kids4;
  Q5: Awareness_Kids5;
  Q6: Awareness_Kids6;
  Q7: Awareness_Kids7;
  Q8: Awareness_Kids8;

  constructor(parentKey: string, isRequired?: boolean, condition?: Expression) {
    super(parentKey, 'AwareKidsG');

    this.groupEditor.setCondition(condition);

    const required = isRequired !== undefined ? isRequired : false;

    this.T1 = new Awareness_KidsText(this.key, required);
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

    this.addItem(this.T1.get());
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


export class Awareness_KidsText extends Item {

  markdownContent = `
LET OP: De vragen hieronder zijn voor een ouder/verzorger. Als je deze vragenlijst voor jezelf invult, vraag dan je ouder/verzorger de antwoorden op onderstaande vragen te geven.

Omcirkel alstublieft bij elke vraag het getal dat uw mening het beste weergeeft:
 `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'AwareKidsT');

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



export class Awareness_Kids1 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Hoeveel invloed heeft de erythema migrans of andere ziekte van lyme van uw kind op uw leven?'],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'kS-J1');

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
                  ['de', 'Helemaal geen invloed']
              ]),
              endLabel: new Map([
                  ['de', 'Zeer veel invloed']
              ]),
          },
      ],
      withLabelRowModeProps: {
        useBottomLabel: true,
      }
    })
  }
}


export class Awareness_Kids2 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Hoe lang denkt u dat de erythema migrans of andere ziekte van lyme van uw kind zal duren?'],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'kS-J2');

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
                  ['de', 'Heel erg kort']
              ]),
              endLabel: new Map([
                  ['de', 'Het hele leven']
              ]),
          },
      ],
      withLabelRowModeProps: {
        useBottomLabel: true,
      }
    })
  }
}


export class Awareness_Kids3 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'In hoeverre meent u dat de erythema migrans of andere ziekte van lyme van uw kind te beheersen is?'],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'kS-J3');

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
                  ['de', 'Helemaal geen beheersing']
              ]),
              endLabel: new Map([
                  ['de', 'Zeer veel beheersing']
              ]),
          },
      ],
      withLabelRowModeProps: {
        useBottomLabel: true,
      }
    })
  }
}

export class Awareness_Kids4 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'In hoeverre denkt u dat de behandeling van uw kind helpt bij de erythema migrans of andere ziekte van lyme?'],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'kS-J4');

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
                  ['de', 'Helemaal niet']
              ]),
              endLabel: new Map([
                  ['de', 'Uitermate veel']
              ]),
          },
      ],
      withLabelRowModeProps: {
        useBottomLabel: true,
      }
    })
  }
}



export class Awareness_Kids5 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'In hoeverre ervaart uw kind lichamelijke klachten van de erythema migrans of andere ziekte van Lyme?'],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'kS-J5');

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
                  ['de', 'Helemaal geen klachten']
              ]),
              endLabel: new Map([
                  ['de', 'Veel ernstige klachten']
              ]),
          },
      ],
      withLabelRowModeProps: {
        useBottomLabel: true,
      }
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


export class Awareness_Kids7 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'In hoeverre heeft u het gevoel dat u de erythema migrans of andere ziekte van Lyme van uw kind begrijpt?'],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'kS-J7');

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
                  ['de', 'Ik begrijp de ziekte helemaal niet']
              ]),
              endLabel: new Map([
                  ['de', 'Ik begrijp de ziekte helemaal']
              ]),
          },
      ],
      withLabelRowModeProps: {
        useBottomLabel: true,
      }
    })
  }
}


export class Awareness_Kids8 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'In hoeverre heeft de erythema migrans of andere ziekte van Lyme van uw kind invloed op uw gemoedstoestand? (b.v. maakt het u boos, angstig, van streek, of somber?)'],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'kS-J8');

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
                  ['de', 'Helemaal geen invloed']
              ]),
              endLabel: new Map([
                  ['de', 'Uitermate veel invloed']
              ]),
          },
      ],
      withLabelRowModeProps: {
        useBottomLabel: true,
      }
    })
  }
}

