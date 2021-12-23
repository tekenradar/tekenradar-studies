import { Expression } from 'survey-engine/data_types';
import { Group, Item } from 'case-editor-tools/surveys/types';
import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';
import { SingleChoiceOptionTypes as SCOptions, ClozeItemTypes } from 'case-editor-tools/surveys';




export class Text1FU extends Item {

  markdownContent = `
    De volgende vragen gaan over mogelijke tekenbeten opgelopen sinds het invullen van de vorige vragenlijst 3 maanden geleden.
    `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Text1FU');

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




export class NewTB extends Item {

  optionKeys = {
    nameOfOption: 'b'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'NewTB');

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
        ['nl', 'Heb je sinds je de vorige vragenlijst 3 maanden geleden invulde nieuwe tekenbeten opgemerkt?'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Nee, sindsdien heb ik geen tekenbeten opgemerkt"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Ja"],
          ])
        },
      ]
    })
  }
}


export class ReportedTB2 extends Item {

  optionKeys = {
    nameOfOption: 'a'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'RepTB2');

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
        ['nl', 'Heb je al deze nieuwe tekenbeten gemeld via je account op tekenradar.nl?'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Nee"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Ja"],
          ])
        },
      ]
    })
  }
}



export class PreviousTickBites3 extends Item {


  constructor(parentKey: string, isRequired?: boolean, condition?: Expression) {
    super(parentKey, 'PTB3');

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
        ["nl", 'Hoeveel tekenbeten heb je sinds je de vorige vragenlijst 3 maanden geleden invulde opgemerkt die nog niet gemeld zijn via je account op tekenradar.nl?'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "1 - 3 tekenbeten"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "4 - 10 tekenbeten"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "11 - 50 tekenbeten"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "Meer dan 50 tekenbeten"],
          ])
        },
      ]
    })
  }
}


export class FeverFU1 extends Item {

  optionKeys = {
    nameOfOption: 'a'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'FFU1');

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
        ['nl', 'Heb je in de periode na de tekenbeet koorts gehad?'],
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

export class FeverFU2 extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'FFU2');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.multilineTextInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Op welke dagen heb je koorts gehad en hoeveel graden was de koorts?'],
      ]),

    })
  }
}


export class Text2FU extends Item {

  markdownContent = `
    De volgende vragen gaan over **nieuwe** uitingen van de ziekte van Lyme die bij jou ontstaan zijn sinds het invullen van de vorige vragenlijst 3 maanden geleden.
    `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Text2FU');

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


export class LymeFU extends Item {

  optionKeys = {
    nameOfOption: 'b'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'LFU');

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
        ['nl', 'Heeft een arts bij jou een nieuwe vorm van de ziekte van Lyme vastgesteld in de afgelopen 3 maanden? (bijvoorbeeld een nieuwe erythema migrans of  andere ziekte van Lyme)?'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Nee"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Ja"],
          ])
        },
      ]
    })
  }
}


export class MedicationFU1 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Heb je in de afgelopen '],
      ]),
    },
    {
      content: new Map([
        ["nl", "drie maanden "],
      ]),
      className: "text-primary"
    },
    {
      content: new Map([
        ["nl", "medicijnen gebruikt?  (de anti conceptie pil niet meerekenen) Wil je ook aanvinken of de medicijnen gegeven werden voor behandeling tegen de ziekte van Lyme, inclusief erythema migrans of om een andere reden, en of je ze tijdens een ziekenhuisopname hebt gebruikt? "],
      ]),
    },
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'MedFU1');

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
        SCOptions.cloze({
          key: 'b', items: [
            ClozeItemTypes.text({
              key: '1', content: new Map(
                [['en', "Ja, namelijk "]]
              )
            }),
            ClozeItemTypes.numberInput({
              key: '2',
              inputLabel: new Map([["nl", "bij benadering"],]),
              labelBehindInput: true,
              inputMaxWidth: '80px',
              componentProperties: {
                min: 0,
              }
            }),
          ]
        }),
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "Ja, precies dezelfde medicatie als de vorige keer"],
          ])
        },
      ],
    })
  }
}


export class MedicationFU2 extends Item {

  condition2: Expression;

  constructor(parentKey: string, isRequired: boolean, condition: Expression) {
    super(parentKey, 'MedFU2');

    this.isRequired = isRequired;
    this.condition = SurveyEngine.compare.gt(condition, 0);
    this.condition2 = SurveyEngine.compare.gt(condition, 1);

  }

  //TODO: ask this question for each medicin of former answer
  buildItem() {
    return SurveyItems.clozeQuestion({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionSubText: new Map([//TODO: is this writtem at the end of question?
        ['nl', 'Als je de dosis niet weet kun je die overslaan'],
      ]),
      questionText: new Map([//TODO: insert proper question text
        ['nl', 'Info per medication'],
      ]),
      items:
        [
          ClozeItemTypes.text({
            key: '1', content: new Map(
              [['nl', "Medicijn (naam of omschrijving):"]]
            ),
          }),
          ClozeItemTypes.textInput({
            key: '2',
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '3', content: new Map(
              [['nl', "Dosis:*"]]
            )
          }),
          ClozeItemTypes.textInput({
            key: '4',
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '5', content: new Map(
              [['nl', "Aantal keren per dag:"]]
            )
          }),
          ClozeItemTypes.numberInput({
            key: '6',
            inputMaxWidth: '60px',
            inputLabel: new Map([["nl", " "],]),
            componentProperties: {
              min: 0,
              max: 100
            }
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '7', content: new Map(
              [['nl', "Aantal dagen:"]]
            )
          }),
          ClozeItemTypes.textInput({
            key: '8',
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '9', content: new Map(
              [['nl', "Waarom neem je dit medicijn?"]]
            )
          }),
          ClozeItemTypes.dropDown({
            key: '10', options: [
              SCOptions.option('1', new Map([['nl', "Tegen de tekenbeet, erythema migrans of andere vorm van de ziekte van Lyme"]])),
              SCOptions.option('2', new Map([['nl', "Om een andere reden (klacht, ziekte of aandoening)"]]))
            ]
          }),
          ClozeItemTypes.clozeLineBreak(),
          //TODO: checkbox is needed here
          ClozeItemTypes.text({
            key: '11', content: new Map(
              [['nl', "Medicijnen tijdens ziekenhuisopname gebruikt"]]
            )
          }),
          ClozeItemTypes.clozeLineBreak(),
          //2nd medication
          ClozeItemTypes.text({
            key: '1', content: new Map(
              [['nl', "Medicijn (naam of omschrijving):"]]
            ),
            displayCondition: this.condition2
          }),
          ClozeItemTypes.textInput({
            key: '2',
            displayCondition: this.condition2
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '3', content: new Map(
              [['nl', "Dosis:*"]]
            ),
            displayCondition: this.condition2
          }),
          ClozeItemTypes.textInput({
            key: '4',
            displayCondition: this.condition2
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '5', content: new Map(
              [['nl', "Aantal keren per dag:"]]
            ),
            displayCondition: this.condition2
          }),
          ClozeItemTypes.numberInput({
            key: '6',
            inputMaxWidth: '60px',
            inputLabel: new Map([["nl", " "],]),
            componentProperties: {
              min: 0,
              max: 100
            },
            displayCondition: this.condition2
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '7', content: new Map(
              [['nl', "Aantal dagen:"]]
            ),
            displayCondition: this.condition2
          }),
          ClozeItemTypes.textInput({
            key: '8',
            displayCondition: this.condition2
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '9', content: new Map(
              [['nl', "Waarom neem je dit medicijn?"]]
            ),
            displayCondition: this.condition2
          }),
          ClozeItemTypes.dropDown({
            key: '10', options: [
              SCOptions.option('1', new Map([['nl', "Tegen de tekenbeet, erythema migrans of andere vorm van de ziekte van Lyme"]])),
              SCOptions.option('2', new Map([['nl', "Om een andere reden (klacht, ziekte of aandoening)"]]))
            ],
            displayCondition: this.condition2
          }),
          ClozeItemTypes.clozeLineBreak(),
          //TODO: checkbox is needed here
          ClozeItemTypes.text({
            key: '11', content: new Map(
              [['nl', "Medicijnen tijdens ziekenhuisopname gebruikt"]]
            ),
            displayCondition: this.condition2
          }),
        ],
    })
  }
}


export class SymptomsFU extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'SymFU');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.multilineTextInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Heb je nog andere klachten of gezondheidsproblemen gehad in het afgelopen jaar? Vul die dan hier in:'],
      ]),

    })
  }
}
