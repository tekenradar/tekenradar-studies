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
*Met zorgverleners bedoelen wij je huisarts, specialist, fysiotherapeut, psycholoog, maatschappelijkwerker, homeopaat, logopedist of andere arts, therapeut of zorgconsulent.*
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
            max: 5,
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
    Array.from({ length: 5 }).forEach((_, index) => {
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
        ["nl", ". Je kunt dus meer dan 1 hokje aankruisen."],
      ]),
    },
  ]


  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'TicP_Comorbidity');

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
          ]),
          displayCondition: (!(this.isPartOf(SurveySuffix.Adults))) ? SurveyEngine.compare.gt(1, 2) : undefined,
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
          content: new Map([
            ["nl", "Rugaandoening van hardnekkige aard, langer dan 3 maanden, of hernia"],
          ])
        },
        {
          key: 'q', role: 'option',
          content: new Map([
            ["nl", "Gewrichtsslijtage (artrose) van knieën, heupen of handen"],
          ]),
          displayCondition: (!(this.isPartOf(SurveySuffix.Adults))) ? SurveyEngine.compare.gt(1, 2) : undefined,
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
          key: 'u_Adults', role: 'option',
          content: new Map([
            ["nl", "Andere ziekten van het zenuwstelsel, zoals ziekte van Parkinson"],
          ]),
          displayCondition: (!(this.isPartOf(SurveySuffix.Adults))) ? SurveyEngine.compare.gt(1, 2) : undefined,
        },
        {
          key: 'u_Kids', role: 'option',
          content: new Map([
            ["nl", "Andere ziekten van het zenuwstelsel"],
          ]),
          displayCondition: (!(this.isPartOf(SurveySuffix.Kids))) ? SurveyEngine.compare.gt(1, 2) : undefined,
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
        {//these two items n and o moved down by kees
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
            ["nl", "Letsel door ongeluk in en om huis, sport, school, werk of in het verkeer"],
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
          ]),
          displayCondition: (!(this.isPartOf(SurveySuffix.Adults))) ? SurveyEngine.compare.gt(1, 2) : undefined,
        },
        {
          key: 'af', role: 'option',
          content: new Map([
            ["nl", "Drugsverslaving"],
          ]),
          displayCondition: (!(this.isPartOf(SurveySuffix.Adults))) ? SurveyEngine.compare.gt(1, 2) : undefined,
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
          key: 't6', role: 'text',
          style: [{ key: 'className', value: 'fw-bold mb-2' }],
          content: new Map([
            ["nl", "Vink hieronder aan als geen van bovenstaande geldt"],
          ])
        },

        {
          key: 'aj', role: 'option',
          content: new Map([
            ["nl", "Geen van bovenstaande"],
          ])
        },
      ]
    })
  }
}
