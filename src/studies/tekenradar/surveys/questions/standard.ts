import { Expression } from 'survey-engine/lib/data_types';
import { Group, Item } from 'case-editor-tools/surveys/types';
import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';
import { PreviousTickBitesGroup } from './prevTickBites';
import { Residence, Gender } from './demographie';
import { Doctor, FormerLymeGroup, GeneralTherapy } from './diagnosisTherapy';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';
import { SingleChoiceOptionTypes as SCOptions, ClozeItemTypes } from 'case-editor-tools/surveys';




export class Tekenradar extends Item {

    constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
      super(parentKey, 'tek');
  
      this.isRequired = isRequired;
      this.condition = condition;
    }
  
    buildItem() {
      return SurveyItems.multipleChoice({
        parentKey: this.parentKey,
        itemKey: this.itemKey,
        isRequired: this.isRequired,
        condition: this.condition,
        questionText: new Map([
          ['nl', 'Hoe heb je over het onderzoek via Tekenradar.nl gehoord? (meerdere antwoorden mogelijk)'],
        ]),
        responseOptions: [
          {
            key: 'a', role: 'option',
            content: new Map([
              ["nl", "Via de huisarts"],
            ])
          },
          {
            key: 'b', role: 'input',
            content: new Map([
              ["nl", "Via de media, namelijk:"],
            ])
          },
          {
            key: 'c', role: 'option',
            content: new Map([
              ["nl", "Via vrienden of familie"],
            ])
          },
          {
            key: 'e', role: 'option',
            content: new Map([
              ["nl", "Via google of een andere internet zoekmachine"],
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
  