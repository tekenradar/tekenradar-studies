import { Expression } from 'survey-engine/data_types';
import { Item } from 'case-editor-tools/surveys/types';
import { SurveyItems } from 'case-editor-tools/surveys';
import { SingleChoiceOptionTypes as SCOptions, ClozeItemTypes } from 'case-editor-tools/surveys';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';




export class Tekenradar extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'tek');

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
        ['nl', 'Hoe heb je over het onderzoek via Tekenradar.nl gehoord? (meerdere antwoorden mogelijk)'],
      ]),
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

//TODO: why is Markdown not working in this text???
export class StandardText1 extends Item {

  markdownContent = `
    De volgende vraag gebruiken wij alleen om te bekijken of de deelnemers aan het
    onderzoek een goede afspiegeling zijn van de Nederlandse samenleving.
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

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'qual');

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
        ['nl', 'Wat is je hoogst voltooide opleiding?'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Geen voltooide opleiding (lager onderwijs niet afgemaakt)"],
          ])
        },
        {
          key: 'b', role: 'input',
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
          key: 'e', role: 'input',
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
          key: 'g', role: 'input',
          content: new Map([
            ["nl", "Hoger beroepsonderwijs (zoals HBO, HTS, HEAO, kandidaatswetenschappelijk onderwijs)"],
          ])
        },
        {
          key: 'h', role: 'input',
          content: new Map([
            ["nl", "Wetenschappelijk onderwijs (universiteit)"],
          ])
        }
      ]
    })
  }
}



export class Symptoms1 extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Sym1');

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
        ['nl', 'Welke lichamelijke en psychische problemen heb je? Kruis aan welke problemen je nu hebt. Kruis ook aan welke problemen je nog meer hebt gehad in de afgelopen 12 maanden. Je kunt dus meer dan 1 hokje aankruisen.'],
      ]),
      responseOptions: [
        {
          key: 't1', role: 'text',
          style: [{ key: 'className', value: 'fw-bold mb-2' }],
          content: new Map([
            ["nl", "Longen en hoofdholten"],
          ])
        },
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Astma, chronische bronchitis of CARA"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Ontsteking van de neusbijholte, voorhoofdsholte of kaakholten"],
          ])
        },
        {
          key: 't2', role: 'text',
          style: [{ key: 'className', value: 'fw-bold mb-2' }],
          content: new Map([
            ["nl", "Hart en bloedvaten"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "Ernstige hartkwaal of hartinfarct"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "Hoge bloeddruk"],
          ])
        },
        {
          key: 'e', role: 'option',
          content: new Map([
            ["nl", "Beroerte of gevolgen van beroerte"],
          ])
        },
        {
          key: 't3', role: 'text',
          style: [{ key: 'className', value: 'fw-bold mb-2' }],
          content: new Map([
            ["nl", "Maag en darmen"],
          ])
        },
        {
          key: 'f', role: 'option',
          content: new Map([
            ["nl", "Maagzweer of zweer aan de 12-vingerige darm"],
          ])
        },
        {
          key: 'g', role: 'option',
          content: new Map([
            ["nl", "Ernstige darmstoornissen, langer dan 3 maanden"],
          ])
        },
        {
          key: 't4', role: 'text',
          style: [{ key: 'className', value: 'fw-bold mb-2' }],
          content: new Map([
            ["nl", "Galblaas, lever en nieren"],
          ])
        },
        {
          key: 'h', role: 'option',
          content: new Map([
            ["nl", "Galstenen of galblaasontsteking"],
          ])
        },
        {
          key: 'i', role: 'option',
          content: new Map([
            ["nl", "Leverziekte of levercirrose"],
          ])
        },
        {
          key: 'j', role: 'option',
          content: new Map([
            ["nl", "Nierstenen"],
          ])
        },
        {
          key: 'k', role: 'option',
          content: new Map([
            ["nl", "Ernstige nierziekte"],
          ])
        },
        {
          key: 't5', role: 'text',
          style: [{ key: 'className', value: 'fw-bold mb-2' }],
          content: new Map([
            ["nl", "Blaas en baarmoeder"],
          ])
        },
        {
          key: 'l', role: 'option',
          content: new Map([
            ["nl", "Chronische blaasontsteking"],
          ])
        },
        {
          key: 'm', role: 'option',
          content: new Map([
            ["nl", "Verzakking"],
          ])
        },
        {
          key: 't6', role: 'text',
          style: [{ key: 'className', value: 'fw-bold mb-2' }],
          content: new Map([
            ["nl", "Andere ziektes"],
          ])
        },
        {
          key: 'n', role: 'option',
          content: new Map([
            ["nl", "Suikerziekte"],
          ])
        },
        {
          key: 'o', role: 'option',
          content: new Map([
            ["nl", "Schildklierafwijking"],
          ])
        },
        {
          key: 't7', role: 'text',
          style: [{ key: 'className', value: 'fw-bold mb-2' }],
          content: new Map([
            ["nl", "Rug en gewrichten"],
          ])
        },
        {
          key: 'p', role: 'option',
          content: new Map([
            ["nl", "Rugaandoening van hardnekkige aard, langer dan 3 maanden,of hernia"],
          ])
        },
        {
          key: 'q', role: 'option',
          content: new Map([
            ["nl", "Gewrichtsslijtage (artrose) van knieën, heupen of handen"],
          ])
        },
        {
          key: 'r', role: 'option',
          content: new Map([
            ["nl", "Gewrichtsontsteking (reuma) van handen en/of voeten"],
          ])
        },
        {
          key: 's', role: 'option',
          content: new Map([
            ["nl", "Andere chronische reuma, langer dan 3 maanden"],
          ])
        },
        {
          key: 't8', role: 'text',
          style: [{ key: 'className', value: 'fw-bold mb-2' }],
          content: new Map([
            ["nl", "Zenuwstelsel"],
          ])
        },
        {
          key: 't', role: 'option',
          content: new Map([
            ["nl", "Epilepsie"],
          ])
        },
        {
          key: 'u', role: 'option',
          content: new Map([
            ["nl", "Andere ziekten van het zenuwstelsel, zoals ziekte van Parkinson"],
          ])
        },
        {
          key: 'v', role: 'option',
          content: new Map([
            ["nl", "Multiple sclerose"],
          ])
        },
        {
          key: 'w', role: 'option',
          content: new Map([
            ["nl", "Duizeligheid met vallen"],
          ])
        },
        {
          key: 'x', role: 'option',
          content: new Map([
            ["nl", "Migraine"],
          ])
        },
        {
          key: 't9', role: 'text',
          style: [{ key: 'className', value: 'fw-bold mb-2' }],
          content: new Map([
            ["nl", "Andere lichamelijke of psychische problemen"],
          ])
        },
        {
          key: 'y', role: 'option',
          content: new Map([
            ["nl", "Kwaadaardige aandoening of kanker"],
          ])
        },
        {
          key: 'z', role: 'option',
          content: new Map([
            ["nl", "Overspannen, depressie, ernstige nervositeit"],
          ])
        },
        {
          key: 'aa', role: 'option',
          content: new Map([
            ["nl", "Chronische huidziekte of eczeem"],
          ])
        },
        {
          key: 'ab', role: 'option',
          content: new Map([
            ["nl", "Letsel door ongeluk in en om huis sport, school, werk of in het verkeer"],
          ])
        },
        {
          key: 'ac', role: 'option',
          content: new Map([
            ["nl", "Afweerstoornis"],
          ])
        },
        {
          key: 'ad', role: 'option',
          content: new Map([
            ["nl", "Ondergaan van transplantatie"],
          ])
        },
        {
          key: 'ae', role: 'option',
          content: new Map([
            ["nl", "Alcoholverslaving"],
          ])
        },
        {
          key: 'af', role: 'option',
          content: new Map([
            ["nl", "Drugsverslaving"],
          ])
        },
        {
          key: 'ag', role: 'option',
          content: new Map([
            ["nl", "Ernstige vermoeidheid, langer dan 3 maanden"],
          ])
        },
        {
          key: 'ah', role: 'option',
          content: new Map([
            ["nl", "Ernstige pijnklachten, langer dan 3 maanden"],
          ])
        },
        {
          key: 'ai', role: 'option',
          content: new Map([
            ["nl", "Ernstige concentratiestoornissen, langer dan 3 maanden"],
          ])
        },
        {
          key: 'aj', role: 'option',
          content: new Map([
            ["nl", "Geen van de bovenstaande"],
          ])
        },
      ]
    })
  }
}



export class Symptoms2 extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Sym2');

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
        {//TODO: this option only for females
          key: 'd',
          content: new Map([
            ["nl", "Menstruatiepijn of andere problemen tijdens de menstruatie"],
          ]),
          //disabled: SurveyEngine.singleChoice.any(,'b')???
        },
        {
          key: 'e',
          content: new Map([
            ["nl", "Pijn of problemen bij seksuele gemeenschap"],
          ])
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
            ["nl", "Zich moe voelen of gebrek aan energie hebben"],
          ])
        },
        {
          key: 'p',
          content: new Map([
            ["nl", "Zich niet goed kunnen concentreren, of last van vergeetachtigheid"],
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
          key: 'b', role: 'input',
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
          key: 'e', role: 'input',
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


//TODO: why is Markdown not working in this text???
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
      defaultMode: 'table',
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

  //TODO bold text "in de afgelopen 3 maanden" ?
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

  //TODO: maybe separate item for this header text
  //TODO: how do I implement the example of selecting an answer?
  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Met behulp van de volgende uitspraken willen wij een indruk krijgen van hoe je jezelf de laatste twee weken hebt gevoeld. Zet een kruisje in het hokje dat het meest overeenkomt met je gevoel. Bijvoorbeeld als je jezelf wel wat ontspannen voelt, maar niet zo erg ontspannen, kun je het kruisje in een van de hokjes zetten die in de buurt staan van de antwoordmogelijkheid "ja, dat klopt". Dus bijvoorbeeld als volgt: Ik voel me ontspannen: ja, dat klopt'],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Fat');

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
            ["nl", "Ja, dat klopt"],
          ])
        }, {
          key: '2', content: new Map([
            ["nl", "Nee, dat klopt niet"],
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
      defaultMode: 'table',
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
            ["nl", "JE plotseling afvragen of je een woord op de juiste manier gebruikt"],
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


export class MedCareText1 extends Item {

  markdownContent = `
    Dit deel van de vragenlijst is bedoeld om in kaart te brengen met welke zorg- of hulpverleners je in de **afgelopen 3 maanden** contact hebt gehad.
    `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'MedCText1');

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



export class MedCare1 extends Item {

  optionKeys = {
    nameOfOption: 'a'
  }


  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Heb je in de '],
      ]),
    },
    {
      content: new Map([
        ["nl", "afgelopen 3 maanden "],
      ]),
      className: "text-primary"
    },
    {
      content: new Map([
        ["nl", "contact gehad met een zorgverlener?"],
      ]),
    },
  ]


  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'MedC1');

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



export class MedCareText2 extends Item {

  markdownContent = `
  Met zorgverleners bedoelen wij je huisarts, specialist, fysiotherapeut, psycholoog, maatschappelijkwerker, homeopaat, logopedist of andere arts, therapeut of zorgconsulent.
    `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'MedCText2');

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



export class MedCare2 extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'MedC2');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.clozeQuestion({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([["nl","Met welke zorgverleners heb je contact gehad in de afgelopen 3 maanden? En hoe vaak?"]]),
      items: [
        ClozeItemTypes.text({
          key: '1', content: new Map(
            [['nl', "Zorgverlener:"]]
          )
        }),
        ClozeItemTypes.textInput({
          key: '2',
        }),
        ClozeItemTypes.text({
          key: '3', content: new Map(
            [['nl', "Aantal contacten:"]]
          )
        }),
        ClozeItemTypes.textInput({
          key: '4',
        })
      ]
    })
  }
}



export class MedCareText3 extends Item {

  markdownContent = `
  Tel voor het aantal contacten alle controles, spreekuren, bezoeken op afspraak, telefonische contacten en huisbezoeken mee. Telefonische contacten om een afspraak te maken dienen niet meegeteld te worden. Als je een antwoord niet precies weet, mag je gerust een schatting geven.
    `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'MedCText3');

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


export class Awareness extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Omcirkel alsjeblieft bij elke vraag het getal dat je mening het beste weergeeft: Helmaal geen invloed [ 0 / 1 / 2 / 3 / 4 / 5 / 6 / 7 / 8 / 9 / 10 ] zeer veel invloed'],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Aware');

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
        },
        {
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
        },
        {
          key: '8', content: new Map([
            ["nl", "8"],
          ])
        }, {
          key: '9', content: new Map([
            ["nl", "9"],
          ])
        },
        {
          key: '10', content: new Map([
            ["nl", "10"],
          ])
        }
      ],
      rows: [
         /* {
            key: 'OS1',
              startLabel: new Map([
                  ['de', '...zielten auf die Politik des Gegners']
              ]),
              endLabel: new Map([
                  ['de', '...zielten auf die Persönlichkeit des Gegners']
              ]),
          },*/
        {
          key: 'a', content: new Map([
            ["nl", "Hoeveel invloed heeft de tekenbeet, erythema migrans of andere ziekte van lyme op je leven?"],
          ])
        },
        {
          key: 'b',
          content: new Map([
            ["nl", "Hoe lang denk je dat de tekenbeet, erythema migrans of andere ziekte van lyme zal duren?"],
          ])
        },
        {
          key: 'c',
          content: new Map([
            ["nl", "In hoeverre meen je de tekenbeet, erythema migrans of andere ziekte van lyme zelf te kunnen beheersen?"],
          ])
        },
        {
          key: 'd',
          content: new Map([
            ["nl", "In hoeverre denk je dat je behandeling helpt bij de erythema migrans of andere ziekte van lyme?"],
          ]),
        },
        {
          key: 'e',
          content: new Map([
            ["nl", "In hoeverre ervaar je lichamelijke klachten van de tekenbeet, erythema migrans of andere ziekte van Lyme ziekte?"],
          ])
        },
        {
          key: 'f',
          content: new Map([
            ["nl", "In hoeverre ben je bezorgd over de tekenbeet, erythema migrans of andere ziekte van Lyme?"],
          ])
        },
        {
          key: 'g',
          content: new Map([
            ["nl", "In hoeverre heb je het gevoel dat je de tekenbeet, erythema migrans of andere ziekte van Lyme begrijpt?"],
          ])
        },
        {
          key: 'h',
          content: new Map([
            ["nl", "In hoeverre heeft de tekenbeet, erythema migrans of andere ziekte van Lyme invloed op je gemoedstoestand? (b.v. maakt het je boos,angstig, van streek, of somber?)"],
          ])
        },
      ]
    })
  }
}



export class Awareness1 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Hoeveel invloed heeft de tekenbeet, erythema migrans of andere ziekte van lyme op je leven?'],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Aware1');

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
                  ['de', 'Helmaal geen invloed']
              ]),
              endLabel: new Map([
                  ['de', 'Zeer veel invloed']
              ]),
          },
      ]
    })
  }
}


export class Awareness2 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Hoe lang denk je dat de tekenbeet, erythema migrans of andere ziekte van lyme zal duren?'],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Aware2');

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
                  ['de', 'Helmaal geen invloed']
              ]),
              endLabel: new Map([
                  ['de', 'Zeer veel invloed']
              ]),
          },
      ]
    })
  }
}
