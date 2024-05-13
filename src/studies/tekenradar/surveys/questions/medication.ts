import { Expression } from 'survey-engine/data_types';
import { Item } from 'case-editor-tools/surveys/types';
import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';
import { SingleChoiceOptionTypes as SCOptions, MultipleChoiceOptionTypes as MCOptions, ClozeItemTypes } from 'case-editor-tools/surveys';



export class Medication1 extends Item {

  optionKeys = {
    yes: 'a'
  }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'MED1');

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
        ['nl', 'Gebruik je op dit moment medicijnen?'],
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


export class Medication2 extends Item {

  optionKeys = {
    other: 'l'
  }

  questionTextMain_LPplus = [
    {
      content: new Map([
        ["nl", 'Welke medicijnen zijn dit?'],
      ]),
    },
    {
      content: new Map([
        ["nl", " Er zijn meerdere antwoorden mogelijk. Als je niet weet onder welke categorie een medicijn valt kun je het ook onderaan invullen bij 'andere medicijnen'"],
      ]),
      className: "fw-normal"
    },
  ]


  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'MED2');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.multipleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain_LPplus,
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Medicijnen vanwege een infectie/ontsteking (bijvoorbeeld antibiotica, antivirale middelen)"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Afweerremmende medicatie/immunosuppressiva (bijvoorbeeld prednison)"],
          ])
        },
        {
          key: 'c', role: 'option',
          content: new Map([
            ["nl", "Maagbeschermers/maagzuurremmers (bijvoorbeeld omeprazol) "],
          ])
        },
        {
          key: 'd', role: 'option',
          content: new Map([
            ["nl", "Cholesterolverlagers (bijvoorbeeld atorvastatine, simvastatine)"],
          ])
        },
        {
          key: 'e', role: 'option',
          content: new Map([
            ["nl", "Chemokuur/chemotherapie"],
          ])
        },
        {
          key: 'f', role: 'option',
          content: new Map([
            ["nl", "Medicijnen voor diabetes (bijvoorbeeld insuline of metformine)"],
          ])
        },
        {
          key: 'g', role: 'option',
          content: new Map([
            ["nl", "Hormoonbehandeling"],
          ])
        },
        {
          key: 'h', role: 'option',
          content: new Map([
            ["nl", "Bloeddrukverlagers (angiotensine convertering enzyme (ACE)-remmers en angiotensine receptorblokkers (ARB’s)) "],
          ])
        },
        {
          key: 'i', role: 'option',
          content: new Map([
            ["nl", "Bloedverdunners (bijvoorbeeld clopidogrel)"],
          ])
        },
        {
          key: 'j', role: 'option',
          content: new Map([
            ["nl", "Anticonceptiepil"],
          ])
        },
        {
          key: 'k', role: 'option',
          content: new Map([
            ["nl", "Pijnstillers anders dan paracetamol"],
          ])
        },
        MCOptions.cloze({
          key: this.optionKeys.other,
          items: [
            ClozeItemTypes.text({
              key: '1', content: new Map(
                [['nl', "Andere medicijnen, namelijk:"]]
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
          key: 'MED1', rule:
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
