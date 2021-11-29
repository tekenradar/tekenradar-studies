import { Expression } from 'survey-engine/lib/data_types';
import { Group, Item } from 'case-editor-tools/surveys/types';
import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';
import { Age } from './demographie';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';


export class PDiffGroup extends Group {

  //TODO: insert intro text
  T1: IntroPDiff;
  Q1: DetectTickBite;
  Q2: FeverTickBite;
  //TODO: text here
  Q3: EMTickBite;
  Q4: LymeTickBite1;
  Q5: LymeTickBite2;
  Q6: MedicationLyme;
  Q7: Age;


  constructor(parentKey: string, isRequired?: boolean) {
    super(parentKey, 'PDiffG');

    const required = isRequired !== undefined ? isRequired : false;

    this.T1 = new IntroPDiff(this.key, required);
    this.Q1 = new DetectTickBite(this.key, required);
    const q1Condition = SurveyEngine.singleChoice.any(this.Q1.key, this.Q1.optionKeys.nameOfOption);

    this.Q2 = new FeverTickBite(this.key, required, q1Condition);
    this.Q3 = new EMTickBite(this.key, required);
    this.Q4 = new LymeTickBite1(this.key, required);
    const q4Condition = SurveyEngine.singleChoice.any(this.Q4.key, this.Q4.optionKeys.nameOfOption);

    this.Q5 = new LymeTickBite2(this.key, required, q4Condition);
    this.Q6 = new MedicationLyme(this.key, required, q4Condition);
    this.Q7 = new Age(this.key, required);

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
    this.addPageBreak();

  }

}


class IntroPDiff extends Item{

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
        ComponentGenerators.text({
          content: new Map([
          ["nl", "Vul onderstaande vragen in over je tekenbeet, rode ring of vlek, andere vorm van de ziekte van Lyme, of koorts na een tekenbeet (of vul de vragen in voor/over je kind)."],
          ]),
        })
      ]
    })
  }
}

class DetectTickBite extends Item {

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


class FeverTickBite extends Item {

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


class EMTickBite extends Item {

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



class LymeTickBite1 extends Item {

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


class LymeTickBite2 extends Item {

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


class MedicationLyme extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'MedLyme');

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
        ['nl', 'Ben je voor deze ziekte van Lyme behandeld met antibiotica?'],
      ]),
      responseOptions: [
        {
          //TODO: don't make filling in date mandatory to avoid getting stuck due to forgotten date
          //TODO: date input mode and text after input
          key: 'a', role: 'dateInput',
          content: new Map([
            ["nl", "Ja, ik ben gestart op"],
          ])
        },
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

