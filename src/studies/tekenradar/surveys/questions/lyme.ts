import { Expression } from 'survey-engine/data_types';
import { Item } from 'case-editor-tools/surveys/types';
import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';
import { SingleChoiceOptionTypes as SCOptions, MultipleChoiceOptionTypes as MCOptions, ClozeItemTypes } from 'case-editor-tools/surveys';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';
import { surveyCategoryNames, SurveySuffix } from '../globalConstants';



export class LymeHeader extends Item {

  markdownContent = `
# Ziekte van Lyme

De volgende vragen gaan over je melding van de ziekte van Lyme.
    `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'LymeH');

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


/* export class LymeDiagnosis3 extends Item {

  qTextLyme = new Map([
    ['nl', 'Welke klachten door de ziekte van Lyme heb/had je? Geef hier een uitgebreide beschrijving van je klachten en vermeld hierbij ook hoe dit bij jou is vastgesteld, bijvoorbeeld door middel van een ruggeprik, huidbiopt of bloedafname.'],
  ])

  qTextFollowUp = new Map([
    ['nl', 'Welke nieuwe klachten door de ziekte van Lyme heeft/had je? Geef hier een uitgebreide beschrijving van je klachten en vermeld hierbij ook hoe dit bij jou is vastgesteld, bijvoorbeeld door middel van een ruggeprik, huidbiopt of bloedafname.'],
  ])


  qTextFollowUpKids = new Map([
    ['nl', 'Welke nieuwe klachten door de ziekte van Lyme zijn of waren er. Geef hier een uitgebreide beschrijving van de klachten en vermeld hierbij ook hoe dit is vastgesteld, bijvoorbeeld door middel van een ruggeprik, huidbiopt of bloedafname.'],
  ])

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'LD3');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  //TODO: size of text input field?
  buildItem() {
    let text = this.qTextLyme;
    if (
      this.isPartOf(surveyCategoryNames.T3) ||
      this.isPartOf(surveyCategoryNames.T6) ||
      this.isPartOf(surveyCategoryNames.T9) ||
      this.isPartOf(surveyCategoryNames.T12)
    ) {
      if (this.isPartOf(SurveySuffix.Kids)) {
        text = this.qTextFollowUpKids;
      } else {
        text = this.qTextFollowUp;
      }
    }

    return SurveyItems.multilineTextInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: text,
    })
  }
}
*/

/*
export class LymeDiagnosis3alt extends Item {
  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'LD3alt');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.multipleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      helpGroupContent: this.getHelpGroupContent(),
      questionText: new Map([
        ['nl', 'Geef aan of u één of meer van de volgende klachten heeft (meerdere antwoorden mogelijk):'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Een dik, warm, pijnlijk of rood gewricht, bijvoorbeeld de knie? (Lymeartritis)"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Krachtsverlies of verlamming in uw gezicht, krachtsverlies of verlamming van een arm of been of uitstralende pijn in een arm of been (Neuroborreliose)"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "Een lang bestaande huidafwijking aan bijvoorbeeld een arm of been, waarbij de huid rood of paars is verkleurd en mogelijk ook dunner is geworden (Acrodermatitis chronica atrophicans (ACA))"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "Meerdere rode ringen of vlekken op de huid (Multiple erythema migrans)"],
          ])
        },
        {
          key: 'e', role: 'option',
          content: new Map([
            ["nl", "Een andere kenmerkende vorm van Lymeziekte die door een medisch specialist is vastgesteld (andere vormen, klik op de knop met een vraagteken voor meer info)"],
          ])
        },
        {
          key: 'f', role: 'option',
          content: new Map([
            ["nl", "Dit heb ik allemaal niet"],
          ])
        },
      ]
    })
  }


getHelpGroupContent() {
    return [
      {
        content: new Map([
           ["nl", "Vormen van klachten"],
          ]),
        style: [{ key: 'variant', value: 'h5' }],
      },
      {
        content: new Map([
          ["nl", "Andere vormen/manifestaties: zoals Borrelia-lymfocytoom, lymecarditis, uveïtis, panophthalmitis, hepatitis, myositis en orchitis (uit de CBO richtlijn 2013)"],
        ]),
        style: [{ key: 'variant', value: 'p' }],
      },
    ]
  }
}
*/

export class LymeDiagnosis3alt extends Item {
  optionKeys = {
    none: 'x',
  }

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Welk lichaamsdeel is aangedaan door lymeziekte? Je kunt per lichaamsdeel meerdere antwoorden aanklikken. '],
      ]),
    },
        {
      content: new Map([
        ["nl", "(Als het juiste lichaamsdeel er voor jou niet tussen staat, kun je dit ook aangeven.)"],
      ]),
      className: "fw-normal"
    },
  ]


  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'LymeDiagnosis3alt');

    this.isRequired = isRequired;
    this.condition = condition;

  }

  buildItem() {
    const optionDisabled = SurveyEngine.multipleChoice.any(this.key, this.optionKeys.none);

    /*const currentYear = new Date().getFullYear(); // Get the current year dynamically
    const
      years =
        Array.from({
          length:
            17
        }, (v,
          k) => (currentYear
            -
            k).toString());*/


    return SurveyItems.multipleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      responseOptions: [
        {
          key: 't1', role: 'text',
          style: [{ key: 'className', value: 'fw-bold mb-2' }],
          content: new Map([
            ["nl", "Arm of been (meerdere antwoorden mogelijk)"],
          ])
        },
        {
          key: 'aa', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Ik heb een rode of paarse vlek die geleidelijk groter wordt."],
          ])
        },
        {
          key: 'ab', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Ik heb rode of paarse vlek die er al langere tijd zit. Soms wordt de huid ook dun en kwetsbaar, of begint deze te schilferen."],
          ])
        },
        {
          key: 'ac', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Ik heb verschillende rode of paarse vlekken en een arts denkt dat deze door lymeziekte komen."],
          ])
        },
        {
          key: 'ad', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Een gewricht (zoals knie, enkel, elleboog of pols) voelt warmer aan dan andere gewrichten."],
          ])
        },
        {
          key: 'ae', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Een gewricht is dik en gezwollen in vergelijking met normaal."],
          ])
        },
        {
          key: 'af', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Een gewricht ziet er rood uit."],
          ])
        },
        {
          key: 'ag', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Een gewricht doet pijn."],
          ])
        },
        {
          key: 'ah', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Ik heb schietende pijn door mijn arm of been heen."],
          ])
        },
        {
          key: 'ai', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Ik heb minder kracht dan normaal in mijn arm of been."],
          ])
        },
        {
          key: 'aj', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Ik kan mijn arm of been helemaal niet meer bewegen (verlamming). "],
          ])
        },
        {
          key: 'ak', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Ik heb een doof of tintelend gevoel in een arm of been."],
          ])
        },
        {
          key: 'al', role: 'input',
          disabled: optionDisabled,
          style: [{ key: 'maxLength', value: '500' }],
          content: new Map([
            ["nl", "Anders, namelijk"],
          ])
        },
        {
          key: 't2', role: 'text',
          style: [{ key: 'className', value: 'fw-bold mb-2' }],
          content: new Map([
            ["nl", "Huid (meerdere antwoorden mogelijk)"],
          ])
        },
        {
          key: 'ba', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Ik heb een rode of paarse vlek die geleidelijk groter wordt."],
          ])
        },
        {
          key: 'bb', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Ik heb een rode of paarse vlek die er al langere tijd zit. Soms wordt de huid ook dun en kwetsbaar, of begint deze te schilferen. "],
          ])
        },
        {
          key: 'bc', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Ik heb verschillende rode of paarse vlekken en een arts denkt dat deze door lymeziekte komen."],
          ])
        },
        {
          key: 'bd', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Ik heb een paars, blauw of rood knobbeltje op mijn oor, bij mijn tepel of bij mannen op de balzak."],
          ])
        },
        {
          key: 'be', role: 'input',
          disabled: optionDisabled,
          style: [{ key: 'maxLength', value: '500' }],
          content: new Map([
            ["nl", "Anders, namelijk"],
          ])
        },
        {
          key: 't3', role: 'text',
          style: [{ key: 'className', value: 'fw-bold mb-2' }],
          content: new Map([
            ["nl", "Gezicht (meerdere antwoorden mogelijk)"],
          ])
        },
        {
          key: 'ca', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Ik heb minder kracht in één helft van mijn gezicht. Ik kan bijvoorbeeld mijn oog niet goed sluiten aan één kant, of één mondhoek hangt naar beneden."],
          ])
        },
        {
          key: 'cb', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Ik zie wazig, of ik zie sterretjes."],
          ])
        },
        {
          key: 'cc', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Mijn oog is rood en ontstoken, of doet pijn."],
          ])
        },
        {
          key: 'cd', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Ik heb een rode of paarse vlek die geleidelijk groter wordt."],
          ])
        },
        {
          key: 'ce', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Ik heb een rode of paarse vlek die er al langere tijd zit. Soms wordt de huid ook dun en kwetsbaar, of begint deze te schilferen."],
          ])
        },
        {
          key: 'cf', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Ik heb verschillende rode of paarse vlekken en een arts denkt dat deze door lymeziekte komen."],
          ])
        },
        {
          key: 'cg', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Ik heb een paars, blauw of rood knobbeltje op mijn oor."],
          ])
        },
        {
          key: 'ch', role: 'input',
          disabled: optionDisabled,
          style: [{ key: 'maxLength', value: '500' }],
          content: new Map([
            ["nl", "Anders, namelijk"],
          ])
        },
        {
          key: 't4', role: 'text',
          style: [{ key: 'className', value: 'fw-bold mb-2' }],
          content: new Map([
            ["nl", "Hart (meerdere antwoorden mogelijk)"],
          ])
        },
        {
          key: 'da', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Ik heb last van duizeligheid en een arts denkt dat dit door lymeziekte komt."],
          ])
        },
        {
          key: 'db', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Ik heb last van het gevoel dat ik bijna flauwval of ik val ook echt flauw. Een arts denkt dat dit door lymeziekte komt."],
          ])
        },
        {
          key: 'dc', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Ik heb last van kortademigheid en een arts denkt dat dit door lymeziekte komt."],
          ])
        },
        {
          key: 'dd', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Ik heb last van hartkloppingen en een arts denkt dat dit door lymeziekte komt."],
          ])
        },
        {
          key: 'de', role: 'option',
          disabled: optionDisabled,
          content: new Map([
            ["nl", "Ik heb soms pijn op de borst en een arts denkt dat dit door lymeziekte komt."],
          ])
        },
        {
          key: 'df', role: 'input',
          disabled: optionDisabled,
          style: [{ key: 'maxLength', value: '500' }],
          content: new Map([
            ["nl", "Anders, namelijk"],
          ])
        },
      ]
    })
  }
}



export class LymeDiagnosis4 extends Item {

  optionKeys = {
    date: 'a'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'LD4');

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
        ['nl', 'Wanneer zijn deze klachten door de ziekte van Lyme ontstaan?'],
      ]),
      responseOptions: [
        MCOptions.cloze({
          key: this.optionKeys.date, items: [
            ClozeItemTypes.text({
              key: '1', content: new Map(
                [['en', "De klachten door de ziekte van Lyme zijn onstaan op "]]
              )
            }),
            ClozeItemTypes.dateInput({
              dateInputMode: 'YMD',
              key: '2',
              maxRelativeDate: {
                reference: SurveyEngine.timestampWithOffset({ seconds: 0 }),
                delta: { seconds: 0 }
              }
            }),
            ClozeItemTypes.clozeLineBreak(),
            ClozeItemTypes.text({
              key: '3', content: new Map(
                [['en', "Dit is de "]]
              )
            }),
            ClozeItemTypes.dropDown({
              key: '4', options: [
                SCOptions.option('1', new Map([['nl', "precieze"]])),
                SCOptions.option('2', new Map([['nl', "geschatte"]]))
              ]
            }),
            ClozeItemTypes.text({
              key: '5',
              content: new Map(
                [['nl', " datum."]]
              )
            }),
          ],
        }),
        {//disable b if a is selected and disable a if b is selected
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Weet ik niet"],
          ]),
          disabled: SurveyEngine.multipleChoice.any(this.itemKey, 'a')
        },
        {
          key: 'c', role: 'input',
          content: new Map([
            ["nl", "Opmerkingen"],
          ])
        },
      ],
      customValidations: [
        {
          key: 'LD4', rule: SurveyEngine.logic.or(
            SurveyEngine.multipleChoice.none(this.key, this.optionKeys.date),
            SurveyEngine.logic.and(
              SurveyEngine.hasResponse(this.key, `rg.mcg.${this.optionKeys.date}.2`),
              SurveyEngine.hasResponse(this.key, `rg.mcg.${this.optionKeys.date}.4`),
            )
          ), type: 'hard'
        }
      ]
    })
  }
}


export class LymeDiagnosis5 extends Item {

  optionKeys = {
    date: 'a'
  }

  qTextMain = new Map([
    ['nl', 'Wanneer heeft de arts deze uiting van de ziekte van Lyme bij jou vastgesteld?'],
  ])


  qTextKids = new Map([
    ['nl', 'Wanneer heeft de arts deze uiting van de ziekte van Lyme vastgesteld?'],
  ])


  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'LD5');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.isPartOf("Followupflow_Kids") ? this.qTextKids : this.qTextMain,
      responseOptions: [
        SCOptions.cloze({
          key: this.optionKeys.date, items: [
            ClozeItemTypes.text({
              key: '1', content: new Map(
                [['en', "De arts heeft de uiting van de ziekte van Lyme bij mij vastgesteld op "]]
              )
            }),
            ClozeItemTypes.dateInput({
              dateInputMode: 'YMD',
              key: '2',
              maxRelativeDate: {
                reference: SurveyEngine.timestampWithOffset({ seconds: 0 }),
                delta: { seconds: 0 }
              }
            }),
            ClozeItemTypes.clozeLineBreak(),
            ClozeItemTypes.text({
              key: '3', content: new Map(
                [['en', "Dit is de "]]
              )
            }),
            ClozeItemTypes.dropDown({
              key: '4', options: [
                SCOptions.option('1', new Map([['nl', "exacte"]])),
                SCOptions.option('2', new Map([['nl', "geschatte"]]))
              ]
            }),
            ClozeItemTypes.text({
              key: '5',
              content: new Map(
                [['nl', " datum."]]
              )
            }),
          ],
        }),
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Weet ik niet"],
          ])
        },
      ],
      customValidations: [
        {
          key: 'LD5', rule: SurveyEngine.logic.or(
            SurveyEngine.singleChoice.none(this.key, this.optionKeys.date),
            SurveyEngine.logic.and(
              SurveyEngine.hasResponse(this.key, `rg.scg.${this.optionKeys.date}.2`),
              SurveyEngine.hasResponse(this.key, `rg.scg.${this.optionKeys.date}.4`),
            )
          ), type: 'hard'
        }
      ]
    })
  }
}


export class LymeDiagnosis6 extends Item {


  qTextLyme = new Map([
    ['nl', 'Heb je op dit moment nog klachten door de ziekte van Lyme?'],
  ])

  qTextFollowUp = new Map([
    ['nl', 'Heb je op dit moment nog klachten door deze nieuwe uiting van de ziekte van Lyme?'],
  ])

  qTextFollowUpKids = new Map([
    ['nl', 'Zijn er op dit moment nog klachten door deze nieuwe uiting van de ziekte van Lyme?'],
  ])

  optionKeys = {
    yes: 'a'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'LD6');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    let text = this.qTextLyme;
    if (
      this.isPartOf(surveyCategoryNames.T3) ||
      this.isPartOf(surveyCategoryNames.T6) ||
      this.isPartOf(surveyCategoryNames.T9) ||
      this.isPartOf(surveyCategoryNames.T12)
    ) {
      if (this.isPartOf(SurveySuffix.Kids)) {
        text = this.qTextFollowUpKids;
      } else {
        text = this.qTextFollowUp;
      }
    }

    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: text,
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


export class LymeDiagnosis7 extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'LD7');

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
        ['nl', 'Ben je hiervoor in een ziekenhuis opgenomen?'],
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

