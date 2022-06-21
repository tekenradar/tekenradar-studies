import { Expression } from 'survey-engine/data_types';
import { Item } from 'case-editor-tools/surveys/types';
import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';


export class IntroWeeklyTBInit extends Item {
  markdownContent = `
# Wekelijkse tekenbeetmeldingen

Met de volgende vragen willen we meten of het aantal tekenbeten per week verandert. Daarom is het belangrijk de vragenlijst te blijven invullen, ook als je langere tijd géén tekenbeten hebt.

Geef het daadwerkelijke aantal tekenbeten op, ook als je meerdere tekenbeten op hetzelfde moment had.
`

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'IntroWeeklyTBInit');

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

export class IntroWeeklyTB extends Item {

  markdownContent = `
# Wekelijkse tekenbeetmeldingen

Met de volgende vraag willen we meten of het aantal tekenbeten per week verandert. Daarom is het belangrijk de vragenlijst te blijven invullen, ook als je langere tijd géén tekenbeten hebt.

Geef het daadwerkelijke aantal tekenbeten op, ook als je meerdere tekenbeten op hetzelfde moment had.
`

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'IntroWeeklyTB');

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


export class WeeklyTBConsent extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'WeeklyTBConsent');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.consent({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Toestemming'],
      ]),
      checkBoxLabel: new Map([
        ["nl", "Toestemming geven"],
      ]),
      topDisplayCompoments: [
        ComponentGenerators.markdown({
          content: new Map([
            ["nl", `
Om met dit profiel mee te doen aan het Tekenradar vragenlijst onderzoek hebben we eerst je toestemming nodig. Vink hieronder "Toestemming geven" aan om de toestemmingsverklaring te kunnen lezen.
*We vragen ook om toestemming bij het aanmaken van een account. Omdat meerdere personen/profielen gebruik kunnen maken van hetzelfde account, is het nodig om hier voor dit profiel apart toestemming te geven.*

`]]),
        })
      ],
      dialogTitle: new Map([
        ["nl", "Toestemmingsformulier"],
      ]),
      dialogContent: new Map([
        ["nl", `
**Scroll naar beneden om de hele tekst te lezen, geef onderaan wel of geen toestemming.**

Via Tekenradar.nl wordt onderzocht hoe vaak mensen een tekenbeet krijgen, en/of hoe vaak dat leidt tot een erythema migrans (rode ring of vlek op de huid) of een andere vorm van de ziekte van Lyme krijgen, en hoe vaak dit leidt tot (ernstige) gezondheidsklachten. Meer informatie over onder andere het doel van het onderzoek en je rechten kun je vinden in de [privacyverklaring van Tekenradar](/privacy) en de [RIVM privacyverklaring](https://www.rivm.nl/sites/default/files/2018-11/RIVM%20%20Privacyverklaring%20mei%202018%20definitief%20Nederlands.pdf).

Door onderaan de knop “Ja, ik geef toestemming” aan te klikken stem ik in met deelname aan het vragenlijst onderzoek “Tekenradar” en ga ik akkoord dat het RIVM en/of samenwerkingspartners mijn gegevens voor dit onderzoek zullen verwerken.

Ook:
- Heb ik de informatie op de website van het Tekenradar onderzoek over het basisonderzoek en de privacyverklaring over de verwerking van de persoonsgegevens door het RIVM goed gelezen en begrepen.
- Heb ik goed over mijn deelname aan het onderzoek kunnen nadenken.
- Weet ik dat ik hiervoor mails kan ontvangen vanaf noreply@tekenradar.nl.
- Weet ik dat meedoen aan het onderzoek vrijwillig is. Ik weet ook dat ik op ieder moment, zonder opgaaf van een reden, kan stoppen met deelname aan het onderzoek en dat ik mijn toestemming voor de verwerking van mijn persoonsgegevens kan intrekken. Ik begrijp dat het intrekken van mijn toestemming geen gevolgen heeft voor de verwerking van mijn persoonsgegevens in de periode voorafgaand aan het intrekken van mijn toestemming.
- Weet ik dat mijn accountgegevens 10 jaar na de laatste inlog op de website van Tekenradar en mijn onderzoeksgegevens 15 jaar worden bewaard (zie voor meer informatie de privacyverklaring).
- Weet ik dat voor het onderzoek mijn accountgegevens (e-mailadres en wachtwoord) en onderzoeksgegevens (de ingevulde vragenlijsten; met daarin mijn geboortejaar en maand en gegevens over mijn gezondheid) worden verwerkt.
- Geef ik hierna in de vragenlijst aan of mijn emailadres in de toekomst ook gebruikt mogen worden om mij te benaderen voor aanvullend (deel)onderzoek via Tekenradar.
- Verklaar ik dat ik 16 jaar of ouder ben, of dat ik de ouder/voogd ben van een kind minder dan 16 jaar oud waarover deze melding gaat (als er twee ouders/voogden zijn moeten zij beiden met deelname instemmen, en bij een kind van 12 t/m 15 jaar moet ook het kind zelf instemmen met deelname aan het onderzoek).
       `]]),
      acceptBtn: new Map([
        ["nl", "Ja, ik geef toestemming"],
      ]),
      rejectBtn: new Map([
        ["nl", "Ik doe toch niet mee"],
      ]),
    })
  }
}


export class NewStudies extends Item {
  optionKeys = {
    yes: 'a'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'NewStudies');

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
        ['nl', 'Soms benaderen we deelnemers aan tekenradar voor aanvullend onderzoek. Daarna kun je dan beslissen of je mee wilt doen. Het kan ook zijn dat we je niet benaderen. Mogen we jou eventueel benaderen om meer informatie te kunnen geven over dat soort onderzoek?'],
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


export class NumberTickBitesWeekly extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'WeeklyTB1');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.numericInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: //SurveyEngine.timestampWithOffset({ seconds: 0 }),
        new Map([
          ['nl', 'Hoeveel tekenbeten heb je gehad in de afgelopen week?'],
        ]),
      titleClassName: 'sticky-top',
      inputMaxWidth: '80px',
      inputLabel: new Map([
        ['nl', '']
      ]),
      componentProperties: {
        min: 0,
        max: 100
      }
    })
  }
}



export class NumberTickBites2a extends Item {

  date = new Date();

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'WeeklyTB2a');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.numericInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: [
        {
          content: new Map([
            ['nl', `Hoeveel tekenbeten had je vandaag, `],
          ])
        },
        {
          date: SurveyEngine.timestampWithOffset({ days: 0 }),
          //dateFormat: 'EEEE (dd.MM)',
          dateFormat: 'EEEE (dd.MM.)',
          languageCodes: ['nl']
        }
      ],
      titleClassName: 'sticky-top',
      inputMaxWidth: '80px',
      inputLabel: new Map([
        ['nl', '']
      ]),
      componentProperties: {
        min: 0,
        max: 100
      }
    })
  }
}


export class NumberTickBites2b extends Item {

  date = new Date();

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'WeeklyTB2b');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.numericInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: [
        {
          content: new Map([
            ['nl', `Hoeveel teken had je gisteren `],
          ])
        },
        {
          date: SurveyEngine.timestampWithOffset({ days: -1 }),
          dateFormat: 'EEEE (dd.MM.)',
          languageCodes: ['nl']
        },
        {
          content: new Map([
            ['nl', `?`],
          ])
        },
      ],
      titleClassName: 'sticky-top',
      inputMaxWidth: '80px',
      inputLabel: new Map([
        ['nl', '']
      ]),
      componentProperties: {
        min: 0,
        max: 100
      }
    })
  }
}


export class NumberTickBites2c extends Item {

  date = new Date();

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'WeeklyTB2c');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.numericInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: [
        {
          content: new Map([
            ['nl', `Hoeveel teken had je eergisteren, `],
          ])
        },
        {
          date: SurveyEngine.timestampWithOffset({ days: -2 }),
          dateFormat: 'EEEE (dd.MM.)',
          languageCodes: ['nl']
        },
        {
          content: new Map([
            ['nl', `?`],
          ])
        }
      ],
      titleClassName: 'sticky-top',
      inputMaxWidth: '80px',
      inputLabel: new Map([
        ['nl', '']
      ]),
      componentProperties: {
        min: 0,
        max: 100
      }
    })
  }
}


export class NumberTickBites2d extends Item {

  date = new Date();

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'WeeklyTB2d');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.numericInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: [
        {
          content: new Map([
            ['nl', `Hoeveel teken had je afgelopen `],
          ])
        },
        {
          date: SurveyEngine.timestampWithOffset({ days: -3 }),
          dateFormat: 'EEEE (dd.MM.)',
          languageCodes: ['nl']
        },
        {
          content: new Map([
            ['nl', `?`],
          ])
        }
      ],
      titleClassName: 'sticky-top',
      inputMaxWidth: '80px',
      inputLabel: new Map([
        ['nl', '']
      ]),
      componentProperties: {
        min: 0,
        max: 100
      }
    })
  }
}


export class NumberTickBites2e extends Item {

  date = new Date();

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'WeeklyTB2e');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.numericInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: [
        {
          content: new Map([
            ['nl', `Hoeveel teken had je afgelopen `],
          ])
        },
        {
          date: SurveyEngine.timestampWithOffset({ days: -4 }),
          dateFormat: 'EEEE (dd.MM.)',
          languageCodes: ['nl']
        },
        {
          content: new Map([
            ['nl', `?`],
          ])
        }
      ],
      titleClassName: 'sticky-top',
      inputMaxWidth: '80px',
      inputLabel: new Map([
        ['nl', '']
      ]),
      componentProperties: {
        min: 0,
        max: 100
      }
    })
  }
}



export class NumberTickBites2f extends Item {

  date = new Date();

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'WeeklyTB2f');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.numericInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: [
        {
          content: new Map([
            ['nl', `Hoeveel teken had je afgelopen `],
          ])
        },
        {
          date: SurveyEngine.timestampWithOffset({ days: -5 }),
          dateFormat: 'EEEE (dd.MM.)',
          languageCodes: ['nl']
        },
        {
          content: new Map([
            ['nl', `?`],
          ])
        }
      ],
      titleClassName: 'sticky-top',
      inputMaxWidth: '80px',
      inputLabel: new Map([
        ['nl', '']
      ]),
      componentProperties: {
        min: 0,
        max: 100
      }
    })
  }
}



export class NumberTickBites2g extends Item {

  date = new Date();

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'WeeklyTB2g');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.numericInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: [
        {
          content: new Map([
            ['nl', `Hoeveel teken had je afgelopen `],
          ])
        },
        {
          date: SurveyEngine.timestampWithOffset({ days: -6 }),
          dateFormat: 'EEEE (dd.MM.)',
          languageCodes: ['nl']
        },
        {
          content: new Map([
            ['nl', `?`],
          ])
        }
      ],
      titleClassName: 'sticky-top',
      inputMaxWidth: '80px',
      inputLabel: new Map([
        ['nl', '']
      ]),
      componentProperties: {
        min: 0,
        max: 100
      }
    })
  }
}

