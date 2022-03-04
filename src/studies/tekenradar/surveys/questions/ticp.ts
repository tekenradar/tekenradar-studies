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
Bent u een ouder/verzorger dan kunt u de antwoorden invullen voor/over uw kind.

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
