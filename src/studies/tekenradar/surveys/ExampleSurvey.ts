import { Item, SurveyDefinition } from 'case-editor-tools/surveys/types';
import { SingleChoiceOptionTypes, SurveyItems, ClozeItemTypes, MultipleChoiceOptionTypes } from 'case-editor-tools/surveys';
import { generateLocStrings } from 'case-editor-tools/surveys/utils/simple-generators';

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
      },
    })
  }
}


export class LikertExample extends Item {
  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'LIKERT');
    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.old.simpleLikertGroup({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Question with single likert:'],
      ]),
      scaleOptions: [
        { key: 'o1', content: new Map([['nl', '1']]) },
        { key: 'o2', content: new Map([['nl', '2']]) },
        { key: 'o3', content: new Map([['nl', '3']]) },
        { key: 'o4', content: new Map([['nl', '4']]) },
        { key: 'o5', content: new Map([['nl', '5']]) },
      ],
      rows: [
        { key: 'row1', content: new Map([['nl', 'Row 1 label']]) },
        { key: 'row2', content: new Map([['nl', 'Row 2 label']]) },
      ]
    })
  }
}

export class ClozeExample extends Item {
  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'CLZ');
    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.clozeQuestion({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Question with cloze:'],
      ]),
      items: [
        ClozeItemTypes.text({ content: new Map([['nl', 'dateinput: ']]) }),
        ClozeItemTypes.dateInput({ key: 'date', dateInputMode: 'YMD' }),
        ClozeItemTypes.text({ content: new Map([['nl', 'dropdown: ']]) }),
        ClozeItemTypes.dropDown({
          key: 'dropdown',
          options: [
            { key: '1', role: 'option', content: new Map([['nl', 'Option 1']]) },
            { key: '2', role: 'option', content: new Map([['nl', 'Option 2']]) },
            { key: '3', role: 'option', content: new Map([['nl', 'Option 3']]) },
          ]
        }),
        ClozeItemTypes.clozeLineBreak(),
        ClozeItemTypes.text({ content: new Map([['nl', 'text: ']]) }),
        ClozeItemTypes.textInput({ key: 'text', }),
        ClozeItemTypes.text({ content: new Map([['nl', '']]) }),
        ClozeItemTypes.numberInput({ key: 'number', inputLabel: new Map([]) }),
      ]
    })
  }
}


export class DateExample extends Item {
  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'DATE');
    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.dateInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Question with date:'],
      ]),
      dateInputMode: 'YM',
    })
  }
}

export class SliderExample extends Item {
  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'SLIDER');
    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.numericSlider({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Question with numeric slider:'],
      ]),
      noResponseLabel: new Map([['nl', 'Select']]),
      sliderLabel: new Map([['nl', 'Label']]),
      max: 50,
      min: 15
    })
  }
}


export class RSCAExample extends Item {
  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'RSCA');
    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.responsiveSingleChoiceArray({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Question with responsive single choice array:'],
      ]),
      responsiveModes: {
        sm: 'table',
      },
      scaleOptions: [
        { key: 'o1', content: new Map([['nl', 'low']]) },
        { key: 'o2', content: new Map([['nl', 'medium']]) },
        { key: 'o3', content: new Map([['nl', 'high']]) },
      ],
      rows: [
        { key: 'r1', content: new Map([['nl', 'Row 1']]) },
        { key: 'r2', content: new Map([['nl', 'Row 2']]) },
        { key: 'r3', content: new Map([['nl', 'Row 3']]) },
      ],
      defaultMode: 'vertical',
    })
  }
}


export class RBLAExample extends Item {
  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'RBLA');
    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.responsiveBipolarLikertArray({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Question with responsive single choice array:'],
      ]),
      responsiveModes: {
        sm: 'table',
      },
      scaleOptions: [
        { key: 'o1', },
        { key: 'o2', },
        { key: 'o3', },
      ],
      rows: [
        { key: 'r1', startLabel: new Map([['nl', 'Row 1 start']]), endLabel: new Map([['nl', 'Row 1 end']]) },
        { key: 'r2', startLabel: new Map([['nl', 'Row 2 start']]), endLabel: new Map([['nl', 'Row 2 end']]) },
        { key: 'r3', startLabel: new Map([['nl', 'Row 3 start']]), endLabel: new Map([['nl', 'Row 3 end']]) },
      ],
      defaultMode: 'vertical',
    })
  }
}


export class SurveyEndExample extends Item {
  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'END');
    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.surveyEnd(
      this.parentKey,
      new Map([
        ['nl', 'End of the survey.'],
      ]))
  }
}


export class MapExample extends Item {
  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'MAP');
    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.customQuestion({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Question with custom map:'],
      ]),
      responseItemDefs: [
        {
          key: 'map',
          role: 'map',
        }
      ]
    })
  }
}

export class CustomExample extends Item {
  constructor(parentKey: string, isRequired: boolean) {
    super(parentKey, 'CUSTOM');
    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.customQuestion({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Question with custom question with mapping:'],
      ]),
      responseItemDefs: [
        {
          key: '1',
          role: 'customScg',
          mapToRole: 'singleChoiceGroup',
          items: [
            { key: '1', role: 'option', content: generateLocStrings(new Map([['nl', 'Option 1']])) },
            { key: '2', role: 'option', content: generateLocStrings(new Map([['nl', 'Option 2']])) },
          ]
        },
        {
          key: '2',
          role: 'customScg',
          mapToRole: 'singleChoiceGroup',
          items: [
            { key: '1', role: 'option', content: generateLocStrings(new Map([['nl', 'Option 1']])) },
            { key: '2', role: 'option', content: generateLocStrings(new Map([['nl', 'Option 2']])) },
          ]
        }
      ]
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
  QLikert: Item;
  QCloze: Item;
  QDate: Item;
  QSlider: Item;
  QRSCA: Item;
  QRBL: Item;
  QMAP: Item;
  QCustomWithMapping: Item;
  SurveyEnd: Item;


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
    this.QLikert = new LikertExample(this.key, required);
    this.QCloze = new ClozeExample(this.key, required);
    this.QDate = new DateExample(this.key, required);
    this.QSlider = new SliderExample(this.key, required);
    this.QRSCA = new RSCAExample(this.key, required);
    this.QRBL = new RBLAExample(this.key, required);
    this.QMAP = new MapExample(this.key, required);
    this.QCustomWithMapping = new CustomExample(this.key, required);
    this.SurveyEnd = new SurveyEndExample(this.key, required);
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
    this.addItem(this.QLikert.get());
    this.addItem(this.QCloze.get());
    this.addItem(this.QDate.get());
    this.addItem(this.QSlider.get());
    this.addItem(this.QRSCA.get());
    this.addItem(this.QRBL.get());
    this.addItem(this.QMAP.get());
    this.addItem(this.QCustomWithMapping.get());
    this.addItem(this.SurveyEnd.get());
  }
}


export const ExampleSurvey = new ExampleSurveyDef(false);
