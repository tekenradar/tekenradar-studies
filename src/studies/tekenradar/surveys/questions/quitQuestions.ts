import { SurveyItems } from "case-editor-tools/surveys";
import { Item } from "case-editor-tools/surveys/types";
import { ComponentGenerators } from "case-editor-tools/surveys/utils/componentGenerators";
import { Expression } from "survey-engine/data_types";




export class ConfirmFollowUpQuitting extends Item {
  optionKeys = {
    yes: 'a'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'QuitFU');

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
        ['nl', 'Weet je zeker dat je wilt stoppen met de vervolgvragenlijsten? (Klik na je keuze hieronder nog op "Opslaan en verder gaan")'],
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


export class ConfirmWeeklyTBQuitting extends Item {
  optionKeys = {
    yes: 'a'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'QuitWeekyTB');

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
        ['nl', 'Weet je zeker dat je wilt stoppen met de wekelijkse tekenbeetvragenlijsten? (Klik na je keuze hieronder nog op "Opslaan en verder gaan")'],
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

export class ExplanationDeletingContactData extends Item {
  optionKeys = {
    yes: 'a'
  }

  constructor(parentKey: string, condition?: Expression) {
    super(parentKey, 'Info');

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
            ["nl", `
Je hebt eerder toestemming gegeven om je contactgegevens 12 weken lang te bewaren om te kunnen worden benaderd voor aanvullend onderzoek. Als je wilt kun je hieronder die toestemming weer intrekken. Je contactgegevens worden dan direct verwijderd, en zullen dus niet meer gebruikt worden om je te benaderen voor aanvullend onderzoek.
`
            ],
          ]),
          className: ''
        })
      ]
    })
  }
}

export class ConfirmDeletingContactData extends Item {
  optionKeys = {
    yes: 'a'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'DeleteContactData');

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
        ['nl', 'Wil je je toestemming om je contactgegevens te bewaren intrekken?'],
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
