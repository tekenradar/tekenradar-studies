import { Expression } from 'survey-engine/data_types';
import { Item, OptionDef } from 'case-editor-tools/surveys/types';
import { SurveyItems } from 'case-editor-tools/surveys';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';
import { SingleChoiceOptionTypes as SCOptions, MultipleChoiceOptionTypes as MCOptions, ClozeItemTypes } from 'case-editor-tools/surveys';
import { SurveyEngine } from 'case-editor-tools/surveys';



export class NwEMLymeHeader extends Item {

  markdownContent = `
# Nieuwe erythema migrans of andere Lyme

    `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'NweEMLyme');

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

export class NwEMLyme1 extends Item {
  optionKeys = {
    yes_number: 'c',
    no: 'd',
    em: 'a',
    lyme: 'b'
  }


  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Heb je '],
      ]),
    },
    {
      content: new Map([
        ["nl", "sinds het voorgaande LymeProspect of Tekenradar vragenlijstonderzoek "],
      ]),
      className: "text-primary"
    },
    {
      content: new Map([
        ["nl", 'een (nieuwe) erythema migrans '],
      ])
    },
    {
      content: new Map([
        ["nl", '(een steeds groter wordende rode ring of vlek na een tekenbeet) ']
      ]),
      className: "fw-normal"
    },
    {
      content: new Map([
        ["nl", 'of andere vorm van de ziekte van Lyme gehad? ']
      ])
    }]


  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'NEL1');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    const markdownContent = `
*Een andere vorm van de ziekte van Lyme wordt meestal vastgesteld met laboratoriumonderzoek, vaak via een medisch specialist en/of ziekenhuis.*
*Als je niet meer precies weet wanneer je de erythema migrans of andere vorm van de ziekte van Lyme hebt gehad, vul deze dan toch in en schat de datum.*
    `

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
            ["nl", "Ja, één erythema migrans"],
          ])
        },
        {
          key: 'b', role: 'input',
          content: new Map([
            ["nl", "Ja, één andere vorm van de ziekte van Lyme, namelijk:"],
          ])
        },
        {
          key: this.optionKeys.yes_number, role: 'numberInput',
          content: new Map([
            ["nl", "Ja, meerdere keren erythema migrans en/of andere vormen van lymeziekte, aantal keer:"],
          ]),
          optionProps: {
            min: 0,
            max: 5,
          }
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "Nee"],
          ])
        },
      ],
      customValidations: [
        {
          key: 'NEL1', rule: SurveyEngine.logic.or(
            SurveyEngine.singleChoice.none(this.key, this.optionKeys.yes_number),
            SurveyEngine.compare.gt(SurveyEngine.getResponseValueAsNum(this.key, `rg.scg.${this.optionKeys.yes_number}`), 0),
          ), type: 'hard'
        }
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

/*
export class NwEMLyme1 extends Item {
  optionKeys = {
    no: 'c',
    em: 'a',
    lyme: 'b'
  }
  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Heb je in de afgelopen jaren een (nieuwe) erythema migrans '],
      ])
    },
    {
      content: new Map([
        ["nl", '(een steeds groter wordende rode ring of vlek na een tekenbeet) ']
      ]),
      className: "fw-normal"
    },
    {
      content: new Map([
        ["nl", 'of andere vorm van de ziekte van Lyme gehad? ']
      ])
    },
    {
      content: new Map([
        ["nl", " (meerdere antwoorden mogelijk)"],
      ]),
      className: "fw-normal"
    },
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'NEL1');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.multipleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Ja, een erythema migrans"],
          ])
        },
        {
          key: 'b', role: 'input',
          content: new Map([
            ["nl", "Ja, een andere vorm van de ziekte van Lyme, namelijk:"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "Nee"],
          ])
        }

      ]
    })
  }
}
*/

//eerst set voor EM
export class NwEMLyme2 extends Item {

  optionKeys = {
    date: 'a',
    unknown: 'b'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'NEL2');

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
        ['nl', 'Wanneer ontwikkelde deze erythema migrans zich?'],
      ]),
      responseOptions: [
        SCOptions.cloze({
          key: this.optionKeys.date,
          items: [
            ClozeItemTypes.text({
              key: '1',
              content: new Map([
                ['nl', "De rode ring of vlek is ontstaan op "]
              ])
            }),
            ClozeItemTypes.dateInput({
              dateInputMode: 'YMD',
              key: '2',
              maxRelativeDate: {
                reference: SurveyEngine.timestampWithOffset({ seconds: 0 }),
                delta: { seconds: 0 }
              },
              minRelativeDate: { delta: { years: -100 } },
            }),
            ClozeItemTypes.text({
              key: '3',
              content: new Map([
                ['nl', "Je mag de datum schatten"]
              ])
            }),
          ],
        }),
        {
          key: this.optionKeys.unknown, role: 'option',
          content: new Map([
            ["nl", "Weet ik niet"],
          ]),
          disabled: SurveyEngine.singleChoice.any(this.itemKey, this.optionKeys.date)
        },
      ]
    })
  }
}

export class NwEMLyme3 extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'NEL3');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.numericInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Hoe groot was de erythema migrans?'],
      ]),
      questionSubText: new Map([
        ['nl', 'Het gaat om de doorsnede van de vlek, zie het voorbeeld op de foto. Als de EM niet meer zichtbaar is, maak dan een zo goed mogelijke schatting.'],
      ]),
      titleClassName: 'sticky-top',
      inputMaxWidth: '80px',
      inputLabel: new Map([
        ['nl', 'cm']
      ]),
      labelBehindInput: true,
      //contentBehindInput: true,
      componentProperties: {
        min: 0,
        max: 100
      },
      bottomDisplayCompoments: [
        ComponentGenerators.markdown({
          className: 'mt-2',
          content: new Map([
            ['nl', `
<img src="https://www.tekenradar.nl/assets/images/survey-content/em_example.png" width="100%" style="max-width: 500px"/>
            `]
          ])
        })
      ]
    })
  }
}

export class NwEMLyme4 extends Item {

  optionKeys = {
    yes: 'a'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'NEL4');

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
        ['nl', 'Ben je bij een arts geweest voor de erythema migrans?'],
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

export class NwEMLyme5 extends Item {

  optionKeys = {
    other: 'c'
  }

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Bij welke arts ben je toen geweest?'],
      ]),
    },
    {
      content: new Map([
        ["nl", " (meerdere antwoorden mogelijk)"],
      ]),
      className: "fw-normal"
    },
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'NEL5');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.multipleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Huisarts"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Bedrijfsarts"],
          ])
        },
        MCOptions.cloze({
          key: this.optionKeys.other,
          items: [
            ClozeItemTypes.text({
              key: '1', content: new Map(
                [['nl', "Ander soort arts, namelijk:"]]
              )
            }),
            ClozeItemTypes.textInput({
              key: 'input',
            }),
          ]
        }),
      ],
      customValidations: [
        {
          key: 'NEL5', rule:
            SurveyEngine.logic.or(
              SurveyEngine.multipleChoice.none(this.key, this.optionKeys.other),
              SurveyEngine.logic.and(
                SurveyEngine.multipleChoice.any(this.key, this.optionKeys.other),
                SurveyEngine.hasResponse(this.key, `rg.mcg.${this.optionKeys.other}.input`),
              )
            ),
          type: 'hard'
        }
      ]
    })
  }
}

export class NwEMLyme6 extends Item {
  optionKeys = {
    yes: 'a',
    no: 'b'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'NEL6');

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
        ['nl', 'Was de rode ring of vlek volgens je arts ontstaan door een tekenbeet?'],
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

export class NwEMLyme7 extends Item {

  optionKeys = {
    yes: 'a'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'NEL7');

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
        ['nl', 'Heb je antibiotica voorgeschreven gekregen van je arts?'],
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

export class NwEMLyme8 extends Item {
  optionKeys = {
    name: '2',
    dayCount: '3',
  }

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Welke antibiotica heb je gekregen en hoeveel dagen?'],
      ]),
    },
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'NEL8');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.clozeQuestion({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      items: [
        ClozeItemTypes.text({
          key: '1', content: new Map(
            [['nl', "Naam van het middel:"]]
          )
        }),
        ClozeItemTypes.textInput({
          key: this.optionKeys.name,
        }),
        ClozeItemTypes.clozeLineBreak(),
        ClozeItemTypes.text({
          key: '2', content: new Map(
            [['nl', "Aantal dagen innemen (als je dit niet precies weet mag je dit schatten):"]]
          )
        }),
        ClozeItemTypes.numberInput({
          key: this.optionKeys.dayCount,
          inputLabel: new Map([['nl', 'dagen']]),
          labelBehindInput: true,
          componentProperties: {
            min: 0,
            max: 1000
          }
        }),
        ClozeItemTypes.clozeLineBreak(),
        ClozeItemTypes.text({
          key: '4', content: new Map(
            [['nl', "Overige informatie:"]]
          )
        }),
        ClozeItemTypes.textInput({
          key: '5',
        })
      ],
      customValidations: [
        {
          key: 'MedInfo', rule: SurveyEngine.logic.and(
            //SurveyEngine.hasResponse(this.key, `rg.cloze.${this.optionKeys.name}`),
            SurveyEngine.hasResponse(this.key, `rg.cloze.${this.optionKeys.dayCount}`)
          ), type: 'hard'
        }
      ]

    })
  }
}



//tweede set is voor Lyme
export class NwEMLyme9 extends Item {

  optionKeys = {
    date: 'a'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'NEL9');

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
        ['nl', 'Wanneer ontwikkelde de manifestatie van de ziekte van Lyme zich?'],
      ]),
      responseOptions: [
        SCOptions.cloze({
          key: this.optionKeys.date, items: [
            ClozeItemTypes.text({
              key: '1', content: new Map(
                [['en', "De ziekte van Lyme is begonnen op "]]
              )
            }),
            ClozeItemTypes.dateInput({
              dateInputMode: 'YMD',
              key: '2',
              maxRelativeDate: {
                reference: SurveyEngine.timestampWithOffset({ seconds: 0 }),
                delta: { seconds: 0 }
              },
              minRelativeDate: { delta: { years: -100 } },
            }),
            ClozeItemTypes.text({
              key: '3', content: new Map(
                [['en', "Je mag de datum schatten"]]
              )
            }),
          ],
        }),
        {//disable b if a is selected and disable a if b is selected
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Weet ik niet"],
          ]),
          disabled: SurveyEngine.singleChoice.any(this.itemKey, 'a')
        },
      ]
    })
  }
}

export class NwEMLyme10 extends Item {

  optionKeys = {
    yes: 'a'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'NEL10');

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
        ['nl', 'Ben je bij een arts geweest voor de ziekte van Lyme?'],
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

export class NwEMLyme11 extends Item {

  optionKeys = {
    other: 'c'
  }

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Bij welke arts ben je toen geweest?'],
      ]),
    },
    {
      content: new Map([
        ["nl", " (meerdere antwoorden mogelijk)"],
      ]),
      className: "fw-normal"
    },
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'NEL11');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.multipleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Huisarts"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Bedrijfsarts"],
          ])
        },
        MCOptions.cloze({
          key: this.optionKeys.other,
          items: [
            ClozeItemTypes.text({
              key: '1', content: new Map(
                [['nl', "Ander soort arts, namelijk:"]]
              )
            }),
            ClozeItemTypes.textInput({
              key: 'input',
            }),
          ]
        }),
      ],
      customValidations: [
        {
          key: 'NEL11', rule:
            SurveyEngine.logic.or(
              SurveyEngine.multipleChoice.none(this.key, this.optionKeys.other),
              SurveyEngine.logic.and(
                SurveyEngine.multipleChoice.any(this.key, this.optionKeys.other),
                SurveyEngine.hasResponse(this.key, `rg.mcg.${this.optionKeys.other}.input`),
              )
            ),
          type: 'hard'
        }
      ]
    })
  }
}

export class NwEMLyme12 extends Item {

  optionKeys = {
    yes: 'a'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'NEL12');

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
        ['nl', 'Heb je antibiotica voorgeschreven gekregen van je arts?'],
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

export class NwEMLyme13 extends Item {
  optionKeys = {
    name: '2',
    dayCount: '3',
  }

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Welke antibiotica heb je gekregen en hoeveel dagen?'],
      ]),
    },
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'NEL13');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.clozeQuestion({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      items: [
        ClozeItemTypes.text({
          key: '1', content: new Map(
            [['nl', "Naam van het middel:"]]
          )
        }),
        ClozeItemTypes.textInput({
          key: this.optionKeys.name,
        }),
        ClozeItemTypes.clozeLineBreak(),
        ClozeItemTypes.text({
          key: '2', content: new Map(
            [['nl', "aantal dagen innemen (als je dit niet precies weet mag je dit schatten):"]]
          )
        }),
        ClozeItemTypes.numberInput({
          key: this.optionKeys.dayCount,
          inputLabel: new Map([['nl', 'dagen']]),
          labelBehindInput: true,
          componentProperties: {
            min: 0
          }
        }),
        ClozeItemTypes.clozeLineBreak(),
        ClozeItemTypes.text({
          key: '4', content: new Map(
            [['nl', "overige informatie:"]]
          )
        }),
        ClozeItemTypes.textInput({
          key: '5',
        })
      ],
      customValidations: [
        {
          key: 'MedInfo', rule: SurveyEngine.logic.and(
            SurveyEngine.hasResponse(this.key, `rg.cloze.${this.optionKeys.name}`),
            SurveyEngine.hasResponse(this.key, `rg.cloze.${this.optionKeys.dayCount}`)
          ), type: 'hard'
        }
      ]

    })
  }
}

//derde set is voor multiple lyme
export class NwEMLyme14 extends Item {
  numberRef: Expression;

  constructor(parentKey: string, isRequired: boolean, NEL1NumberRef: Expression) {
    super(parentKey, 'NEL14');

    this.isRequired = isRequired;
    this.condition = SurveyEngine.compare.gt(NEL1NumberRef, 0);
    this.numberRef = NEL1NumberRef;
  }

  buildItem() {
    const cItems: Array<OptionDef> = [];
    Array.from({ length: 5 }).forEach((_, index) => {
      const rowCondition = SurveyEngine.compare.gt(this.numberRef, index);
      cItems.push(ClozeItemTypes.text({
        key: `row_${index + 1}_label`,
        content: new Map(
          [['nl', `${index + 1}. Vorm:`]]
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
        key: `row_${index + 1}_label`,
        content: new Map(
          [['nl', `${index + 1}. Ontstaansdatum (geschat):`]]
        ),
        displayCondition: rowCondition,
      }));
      cItems.push(ClozeItemTypes.dateInput({
        key: `row_${index + 1}_date`,
        displayCondition: rowCondition,
        dateInputMode: 'YMD',
        maxRelativeDate: {
          reference: SurveyEngine.timestampWithOffset({ seconds: 0 }),
          delta: { seconds: 0 }
        }
      }));
      cItems.push(ClozeItemTypes.clozeLineBreak());
      cItems.push(ClozeItemTypes.text({
        key: `row_${index + 1}_label2`,
        content: new Map(
          [['nl', `${index + 1}. Aantal dagen behandeld met antibiotica:`]]
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
*Vul hieronder steeds in welke vorm van de ziekte van Lyme (erythema migrans en/of andere vorm) je hebt gehad. Heb je geen antibiotica behandeling gekregen, vul dan 0 in.*
    `

    return SurveyItems.clozeQuestion({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', "Welke vormen van de ziekte van Lyme heb je gehad? Wanneer waren deze? En hoe zijn ze behandeld?"],
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



