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
    super(parentKey, 'UitnodigingText');

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
    yes: 'a'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Uitnodiging');

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
        ['nl', 'Wil je meedoen aan het Tekenradar onderzoek naar tekenbeten en de ziekte van Lyme? '],
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
    no: 'b',
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'AO');

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
      placeholderText: new Map([['nl', '...']])
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
