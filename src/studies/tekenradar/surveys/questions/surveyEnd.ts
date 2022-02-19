import { Expression } from 'survey-engine/data_types';
import { SurveyEngine, SurveyItems } from "case-editor-tools/surveys";
import { Group, Item } from "case-editor-tools/surveys/types";
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';
import { ParticipantFlags } from '../../participantFlags';
import { WeeklyTB } from '../WeeklyTB';

class WeeklyEndText extends Item {

  markdownContentFirstTime = `
Hartelijk dank voor het invullen van deze vragen. Volgende week sturen we je weer een email om te vragen hoeveel tekenbeten je hebt gehad.
`
  markdownContentNormal = `
Hartelijk dank voor het invullen van deze vragen. Volgende week sturen we je weer een email om te vragen hoeveel tekenbeten je hebt gehad.

Houd de plek van de tekenbeet de komende periode goed in de gaten en neem contact op met de huisarts als er een groeiende rode vlek of kring ontstaat of als u andere gezondheidsklachten krijgt die mogelijke met de ziekte van lyme te maken kunnen hebben.
`

  constructor(parentKey: string, condition?: Expression) {
    super(parentKey, 'WeeklyEndText');

    this.condition = condition;
  }

  buildItem() {
    const showInitText = SurveyEngine.participantFlags.hasKeyAndValue(ParticipantFlags.weeklyTBreporter.key, ParticipantFlags.weeklyTBreporter.values.init);

    return SurveyItems.display({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      content: [
        ComponentGenerators.markdown({
          content: new Map([
            ["nl", this.markdownContentFirstTime],
          ]),
          displayCondition: showInitText,
          className: ''
        }),
        ComponentGenerators.markdown({
          content: new Map([
            ["nl", this.markdownContentNormal],
          ]),
          displayCondition: SurveyEngine.logic.not(showInitText),
          className: ''
        })
      ]
    })
  }
}


class Comment extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Comment');

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
        ['nl', 'Als je nog extra informatie bij bovenstaande vragen hebt kun je dit hieronder invullen.'],
      ]),
      questionSubText: new Map([
        ['nl', 'Let op: deze informatie wordt bij de door jou ingevulde vragenlijst opgeslagen en niet direct door de onderzoekers bekeken.'],
      ]),
      inputLabelText: new Map([
        ['nl', 'Insturen opmerking:'],
      ]),
    })
  }
}

export class SurveyEndGroup extends Group {

  WeeklyEndText: WeeklyEndText;
  Comment: Comment;

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'END');
    this.groupEditor.setCondition(condition);

    this.WeeklyEndText = new WeeklyEndText(this.key);
    this.Comment = new Comment(this.key, isRequired);
  }

  buildGroup(): void {
    if (this.isPartOf(WeeklyTB.key)) {
      this.addItem(this.WeeklyEndText.get())
    }
    this.addItem(this.Comment.get())
  }
}
