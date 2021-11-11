import { Expression } from 'survey-engine/lib/data_types';
import { Group, Item } from 'case-editor-tools/surveys/types';
import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';
import { PreviousTickBitesGroup } from './prevTickBites';


export class TickBiteGroup extends Group {

    Q1: EnvironmentTickBite;
    Q2: ActivityTickBite;
    Q3: PositionTickBite;
    Q4: NumberTickBite;
    Q5: LocationBodyTickBite;
    Q6: RemoveTick1;
    Q7: RemoveTick2;
    Q8: RemoveTick3;
    Q9: RemoveTick4;
    G10: PreviousTickBitesGroup;
    Q12: ReportedTickBites;

    constructor(parentKey: string) {
        super(parentKey, 'TBG');

        this.Q1 = new EnvironmentTickBite(this.key, false);
        this.Q2 = new ActivityTickBite(this.key, false);
        this.Q3 = new PositionTickBite(this.key, false);
        this.Q4 = new NumberTickBite(this.key, false);
        this.Q5 = new LocationBodyTickBite(this.key, false);
        
        this.Q6 = new RemoveTick1(this.key,false);
        const q6Condition = SurveyEngine.singleChoice.any(this.Q6.key, this.Q6.optionKeys.nameOfOption);
        this.Q7 = new RemoveTick2(this.key, false, q6Condition);
        this.Q8 = new RemoveTick3(this.key,false, q6Condition);
        this.Q9 = new RemoveTick4(this.key, false, q6Condition);

        this.G10 = new PreviousTickBitesGroup(this.key)

        this.Q12 = new ReportedTickBites(this.key, false);

    }

    buildGroup() {

        this.addItem(this.Q1.get());
        this.addItem(this.Q2.get());
        this.addItem(this.Q3.get());
        this.addPageBreak();
        this.addItem(this.Q4.get());
        this.addItem(this.Q5.get());
        this.addItem(this.Q6.get());

        this.addItem(this.Q7.get());
        this.addItem(this.Q8.get());
        this.addItem(this.Q9.get());
        this.addPageBreak();

        this.addItem(this.G10.get());
        
        this.addPageBreak();
    }
}


class EnvironmentTickBite extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'EnvTB');

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
        ['nl', 'In welk type omgeving heb je de tekenbeet opgelopen? (meerdere antwoorden mogelijk)'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Tuin"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Bos"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "Heide"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "Weiland"],
          ])
        },
        {
          key: 'e', role: 'option',
          content: new Map([
            ["nl", "Stadspark"],
          ])
        },
        {
          key: 'f', role: 'option',
          content: new Map([
            ["nl", "Duinen"],
          ])
        },
        {
          key: 'g', role: 'option',
          content: new Map([
            ["nl", "Moerasgebied"],
          ])
        },
        {
          key: 'h', role: 'input',
          content: new Map([
            ["nl", "Anders, namelijk:"],
          ])
        },
        {
          key: 'i', role: 'option',
          content: new Map([
            ["nl", "Weet niet"],
          ])
        },
      ]
    })
  }
}


class ActivityTickBite extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'ActTB');

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
        ['nl', 'Bij welke activiteit heb je de tekenbeet opgelopen? (meerdere antwoorden mogelijk)'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Wandelen"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Hond uitlaten"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "Tuinieren"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "Picknicken"],
          ])
        },
        {
          key: 'e', role: 'option',
          content: new Map([
            ["nl", "Groenbeheer"],
          ])
        },
        {
          key: 'f', role: 'option',
          content: new Map([
            ["nl", "Spelen"],
          ])
        },
        {
          key: 'g', role: 'input',
          content: new Map([
            ["nl", "Werk gerelateerde activiteit, mijn beroep is:"],
          ])
        },
        {
          key: 'h', role: 'input',
          content: new Map([
            ["nl", "Anders, namelijk:"],
          ])
        },
        {
          key: 'i', role: 'option',
          content: new Map([
            ["nl", "Weet niet"],
          ])
        },
      ]
    })
  }
}


class PositionTickBite extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'PosTB');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  //TODO: pop up map for response options 1-3
  //Pop-up map (participants are asked to place a marker on the map,
  //this map is  also to be shown on a map on the homepage)
  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Weet je de locatie waar je de tekenbeet (vermoedelijk) heeft opgelopen?'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Ja, ik weet het precies"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Ja, ik weet het ongeveer"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "Ja, ik denk het te weten"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "Nee, ik weet het"],
          ])
        },
      ]
    })
  }
}


class NumberTickBite extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'NumTB');

    this.isRequired = isRequired;
    this.condition = condition;
  }
  //TODO: select box here
  buildItem() {
    return SurveyItems.numericInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Door hoeveel teken ben je nu gebeten?'],
      ]),
      content: new Map([
        ['nl', '']
      ]),
      //TODO: default preset to 1
      contentBehindInput: true,
      componentProperties: {
        min: 1,
        max: 20
      }
    })
  }
}


class LocationBodyTickBite extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'LocTB');

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
        ['nl', 'Wat was de locatie van de tekenbeet op je  lichaam? (graag zo specifiek mogelijk aangeven, bijvoorbeeld: linker been aan de buitenkant boven de enkel. Als je door meerdere teken gebeten bent graag alle lokaties aangeven)'],
      ]),
    })
  }
}


class RemoveTick1 extends Item {

  optionKeys = {
    nameOfOption: 'b'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'RemT1');

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
        ['nl', 'Zit de teek nog vast op het lichaam?'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Ja"],
          ])
        },
        {
          key: this.optionKeys.nameOfOption, role: 'option',
          content: new Map([
            ["nl", "Nee"],
          ])
        },
      ]
    })
  }
}


class RemoveTick2 extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'RemT2');

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
        ['nl', 'Heb je de teek bewaard?'],
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


class RemoveTick3 extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'RemT3');

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
        ['nl', 'Wanneer heb je de teek verwijderd?'],
      ]),
      //TODO: two number inputs for each option.
      //TODO: date and two number input in option d
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Vandaag, tussen ... en .... uur"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Gisteren, tussen .... en  .... uur"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "Eergisteren, tussen .... en ..... uur"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "Eerder namelijk, ................(dag/maand/jaar) tussen ... en..... uur"],
          ])
        },
      ]
    })
  }
}


class RemoveTick4 extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'RemT4');

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
        ['nl', 'Wie heeft de teek verwijderd? (meerdere antwoorden mogelijk)'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "De teek viel er vanzelf af"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Huisarts"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "Uzelf"],
          ])
        },
        {
          key: 'd', role: 'input',
          content: new Map([
            ["nl", "Iemand anders, namelijk:"],
          ])
        },
        {
          key: 'e', role: 'option',
          content: new Map([
            ["nl", "Onbewust / per ongeluk verwijderd (bijvoorbeeld door te krabben of bij het afdrogen)"],
          ])
        },
      ]
    })
  }
}



class ReportedTickBites extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'RepTB');

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
        ['nl', 'Hoeveel tekenbeten heb je sinds het begin van dit jaar (dus vanaf 1 januari) op Tekenradar gemeld?'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Ik heb nog nooit een Tekenbeet gemeld op tekenradar"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Geen teken gemeld dit jaar"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "1 teek gemeld"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "2 teken gemeld"],
          ])
        },
        {
          key: 'e', role: 'option',
          content: new Map([
            ["nl", "3-5 teken gemeld"],
          ])
        },
        {
          key: 'f', role: 'option',
          content: new Map([
            ["nl", "5-10 teken gemeld"],
          ])
        },
        {
          key: 'g', role: 'option',
          content: new Map([
            ["nl", "Meer dan 10 teken gemeld"],
          ])
        },
      ]
    })
  }
}


class DateTickBite extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'DTB');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  //TODO insert time input option here
  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Wanneer heb je de tekenbeet (vermoedelijk) opgelopen?'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Vandaag, tussen ... en ...uur"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Gisteren, tussen ... en ... uur"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "Eergisteren, tussen ... en ... uur"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "Eerder, op ....... (dag/maand/jaar) tussen... en ...uur"],
          ])
        },
      ]
    })
  }
}


class DurationTickBite extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'DurTB');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  //TODO insert time input option here
  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Hoe lang heeft de teek in de huid vastgezeten?'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Korter dan 12 uur, namelijk ....... uur"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "12 - 24 uur, namelijk …… uur"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "Langer dan 24 uur, namelijk ...... dagen/uur (rond a.u.b. af op hele dagen)"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "Weet ik niet"],
          ])
        },
      ]
    })
  }
}


class DoctorTickBite1 extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'DocTB1');

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
        ['nl', 'Is er een arts bezocht voor de tekenbeet?'],
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


class DoctorTickBite2 extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'DocTB2');

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
        ['nl', 'Welke arts is er bezocht? (meerdere antwoorden mogelijk)'],
      ]),
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
        {
          key: 'c', role: 'input',
          content: new Map([
            ["nl", "Ander soort arts, namelijk:"],
          ])
        },
      ]
    })
  }
}

