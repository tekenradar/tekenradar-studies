import { Expression } from 'survey-engine/data_types';
import { Item, Group, OptionDef } from 'case-editor-tools/surveys/types';
import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';
import { ClozeItemTypes } from 'case-editor-tools/surveys';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';
import { ParticipantFlags } from '../../participantFlags';
import { generateLocStrings } from 'case-editor-tools/surveys/utils/simple-generators';
import { SurveySuffix } from '../globalConstants';





export class BackgroundHeader extends Item {

  markdownContent = `
# Achtergrond
    `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'BackgH');

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


export class GenHealthHeader extends Item {

  markdownContent = `
# Algemene gezondheid
    `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'GenHH');

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


export class SymptomsHeader extends Item {

  markdownContent = `
# Symptomen
    `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'SymH');

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


export class FatigueHeader extends Item {

  markdownContent = `
# Vermoeidheid
    `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'FatH');

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


export class CognitionHeader extends Item {

  markdownContent = `
# Cognitie
    `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'CogH');

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

export class AboutTekenradar extends Item {
  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Hoe heb je over het onderzoek via Tekenradar.nl gehoord?'],
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
    super(parentKey, 'AboutTR');

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
            ["nl", "Via de huisarts"],
          ])
        },
        {
          key: 'b', role: 'input',
          content: new Map([
            ["nl", "Via de media, namelijk:"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "Via vrienden of familie"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "Via google of een andere internet zoekmachine"],
          ])
        },
        {
          key: 'e', role: 'input',
          content: new Map([
            ["nl", "Anders, namelijk:"],
          ])
        },

      ]
    })
  }
}


export class StandardText1 extends Item {

  markdownContent = `
##### De volgende vraag gebruiken wij alleen om te bekijken of de deelnemers aan het onderzoek een goede afspiegeling zijn van de Nederlandse samenleving.
    `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'StandardT1');

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


export class Qualification extends Item {
  questionTextMain_Adults = [
    {
      content: new Map([
        ["nl", 'Wat is je hoogst voltooide opleiding?'],
      ]),
    }
  ]

  questionTextMain_Kids = [
    {
      content: new Map([
        ["nl", 'Wat is de hoogst voltooide opleiding van je moeder /verzorgster (of van je vader/verzorger, als er geen moeder/verzorgster is)?'],
      ]),
    }
  ]


  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'QUAL');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.isPartOf(SurveySuffix.Adults) ? this.questionTextMain_Adults : this.questionTextMain_Kids,
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Geen voltooide opleiding (lager onderwijs niet afgemaakt)"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Lager onderwijs (basisschool, speciaal basisonderwijs)"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "Lager of voorbereidend beroepsonderwijs (zoals LTS, LEAO, LHNO, VMBO)"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "Middelbaar algemeen voortgezet onderwijs (zoals MAVO, (M)ULO, MBO-kort, VMBO-t)"],
          ])
        },
        {
          key: 'e', role: 'option',
          content: new Map([
            ["nl", "Middelbaar beroepsonderwijs en beroepsbegeleidend onderwijs (zoals MBO-lang, MTS, MEAO, BOL, BBL, INAS)"],
          ])
        },
        {
          key: 'f', role: 'option',
          content: new Map([
            ["nl", "Hoger algemeen en voorbereidend wetenschappelijk onderwijs (zoals HAVO, VWO, Atheneum, Gymnasium, HBS,MMS)"],
          ])
        },
        {
          key: 'g', role: 'option',
          content: new Map([
            ["nl", "Hoger beroepsonderwijs (zoals HBO, HTS, HEAO, kandidaatswetenschappelijk onderwijs)"],
          ])
        },
        {
          key: 'h', role: 'option',
          content: new Map([
            ["nl", "Wetenschappelijk onderwijs (universiteit)"],
          ])
        }
      ]
    })
  }
}


export class SymptomsText1_Kids extends Item {

  markdownContent = `
# Algemene gezondheid

De vragen hieronder zijn voor een minderjarige.
Ben je een ouder/verzorger dan kun je de antwoorden invullen voor/over je kind.
    `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'SyText1_Kids');

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


export class SymptomsText2_Kids extends Item {

  markdownContent = `
# Symptomen

De vragen hieronder zijn voor een minderjarige.
Ben je een ouder/verzorger dan kun je de antwoorden invullen voor/over je kind.
    `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'SyText2_Kids');

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


export class PHQ_15 extends Item {
  isFemaleCondition: Expression;

  constructor(parentKey: string, isRequired: boolean, isFemaleCondition: Expression) {
    super(parentKey, 'PHQ_15');

    this.isRequired = isRequired;
    this.isFemaleCondition = isFemaleCondition;
  }

  buildItem() {
    return SurveyItems.responsiveSingleChoiceArray({
      defaultMode: 'horizontal',
      responsiveModes: {
        md: 'table',
        // sm: 'horizontal'
      },
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Hoeveel last heb je in de afgelopen 4 weken gehad van één of meer van de volgende problemen?'],
      ]),
      scaleOptions: [
        {
          key: '1', content: new Map([
            ["nl", "Geen last"],
          ])
        }, {
          key: '2', content: new Map([
            ["nl", "Een beetje last"],
          ])
        }, {
          key: '3', content: new Map([
            ["nl", "Veel last"],
          ])
        }
      ],
      rows: [
        {
          key: 'a', content: new Map([
            ["nl", "Buikpijn"],
          ])
        },
        {
          key: 'b',
          content: new Map([
            ["nl", "Rugpijn"],
          ])
        },
        {
          key: 'c',
          content: new Map([
            ["nl", "Pijn in je armen, benen of gewrichten (knieën, heupen, enz.)"],
          ])
        },
        {
          key: 'd',
          content: new Map([
            ["nl", "Menstruatiepijn of andere problemen tijdens de menstruatie"],
          ]),
          displayCondition: this.isPartOf(SurveySuffix.Adults) ? this.isFemaleCondition :
            SurveyEngine.logic.and(
              this.isFemaleCondition,
              SurveyEngine.compare.gt(SurveyEngine.participantFlags.getAsNum(ParticipantFlags.ageFromPDiff.key), 10)
            )
        },
        {
          key: 'e',
          content: new Map([
            ["nl", "Pijn of problemen bij seksuele gemeenschap"],
          ]),
          displayCondition: (!(this.isPartOf(SurveySuffix.Adults))) ? SurveyEngine.compare.gt(1, 2) : undefined,
        },
        {
          key: 'f',
          content: new Map([
            ["nl", "Hoofdpijn"],
          ])
        },
        {
          key: 'g',
          content: new Map([
            ["nl", "Pijn in de borstkas"],
          ])
        },
        {
          key: 'h',
          content: new Map([
            ["nl", "Duizeligheid"],
          ])
        },
        {
          key: 'i',
          content: new Map([
            ["nl", "Flauwvallen"],
          ])
        },
        {
          key: 'j',
          content: new Map([
            ["nl", "Je hart voelen bonzen of snel kloppen"],
          ])
        },
        {
          key: 'k',
          content: new Map([
            ["nl", "Kortademigheid"],
          ])
        },
        {
          key: 'l',
          content: new Map([
            ["nl", "Verstopping (obstipatie), dunne ontlasting of diarree"],
          ])
        },
        {
          key: 'm',
          content: new Map([
            ["nl", "Misselijkheid, opgeblazen gevoel of problemen met de spijsvertering (indigestie)"],
          ])
        },
        {
          key: 'n',
          content: new Map([
            ["nl", "Moeilijk inslapen, moeilijk doorslapen of te veel slapen"],
          ])
        },
        {
          key: 'o',
          content: new Map([
            ["nl", "Je moe voelen of gebrek aan energie hebben"],
          ])
        },
        {
          key: 'p',
          content: new Map([
            ["nl", "Je niet goed kunnen concentreren, of last van vergeetachtigheid"],
          ])
        },
        {
          key: 'q',
          content: new Map([
            ["nl", "Koorts"],
          ])
        },
        {
          key: 'r',
          content: new Map([
            ["nl", "Moeite hebben met lopen of evenwicht"],
          ])
        },
        {
          key: 's',
          content: new Map([
            ["nl", "Problemen met horen en/of zien"],
          ])
        },
        {
          key: 't',
          content: new Map([
            ["nl", "Ontsteking van keel/neus/oor"],
          ])
        },
        {
          key: 'u',
          content: new Map([
            ["nl", "Moeite met spreken"],
          ])
        },
        {
          key: 'v',
          content: new Map([
            ["nl", "Oog niet goed kunnen sluiten"],
          ])
        },
        {
          key: 'w',
          content: new Map([
            ["nl", "Moeite met (netjes) schrijven"],
          ])
        },
        {
          key: 'x',
          content: new Map([
            ["nl", "Blaasjes, uitslag in het gezicht"],
          ])
        },
      ]
    })
  }
}


export class Symptoms3 extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Sym3');

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
        ['nl', 'In hoeverre hebben je lichamelijke of psychische klachten volgens jou met je tekenbeet, erythema migrans of andere ziekte van Lyme te maken?'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Zeer veel"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Veel"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "Een beetje"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "Niet"],
          ])
        },
        {
          key: 'e', role: 'option',
          content: new Map([
            ["nl", "Ik heb geen klachten"],
          ])
        },
      ]
    })
  }
}



export class Pregnant extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Preg');

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
        ['nl', 'Ben je zwanger?'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'numberInput',
          content: new Map([
            ["nl", "Ja, aantal weken:"],
          ]),
          optionProps: {
            min: 1,
            max: 43
          }
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


export class FunctioningText extends Item {

  markdownContent = `
# Functioneren

In deze vragenlijst wordt naar je gezondheid gevraagd.
Wanneer je twijfelt over het antwoord op een vraag, probeer dan het antwoord te geven dat het meest van toepassing is.

De volgende vragen gaan over dagelijkse bezigheden.
    `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'FuncT');

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

export class Functioning1 extends Item {

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
    super(parentKey, 'Func1');

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


export class Functioning2 extends Item {

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
    super(parentKey, 'Func2');

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


export class Functioning3 extends Item {

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
    super(parentKey, 'Func3');

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



export class Functioning4 extends Item {

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
    super(parentKey, 'Func4');

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


export class Functioning5 extends Item {

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
    super(parentKey, 'Func5');

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


export class Fatigue extends Item {

  //TODO: how do I implement the example of selecting an answer?
  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Met behulp van de volgende uitspraken willen wij een indruk krijgen van hoe je jezelf'],
      ]),
    },
    {
      content: new Map([
        ["nl", " de laatste twee weken"],
      ]),
      className: "text-primary"
    },
    {
      content: new Map([
        ["nl", " hebt gevoeld."],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'CIS');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.responsiveSingleChoiceArray({
      defaultMode: 'horizontal',
      responsiveModes: {
        // md: 'table',
        sm: 'horizontal'
      },
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      topDisplayCompoments: [//TODO: this is copied from longcovid survey and probably out of date. Update to latest syntax
        {
          role: 'text',
          style: [{ key: 'variant', value: 'p' }],
          content: generateLocStrings(new Map([
            ["nl", 'Klik het hokje aan dat het meest overeenkomt met je gevoel.'],
          ]))
        },

        {
          role: 'text',
          style: [{ key: 'variant', value: 'p' }],
          content: generateLocStrings(new Map([
            ["nl", 'Bijvoorbeeld als je jezelf wel wat ontspannen voelt, maar niet zo erg ontspannen, kun je het kruisje in een van de hokjes zetten die in de buurt staan van de antwoordmogelijkheid "ja, dat klopt". Dus bijvoorbeeld als volgt: '],
          ]))
        },
        ComponentGenerators.markdown({
          content: new Map([
            ['nl', `
<img src="https://raw.githubusercontent.com/tekenradar/participant-webapp/content/public/assets/images/survey-content/CIS_fatigue_example.png" width="100%"/>
                `]
          ])
        }),
        {
          role: 'text',
          style: [{ key: 'className', value: 'mb-1 border-bottom border-1 border-grey-5 pt-1 mt-2 fw-bold' }],
          content: generateLocStrings(new Map([
            ["nl", "Klik nu hieronder aan welk van de antwoorden het meest overeenkomt met je gevoel"],
          ]))
        },

      ],
      scaleOptions: [
        {
          key: '1', content: new Map([
            ["nl", "1 ja, dat klopt"],
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
          ]),
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
            ["nl", "7 nee, dat klopt niet"],
          ])
        }
      ],
      rows: [
        {
          key: 'a', content: new Map([
            ["nl", "Ik voel me moe"],
          ])
        },
        {
          key: 'b',
          content: new Map([
            ["nl", "Lichamelijk voel ik me uitgeput"],
          ])
        },
        {
          key: 'c',
          content: new Map([
            ["nl", "Ik voel me fit"],
          ])
        },
        {
          key: 'd',
          content: new Map([
            ["nl", "Ik voel me slap"],
          ]),
        },
        {
          key: 'e',
          content: new Map([
            ["nl", "Ik voel me uitgerust"],
          ])
        },
        {
          key: 'f',
          content: new Map([
            ["nl", "Lichamelijk voel ik me in een slechte conditie"],
          ])
        },
        {
          key: 'g',
          content: new Map([
            ["nl", "Ik ben gauw moe"],
          ])
        },
        {
          key: 'h',
          content: new Map([
            ["nl", "Lichamelijk voel ik me in een uitstekende conditie"],
          ])
        },
      ]
    })
  }
}



export class Cognition extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'De volgende vragen gaan over kleine, alledaagse vergissingen die iedereen van tijd tot tijd maakt. Sommige van die vergissingen overkomen je '],
      ]),
    },
    {
      content: new Map([
        ["nl", "mogelijk "],
      ]),
      className: "text-primary"
    },
    {
      content: new Map([
        ["nl", "wat vaker dan andere. Vink hieronder aan hoe vaak je dit overkomt."],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Cog');

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
            ["nl", "Zeer vaak"],
          ])
        }, {
          key: '2', content: new Map([
            ["nl", "Vaak"],
          ])
        },
        {
          key: '3', content: new Map([
            ["nl", "Af en toe"],
          ])
        }, {
          key: '4', content: new Map([
            ["nl", "Zelden"],
          ])
        },
        {
          key: '5', content: new Map([
            ["nl", "Nooit"],
          ])
        }
      ],
      rows: [
        {
          key: 'a', content: new Map([
            ["nl", "Iets lezen en vlak daarna niet meer weten wat je gelezen hebt, zodat je het moet overlezen"],
          ])
        },
        {
          key: 'b',
          content: new Map([
            ["nl", "Vergeten waarom je naar een bepaald gedeelte van je huis bent gelopen"],
          ])
        },
        {
          key: 'c',
          content: new Map([
            ["nl", "Wegwijzers over het hoofd zien"],
          ])
        },
        {
          key: 'd',
          content: new Map([
            ["nl", "Links en rechts verwarren bij het beschrijven van een route"],
          ]),
        },
        {
          key: 'e',
          content: new Map([
            ["nl", "Per ongeluk tegen mensen opbotsen"],
          ])
        },
        {
          key: 'f',
          content: new Map([
            ["nl", "Niet meer weten of je het licht of het gas hebt uitgedaan, of de deur hebt afgesloten"],
          ])
        },
        {
          key: 'g',
          content: new Map([
            ["nl", "Niet luisteren naar de naam van een persoon op het moment dat deze persoon zich aan je voorstelt."],
          ])
        },
        {
          key: 'h',
          content: new Map([
            ["nl", "Iets er uitflappen en achteraf bedenken dat dat wel eens beledigend voor iemand zou kunnen zijn"],
          ])
        },
        {
          key: 'i',
          content: new Map([
            ["nl", "Niet merken dat iemand iets tegen je zegt als je met iets anders bezig bent."],
          ])
        },
        {
          key: 'j',
          content: new Map([
            ["nl", "Boos worden en daar later spijt van hebben."],
          ])
        },
        {
          key: 'k',
          content: new Map([
            ["nl", "Belangrijke brieven dagenlang onbeantwoord laten"],
          ])
        },
        {
          key: 'l',
          content: new Map([
            ["nl", "Vergeten welke straat je moet inslaan als je een route kiest die je goed kent, maar die je zelden gebruikt."],
          ])
        },
        {
          key: 'm',
          content: new Map([
            ["nl", "In een supermarkt niet kunnen vinden wat je zoekt terwijl het er wel is"],
          ])
        },
        {
          key: 'n',
          content: new Map([
            ["nl", "Je plotseling afvragen of je een woord op de juiste manier gebruikt"],
          ])
        },
        {
          key: 'o',
          content: new Map([
            ["nl", "Moeite hebben met het nemen van beslissingen"],
          ])
        },
        {
          key: 'p',
          content: new Map([
            ["nl", "Afspraken vergeten"],
          ])
        },
        {
          key: 'q',
          content: new Map([
            ["nl", "Vergeten waar je iets hebt neergelegd, zoals een boek of een krant"],
          ])
        },
        {
          key: 'r',
          content: new Map([
            ["nl", "Per ongeluk iets weggooien wat je nodig hebt en bewaren wat je wilde weggooien"],
          ])
        },
        {
          key: 's',
          content: new Map([
            ["nl", "Dagdromen terwijl je eigenlijk naar iets of iemand zou moeten luisteren"],
          ])
        },
        {
          key: 't',
          content: new Map([
            ["nl", "Namen van mensen vergeten"],
          ])
        },
        {
          key: 'u',
          content: new Map([
            ["nl", "Beginnen met iets maar het niet afmaken, omdat je ongemerkt met iets anders bent begonnen"],
          ])
        },
        {
          key: 'v',
          content: new Map([
            ["nl", "Niet op een woord kunnen komen terwijl het ‘op het puntje van je tong’ ligt"],
          ])
        },
        {
          key: 'w',
          content: new Map([
            ["nl", "In een winkel vergeten wat je kwam kopen"],
          ])
        },
        {
          key: 'x',
          content: new Map([
            ["nl", "Dingen uit je handen laten vallen"],
          ])
        },
        {
          key: 'y',
          content: new Map([
            ["nl", "In een gesprek niets meer weten om over te praten."],
          ])
        },
      ]
    })
  }
}




export class QuestionsKids1 extends Item {

  optionKeys = {
    parent: 'b'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'QuKids1');

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
          key: this.optionKeys.parent, role: 'option',
          content: new Map([
            ["nl", "Een ouder/verzorger van degene jonger dan 18 jaar"],
          ])
        },
      ]
    })
  }
}


export class QuestionsKids2 extends Item {
  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Welke ouder/verzorger vult op dit moment de vragen in?'],
      ]),
    }
  ]


  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'QuKids2');

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
            ["nl", "Moeder"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Vader"],
          ])
        },
        {
          key: 'c', role: 'input',
          content: new Map([
            ["nl", "Anders namelijk:"],
          ])
        }
      ]
    })
  }
}




export class TextQUKids extends Item {

  markdownContent = `
##### Let op: bovenaan de pagina staat steeds wie de vragen kan beantwoorden (zie ook hierboven)! Soms is dat degene over/voor wie de vragenlijst wordt ingevuld, soms een ouder/verzorger, en soms maakt het niet.
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
function gt(arg0: number, arg1: number): Expression | undefined {
  throw new Error('Function not implemented.');
}

