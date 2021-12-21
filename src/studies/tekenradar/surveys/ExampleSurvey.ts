import { Item, SurveyDefinition } from 'case-editor-tools/surveys/types';
import { SingleChoiceOptionTypes, SurveyEngine, SurveyItems , ClozeItemTypes, MultipleChoiceOptionTypes} from 'case-editor-tools/surveys';

class SingleChoiceExample extends Item {
  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'SCG1');

    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Simple single choice question'],
      ]),
      responseOptions: [
        SingleChoiceOptionTypes.option('1',
          new Map([
            ['nl', 'Ja'],
          ]),
        ),
        SingleChoiceOptionTypes.option('0',
          new Map([
            ['nl', 'Nee'],
          ]),
        )
      ]
    })
  }
}


class SingleChoiceOptionExample extends Item {
  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'SCGO1');

    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Single choice question with different input options'],
      ]),
      responseOptions: [
        SingleChoiceOptionTypes.option('o',
          new Map([
            ['nl', 'Simple Option without special input'],
          ]),
        ),
        SingleChoiceOptionTypes.textInput({
          key: 'text',
          inputLabel: new Map([['nl', 'Option with text input:']]),
        }),
        SingleChoiceOptionTypes.numberInput({
          key: 'number',
          inputLabel: new Map([['nl', 'Option with number input:']]),
        }),
       //TODO: Peter: date input as option only with ClozeItemTypes?
      ]
    })
  }
}


class SingleChoiceClozeOptionExample extends Item {
  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'SCGCloze1');

    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Single choice question with different cloze input options'],
      ]),
      responseOptions: [
        SingleChoiceOptionTypes.option('O',
          new Map([
            ['nl', 'Simple Option without special input'],
          ]),
        ),
        SingleChoiceOptionTypes.cloze({
          key: 'cloze1', items: [
            ClozeItemTypes.text({
              key: 'text1', content: new Map(
                [['nl', "cloze option with multiple text input, 1st input:"]]
              )
            }),
            ClozeItemTypes.textInput({
              key: 'textinput1',
            }),
            ClozeItemTypes.clozeLineBreak(),
            ClozeItemTypes.text({
              key: 'text2', content: new Map(
                [['nl', "2nd input"]]
              )
            }),
            ClozeItemTypes.textInput({
              key: 'textinput2',
              inputMaxWidth: '120px'

            }),
          ]
        }),
        SingleChoiceOptionTypes.cloze({
          key: 'cloze2', items: [
            ClozeItemTypes.text({
              key: 'text1', content: new Map(
                [['nl', "cloze option with number input and dropdown:"]]
              )
            }),
            ClozeItemTypes.numberInput({
              key: 'number',
              inputLabel: new Map([['nl', 'number']]),
              labelBehindInput: true,
            }),

            ClozeItemTypes.text({
              key: 'text2', content: new Map(
                [['nl', "and dropdown:"]]
              )
            }),
            ClozeItemTypes.dropDown({
              key: 'dropdown', options: [
                SingleChoiceOptionTypes.option('1', new Map([['nl', "Dropdown option1"]])),
                SingleChoiceOptionTypes.option('2', new Map([['nl', "Dropdown option2"]]))
              ]
            }),
          ]
        }),
        SingleChoiceOptionTypes.cloze({
          key: 'cloze3', items: [
            ClozeItemTypes.text({
              key: 'text1', content: new Map(
                [['nl', "cloze option with 2 date inputs, 1st date:"]]
              )
            }),
            ClozeItemTypes.dateInput({
              dateInputMode: 'YMD',
              key: 'date1',
            }),
            ClozeItemTypes.clozeLineBreak(),
            ClozeItemTypes.text({
              key: 'text2', content: new Map(
                [['nl', "2nd date"]]
              )
            }),
            ClozeItemTypes.dateInput({
              dateInputMode: 'YMD',
              key: 'date2',
            }),
          ]
        }),
      ]
    })
  }
}


export class MultipleChoiceExample extends Item {

  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'MCG1');

    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.multipleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Simple Multiple Choice Question'],
      ]),
      responseOptions: [
        {
          key: '0', role: 'option',
          content: new Map([
            ["nl", "Yes"],
          ])
        },
        {
          key: '1', role: 'option',
          content: new Map([
            ["nl", "No"],
          ])
        },
        {
          key: '2', role: 'option',
          content: new Map([
            ["nl", "Maybe"],
          ])
        },
      ]
    })
  }
}

class MultipleChoiceOptionExample extends Item {
  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'MCGO1');

    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Multiple choice question with different input options'],
      ]),
      responseOptions: [
        MultipleChoiceOptionTypes.option('o',
          new Map([
            ['nl', 'Simple Option without special input'],
          ]),
        ),
        MultipleChoiceOptionTypes.textInput({
          key: 'text',
          inputLabel: new Map([['nl', 'Option with text input:']]),
        }),
        MultipleChoiceOptionTypes.numberInput({
          key: 'number',
          inputLabel: new Map([['nl', 'Option with number input:']]),
        }),
       //TODO: Peter: date input as option only with ClozeItemTypes?
      ]
    })
  }
}


class MultipleChoiceClozeOptionExample extends Item {
  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'MCGCloze1');

    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.multipleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Multiple choice question with different cloze input options'],
      ]),
      responseOptions: [
        MultipleChoiceOptionTypes.option('O',
          new Map([
            ['nl', 'Simple Option without special input'],
          ]),
        ),
        MultipleChoiceOptionTypes.cloze({
          key: 'cloze1', items: [
            ClozeItemTypes.text({
              key: 'text1', content: new Map(
                [['nl', "cloze option with multiple text input, 1st input:"]]
              )
            }),
            ClozeItemTypes.textInput({
              key: 'textinput1',
            }),
            ClozeItemTypes.clozeLineBreak(),
            ClozeItemTypes.text({
              key: 'text2', content: new Map(
                [['nl', "2nd input"]]
              )
            }),
            ClozeItemTypes.textInput({
              key: 'textinput2',
              inputMaxWidth: '120px'

            }),
          ]
        }),
        MultipleChoiceOptionTypes.cloze({
          key: 'cloze2', items: [
            ClozeItemTypes.text({
              key: 'text1', content: new Map(
                [['nl', "cloze option with number input and dropdown:"]]
              )
            }),
            ClozeItemTypes.numberInput({
              key: 'number',
              inputLabel: new Map([['nl', 'number']]),
              labelBehindInput: true,
            }),

            ClozeItemTypes.text({
              key: 'text2', content: new Map(
                [['nl', "and dropdown:"]]
              )
            }),
            ClozeItemTypes.dropDown({
              key: 'dropdown', options: [
                SingleChoiceOptionTypes.option('1', new Map([['nl', "Dropdown option1"]])),
                SingleChoiceOptionTypes.option('2', new Map([['nl', "Dropdown option2"]]))
              ]
            }),
          ]
        }),
        MultipleChoiceOptionTypes.cloze({
          key: 'cloze3', items: [
            ClozeItemTypes.text({
              key: 'text1', content: new Map(
                [['nl', "cloze option with 2 date inputs, 1st date:"]]
              )
            }),
            ClozeItemTypes.dateInput({
              dateInputMode: 'YMD',
              key: 'date1',
            }),
            ClozeItemTypes.clozeLineBreak(),
            ClozeItemTypes.text({
              key: 'text2', content: new Map(
                [['nl', "2nd date"]]
              )
            }),
            ClozeItemTypes.dateInput({
              dateInputMode: 'YMD',
              key: 'date2',
            }),
          ]
        }),
      ]
    })
  }
}


class TextInputExample extends Item {

  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'TextInput');

    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.textInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Question with simple text input:'],
      ]),
    })
  }
}


class MultilineTextInputExample extends Item {

  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'MTextInput');

    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.multilineTextInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Question with multiline text input:'],
      ]),
    })
  }
}

class DateInputExample extends Item {

  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'DateInput');

    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.dateInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Question with date input:'],
      ]),
      dateInputMode: 'YMD'
    })
  }
}


export class NumberInputExample extends Item {

  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'NInput');

    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.numericInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Question with number input:'],
      ]),
      inputMaxWidth: '80px',
      inputLabel: new Map([
        ['nl', 'days']
      ]),
      labelBehindInput: true,
      componentProperties: {
        min: 0,
        max: 120
      }
    })
  }
}




class ExampleSurveyDef extends SurveyDefinition {
  Q1: Item;
  Q2: Item;
  Q3: Item;
  Q4: Item;
  Q5: Item;
  Q6: Item;
  Q7: Item;
  Q8: Item;
  Q9: Item;
  Q10: Item;

  constructor(isRequired?: boolean) {
    super({
      surveyKey: 'EXAMPLE',
      name: new Map([
        ['nl', 'Example survey']
      ]),
      description: new Map([
        ['nl', 'This survey contains different question types, to showcase how these can be used.']
      ]),
      durationText: new Map([
        ['nl', '3 min.']
      ]),
      availableFor: 'public',
    });

    const required = isRequired !== undefined ? isRequired : false;

    this.Q1 = new SingleChoiceExample(this.key, required);
    this.Q2 = new SingleChoiceOptionExample(this.key, required);
    this.Q3 = new SingleChoiceClozeOptionExample(this.key, required);
    this.Q4 = new MultipleChoiceExample(this.key, required);
    this.Q5 = new MultipleChoiceOptionExample(this.key, required);
    this.Q6 = new MultipleChoiceClozeOptionExample(this.key, required);
    this.Q7 = new TextInputExample(this.key, required);
    this.Q8 = new MultilineTextInputExample(this.key, required);
    this.Q9 = new DateInputExample(this.key, required);
    this.Q10 = new NumberInputExample(this.key, required);

  }


  buildSurvey() {
    this.addItem(this.Q1.get());
    this.addItem(this.Q2.get());
    this.addItem(this.Q3.get());
    this.addItem(this.Q4.get());
    this.addItem(this.Q5.get());
    this.addItem(this.Q6.get());
    this.addItem(this.Q7.get());
    this.addItem(this.Q8.get());
    this.addItem(this.Q9.get());
    this.addItem(this.Q10.get());

  }

}


export const ExampleSurvey = new ExampleSurveyDef(false);


