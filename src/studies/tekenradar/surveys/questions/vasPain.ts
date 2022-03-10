import { Expression } from 'survey-engine/data_types';
import { Item, Group } from 'case-editor-tools/surveys/types';
import { SurveyItems } from 'case-editor-tools/surveys';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';


export class VasPain_Group_2_7 extends Group {
  Header: PainTextH1_Kids;
  Q1: PainH1_Kids;
  Q2: School1H1_Kids;
  Q3: School2H1_Kids;
  Q4: School3H1_Kids;

  constructor(parentKey: string, isRequired?: boolean, condition?: Expression) {
    super(parentKey, 'VAS_pain_2_7');

    const required = isRequired !== undefined ? isRequired : false;

    this.groupEditor.setCondition(condition);

    this.Header = new PainTextH1_Kids(this.key);
    this.Q1 = new PainH1_Kids(this.key, required);
    this.Q2 = new School1H1_Kids(this.key, required);
    this.Q3 = new School2H1_Kids(this.key, required);
    this.Q4 = new School3H1_Kids(this.key, required);
  }

  buildGroup(): void {
    this.addItem(this.Header.get());
    this.addItem(this.Q1.get());
    this.addItem(this.Q2.get());
    this.addItem(this.Q3.get());
    this.addItem(this.Q4.get());
  }
}


export class VasPain_Group_8_18 extends Group {
  Header: PainTextH2_Kids;
  Q1: PainH2_Kids;
  Q2: School1H2_Kids;
  Q3: School2H2_Kids;
  Q4: School3H2_Kids;

  constructor(parentKey: string, isRequired?: boolean, condition?: Expression) {
    super(parentKey, 'VAS_pain_8_18');

    const required = isRequired !== undefined ? isRequired : false;
    this.groupEditor.setCondition(condition);

    this.Header = new PainTextH2_Kids(this.key);
    this.Q1 = new PainH2_Kids(this.key, required);
    this.Q2 = new School1H2_Kids(this.key, required);
    this.Q3 = new School2H2_Kids(this.key, required);
    this.Q4 = new School3H2_Kids(this.key, required);
  }

  buildGroup(): void {
    this.addItem(this.Header.get());
    this.addItem(this.Q1.get());
    this.addItem(this.Q2.get());
    this.addItem(this.Q3.get());
    this.addItem(this.Q4.get());
  }
}


class PainTextH1_Kids extends Item {
  markdownContent_H1 = `
## Pijn en verzuim

De vragen hieronder zijn voor **een ouder/verzorger**.
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
          content: new Map([ // this.isPartOf("Followupflow_Kids") ? this.qTextKids : this.qTextMain,
            ["nl", this.markdownContent_H1],
          ]),
          className: ''
        })
      ]
    })
  }
}


class PainTextH2_Kids extends Item {
  markdownContent_H2 = `
## Pijn en verzuim

De vragen hieronder zijn voor een minderjarige. Als een ouder/verzorger helpt met invullen laat dan **je kind zelf** het antwoord op de eerste vraag kiezen.

Deze vraag gaat over of je de afgelopen week pijn hebt gehad:
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
            ["nl", this.markdownContent_H2],
          ]),
          className: ''
        })
      ]
    })
  }
}


class PainH1_Kids extends Item {
  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Hoe veel pijn heeft je kind gehad '],
      ]),
    },
    {
      content: new Map([
        ["nl", "de afgelopen week"],
      ]),
      className: "text-primary"
    },
    {
      content: new Map([
        ["nl", "? Plaats het blokje op de lijn waar die het best de ernst de pijn van je kind"],
      ]),
    },
    {
      content: new Map([
        ["nl", " weergeeft."],
      ]),
      className: "text-primary"
    },
    //{
    //content: new Map([
    //  ["nl", "[REMARK: It is not possible to have 0 and 10 as well as Geen pijn - veel pijn written at the endings of the slider scale. Please add the explanation of slider scale steps in the question text here]"],
    //]),
    //className: "text-primary"
    //}
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q1');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.numericSlider({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      //questionSubText: new Map([
      //  ["nl", "Mijn reukvermogen op dit moment: (geen reukvermogen 0 - uitstekend reukvermogen 100)."],
      //]),
      //TODO: bipolar slider label???
      sliderLabel: new Map([
        ["nl", "0=geen pijn - 10=veel pijn"],
      ]),
      noResponseLabel: new Map([
        ["nl", "Klik op het blokje om een plaats op de lijn te kiezen."],
      ]),
      min: 0,
      max: 10,
      stepSize: 1,
    })
  }
}


class PainH2_Kids extends Item {
  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Plaats het blokje op de lijn waar die het best de ernst van jouw pijn weergeeft. Hoe veel pijn heb je gehad de afgelopen week?'],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q1');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.numericSlider({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      //questionSubText: new Map([
      //  ["nl", "Mijn reukvermogen op dit moment: (geen reukvermogen 0 - uitstekend reukvermogen 100)."],
      //]),
      //TODO: bipolar slider label???
      sliderLabel: new Map([
        ["nl", "0=geen pijn - 10=veel pijn"],
      ]),
      noResponseLabel: new Map([
        ["nl", "Klik op het blokje om een plaats op de lijn te kiezen."],
      ]),
      min: 0,
      max: 10,
      stepSize: 1,
    })
  }
}


class School1H1_Kids extends Item {
  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Wat is het aantal lesuren '],
      ]),
    },
    {
      content: new Map([
        ["nl", "per week "],
      ]),
      className: "text-primary"
    },
    {
      content: new Map([
        ["nl", "dat geroosterd is voor kinderen uit de klas van je kind? Of als je kind nog niet op school zit: het aantal uren dat je kind op een kinderdagverblijf of speelzaal stond ingeroosterd."],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q2');

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
      questionText: this.questionTextMain
    })
  }
}


class School1H2_Kids extends Item {
  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Wat is het aantal lesuren '],
      ]),
    },
    {
      content: new Map([
        ["nl", "per week "],
      ]),
      className: "text-primary"
    },
    {
      content: new Map([
        ["nl", "dat geroosterd stond voor leerlingen uit je klas?"],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q2');

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
      questionText: this.questionTextMain
    })
  }
}



class School2H1_Kids extends Item {
  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Aantal lesuren '],
      ]),
    },
    {
      content: new Map([
        ["nl", "in de afgelopen 2 (!) weken "],
      ]),
      className: "text-primary"
    },
    {
      content: new Map([
        ["nl", "dat je kind gevolgd heeft (of aantal uren aanwezig op kinderdagverblijf/speelzaal):"],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q3');

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
      questionText: this.questionTextMain
    })
  }
}


class School2H2_Kids extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Aantal lesuren '],
      ]),
    },
    {
      content: new Map([
        ["nl", "in de afgelopen 2 (!) weken:"],
      ]),
      className: "text-primary"
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q3');

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
      questionText: this.questionTextMain
    })
  }
}


class School3H1_Kids extends Item {
  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Hoeveel schoolverzuim (of kinderdagverblijf of speelzaal verzuim) heeft je kind '],
      ]),
    },
    {
      content: new Map([
        ["nl", "het laatste half jaar "],
      ]),
      className: "text-primary"
    },
    {
      content: new Map([
        ["nl", "ongeveer gehad?"],
      ]),
    }
  ]


  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q4');

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
      questionText: this.questionTextMain
    })
  }
}


class School3H2_Kids extends Item {
  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Hoeveel schoolverzuim heb je '],
      ]),
    },
    {
      content: new Map([
        ["nl", "het laatste half jaar "],
      ]),
      className: "text-primary"
    },
    {
      content: new Map([
        ["nl", "ongeveer gehad?"],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q4');

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
      questionText: this.questionTextMain
    })
  }
}
