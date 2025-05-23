import { Expression } from 'survey-engine/data_types';
import { Group, Item } from 'case-editor-tools/surveys/types';
import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';
import { SingleChoiceOptionTypes as SCOptions, ClozeItemTypes } from 'case-editor-tools/surveys';
import { SurveySuffix } from '../globalConstants';
import { LymeDiagnosis1, LymeDiagnosis2 } from './diagnosisTherapy';
import { LymeDiagnosis3alt, LymeDiagnosis4, LymeDiagnosis5, LymeDiagnosis6 } from './lyme';




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


export class ThreeMonthsText_Kids extends Item {

  markdownContent = `
## 3 maanden

De vragen hieronder zijn voor een minderjarige.
Ben je een ouder/verzorger dan kun je de antwoorden invullen voor/over je kind.
    `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'M3Text_Kids');

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
    yes: 'b'
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
          key: this.optionKeys.yes, role: 'option',
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
    no: 'a'
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
          key: this.optionKeys.no, role: 'option',
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
    yes: 'a'
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
          key: this.optionKeys.yes, role: 'option',
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

export class FU_LymeDiagGroup extends Group {
  Header: FU_LymeDiagHeader;
  Q1: LymeFU;
  Q2: LymeDiagnosis2;
  Q3: LymeDiagnosis3alt;
  Q4: LymeDiagnosis4;
  Q5: LymeDiagnosis5;
  Q6: LymeDiagnosis6;

  constructor(parentKey: string, isRequired?: boolean, condition?: Expression) {
    super(parentKey, 'FU_LD');

    this.groupEditor.setCondition(condition);

    const required = isRequired !== undefined ? isRequired : false;

    this.Header = new FU_LymeDiagHeader(this.key);
    this.Q1 = new LymeFU(this.key, required);
    const LDcondition = SurveyEngine.singleChoice.any(this.Q1.key, this.Q1.optionKeys.yes);
    this.Q2 = new LymeDiagnosis2(this.key, required, LDcondition);
    this.Q3 = new LymeDiagnosis3alt(this.key, required, LDcondition);
    this.Q4 = new LymeDiagnosis4(this.key, required, LDcondition);
    this.Q5 = new LymeDiagnosis5(this.key, required, LDcondition);
    this.Q6 = new LymeDiagnosis6(this.key, required, LDcondition);
  }

  buildGroup() {
    this.addItem(this.Header.get());

    this.addItem(this.Q1.get());
    this.addItem(this.Q2.get());
    this.addItem(this.Q3.get());
    this.addItem(this.Q4.get());
    this.addItem(this.Q5.get());
    this.addItem(this.Q6.get());
  }
}


class FU_LymeDiagHeader extends Item {
  markdownContentKids = `
## Diagnoses

De vragen hieronder zijn voor een minderjarige.
Ben je een ouder/verzorger dan kun je de antwoorden invullen voor/over je kind.

De volgende vragen gaan over **nieuwe** uitingen van de ziekte van Lyme die bij jou ontstaan zijn sinds het invullen van de vorige vragenlijst 3 maanden geleden.
    `

  markdownContentAdults = `
## Diagnoses

De volgende vragen gaan over **nieuwe** uitingen van de ziekte van Lyme die bij jou ontstaan zijn sinds het invullen van de vorige vragenlijst 3 maanden geleden.
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


class LymeFU extends Item {
  optionKeys = {
    yes: 'b'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q1');

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
          key: this.optionKeys.yes, role: 'option',
          content: new Map([
            ["nl", "Ja"],
          ])
        },
      ]
    })
  }
}


export class MedicationHeader extends Item {

  markdownContent = `
# Behandeling
    `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'MedHeader');

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

  optionKeys = {
    yes_number: 'b'
  }


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
          key: this.optionKeys.yes_number, items: [
            ClozeItemTypes.text({
              key: '1', content: new Map(
                [['en', "Ja, aantal medicijnen "]]
              )
            }),
            ClozeItemTypes.numberInput({
              key: 'number',
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
      customValidations: [
        {
          key: 'MedFU', rule: SurveyEngine.logic.or(
            SurveyEngine.singleChoice.none(this.key, this.optionKeys.yes_number),
            SurveyEngine.compare.gt(SurveyEngine.getResponseValueAsNum(this.key, `rg.scg.${this.optionKeys.yes_number}.number`),0),
          ), type: 'hard'
        }
      ]
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
      questionText: new Map([
        ['nl', 'Details per medicijn'],
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
          ClozeItemTypes.text({
            key: '12', content: new Map(
              [['nl', "Medicijnen tijdens ziekenhuisopname gebruikt"]]
            )
          }),
          ClozeItemTypes.dropDown({
            key: '13', options: [
              SCOptions.option('1', new Map([['nl', "Ja"]])),
              SCOptions.option('2', new Map([['nl', "Nee"]]))
            ]
          }),
          ClozeItemTypes.clozeLineBreak(),
          //2nd medication
          ClozeItemTypes.text({
            key: '14', content: new Map(
              [['nl', "Medicijn 2 (naam of omschrijving):"]]
            ),
            displayCondition: this.condition2
          }),
          ClozeItemTypes.textInput({
            key: '15',
            displayCondition: this.condition2
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '16', content: new Map(
              [['nl', "Dosis:"]]
            ),
            displayCondition: this.condition2
          }),
          ClozeItemTypes.textInput({
            key: '17',
            displayCondition: this.condition2
          }),//TODO: this input is not mandatory
          ClozeItemTypes.text({
            key: '18', content: new Map(
              [['nl', "(Als je de dosis niet weet kun je die overslaan)"]]
            ),
            displayCondition: this.condition2
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '19', content: new Map(
              [['nl', "Aantal keren per dag:"]]
            ),
            displayCondition: this.condition2
          }),
          ClozeItemTypes.numberInput({
            key: '20',
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
            key: '21', content: new Map(
              [['nl', "Aantal dagen:"]]
            ),
            displayCondition: this.condition2
          }),
          ClozeItemTypes.textInput({
            key: '22',
            displayCondition: this.condition2
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '23', content: new Map(
              [['nl', "Waarom neem je dit medicijn?"]]
            ),
            displayCondition: this.condition2
          }),
          ClozeItemTypes.dropDown({
            key: '24', options: [
              SCOptions.option('1', new Map([['nl', "Tegen de tekenbeet, erythema migrans of andere vorm van de ziekte van Lyme"]])),
              SCOptions.option('2', new Map([['nl', "Om een andere reden (klacht, ziekte of aandoening)"]]))
            ],
            displayCondition: this.condition2
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '25', content: new Map(
              [['nl', "Medicijnen tijdens ziekenhuisopname gebruikt"]]
            ),
            displayCondition: this.condition2
          }),
          ClozeItemTypes.dropDown({
            key: '26', options: [
              SCOptions.option('1', new Map([['nl', "Ja"]])),
              SCOptions.option('2', new Map([['nl', "Nee"]]))
            ],
            displayCondition: this.condition2
          }),
          ClozeItemTypes.clozeLineBreak(),
          //3rd medication
          ClozeItemTypes.text({
            key: '27', content: new Map(
              [['nl', "Medicijn 3 (naam of omschrijving):"]]
            ),
            displayCondition: this.condition3
          }),
          ClozeItemTypes.textInput({
            key: '28',
            displayCondition: this.condition3
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '29', content: new Map(
              [['nl', "Dosis:"]]
            ),
            displayCondition: this.condition3
          }),
          ClozeItemTypes.textInput({
            key: '30',
            displayCondition: this.condition3
          }),
          ClozeItemTypes.text({
            key: '31', content: new Map(
              [['nl', "(Als je de dosis niet weet kun je die overslaan)"]]
            ),
            displayCondition: this.condition3
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '32', content: new Map(
              [['nl', "Aantal keren per dag:"]]
            ),
            displayCondition: this.condition3
          }),
          ClozeItemTypes.numberInput({
            key: '33',
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
            key: '34', content: new Map(
              [['nl', "Aantal dagen:"]]
            ),
            displayCondition: this.condition3
          }),
          ClozeItemTypes.textInput({
            key: '35',
            displayCondition: this.condition3
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '36', content: new Map(
              [['nl', "Waarom neem je dit medicijn?"]]
            ),
            displayCondition: this.condition3
          }),
          ClozeItemTypes.dropDown({
            key: '37', options: [
              SCOptions.option('1', new Map([['nl', "Tegen de tekenbeet, erythema migrans of andere vorm van de ziekte van Lyme"]])),
              SCOptions.option('2', new Map([['nl', "Om een andere reden (klacht, ziekte of aandoening)"]]))
            ],
            displayCondition: this.condition3
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '38', content: new Map(
              [['nl', "Medicijnen tijdens ziekenhuisopname gebruikt"]]
            ),
            displayCondition: this.condition3
          }),
          ClozeItemTypes.dropDown({
            key: '39', options: [
              SCOptions.option('1', new Map([['nl', "Ja"]])),
              SCOptions.option('2', new Map([['nl', "Nee"]]))
            ],
            displayCondition: this.condition3
          }),
          ClozeItemTypes.clozeLineBreak(),
          //4th medication
          ClozeItemTypes.text({
            key: '40', content: new Map(
              [['nl', "Medicijn 4 (naam of omschrijving):"]]
            ),
            displayCondition: this.condition4
          }),
          ClozeItemTypes.textInput({
            key: '41',
            displayCondition: this.condition4
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '42', content: new Map(
              [['nl', "Dosis:"]]
            ),
            displayCondition: this.condition4
          }),
          ClozeItemTypes.textInput({
            key: '43',
            displayCondition: this.condition4
          }),
          ClozeItemTypes.text({
            key: '44', content: new Map(
              [['nl', "(Als je de dosis niet weet kun je die overslaan)"]]
            ),
            displayCondition: this.condition4
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '45', content: new Map(
              [['nl', "Aantal keren per dag:"]]
            ),
            displayCondition: this.condition4
          }),
          ClozeItemTypes.numberInput({
            key: '46',
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
            key: '47', content: new Map(
              [['nl', "Aantal dagen:"]]
            ),
            displayCondition: this.condition4
          }),
          ClozeItemTypes.textInput({
            key: '48',
            displayCondition: this.condition4
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '49', content: new Map(
              [['nl', "Waarom neem je dit medicijn?"]]
            ),
            displayCondition: this.condition4
          }),
          ClozeItemTypes.dropDown({
            key: '50', options: [
              SCOptions.option('1', new Map([['nl', "Tegen de tekenbeet, erythema migrans of andere vorm van de ziekte van Lyme"]])),
              SCOptions.option('2', new Map([['nl', "Om een andere reden (klacht, ziekte of aandoening)"]]))
            ],
            displayCondition: this.condition4
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '51', content: new Map(
              [['nl', "Medicijnen tijdens ziekenhuisopname gebruikt"]]
            ),
            displayCondition: this.condition4
          }),
          ClozeItemTypes.dropDown({
            key: '52', options: [
              SCOptions.option('1', new Map([['nl', "Ja"]])),
              SCOptions.option('2', new Map([['nl', "Nee"]]))
            ],
            displayCondition: this.condition4
          }),
          ClozeItemTypes.clozeLineBreak(),
          //5th medication
          ClozeItemTypes.text({
            key: '53', content: new Map(
              [['nl', "Medicijn 5 (naam of omschrijving):"]]
            ),
            displayCondition: this.condition5
          }),
          ClozeItemTypes.textInput({
            key: '54',
            displayCondition: this.condition5
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '55', content: new Map(
              [['nl', "Dosis:"]]
            ),
            displayCondition: this.condition5
          }),
          ClozeItemTypes.textInput({
            key: '56',
            displayCondition: this.condition5
          }),
          ClozeItemTypes.text({
            key: '57', content: new Map(
              [['nl', "(Als je de dosis niet weet kun je die overslaan)"]]
            ),
            displayCondition: this.condition5
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '58', content: new Map(
              [['nl', "Aantal keren per dag:"]]
            ),
            displayCondition: this.condition5
          }),
          ClozeItemTypes.numberInput({
            key: '59',
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
            key: '60', content: new Map(
              [['nl', "Aantal dagen:"]]
            ),
            displayCondition: this.condition5
          }),
          ClozeItemTypes.textInput({
            key: '61',
            displayCondition: this.condition5
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '62', content: new Map(
              [['nl', "Waarom neem je dit medicijn?"]]
            ),
            displayCondition: this.condition5
          }),
          ClozeItemTypes.dropDown({
            key: '63', options: [
              SCOptions.option('1', new Map([['nl', "Tegen de tekenbeet, erythema migrans of andere vorm van de ziekte van Lyme"]])),
              SCOptions.option('2', new Map([['nl', "Om een andere reden (klacht, ziekte of aandoening)"]]))
            ],
            displayCondition: this.condition5
          }),
          ClozeItemTypes.clozeLineBreak(),
          ClozeItemTypes.text({
            key: '64', content: new Map(
              [['nl', "Medicijnen tijdens ziekenhuisopname gebruikt"]]
            ),
            displayCondition: this.condition5
          }),
          ClozeItemTypes.dropDown({
            key: '65', options: [
              SCOptions.option('1', new Map([['nl', "Ja"]])),
              SCOptions.option('2', new Map([['nl', "Nee"]]))
            ],
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
