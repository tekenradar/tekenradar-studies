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


export class LymeDiagnosis3 extends Item {

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

export class LymeDiagnosis4 extends Item {

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
          key: 'a', items: [
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
      ]
    })
  }
}


export class LymeDiagnosis5 extends Item {

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
          key: 'a', items: [
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

