import { Expression } from 'survey-engine/lib/data_types';
import { Group, Item } from 'case-editor-tools/surveys/types';
import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';
import { PreviousTickBitesGroup } from './prevTickBites';
import { Residence, Gender } from './demographie';
import { Doctor, FormerLymeGroup, GeneralTherapy } from './diagnosisTherapy';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';
import { SingleChoiceOptionTypes as SCOptions, ClozeItemTypes } from 'case-editor-tools/surveys';
import { rm } from 'fs';




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
export class Text1Standard extends Item{

    markdownContent = `
    De volgende vraag gebruiken wij alleen om te bekijken of de deelnemers aan het 
    onderzoek een goede afspiegeling zijn van de Nederlandse samenleving.
    `
  
    constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
      super(parentKey, 'Text1St');
  
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
                    ["de", "Geen last"],
                ])
            }, {
                key: '2', content: new Map([
                    ["de", "Een beetje last"],
                ])
            }, {
                key: '3', content: new Map([
                    ["de", "Veel last"],
                ])
            }
        ],

        rows: [
            {
                key: 'a', content: new Map([
                    ["de", "Buikpijn"],
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
      super(parentKey, 'preg');
  
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
export class FunctioningText extends Item{

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
                    ["de", "Ernstig beperkt"],
                ])
            }, {
                key: '2', content: new Map([
                    ["de", "Een beetje beperkt"],
                ])
            }, {
                key: '3', content: new Map([
                    ["de", "Helemaal niet beperkt"],
                ])
            }
        ],	
        rows: [
            {
                key: 'a', content: new Map([
                    ["de", "Forse inspanning (zoals hardlopen, zware voorwerpen tillen, inspannend sporten)"],
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
                    ["de", "Ja, dat klopt"],
                ])
            }, {
                key: '2', content: new Map([
                    ["de", "Nee, dat klopt niet"],
                ])
            }
        ],	
        rows: [
            {
                key: 'a', content: new Map([
                    ["de", "Ik voel me moe"],
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
        },
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
                    ["de", "Zeer vaak"],
                ])
            }, {
                key: '2', content: new Map([
                    ["de", "Vaak"],
                ])
            },
            {
                key: '3', content: new Map([
                    ["de", "Af en toe"],
                ])
            }, {
                key: '4', content: new Map([
                    ["de", "Zelden"],
                ])
            },
            {
                key: '5', content: new Map([
                    ["de", "Nooit"],
                ])
            }
        ],	
        rows: [
            {
                key: 'a', content: new Map([
                    ["de", "Ik voel me moe"],
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
