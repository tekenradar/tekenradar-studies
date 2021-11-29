import { Expression } from 'survey-engine/lib/data_types';
import { Group, Item } from 'case-editor-tools/surveys/types';
import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';
import { PreviousTickBitesGroup } from './prevTickBites';
import { Residence, Gender } from './demographie';
import { Doctor, FormerLymeGroup, GeneralTherapy } from './diagnosisTherapy';




export class TickBiteOnlyGroup extends Group {

  //TODO: intro text here
    Q1: EnvironmentTickBite;
    Q2: ActivityTickBite;
    Q3: PositionTickBite;
    Q4: NumberTickBite;
    Q5: LocationBodyTickBite;
    Q6: RemoveTick1;
    Q7: RemoveTick2;
    Q8: RemoveTick3;
    Q9: RemoveTick4;
    G10_11: PreviousTickBitesGroup;
    Q12: ReportedTickBites;

    P1: Residence;
    P2: Gender;

    Q13: DateTickBite;
    Q14: DurationTickBite;
    Q15: DoctorTickBite;
    Q16: Doctor;

    G17_19: FormerLymeGroup;
    
    Q20: GeneralTherapy;



    constructor(parentKey: string,isRequired?: boolean,condition?: Expression) {
        super(parentKey, 'TBOnlyG');

        this.groupEditor.setCondition(condition);

        const required = isRequired !== undefined ? isRequired : false;

        this.Q1 = new EnvironmentTickBite(this.key, required);
        this.Q2 = new ActivityTickBite(this.key, required);
        this.Q3 = new PositionTickBite(this.key, required);
        this.Q4 = new NumberTickBite(this.key, required);
        this.Q5 = new LocationBodyTickBite(this.key, required);
        
        this.Q6 = new RemoveTick1(this.key,required);
        const q6Condition = SurveyEngine.singleChoice.any(this.Q6.key, this.Q6.optionKeys.nameOfOption);
        this.Q7 = new RemoveTick2(this.key, required, q6Condition);
        this.Q8 = new RemoveTick3(this.key,required, q6Condition);
        this.Q9 = new RemoveTick4(this.key, required, q6Condition);

        this.G10_11 = new PreviousTickBitesGroup(this.key, isRequired);

        this.Q12 = new ReportedTickBites(this.key, required);

        //TDOD If the respondent is not logged in ask p1 and p2, 
        //if he is logged in, skip these two questions here as they 
        //will be asked lateron in de questionaire (chapter S-A)
        this.P1 = new Residence(this.key,required);
        this.P2 = new Gender(this.key, required);

        this.Q13 = new DateTickBite(this.key, required);
        this.Q14 = new DurationTickBite(this.key, required);
        this.Q15 = new DoctorTickBite(this.key, required);
        const q15Condition = SurveyEngine.singleChoice.any(this.Q15.key, this.Q15.optionKeys.nameOfOption);
        this.Q16 = new Doctor(this.key, required, q15Condition);

        this.G17_19 = new FormerLymeGroup(this.key, isRequired);
        
        this.Q20 = new GeneralTherapy(this.key, required);

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

        this.addItem(this.G10_11.get());
        this.addItem(this.Q12.get());
        this.addPageBreak();


        this.addItem(this.P1.get());
        this.addItem(this.P2.get());
        this.addPageBreak();

        this.addItem(this.Q13.get());
        this.addItem(this.Q14.get());
        this.addItem(this.Q15.get());
        this.addItem(this.Q16.get());
        this.addPageBreak();

        this.addItem(this.G17_19.get());
        
        this.addItem(this.Q20.get());
        this.addPageBreak();


    }
}



export class TickBiteOtherGroup extends Group {

    Start: RecognisedTickBite;

     //TODO: inital text (fever has special text)
     Q1: EnvironmentTickBite;
     Q2: ActivityTickBite;
     Q3: PositionTickBite;
     Q4: NumberTickBite;
     Q5: LocationBodyTickBite;
 
     //Note: RemoveTick1 is not part of surveys from other groups than TB
     Q6: RemoveTick2;
     Q7: RemoveTick3;
     Q8: RemoveTick4;
 
     Q9: DurationTickBite;

     Q10F: DoctorTickBite;
     Q11F: Doctor;



    constructor(parentKey: string,isRequired?: boolean) {
        super(parentKey, 'TBOtherG');

        const required = isRequired !== undefined ? isRequired : false;

        this.Start = new RecognisedTickBite(this.key,required);
        this.Q1 = new EnvironmentTickBite(this.key, required);
        this.Q2 = new ActivityTickBite(this.key, required);
        this.Q3 = new PositionTickBite(this.key, required);
        this.Q4 = new NumberTickBite(this.key, required);
        this.Q5 = new LocationBodyTickBite(this.key, required);
        
        this.Q6 = new RemoveTick2(this.key, required);
        this.Q7 = new RemoveTick3(this.key, required);
        this.Q8 = new RemoveTick4(this.key, required);

        this.Q9 = new DurationTickBite(this.key, required);

        this.Q10F = new DoctorTickBite(this.key, required);
        this.Q11F = new Doctor(this.key, required);


    }

    buildGroup() {

        this.addItem(this.Start.get());
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

        //TODO: is this the recommended way to add fever group questions in this group?
        if (this.isPartOf('FeverG')) {
            this.addItem(this.Q10F.get()),
            this.addItem(this.Q11F.get()) 
        }


    }
}


class RecognisedTickBite extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'RecTB');

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
        ['nl', 'Heb je de tekenbeet, waardoor je vermoedelijk de erythema migrans of andere ziekte van Lyme die je nu meldt hebt gekregen, opgemerkt?'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Nee"],
          ])
        },
        {//TODO: Pop up only shown if b or c is selected?
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Ja, deze heb ik eerder gemeld op Tekenradar.nl"],
          ])
        },
        {//TODO: correct date format and text after date here
          key: 'c', role: 'date',
          content: new Map([
            ["nl", "Ja, de datum dat ik de tekenbeet heb opgelopen is ..........(dag/maand/jaar) bij benadering?"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "Onbekend"],
          ])
        }
      ]
    })
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
  buildItem() {
    return SurveyItems.numericInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Door hoeveel teken ben je nu gebeten?'],
      ]),
      titleClassName: 'sticky-top',
      inputMaxWidth: '80px',
      content: new Map([
        ['nl', '']
      ]),
      //TODO: default preset to 1
      contentBehindInput: true,
      componentProperties: {
        min: 1,
        max: 20,
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


class DoctorTickBite extends Item {

    optionKeys = {
        nameOfOption: 'a'
    }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'DocTB');

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



