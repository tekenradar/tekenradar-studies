import { Expression, SurveySingleItem } from 'survey-engine/data_types';
import { Item } from 'case-editor-tools/surveys/types';
import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';
import { SingleChoiceOptionTypes as SCOptions, ClozeItemTypes } from 'case-editor-tools/surveys';


export class IntroPDiff extends Item {

  markdownContent = `
### Melding doen

Vul onderstaande vragen in over je tekenbeet, rode ring of vlek, andere vorm van de ziekte van Lyme, of koorts na een tekenbeet.

Je kunt je hieronder ook aanmelden om voortaan elke week door te geven of je tekenbeten hebt gehad.

Je kunt de vragen ook invullen over je kind.

Wat wil je precies melden? Vragen met een "*" zijn verplicht.
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
    yes: 'a',
    no: 'b',
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'D1');

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


export class FeverTickBite extends Item {
  optionKeys = {
    yes: 'a'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'D2');

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
        ['nl', 'Heb je binnen vier weken na de tekenbeet gemeten koorts van 38,0 graden of hoger gehad?'],
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
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "Nee, nog niet, maar er zijn nog geen 4 weken verstreken sinds de tekenbeet"],
          ])
        },
      ]
    })
  }
}


export class EMTextPDiff extends Item {

  markdownContent = `

##### Een "erythema migrans" is een **uitbreidende rode ring of vlek** rond de plek van een tekenbeet. Het is vaak het eerste signaal van de ziekte van Lyme.

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
  optionKeys = {
    yes: 'a',
    no: 'b'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'D3');

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



export class LymeTickBite1 extends Item {
  optionKeys = {
    yes: 'a',
    no: 'b',
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'D4');

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


export class LymeTickBite2 extends Item {
  optionKeys = {
    fever: 'a',
    posTest: 'b',
    andere: 'c',
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'D5');

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
          key: this.optionKeys.fever, role: 'option',
          content: new Map([
            ["nl", "Koorts"],
          ])
        },
        {
          key: this.optionKeys.posTest, role: 'option',
          content: new Map([
            ["nl", "Een positieve bloedtest voor de ziekte van Lyme"],
          ])
        },
        {
          key: this.optionKeys.andere, role: 'option',
          content: new Map([
            ["nl", "Een andere vorm van de ziekte van Lyme"],
          ])
        },
      ]
    })
  }
}


export class MedicationLyme extends Item {
  optionKeys = {
    yes: {
      option: 'a',
      dateInput: 'date',
    },
    startSoon: 'b',
    no: 'c'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'D6');

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
          key: this.optionKeys.yes.option,
          items: [
            ClozeItemTypes.text({
              key: '1', content: new Map(
                [['nl', "Ja, ik ben gestart op"]]
              )
            }),//NOTE: filling in date is NOT mandatory to avoid getting stuck due to forgotten date
            ClozeItemTypes.dateInput({
              dateInputMode: 'YMD',
              key: this.optionKeys.yes.dateInput,
              maxRelativeDate: {
                reference: SurveyEngine.timestampWithOffset({ seconds: 0 }),
                delta: { seconds: 0 }
              }
            }),
            ClozeItemTypes.text({
              key: '2', content: new Map(
                [['nl', "Dit is de "]]
              )
            }),
            ClozeItemTypes.dropDown({
              key: 'dropdown', options: [
                SCOptions.option('1', new Map([['nl', "precieze"]])),
                SCOptions.option('2', new Map([['nl', "geschatte"]]))
              ]
            }),
            ClozeItemTypes.text({
              key: '3', content: new Map(
                [['nl', " datum."]]
              )
            }),
          ]
        }),
        //optionProps: {
        //  max: { dtype: 'exp', exp: SurveyEngine.timestampWithOffset({seconds: 0}) }
        //}
        {
          key: this.optionKeys.startSoon, role: 'option',
          content: new Map([
            ["nl", "Nee, maar ik start binnenkort met de behandeling"],
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



export class WeeklyFlowPretext extends Item {
  constructor(parentKey: string,) {
    super(parentKey, 'WFPDiffPretext');
  }

  markdownContent = `
##### We willen graag weten hoeveel tekenbeten mensen oplopen.
##### Daarom zoeken wij mensen die ons wekelijks laten weten of ze tekenbeten hebben gehad. Dit duurt minder dan een minuut.
##### Ook als je géén tekenbeet hebt gehad is het nuttig om door te geven.
`

  buildItem(): SurveySingleItem {
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


export class SurveyValidationText extends Item {
  constructor(parentKey: string, condition: Expression) {
    super(parentKey, 'Vtext');
    this.condition = condition;
  }

  markdownContent = `
#### Je kunt geen melding doen, omdat je hebt aangegeven dat je geen tekenbeet, rode ring of vlek, of andere vorm van de ziekte van Lyme hebt, en ook niet wekelijks tekenbeten wilt doorgeven.

#### Voor vragen kun je een e-mail sturen naar info@tekenradar.nl.
`

  buildItem(): SurveySingleItem {
    return SurveyItems.display({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      content: [
        ComponentGenerators.markdown({
          content: new Map([
            ["nl", this.markdownContent],
          ]),
          className: 'text-danger'
        })
      ]
    })
  }

}

export class FlowStartText extends Item {
  EMFlowActive: Expression;
  FeverFlowActive: Expression;
  LBFlowActive: Expression;
  ChronicflowActive: Expression;

  constructor(parentKey: string, conditions: {
    showItem: Expression,
    EMFlowActive: Expression,
    FeverFlowActive: Expression,
    LBFlowActive: Expression,
    ChronicflowActive: Expression,
  }) {
    super(parentKey, 'StartText');
    this.condition = conditions.showItem;

    this.EMFlowActive = conditions.EMFlowActive;
    this.FeverFlowActive = conditions.FeverFlowActive;
    this.LBFlowActive = conditions.LBFlowActive;
    this.ChronicflowActive = conditions.ChronicflowActive;
  }

  markdownContentEMFlow = `
### Erythema migrans melden

Een “erythema migrans” is een uitbreidende rode ring of vlek rond de plek van een tekenbeet. Het is vaak het eerste signaal van de ziekte van Lyme.

Klik hieronder op "Opslaan en verder gaan".
Daarna kun je een account aanmaken of inloggen met een bestaande account.
Met een account kun je deze melding afronden, en als je dat hierboven hebt aangegeven wekelijks aan ons melden of je tekenbeten hebt gehad. In je account krijg je een overzicht van je meldingen. Je e-mailadres wordt niet voor andere doeleinden gebruikt.
`

  markdownContentFeverFlow = `
### Tekenbeet melden

Klik hieronder op "Opslaan en verder gaan".
Daarna kun je een account aanmaken of inloggen met een bestaande account.
Met een account kun je deze melding afronden, en als je dat hierboven hebt aangegeven wekelijks aan ons melden of je tekenbeten hebt gehad. In je account krijg je een overzicht van je meldingen. Je e-mailadres wordt niet voor andere doeleinden gebruikt.
`

  markdownContentLBFlow = `
### Ziekte van Lyme melden

Klik hieronder op "Opslaan en verder gaan".
Daarna kun je een account aanmaken of inloggen met een bestaande account.
Met een account kun je deze melding afronden, en als je dat hierboven hebt aangegeven wekelijks aan ons melden of je tekenbeten hebt gehad. In je account krijg je een overzicht van je meldingen. Je e-mailadres wordt niet voor andere doeleinden gebruikt.
`

  markdownContentChronicFlow = `
### Ziekte van Lyme melden

Klik hieronder op "Opslaan en verder gaan".
Daarna kun je een account aanmaken of inloggen met een bestaande account.
Met een account kun je deze melding afronden, en als je dat hierboven hebt aangegeven wekelijks aan ons melden of je tekenbeten hebt gehad. In je account krijg je een overzicht van je meldingen. Je e-mailadres wordt niet voor andere doeleinden gebruikt.
`

  buildItem(): SurveySingleItem {
    return SurveyItems.display({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      content: [
        ComponentGenerators.markdown({
          content: new Map([
            ["nl", this.markdownContentEMFlow],
          ]),
          displayCondition: this.EMFlowActive,
        }),
        ComponentGenerators.markdown({
          content: new Map([
            ["nl", this.markdownContentFeverFlow],
          ]),
          displayCondition: this.FeverFlowActive,
        }),
        ComponentGenerators.markdown({
          content: new Map([
            ["nl", this.markdownContentLBFlow],
          ]),
          displayCondition: this.LBFlowActive,
        }),
        ComponentGenerators.markdown({
          content: new Map([
            ["nl", this.markdownContentChronicFlow],
          ]),
          displayCondition: this.ChronicflowActive,
        }),
      ]
    })
  }
}


export class WeeklyFlow extends Item {
  optionKeys = {
    yes: 'a',
    no: 'b',
    alreadyDoing: 'c',
  }
  extraValidationRules: Expression[];

  constructor(parentKey: string, isRequired: boolean, extraValidationRules: Expression[]) {
    super(parentKey, 'D7');

    this.isRequired = isRequired;
    this.extraValidationRules = extraValidationRules;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Wil je wekelijks doorgeven hoeveel tekenbeten je hebt gehad?'],
      ]),
      questionSubText: new Map([
        ['nl', 'Hiervoor kun je een account aanmaken na klikken op "Opslaan en verder gaan" onderaan deze pagina.'],
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
        {
          key: this.optionKeys.alreadyDoing, role: 'option',
          content: new Map([
            ["nl", "Ik doe al mee met het wekelijks tekenbeet melden "],
          ])
        },
      ],
      customValidations: [
        {
          key: 'pdiff', rule: SurveyEngine.logic.or(
            ...this.extraValidationRules,
            SurveyEngine.singleChoice.none(this.key, this.optionKeys.no)
          ), type: 'hard'
        }
      ]
    })
  }
}

export class UserVerificationQuestion extends Item {
  constructor(parentKey: string, isRequired: boolean, condition: Expression) {
    super(parentKey, 'UV');
    this.condition = condition;
    this.isRequired = isRequired;
  }

  buildItem() {
    return SurveyItems.customQuestion({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Controlevraag'],
      ]),
      questionSubText: new Map([
        ['nl', 'Dit is een controlevraag om te bevestigen dat je geen robot bent. Typ het juiste antwoord in het antwoordveld hieronder.'],
      ]),
      responseItemDefs: [
        {
          key: 'uv', role: 'userVerification', mapToRole: 'input',
        }
      ]
    })
  }
}
