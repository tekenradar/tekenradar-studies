import { Expression } from 'survey-engine/lib/data_types';
import { Group, Item } from 'case-editor-tools/surveys/types';
import { SurveyItems } from 'case-editor-tools/surveys';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';
import { SingleChoiceOptionTypes as SCOptions, ClozeItemTypes } from 'case-editor-tools/surveys';




export class Text1FU extends Item{

    markdownContent = `
    De volgende vragen gaan over mogelijke tekenbeten opgelopen sinds het invullen van de vorige vragenlijst 3 maanden geleden.
    `
  
    constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
      super(parentKey, 'Text1FU');
  
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
  
  


export class NewTB extends Item {

    optionKeys = {
        nameOfOption: 'b'
     }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'NewTB');

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
        ['nl', 'Heb je sinds je de vorige vragenlijst 3 maanden geleden invulde nieuwe tekenbeten opgemerkt?'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Nee, sindsdien heb ik geen tekenbeten opgemerkt"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Ja"],
          ])
        },
      ]
    })
  }
}


export class ReportedTB2 extends Item {

    optionKeys = {
        nameOfOption: 'a'
     }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'RepTB2');

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
        ['nl', 'Heb je al deze nieuwe tekenbeten gemeld via je account op tekenradar.nl?'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Nee"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Ja"],
          ])
        },
      ]
    })
  }
}



export class PreviousTickBites3 extends Item {


  constructor(parentKey: string, isRequired?: boolean, condition?: Expression) {
      super(parentKey, 'PTB3');

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
            ["nl", 'Hoeveel tekenbeten heb je sinds je de vorige vragenlijst 3 maanden geleden invulde opgemerkt die nog niet gemeld zijn via je account op tekenradar.nl?'],
        ]),
          responseOptions: [
              {
                  key: 'a', role: 'option',
                  content: new Map([
                      ["nl", "1 - 3 tekenbeten"],
                  ])
              },
              {
                  key: 'b', role: 'option',
                  content: new Map([
                      ["nl", "4 - 10 tekenbeten"],
                  ])
              },
              {
                  key: 'c', role: 'option',
                  content: new Map([
                      ["nl", "11 - 50 tekenbeten"],
                  ])
              },
              {
                  key: 'd', role: 'option',
                  content: new Map([
                      ["nl", "Meer dan 50 tekenbeten"],
                  ])
              },
          ]
      })
  }
}


export class FeverFU1 extends Item {

    optionKeys = {
        nameOfOption: 'a'
     }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'FFU1');

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
        ['nl', 'Heb je in de periode na de tekenbeet koorts gehad?'],
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

export class FeverFU2 extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'FFU2');

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
        ['nl', 'Op welke dagen heb je koorts gehad en hoeveel graden was de koorts?'],
      ]),
      
    })
  }
}


export class Text2FU extends Item{

    markdownContent = `
    De volgende vragen gaan over **nieuwe** uitingen van de ziekte van Lyme die bij jou ontstaan zijn sinds het invullen van de vorige vragenlijst 3 maanden geleden. 
    `
  
    constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
      super(parentKey, 'Text2FU');
  
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


export class LymeFU extends Item {

    optionKeys = {
        nameOfOption: 'b'
     }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'LFU');

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
        ['nl', 'Heeft een arts bij jou een nieuwe vorm van de ziekte van Lyme vastgesteld in de afgelopen 3 maanden? (bijvoorbeeld een nieuwe erythema migrans of  andere ziekte van Lyme)?'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Nee"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Ja"],
          ])
        },
      ]
    })
  }
}


export class MedicationFU1 extends Item {

  questionTextMain = [
    {
        content: new Map([
            ["nl", 'Heb je in de afgelopen '],
        ]),
    },
    {
        content: new Map([
            ["nl", "drie maanden "],
        ]),
        className: "text-primary"
    },
    {
        content: new Map([
            ["nl", "medicijnen gebruikt?  (de anti conceptie pil niet meerekenen) Wil je ook aanvinken of de medicijnen gegeven werden voor behandeling tegen de ziekte van Lyme, inclusief erythema migrans of om een andere reden, en of je ze tijdens een ziekenhuisopname hebt gebruikt? "],
        ]),
    },
]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'MedFU1');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      responseOptions: [
          {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Nee"],
            ])
          },
          SCOptions.cloze({
            key: 'b', items: [
              ClozeItemTypes.text({
                  key: '1', content: new Map(
                      [['en', "b.	Ja, namelijk "]]
                  )
              }),
              ClozeItemTypes.numberInput({
                key: '2', 
                inputLabel: new Map([["nl", "bij benadering"],]),
                labelBehindInput: true,  
                inputMaxWidth: '80px',
                componentProperties: {
                    min: 0,
                  }
              }),
            ]
          }),
          {
            key: 'c', role: 'option',
            content: new Map([
              ["nl", "Ja, precies dezelfde medicatie als de vorige keer"],
            ])
          },
        ],
     })
  }
}


export class MedicationFU2 extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'MedFU2');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  //TODO: ask this question for each medicin of former answer
  buildItem() {
    return SurveyItems.clozeQuestion({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionSubText: new Map([//TODO: is this writtem at the end of question?
        ['nl', 'Als je de dosis niet weet kun je die overslaan'],
      ]),
      questionText: new Map([//TODO: insert proper question text
        ['nl', 'Info per medication'],
      ]),
      items: [
        ClozeItemTypes.text({
          key: '1', content: new Map(
              [['nl', "Medicijn (naam of omschrijving):"]]
          )
        }),
        ClozeItemTypes.textInput({ 
          key: '2', 
        }),
        ClozeItemTypes.clozeLineBreak(),
        ClozeItemTypes.text({
          key: '3', content: new Map(
            [['nl', "Dosis:*"]]
          )
        }),
        ClozeItemTypes.textInput({ 
          key: '4', 
        }),
        ClozeItemTypes.clozeLineBreak(),
        ClozeItemTypes.text({
          key: '5', content: new Map(
            [['nl', "Aantal keren per dag:"]]
          )
        }),
        ClozeItemTypes.numberInput({ 
          key: '6', 
          inputMaxWidth: '60px',
          inputLabel: new Map([["nl", " "],]),
          componentProperties: {
            min: 0,
            max: 100
          }
        }),
        ClozeItemTypes.clozeLineBreak(),
        ClozeItemTypes.text({
          key: '7', content: new Map(
            [['nl',"Aantal dagen:"]]
          )
        }),
        ClozeItemTypes.textInput({ 
          key: '8', 
        }),
        ClozeItemTypes.clozeLineBreak(),
        ClozeItemTypes.text({
          key: '9', content: new Map(
            [['nl', "Waarom neem je dit medicijn?"]]
          )
        }),
        ClozeItemTypes.dropDown({ 
          key: '10',  options: [
            SCOptions.option('1', new Map([['nl', "Tegen de tekenbeet, erythema migrans of andere vorm van de ziekte van Lyme"]])),
            SCOptions.option('2', new Map([['nl', "Om een andere reden (klacht, ziekte of aandoening)"]]))
        ]
        }),
        ClozeItemTypes.clozeLineBreak(),
        //TODO: checkbox is needed here
        ClozeItemTypes.text({
          key: '11', content: new Map(
            [['nl', "Medicijnen tijdens ziekenhuisopname gebruikt"]]
          )
        }),
      ],
    })
  }
}



export class SymptomsFU1 extends Item {


  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'SymFU1');

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
        ['nl', 'Welke lichamelijke en psychische problemen heb je? Kruis aan welke problemen je nu hebt. Kruis ook aan welke problemen je nog meer hebt gehad in de afgelopen 12 maanden. Je kunt dus meer dan 1 hokje aankruisen.'],
      ]),
      responseOptions: [
        {
          key: 't1', role: 'text',
          style: [{ key: 'className', value: 'fw-bold mb-2' }],
          content: new Map([
              ["nl", "Longen en hoofdholten"],
          ])
        },
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Astma, chronische bronchitis of CARA"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Ontsteking van de neusbijholte, voorhoofdsholte of kaakholten"],
          ])
        },
        {
          key: 't2', role: 'text',
          style: [{ key: 'className', value: 'fw-bold mb-2' }],
          content: new Map([
              ["nl", "Hart en bloedvaten"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "Ernstige hartkwaal of hartinfarct"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "Hoge bloeddruk"],
          ])
        },
        {
          key: 'e', role: 'option',
          content: new Map([
            ["nl", "Beroerte of gevolgen van beroerte"],
          ])
        },
        {
          key: 't3', role: 'text',
          style: [{ key: 'className', value: 'fw-bold mb-2' }],
          content: new Map([
              ["nl", "Maag en darmen"],
          ])
        },
        {
          key: 'f', role: 'option',
          content: new Map([
            ["nl", "Maagzweer of zweer aan de 12-vingerige darm"],
          ])
        },
        {
          key: 'g', role: 'option',
          content: new Map([
            ["nl", "Ernstige darmstoornissen, langer dan 3 maanden"],
          ])
        },
        {
          key: 't4', role: 'text',
          style: [{ key: 'className', value: 'fw-bold mb-2' }],
          content: new Map([
              ["nl", "Galblaas, lever en nieren"],
          ])
        },
        {
          key: 'h', role: 'option',
          content: new Map([
            ["nl", "Galstenen of galblaasontsteking"],
          ])
        },
        {
          key: 'i', role: 'option',
          content: new Map([
            ["nl", "Leverziekte of levercirrose"],
          ])
        },
        {
          key: 'j', role: 'option',
          content: new Map([
            ["nl", "Nierstenen"],
          ])
        },
        {
          key: 'k', role: 'option',
          content: new Map([
            ["nl", "Ernstige nierziekte"],
          ])
        },
        {
          key: 't5', role: 'text',
          style: [{ key: 'className', value: 'fw-bold mb-2' }],
          content: new Map([
              ["nl", "Blaas en baarmoeder"],
          ])
        },
        {
          key: 'l', role: 'option',
          content: new Map([
            ["nl", "Chronische blaasontsteking"],
          ])
        },
        {
          key: 'm', role: 'option',
          content: new Map([
            ["nl", "Verzakking"],
          ])
        },
        {
          key: 't6', role: 'text',
          style: [{ key: 'className', value: 'fw-bold mb-2' }],
          content: new Map([
              ["nl", "Andere ziektes"],
          ])
        },
        {
          key: 'n', role: 'option',
          content: new Map([
            ["nl", "Suikerziekte"],
          ])
        },
        {
          key: 'o', role: 'option',
          content: new Map([
            ["nl", "Schildklierafwijking"],
          ])
        },
        {
          key: 't7', role: 'text',
          style: [{ key: 'className', value: 'fw-bold mb-2' }],
          content: new Map([
              ["nl", "Rug en gewrichten"],
          ])
        },
        {
          key: 'p', role: 'option',
          content: new Map([
            ["nl", "Rugaandoening van hardnekkige aard, langer dan 3 maanden,of hernia"],
          ])
        },
        {
          key: 'q', role: 'option',
          content: new Map([
            ["nl", "Gewrichtsslijtage (artrose) van knieën, heupen of handen"],
          ])
        },
        {
          key: 'r', role: 'option',
          content: new Map([
            ["nl", "Gewrichtsontsteking (reuma) van handen en/of voeten"],
          ])
        },
        {
          key: 's', role: 'option',
          content: new Map([
            ["nl", "Andere chronische reuma, langer dan 3 maanden"],
          ])
        },
        {
          key: 't8', role: 'text',
          style: [{ key: 'className', value: 'fw-bold mb-2' }],
          content: new Map([
              ["nl", "Zenuwstelsel"],
          ])
        },
        {
          key: 't', role: 'option',
          content: new Map([
            ["nl", "Epilepsie"],
          ])
        },
        {
          key: 'u', role: 'option',
          content: new Map([
            ["nl", "Andere ziekten van het zenuwstelsel, zoals ziekte van Parkinson"],
          ])
        },
        {
          key: 'v', role: 'option',
          content: new Map([
            ["nl", "Multiple sclerose"],
          ])
        },
        {
          key: 'w', role: 'option',
          content: new Map([
            ["nl", "Duizeligheid met vallen"],
          ])
        },
        {
          key: 'x', role: 'option',
          content: new Map([
            ["nl", "Migraine"],
          ])
        },
        {
          key: 't9', role: 'text',
          style: [{ key: 'className', value: 'fw-bold mb-2' }],
          content: new Map([
              ["nl", "Andere lichamelijke of psychische problemen"],
          ])
        },
        {
          key: 'y', role: 'option',
          content: new Map([
            ["nl", "Kwaadaardige aandoening of kanker"],
          ])
        },
        {
          key: 'z', role: 'option',
          content: new Map([
            ["nl", "Overspannen, depressie, ernstige nervositeit"],
          ])
        },
        {
          key: 'aa', role: 'option',
          content: new Map([
            ["nl", "Chronische huidziekte of eczeem"],
          ])
        },
        {
          key: 'ab', role: 'option',
          content: new Map([
            ["nl", "Letsel door ongeluk in en om huis sport, school, werk of in het verkeer"],
          ])
        },
        {
          key: 'ac', role: 'option',
          content: new Map([
            ["nl", "Afweerstoornis"],
          ])
        },
        {
          key: 'ad', role: 'option',
          content: new Map([
            ["nl", "Ondergaan van transplantatie"],
          ])
        },
        {
          key: 'ae', role: 'option',
          content: new Map([
            ["nl", "Alcoholverslaving"],
          ])
        },
        {
          key: 'af', role: 'option',
          content: new Map([
            ["nl", "Drugsverslaving"],
          ])
        },
        {
          key: 'ag', role: 'option',
          content: new Map([
            ["nl", "Ernstige vermoeidheid, langer dan 3 maanden"],
          ])
        },
        {
          key: 'ah', role: 'option',
          content: new Map([
            ["nl", "Ernstige pijnklachten, langer dan 3 maanden"],
          ])
        },
        {
          key: 'ai', role: 'option',
          content: new Map([
            ["nl", "Ernstige concentratiestoornissen, langer dan 3 maanden"],
          ])
        },
        {
          key: 'aj', role: 'option',
          content: new Map([
            ["nl", "Geen van de bovenstaande"],
          ])
        },  
      ]
    })
  }
}


export class SymptomsFU2 extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'SymFU2');

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
        ['nl', 'Heb je nog andere klachten of gezondheidsproblemen gehad in het afgelopen jaar? Vul die dan hier in:'],
      ]),
      
    })
  }
}
