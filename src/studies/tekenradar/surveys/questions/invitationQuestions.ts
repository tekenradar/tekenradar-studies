import { ClozeItemTypes, SurveyItems } from "case-editor-tools/surveys";
import { Group, Item } from "case-editor-tools/surveys/types";
import { Expression } from 'survey-engine/data_types';
import { ComponentGenerators } from "case-editor-tools/surveys/utils/componentGenerators";

export class UitnodigingOnderzoekText extends Item {
  markdownContent = `
## Uitnodiging onderzoek

Wij vragen je of je mee wilt doen aan onderzoek, omdat je een tekenbeet of de ziekte van Lyme hebt gemeld. Je vult direct hierna dan nog een aantal extra vragen in, en het komende jaar iedere 3 maanden een nieuwe vragenlijst over je gezondheid.
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
        ['nl', 'Wil je meedoen aan het Tekenradar onderzoek naar tekenbeten en de ziekte van Lyme?'],
      ]),
      checkBoxLabel: new Map([
        ["nl", "Ik geef toestemming"],
      ]),
      topDisplayCompoments: [
        ComponentGenerators.markdown({
          content: new Map([
            ["nl", `
Door de knop “ik geef toestemming” aan te klikken stem je in met deelname aan het vragenlijst onderzoek “Tekenradar” en ga je akkoord dat het RIVM en/of samenwerkingspartners je gegevens voor dit onderzoek zullen verwerken.
        `]]),
        })
      ],
      dialogTitle: new Map([
        ["nl", "TODO: title for consent dialog"],
      ]),
      dialogContent: new Map([
        ["nl", `
Wij vragen je of je mee wilt doen aan onderzoek, omdat je een tekenbeet of de ziekte van Lyme hebt gemeld. Je vult direct hierna dan nog een aantal extra vragen in, en het komende jaar iedere 3 maanden een nieuwe vragenlijst over je gezondheid. Voor het invullen van de vervolgvragenlijsten ontvang je per mail een herinnering via noreply@tekenradar.nl.

Via Tekenradar.nl wordt onderzocht hoe vaak mensen na een tekenbeet een erythema migrans (rode ring of vlek op de huid) of een andere vorm van de ziekte van Lyme krijgen, en hoe vaak dit leidt tot (ernstige) gezondheidsklachten. Meer informatie over onder andere het doel van het onderzoek en je rechten kun je vinden in de privacyverklaring van Tekenradar en de RIVM privacyverklaring.

Door de knop “ik geef toestemming” aan te klikken stem je in met deelname aan het vragenlijst onderzoek “Tekenradar” en ga je akkoord dat het RIVM en/of samenwerkingspartners je gegevens voor dit onderzoek zullen verwerken.

Ook:
- Heb ik de informatie op de website van het Tekenradar onderzoek over het basisonderzoek en de privacyverklaring over de verwerking van de persoonsgegevens door het RIVM goed gelezen en begrepen.
- Heb ik goed over mijn deelname aan het onderzoek kunnen nadenken.
- Weet ik dat meedoen aan het onderzoek vrijwillig is. Ik weet ook dat ik op ieder moment, zonder opgaaf van een reden, kan stoppen met deelname aan het onderzoek en dat ik mijn toestemming voor de verwerking van mijn persoonsgegevens kan intrekken. Ik begrijp dat het intrekken van mijn toestemming geen gevolgen heeft voor de verwerking van mijn persoonsgegevens in de periode voorafgaand aan het intrekken van mijn toestemming.
- Weet ik dat mijn accountgegevens 10 jaar na de laatste inlog op de website van Tekenradar en mijn onderzoeksgegevens 15 jaar worden bewaard (zie voor meer informatie de privacyverklaring).
- Weet ik dat voor het onderzoek mijn accountgegevens (e-mailadres en wachtwoord) en onderzoeksgegevens (de ingevulde vragenlijsten; met daarin onder mijn geboortejaar en maand en gegevens over mijn gezondheid) worden verwerkt.
- Verklaar ik dat ik 16 jaar of ouder ben, of dat ik de ouder/voogd ben van een kind minder dan 16 jaar oud waarover deze melding gaat (als er twee ouders/voogden zijn moeten zij beiden met deelname instemmen, en bij een kind van 12 t/m 15 jaar moet ook het kind zelf instemmen met deelname aan het onderzoek).
        `]]),
      acceptBtn: new Map([
        ["nl", "Ja, ik geef toestemming"],
      ]),
      rejectBtn: new Map([
        ["nl", "TODO: reject"],
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
        ['nl', 'Mogen we je benaderen voor aanvullend onderzoek?'],
      ]),
      responseOptions: [
        {
          key: this.optionKeys.yes, role: 'option',
          content: new Map([
            ["nl", "Ja, ik geef toestemming om eventueel benaderd te worden voor aanvullend wetenschappelijk onderzoek, en ik geef daarvoor hieronder mijn contactgegevens."],
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
        ['nl', 'Wil je meedoen aan het Tekenradar onderzoek naar tekenbeten en de ziekte van Lyme? '],
      ]),
      checkBoxLabel: new Map([
        ["nl", "TODO: I want to participate - click here to accept the conditions."],
      ]),
      topDisplayCompoments: [
        ComponentGenerators.markdown({
          content: new Map([
            ["nl", `
Mensen die meedoen aan Tekenradar onderzoek kunnen in aanmerking komen voor aanvullend wetenschappelijk onderzoek, waarbij soms ook (vrijwillig) bloed wordt afgenomen. Mogen we jou eventueel benaderen om meer informatie te kunnen geven over dat soort onderzoek? Daarna kun je dan beslissen of je mee wilt doen. Het kan ook zijn dat je niet in aanmerking komt, en dat we je dus niet benaderen.
        `]]),
        })
      ],
      dialogTitle: new Map([
        ["nl", "TODO: title for consent dialog"],
      ]),
      dialogContent: new Map([
        ["nl", `
Door de knop “ja, ik geef toestemming” aan te klikken stem je in om eventueel benaderd worden voor aanvullend (deel)onderzoek via Tekenradar en ga je akkoord dat het RIVM en/of samenwerkingspartners indien nodig je contactgegevens zullen verwerken.
Meer informatie over onder andere het doel van Tekenradar onderzoek en je rechten kun je vinden in de [privacyverklaring van Tekenradar](/privacy) en de [RIVM privacyverklaring](https://www.rivm.nl/sites/default/files/2018-11/RIVM%20%20Privacyverklaring%20mei%202018%20definitief%20Nederlands.pdf).

Ook:

- Ik weet ook dat ik op ieder moment, zonder opgaaf van een reden, mijn toestemming voor de verwerking van mijn persoonsgegevens kan intrekken. Ik begrijp dat het intrekken van mijn toestemming geen gevolgen heeft voor de verwerking van mijn persoonsgegevens in de periode voorafgaand aan het intrekken van mijn toestemming.
- Weet ik dat als mijn contactgegevens niet (meer) gebruikt worden deze na 12 weken worden verwijderd.
- Verklaar ik dat ik 16 jaar of ouder ben, of dat ik de ouder/voogd ben van een kind minder dan 16 jaar oud waarover deze melding gaat (als er twee ouders/voogden zijn moeten zij beiden met deelname instemmen, en bij een kind van 12 t/m 15 jaar moet ook het kind zelf instemmen met deelname aan het onderzoek).
        `]]),
      acceptBtn: new Map([
        ["nl", "Ja, ik geef toestemming"],
      ]),
      rejectBtn: new Map([
        ["nl", "TODO: reject"],
      ]),
    })
  }
}


class ContactGroupPretext extends Item {

  markdownContent = `
**Vul hieronder je contactgegevens in zodat we je kunnen benaderen.**

We vragen opnieuw om je email adres omdat we vanwege regelgeving het email adres van je account niet zomaar mogen gebruiken om je te benaderen. Je kunt als je dat wilt wel hetzelfde email adres invullen.
Je contactgegevens worden alleen gebruikt om informatie te geven over aanvullende onderzoeken naar tekenbeten, ziekte van Lyme, of andere (tekenoverdraagbare) infectieziekten.
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

class Name extends Item {
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
        ClozeItemTypes.textInput({ key: 'vn' }),
        ClozeItemTypes.clozeLineBreak(),
        ClozeItemTypes.text({ key: 't2', content: new Map([['nl', 'Achternaam: ']]) }),
        ClozeItemTypes.textInput({ key: 'an' }),
      ]
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


export class ContactgegevensGroup extends Group {
  PreText: ContactGroupPretext;
  Name: Name;
  Email: Email;

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Contactgegevens');

    this.groupEditor.setCondition(condition);

    this.PreText = new ContactGroupPretext(this.key)
    this.Name = new Name(this.key, isRequired)
    this.Email = new Email(this.key, isRequired)
  }

  buildGroup(): void {
    this.addItem(this.PreText.get())
    this.addItem(this.Name.get())
    this.addItem(this.Email.get())
  }
}
