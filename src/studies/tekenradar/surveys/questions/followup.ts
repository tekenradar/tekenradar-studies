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


export class BackgroundText_Kids extends Item {

  markdownContent = `
# Achtergrond

De vragen hieronder zijn voor een minderjarige.
Ben je een ouder/verzorger dan kun je de antwoorden invullen voor/over je kind.
    `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'BGText_Kids');

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
# Diagnoses

De vragen hieronder zijn voor een minderjarige.
Ben je een ouder/verzorger dan kun je de antwoorden invullen voor/over je kind.

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


export class MedicationFUText_Kids extends Item {

  markdownContent = `
# Behandeling

De vragen hieronder zijn voor een minderjarige.
Ben je een ouder/verzorger dan kun je de antwoorden invullen voor/over je kind.
    `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'MedTextFU_Kids');

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
        ["nl", "medicijnen gebruikt?  (De anti conceptie pil niet meerekenen.) Wil je ook aanvinken of de medicijnen gegeven werden voor behandeling tegen de ziekte van Lyme, inclusief erythema migrans of om een andere reden, en of je ze tijdens een ziekenhuisopname hebt gebruikt? "],
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
                [['en', "Ja, aantal medicijnen "]]
              )
            }),
            ClozeItemTypes.numberInput({
              key: '2',
              inputLabel: new Map([["nl", ""],]),
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
  condition3: Expression;
  condition4: Expression;
  condition5: Expression;


  constructor(parentKey: string, isRequired: boolean, condition: Expression) {
    super(parentKey, 'MedFU2');

    this.isRequired = isRequired;
    this.condition = SurveyEngine.compare.gt(condition, 0);
    this.condition2 = SurveyEngine.compare.gt(condition, 1);
    this.condition3 = SurveyEngine.compare.gt(condition, 2);
    this.condition4 = SurveyEngine.compare.gt(condition, 3);
    this.condition5 = SurveyEngine.compare.gt(condition, 4);


  }

  buildItem() {
    return SurveyItems.clozeQuestion({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([//TODO: insert proper question text
        ['nl', 'Info per medication'],
      ]),
      items:
        [
          ClozeItemTypes.text({
            key: '1', content: new Map(
              [['nl', "Medicijn 1 (naam of omschrijving):"]]
            ),
          }),
          ClozeItemTypes.textInput({
            key: '2',
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '3', content: new Map(
              [['nl', "Dosis:"]]
            ),
          }),
          ClozeItemTypes.textInput({
            key: '4',
          }),
          ClozeItemTypes.text({
            key: '5', content: new Map(
              [['nl', "(Als je de dosis niet weet kun je die overslaan)"]]
            )
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '6', content: new Map(
              [['nl', "Aantal keren per dag:"]]
            )
          }),
          ClozeItemTypes.numberInput({
            key: '7',
            inputMaxWidth: '60px',
            inputLabel: new Map([["nl", " "],]),
            componentProperties: {
              min: 0,
              max: 100
            }
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '8', content: new Map(
              [['nl', "Aantal dagen:"]]
            )
          }),
          ClozeItemTypes.textInput({
            key: '9',
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '10', content: new Map(
              [['nl', "Waarom neem je dit medicijn?"]]
            )
          }),
          ClozeItemTypes.dropDown({
            key: '11', options: [
              SCOptions.option('1', new Map([['nl', "Tegen de tekenbeet, erythema migrans of andere vorm van de ziekte van Lyme"]])),
              SCOptions.option('2', new Map([['nl', "Om een andere reden (klacht, ziekte of aandoening)"]]))
            ]
          }),
          ClozeItemTypes.clozeLineBreak(),
          //TODO: checkbox is needed here
          ClozeItemTypes.text({
            key: '12', content: new Map(
              [['nl', "Medicijnen tijdens ziekenhuisopname gebruikt"]]
            )
          }),
          ClozeItemTypes.clozeLineBreak(),
          //2nd medication
          ClozeItemTypes.text({
            key: '13', content: new Map(
              [['nl', "Medicijn 2 (naam of omschrijving):"]]
            ),
            displayCondition: this.condition2
          }),
          ClozeItemTypes.textInput({
            key: '14',
            displayCondition: this.condition2
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '15', content: new Map(
              [['nl', "Dosis:"]]
            ),
            displayCondition: this.condition2
          }),
          ClozeItemTypes.textInput({
            key: '16',
            displayCondition: this.condition2
          }),//TODO: this input is not mandatory
          ClozeItemTypes.text({
            key: '17', content: new Map(
              [['nl', "(Als je de dosis niet weet kun je die overslaan)"]]
            ),
            displayCondition: this.condition2
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '18', content: new Map(
              [['nl', "Aantal keren per dag:"]]
            ),
            displayCondition: this.condition2
          }),
          ClozeItemTypes.numberInput({
            key: '19',
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
            key: '20', content: new Map(
              [['nl', "Aantal dagen:"]]
            ),
            displayCondition: this.condition2
          }),
          ClozeItemTypes.textInput({
            key: '21',
            displayCondition: this.condition2
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '22', content: new Map(
              [['nl', "Waarom neem je dit medicijn?"]]
            ),
            displayCondition: this.condition2
          }),
          ClozeItemTypes.dropDown({
            key: '23', options: [
              SCOptions.option('1', new Map([['nl', "Tegen de tekenbeet, erythema migrans of andere vorm van de ziekte van Lyme"]])),
              SCOptions.option('2', new Map([['nl', "Om een andere reden (klacht, ziekte of aandoening)"]]))
            ],
            displayCondition: this.condition2
          }),
          ClozeItemTypes.clozeLineBreak(),
          //TODO: checkbox is needed here
          ClozeItemTypes.text({
            key: '24', content: new Map(
              [['nl', "Medicijnen tijdens ziekenhuisopname gebruikt"]]
            ),
            displayCondition: this.condition2
          }),
          ClozeItemTypes.clozeLineBreak(),
          //3rd medication
          ClozeItemTypes.text({
            key: '25', content: new Map(
              [['nl', "Medicijn 3 (naam of omschrijving):"]]
            ),
            displayCondition: this.condition3
          }),
          ClozeItemTypes.textInput({
            key: '26',
            displayCondition: this.condition3
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '27', content: new Map(
              [['nl', "Dosis:"]]
            ),
            displayCondition: this.condition3
          }),
          ClozeItemTypes.textInput({
            key: '28',
            displayCondition: this.condition3
          }),
          ClozeItemTypes.text({
            key: '29', content: new Map(
              [['nl', "(Als je de dosis niet weet kun je die overslaan)"]]
            ),
            displayCondition: this.condition3
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '30', content: new Map(
              [['nl', "Aantal keren per dag:"]]
            ),
            displayCondition: this.condition3
          }),
          ClozeItemTypes.numberInput({
            key: '31',
            inputMaxWidth: '60px',
            inputLabel: new Map([["nl", " "],]),
            componentProperties: {
              min: 0,
              max: 100
            },
            displayCondition: this.condition3
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '32', content: new Map(
              [['nl', "Aantal dagen:"]]
            ),
            displayCondition: this.condition3
          }),
          ClozeItemTypes.textInput({
            key: '33',
            displayCondition: this.condition3
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '34', content: new Map(
              [['nl', "Waarom neem je dit medicijn?"]]
            ),
            displayCondition: this.condition3
          }),
          ClozeItemTypes.dropDown({
            key: '35', options: [
              SCOptions.option('1', new Map([['nl', "Tegen de tekenbeet, erythema migrans of andere vorm van de ziekte van Lyme"]])),
              SCOptions.option('2', new Map([['nl', "Om een andere reden (klacht, ziekte of aandoening)"]]))
            ],
            displayCondition: this.condition3
          }),
          ClozeItemTypes.clozeLineBreak(),
          //TODO: checkbox is needed here
          ClozeItemTypes.text({
            key: '36', content: new Map(
              [['nl', "Medicijnen tijdens ziekenhuisopname gebruikt"]]
            ),
            displayCondition: this.condition3
          }),
          ClozeItemTypes.clozeLineBreak(),
          //4th medication
          ClozeItemTypes.text({
            key: '37', content: new Map(
              [['nl', "Medicijn 4 (naam of omschrijving):"]]
            ),
            displayCondition: this.condition4
          }),
          ClozeItemTypes.textInput({
            key: '38',
            displayCondition: this.condition4
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '39', content: new Map(
              [['nl', "Dosis:"]]
            ),
            displayCondition: this.condition4
          }),
          ClozeItemTypes.textInput({
            key: '40',
            displayCondition: this.condition4
          }),
          ClozeItemTypes.text({
            key: '41', content: new Map(
              [['nl', "(Als je de dosis niet weet kun je die overslaan)"]]
            ),
            displayCondition: this.condition4
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '42', content: new Map(
              [['nl', "Aantal keren per dag:"]]
            ),
            displayCondition: this.condition4
          }),
          ClozeItemTypes.numberInput({
            key: '43',
            inputMaxWidth: '60px',
            inputLabel: new Map([["nl", " "],]),
            componentProperties: {
              min: 0,
              max: 100
            },
            displayCondition: this.condition4
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '44', content: new Map(
              [['nl', "Aantal dagen:"]]
            ),
            displayCondition: this.condition4
          }),
          ClozeItemTypes.textInput({
            key: '45',
            displayCondition: this.condition4
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '46', content: new Map(
              [['nl', "Waarom neem je dit medicijn?"]]
            ),
            displayCondition: this.condition4
          }),
          ClozeItemTypes.dropDown({
            key: '47', options: [
              SCOptions.option('1', new Map([['nl', "Tegen de tekenbeet, erythema migrans of andere vorm van de ziekte van Lyme"]])),
              SCOptions.option('2', new Map([['nl', "Om een andere reden (klacht, ziekte of aandoening)"]]))
            ],
            displayCondition: this.condition4
          }),
          ClozeItemTypes.clozeLineBreak(),
          //TODO: checkbox is needed here
          ClozeItemTypes.text({
            key: '48', content: new Map(
              [['nl', "Medicijnen tijdens ziekenhuisopname gebruikt"]]
            ),
            displayCondition: this.condition4
          }),
          ClozeItemTypes.clozeLineBreak(),
          //5th medication
          ClozeItemTypes.text({
            key: '49', content: new Map(
              [['nl', "Medicijn 5 (naam of omschrijving):"]]
            ),
            displayCondition: this.condition5
          }),
          ClozeItemTypes.textInput({
            key: '50',
            displayCondition: this.condition5
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '51', content: new Map(
              [['nl', "Dosis:"]]
            ),
            displayCondition: this.condition5
          }),
          ClozeItemTypes.textInput({
            key: '52',
            displayCondition: this.condition5
          }),
          ClozeItemTypes.text({
            key: '53', content: new Map(
              [['nl', "(Als je de dosis niet weet kun je die overslaan)"]]
            ),
            displayCondition: this.condition5
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '54', content: new Map(
              [['nl', "Aantal keren per dag:"]]
            ),
            displayCondition: this.condition5
          }),
          ClozeItemTypes.numberInput({
            key: '55',
            inputMaxWidth: '60px',
            inputLabel: new Map([["nl", " "],]),
            componentProperties: {
              min: 0,
              max: 100
            },
            displayCondition: this.condition5
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '56', content: new Map(
              [['nl', "Aantal dagen:"]]
            ),
            displayCondition: this.condition5
          }),
          ClozeItemTypes.textInput({
            key: '57',
            displayCondition: this.condition5
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '58', content: new Map(
              [['nl', "Waarom neem je dit medicijn?"]]
            ),
            displayCondition: this.condition5
          }),
          ClozeItemTypes.dropDown({
            key: '59', options: [
              SCOptions.option('1', new Map([['nl', "Tegen de tekenbeet, erythema migrans of andere vorm van de ziekte van Lyme"]])),
              SCOptions.option('2', new Map([['nl', "Om een andere reden (klacht, ziekte of aandoening)"]]))
            ],
            displayCondition: this.condition5
          }),
          ClozeItemTypes.clozeLineBreak(),
          //TODO: checkbox is needed here
          ClozeItemTypes.text({
            key: '60', content: new Map(
              [['nl', "Medicijnen tijdens ziekenhuisopname gebruikt"]]
            ),
            displayCondition: this.condition5
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
