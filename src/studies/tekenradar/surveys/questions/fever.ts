import { Expression } from 'survey-engine/lib/data_types';
import { Group, Item } from 'case-editor-tools/surveys/types';
import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';




export class FeverGroup extends Group {

//TODO: intro text


    constructor(parentKey: string) {
        super(parentKey, 'FeverG');
    }

    
    buildGroup() {
    }

}


export class FeverSymptom1 extends Item {

    optionKeys = {
        nameOfOption: 'a'
     }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'FS1');

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
        ['nl', 'Heb je sinds de tekenbeet koorts gekregen of gehad?'],
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


export class FeverSymptom2 extends Item {


  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'FS2');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.dropDown({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Binnen hoeveel weken na de tekenbeet kreeg je koorts?'],
      ]),
      responseOptions: [
        {//TODO: maybe "weken na de tekenbeet" as seperate text after droppbox
            key: '1', role: 'option',
            content: new Map([
                ["nl", "1 weken na de tekenbeet"],
            ])
        },
        {
            key: '2', role: 'option',
            content: new Map([
                ["nl", "2 weken na de tekenbeet"],
            ]),
        }, {
            key: '3', role: 'option',
            content: new Map([
                ["nl", "3 weken na de tekenbeet"],
            ]),
        }, {
            key: '4', role: 'option',
            content: new Map([
                ["nl", "4 weken na de tekenbeet"],
            ]),
        }, {
            key: '5', role: 'option',
            content: new Map([
                ["nl", "5 weken na de tekenbeet"],
            ]),
        }, {
            key: '6', role: 'option',
            content: new Map([
                ["nl", "6 weken na de tekenbeet"],
            ]),
        }, {
            key: '7', role: 'option',
            content: new Map([
                ["nl", "7 weken na de tekenbeet"],
            ]),
        }, {
            key: '8', role: 'option',
            content: new Map([
                ["nl", "8 weken na de tekenbeet"],
            ]),
        }, {
            key: '9', role: 'option',
            content: new Map([
                ["nl", "9 weken na de tekenbeet"],
            ]),
        }, {
            key: '10', role: 'option',
            content: new Map([
                ["nl", "10 weken na de tekenbeet"],
            ]),
        }, {
            key: '11', role: 'option',
            content: new Map([
                ["nl", "10 of meer weken na de tekenbeet"],
            ]),
        },
    ],
    })
  }
}


export class FeverSymptom3 extends Item {

    optionKeys = {
        nameOfOption: 'b'
     }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'FS3');

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
        ['nl', 'Is de koorts gemeten met een thermometer?'],
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


export class FeverSymptom4 extends Item {

    optionKeys = {
        nameOfOption: 'a'
     }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'FS4');

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
        ['nl', 'Heb je nu nog koorts?'],
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


export class FeverSymptom5 extends Item {

    optionKeys = {
        nameOfOption: 'a'
     }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'FS5');

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
        ['nl', 'Kun je alsnog je temperatuur met een thermometer opmeten?'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Ja, ik ga nu meteen mijn temperatuur opmeten"],
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


export class FeverSymptom6 extends Item {

    optionKeys = {
        nameOfOption: 'a'
     }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'FS6');

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
        ['nl', 'Met wat voor thermometer of meetmethode heb je de temperatuur gemeten?'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Oormeting"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Okselmeting"],
          ])
        },
        {
            key: 'c', role: 'option',
            content: new Map([
              ["nl", "Tongmeting"],
            ])
          },
          {
            key: 'd', role: 'option',
            content: new Map([
              ["nl", "Rectale meting (via de anus)"],
            ])
          },
          {//TODO: mandatory text field if selected
            key: 'e', role: 'option',
            content: new Map([
              ["nl", "Anders namelijk (bijvoorbeeld infrarood voorhoofdmeting):"],
            ])
          },
      ]
    })
  }
}

//TODO:slider question here




export class FeverTherapy extends Item {

    
  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'FT');

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
        ['nl', 'Heb je tijdens de koorts paracetamol gebruikt?'],
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
