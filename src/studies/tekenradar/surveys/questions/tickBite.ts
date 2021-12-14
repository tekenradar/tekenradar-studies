import { Expression } from 'survey-engine/lib/data_types';
import { Group, Item } from 'case-editor-tools/surveys/types';
import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';
import { PreviousTickBitesGroup } from './prevTickBites';
import { Residence, Gender } from './demographie';
import { Doctor, FormerLymeGroup, GeneralTherapy } from './diagnosisTherapy';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';
import { SingleChoiceOptionTypes as SCOptions, ClozeItemTypes } from 'case-editor-tools/surveys';




export class TickBiteOnlyGroup extends Group {

    //Note: T-named objects are text items
    T1: IntroTB;
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

        this.T1 = new IntroTB(this.key, required);
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

        this.addItem(this.T1.get());
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

     T1: IntroTB;
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
        this.T1 = new IntroTB(this.key, required);
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
        this.addItem(this.T1.get());
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

        //TODO: is this the recommended way to add fever survey questions in this group?
        if (this.isPartOf('Feverflow')) {
            this.addItem(this.Q10F.get()),
            this.addItem(this.Q11F.get()) 
        }


    }
}


class IntroTB extends Item{

  markdownContentOnly = `
  # Melden tekenbeet

  De volgende vragen gaan over de tekenbeet. \
  Als je meerdere tekenbeten tegelijk hebt opgelopen, kun je dit als één tekenbeet melden.

  `
  
  markdownContentOther = `
  # Tekenbeet

  De volgende vragen gaan over de tekenbeet die vermoedelijk de huidige of meest recente erythema migrans of andere uiting van de ziekte van Lyme veroorzaakt heeft.

  `
  
  markdownContentFever = `
  # Melden tekenbeet

  Als je meerdere tekenbeten tegelijk hebt opgelopen, kun je dit als één tekenbeet melden.

  `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'IntroTB');

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
              ["nl", this.isPartOf('TBOnlyG') ? this.markdownContentOnly : (this.isPartOf('Feverflow') ? this.markdownContentFever : this.markdownContentOther)],
          ]),
          className: ''
      })
       /* this.isPartOf('FeverG') ? this.qTextFever : this.qTextOther,
        ComponentGenerators.markdown({
            content: new Map([
                ["nl", this.markdownContent],
            ]),
            className: ''
        })*/
    ]
    })
  }
}

class RecognisedTickBite extends Item {

  qTextFever = new Map([[
    'nl', 'Heb je de tekenbeet, waardoor je vermoedelijk de koorts hebt gekregen, al gemeld?'
  ]]);
  qTextOther = new Map([[
    'nl', 'Heb je de tekenbeet, waardoor je vermoedelijk de erythema migrans of andere ziekte van Lyme die je nu meldt hebt gekregen, opgemerkt?'
  ]]);

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
        questionText: this.isPartOf('Feverflow') ? this.qTextFever : this.qTextOther,
        //helpGroupContent: this.getHelpGroupContent(),
        responseOptions: [
            SCOptions.option(
              'a', new Map([["nl", "Nee"]])
            ),
            SCOptions.option(
              'b', new Map([["nl", "Ja, deze heb ik eerder gemeld op Tekenradar.nl"]])
            ),   
            SCOptions.cloze({
                key: 'c', items: [
                    ClozeItemTypes.text({
                        key: '1', content: new Map(
                            [['nl', "Ja, de datum dat ik de tekenbeet heb opgelopen is"]]
                        )
                    }),
                    ClozeItemTypes.dateInput({
                        dateInputMode: 'YMD',
                        key: '2', 
                        maxRelativeDate: {
                          reference: SurveyEngine.timestampWithOffset({seconds: 0}),
                          delta: {seconds: 0}}        
                    }),
                    ClozeItemTypes.text({
                        key: '3',
                        content: new Map(
                            [['nl', "bij benadering?"]]
                        )
                    })
                ]
            }),
            SCOptions.option(
              'a', new Map([["nl", "Onbekend"]])
            ),
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
        {//TODO: show option g only if participant age > 12 years
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
      inputLabel: new Map([
        ['nl', '']
      ]),
      //TODO: default preset to 1
      //contentBehindInput: true,
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
        SCOptions.cloze({
          key: 'a', items: [
              ClozeItemTypes.text({
                  key: '1', content: new Map(
                      [['nl', "Vandaag, tussen"]]
                  )
              }),
              ClozeItemTypes.numberInput({
                  key: '2', 
                  inputLabel: new Map([["nl", " en"],]),
                  labelBehindInput: true,  
                  inputMaxWidth: '80px',
                  componentProperties: {
                    min: 0,
                    max: 24
                  }
              }),//TODO: strictly speaking, this number hast to be greater than or equal to the number above.
              ClozeItemTypes.numberInput({
                  key: '3', 
                  inputLabel: new Map([["nl", " uur"],]),
                  labelBehindInput: true,  
                  inputMaxWidth: '80px',
                  componentProperties: {
                  min: 0,
                  max: 24
                }
            }),
            ]
          }),
          SCOptions.cloze({
            key: 'b', items: [
                ClozeItemTypes.text({
                    key: '1', content: new Map(
                        [['nl', "Gisteren, tussen"]]
                    )
                }),
                ClozeItemTypes.numberInput({
                    key: '2', 
                    inputLabel: new Map([["nl", " en"],]),
                    labelBehindInput: true,  
                    inputMaxWidth: '80px',
                    componentProperties: {
                      min: 0,
                      max: 24
                    }
                }),//TODO: strictly speaking, this number hast to be greater than or equal to the number above.
                ClozeItemTypes.numberInput({
                    key: '3', 
                    inputLabel: new Map([["nl", " uur"],]),
                    labelBehindInput: true,  
                    inputMaxWidth: '80px',
                    componentProperties: {
                    min: 0,
                    max: 24
                  }
              }),
              ]
            }),
            SCOptions.cloze({
              key: 'c', items: [
                  ClozeItemTypes.text({
                      key: '1', content: new Map(
                          [['nl', "Eergisteren, tussen"]]
                      )
                  }),
                  ClozeItemTypes.numberInput({
                      key: '2', 
                      inputLabel: new Map([["nl", " en"],]),
                      labelBehindInput: true,  
                      inputMaxWidth: '80px',
                      componentProperties: {
                        min: 0,
                        max: 24
                      }
                  }),//TODO: strictly speaking, this number hast to be greater than or equal to the number above.
                  ClozeItemTypes.numberInput({
                      key: '3', 
                      inputLabel: new Map([["nl", " uur"],]),
                      labelBehindInput: true,  
                      inputMaxWidth: '80px',
                      componentProperties: {
                      min: 0,
                      max: 24
                    }
                }),
                ]
              }),
              SCOptions.cloze({
                key: 'd', items: [
                    ClozeItemTypes.text({
                      key: '1', content: new Map(
                          [['nl', "Eerder namelijk,"]]
                      )
                    }),
                    ClozeItemTypes.dateInput({
                      dateInputMode: 'YMD',
                       key: '2', 
                       maxRelativeDate: {
                         reference: SurveyEngine.timestampWithOffset({seconds: 0}),
                         delta: {seconds: 0}}        
                    }),
                    ClozeItemTypes.clozeLineBreak(),
                    ClozeItemTypes.text({
                      key: '3', content: new Map(
                        [['nl', " (dag/maand/jaar) tussen"]]
                      )
                    }),
                    ClozeItemTypes.numberInput({
                        key: '4', 
                        inputLabel: new Map([["nl", " en"],]),
                        labelBehindInput: true,  
                        inputMaxWidth: '80px',
                        componentProperties: {
                          min: 0,
                          max: 24
                        }
                    }),//TODO: strictly speaking, this number hast to be greater than or equal to the number above.
                    ClozeItemTypes.numberInput({
                        key: '5', 
                        inputLabel: new Map([["nl", " uur"],]),
                        labelBehindInput: true,  
                        inputMaxWidth: '80px',
                        componentProperties: {
                        min: 0,
                        max: 24
                      }
                  }),
                ]
          }),     
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
        SCOptions.cloze({
          key: 'a', items: [
              ClozeItemTypes.text({
                  key: '1', content: new Map(
                      [['nl', "Vandaag, tussen"]]
                  )
              }),
              ClozeItemTypes.numberInput({
                  key: '2', 
                  inputLabel: new Map([["nl", " en"],]),
                  labelBehindInput: true,  
                  inputMaxWidth: '80px',
                  componentProperties: {
                    min: 0,
                    max: 24
                  }
              }),//TODO: strictly speaking, this number hast to be greater than or equal to the number above.
              ClozeItemTypes.numberInput({
                  key: '3', 
                  inputLabel: new Map([["nl", " uur"],]),
                  labelBehindInput: true,  
                  inputMaxWidth: '80px',
                  componentProperties: {
                  min: 0,
                  max: 24
                }
            }),
            ]
          }),
          SCOptions.cloze({
            key: 'b', items: [
                ClozeItemTypes.text({
                    key: '1', content: new Map(
                        [['nl', "Gisteren, tussen"]]
                    )
                }),
                ClozeItemTypes.numberInput({
                    key: '2', 
                    inputLabel: new Map([["nl", " en"],]),
                    labelBehindInput: true,  
                    inputMaxWidth: '80px',
                    componentProperties: {
                      min: 0,
                      max: 24
                    }
                }),//TODO: strictly speaking, this number hast to be greater than or equal to the number above.
                ClozeItemTypes.numberInput({
                    key: '3', 
                    inputLabel: new Map([["nl", " uur"],]),
                    labelBehindInput: true,  
                    inputMaxWidth: '80px',
                    componentProperties: {
                    min: 0,
                    max: 24
                  }
              }),
              ]
            }),
            SCOptions.cloze({
              key: 'c', items: [
                  ClozeItemTypes.text({
                      key: '1', content: new Map(
                          [['nl', "Eergisteren, tussen"]]
                      )
                  }),
                  ClozeItemTypes.numberInput({
                      key: '2', 
                      inputLabel: new Map([["nl", " en"],]),
                      labelBehindInput: true,  
                      inputMaxWidth: '80px',
                      componentProperties: {
                        min: 0,
                        max: 24
                      }
                  }),//TODO: strictly speaking, this number hast to be greater than or equal to the number above.
                  ClozeItemTypes.numberInput({
                      key: '3', 
                      inputLabel: new Map([["nl", " uur"],]),
                      labelBehindInput: true,  
                      inputMaxWidth: '80px',
                      componentProperties: {
                      min: 0,
                      max: 24
                    }
                }),
                ]
              }),
              SCOptions.cloze({
                key: 'd', items: [
                    ClozeItemTypes.text({
                      key: '1', content: new Map(
                          [['nl', "Eerder, op"]]
                      )
                    }),
                    ClozeItemTypes.dateInput({
                      dateInputMode: 'YMD',
                       key: '2', 
                       maxRelativeDate: {
                         reference: SurveyEngine.timestampWithOffset({seconds: 0}),
                         delta: {seconds: 0}}        
                    }),//TODO: text direct after date Input (without Line break)??
                    ClozeItemTypes.text({
                      key: '3', content: new Map(
                        [['nl', " (dag/maand/jaar) tussen"]]
                      )
                    }),
                    ClozeItemTypes.numberInput({
                        key: '4', 
                        inputLabel: new Map([["nl", " en"],]),
                        labelBehindInput: true,  
                        inputMaxWidth: '80px',
                        componentProperties: {
                          min: 0,
                          max: 24
                        }
                    }),//TODO: strictly speaking, this number hast to be greater than or equal to the number above.
                    ClozeItemTypes.numberInput({
                        key: '5', 
                        inputLabel: new Map([["nl", " uur"],]),
                        labelBehindInput: true,  
                        inputMaxWidth: '80px',
                        componentProperties: {
                        min: 0,
                        max: 24
                      }
                  }),
                  ]
                }),     
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
        SCOptions.cloze({
          key: 'a', items: [
              ClozeItemTypes.text({
                  key: '1', content: new Map(
                      [['nl', "Korter dan 12 uur, namelijk"]]
                  )
              }),
              ClozeItemTypes.numberInput({
                  key: '2', 
                  inputLabel: new Map([["nl", " uur"],]),
                  labelBehindInput: true,  
                  inputMaxWidth: '80px',
                  componentProperties: {
                    min: 0,
                    max: 12
                  }
              }),
            ]
          }),
          SCOptions.cloze({
            key: 'b', items: [
                ClozeItemTypes.text({
                    key: '1', content: new Map(
                        [['nl', "12 - 24 uur, namelijk"]]
                    )
                }),
                ClozeItemTypes.numberInput({
                    key: '2', 
                    inputLabel: new Map([["nl", " uur"],]),
                    labelBehindInput: true,  
                    inputMaxWidth: '80px',
                    componentProperties: {
                      min: 12,
                      max: 24
                    }
                }),
              ]
            }),
            SCOptions.cloze({
              key: 'c', items: [
                  ClozeItemTypes.text({
                      key: '1', content: new Map(
                          [['nl', "Langer dan 24 uur, namelijk"]]
                      )
                  }),
                  ClozeItemTypes.textInput({
                      key: '2', 
                      inputMaxWidth: '200px'
                  }),
                  ClozeItemTypes.text({
                    key: '3', content: new Map(
                        [['nl', " dagen/uur (rond a.u.b. af op hele dagen)"]]
                    )
                }),
                ]
              }),
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



