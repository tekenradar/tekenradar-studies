import { SurveyItems } from "case-editor-tools/surveys";
import { Item } from "case-editor-tools/surveys/types";
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
