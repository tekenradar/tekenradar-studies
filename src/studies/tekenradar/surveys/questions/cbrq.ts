import { Expression } from 'survey-engine/data_types';
import { Item } from 'case-editor-tools/surveys/types';
import { SurveyItems } from 'case-editor-tools/surveys';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';

export class CBRQ_Header extends Item {

  markdownContent1 = `
# Opvattingen over klachten

In de voorgaande vragen heeft u aangegeven dat u lichamelijke of psychische klachten heeft. Wij willen graag meer weten over deze klachten. Ook willen we meer weten over de gevolgen van deze klachten voor uw leven. De volgende vragen gaan over hoe u met de klachten omgaat en wat de gevolgen van deze klachten zijn voor uw lichamelijke gezondheid en psychisch welbevinden.


Er zijn geen goede of foute antwoorden.  We zijn geïnteresseerd in uw opvattingen en niet in die van uw naasten of van hulpverleners.


Beantwoord de vragen eerlijk en denk niet te lang na over uw antwoorden.  `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'CBRQ_Header');

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
            ["nl", this.markdownContent1],
          ]),
          className: ''
        })
      ]
    })
  }
}


export class CBRQ1 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Geef aan in hoeverre u het eens of oneens bent met de volgende uitspraken over uw huidige klachten door een bolletje aan te klikken in de kolom. '],
      ]),
    },
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'CBRQ1');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.responsiveSingleChoiceArray({
      defaultMode: 'horizontal',
      responsiveModes: {
        md: 'table',
        sm: 'horizontal'
      },
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      scaleOptions: [
        {
          key: '1', content: new Map([
            ["nl", "in hoge mate mee oneens"],
          ])
        }, {
          key: '2', content: new Map([
            ["nl", "mee oneens"],
          ])
        }, {
          key: '3', content: new Map([
            ["nl", "niet eens en niet mee oneens"],
          ])
        }, {
          key: '4', content: new Map([
            ["nl", "mee eens"],
          ])
        }, {
          key: '5', content: new Map([
            ["nl", "in hoge mate mee eens"],
          ])
        }
      ],
      rows: [
        {
          key: 'a', content: new Map([
            ["nl", "Ik ben bang dat mijn klachten erger worden door lichamelijke inspanning."],
          ])
        },
        {
          key: 'b',
          content: new Map([
            ["nl", "Lichaamsbeweging vermindert mijn klachten."],
          ])
        },
        {
          key: 'c',
          content: new Map([
            ["nl", "De veiligste manier om te voorkomen dat mijn klachten erger worden is ervoor te zorgen dat ik geen onnodige activiteiten verricht."],
          ])
        },
        {
          key: 'd',
          content: new Map([
            ["nl", "Lichamelijke activiteit verergert mijn klachten."],
          ]),
        },
        {
          key: 'e',
          content: new Map([
            ["nl", "Minder doen helpt tegen de klachten."],
          ])
        },
        {
          key: 'f',
          content: new Map([
            ["nl", "Ik zou lichamelijke inspanning moeten vermijden wanneer ik klachten heb."],
          ])
        },
        {
          key: 'g',
          content: new Map([
            ["nl", "Ik maak me er zorgen over dat ik blijvend bedlegerig word als gevolg van mijn klachten."],
          ])
        },
        {
          key: 'h',
          content: new Map([
            ["nl", "Ik denk dat als mijn klachten te erg worden ze nooit meer zullen afnemen."],
          ])
        },
        {
          key: 'i',
          content: new Map([
            ["nl", "Mijn ziekte is verschrikkelijk en ik word er door overspoeld."],
          ])
        },
        {
          key: 'j',
          content: new Map([
            ["nl", "Ik zal me nooit meer goed voelen."],
          ])
        },
        {
          key: 'k',
          content: new Map([
            ["nl", "Wanneer ik klachten heb denk ik er voortdurend aan."],
          ])
        },
        {
          key: 'l',
          content: new Map([
            ["nl", "Als ik klachten heb maak ik mij hier zorgen over."],
          ])
        },
        {
          key: 'm',
          content: new Map([
            ["nl", "Als ik klachten heb is het moeilijk om aan iets anders te denken."],
          ])
        },
        {
          key: 'n',
          content: new Map([
            ["nl", "Ik denk veel aan mijn klachten."],
          ])
        },
        {
          key: 'o',
          content: new Map([
            ["nl", "Mijn klachten zijn altijd in mijn gedachten aanwezig."],
          ])
        },
        {
          key: 'p',
          content: new Map([
            ["nl", "Ik besteed veel tijd aan het nadenken over mijn ziekte."],
          ])
        }
      ]
    })
  }
}

export class CBRQ_Header2 extends Item {

  markdownContent2 = `
We willen graag weten hoe u op dit moment omgaat met uw klachten. Hieronder worden een aantal verschillende manieren van omgaan met klachten genoemd. `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'CBRQ_Header2');

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
            ["nl", this.markdownContent2],
          ]),
          className: ''
        })
      ]
    })
  }
}


export class CBRQ2 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Geef aan hoe vaak u op de volgende manieren met klachten omgaat door het bolletje aan te klikken in het vakje wat op u van toepassing is. Kies het antwoord wat het beste bij U past, niet wat u denkt dat de meeste mensen zouden doen. '],
      ]),
    },
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'CBRQ2');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.responsiveSingleChoiceArray({
      defaultMode: 'horizontal',
      responsiveModes: {
        md: 'table',
        sm: 'horizontal'
      },
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      scaleOptions: [
        {
          key: '1', content: new Map([
            ["nl", "Nooit"],
          ])
        }, {
          key: '2', content: new Map([
            ["nl", "Soms"],
          ])
        }, {
          key: '3', content: new Map([
            ["nl", "Regelmatig"],
          ])
        }, {
          key: '4', content: new Map([
            ["nl", "Vaak"],
          ])
        }, {
          key: '5', content: new Map([
            ["nl", "Altijd"],
          ])
        }
      ],
      rows: [
        {
          key: 'a', content: new Map([
            ["nl", "Ik blijf in bed om mijn klachten onder controle te houden."],
          ])
        },
        {
          key: 'b',
          content: new Map([
            ["nl", "Als ik klachten heb ga ik rusten."],
          ])
        },
        {
          key: 'c',
          content: new Map([
            ["nl", "Ik heb de neiging om activiteiten te vermijden die mijn klachten verergeren."],
          ])
        },
        {
          key: 'd',
          content: new Map([
            ["nl", "Ik slaap overdag om mijn klachten onder controle te houden."],
          ]),
        },
        {
          key: 'e',
          content: new Map([
            ["nl", "Wanneer ik mij energiek voel heb ik de neiging om te veel te doen."],
          ])
        },
        {
          key: 'f',
          content: new Map([
            ["nl", "Ik merk dat ik mijzelf haast om dingen af te maken voordat ik in elkaar stort. "],
          ])
        },
        {
          key: 'g',
          content: new Map([
            ["nl", "Ik heb de neiging te veel te doen en vervolgens te rusten.  "],
          ])
        },
        {
          key: 'h',
          content: new Map([
            ["nl", "Ik heb de neiging om op een goede dag veel te doen en op een slechte dag te rusten. "],
          ])
        },
        {
          key: 'i',
          content: new Map([
            ["nl", "Ik ga slapen als ik moe ben om mijn klachten onder controle te houden."],
          ])
        },
        {
          key: 'j',
          content: new Map([
            ["nl", "Ik vermijd sociale contacten als ik mij er niet goed genoeg voor voel. "],
          ])
        },
        {
          key: 'k',
          content: new Map([
            ["nl", "Ik vermijd inspanning om mijn klachten onder controle te houden. "],
          ])
        },
        {
          key: 'l',
          content: new Map([
            ["nl", "Als het op dingen doen aankomt ben ik iemand van “alles of niets”. "],
          ])
        },
        {
          key: 'm',
          content: new Map([
            ["nl", "Ik vermijd stressvolle situaties. "],
          ])
        }
      ]
    })
  }
}
