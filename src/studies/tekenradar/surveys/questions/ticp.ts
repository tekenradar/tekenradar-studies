import { Expression } from 'survey-engine/data_types';
import { Item, Group, OptionDef } from 'case-editor-tools/surveys/types';
import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';
import { ClozeItemTypes } from 'case-editor-tools/surveys';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';
import { SurveySuffix } from '../globalConstants';

export class TicP_Group extends Group {
  Q1PreText: MedCareText1;
  Q1: MedCare1;
  Q2: MedCare2;

  constructor(parentKey: string, isRequired?: boolean) {
    super(parentKey, 'TicP');

    const required = isRequired !== undefined ? isRequired : false;

    this.Q1PreText = new MedCareText1(this.key);
    this.Q1 = new MedCare1(this.key, required);

    const Q1number = SurveyEngine.getResponseValueAsNum(this.Q1.key, `rg.scg.${this.Q1.optionKeys.yes_number}`);
    this.Q2 = new MedCare2(this.key, required, Q1number);
  }

  buildGroup(): void {
    this.addItem(this.Q1PreText.get());
    this.addItem(this.Q1.get());
    this.addItem(this.Q2.get());
  }
}


class MedCareText1 extends Item {

  markdownContentKids = `
# Zorgconsumptie

De vragen hieronder zijn voor een minderjarige.
Ben je een ouder/verzorger dan kun je de antwoorden invullen voor/over je kind.

Dit deel van de vragenlijst is bedoeld om in kaart te brengen met welke zorg- of hulpverleners je in de **afgelopen 3 maanden** contact hebt gehad.
    `
  markdownContentAdults = `
# Zorgconsumptie

Dit deel van de vragenlijst is bedoeld om in kaart te brengen met welke zorg- of hulpverleners je in de **afgelopen 3 maanden** contact hebt gehad.
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
            ["nl", this.isPartOf(SurveySuffix.Kids) ? this.markdownContentKids : this.markdownContentAdults],
          ]),
          className: ''
        })
      ]
    })
  }
}



class MedCare1 extends Item {
  optionKeys = {
    yes_number: 'a'
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
    super(parentKey, 'Q1');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    const markdownContent = `
*Met zorgverleners bedoelen wij je huisarts, specialist, fysiotherapeut, psycholoog, maatschappelijk werker, homeopaat, logopedist of andere arts, therapeut of zorgconsulent.*
    `

    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      responseOptions: [
        {
          key: this.optionKeys.yes_number, role: 'numberInput',
          content: new Map([
            ["nl", "Ja, aantal zorgverleners:"],
          ]),
          optionProps: {
            min: 0,
            max: 8,
          }
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Nee"],
          ])
        },
      ],
      customValidations: [
        {
          key: 'Q1', rule: SurveyEngine.logic.or(
            SurveyEngine.singleChoice.none(this.key, this.optionKeys.yes_number),
            SurveyEngine.compare.gt(SurveyEngine.getResponseValueAsNum(this.key, `rg.scg.${this.optionKeys.yes_number}`), 0),
          ), type: 'hard'
        }
      ],
      topDisplayCompoments: [
        ComponentGenerators.markdown({
          content: new Map([
            ["nl", markdownContent],
          ]),
          className: 'mb-2'
        })
      ]
    })
  }
}


class MedCare2 extends Item {
  numberRef: Expression;

  constructor(parentKey: string, isRequired: boolean, Q1NumberRef: Expression) {
    super(parentKey, 'Q2');

    this.isRequired = isRequired;
    this.condition = SurveyEngine.compare.gt(Q1NumberRef, 0);
    this.numberRef = Q1NumberRef;
  }

  buildItem() {
    const cItems: Array<OptionDef> = [];
    Array.from({ length: 8 }).forEach((_, index) => {
      const rowCondition = SurveyEngine.compare.gt(this.numberRef, index);
      cItems.push(ClozeItemTypes.text({
        key: `row_${index + 1}_label`,
        content: new Map(
          [['nl', `${index + 1}. Zorgverlener:`]]
        ),
        displayCondition: rowCondition,
      }));
      cItems.push(ClozeItemTypes.textInput({
        key: `row_${index + 1}_input`,
        displayCondition: rowCondition,
        className: 'flex-grow-1',
        alignText: 'start',
      }));
      cItems.push(ClozeItemTypes.clozeLineBreak());
      cItems.push(ClozeItemTypes.text({
        key: `row_${index + 1}_label2`,
        content: new Map(
          [['nl', `aantal contacten:`]]
        ),
        displayCondition: rowCondition,
        className: 'ps-2'
      }));
      cItems.push(ClozeItemTypes.numberInput({
        key: `row_${index + 1}_number`,
        inputMaxWidth: '80px',
        inputLabel: new Map([["nl", " "],]),
        componentProperties: {
          min: 0,
          max: 100
        },
        displayCondition: rowCondition,
      }));
      cItems.push(ClozeItemTypes.text({
        className: 'border-top border-grey-2 my-2 w-100 ',
        displayCondition: rowCondition,
      }));
      //cItems.push(ClozeItemTypes.clozeLineBreak());
    })

    const markdownContent = `
*Tel voor het aantal contacten alle controles, spreekuren, bezoeken op afspraak, telefonische contacten en huisbezoeken mee. Telefonische contacten om een afspraak te maken dienen niet meegeteld te worden. Als je een antwoord niet precies weet, mag je gerust een schatting geven.*
    `

    return SurveyItems.clozeQuestion({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', "Met welke zorgverleners heb je contact gehad in de afgelopen 3 maanden? En hoe vaak?"],
      ]),
      items: cItems,
      topDisplayCompoments: [
        ComponentGenerators.markdown({
          content: new Map([[
            'nl', markdownContent
          ]]),
          className: 'mb-2'
        })
      ]
    })
  }
}




export class TicP_Comorbidity extends Item {
  optionKeys = {
    none: 'aj',
  }

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Welke lichamelijke en psychische problemen heb je? Kruis aan welke problemen je nu hebt. Kruis ook aan welke problemen je nog meer hebt gehad in de '],
      ]),
    },
    {
      content: new Map([
        ["nl", "afgelopen 12 maanden"],
      ]),
      className: "text-primary"
    },
    {
      content: new Map([
        ["nl", ". Je kunt dus meer dan 1 hokje aanklikken."],
      ]),
    },
  ]


  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'TicP_Comorbidity');

    this.isRequired = isRequired;
    this.condition = condition;

  }

  buildItem() {
    const optionDisabled = SurveyEngine.multipleChoice.any(this.key, this.optionKeys.none);

    const currentYear = new Date().getFullYear(); // Get the current year dynamically
    const
      years =
        Array.from({
          length:
            17
        }, (v,
          k) => (currentYear
            -
            k).toString());


    return SurveyItems.multipleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
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
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Astma, chronische bronchitis of CARA"],
          ])
        },
        {
          key: 'b', role: 'option',
          disabled: optionDisabled,
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
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Ernstige hartkwaal of hartinfarct"],
          ])
        },
        {
          key: 'd', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Hoge bloeddruk"],
          ])
        },
        {
          key: 'e', role: 'option',
          disabled: optionDisabled,
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
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Maagzweer of zweer aan de 12-vingerige darm"],
          ])
        },
        {
          key: 'g', role: 'option',
          disabled: optionDisabled,
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
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Galstenen of galblaasontsteking"],
          ])
        },
        {
          key: 'i', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Leverziekte of levercirrose"],
          ])
        },
        {
          key: 'j', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Nierstenen"],
          ])
        },
        {
          key: 'k', role: 'option',
          disabled: optionDisabled,
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
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Chronische blaasontsteking"],
          ])
        },
        {
          key: 'm', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Verzakking"],
          ]),
          displayCondition: this.isPartOf(SurveySuffix.Adults)
            ? undefined
            : this.isPartOf('LPplus_part1')
              ? SurveyEngine.responseHasOnlyKeysOtherThan(
                'LPplus_part1.Je gegevens.BirthYear',
                'rg.ddg',
                ...years
              )
              : SurveyEngine.compare.gt(1, 2),
        },
        //{
        //key: 't6', role: 'text',
        //style: [{ key: 'className', value: 'fw-bold mb-2' }],
        //content: new Map([
        //  ["nl", "Andere ziektes"],
        //])
        //},
        {
          key: 't7', role: 'text',
          style: [{ key: 'className', value: 'fw-bold mb-2' }],
          content: new Map([
            ["nl", "Rug en gewrichten"],
          ])
        },
        {
          key: 'p', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Rugaandoening van hardnekkige aard, langer dan 3 maanden, of hernia"],
          ])
        },
        {
          key: 'q', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Gewrichtsslijtage (artrose) van knieën, heupen of handen"],
          ]),
          displayCondition: this.isPartOf(SurveySuffix.Adults)
            ? undefined
            : this.isPartOf('LPplus_part1')
              ? SurveyEngine.responseHasOnlyKeysOtherThan(
                'LPplus_part1.Je gegevens.BirthYear',
                'rg.ddg',
                ...years
              )
              : SurveyEngine.compare.gt(1, 2),
        },
        {
          key: 'r', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Gewrichtsontsteking (reuma) van handen en/of voeten"],
          ])
        },
        {
          key: 's', role: 'option',
          disabled: optionDisabled,
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
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Epilepsie"],
          ])
        },
        {
          key: 'u_Adults', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Andere ziekten van het zenuwstelsel, zoals ziekte van Parkinson"],
          ]),
          displayCondition: this.isPartOf(SurveySuffix.Adults)
            ? undefined
            : this.isPartOf('LPplus_part1')
              ? SurveyEngine.responseHasOnlyKeysOtherThan(
                'LPplus_part1.Je gegevens.BirthYear',
                'rg.ddg',
                ...years
              )
              : SurveyEngine.compare.gt(1, 2),
        },
        {
          key: 'u_Kids', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Andere ziekten van het zenuwstelsel"],
          ]),
          displayCondition: this.isPartOf(SurveySuffix.Kids)
            ? undefined
            : this.isPartOf('LPplus_part1')
              ? SurveyEngine.responseHasKeysAny(
                'LPplus_part1.Je gegevens.BirthYear',
                'rg.ddg',
                ...years
              )
              : SurveyEngine.compare.gt(1, 2),
        },
        {
          key: 'v', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Multiple sclerose"],
          ])
        },
        {
          key: 'w', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Duizeligheid met vallen"],
          ])
        },
        {
          key: 'x', role: 'option',
          disabled: optionDisabled,
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
        {//these two items n and o moved down by kees
          key: 'n', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Suikerziekte"],
          ])
        },
        {
          key: 'o', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Schildklierafwijking"],
          ])
        },
        {
          key: 'y', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Kwaadaardige aandoening of kanker"],
          ])
        },
        {
          key: 'z', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Overspannen, depressie, ernstige nervositeit"],
          ])
        },
        {
          key: 'aa', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Chronische huidziekte of eczeem"],
          ])
        },
        {
          key: 'ab', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Letsel door ongeluk in en om huis, sport, school, werk of in het verkeer"],
          ])
        },
        {
          key: 'ac', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Afweerstoornis"],
          ])
        },
        {
          key: 'ad', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Ondergaan van transplantatie"],
          ])
        },
        {
          key: 'ae', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Alcoholverslaving"],
          ]),
          displayCondition: this.isPartOf(SurveySuffix.Adults)
            ? undefined
            : this.isPartOf('LPplus_part1')
              ? SurveyEngine.responseHasOnlyKeysOtherThan(
                'LPplus_part1.Je gegevens.BirthYear',
                'rg.ddg',
                ...years
              )
              : SurveyEngine.compare.gt(1, 2),
        },
        {
          key: 'af', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Drugsverslaving"],
          ]),
          displayCondition: this.isPartOf(SurveySuffix.Adults)
            ? undefined
            : this.isPartOf('LPplus_part1')
              ? SurveyEngine.responseHasOnlyKeysOtherThan(
                'LPplus_part1.Je gegevens.BirthYear',
                'rg.ddg',
                ...years
              )
              : SurveyEngine.compare.gt(1, 2),
        },
        {
          key: 'ag', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Ernstige vermoeidheid, langer dan 3 maanden"],
          ])
        },
        {
          key: 'ah', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Ernstige pijnklachten, langer dan 3 maanden"],
          ])
        },
        {
          key: 'ai', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Ernstige concentratiestoornissen, langer dan 3 maanden"],
          ])
        },
        {
          key: 't6', role: 'text',
          style: [{ key: 'className', value: 'fw-bold mb-2' }],
          content: new Map([
            ["nl", "Vink hieronder aan als geen van bovenstaande geldt"],
          ])
        },

        {
          key: 'aj', role: 'option',
          content: new Map([["nl", "Geen van bovenstaande"],
          ])
        },
      ]
    })
  }
}



export class TicP_werkHeader extends Item {

  markdownContent1 = `
# Werk

De volgende vragen gaan over **de afgelopen 3 maanden**`

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'TWHeader');

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
            ["nl", this.markdownContent1],
          ]),
          className: ''
        })
      ]
    })
  }
}

export class TicP_werk1 extends Item {
  optionKeys = {
    loon: 'b',
    zzp: 'c'
  }

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Wat doe je in het dagelijks leven? '],
      ]),
    },
    {
      content: new Map([
        ["nl", "Kruis aan wat je de meeste tijd doet"],
      ]),
      className: "fw-normal"
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'TW1');

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
      responseOptions: [{
        key: 'a', role: 'option',
        content: new Map([['nl', 'Ik zit op school, ik studeer']])
      }, {
        key: 'b', role: 'option',
        content: new Map([['nl', 'Ik werk in loondienst']])
      }, {
        key: 'c', role: 'option',
        content: new Map([['nl', 'Ik ben zelfstandig ondernemer']])
      }, {
        key: 'd', role: 'option',
        content: new Map([['nl', 'Ik ben huisvrouw, huisman']])
      }, {
        key: 'e', role: 'option',
        content: new Map([['nl', 'Ik ben werkloos']])
      }, {
        key: 'f', role: 'numberInput',
        content: new Map([['nl', 'Ik ben arbeidsongeschikt, voor aantal procent:']]),//TODO hier moet een percentage er nog achter
        optionProps: {
          min: 0,
          max: 100
        }
      }, {
        key: 'g', role: 'option',
        content: new Map([['nl', 'Ik ben met pensioen of prepensioen']])
      },
      {
        key: 'h', role: 'input',
        content: new Map([['nl', 'Ik doe iets anders, namelijk:']])
      }
      ]
    })
  }
}

export class TicP_werk2 extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'TW2');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.numericInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Hoeveel uur per week werk je? Tel alleen de uren waarvoor je betaald wordt'],
      ]),
      titleClassName: 'sticky-top',
      inputMaxWidth: '80px',
      inputLabel: new Map([
        ['nl', 'uren']
      ]),
      labelBehindInput: true,
      componentProperties: {
        min: 0,
        max: 168
      }
    })
  }
}

export class TicP_werk3 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Op hoeveel dagen in de week werk je?'],
      ]),
    },
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'TW3');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.dropDown({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      responseOptions: [
        {
          key: '1', role: 'option',
          content: new Map([
            ["nl", "1 dag in de week"],
          ])
        },
        {
          key: '2', role: 'option',
          content: new Map([
            ["nl", "2 dagen in de week"],
          ]),
        }, {
          key: '3', role: 'option',
          content: new Map([
            ["nl", "3 dagen in de week"],
          ]),
        }, {
          key: '4', role: 'option',
          content: new Map([
            ["nl", "4 dagen in de week"],
          ]),
        }, {
          key: '5', role: 'option',
          content: new Map([
            ["nl", "5 dagen in de week"],
          ]),
        }, {
          key: '6', role: 'option',
          content: new Map([
            ["nl", "6 dagen in de week"],
          ]),
        }, {
          key: '7', role: 'option',
          content: new Map([
            ["nl", "7 dagen in de week"],
          ]),
        },
      ],
    })
  }
}

export class TicP_werk4 extends Item {
  optionKeys = {
    yes_number: 'b'
  }

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Ben je in de '],
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
        ["nl", "afwezig geweest van je werk omdat je ziek was?"],
      ])
    }]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'TW4');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    const markdownContent = `
*Tel alle dagen die je verzuimd hebt in de afgelopen 3 maanden*
    `
    return SurveyItems.dropDown({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      responseOptions: [
        {
          key: '0', role: 'option',
          content: new Map([
            ["nl", "Ik ben de afgelopen 3 maanden niet afwezig geweest"],
          ])
        },
        {
          key: '1', role: 'option',
          content: new Map([
            ["nl", "Ik ben 1 dag afwezig geweest"],
          ])
        },
        {
          key: '2', role: 'option',
          content: new Map([
            ["nl", "Ik ben 2 dagen afwezig geweest"],
          ])
        },
        {
          key: '3', role: 'option',
          content: new Map([
            ["nl", "Ik ben 3 dagen afwezig geweest"],
          ])
        },

        {
          key: '4', role: 'option',
          content: new Map([
            ["nl", "Ik ben 4 dagen afwezig geweest"],
          ])
        },

        {
          key: '5', role: 'option',
          content: new Map([
            ["nl", "Ik ben 5 dagen afwezig geweest"],
          ])
        },

        {
          key: '6', role: 'option',
          content: new Map([
            ["nl", "Ik ben 6 dagen afwezig geweest"],
          ])
        },

        {
          key: '7', role: 'option',
          content: new Map([
            ["nl", "Ik ben 7 dagen afwezig geweest"],
          ])
        },

        {
          key: '8', role: 'option',
          content: new Map([
            ["nl", "Ik ben 8 dagen afwezig geweest"],
          ])
        },

        {
          key: '9', role: 'option',
          content: new Map([
            ["nl", "Ik ben 9 dagen afwezig geweest"],
          ])
        },

        {
          key: '10', role: 'option',
          content: new Map([
            ["nl", "Ik ben 10 dagen afwezig geweest"],
          ])
        },

        {
          key: '11', role: 'option',
          content: new Map([
            ["nl", "Ik ben 11 dagen afwezig geweest"],
          ])
        },

        {
          key: '12', role: 'option',
          content: new Map([
            ["nl", "Ik ben 12 dagen afwezig geweest"],
          ])
        },

        {
          key: '13', role: 'option',
          content: new Map([
            ["nl", "Ik ben 13 dagen afwezig geweest"],
          ])
        },

        {
          key: '14', role: 'option',
          content: new Map([
            ["nl", "Ik ben 14 dagen afwezig geweest"],
          ])
        },

        {
          key: '15', role: 'option',
          content: new Map([
            ["nl", "Ik ben 15 dagen afwezig geweest"],
          ])
        },

        {
          key: '16', role: 'option',
          content: new Map([
            ["nl", "Ik ben 16 dagen afwezig geweest"],
          ])
        },

        {
          key: '17', role: 'option',
          content: new Map([
            ["nl", "Ik ben 17 dagen afwezig geweest"],
          ])
        },

        {
          key: '18', role: 'option',
          content: new Map([
            ["nl", "Ik ben 18 dagen afwezig geweest"],
          ])
        },

        {
          key: '19', role: 'option',
          content: new Map([
            ["nl", "Ik ben 19 dagen afwezig geweest"],
          ])
        },

        {
          key: '20', role: 'option',
          content: new Map([
            ["nl", "Ik ben 20 dagen afwezig geweest"],
          ])
        },

        {
          key: '21', role: 'option',
          content: new Map([
            ["nl", "Ik ben 21 dagen afwezig geweest"],
          ])
        },

        {
          key: '22', role: 'option',
          content: new Map([
            ["nl", "Ik ben 22 dagen afwezig geweest"],
          ])
        },

        {
          key: '23', role: 'option',
          content: new Map([
            ["nl", "Ik ben 23 dagen afwezig geweest"],
          ])
        },

        {
          key: '24', role: 'option',
          content: new Map([
            ["nl", "Ik ben 24 dagen afwezig geweest"],
          ])
        },

        {
          key: '25', role: 'option',
          content: new Map([
            ["nl", "Ik ben 25 dagen afwezig geweest"],
          ])
        },

        {
          key: '26', role: 'option',
          content: new Map([
            ["nl", "Ik ben 26 dagen afwezig geweest"],
          ])
        },

        {
          key: '27', role: 'option',
          content: new Map([
            ["nl", "Ik ben 27 dagen afwezig geweest"],
          ])
        },

        {
          key: '28', role: 'option',
          content: new Map([
            ["nl", "Ik ben 28 dagen afwezig geweest"],
          ])
        },

        {
          key: '29', role: 'option',
          content: new Map([
            ["nl", "Ik ben 29 dagen afwezig geweest"],
          ])
        },

        {
          key: '30', role: 'option',
          content: new Map([
            ["nl", "Ik ben 30 dagen afwezig geweest"],
          ])
        },

        {
          key: '31', role: 'option',
          content: new Map([
            ["nl", "Ik ben 31 dagen afwezig geweest"],
          ])
        },

        {
          key: '32', role: 'option',
          content: new Map([
            ["nl", "Ik ben 32 dagen afwezig geweest"],
          ])
        },

        {
          key: '33', role: 'option',
          content: new Map([
            ["nl", "Ik ben 33 dagen afwezig geweest"],
          ])
        },

        {
          key: '34', role: 'option',
          content: new Map([
            ["nl", "Ik ben 34 dagen afwezig geweest"],
          ])
        },
        {
          key: '35', role: 'option',
          content: new Map([
            ["nl", "Ik ben 35 dagen afwezig geweest"],
          ])
        },

        {
          key: '36', role: 'option',
          content: new Map([
            ["nl", "Ik ben 36 dagen afwezig geweest"],
          ])
        },

        {
          key: '37', role: 'option',
          content: new Map([
            ["nl", "Ik ben 37 dagen afwezig geweest"],
          ])
        },

        {
          key: '38', role: 'option',
          content: new Map([
            ["nl", "Ik ben 38 dagen afwezig geweest"],
          ])
        },

        {
          key: '39', role: 'option',
          content: new Map([
            ["nl", "Ik ben 39 dagen afwezig geweest"],
          ])
        },

        {
          key: '40', role: 'option',
          content: new Map([
            ["nl", "Ik ben 40 dagen afwezig geweest"],
          ])
        },
        {
          key: '41', role: 'option',
          content: new Map([
            ["nl", "Ik ben 41 dagen afwezig geweest"],
          ])
        },
        {
          key: '42', role: 'option',
          content: new Map([
            ["nl", "Ik ben 42 dagen afwezig geweest"],
          ])
        },
        {
          key: '43', role: 'option',
          content: new Map([
            ["nl", "Ik ben 43 dagen afwezig geweest"],
          ])
        },
        {
          key: '44', role: 'option',
          content: new Map([
            ["nl", "Ik ben 44 dagen afwezig geweest"],
          ])
        },
        {
          key: '45', role: 'option',
          content: new Map([
            ["nl", "Ik ben 45 dagen afwezig geweest"],
          ])
        },
        {
          key: '46', role: 'option',
          content: new Map([
            ["nl", "Ik ben 46 dagen afwezig geweest"],
          ])
        },
        {
          key: '47', role: 'option',
          content: new Map([
            ["nl", "Ik ben 47 dagen afwezig geweest"],
          ])
        },
        {
          key: '48', role: 'option',
          content: new Map([
            ["nl", "Ik ben 48 dagen afwezig geweest"],
          ])
        },
        {
          key: '49', role: 'option',
          content: new Map([
            ["nl", "Ik ben 49 dagen afwezig geweest"],
          ])
        },
        {
          key: '50', role: 'option',
          content: new Map([
            ["nl", "Ik ben 50 dagen afwezig geweest"],
          ])
        },
        {
          key: '51', role: 'option',
          content: new Map([
            ["nl", "Ik ben 51 dagen afwezig geweest"],
          ])
        },
        {
          key: '52', role: 'option',
          content: new Map([
            ["nl", "Ik ben 52 dagen afwezig geweest"],
          ])
        },
        {
          key: '53', role: 'option',
          content: new Map([
            ["nl", "Ik ben 53 dagen afwezig geweest"],
          ])
        },
        {
          key: '54', role: 'option',
          content: new Map([
            ["nl", "Ik ben 54 dagen afwezig geweest"],
          ])
        },
        {
          key: '55', role: 'option',
          content: new Map([
            ["nl", "Ik ben 55 dagen afwezig geweest"],
          ])
        },
        {
          key: '56', role: 'option',
          content: new Map([
            ["nl", "Ik ben 56 dagen afwezig geweest"],
          ])
        },
        {
          key: '57', role: 'option',
          content: new Map([
            ["nl", "Ik ben 57 dagen afwezig geweest"],
          ])
        },
        {
          key: '58', role: 'option',
          content: new Map([
            ["nl", "Ik ben 58 dagen afwezig geweest"],
          ])
        },
        {
          key: '59', role: 'option',
          content: new Map([
            ["nl", "Ik ben 59 dagen afwezig geweest"],
          ])
        },
        {
          key: '60', role: 'option',
          content: new Map([
            ["nl", "Ik ben 60 dagen afwezig geweest"],
          ])
        },
        {
          key: '61', role: 'option',
          content: new Map([
            ["nl", "Ik ben 61 dagen afwezig geweest"],
          ])
        },
        {
          key: '62', role: 'option',
          content: new Map([
            ["nl", "Ik ben 62 dagen afwezig geweest"],
          ])
        },
        {
          key: '63', role: 'option',
          content: new Map([
            ["nl", "Ik ben 63 dagen afwezig geweest"],
          ])
        },
        {
          key: '64', role: 'option',
          content: new Map([
            ["nl", "Ik ben 64 dagen afwezig geweest"],
          ])
        },
        {
          key: '65', role: 'option',
          content: new Map([
            ["nl", "Ik ben 65 dagen afwezig geweest"],
          ])
        },
        {
          key: '66', role: 'option',
          content: new Map([
            ["nl", "Ik ben 66 dagen afwezig geweest"],
          ])
        },
        {
          key: '67', role: 'option',
          content: new Map([
            ["nl", "Ik ben 67 dagen afwezig geweest"],
          ])
        },
        {
          key: '68', role: 'option',
          content: new Map([
            ["nl", "Ik ben 68 dagen afwezig geweest"],
          ])
        },
        {
          key: '69', role: 'option',
          content: new Map([
            ["nl", "Ik ben 69 dagen afwezig geweest"],
          ])
        },
        {
          key: '70', role: 'option',
          content: new Map([
            ["nl", "Ik ben 70 dagen afwezig geweest"],
          ])
        },
        {
          key: '71', role: 'option',
          content: new Map([
            ["nl", "Ik ben 71 dagen afwezig geweest"],
          ])
        },
        {
          key: '72', role: 'option',
          content: new Map([
            ["nl", "Ik ben 72 dagen afwezig geweest"],
          ])
        },
        {
          key: '73', role: 'option',
          content: new Map([
            ["nl", "Ik ben 73 dagen afwezig geweest"],
          ])
        },
        {
          key: '74', role: 'option',
          content: new Map([
            ["nl", "Ik ben 74 dagen afwezig geweest"],
          ])
        },
        {
          key: '75', role: 'option',
          content: new Map([
            ["nl", "Ik ben 75 dagen afwezig geweest"],
          ])
        },
        {
          key: '76', role: 'option',
          content: new Map([
            ["nl", "Ik ben 76 dagen afwezig geweest"],
          ])
        },
        {
          key: '77', role: 'option',
          content: new Map([
            ["nl", "Ik ben 77 dagen afwezig geweest"],
          ])
        },
        {
          key: '78', role: 'option',
          content: new Map([
            ["nl", "Ik ben 78 dagen afwezig geweest"],
          ])
        },
        {
          key: '79', role: 'option',
          content: new Map([
            ["nl", "Ik ben 79 dagen afwezig geweest"],
          ])
        },
        {
          key: '80', role: 'option',
          content: new Map([
            ["nl", "Ik ben 80 dagen afwezig geweest"],
          ])
        },
        {
          key: '81', role: 'option',
          content: new Map([
            ["nl", "Ik ben 81 dagen afwezig geweest"],
          ])
        },
        {
          key: '82', role: 'option',
          content: new Map([
            ["nl", "Ik ben 82 dagen afwezig geweest"],
          ])
        },
        {
          key: '83', role: 'option',
          content: new Map([
            ["nl", "Ik ben 83 dagen afwezig geweest"],
          ])
        },
        {
          key: '84', role: 'option',
          content: new Map([
            ["nl", "Ik ben 84 dagen afwezig geweest"],
          ])
        },
        {
          key: '85', role: 'option',
          content: new Map([
            ["nl", "Ik ben 85 dagen afwezig geweest"],
          ])
        },
        {
          key: '86', role: 'option',
          content: new Map([
            ["nl", "Ik ben 86 dagen afwezig geweest"],
          ])
        },
        {
          key: '87', role: 'option',
          content: new Map([
            ["nl", "Ik ben 87 dagen afwezig geweest"],
          ])
        },
        {
          key: '88', role: 'option',
          content: new Map([
            ["nl", "Ik ben 88 dagen afwezig geweest"],
          ])
        },
        {
          key: '89', role: 'option',
          content: new Map([
            ["nl", "Ik ben 89 dagen afwezig geweest"],
          ])
        },
        {
          key: '90', role: 'option',
          content: new Map([
            ["nl", "Ik ben 90 dagen afwezig geweest"],
          ])
        },
        {
          key: '91', role: 'option',
          content: new Map([
            ["nl", "Ik ben 91 dagen afwezig geweest"],
          ])
        },
        {
          key: '92', role: 'option',
          content: new Map([
            ["nl", "Ik ben 92 dagen afwezig geweest"],
          ])
        },
      ],
      topDisplayCompoments: [
        ComponentGenerators.markdown({
          content: new Map([
            ["nl", markdownContent],
          ]),
          className: 'mb-2'
        })
      ]
    })
  }
}

export class TicP_werk5 extends Item {

  optionKeys = {
    yes: 'b'
  }

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Waren er in de '],
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
        ["nl", 'dagen waarop je wel gewerkt hebt, maar tijdens het werk last had van lichamelijke of psychische problemen?'],
      ]),
    }
  ]


  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'TW5');

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
            ["nl", "Nee"],
          ])
        },
        {
          key: this.optionKeys.yes, role: 'option',
          content: new Map([
            ["nl", "Ja"],
          ])
        },
      ]
    })
  }
}

export class TicP_werk6 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Op hoeveel werkdagen had je tijdens het werk last van je lichamelijke of psychische problemen? Tel alleen de werkdagen in '],
      ]),
    },
    {
      content: new Map([
        ["nl", "de afgelopen 3 maanden "],
      ]),
      className: "text-primary"
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'TW6');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.dropDown({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      responseOptions: [
        {
          key: '1', role: 'option',
          content: new Map([
            ["nl", "1 werkdag"],
          ])
        },
        {
          key: '2', role: 'option',
          content: new Map([
            ["nl", "2 werkdagen"],
          ])
        },
        {
          key: '3', role: 'option',
          content: new Map([
            ["nl", "3 werkdagen"],
          ])
        },
        {
          key: '4', role: 'option',
          content: new Map([
            ["nl", "4 werkdagen"],
          ])
        },
        {
          key: '5', role: 'option',
          content: new Map([
            ["nl", "5 werkdagen"],
          ])
        },
        {
          key: '6', role: 'option',
          content: new Map([
            ["nl", "6 werkdagen"],
          ])
        },
        {
          key: '7', role: 'option',
          content: new Map([
            ["nl", "7 werkdagen"],
          ])
        },
        {
          key: '8', role: 'option',
          content: new Map([
            ["nl", "8 werkdagen"],
          ])
        },
        {
          key: '9', role: 'option',
          content: new Map([
            ["nl", "9 werkdagen"],
          ])
        },
        {
          key: '10', role: 'option',
          content: new Map([
            ["nl", "10 werkdagen"],
          ])
        },
        {
          key: '11', role: 'option',
          content: new Map([
            ["nl", "11 werkdagen"],
          ])
        },
        {
          key: '12', role: 'option',
          content: new Map([
            ["nl", "12 werkdagen"],
          ])
        },
        {
          key: '13', role: 'option',
          content: new Map([
            ["nl", "13 werkdagen"],
          ])
        },
        {
          key: '14', role: 'option',
          content: new Map([
            ["nl", "14 werkdagen"],
          ])
        },
        {
          key: '15', role: 'option',
          content: new Map([
            ["nl", "15 werkdagen"],
          ])
        },
        {
          key: '16', role: 'option',
          content: new Map([
            ["nl", "16 werkdagen"],
          ])
        },
        {
          key: '17', role: 'option',
          content: new Map([
            ["nl", "17 werkdagen"],
          ])
        },
        {
          key: '18', role: 'option',
          content: new Map([
            ["nl", "18 werkdagen"],
          ])
        },
        {
          key: '19', role: 'option',
          content: new Map([
            ["nl", "19 werkdagen"],
          ])
        },
        {
          key: '20', role: 'option',
          content: new Map([
            ["nl", "20 werkdagen"],
          ])
        },
        {
          key: '21', role: 'option',
          content: new Map([
            ["nl", "21 werkdagen"],
          ])
        },
        {
          key: '22', role: 'option',
          content: new Map([
            ["nl", "22 werkdagen"],
          ])
        },
        {
          key: '23', role: 'option',
          content: new Map([
            ["nl", "23 werkdagen"],
          ])
        },
        {
          key: '24', role: 'option',
          content: new Map([
            ["nl", "24 werkdagen"],
          ])
        },
        {
          key: '25', role: 'option',
          content: new Map([
            ["nl", "25 werkdagen"],
          ])
        },
        {
          key: '26', role: 'option',
          content: new Map([
            ["nl", "26 werkdagen"],
          ])
        },
        {
          key: '27', role: 'option',
          content: new Map([
            ["nl", "27 werkdagen"],
          ])
        },
        {
          key: '28', role: 'option',
          content: new Map([
            ["nl", "28 werkdagen"],
          ])
        },
        {
          key: '29', role: 'option',
          content: new Map([
            ["nl", "29 werkdagen"],
          ])
        },
        {
          key: '30', role: 'option',
          content: new Map([
            ["nl", "30 werkdagen"],
          ])
        },
        {
          key: '31', role: 'option',
          content: new Map([
            ["nl", "31 werkdagen"],
          ])
        },
        {
          key: '32', role: 'option',
          content: new Map([
            ["nl", "32 werkdagen"],
          ])
        },
        {
          key: '33', role: 'option',
          content: new Map([
            ["nl", "33 werkdagen"],
          ])
        },
        {
          key: '34', role: 'option',
          content: new Map([
            ["nl", "34 werkdagen"],
          ])
        },
        {
          key: '35', role: 'option',
          content: new Map([
            ["nl", "35 werkdagen"],
          ])
        },
        {
          key: '36', role: 'option',
          content: new Map([
            ["nl", "36 werkdagen"],
          ])
        },
        {
          key: '37', role: 'option',
          content: new Map([
            ["nl", "37 werkdagen"],
          ])
        },
        {
          key: '38', role: 'option',
          content: new Map([
            ["nl", "38 werkdagen"],
          ])
        },
        {
          key: '39', role: 'option',
          content: new Map([
            ["nl", "39 werkdagen"],
          ])
        },
        {
          key: '40', role: 'option',
          content: new Map([
            ["nl", "40 werkdagen"],
          ])
        },
        {
          key: '41', role: 'option',
          content: new Map([
            ["nl", "41 werkdagen"],
          ])
        },
        {
          key: '42', role: 'option',
          content: new Map([
            ["nl", "42 werkdagen"],
          ])
        },
        {
          key: '43', role: 'option',
          content: new Map([
            ["nl", "43 werkdagen"],
          ])
        },
        {
          key: '44', role: 'option',
          content: new Map([
            ["nl", "44 werkdagen"],
          ])
        },
        {
          key: '45', role: 'option',
          content: new Map([
            ["nl", "45 werkdagen"],
          ])
        },
        {
          key: '46', role: 'option',
          content: new Map([
            ["nl", "46 werkdagen"],
          ])
        },
        {
          key: '47', role: 'option',
          content: new Map([
            ["nl", "47 werkdagen"],
          ])
        },
        {
          key: '48', role: 'option',
          content: new Map([
            ["nl", "48 werkdagen"],
          ])
        },
        {
          key: '49', role: 'option',
          content: new Map([
            ["nl", "49 werkdagen"],
          ])
        },
        {
          key: '50', role: 'option',
          content: new Map([
            ["nl", "50 werkdagen"],
          ])
        },
        {
          key: '51', role: 'option',
          content: new Map([
            ["nl", "51 werkdagen"],
          ])
        },
        {
          key: '52', role: 'option',
          content: new Map([
            ["nl", "52 werkdagen"],
          ])
        },
        {
          key: '53', role: 'option',
          content: new Map([
            ["nl", "53 werkdagen"],
          ])
        },
        {
          key: '54', role: 'option',
          content: new Map([
            ["nl", "54 werkdagen"],
          ])
        },
        {
          key: '55', role: 'option',
          content: new Map([
            ["nl", "55 werkdagen"],
          ])
        },
        {
          key: '56', role: 'option',
          content: new Map([
            ["nl", "56 werkdagen"],
          ])
        },
        {
          key: '57', role: 'option',
          content: new Map([
            ["nl", "57 werkdagen"],
          ])
        },
        {
          key: '58', role: 'option',
          content: new Map([
            ["nl", "58 werkdagen"],
          ])
        },
        {
          key: '59', role: 'option',
          content: new Map([
            ["nl", "59 werkdagen"],
          ])
        },
        {
          key: '60', role: 'option',
          content: new Map([
            ["nl", "60 werkdagen"],
          ])
        },
        {
          key: '61', role: 'option',
          content: new Map([
            ["nl", "61 werkdagen"],
          ])
        },
        {
          key: '62', role: 'option',
          content: new Map([
            ["nl", "62 werkdagen"],
          ])
        },
        {
          key: '63', role: 'option',
          content: new Map([
            ["nl", "63 werkdagen"],
          ])
        },
        {
          key: '64', role: 'option',
          content: new Map([
            ["nl", "64 werkdagen"],
          ])
        },
        {
          key: '65', role: 'option',
          content: new Map([
            ["nl", "65 werkdagen"],
          ])
        },
        {
          key: '66', role: 'option',
          content: new Map([
            ["nl", "66 werkdagen"],
          ])
        },
        {
          key: '67', role: 'option',
          content: new Map([
            ["nl", "67 werkdagen"],
          ])
        },
        {
          key: '68', role: 'option',
          content: new Map([
            ["nl", "68 werkdagen"],
          ])
        },
        {
          key: '69', role: 'option',
          content: new Map([
            ["nl", "69 werkdagen"],
          ])
        },
        {
          key: '70', role: 'option',
          content: new Map([
            ["nl", "70 werkdagen"],
          ])
        },
        {
          key: '71', role: 'option',
          content: new Map([
            ["nl", "71 werkdagen"],
          ])
        },
        {
          key: '72', role: 'option',
          content: new Map([
            ["nl", "72 werkdagen"],
          ])
        },
        {
          key: '73', role: 'option',
          content: new Map([
            ["nl", "73 werkdagen"],
          ])
        },
        {
          key: '74', role: 'option',
          content: new Map([
            ["nl", "74 werkdagen"],
          ])
        },
        {
          key: '75', role: 'option',
          content: new Map([
            ["nl", "75 werkdagen"],
          ])
        },
        {
          key: '76', role: 'option',
          content: new Map([
            ["nl", "76 werkdagen"],
          ])
        },
        {
          key: '77', role: 'option',
          content: new Map([
            ["nl", "77 werkdagen"],
          ])
        },
        {
          key: '78', role: 'option',
          content: new Map([
            ["nl", "78 werkdagen"],
          ])
        },
        {
          key: '79', role: 'option',
          content: new Map([
            ["nl", "79 werkdagen"],
          ])
        },
        {
          key: '80', role: 'option',
          content: new Map([
            ["nl", "80 werkdagen"],
          ])
        },
        {
          key: '81', role: 'option',
          content: new Map([
            ["nl", "81 werkdagen"],
          ])
        },
        {
          key: '82', role: 'option',
          content: new Map([
            ["nl", "82 werkdagen"],
          ])
        },
        {
          key: '83', role: 'option',
          content: new Map([
            ["nl", "83 werkdagen"],
          ])
        },
        {
          key: '84', role: 'option',
          content: new Map([
            ["nl", "84 werkdagen"],
          ])
        },
        {
          key: '85', role: 'option',
          content: new Map([
            ["nl", "85 werkdagen"],
          ])
        },
        {
          key: '86', role: 'option',
          content: new Map([
            ["nl", "86 werkdagen"],
          ])
        },
        {
          key: '87', role: 'option',
          content: new Map([
            ["nl", "87 werkdagen"],
          ])
        },
        {
          key: '88', role: 'option',
          content: new Map([
            ["nl", "88 werkdagen"],
          ])
        },
        {
          key: '89', role: 'option',
          content: new Map([
            ["nl", "89 werkdagen"],
          ])
        },
        {
          key: '90', role: 'option',
          content: new Map([
            ["nl", "90 werkdagen"],
          ])
        },
        {
          key: '91', role: 'option',
          content: new Map([
            ["nl", "91 werkdagen"],
          ])
        },
        {
          key: '92', role: 'option',
          content: new Map([
            ["nl", "92 werkdagen"],
          ])
        },
      ],
    })
  }
}



