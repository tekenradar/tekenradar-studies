import { Expression } from 'survey-engine/data_types';
import { Group, Item } from 'case-editor-tools/surveys/types';
import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';
import { SingleChoiceOptionTypes as SCOptions, ClozeItemTypes } from 'case-editor-tools/surveys';


export class FormerLymeGroup extends Group {
  FLD: FormerLymeDiagnosis;
  Q2: FormerLymeTherapyQ2;
  Q3: FormerLymeTherapyQ3;

  constructor(parentKey: string, isRequired?: boolean, condition?: Expression) {
    super(parentKey, 'FLG');

    this.groupEditor.setCondition(condition);
    const required = isRequired !== undefined ? isRequired : false;

    this.FLD = new FormerLymeDiagnosis(this.key, required);
    const q1Condition = SurveyEngine.singleChoice.any(this.FLD.key, this.FLD.optionKeys.yes);
    this.Q2 = new FormerLymeTherapyQ2(this.key, required, q1Condition);
    this.Q3 = new FormerLymeTherapyQ3(this.key, required, q1Condition);
  }

  buildGroup() {
    this.addItem(this.FLD.get());
    this.addItem(this.Q2.get());
    this.addItem(this.Q3.get());
  }
}

class FormerLymeDiagnosis extends Item {
  optionKeys = {
    yes: 'a',
    no: 'b'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'FLD');

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
        ['nl', 'Is er bij jou ooit eerder een erythema migrans of een andere vorm van de ziekte van Lyme vastgesteld?'],
      ]),
      responseOptions: [
        {
          key: this.optionKeys.yes, role: 'option',
          content: new Map([
            ["nl", "Ja"],
          ])
        },
        {
          key: this.optionKeys.no, role: 'option',
          content: new Map([
            ["nl", "Nee"],
          ])
        },
      ]
    })
  }
}



class FormerLymeTherapyQ2 extends Item {
  optionKeys = {
    yes: 'b'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q2');

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
        ['nl', 'Heb je een antibioticakuur gekregen voor deze eerdere erythema migrans of andere vorm van de ziekte van Lyme?'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Nee"],
          ])
        },
        SCOptions.cloze({
          key: this.optionKeys.yes, items: [
            ClozeItemTypes.text({
              key: '1', content: new Map(
                [['nl', "Ja, aantal antibioticakuren:"]]
              )
            }),
            ClozeItemTypes.numberInput({
              key: '2',
              inputLabel: new Map([['nl', '']]), //emptied by kvdw
              labelBehindInput: true,
              inputMaxWidth: '70px',
              componentProperties: {
                min: 0
              }
            }),
          ]
        }),
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "Onbekend"],
          ])
        },
      ],
      customValidations: [
        {
          key: 'Q2', rule: SurveyEngine.logic.or(
            SurveyEngine.singleChoice.none(this.key, this.optionKeys.yes),
            SurveyEngine.compare.gt(SurveyEngine.getResponseValueAsNum(this.key, `rg.scg.${this.optionKeys.yes}.2`),0),
          ), type: 'hard'
        }
      ]
    })
  }
}


class FormerLymeTherapyQ3 extends Item {
  optionKeys = {
    yes: 'a'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q3');

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
        ['nl', 'Ben je toen hersteld van de eerdere erythema migrans of andere vorm van de ziekte van Lyme?'],
      ]),
      responseOptions: [
        {
          key: this.optionKeys.yes, role: 'option',
          content: new Map([
            ["nl", "Ja"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Nee, ik ben tot op heden klachten blijven houden"],
          ])
        },
      ]
    })
  }
}
