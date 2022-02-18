import { Expression } from 'survey-engine/data_types';
import { Group, Item } from 'case-editor-tools/surveys/types';
import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';
import { TickBiteOtherGroup } from './tickBite';
import { Doctor, FormerLymeGroup, LymeTherapy1, LymeTherapy2, LymeTherapy4, LymeTherapy5 } from './diagnosisTherapy';
import { PreviousTickBitesGroup } from './prevTickBites';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';
import { SingleChoiceOptionTypes as SCOptions, ClozeItemTypes } from 'case-editor-tools/surveys';
import { EMSizeExample } from './images';



export class EMGroup extends Group {

  G1_9: TickBiteOtherGroup;
  Q10: EM1;
  Q11: EM2;

  Q12: EM3;
  Q13: DoctorEM;
  Q14: Doctor;
  Q15: EM4;

  Q16: LymeTherapy1;
  Q17: LymeTherapy2;
  Q18: LymeTherapy4;
  Q19: LymeTherapy5;

  G20_22: FormerLymeGroup;
  G23_24: PreviousTickBitesGroup;

  T1: PhotoEM_Text;

  //TODO: example photo and photo upload Here


  constructor(parentKey: string, isRequired?: boolean, condition?: Expression) {
    super(parentKey, 'EMG');

    this.groupEditor.setCondition(condition);

    const required = isRequired !== undefined ? isRequired : false;

    this.G1_9 = new TickBiteOtherGroup(this.key, isRequired);
    this.Q10 = new EM1(this.key, required);
    //TODO: if date more than 3 months ago, exclusion from lyme studies by setting flag
    this.Q11 = new EM2(this.key, required);
    //TODO: if option b from EM2 is selected, exclusion from lyme studies by setting flag
    this.Q12 = new EM3(this.key, required);
    //TODO: if EM < 5cm, exclusion from lyme studies by setting flag
    this.Q13 = new DoctorEM(this.key, required);
    const Q13condition = SurveyEngine.singleChoice.any(this.Q13.key, this.Q13.optionKeys.yes);

    this.Q14 = new Doctor(this.key, required, Q13condition);
    this.Q15 = new EM4(this.key, required, Q13condition);
    //TODO: if b from EM4 is selected, exclusion from lyme studies by setting flag

    this.Q16 = new LymeTherapy1(this.key, required);
    ////TODO: if b from LymeTherapy1 is selected, exclusion from lyme studies by setting flag
    const Q16condition = SurveyEngine.singleChoice.any(this.Q16.key, this.Q16.optionKeys.Tabletten);
    this.Q17 = new LymeTherapy2(this.key, required, Q16condition);
    this.Q18 = new LymeTherapy4(this.key, required, Q16condition);
    const Q18condition = SurveyEngine.singleChoice.any(this.Q18.key, this.Q18.optionKeys.yes);
    this.Q19 = new LymeTherapy5(this.key, required, Q18condition);

    this.G20_22 = new FormerLymeGroup(this.key, isRequired);
    this.G23_24 = new PreviousTickBitesGroup(this.key, isRequired);

    this.T1 = new PhotoEM_Text(this.key, required);

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
    this.addItem(this.Q17.get());
    this.addItem(this.Q18.get());
    this.addItem(this.Q19.get());

    this.addItem(this.G20_22.get());
    this.addItem(this.G23_24.get());

    this.addItem(this.T1.get());
    //TODO: upload photo text and example photo here.

  }
}


export class ReportHeader extends Item {

  markdownContent = `
# Melding
  `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'RepHeader');

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



export class EMTextKids extends Item {

  markdownContent = `
# Melding

De vragen hieronder zijn voor een minderjarige.

Ben je een ouder/verzorger dan kun je de antwoorden invullen voor/over je kind.
  `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'EMTextK');

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


export class EMHeader extends Item {

  markdownContent = `
# Erythema migrans

De volgende vragen gaan over je melding van erythema migrans.
  `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'EMHeader');

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

export class EMHeaderKids extends Item {

  markdownContent = `
# Erythema migrans

De vragen hieronder zijn voor een minderjarige. Ben je de ouder/verzorger dan kun je de antwoorden invullen voor/over je kind.
  `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'EMHeaderKids');

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



//TODO: change name of questions
export class EM1 extends Item {


  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'EM1');

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
        ['nl', 'Wanneer ontwikkelde zich de erythema migrans die je nu meldt?'],
      ]),
      responseOptions: [
        //TODO: correct date conditions and date field smaller.
        SCOptions.cloze({
          key: 'a', items: [
            ClozeItemTypes.text({
              key: '1', content: new Map(
                [['nl', "De erythema migrans ontwikkelde zich op"]]
              )
            }),
            ClozeItemTypes.dateInput({
              dateInputMode: 'YMD',
              key: '2',
            }),
            ClozeItemTypes.clozeLineBreak(),
            ClozeItemTypes.text({
              key: '3',
              content: new Map(
                [['nl', "Dit is de "]]
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
          ]
        }),
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Onbekend"],
          ])
        },
      ]
    })
  }
}


export class EM2 extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'EM2');

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
        ['nl', 'Is de erythema migrans op dit moment nog zichtbaar?'],
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



export class EM3 extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'EM3');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {//NOTE: input instead of dropdown
    return SurveyItems.numericInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Hoe groot is de erythema migrans?'],
      ]),
      questionSubText: new Map([
        ['nl', 'Meet hiervoor de doorsnede van de vlek, zie het voorbeeld op de foto. Als de EM niet meer zichtbaar is, maak dan een zo goed mogelijke schatting.'],
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
<img src="${EMSizeExample}" width="100%" style="max-width: 500px"/>
            `]
          ])
        })
      ]
    })
  }
}



export class DoctorEM extends Item {

  optionKeys = {
    yes: 'a'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'EM4');

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
        ['nl', 'Ben je bij een arts geweest voor je erythema migrans?'],
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



export class EM4 extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'EM6');

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


export class PhotoEM_Text extends Item {

  markdownContent = `
## Uploaden foto

Wij vragen je om een foto van je  erythema migrans of andere huidafwijking door de ziekte van Lyme. Mocht je nu geen foto kunnen uploaden, dan ontvang je een herinnering per email om dat later alsnog te doen.\
Heb je geen huidafwijking door de ziekte van Lyme dan kun je deze vragenlijst overslaan.

Om een goed beeld te krijgen van de schaal van de foto stellen wij het zeer op prijs als er een lineaal of meetlint (of een voorwerp met een standaard grootte zoals bijvoorbeeld een muntstuk) naast de huidafwijking op de foto staat. Zie de voorbeeld foto.

<img src="${EMSizeExample}" width="100%" style="max-width: 500px"/>
`

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'PhotoEMT');

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


//TODO Peter: upload function photo here
export class UploadPhotoEM extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'PhotoEM');

    this.isRequired = isRequired;
    this.condition = condition;
  }
  buildItem() {
    return SurveyItems.customQuestion({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Selecteer hier de foto van je erythema migrans of andere huidafwijking'],
      ]),
      responseItemDefs: [
        {
          key: 'file', role: 'file', mapToRole: 'input',
        }
      ]
    })
  }
}
