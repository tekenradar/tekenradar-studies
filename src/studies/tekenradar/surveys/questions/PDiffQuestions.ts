import { Expression } from 'survey-engine/data_types';
import { Group, Item } from 'case-editor-tools/surveys/types';
import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';
import { Age } from './demographie';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';
import { SingleChoiceOptionTypes as SCOptions, ClozeItemTypes } from 'case-editor-tools/surveys';


export class IntroPDiff extends Item {

  markdownContent = `
  # Melding doen

  ##### Vul onderstaande vragen in over je tekenbeet, rode ring of vlek, andere vorm van de ziekte van Lyme, of koorts na een tekenbeet (of vul de vragen in voor/over je kind).

  ###### Wat wil je precies melden? Wat is op jou van toepassing?
  `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'IntroPDiff');

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


export class DetectTickBite extends Item {

  optionKeys = {
    nameOfOption: 'a'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'DetTB');

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
        ['nl', 'Heb je een tekenbeet opgemerkt?'],
      ]),
      responseOptions: [
        {
          key: this.optionKeys.nameOfOption, role: 'option',
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


export class FeverTickBite extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'FevTB');

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
        ['nl', 'Heb je binnen vier weken na de tekenbeet gemeten koorts boven 38,0 graden gehad?'],
      ]),
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
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "Nee, nog niet"],
          ])
        },
      ]
    })
  }
}


export class EMTextPDiff extends Item {

  markdownContent = `

  ###### Een "erythema migrans" is een **uitbreidende rode ring of vlek** rond de plek van een tekenbeet. Het is vaak het eerste signaal van de ziekte van Lyme.

  `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'EMTPDiff');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.display({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      /*content: [
        ComponentGenerators.text({
          content: new Map([
          ["nl", "Text here"],
          ]),
        })
      ]*/
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


export class EMTickBite extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'EMTB');

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
        ['nl', 'Heb je een rode ring of vlek veroorzaakt door een tekenbeet (erythema migrans)?'],
      ]),
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



export class LymeTickBite1 extends Item {

  optionKeys = {
    nameOfOption: 'a'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'LTB1');

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
        ['nl', 'Heb je een andere vorm van de ziekte van Lyme?'],
      ]),
      responseOptions: [
        {
          key: this.optionKeys.nameOfOption, role: 'option',
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


export class LymeTickBite2 extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'LTB2');

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
        ['nl', 'Welke andere vorm van de ziekte van Lyme heb je? Kruis alle antwoorden aan die op jou van toepassing zijn.'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Koorts"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Een positieve bloedtest voor de ziekte van Lyme"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "Een andere vorm van de ziekte van Lyme"],
          ])
        },
      ]
    })
  }
}


export class MedicationLyme extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'MedLyme');

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
        ['nl', 'Ben je voor deze ziekte van Lyme behandeld met antibiotica?'],
      ]),
      responseOptions: [
        SCOptions.cloze({
          key: 'a', items: [
            ClozeItemTypes.text({
              key: '1', content: new Map(
                [['nl', "Ja, ik ben gestart op"]]
              )
            }),//NOTE: filling in date is NOT mandatory to avoid getting stuck due to forgotten date
            ClozeItemTypes.dateInput({
              dateInputMode: 'YMD',
              key: '2',
              maxRelativeDate: {
                reference: SurveyEngine.timestampWithOffset({ seconds: 0 }),
                delta: { seconds: 0 }
              }
            }),//TODO: if this text is too long as it is the case here the whole text is written in the next line
            //instead of breaking text at the right position.
            ClozeItemTypes.text({
              key: '3', content: new Map(
                [['nl', "(vul hier de startdatum van je antibiotica behandeling in, of een schatting daarvan)"]]
              )
            }),
          ]
        }),
        //optionProps: {
        //  max: { dtype: 'exp', exp: SurveyEngine.timestampWithOffset({seconds: 0}) }
        //}
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Nee, maar ik start binnenkort met de behandeling"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "Nee"],
          ])
        },
      ]
    })
  }
}

