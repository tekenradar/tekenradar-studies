import { SurveyItemGenerators } from '../../../case-editor/utils/question-type-generator';
import { Expression, SurveyGroupItem, SurveyItem, SurveySingleItem } from 'survey-engine/lib/data_types';
import { SurveyEngine } from '../../../case-editor/expression-utils/surveyEngineExpressions';
import { Group } from '../../../case-editor/types/group';
import { SurveyDefinition } from '../../../case-editor/types/surveyDefinition';
import { Item } from '../../../case-editor/types/item';
import { ComponentGenerators } from '../../../case-editor/utils/componentGenerators';
import { TickBiteGroup } from './questions/tickBite';


class TB_adultsDef extends SurveyDefinition {
    G1: TickBiteGroup;
    

    constructor() {
        super({
            surveyKey: 'TB_adults',
            name: new Map([
                ['en', 'Test']
            ]),
            description: new Map([
                ['en', 'Test']
            ]),
            durationText: new Map([
                ['en', 'Test']
            ]),
        });

        this.G1 = new TickBiteGroup(this.key);
        
    }

    buildSurvey() {
        this.addItem(this.G1.get());
    }
}

export const TB_adults = new TB_adultsDef();

