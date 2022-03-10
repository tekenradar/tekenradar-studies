import { Expression } from 'survey-engine/data_types';
import { Item, Group } from 'case-editor-tools/surveys/types';
import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';
import { SingleChoiceOptionTypes as SCOptions, ClozeItemTypes } from 'case-editor-tools/surveys';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';
import { ParticipantFlags } from '../../participantFlags';



export class BackgroundText_Kids extends Item {

  markdownContent = `
# Achtergrond

De vragen hieronder zijn voor een minderjarige.
Ben je een ouder/verzorger dan kun je de antwoorden invullen voor/over je kind.
    `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'BGText_Kids');

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
          content: new Map([
            ["nl", "Een ouder/verzorger van degene jonger dan 18 jaar, namelijk:"],
          ])
        },
      ]
    })
  }
}



export class TextQUKids extends Item {

  markdownContent = `
##### Let op: bovenaan de pagina staat steeds wie de vragen kan beantwoorden (zie ook hierboven)! Soms is dat degene over/voor wie de vragenlijst wordt ingevuld, soms een ouder/verzorger, en soms maakt het niet uit.
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


export class Strength_WeaknessI1Text_Kids extends Item {

  markdownContent_F1 = `
# Sterke kanten en moeilijkheden

De vragen hieronder zijn voor **een ouder/verzorger**.

De volgende vragen gaan over gedragingen van kinderen. Wil je bij iedere vraag aankruisen of dit ‘niet waar’, ‘een beetje waar’ of ‘zeker waar’ is voor je kind. Wilt je je antwoorden baseren op het gedrag van je kind gedurende de laatste zes maanden. Het is van belang dat je alle vragen beantwoordt, ook als je niet helemaal zeker bent of als je de vraag niet geheel passend vindt voor je kind.
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


export class Strength_WeaknessI2Text_Kids extends Item {

  markdownContent_I2 = `
# Sterke kanten en moeilijkheden

De vragen hieronder zijn voor **een ouder/verzorger**. Als je deze vragenlijst voor jezelf invult, vraag dan je ouder/verzorger de antwoorden op onderstaande vragen te geven.

Wil je alsjeblieft bij iedere vraag een antwoord kiezen door op het bolletje te klikken bij 'Niet waar', 'Een beetje waar' of 'Zeker waar'. Het is van belang dat je alle vragen zo goed mogelijk beantwoordt, ook als je niet helemaal zeker bent of als je de vraag raar vindt. Wil je alsjeblieft je antwoorden baseren op het gedrag van het kind de laatste zes maanden.
    `

  constructor(parentKey: string, isRequired: boolean, condition1?: Expression) {
    super(parentKey, 'kS-I2-SDQ-Text');

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
            ["nl", this.markdownContent_I2],
          ]),
          className: ''
        })
      ]
    })
  }
}

export class Strength_WeaknessI3Text_Kids extends Item {

  markdownContent_F3 = `
# Sterke kanten en moeilijkheden

De vragen hieronder zijn voor een minderjarige. Als een ouder/verzorger helpt met invullen laat dan **je kind zelf de** antwoorden kiezen.

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


export class Strength_WeaknessI1_Kids extends Item {


  questionTextMain = [
    {
      content: new Map([
        ["nl", "Mijn kind:"],
      ]),
    }
  ]


  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'kS-I1-SDQ');

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


export class Strength_WeaknessI2_Kids extends Item {


  questionTextMain = [
    {
      content: new Map([
        ["nl", "Mijn kind:"],
      ]),
    }
  ]


  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'SDQ_2');

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
            ["nl", "Liegt of bedriegt vaak"],
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
            ["nl", "Denkt na voor iets te doen"],
          ])
        },
        {
          key: 'v',
          content: new Map([
            ["nl", "Pikt dingen thuis, op school of op andere plaatsen"],
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


export class Strength_WeaknessI3_Kids extends Item {
  questionTextMain = [
    {
      content: new Map([
        ["nl", ""],
      ]),
    }
  ]


  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'SDQ_3');

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
            ["nl", "Ik probeer aardig te zijn tegen anderen. Ik houd rekening met hun gevoelens"],
          ])
        },
        {
          key: 'b',
          content: new Map([
            ["nl", "Ik ben rusteloos, ik kan niet lang stilzitten"],
          ])
        },
        {
          key: 'c',
          content: new Map([
            ["nl", "Ik heb vaak hoofdpijn, buikpijn, of ik ben misselijk"],
          ])
        },
        {
          key: 'd',
          content: new Map([
            ["nl", "Ik deel makkelijk met anderen (snoep, speelgoed, potloden, enz.)"],
          ]),
        },
        {
          key: 'e',
          content: new Map([
            ["nl", "Ik word erg boos en ben vaak driftig"],
          ])
        },
        {
          key: 'f',
          content: new Map([
            ["nl", "Ik ben nogal op mijzelf. Ik speel meestal alleen of bemoei mij niet met anderen"],
          ])
        },
        {
          key: 'g',
          content: new Map([
            ["nl", "Ik doe meestal wat me wordt opgedragen"],
          ])
        },
        {
          key: 'h',
          content: new Map([
            ["nl", "Ik pieker veel"],
          ])
        },
        {
          key: 'i',
          content: new Map([
            ["nl", "Ik help iemand die zich heeft bezeerd, van streek is of zich ziek voelt"],
          ])
        },
        {
          key: 'j',
          content: new Map([
            ["nl", "Ik zit constant te wiebelen of te friemelen"],
          ])
        },
        {
          key: 'k',
          content: new Map([
            ["nl", "Ik heb minstens één goede vriend of vriendin"],
          ])
        },
        {
          key: 'l',
          content: new Map([
            ["nl", "Ik vecht vaak. Het lukt mij andere mensen te laten doen wat ik wil"],
          ])
        },
        {
          key: 'm',
          content: new Map([
            ["nl", "Ik ben vaak ongelukkig, in de put of in tranen"],
          ])
        },
        {
          key: 'n',
          content: new Map([
            ["nl", "Andere jongeren van mijn leeftijd vinden mij over het algemeen aardig"],
          ])
        },
        {
          key: 'o',
          content: new Map([
            ["nl", "Ik ben snel afgeleid, ik vind het moeilijk om me te concentreren"],
          ])
        },
        {
          key: 'p',
          content: new Map([
            ["nl", "Ik ben zenuwachtig in nieuwe situaties. Ik verlies 	makkelijk mijn zelfvertrouwen"],
          ])
        },
        {
          key: 'q',
          content: new Map([
            ["nl", "Ik ben aardig tegen jongere kinderen"],
          ])
        },
        {
          key: 'r',
          content: new Map([
            ["nl", "Ik word er vaak van beschuldigd dat ik lieg of bedrieg"],
          ])
        },
        {
          key: 's',
          content: new Map([
            ["nl", "Andere kinderen of jongeren pesten of treiteren mij"],
          ])
        },
        {
          key: 't',
          content: new Map([
            ["nl", "Ik bied vaak anderen aan hun te helpen (ouders, leerkrachten, kinderen)"],
          ])
        },
        {
          key: 'u',
          content: new Map([
            ["nl", "Ik denk na voor ik iets doe"],
          ])
        },
        {
          key: 'v',
          content: new Map([
            ["nl", "Ik neem dingen weg die niet van mij zijn thuis, op school of op andere plaatsen"],
          ])
        },
        {
          key: 'w',
          content: new Map([
            ["nl", "Ik kan beter met volwassenen opschieten dan met jongeren van mijn leeftijd"],
          ])
        },
        {
          key: 'x',
          content: new Map([
            ["nl", "Ik ben voor heel veel dingen bang, ik ben snel angstig"],
          ])
        },
        {
          key: 'y',
          content: new Map([
            ["nl", "Ik maak af waar ik mee bezig ben. Ik kan mijn aandacht er goed bij houden"],
          ])
        },
      ]
    })
  }
}



