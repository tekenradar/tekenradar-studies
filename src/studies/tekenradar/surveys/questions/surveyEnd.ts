import { Expression } from 'survey-engine/data_types';
import { SurveyEngine, SurveyItems } from "case-editor-tools/surveys";
import { Group, Item } from "case-editor-tools/surveys/types";
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';
import { ParticipantFlags } from '../../participantFlags';
import { surveyCategoryNames, surveyKeys } from '../globalConstants';

class T0_Invites_EndText extends Item {

  markdownContent = `
### Hartelijk dank voor je melding op Tekenradar.nl

**Klik onderaan nog op "verzenden" om je antwoorden op te sturen!**

Houdt de plek van de tekenbeet de komende 3 maanden goed in de gaten. Mocht hier een (nieuwe) rode ring (erythema migrans) verschijnen of mocht je andere klachten hebben of krijgen die kunnen komen door de ziekte van Lyme, dan adviseren wij je contact op te nemen met je huisarts.

Als je een (nieuwe) rode ring of vlek (erythema migrans) krijgt kun je die ook melden op Tekenradar.

Het kan ook zijn dat je koorts krijgt binnen 4 weken na de tekenbeet (als je die nog niet hebt). De kans daarop is klein, maar als je toch koorts krijgt kun je dat ook melden op Tekenradar.
`

  constructor(parentKey: string, condition?: Expression) {
    super(parentKey, 'T0_Invites_EndText');

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
        }),
      ]
    })
  }
}

class StandardflowEndText extends Item {

  markdownContent = `
### Hartelijk dank voor je melding op Tekenradar.nl

**Klik onderaan nog op "verzenden" om je antwoorden op te sturen!**

Er is een email naar je verstuurd waarin staat hoe je je deelname aan Tekenradar.nl kunt bevestigen.

Als je een tekenbeet hebt gemeld, houdt dan de plek van de tekenbeet de komende drie maanden goed in de gaten. Mocht hier een (nieuwe) rode ring (erythema migrans(?)) verschijnen of mocht je andere klachten hebben of krijgen die kunnen komen door de ziekte van Lyme, dan adviseren wij je contact op te nemen met je huisarts.

Als je een (nieuwe) rode ring of vlek (erythema migrans) krijgt kun je die ook melden op Tekenradar.

Het kan ook zijn dat je koorts krijgt binnen 4 weken na de tekenbeet (als je die nog niet hebt). De kans daarop is klein, maar als je toch koorts krijgt kun je dat ook melden op Tekenradar.

`

  constructor(parentKey: string, condition?: Expression) {
    super(parentKey, 'StandardflowEndText');

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
        }),
      ]
    })
  }
}


class FollowupEndText extends Item {

  markdownContent = `
### Hartelijk dank voor het invullen van de vragenlijst.

**Klik onderaan nog op "verzenden" om je antwoorden op te sturen!**

Je helpt ons daardoor mee met onderzoek naar tekenbeten en de ziekte van Lyme. Over 3 maanden ontvang je weer een nieuwe vragenlijst per e-mail.
`

  markdownContentT12 = `
### Hartelijk dank voor het invullen van de vragenlijst.

**Klik onderaan nog op "verzenden" om je antwoorden op te sturen!**

Dit was de laatste vragenlijst. Je hebt ons daardoor geholpen met onderzoek naar tekenbeten en de ziekte van Lyme.
`

  constructor(parentKey: string, condition?: Expression) {
    super(parentKey, 'FollowupEndText');

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
            ["nl", this.isPartOf(surveyCategoryNames.T12) ? this.markdownContentT12 : this.markdownContent],
          ]),
          className: ''
        }),
      ]
    })
  }
}

class WeeklyEndText extends Item {

  markdownContentFirstTime = `
### Hartelijk dank voor het invullen van deze vragen.

**Klik onderaan nog op "verzenden" om je antwoorden op te sturen!**

Volgende week sturen we je weer een email om te vragen hoeveel tekenbeten je hebt gehad.
`
  markdownContentNormal = `
### Hartelijk dank voor het invullen van deze vragen.

**Klik onderaan nog op "verzenden" om je antwoorden op te sturen!**

Volgende week sturen we je weer een email om te vragen hoeveel tekenbeten je hebt gehad.

Als je een tekenbeet hebt gehad, houd dan de plek van de tekenbeet de komende periode goed in de gaten en neem contact op met de huisarts als er een groeiende rode vlek of kring ontstaat of als je andere gezondheidsklachten krijgt die mogelijke met de ziekte van Lyme te maken kunnen hebben.
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

  T0_Invites_EndText: T0_Invites_EndText;
  StandardflowEndText: StandardflowEndText;
  FollowupEndText: FollowupEndText;
  WeeklyEndText: WeeklyEndText;
  Comment: Comment;

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'END');
    this.groupEditor.setCondition(condition);

    this.T0_Invites_EndText = new T0_Invites_EndText(this.key);
    this.StandardflowEndText = new T0_Invites_EndText(this.key);
    this.FollowupEndText = new FollowupEndText(this.key);
    this.WeeklyEndText = new WeeklyEndText(this.key);
    this.Comment = new Comment(this.key, isRequired);
  }

  buildGroup(): void {
    if (this.isPartOf(surveyKeys.T0_Invites)) {
      this.addItem(this.T0_Invites_EndText.get())
    }
    if (this.isPartOf(surveyCategoryNames.Standardflow)) {
      this.addItem(this.StandardflowEndText.get())
    }
    if (this.isPartOf(surveyCategoryNames.T3) || this.isPartOf(surveyCategoryNames.T6) || this.isPartOf(surveyCategoryNames.T9) || this.isPartOf(surveyCategoryNames.T12)) {
      this.addItem(this.FollowupEndText.get())
    }
    if (this.isPartOf(surveyKeys.WeeklyTB)) {
      this.addItem(this.WeeklyEndText.get())
    }
    this.addItem(this.Comment.get())
  }
}
