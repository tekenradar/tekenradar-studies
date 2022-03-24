import { ClozeItemTypes, SurveyEngine, SurveyItems } from "case-editor-tools/surveys";
import { Group, Item } from "case-editor-tools/surveys/types";
import { Expression } from 'survey-engine/data_types';
import { ComponentGenerators } from "case-editor-tools/surveys/utils/componentGenerators";
import { ParticipantFlags } from "../../participantFlags";

export class UitnodigingOnderzoekText extends Item {
  markdownContent = `
## Uitnodiging Tekenradar-vragenlijstonderzoek

Wij willen je vragen om mee te doen aan het Tekenradar-vragenlijstonderzoek onderzoek, omdat je een tekenbeet of de ziekte van Lyme hebt gemeld. Door mee te doen draag je bij aan kennis over tekenbeten en de ziekte van Lyme, en de gezondheidsgevolgen hiervan.
Als je mee wilt doen, volgen hierna direct nog een aantal extra vragen over je gezondheid. Ook krijg je het komende jaar iedere 3 maanden een vervolgvragenlijst met vragen over je gezondheid. Voor het invullen van de vervolgvragenlijsten ontvang je per e-mail een herinnering via noreply@tekenradar.nl.
`

  constructor(parentKey: string, condition?: Expression) {
    super(parentKey, 'UitnTR_Pretext');

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


export class UitnodigingOnderzoek extends Item {
  optionKeys = {
    yes: 'a',
    no: 'b'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'UitnTR');

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
        ['nl', 'Wil je meedoen aan het Tekenradar onderzoek naar tekenbeten en de ziekte van Lyme?'],
      ]),
      responseOptions: [
        {
          key: this.optionKeys.yes, role: 'option',
          content: new Map([
            ["nl", "Ja"],
          ])
        },
        {
          key: this.optionKeys.no, role: 'option',
          content: new Map([
            ["nl", "Nee"],
          ])
        },
      ]
    })
  }
}
export class UitnodigingOnderzoekConsent extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'UitnTR_Consent');

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
        ['nl', ''],
      ]),
      checkBoxLabel: new Map([
        ["nl", "Toestemming geven"],
      ]),
      topDisplayCompoments: [
        ComponentGenerators.markdown({
          content: new Map([
            ["nl", `
Om met dit profiel mee te doen aan het Tekenradar-vragenlijstonderzoek hebben we je toestemming nodig. Vink hieronder "Toestemming geven" aan om de toestemmingsverklaring te kunnen lezen.
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

Via Tekenradar.nl wordt onderzocht hoe vaak mensen na een tekenbeet een erythema migrans (rode ring of vlek op de huid) of een andere vorm van de ziekte van Lyme krijgen, en hoe vaak dit leidt tot (ernstige) gezondheidsklachten. Meer informatie over onder andere het doel van het onderzoek en je rechten kun je vinden in de [privacyverklaring van Tekenradar](/privacy) en de [RIVM privacyverklaring](https://www.rivm.nl/sites/default/files/2018-11/RIVM%20%20Privacyverklaring%20mei%202018%20definitief%20Nederlands.pdf).

Door onderaan de knop “Ja, ik geef toestemming” aan te klikken stem ik in met deelname aan het vragenlijst onderzoek “Tekenradar” en ga ik akkoord dat het RIVM en/of samenwerkingspartners mijn gegevens voor dit onderzoek zullen verwerken.

Ook:
- Heb ik de informatie op de website van het Tekenradar onderzoek over het basisonderzoek en de privacyverklaring over de verwerking van de persoonsgegevens door het RIVM goed gelezen en begrepen.
- Heb ik goed over mijn deelname aan het onderzoek kunnen nadenken.
- Weet ik dat ik hiervoor mails kan ontvangen vanaf noreply@tekenradar.nl.
- Weet ik dat meedoen aan het onderzoek vrijwillig is. Ik weet ook dat ik op ieder moment, zonder opgaaf van een reden, kan stoppen met deelname aan het onderzoek en dat ik mijn toestemming voor de verwerking van mijn persoonsgegevens kan intrekken. Ik begrijp dat het intrekken van mijn toestemming geen gevolgen heeft voor de verwerking van mijn persoonsgegevens in de periode voorafgaand aan het intrekken van mijn toestemming.
- Weet ik dat mijn accountgegevens 10 jaar na de laatste inlog op de website van Tekenradar en mijn onderzoeksgegevens 15 jaar worden bewaard (zie voor meer informatie de privacyverklaring).
- Weet ik dat voor het onderzoek mijn accountgegevens (e-mailadres en wachtwoord) en onderzoeksgegevens (de ingevulde vragenlijsten; met daarin onder mijn geboortejaar en maand en gegevens over mijn gezondheid) worden verwerkt.
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

export class kEMUitnodigingOnderzoekText extends Item {
  markdownContent = `
## Uitnodiging onderzoek ziekte van Lyme

Wij willen je vragen of je mee wilt doen aan Tekenradar onderzoek, omdat je een erythema migrans (rode ring of vlek na een tekenbeet als een vroege vorm van ziekte van Lyme) hebt gemeld. Door mee te doen draag je bij aan kennis over de ziekte van Lyme, en de gezondheidsgevolgen hiervan.
Als je mee wilt doen, volgen hierna direct nog een aantal extra vragen over je gezondheid. Ook vragen we je toestemming om je huisarts te mogen benaderen voor aanvullende gegevens over je erythema migrans, dit is vanzelfsprekend geheel vrijwillig. Het komende jaar krijg je daarna iedere 3 maanden een vervolgvragenlijst met vragen over je gezondheid. Voor het invullen van de vervolgvragenlijsten ontvang je per e-mail een herinnering via noreply@tekenradar.nl.
`

  constructor(parentKey: string, condition?: Expression) {
    super(parentKey, 'kEMUitnTR_Pretext');

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


export class kEMUitnodigingOnderzoek extends Item {
  optionKeys = {
    yes: 'a',
    no: 'b'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'kEMUitnTR');

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
        ['nl', 'Wil je meedoen aan het Tekenradar onderzoek naar de ziekte van Lyme?'],
      ]),
      responseOptions: [
        {
          key: this.optionKeys.yes, role: 'option',
          content: new Map([
            ["nl", "Ja"],
          ])
        },
        {
          key: this.optionKeys.no, role: 'option',
          content: new Map([
            ["nl", "Nee"],
          ])
        },
      ]
    })
  }
}
export class kEMUitnodigingOnderzoekConsent extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'kEMUitnTR_Consent');

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
        ['nl', ''],
      ]),
      checkBoxLabel: new Map([
        ["nl", "Toestemming geven"],
      ]),
      topDisplayCompoments: [
        ComponentGenerators.markdown({
          content: new Map([
            ["nl", `
Om met dit profiel mee te doen aan het Tekenradar-vragenlijstonderzoek hebben we je toestemming nodig. Vink hieronder "Toestemming geven" aan om de toestemmingsverklaring te kunnen lezen.
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


Via Tekenradar.nl wordt onderzocht hoe vaak mensen na een tekenbeet een erythema migrans (rode ring of vlek op de huid) of een andere vorm van de ziekte van Lyme krijgen, en hoe vaak dit leidt tot (ernstige) gezondheidsklachten. Meer informatie over onder andere het doel van het onderzoek en je rechten kun je vinden in de [privacyverklaring van Tekenradar](/privacy) en de [RIVM privacyverklaring](https://www.rivm.nl/sites/default/files/2018-11/RIVM%20%20Privacyverklaring%20mei%202018%20definitief%20Nederlands.pdf).

Door onderaan de knop “Ja, ik geef toestemming” aan te klikken stem ik in met deelname aan het vragenlijst onderzoek “Tekenradar” en ga ik akkoord dat het RIVM en/of samenwerkingspartners mijn gegevens voor dit onderzoek zullen verwerken. Ook stem ik er mee in dat mijn huisarts en/of ikzelf eventueel benaderd worden voor medische informatie over de melding die ik heb gedaan op Tekenradar en ga ik ermee akkoord dat het RIVM en/of samenwerkingspartners daarvoor mijn contactgegevens zullen verwerken.

Ook:
- Heb ik de informatie op de website van het Tekenradar onderzoek over het basisonderzoek en de privacyverklaring over de verwerking van de persoonsgegevens door het RIVM goed gelezen en begrepen.
- Heb ik goed over mijn deelname aan het onderzoek kunnen nadenken.
- Weet ik dat ik hiervoor mails kan ontvangen vanaf noreply@tekenradar.nl.
- Weet ik dat meedoen aan het onderzoek vrijwillig is. Ik weet ook dat ik op ieder moment, zonder opgaaf van een reden, kan stoppen met deelname aan het onderzoek en dat ik mijn toestemming voor de verwerking van mijn persoonsgegevens kan intrekken. Ik begrijp dat het intrekken van mijn toestemming geen gevolgen heeft voor de verwerking van mijn persoonsgegevens in de periode voorafgaand aan het intrekken van mijn toestemming.
- Weet ik dat mijn accountgegevens 10 jaar na de laatste inlog op de website van Tekenradar en mijn onderzoeksgegevens 15 jaar worden bewaard (zie voor meer informatie de privacyverklaring).
- Weet ik dat voor het onderzoek mijn accountgegevens (e-mailadres en wachtwoord) en onderzoeksgegevens (de ingevulde vragenlijsten; met daarin onder mijn geboortejaar en maand en gegevens over mijn gezondheid) worden verwerkt.
- Geef ik hierna in de vragenlijst aan of mijn persoonsgegevens in de toekomst ook gebruikt mogen worden om mij te benaderen voor aanvullend (deel)onderzoek via Tekenradar.
- Weet ik dat als mijn contactgegevens niet (meer) gebruikt worden deze na 12 weken worden verwijderd.
- Weet ik dat ik daarna nog wel benaderd kan worden voor aanvullend onderzoek via het e-mailadres dat verbonden is aan mijn account. Hiervoor hoeven mijn contactgegevens niet door het RIVM en/of samenwerkingspartners ingezien te worden.
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


export class UitnodigingAanvullendOnderzoekText extends Item {

  markdownContent = `
## Aanvullend onderzoek

Mensen die meedoen aan Tekenradar onderzoek kunnen in aanmerking komen voor aanvullend wetenschappelijk onderzoek, waarbij soms ook (vrijwillig) bloed wordt afgenomen. Mogen we jou eventueel benaderen om meer informatie te kunnen geven over dat soort onderzoek? Daarna kun je dan beslissen of je mee wilt doen. Het kan ook zijn dat je niet in aanmerking komt, en dat we je dus niet benaderen.
`

  constructor(parentKey: string, condition?: Expression) {
    super(parentKey, 'AOPreText');

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


export class UitnodigingAanvullendOnderzoek extends Item {
  optionKeys = {
    yes: 'a',
    no: 'b'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'UitnAO');

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
        ['nl', 'Mogen we je benaderen voor aanvullend wetenschappelijk onderzoek?'],
      ]),
      responseOptions: [
        {
          key: this.optionKeys.yes, role: 'option',
          content: new Map([
            ["nl", "Ja, ik wil benaderd worden voor aanvullend onderzoek"],
          ])
        },
        {
          key: this.optionKeys.no, role: 'option',
          content: new Map([
            ["nl", "Nee, ik wil niet benaderd worden voor aanvullend onderzoek."],
          ])
        },
      ],
    })
  }
}

export class UitnodigingAanvullendOnderzoekConsent extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'UitnAO_Consent');

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
        ['nl', ''],
      ]),
      checkBoxLabel: new Map([
        ["nl", "Toestemming geven"],
      ]),
      topDisplayCompoments: [
        ComponentGenerators.markdown({
          content: new Map([
            ["nl", `
Om je te benaderen voor aanvullend onderzoek hebben we ook je toestemming nodig. Vink hieronder "Toestemming geven" aan om de toestemmingsverklaring te kunnen lezen.
        `]]),
        })
      ],
      dialogTitle: new Map([
        ["nl", "Toestemmingsformulier"],
      ]),
      dialogContent: new Map([
        ["nl", `
**Scroll naar beneden om de hele tekst te lezen, geef onderaan wel of geen toestemming.**

Door hieronder de knop “Ja, ik geef toestemming” aan te klikken stem ik in om eventueel benaderd te worden voor aanvullend (deel)onderzoek via Tekenradar en ga ik akkoord dat het RIVM en/of samenwerkingspartners indien nodig mijn contactgegevens zullen verwerken.
Meer informatie over onder andere het doel van Tekenradar onderzoek en je rechten kun je vinden in de [privacyverklaring van Tekenradar](/privacy) en de [RIVM privacyverklaring](https://www.rivm.nl/sites/default/files/2018-11/RIVM%20%20Privacyverklaring%20mei%202018%20definitief%20Nederlands.pdf).

Ook:

- Weet ik dat ik op ieder moment, zonder opgaaf van een reden, mijn toestemming voor de verwerking van mijn persoonsgegevens kan intrekken. Ik begrijp dat het intrekken van mijn toestemming geen gevolgen heeft voor de verwerking van mijn persoonsgegevens in de periode voorafgaand aan het intrekken van mijn toestemming.
- Weet ik dat ik hiervoor mails kan ontvangen vanaf noreply@tekenradar.nl.
- Weet ik dat als mijn contactgegevens niet (meer) gebruikt worden deze na 12 weken worden verwijderd.
- Weet ik dat ik daarna nog wel benaderd kan worden voor aanvullend onderzoek via het e-mailadres dat verbonden is aan mijn account. Hiervoor hoeven mijn contactgegevens niet door het RIVM en/of samenwerkingspartners verwerkt te worden.
- Verklaar ik dat ik 16 jaar of ouder ben, of dat ik de ouder/voogd ben van een kind minder dan 16 jaar oud waarover deze melding gaat (als er twee ouders/voogden zijn moeten zij beiden met deelname instemmen, en bij een kind van 12 t/m 15 jaar moet ook het kind zelf instemmen met deelname aan het onderzoek).
        `]]),
      acceptBtn: new Map([
        ["nl", "Ja, ik geef toestemming"],
      ]),
      rejectBtn: new Map([
        ["nl", "Ik wil toch niet benaderd worden"],
      ]),
    })
  }
}


class ContactGroupPretext extends Item {

  markdownContent = `
**Vul hieronder je contactgegevens in.**

We vragen opnieuw om je e-mailadres en soms ook andere gegevens omdat we de eerder ingevulde gegevens vanwege privacyregelgeving niet zomaar mogen inzien. Je kunt als je dat wilt wel hetzelfde e-mailadres invullen.
Je contactgegevens worden alleen gebruikt voor het Tekenradar onderzoek en/of om informatie te geven over aanvullende onderzoeken naar tekenbeten, ziekte van Lyme, of andere (tekenoverdraagbare) infectieziekten.
`

  constructor(parentKey: string, condition?: Expression) {
    super(parentKey, 'ContactGroupPretext');

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

class GP extends Item {
  optionKeys = {
    nameOffice: 'pn',
    nameDoc: 'nh',
    place: 'plaats'
  }

  constructor(parentKey: string, required: boolean, condition?: Expression) {
    super(parentKey, 'GP');

    this.condition = condition;
    this.isRequired = required;
  }

  buildItem() {
    return SurveyItems.clozeQuestion({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      isRequired: this.isRequired,
      questionText: new Map([[
        'nl', 'De gegevens van mijn huisarts:'
      ]]),
      confidentialMode: "add",
      items: [
        ClozeItemTypes.text({ key: 't1', content: new Map([['nl', 'Praktijknaam: ']]) }),
        ClozeItemTypes.textInput({ key: this.optionKeys.nameOffice, className: 'w-100' }),
        ClozeItemTypes.clozeLineBreak(),
        ClozeItemTypes.text({ key: 't2', content: new Map([['nl', 'Naam huisarts: ']]) }),
        ClozeItemTypes.textInput({ key: this.optionKeys.nameDoc, className: 'w-100' }),
        ClozeItemTypes.clozeLineBreak(),
        ClozeItemTypes.text({ key: 'taddr', className: 'fw-bold mt-2', content: new Map([['nl', 'Adres: ']]) }),
        ClozeItemTypes.clozeLineBreak(),
        ClozeItemTypes.text({ key: 't3', content: new Map([['nl', 'Straatnaam: ']]) }),
        ClozeItemTypes.textInput({ key: 'str', className: 'flex-grow-1' }),
        ClozeItemTypes.text({ key: 't4', content: new Map([['nl', 'Huisnummer: ']]) }),
        ClozeItemTypes.textInput({ key: 'hnr', className: '' }),
        ClozeItemTypes.clozeLineBreak(),
        ClozeItemTypes.text({ key: 't5', content: new Map([['nl', 'Postcode: ']]) }),
        ClozeItemTypes.textInput({ key: 'pc', className: '' }),
        ClozeItemTypes.text({ key: 't6', content: new Map([['nl', 'Plaats: ']]) }),
        ClozeItemTypes.textInput({ key: this.optionKeys.place, className: 'flex-grow-1' }),
        ClozeItemTypes.clozeLineBreak(),
        ClozeItemTypes.text({ key: 'tcont', className: 'fw-bold mt-2', content: new Map([['nl', 'Contact: ']]) }),
        ClozeItemTypes.clozeLineBreak(),
        ClozeItemTypes.text({ key: 't7', content: new Map([['nl', 'Telefoonnummer praktijk: ']]) }),
        ClozeItemTypes.textInput({ key: 'tel', className: 'w-100' }),
      ],
      customValidations: [
        {
          key: 'DocAddress', rule: SurveyEngine.logic.and(
            SurveyEngine.hasResponse(this.key, `rg.cloze.${this.optionKeys.nameOffice}`),
            SurveyEngine.hasResponse(this.key, `rg.cloze.${this.optionKeys.nameDoc}`),
            SurveyEngine.hasResponse(this.key, `rg.cloze.${this.optionKeys.place}`),
          ), type: 'hard'
        }
      ]
    })
  }
}

class Name extends Item {

  optionKeys = {
    forename: 'vn',
    surname: 'an'
  }


  constructor(parentKey: string, required: boolean, condition?: Expression) {
    super(parentKey, 'Naam');

    this.condition = condition;
    this.isRequired = required;
  }

  buildItem() {
    return SurveyItems.clozeQuestion({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      isRequired: this.isRequired,
      questionText: new Map([[
        'nl', 'Naam'
      ]]),
      confidentialMode: "replace",
      items: [
        ClozeItemTypes.text({ key: 't1', content: new Map([['nl', 'Voornaam: ']]) }),
        ClozeItemTypes.textInput({ key: this.optionKeys.forename, className: 'flex-grow-1', alignText: 'start' }),
        ClozeItemTypes.clozeLineBreak(),
        ClozeItemTypes.text({ key: 't2', content: new Map([['nl', 'Achternaam: ']]) }),
        ClozeItemTypes.textInput({ key: this.optionKeys.surname, className: 'flex-grow-1', alignText: 'start' }),
      ],
      customValidations: [
        {
          key: 'Name', rule: SurveyEngine.logic.and(
            SurveyEngine.hasResponse(this.key, `rg.cloze.${this.optionKeys.forename}`),
            SurveyEngine.hasResponse(this.key, `rg.cloze.${this.optionKeys.surname}`),
          ), type: 'hard'
        }
      ]
    })
  }
}

class Birthday extends Item {
  constructor(parentKey: string, required: boolean, condition?: Expression) {
    super(parentKey, 'Birthday');

    this.condition = condition;
    this.isRequired = required;
  }

  buildItem() {
    return SurveyItems.dateInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      isRequired: this.isRequired,
      questionText: new Map([[
        'nl', 'Mijn geboortedatum:'
      ]]),
      confidentialMode: "replace",
      dateInputMode: 'YMD',
      maxRelativeDate: { delta: { days: 0 } },
      // minRelativeDate: { delta: { years: -19 } },
    })
  }
}

class Email extends Item {
  constructor(parentKey: string, required: boolean, condition?: Expression) {
    super(parentKey, 'Email');

    this.condition = condition;
    this.isRequired = required;
  }

  buildItem() {
    return SurveyItems.textInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      isRequired: this.isRequired,
      questionText: new Map([[
        'nl', 'Email'
      ]]),
      confidentialMode: "replace",
      placeholderText: new Map([['nl', 'voer je e-mailadres in']])
    })
  }
}

class Telephone extends Item {
  constructor(parentKey: string, required: boolean, condition?: Expression) {
    super(parentKey, 'Tel');

    this.condition = condition;
    this.isRequired = required;
  }

  buildItem() {
    return SurveyItems.textInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      isRequired: this.isRequired,
      questionText: new Map([[
        'nl', 'Mijn telefoonnummer'
      ]]),
      confidentialMode: "replace",
      placeholderText: new Map([['nl', 'voer je telefoonnummer in']])
    })
  }
}

class GenderForContact extends Item {
  optionKeys = {
    male: 'a',
    female: 'b',
    other: 'c'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'GENDER');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      confidentialMode: 'replace',
      questionText: new Map([
        ['nl', 'Wat is je geslacht?'],
      ]),
      responseOptions: [
        {
          key: this.optionKeys.male, role: 'option',
          content: new Map([
            ["nl", "Man"],
          ])
        },
        {
          key: this.optionKeys.female, role: 'option',
          content: new Map([
            ["nl", "Vrouw"],
          ])
        },
        {
          key: this.optionKeys.other, role: 'option',
          content: new Map([
            ["nl", "Geen van bovenstaande"],
          ])
        },
      ]
    })
  }
}


export class ContactgegevensGroup extends Group {
  PreText: ContactGroupPretext;
  Name: Name;
  Email: Email;
  Telephone: Telephone;
  Gender: GenderForContact;
  Birthday: Birthday;
  GP: GP;

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Contactgegevens');

    this.groupEditor.setCondition(condition);

    this.PreText = new ContactGroupPretext(this.key)
    this.Name = new Name(this.key, isRequired)
    this.Email = new Email(this.key, isRequired)

    const showTelQ = SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.kEM.key, ParticipantFlags.kEM.values.likely);
    this.Telephone = new Telephone(this.key, isRequired, showTelQ)

    const showGenderQ = SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.kEM.key, ParticipantFlags.kEM.values.likely);
    this.Gender = new GenderForContact(this.key, isRequired, showGenderQ)

    const showBirthdayQ = SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.kEM.key, ParticipantFlags.kEM.values.likely);
    this.Birthday = new Birthday(this.key, isRequired, showBirthdayQ)

    const showGPq = SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.kEM.key, ParticipantFlags.kEM.values.likely)
    this.GP = new GP(this.key, isRequired, showGPq)
  }

  buildGroup(): void {
    this.addItem(this.PreText.get())
    this.addItem(this.Name.get())
    this.addItem(this.Email.get())

    this.addItem(this.Telephone.get())
    this.addItem(this.Birthday.get())
    this.addItem(this.Gender.get())
    this.addItem(this.GP.get())

  }
}

class FutureStudies extends Item {
  constructor(parentKey: string, required: boolean, condition?: Expression) {
    super(parentKey, 'FS');

    this.condition = condition;
    this.isRequired = required;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      isRequired: this.isRequired,
      questionText: new Map([[
        'nl', 'Het kan zijn dat je in de toekomst nog in aanmerking komt voor aanvullend of vervolgonderzoek naar tekenbeten of infectieziekten. Mogen we je dan eventueel ook benaderen voor die onderzoeken?'
      ]]),
      responseOptions: [
        {
          key: 'a', role: 'option', content: new Map([['nl', 'Ja']])
        },
        {
          key: 'b', role: 'option', content: new Map([['nl', 'Nee']])
        },
      ]
    })
  }
}

export class StandardInviteGroup extends Group {
  // Standard Tekenradar
  T1: UitnodigingOnderzoekText;
  UitnodigingOnderzoek: UitnodigingOnderzoek;
  UitnodigingOnderzoekConsent: UitnodigingOnderzoekConsent;

  // Other studies
  T2: UitnodigingAanvullendOnderzoekText;
  UitnodigingAanvullendOnderzoek: UitnodigingAanvullendOnderzoek;
  UitnodigingAanvullendOnderzoekConsent: UitnodigingAanvullendOnderzoekConsent;
  Contactgegevens: ContactgegevensGroup;

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'STD');

    this.groupEditor.setCondition(condition);

    this.T1 = new UitnodigingOnderzoekText(this.key);
    this.UitnodigingOnderzoek = new UitnodigingOnderzoek(this.key, isRequired);
    this.UitnodigingOnderzoekConsent = new UitnodigingOnderzoekConsent(this.key, isRequired, SurveyEngine.singleChoice.any(this.UitnodigingOnderzoek.key, this.UitnodigingOnderzoek.optionKeys.yes));

    const showAdditionalStudyInvite = SurveyEngine.singleChoice.any(this.UitnodigingOnderzoek.key, this.UitnodigingOnderzoek.optionKeys.yes);
    this.T2 = new UitnodigingAanvullendOnderzoekText(this.key, showAdditionalStudyInvite);
    this.UitnodigingAanvullendOnderzoek = new UitnodigingAanvullendOnderzoek(this.key, isRequired, showAdditionalStudyInvite);
    this.UitnodigingAanvullendOnderzoekConsent = new UitnodigingAanvullendOnderzoekConsent(this.key, isRequired, SurveyEngine.singleChoice.any(this.UitnodigingAanvullendOnderzoek.key, this.UitnodigingAanvullendOnderzoek.optionKeys.yes));
    this.Contactgegevens = new ContactgegevensGroup(this.key, isRequired, SurveyEngine.singleChoice.any(this.UitnodigingAanvullendOnderzoek.key, this.UitnodigingAanvullendOnderzoek.optionKeys.yes));
  }

  buildGroup(): void {
    this.addItem(this.T1.get());
    this.addItem(this.UitnodigingOnderzoek.get());
    this.addItem(this.UitnodigingOnderzoekConsent.get());
    this.addPageBreak()
    this.addItem(this.T2.get());
    this.addItem(this.UitnodigingAanvullendOnderzoek.get());
    this.addItem(this.UitnodigingAanvullendOnderzoekConsent.get());
    this.addItem(this.Contactgegevens.get())
  }
}


export class kEMInviteGroup extends Group {
  T0: kEMUitnodigingOnderzoekText;
  kEMUitnodigingOnderzoek: kEMUitnodigingOnderzoek;
  kEMUitnodigingOnderzoekConsent: kEMUitnodigingOnderzoekConsent;

  Contactgegevens: ContactgegevensGroup;
  FutureStudies: FutureStudies;

  // Standard Tekenradar
  T1: UitnodigingOnderzoekText;
  UitnodigingOnderzoek: UitnodigingOnderzoek;
  UitnodigingOnderzoekConsent: UitnodigingOnderzoekConsent;

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'kEM');

    this.groupEditor.setCondition(condition);

    this.T0 = new kEMUitnodigingOnderzoekText(this.key);
    this.kEMUitnodigingOnderzoek = new kEMUitnodigingOnderzoek(this.key, isRequired);
    this.kEMUitnodigingOnderzoekConsent = new kEMUitnodigingOnderzoekConsent(this.key, isRequired, SurveyEngine.singleChoice.any(this.kEMUitnodigingOnderzoek.key, this.kEMUitnodigingOnderzoek.optionKeys.yes));

    this.Contactgegevens = new ContactgegevensGroup(this.key, isRequired, SurveyEngine.singleChoice.any(this.kEMUitnodigingOnderzoek.key, this.kEMUitnodigingOnderzoek.optionKeys.yes));
    this.FutureStudies = new FutureStudies(this.key, isRequired, SurveyEngine.singleChoice.any(this.kEMUitnodigingOnderzoek.key, this.kEMUitnodigingOnderzoek.optionKeys.yes));

    this.T1 = new UitnodigingOnderzoekText(this.key, SurveyEngine.singleChoice.any(this.kEMUitnodigingOnderzoek.key, this.kEMUitnodigingOnderzoek.optionKeys.no));
    this.UitnodigingOnderzoek = new UitnodigingOnderzoek(this.key, isRequired, SurveyEngine.singleChoice.any(this.kEMUitnodigingOnderzoek.key, this.kEMUitnodigingOnderzoek.optionKeys.no));
    this.UitnodigingOnderzoekConsent = new UitnodigingOnderzoekConsent(this.key, isRequired, SurveyEngine.singleChoice.any(this.UitnodigingOnderzoek.key, this.UitnodigingOnderzoek.optionKeys.yes));
  }

  buildGroup(): void {
    this.addItem(this.T0.get());
    this.addItem(this.kEMUitnodigingOnderzoek.get());
    this.addItem(this.kEMUitnodigingOnderzoekConsent.get());
    this.addPageBreak()
    this.addItem(this.Contactgegevens.get());
    this.addItem(this.FutureStudies.get());
    this.addPageBreak()

    this.addItem(this.T1.get());
    this.addItem(this.UitnodigingOnderzoek.get());
    this.addItem(this.UitnodigingOnderzoekConsent.get());
    this.addPageBreak()
  }
}
