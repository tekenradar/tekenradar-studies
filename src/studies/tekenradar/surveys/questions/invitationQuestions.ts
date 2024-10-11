import { ClozeItemTypes, SurveyEngine, SurveyItems, MultipleChoiceOptionTypes as MCOptions } from "case-editor-tools/surveys";
import { Group, Item } from "case-editor-tools/surveys/types";
import { Expression } from 'survey-engine/data_types';
import { ComponentGenerators } from "case-editor-tools/surveys/utils/componentGenerators";
import { ParticipantFlags } from "../../participantFlags";
import { expWithArgs, generateLocStrings } from 'case-editor-tools/surveys/utils/simple-generators';
import { inputKey, responseGroupKey, singleChoiceKey } from "case-editor-tools/constants/key-definitions";
import { postalCodesForNMGStudy } from "../globalConstants";


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
Om met dit profiel mee te doen aan het Tekenradar-vragenlijstonderzoek hebben we je toestemming nodig. Vink hieronder "Toestemmingsformulier" aan om de toestemmingsverklaring te kunnen lezen.
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
- Weet ik dat voor het onderzoek mijn accountgegevens (e-mailadres en wachtwoord) en onderzoeksgegevens (de ingevulde vragenlijsten; met daarin mijn geboortejaar en maand en gegevens over mijn gezondheid) worden verwerkt.
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

//kvdw LymeEscape:
export class aEMUitnodigingOnderzoekText extends Item {
  markdownContent = `
## Uitnodiging onderzoek ziekte van Lyme

Wij willen je vragen of je mee wilt doen aan Tekenradar onderzoek naar de ziekte van Lyme, omdat je een erythema migrans (rode ring of vlek na een tekenbeet als een vroege vorm van ziekte van Lyme) hebt gemeld. Door mee te doen draag je bij aan kennis over de ziekte van Lyme, en de gezondheidsgevolgen hiervan.
Als je mee wilt doen, volgen hierna direct nog een aantal extra vragen over je gezondheid, en vragen we om je contactgegevens. Het kan zijn dat uit de ingevulde gegevens blijkt dat je ook in aanmerking komt voor aanvullend onderzoek waarvoor ook bloed kan worden afgenomen. Als dat zo is, en je ons daarvoor toestemming geeft, kan het zijn dat we nog contact met je opnemen. Ook vragen we je toestemming om je huisarts te mogen benaderen voor aanvullende gegevens over je erythema migrans, ook dit is vanzelfsprekend geheel vrijwillig. Het komende jaar krijg je daarna iedere 3 maanden een vervolgvragenlijst met vragen over je gezondheid. Voor het invullen van de vervolgvragenlijsten ontvang je per e-mail een herinnering via noreply@tekenradar.nl.
`

  constructor(parentKey: string, condition?: Expression) {
    super(parentKey, 'aEMUitnTR_Pretext');

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
//LT LPplus
export class LPplusUitnodigingOnderzoekText extends Item {
  markdownContent = `
## Uitnodiging onderzoek

Wij nodigen je uit om deel te nemen aan het LymeProspect-Plus vragenlijstonderzoek via Tekenradar, omdat je enkele jaren geleden hebt meegedaan aan een onderzoek via Tekenradar.
Het kan zijn dat je toen hebt meegedaan nadat je een tekenbeet of ziekte van Lyme had gehad, of je bent toen uitgenodigd als controlepersoon.
Voor dit onderzoek vragen we je om éénmalig een vragenlijst in te vullen over je gezondheid, wat ongeveer 20 minuten kost.
Je draagt hiermee bij aan onderzoek naar het verloop van langdurige klachten na de ziekte van Lyme. Ook als je geen klachten (meer) hebt, is je deelname zeer waardevol.
`

  constructor(parentKey: string, condition?: Expression) {
    super(parentKey, 'LPplusUitnTR_Pretext');

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

//kvdw: LE
export class aEMUitnodigingOnderzoek extends Item {
  optionKeys = {
    yes: 'a',
    no: 'b'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'aEMUitnTR');

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

//LT LPplus
export class LPplusUitnodigingOnderzoek extends Item {
  optionKeys = {
    yes: 'a',
    no: 'b'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'LPplusUitnTR');

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
        ['nl', 'Wil je meedoen aan het LymeProspect-Plus vragenlijst onderzoek via Tekenradar.nl?'],
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

//LT LPplus Q2
export class LPplusUitnodigingOnderzoek_q2 extends Item {
  optionKeys = {
    yes: 'a',
    otherperson: 'b',
    no: 'c',
    other: 'd'

  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'LPplusUitnTR2');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: [
        {
          content: new Map([
            ['nl', `Heb jij, `],
          ])
        },
        {
          expression: SurveyEngine.getters.getAttribute(
            SurveyEngine.getters.getAttribute(
              SurveyEngine.getters.getContext(),
              'participantFlags'
            ),
            'name'
          ),
          className: 'text-primary',
          languageCodes: ['nl']
        },
        {
          content: new Map([
            ['nl', `, tussen 2014 en 2020 deelgenomen aan het LymeProspect of Tekenradar vragenlijstonderzoek `],
          ])
        },
        {
          content: new Map([
            ['nl', `?`],
          ])
        }
      ],
      responseOptions: [
        {
          key: this.optionKeys.yes, role: 'option',
          content: new Map([
            ["nl", "Ja, ik heb eerder aan het onderzoek deelgenomen."],
          ])
        },
        {
          key: this.optionKeys.otherperson, role: 'input',
          content: new Map([
            ["nl", "Nee, ik ben iemand anders die de vragenlijst namens deze persoon invult, namelijk:"],
          ])
        },
        {
          key: this.optionKeys.no, role: 'option',
          content: new Map([
            ["nl", "Nee, ik heb niet eerder aan het onderzoek deelgenomen, maar ik vul de vragenlijst toch in."],
          ])
        },
        {
          key: 'd', role: 'input',
          content: new Map([
            ["nl", "Anders, namelijk:"],
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
Om met dit profiel mee te doen aan het Tekenradar-vragenlijstonderzoek hebben we je toestemming nodig. Vink hieronder "Toestemmingsformulier" aan om de toestemmingsverklaring te kunnen lezen.
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

//kvdw: LE
export class aEMUitnodigingOnderzoekConsent extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'aEMUitnTR_Consent');

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
Om met dit profiel mee te doen aan het Tekenradar-vragenlijstonderzoek hebben we je toestemming nodig. Vink hieronder "Toestemmingsformulier" aan om de toestemmingsverklaring te kunnen lezen.
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
- Geef ik hierna in de vragenlijst aan of mijn persoonsgegevens nu en in de toekomst ook gebruikt mogen worden om mij te benaderen voor aanvullend (deel)onderzoek via Tekenradar.
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

//LT LPplus
export class LPplusUitnodigingOnderzoekConsent extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'LPplusUitnTR_Consent');

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
        ["nl", "Toestemmingsformulier"],
      ]),
      topDisplayCompoments: [
        ComponentGenerators.markdown({
          content: new Map([
            ["nl", `
Om mee te doen aan het LymeProspect-Plus vragenlijstonderzoek via Tekenradar hebben we je toestemming nodig. Vink hieronder "Toestemmingsformulier" aan om de toestemmingsverklaring te kunnen lezen.
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

Door onderaan de knop “Ja, ik geef toestemming” aan te klikken stem ik in met deelname aan het vragenlijst onderzoek “LymeProspect-PLUS via Tekenradar” en ga ik akkoord dat het RIVM en/of samenwerkingspartners mijn gegevens voor dit onderzoek zullen verwerken. Ook stem ik er mee in dat mijn huisarts en/of ikzelf eventueel benaderd worden voor medische informatie over de melding die ik heb gedaan op Tekenradar en ga ik ermee akkoord dat het RIVM en/of samenwerkingspartners daarvoor mijn contactgegevens zullen verwerken.

Ook:
- Heb ik de informatie op de website van het Tekenradar onderzoek over het basisonderzoek en de privacyverklaring over de verwerking van de persoonsgegevens door het RIVM goed gelezen en begrepen.
- Heb ik goed over mijn deelname aan het onderzoek kunnen nadenken.
- Weet ik dat ik hiervoor mails kan ontvangen vanaf noreply@tekenradar.nl.
- Weet ik dat meedoen aan het onderzoek vrijwillig is. Ik weet ook dat ik op ieder moment, zonder opgaaf van een reden, kan stoppen met deelname aan het onderzoek en dat ik mijn toestemming voor de verwerking van mijn persoonsgegevens kan intrekken. Ik begrijp dat het intrekken van mijn toestemming geen gevolgen heeft voor de verwerking van mijn persoonsgegevens in de periode voorafgaand aan het intrekken van mijn toestemming.
- Weet ik dat mijn accountgegevens 10 jaar na de laatste inlog op de website van Tekenradar en mijn onderzoeksgegevens 15 jaar worden bewaard (zie voor meer informatie de privacyverklaring).
- Weet ik dat voor het onderzoek mijn accountgegevens (e-mailadres en wachtwoord) en onderzoeksgegevens (de ingevulde vragenlijsten; met daarin onder mijn geboortejaar en maand en gegevens over mijn gezondheid) worden verwerkt.
- Geef ik hierna in de vragenlijst aan of mijn persoonsgegevens nu en in de toekomst ook gebruikt mogen worden om mij te benaderen voor aanvullend (deel)onderzoek via Tekenradar.
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

//LT LPplus
export class BiobankUitnodigingAanvullendOnderzoekText extends Item {

  markdownContent = `
## Aanvullend onderzoek

Mensen die meedoen aan Tekenradar onderzoek kunnen in aanmerking komen voor aanvullend wetenschappelijk onderzoek, waarbij soms ook (vrijwillig) bloed wordt afgenomen. Mogen we jou eventueel benaderen om meer informatie te kunnen geven over dat soort onderzoek? Daarna kun je dan beslissen of je mee wilt doen. Het kan ook zijn dat je niet in aanmerking komt, en dat we je dus niet benaderen.
`

  constructor(parentKey: string, condition?: Expression) {
    super(parentKey, 'BiobankAOPreText');

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

//LT LPplus
export class BiobankUitnodigingAanvullendOnderzoek extends Item {
  optionKeys = {
    yes: 'a',
    no: 'b'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'UitnBiobankAO');

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
Om je te benaderen voor aanvullend onderzoek hebben we ook je toestemming nodig. Vink hieronder "Toestemmingsformulier" aan om de toestemmingsverklaring te kunnen lezen.
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

export class BiobankUitnodigingAanvullendOnderzoekConsent extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'UitnBiobankAO_Consent');

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
        ["nl", "Toestemmingsformulier"],
      ]),
      topDisplayCompoments: [
        ComponentGenerators.markdown({
          content: new Map([
            ["nl", `
Om je te benaderen voor aanvullend onderzoek hebben we ook je toestemming nodig. Vink hieronder "Toestemmingsformulier" aan om de toestemmingsverklaring te kunnen lezen.
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

We vragen hieronder opnieuw om je e-mailadres en verderop soms ook andere gegevens omdat we de eerder en verderop ingevulde gegevens vanwege privacyregelgeving niet zomaar mogen inzien. Je kunt als je dat wilt wel hetzelfde e-mailadres invullen.
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

//LT LPplus
class LPplusContactGroupPretext extends Item {

  markdownContent = `
**Vul hieronder je gegevens in.**

`

  constructor(parentKey: string, condition?: Expression) {
    super(parentKey, 'LPplusContactGroupPretext');

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

class BiobankContactGroupPretext extends Item {

  markdownContent = `
**Je contactgegevens**

Vul hieronder je gegevens in zodat we je kunnen benaderen. We vragen opnieuw om je e-mailadres omdat we de eerdere gegevens vanwege privacyregelgeving niet zomaar mogen inzien. Je kunt als je dat wilt wel hetzelfde e-mailadres invullen. Je contactgegevens worden alleen gebruikt om informatie te geven over aanvullende onderzoeken naar tekenbeten, ziekte van Lyme, of andere (tekenoverdraagbare) infectieziekten.
Je contactgegevens worden alleen gebruikt voor het Tekenradar onderzoek en/of om informatie te geven over aanvullende onderzoeken naar tekenbeten, ziekte van Lyme, of andere (tekenoverdraagbare) infectieziekten.
`

  constructor(parentKey: string, condition?: Expression) {
    super(parentKey, 'BiobankContactGroupPretext');

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

export class GP extends Item {
  optionKeys = {
    nameOffice: 'pn',
    nameDoc: 'nh',
    place: 'plaats'
  }

  constructor(parentKey: string, required: boolean, condition?: Expression) {
    super(parentKey, 'GP');

    this.condition = condition;
    //    this.isRequired = required;
  }

  buildItem() {
    const markdownContent = `
*De gegevens van je huisarts worden alleen gebruikt om eventueel medische informatie op te vragen die relevant kan zijn voor het onderzoek, zoals een melding van de ziekte van Lyme of andere melding in deze Tekenradar vragenlijst. Als je dat niet wilt, vul dan hieronder niks in.*
    `

    return SurveyItems.clozeQuestion({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      isRequired: this.isRequired,
      questionText: new Map([[
        'nl', 'De gegevens van mijn huisarts:'
      ]]),
      items: [
        ClozeItemTypes.text({ key: 't1', content: new Map([['nl', 'Praktijknaam: ']]) }),
        ClozeItemTypes.textInput({ key: this.optionKeys.nameOffice, className: 'w-100', alignText: 'start' }),
        ClozeItemTypes.clozeLineBreak(),
        ClozeItemTypes.text({ key: 't2', content: new Map([['nl', 'Naam huisarts: ']]) }),
        ClozeItemTypes.textInput({ key: this.optionKeys.nameDoc, className: 'w-100', alignText: 'start' }),
        ClozeItemTypes.clozeLineBreak(),
        ClozeItemTypes.text({ key: 'taddr', className: 'fw-bold mt-2', content: new Map([['nl', 'Adres: ']]) }),
        ClozeItemTypes.clozeLineBreak(),
        ClozeItemTypes.text({ key: 't3', content: new Map([['nl', 'Straatnaam: ']]) }),
        ClozeItemTypes.textInput({ key: 'str', className: 'flex-grow-1', alignText: 'start' }),
        ClozeItemTypes.text({ key: 't4', content: new Map([['nl', 'Huisnummer: ']]) }),
        ClozeItemTypes.textInput({ key: 'hnr', className: '', alignText: 'start' }),
        ClozeItemTypes.clozeLineBreak(),
        ClozeItemTypes.text({ key: 't5', content: new Map([['nl', 'Postcode: ']]) }),
        ClozeItemTypes.textInput({ key: 'pc', className: '', alignText: 'start' }),
        ClozeItemTypes.text({ key: 't6', content: new Map([['nl', 'Plaats: ']]) }),
        ClozeItemTypes.textInput({ key: this.optionKeys.place, className: 'flex-grow-1', alignText: 'start' }),
        ClozeItemTypes.clozeLineBreak(),
        ClozeItemTypes.text({ key: 'tcont', className: 'fw-bold mt-2', content: new Map([['nl', 'Contact: ']]) }),
        ClozeItemTypes.clozeLineBreak(),
        ClozeItemTypes.text({ key: 't7', content: new Map([['nl', 'Telefoonnummer praktijk: ']]) }),
        ClozeItemTypes.textInput({ key: 'tel', className: 'w-100', alignText: 'start' }),
      ],
      //      customValidations: [
      //        {
      //          key: 'DocAddress', rule: SurveyEngine.logic.and(
      //            SurveyEngine.hasResponse(this.key, `rg.cloze.${this.optionKeys.nameOffice}`),
      //            SurveyEngine.hasResponse(this.key, `rg.cloze.${this.optionKeys.nameDoc}`),
      //            SurveyEngine.hasResponse(this.key, `rg.cloze.${this.optionKeys.place}`),
      //          ), type: 'hard'
      //        }
      //      ]
      topDisplayCompoments: [
        ComponentGenerators.markdown({
          content: new Map([
            ["nl", markdownContent],
          ]),
          className: 'mb-2'
        })
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

class PC4contact extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'PC4contact');

    this.isRequired = isRequired;
    this.condition = condition;

  }

  buildItem() {
    return SurveyItems.textInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Wat zijn de 4 cijfers van je postcode?'],
      ]),
      titleClassName: 'sticky-top',
      customValidations: [
        {
          key: 'r2',
          type: 'hard',
          rule: SurveyEngine.logic.or(
            expWithArgs('not', expWithArgs('hasResponse', this.key, responseGroupKey)),
            expWithArgs('checkResponseValueWithRegex', this.key, [responseGroupKey, inputKey].join('.'), '^[0-9][0-9][0-9][0-9]$'),
          )
        }
      ],
      bottomDisplayCompoments: [
        {
          role: 'error',
          content: generateLocStrings(new Map([
            ["nl", "Voer de eerste vier cijfers van je postcode in"],
          ])),
          displayCondition: expWithArgs('not', expWithArgs('getSurveyItemValidation', 'this', 'r2'))
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

//LT LPplus option d added
class GenderForContact extends Item {
  optionKeys = {
    male: 'a',
    female: 'b',
    other: 'c',
    missing: 'd'
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
          key: this.optionKeys.other, role: 'input',
          content: new Map([
            ["nl", "Anders, namelijk:"],
          ])
        },
        {
          key: this.optionKeys.missing, role: 'option',
          content: new Map([
            ["nl", "Wil ik niet zeggen"],
          ])
        },
      ]
    })
  }
}

//LT LPplus
class BirthMonth extends Item {
  constructor(parentKey: string, required: boolean, condition?: Expression) {
    super(parentKey, 'BirthMonth');

    this.condition = condition;
    this.isRequired = required;
  }

  buildItem() {
    const months = [
      "Januari", "Februari", "Maart", "April", "Mei", "Juni",
      "Juli", "Augustus", "September", "Oktober", "November", "December"
    ].map((month, index) => ({
      key: (index + 1).toString(),
      role: 'option',
      content: new Map([['nl', month]])
    }));

    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      isRequired: this.isRequired,
      questionText: new Map([
        ['nl', 'Mijn geboortemaand:']
      ]),
      responseOptions: months
    });
  }
}

//LT LPplus
class BirthYear extends Item {
  constructor(parentKey: string, required: boolean, condition?: Expression) {
    super(parentKey, 'BirthYear');

    this.condition = condition;
    this.isRequired = required;
  }

  buildItem() {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 120 }, (v, k) => ({ key: (currentYear - k).toString(), role: 'option', content: new Map([['nl', (currentYear - k).toString()]]) }));

    return SurveyItems.dropDown({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      isRequired: this.isRequired,
      questionText: new Map([[
        'nl', 'Mijn geboortejaar:'
      ]]),
      responseOptions: years
    });
  }
}



export class ContactgegevensGroup extends Group {
  PreText: ContactGroupPretext;
  Name: Name;
  Email: Email;
  PC4contact: PC4contact;
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

    //kvdw LE:
    const showPC4contact = SurveyEngine.logic.or(
      SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.kEM.key, ParticipantFlags.kEM.values.likely),
      SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.aEM.key, ParticipantFlags.aEM.values.likely)
    );
    this.PC4contact = new PC4contact(this.key, isRequired, showPC4contact)

    const showTelQ = SurveyEngine.logic.or(
      SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.kEM.key, ParticipantFlags.kEM.values.likely),
      SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.aEM.key, ParticipantFlags.aEM.values.likely)
    );
    this.Telephone = new Telephone(this.key, isRequired, showTelQ)

    const showGenderQ = SurveyEngine.logic.or(
      SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.kEM.key, ParticipantFlags.kEM.values.likely),
      SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.aEM.key, ParticipantFlags.aEM.values.likely)
    );
    this.Gender = new GenderForContact(this.key, isRequired, showGenderQ)

    const showBirthdayQ = SurveyEngine.logic.or(
      SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.kEM.key, ParticipantFlags.kEM.values.likely),
      SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.aEM.key, ParticipantFlags.aEM.values.likely)
    );
    this.Birthday = new Birthday(this.key, isRequired, showBirthdayQ)

    const showGPq = SurveyEngine.logic.or(
      SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.kEM.key, ParticipantFlags.kEM.values.likely),
      SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.aEM.key, ParticipantFlags.aEM.values.likely)
    );
    this.GP = new GP(this.key, isRequired, showGPq)
  }

  buildGroup(): void {
    this.addItem(this.PreText.get())
    this.addItem(this.Name.get())
    this.addItem(this.Email.get())

    this.addItem(this.PC4contact.get())
    this.addItem(this.Telephone.get())
    this.addItem(this.Birthday.get())
    this.addItem(this.Gender.get())
    this.addItem(this.GP.get())

  }
}

//LT LPplus
export class LPplusContactgegevensGroup extends Group {
  PreText: LPplusContactGroupPretext;
  BirthMonth: BirthMonth;
  BirthYear: BirthYear;
  Gender: GenderForContact;
  PC4contact: PC4contact;

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Je gegevens');

    this.groupEditor.setCondition(condition);

    this.PreText = new LPplusContactGroupPretext(this.key)
    this.BirthMonth = new BirthMonth(this.key, isRequired)
    this.BirthYear = new BirthYear(this.key, isRequired)
    this.Gender = new GenderForContact(this.key, isRequired)
    this.PC4contact = new PC4contact(this.key, isRequired)

  }

  buildGroup(): void {
    this.addItem(this.PreText.get())
    this.addItem(this.BirthMonth.get())
    this.addItem(this.BirthYear.get())
    this.addItem(this.Gender.get())
    this.addItem(this.PC4contact.get())


  }
}

//LT LPplus
export class BiobankContactgegevensGroup extends Group {
  PreText: BiobankContactGroupPretext;
  Name: Name;
  Email: Email;
  Telephone: Telephone;

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Contactgegevens');

    this.groupEditor.setCondition(condition);

    this.PreText = new BiobankContactGroupPretext(this.key)
    this.Name = new Name(this.key, isRequired)
    this.Email = new Email(this.key, isRequired)
    this.Telephone = new Telephone(this.key, false)
  }

  buildGroup(): void {
    this.addItem(this.PreText.get())
    this.addItem(this.Name.get())
    this.addItem(this.Email.get())
    this.addItem(this.Telephone.get())

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
        'nl', 'Het kan zijn dat je in de toekomst nog in aanmerking komt voor ander aanvullend of vervolgonderzoek naar tekenbeten of infectieziekten. Mogen we je dan eventueel ook benaderen voor die onderzoeken?'
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

//mh LE:  version with color change in question
export class NijmegenReis extends Item {
  optionKeys = {
    yes: 'a',
    no: 'b'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'NijmegenReis');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Wil je voor het eerdergenoemde aanvullend wetenschappelijk onderzoek'],
      ]),
    },
    {
      content: new Map([
        ["nl", " de komende drie maanden 4 keer naar Nijmegen"],
      ]),
      className: "text-primary"
    },
    {
      content: new Map([
        ["nl", " reizen voor bloedafnames?"],
      ]),
    }
  ]

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
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

class BiobankUitnodigingAanvullendOnderzoekText2 extends Item {

  markdownContent = `

Hierna volgen nog een aantal vragen.
`

  constructor(parentKey: string, condition?: Expression) {
    super(parentKey, 'BiobankAOAfterText');

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

//kvdw LE:
export class aEMInviteGroup extends Group {
  T0: aEMUitnodigingOnderzoekText;
  aEMUitnodigingOnderzoek: aEMUitnodigingOnderzoek;
  aEMUitnodigingOnderzoekConsent: aEMUitnodigingOnderzoekConsent;

  Contactgegevens: ContactgegevensGroup;
  FutureStudies: FutureStudies;
  NijmegenReis: NijmegenReis;

  // Standard Tekenradar
  T1: UitnodigingOnderzoekText;
  UitnodigingOnderzoek: UitnodigingOnderzoek;
  UitnodigingOnderzoekConsent: UitnodigingOnderzoekConsent;

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'aEM');

    this.groupEditor.setCondition(condition);

    this.T0 = new aEMUitnodigingOnderzoekText(this.key);
    this.aEMUitnodigingOnderzoek = new aEMUitnodigingOnderzoek(this.key, isRequired);
    this.aEMUitnodigingOnderzoekConsent = new aEMUitnodigingOnderzoekConsent(this.key, isRequired, SurveyEngine.singleChoice.any(this.aEMUitnodigingOnderzoek.key, this.aEMUitnodigingOnderzoek.optionKeys.yes));

    this.Contactgegevens = new ContactgegevensGroup(this.key, isRequired, SurveyEngine.singleChoice.any(this.aEMUitnodigingOnderzoek.key, this.aEMUitnodigingOnderzoek.optionKeys.yes));
    this.FutureStudies = new FutureStudies(this.key, isRequired, SurveyEngine.singleChoice.any(this.aEMUitnodigingOnderzoek.key, this.aEMUitnodigingOnderzoek.optionKeys.yes));

    //per 01-10-2024 LE removed by adjusting const for showing this question (Lola per 1-10 deze const uitgezet en de const hieronder aan)
    //const showNijmegenReis = SurveyEngine.logic.and(
    //  SurveyEngine.singleChoice.any(this.aEMUitnodigingOnderzoek.key, this.aEMUitnodigingOnderzoek.optionKeys.yes),
    //  SurveyEngine.checkResponseValueWithRegex(this.Contactgegevens.PC4contact.key, [responseGroupKey, inputKey].join('.'), `^(?!${postalCodesForNMGStudy.join('|')}).*$`)
    //)
    const showNijmegenReis = SurveyEngine.compare.eq(1, 0);
    this.NijmegenReis = new NijmegenReis(this.key, isRequired, showNijmegenReis);


    this.T1 = new UitnodigingOnderzoekText(this.key, SurveyEngine.singleChoice.any(this.aEMUitnodigingOnderzoek.key, this.aEMUitnodigingOnderzoek.optionKeys.no));
    this.UitnodigingOnderzoek = new UitnodigingOnderzoek(this.key, isRequired, SurveyEngine.singleChoice.any(this.aEMUitnodigingOnderzoek.key, this.aEMUitnodigingOnderzoek.optionKeys.no));
    this.UitnodigingOnderzoekConsent = new UitnodigingOnderzoekConsent(this.key, isRequired, SurveyEngine.singleChoice.any(this.UitnodigingOnderzoek.key, this.UitnodigingOnderzoek.optionKeys.yes));
  }

  buildGroup(): void {
    this.addItem(this.T0.get());
    this.addItem(this.aEMUitnodigingOnderzoek.get());
    this.addItem(this.aEMUitnodigingOnderzoekConsent.get());
    this.addPageBreak()
    this.addItem(this.Contactgegevens.get());
    this.addItem(this.FutureStudies.get());
    this.addItem(this.NijmegenReis.get());
    this.addPageBreak()

    this.addItem(this.T1.get());
    this.addItem(this.UitnodigingOnderzoek.get());
    this.addItem(this.UitnodigingOnderzoekConsent.get());
    this.addPageBreak()
  }
}

//LT LPplusStandaard
export class LPplusInviteGroup extends Group {
  // Standard LPplus -> MH moved this bit to part 1
  T1: LPplusUitnodigingOnderzoekText;
  LPplusUitnodigingOnderzoek: LPplusUitnodigingOnderzoek;
  LPplusUitnodigingOnderzoek_q2: LPplusUitnodigingOnderzoek_q2;
  LPplusUitnodigingOnderzoekConsent: LPplusUitnodigingOnderzoekConsent;

  // Other studies
  //T2: BiobankUitnodigingAanvullendOnderzoekText;
  //BiobankUitnodigingAanvullendOnderzoek: BiobankUitnodigingAanvullendOnderzoek;
  //BiobankUitnodigingAanvullendOnderzoekConsent: BiobankUitnodigingAanvullendOnderzoekConsent;
  //BiobankContactgegevens: BiobankContactgegevensGroup;

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'LPplus');

    this.groupEditor.setCondition(condition);

    this.T1 = new LPplusUitnodigingOnderzoekText(this.key);
    this.LPplusUitnodigingOnderzoek = new LPplusUitnodigingOnderzoek(this.key, isRequired);
    this.LPplusUitnodigingOnderzoek_q2 = new LPplusUitnodigingOnderzoek_q2(this.key, isRequired);
    this.LPplusUitnodigingOnderzoekConsent = new LPplusUitnodigingOnderzoekConsent(this.key, isRequired, SurveyEngine.singleChoice.any(this.LPplusUitnodigingOnderzoek.key, this.LPplusUitnodigingOnderzoek.optionKeys.yes));

    //const showBiobankAdditionalStudyInvite = SurveyEngine.singleChoice.any(this.LPplusUitnodigingOnderzoek.key, this.LPplusUitnodigingOnderzoek.optionKeys.yes);
    //this.T2 = new BiobankUitnodigingAanvullendOnderzoekText(this.key, showBiobankAdditionalStudyInvite);
    //this.BiobankUitnodigingAanvullendOnderzoek = new BiobankUitnodigingAanvullendOnderzoek(this.key, isRequired, showBiobankAdditionalStudyInvite);
    //this.BiobankUitnodigingAanvullendOnderzoekConsent = new BiobankUitnodigingAanvullendOnderzoekConsent(this.key, isRequired, SurveyEngine.singleChoice.any(this.BiobankUitnodigingAanvullendOnderzoek.key, this.BiobankUitnodigingAanvullendOnderzoek.optionKeys.yes));
    //this.BiobankContactgegevens = new BiobankContactgegevensGroup(this.key, isRequired, SurveyEngine.singleChoice.any(this.BiobankUitnodigingAanvullendOnderzoek.key, this.BiobankUitnodigingAanvullendOnderzoek.optionKeys.yes));
  }

  buildGroup(): void {
    this.addItem(this.T1.get());
    this.addItem(this.LPplusUitnodigingOnderzoek.get());
    this.addItem(this.LPplusUitnodigingOnderzoek_q2.get());
    this.addItem(this.LPplusUitnodigingOnderzoekConsent.get());
    //this.addPageBreak()
    //this.addItem(this.T2.get());
    //this.addItem(this.BiobankUitnodigingAanvullendOnderzoek.get());
    //this.addItem(this.BiobankUitnodigingAanvullendOnderzoekConsent.get());
    //this.addItem(this.BiobankContactgegevens.get())
  }
}

//MH LPplusBiobank
export class LPplusBBInviteGroup extends Group {
  // Standard LPplus -> MH moved this bit to part 1
  //T1: LPplusUitnodigingOnderzoekText;
  //LPplusUitnodigingOnderzoek: LPplusUitnodigingOnderzoek;
  //LPplusUitnodigingOnderzoek_q2: LPplusUitnodigingOnderzoek_q2;
  //LPplusUitnodigingOnderzoekConsent: LPplusUitnodigingOnderzoekConsent;

  // Other studies
  T2: BiobankUitnodigingAanvullendOnderzoekText;
  BiobankUitnodigingAanvullendOnderzoek: BiobankUitnodigingAanvullendOnderzoek;
  BiobankUitnodigingAanvullendOnderzoekConsent: BiobankUitnodigingAanvullendOnderzoekConsent;
  BiobankContactgegevens: BiobankContactgegevensGroup;
  BiobankUitnodigingAanvullendOnderzoekText2: BiobankUitnodigingAanvullendOnderzoekText2

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'LPplusBB');

    this.groupEditor.setCondition(condition);

    //this.T1 = new LPplusUitnodigingOnderzoekText(this.key);
    //this.LPplusUitnodigingOnderzoek = new LPplusUitnodigingOnderzoek(this.key, isRequired);
    //this.LPplusUitnodigingOnderzoek_q2 = new LPplusUitnodigingOnderzoek_q2(this.key, isRequired);
    //this.LPplusUitnodigingOnderzoekConsent = new LPplusUitnodigingOnderzoekConsent(this.key, isRequired, SurveyEngine.singleChoice.any(this.LPplusUitnodigingOnderzoek.key, this.LPplusUitnodigingOnderzoek.optionKeys.yes));

    //const showBiobankAdditionalStudyInvite = SurveyEngine.singleChoice.any(this.LPplusUitnodigingOnderzoek.key, this.LPplusUitnodigingOnderzoek.optionKeys.yes);
    this.T2 = new BiobankUitnodigingAanvullendOnderzoekText(this.key);
    this.BiobankUitnodigingAanvullendOnderzoek = new BiobankUitnodigingAanvullendOnderzoek(this.key, isRequired);
    this.BiobankUitnodigingAanvullendOnderzoekConsent = new BiobankUitnodigingAanvullendOnderzoekConsent(this.key, isRequired, SurveyEngine.singleChoice.any(this.BiobankUitnodigingAanvullendOnderzoek.key, this.BiobankUitnodigingAanvullendOnderzoek.optionKeys.yes));
    this.BiobankContactgegevens = new BiobankContactgegevensGroup(this.key, isRequired, SurveyEngine.singleChoice.any(this.BiobankUitnodigingAanvullendOnderzoek.key, this.BiobankUitnodigingAanvullendOnderzoek.optionKeys.yes));
    this.BiobankUitnodigingAanvullendOnderzoekText2 = new BiobankUitnodigingAanvullendOnderzoekText2(this.key);
  }

  buildGroup(): void {
    //this.addItem(this.T1.get());
    //this.addItem(this.LPplusUitnodigingOnderzoek.get());
    //this.addItem(this.LPplusUitnodigingOnderzoek_q2.get());
    //this.addItem(this.LPplusUitnodigingOnderzoekConsent.get());
    //this.addPageBreak()
    this.addItem(this.T2.get());
    this.addItem(this.BiobankUitnodigingAanvullendOnderzoek.get());
    this.addItem(this.BiobankUitnodigingAanvullendOnderzoekConsent.get());
    this.addItem(this.BiobankContactgegevens.get());
    this.addItem(this.BiobankUitnodigingAanvullendOnderzoekText2.get())
  }
}
