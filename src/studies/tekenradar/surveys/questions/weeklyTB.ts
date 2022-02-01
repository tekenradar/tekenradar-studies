import { Expression, SurveySingleItem } from 'survey-engine/data_types';
import { Item } from 'case-editor-tools/surveys/types';
import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';
import { SingleChoiceOptionTypes as SCOptions, ClozeItemTypes } from 'case-editor-tools/surveys';


export class IntroWeeklyTB extends Item {

  markdownContent = `
# Wekelijkse tekenbeetmeldingen

##### Met de volgende vragen willen we meten of het aantal tekenbeten per week verandert. Daarom is het belangrijk de vragenlijst te blijven invullen, ook als je langere tijd géén tekenbeten hebt.

##### Geef het daadwerkelijke aantal tekenbeten op, ook als je meerdere tekenbeten op hetzelfde moment had.
`

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'IntroWeeklyTB');

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


export class NumberTickBitesWeekly extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'NTBWeekly');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.dropDown({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: //SurveyEngine.timestampWithOffset({ seconds: 0 }),
      new Map([
        ['nl', 'Hoeveel tekenbeten heb je gehad in de afgelopen week?'],
      ]),
      responseOptions: [
        { key: '1', role: 'option', content: new Map([["nl", "1"],]) },
        { key: '2', role: 'option', content: new Map([["nl", "2"],]) },
        { key: '3', role: 'option', content: new Map([["nl", "3"],]) },
        { key: '4', role: 'option', content: new Map([["nl", "4"],]) },
        { key: '5', role: 'option', content: new Map([["nl", "5"],]) },
        { key: '6', role: 'option', content: new Map([["nl", "6"],]) },
        { key: '7', role: 'option', content: new Map([["nl", "7"],]) },
        { key: '8', role: 'option', content: new Map([["nl", "8"],]) },
        { key: '9', role: 'option', content: new Map([["nl", "9"],]) },
        { key: '10', role: 'option', content: new Map([["nl", "10"],]) },
        { key: '11', role: 'option', content: new Map([["nl", "11"],]) },
        { key: '12', role: 'option', content: new Map([["nl", "12"],]) },
        { key: '13', role: 'option', content: new Map([["nl", "13"],]) },
        { key: '14', role: 'option', content: new Map([["nl", "14"],]) },
        { key: '15', role: 'option', content: new Map([["nl", "15"],]) },
        { key: '16', role: 'option', content: new Map([["nl", "16"],]) },
        { key: '17', role: 'option', content: new Map([["nl", "17"],]) },
        { key: '18', role: 'option', content: new Map([["nl", "18"],]) },
        { key: '19', role: 'option', content: new Map([["nl", "19"],]) },
        { key: '20', role: 'option', content: new Map([["nl", "20"],]) },
        { key: '21', role: 'option', content: new Map([["nl", "21"],]) },
        { key: '22', role: 'option', content: new Map([["nl", "22"],]) },
        { key: '23', role: 'option', content: new Map([["nl", "23"],]) },
        { key: '24', role: 'option', content: new Map([["nl", "24"],]) },
        { key: '25', role: 'option', content: new Map([["nl", "25"],]) },
        { key: '26', role: 'option', content: new Map([["nl", "26"],]) },
        { key: '27', role: 'option', content: new Map([["nl", "27"],]) },
        { key: '28', role: 'option', content: new Map([["nl", "28"],]) },
        { key: '29', role: 'option', content: new Map([["nl", "29"],]) },
        { key: '30', role: 'option', content: new Map([["nl", "30"],]) },
        { key: '31', role: 'option', content: new Map([["nl", "31"],]) },
        { key: '32', role: 'option', content: new Map([["nl", "32"],]) },
        { key: '33', role: 'option', content: new Map([["nl", "33"],]) },
        { key: '34', role: 'option', content: new Map([["nl", "34"],]) },
        { key: '35', role: 'option', content: new Map([["nl", "35"],]) },
        { key: '36', role: 'option', content: new Map([["nl", "36"],]) },
        { key: '37', role: 'option', content: new Map([["nl", "37"],]) },
        { key: '38', role: 'option', content: new Map([["nl", "38"],]) },
        { key: '39', role: 'option', content: new Map([["nl", "39"],]) },
        { key: '40', role: 'option', content: new Map([["nl", "40"],]) },
        { key: '41', role: 'option', content: new Map([["nl", "41"],]) },
        { key: '42', role: 'option', content: new Map([["nl", "42"],]) },
        { key: '43', role: 'option', content: new Map([["nl", "43"],]) },
        { key: '44', role: 'option', content: new Map([["nl", "44"],]) },
        { key: '45', role: 'option', content: new Map([["nl", "45"],]) },
        { key: '46', role: 'option', content: new Map([["nl", "46"],]) },
        { key: '47', role: 'option', content: new Map([["nl", "47"],]) },
        { key: '48', role: 'option', content: new Map([["nl", "48"],]) },
        { key: '49', role: 'option', content: new Map([["nl", "49"],]) },
        { key: '50', role: 'option', content: new Map([["nl", "50"],]) },
        { key: '51', role: 'option', content: new Map([["nl", "51"],]) },
        { key: '52', role: 'option', content: new Map([["nl", "52"],]) },
        { key: '53', role: 'option', content: new Map([["nl", "53"],]) },
        { key: '54', role: 'option', content: new Map([["nl", "54"],]) },
        { key: '55', role: 'option', content: new Map([["nl", "55"],]) },
        { key: '56', role: 'option', content: new Map([["nl", "56"],]) },
        { key: '57', role: 'option', content: new Map([["nl", "57"],]) },
        { key: '58', role: 'option', content: new Map([["nl", "58"],]) },
        { key: '59', role: 'option', content: new Map([["nl", "59"],]) },
        { key: '60', role: 'option', content: new Map([["nl", "60"],]) },
        { key: '61', role: 'option', content: new Map([["nl", "61"],]) },
        { key: '62', role: 'option', content: new Map([["nl", "62"],]) },
        { key: '63', role: 'option', content: new Map([["nl", "63"],]) },
        { key: '64', role: 'option', content: new Map([["nl", "64"],]) },
        { key: '65', role: 'option', content: new Map([["nl", "65"],]) },
        { key: '66', role: 'option', content: new Map([["nl", "66"],]) },
        { key: '67', role: 'option', content: new Map([["nl", "67"],]) },
        { key: '68', role: 'option', content: new Map([["nl", "68"],]) },
        { key: '69', role: 'option', content: new Map([["nl", "69"],]) },
        { key: '70', role: 'option', content: new Map([["nl", "70"],]) },
        { key: '71', role: 'option', content: new Map([["nl", "71"],]) },
        { key: '72', role: 'option', content: new Map([["nl", "72"],]) },
        { key: '73', role: 'option', content: new Map([["nl", "73"],]) },
        { key: '74', role: 'option', content: new Map([["nl", "74"],]) },
        { key: '75', role: 'option', content: new Map([["nl", "75"],]) },
        { key: '76', role: 'option', content: new Map([["nl", "76"],]) },
        { key: '77', role: 'option', content: new Map([["nl", "77"],]) },
        { key: '78', role: 'option', content: new Map([["nl", "78"],]) },
        { key: '79', role: 'option', content: new Map([["nl", "79"],]) },
        { key: '80', role: 'option', content: new Map([["nl", "80"],]) },
        { key: '81', role: 'option', content: new Map([["nl", "81"],]) },
        { key: '82', role: 'option', content: new Map([["nl", "82"],]) },
        { key: '83', role: 'option', content: new Map([["nl", "83"],]) },
        { key: '84', role: 'option', content: new Map([["nl", "84"],]) },
        { key: '85', role: 'option', content: new Map([["nl", "85"],]) },
        { key: '86', role: 'option', content: new Map([["nl", "86"],]) },
        { key: '87', role: 'option', content: new Map([["nl", "87"],]) },
        { key: '88', role: 'option', content: new Map([["nl", "88"],]) },
        { key: '89', role: 'option', content: new Map([["nl", "89"],]) },
        { key: '90', role: 'option', content: new Map([["nl", "90"],]) },
        { key: '91', role: 'option', content: new Map([["nl", "91"],]) },
        { key: '92', role: 'option', content: new Map([["nl", "92"],]) },
        { key: '93', role: 'option', content: new Map([["nl", "93"],]) },
        { key: '94', role: 'option', content: new Map([["nl", "94"],]) },
        { key: '95', role: 'option', content: new Map([["nl", "95"],]) },
        { key: '96', role: 'option', content: new Map([["nl", "96"],]) },
        { key: '97', role: 'option', content: new Map([["nl", "97"],]) },
        { key: '98', role: 'option', content: new Map([["nl", "98"],]) },
        { key: '99', role: 'option', content: new Map([["nl", "99"],]) },
        { key: '100', role: 'option', content: new Map([["nl", "100"],]) },
      ],
    })
  }
}
