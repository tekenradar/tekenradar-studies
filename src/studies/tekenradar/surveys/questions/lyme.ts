import { Expression } from 'survey-engine/data_types';
import { Group, Item } from 'case-editor-tools/surveys/types';
import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';
import { TickBiteOtherGroup } from './tickBite';
import { PreviousTickBitesGroup } from './prevTickBites'
import { FormerLymeGroup, LymeDiagnosis1, LymeDiagnosis2, LymeTherapy1, LymeTherapy2, LymeTherapy3, LymeTherapy4, LymeTherapy5 } from './diagnosisTherapy'
import { SingleChoiceOptionTypes as SCOptions, MultipleChoiceOptionTypes as MCOptions, ClozeItemTypes } from 'case-editor-tools/surveys';



export class LymeGroup extends Group {

  G1_9: TickBiteOtherGroup;

  //TODO: should header be shown?
  //Lyme questions here
  Q10: LymeDiagnosis1;
  Q11: LymeDiagnosis2;
  Q12: LymeDiagnosis3;
  Q13: LymeDiagnosis4;
  Q14: LymeDiagnosis5;
  Q15: LymeDiagnosis6;
  Q16: LymeDiagnosis7;

  Q17: LymeTherapy1;
  Q18: LymeTherapy2;
  Q19: LymeTherapy3;
  Q20: LymeTherapy4;
  Q21: LymeTherapy5;

  //Previous Tick Bites and former lyme disease at the end
  G22_24: FormerLymeGroup;
  G25_26: PreviousTickBitesGroup;



  constructor(parentKey: string, isRequired?: boolean, condition?: Expression) {
    super(parentKey, 'LymeG');

    this.groupEditor.setCondition(condition);

    const required = isRequired !== undefined ? isRequired : false;

    this.G1_9 = new TickBiteOtherGroup(this.key, isRequired);

    this.Q10 = new LymeDiagnosis1(this.key, required);
    const Q10condition = SurveyEngine.singleChoice.any(this.Q10.key, this.Q10.optionKeys.nameOfOption);
    this.Q11 = new LymeDiagnosis2(this.key, required, Q10condition);
    this.Q12 = new LymeDiagnosis3(this.key, required);
    this.Q13 = new LymeDiagnosis4(this.key, required);
    this.Q14 = new LymeDiagnosis5(this.key, required, Q10condition);

    this.Q15 = new LymeDiagnosis6(this.key, required);
    const Q15condition = SurveyEngine.singleChoice.any(this.Q15.key, this.Q15.optionKeys.nameOfOption);
    this.Q16 = new LymeDiagnosis7(this.key, required, Q15condition);

    this.Q17 = new LymeTherapy1(this.key, required);
    const Q17conditionTabletten = SurveyEngine.singleChoice.any(this.Q17.key, this.Q17.optionKeys.nameOfOptionTabletten);
    const Q17conditionInfuus = SurveyEngine.singleChoice.any(this.Q17.key, this.Q17.optionKeys.nameOfOptionInfuus);
    const Q17conditionAnyMed = SurveyEngine.singleChoice.any(this.Q17.key, this.Q17.optionKeys.nameOfOptionTabletten, this.Q17.optionKeys.nameOfOptionInfuus);
    this.Q18 = new LymeTherapy2(this.key, required, Q17conditionTabletten);
    this.Q19 = new LymeTherapy3(this.key, required, Q17conditionInfuus);


    this.Q20 = new LymeTherapy4(this.key, required, Q17conditionAnyMed);
    const Q20condition = SurveyEngine.singleChoice.any(this.Q20.key, this.Q20.optionKeys.nameOfOption);
    this.Q21 = new LymeTherapy5(this.key, required, Q20condition);

    this.G22_24 = new FormerLymeGroup(this.key, isRequired);
    this.G25_26 = new PreviousTickBitesGroup(this.key, isRequired);

  }

  buildGroup() {

    this.addItem(this.G1_9.get());

    this.addItem(this.Q10.get());
    this.addItem(this.Q11.get());
    this.addItem(this.Q12.get());
    this.addItem(this.Q13.get());
    this.addItem(this.Q14.get());
    this.addItem(this.Q15.get());
    this.addItem(this.Q16.get());
    this.addPageBreak();

    this.addItem(this.Q17.get());
    this.addItem(this.Q18.get());
    this.addItem(this.Q19.get());
    this.addItem(this.Q20.get());
    this.addItem(this.Q21.get());
    this.addPageBreak();

    this.addItem(this.G22_24.get());
    this.addItem(this.G25_26.get());
    this.addPageBreak();


  }
}


export class LymeDiagnosis3 extends Item {

  qTextLyme = new Map([
    ['nl', 'Welke klachten door de ziekte van Lyme heb/had je? Geef hier een uitgebreide beschrijving van je klachten en vermeld hierbij ook hoe dit bij jou is vastgesteld, bijvoorbeeld door middel van een ruggeprik, huidbiopt of bloedafname.'],
  ])

  qTextFollowUp = new Map([
    ['nl', 'Welke nieuwe klachten door de ziekte van Lyme heeft/had je? Geef hier een uitgebreide beschrijving van je klachten en vermeld hierbij ook hoe dit bij jou is vastgesteld, bijvoorbeeld door middel van een ruggeprik, huidbiopt of bloedafname.'],
  ])

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'LD3');

    this.isRequired = isRequired;
    this.condition = condition;
  }
  //TODO: size of text input field?
  buildItem() {
    return SurveyItems.multilineTextInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.isPartOf("Followupflow") ? this.qTextFollowUp : this.qTextLyme,
    })
  }
}

export class LymeDiagnosis4 extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'LD4');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {//TODO: check if it works woth MCOptions questions too!!
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
                [['en', "Datum"]]
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
            ClozeItemTypes.text({
              key: '3', content: new Map(
                [['en', "bij benadering"]]
              )
            }),
          ],
          //TODO: how to disable option of cloze type?
          //disabled: SurveyEngine.multipleChoice.any(this.itemKey,'b'),
        }),
        {//disable b if a is selected and disable a if b is selected
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Weet niet"],
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
      questionText: new Map([
        ['nl', 'Wanneer heeft de arts deze uiting van de ziekte van Lyme bij jou vastgesteld?'],
      ]),
      responseOptions: [
        SCOptions.cloze({
          key: 'a', items: [
            ClozeItemTypes.text({
              key: '1', content: new Map(
                [['en', "Datum"]]
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
            ClozeItemTypes.text({
              key: '3', content: new Map(
                [['en', "bij benadering"]]
              )
            }),
          ],
        }),
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Weet niet"],
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

  optionKeys = {
    nameOfOption: 'a'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'LD6');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.isPartOf("Followupflow") ? this.qTextFollowUp : this.qTextLyme,
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

