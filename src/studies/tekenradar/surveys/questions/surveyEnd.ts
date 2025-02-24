import { Expression } from 'survey-engine/data_types';
import { SurveyEngine, SurveyItems, MultipleChoiceOptionTypes as MCOptions, ClozeItemTypes } from "case-editor-tools/surveys";
import { Group, Item } from "case-editor-tools/surveys/types";
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';
import { ParticipantFlags } from '../../participantFlags';
import { surveyCategoryNames, surveyKeys } from '../globalConstants';

class T0_Invites_EndText extends Item {
  markdownContent = `
### Hartelijk dank voor je melding op Tekenradar.nl.


##### Let op: klik op **"Opslaan en verder gaan"** onderaan de pagina om je antwoorden op te sturen!

Houd de plek van de tekenbeet de komende 3 maanden goed in de gaten. Mocht hier een (nieuwe) rode ring (erythema migrans) verschijnen of mocht je andere klachten hebben of krijgen die kunnen komen door de ziekte van Lyme, dan adviseren wij je contact op te nemen met je huisarts.

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
### Hartelijk dank voor je melding op Tekenradar.nl.


##### Let op: klik op **"Opslaan en verder gaan"** onderaan de pagina om je antwoorden op te sturen!

Er is een e-mail naar je verstuurd waarin staat hoe je je deelname aan Tekenradar.nl kunt bevestigen.

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
### Hartelijk dank voor het invullen van de vragenlijst


##### Let op: klik op **"Opslaan en verder gaan"** onderaan de pagina om je antwoorden op te sturen!

Je helpt ons daardoor met onderzoek naar tekenbeten en de ziekte van Lyme, ook als je zelf geen klachten (meer) hebt. Over 3 maanden ontvang je weer een nieuwe vragenlijst per e-mail.
`

  markdownContentT12 = `
### Hartelijk dank voor het invullen van de vragenlijst


##### Let op: klik op **"Opslaan en verder gaan"** onderaan de pagina om je antwoorden op te sturen!

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


##### Let op: klik op **"Opslaan en verder gaan"** onderaan de pagina om je antwoorden op te sturen!

Volgende week sturen we je weer een e-mail om te vragen hoeveel tekenbeten je hebt gehad.
`
  markdownContentNormal = `
### Hartelijk dank voor het invullen van deze vragen.


##### Let op: klik op **"Opslaan en verder gaan"** onderaan de pagina om je antwoorden op te sturen!

Volgende week sturen we je weer een e-mail om te vragen hoeveel tekenbeten je hebt gehad.

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

    const questionText = (this.isPartOf(surveyKeys.QuitWeeklyTB) || this.isPartOf(surveyKeys.QuitFollowUp)) ?
      'Als je nog feedback voor ons hebt, kun je dat hieronder invullen' :
      'Als je nog feedback voor ons hebt, kun je dat hieronder invullen'

    return SurveyItems.multilineTextInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', questionText],
      ]),
      questionSubText: new Map([
        ['nl', 'Let op: deze informatie wordt eerst opgeslagen en niet direct door de onderzoekers bekeken.'],
      ]),
      inputLabelText: new Map([
        ['nl', ''],
      ]),
      maxLength: 2000
    })
  }
}

class LPPlusEndText extends Item {

  markdownContent = `
### Hartelijk dank voor het meedoen aan het onderzoek.

##### Let op: klik op **"Opslaan en verder gaan"** onderaan de pagina om je antwoorden op te sturen!

Als je een (nieuwe) rode ring of vlek (erythema migrans) krijgt kun je die ook melden op Tekenradar.

`

  constructor(parentKey: string, condition?: Expression) {
    super(parentKey, 'LPPlusEndText');

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

export class SurveyEndGroup extends Group {

  T0_Invites_EndText: T0_Invites_EndText;
  StandardflowEndText: StandardflowEndText;
  FollowupEndText: FollowupEndText;
  WeeklyEndText: WeeklyEndText;
  LPPlusEndText: LPPlusEndText;
  Comment: Comment;

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'END');
    this.groupEditor.setCondition(condition);

    this.T0_Invites_EndText = new T0_Invites_EndText(this.key, SurveyEngine.logic.not(
      SurveyEngine.participantFlags.hasKeyAndValue('LPplus', 'likely')
    ));
    this.StandardflowEndText = new T0_Invites_EndText(this.key);
    this.FollowupEndText = new FollowupEndText(this.key);
    this.WeeklyEndText = new WeeklyEndText(this.key);
    this.LPPlusEndText = new LPPlusEndText(this.key);
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
    if (this.isPartOf(surveyKeys.LPplus_part3)) {
      this.addItem(this.LPPlusEndText.get())
    }
    this.addItem(this.Comment.get())
  }
}


//LPplus make entext for non-prticipants
class EndText_LPPlusNP extends Item {

  markdownContent = `
### Je hebt aangegeven niet mee te willen doen aan ons vervolgonderzoek.

Hartelijk dank dat je dit in het verleden wel hebt gedaan, ben je nog geïnteresseerd in de resultaten van het onderzoek destijds dan kun je deze vinden bij de nieuwsberichten op Tekenradar.nl.

Zouden we je hieronder nog één korte laatste vraag mogen stellen?

##### Let op: klik op **"Opslaan en verder gaan"** onderaan de pagina om je antwoord op te sturen!


`

  constructor(parentKey: string, condition?: Expression) {
    super(parentKey, 'EndText_LPPlusNP');

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

class StopReden extends Item {

  optionKeys = {
    other: 'j'
  }

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Wat is de reden dat je de vragenlijst niet wilt invullen?'],
      ]),
    },
    {
      content: new Map([
        ["nl", " Er zijn meerdere antwoorden mogelijk. Waarom vragen we dit? We willen kijken waarom deelnemers niet meedoen omdat dit onze bevindingen kan beïnvloeden. Hiermee kunnen we uitzoeken waarom sommige mensen wél klachten blijven houden en sommige mensen niet."],
      ]),
      className: "fw-normal"
    },
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'SR');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.multipleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Ik heb geen klachten of ik heb geen klachten meer"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Ik wil niet meedoen omdat ik teveel last heb van klachten (door lymeziekte)"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "Ik denk dat mijn klachten niet door lymeziekte komen"],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "Het invullen van de vragenlijst kost me teveel tijd"],
          ])
        },
        {
          key: 'e', role: 'option',
          content: new Map([
            ["nl", "Het invullen van de vragenlijst is te lastig via een website"],
          ])
        },
        {
          key: 'f', role: 'option',
          content: new Map([
            ["nl", "De website werkt niet goed"],
          ])
        },
        {
          key: 'g', role: 'option',
          content: new Map([
            ["nl", "De vragen van het onderzoek zijn niet duidelijk"],
          ])
        },
        {
          key: 'h', role: 'option',
          content: new Map([
            ["nl", "Ik zie het nut van het onderzoek niet in"],
          ])
        },
        {
          key: 'i', role: 'option',
          content: new Map([
            ["nl", "Dat wil ik niet zeggen"],
          ])
        },
        MCOptions.cloze({
          key: this.optionKeys.other,
          items: [
            ClozeItemTypes.text({
              key: 'j', content: new Map(
                [['nl', "Een andere reden, namelijk:"]]
              )
            }),
            ClozeItemTypes.textInput({
              key: 'input',
            }),
          ]
        }),
      ],
      customValidations: [
        {
          key: 'SR', rule:
            SurveyEngine.logic.or(
              SurveyEngine.multipleChoice.none(this.key, this.optionKeys.other),
              SurveyEngine.logic.and(
                SurveyEngine.multipleChoice.any(this.key, this.optionKeys.other),
                SurveyEngine.hasResponse(this.key, `rg.mcg.${this.optionKeys.other}.input`),
              )
            ),
          type: 'hard'
        }
      ]
    })
  }
}

export class EndGroup_LPPlusNP extends Group {

  EndText_LPPlusNP: EndText_LPPlusNP;
  StopReden: StopReden;
  Comment: Comment;

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'END_NP');
    this.groupEditor.setCondition(condition);

    this.EndText_LPPlusNP = new EndText_LPPlusNP(this.key,
      SurveyEngine.participantFlags.hasKeyAndValue('LPplus', 'likely')
    );
    this.StopReden = new StopReden(this.key, isRequired);
    this.Comment = new Comment(this.key, isRequired);
  }

  buildGroup(): void {
    this.addItem(this.EndText_LPPlusNP.get())
    this.addItem(this.StopReden.get())
    this.addItem(this.Comment.get())
  }
}
