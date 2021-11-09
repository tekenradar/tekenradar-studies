import { SurveyItemGenerators } from '../../../../case-editor/utils/question-type-generator';
import { Expression, SurveyGroupItem, SurveyItem, SurveySingleItem } from 'survey-engine/lib/data_types';
import { SurveyEngine } from '../../../../case-editor/expression-utils/surveyEngineExpressions';
import { Group } from '../../../../case-editor/types/group';
import { SurveyDefinition } from '../../../../case-editor/types/surveyDefinition';
import { Item } from '../../../../case-editor/types/item';
import { ComponentGenerators } from '../../../../case-editor/utils/componentGenerators';



class FormerLymeDiagnosis extends Item {

    constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
        super(parentKey, 'FLD');

        this.isRequired = isRequired;
        this.condition = condition;
    }

    buildItem() {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.parentKey,
            itemKey: this.itemKey,
            isRequired: this.isRequired,
            condition: this.condition,
            questionText: new Map([
                ['nl', 'Heeft de huisarts bij jou ooit eerder een \'erythema migrans\' of een andere uiting van \'de ziekte van Lyme\' vastgesteld?'],
            ]),
            responseOptions: [
                {
                    key: 'a', role: 'option',
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




class FormerLymeTherapy1 extends Item {

    constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
        super(parentKey, 'FLTher1');

        this.isRequired = isRequired;
        this.condition = condition;
    }

    buildItem() {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.parentKey,
            itemKey: this.itemKey,
            isRequired: this.isRequired,
            condition: this.condition,
            questionText: new Map([
                ['nl', 'Is er een antibiotica kuur verstrekt voor deze erythema migrans of andere uiting van \'de ziekte van Lyme\'?'],
            ]),
            responseOptions: [
                {
                    key: 'a', role: 'option',
                    content: new Map([
                        ["nl", "Nee"],
                    ])
                },
                {//TODO input with following text
                    key: 'b', role: 'input',
                    content: new Map([
                        ["nl", "Ja; hoe vaak: .......Antibioticakuren"],
                    ])
                },
                {
                    key: 'c', role: 'option',
                    content: new Map([
                        ["nl", "Onbekend"],
                    ])
                },
            ]
        })
    }
}



class FormerLymeTherapy2 extends Item {

    constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
        super(parentKey, 'FLTher2');

        this.isRequired = isRequired;
        this.condition = condition;
    }

    buildItem() {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.parentKey,
            itemKey: this.itemKey,
            isRequired: this.isRequired,
            condition: this.condition,
            questionText: new Map([
                ['nl', 'Bent je toen hersteld van de eerdere erythema migrans of andere uiting van de ziekte van lyme?'],
            ]),
            responseOptions: [
                {
                    key: 'a', role: 'option',
                    content: new Map([
                        ["nl", "Ja"],
                    ])
                },
                {
                    key: 'b', role: 'option',
                    content: new Map([
                        ["nl", "Nee, ik ben klachten blijven houden tot op heden"],
                    ])
                },
            ]
        })
    }
}



class GeneralTherapy extends Item {

    constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
        super(parentKey, 'GenTher');

        this.isRequired = isRequired;
        this.condition = condition;
    }

    buildItem() {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.parentKey,
            itemKey: this.itemKey,
            isRequired: this.isRequired,
            condition: this.condition,
            questionText: new Map([
                ['nl', 'Heb je in de afgelopen 2 weken medicijnen gebruikt? Zo ja, welke medicijnen en tegen welke gezondheidsklachten?'],
            ]),
            responseOptions: [
                {
                    key: 'a', role: 'option',
                    content: new Map([
                        ["nl", "Nee"],
                    ])
                },
                {//TODO: insert dropbox
                    key: 'b', role: 'input',
                    content: new Map([
                        ["nl", "Ja, namelijk (bijvoorbeeld antibiotica, paracetemol, etc): Medicijn: .............select box with these options: Tegen erythema migrans/ziekte van Lyme ; Tegen iets anders dan de ziekte van Lyme"],
                    ])
                },
            ]
        })
    }
}
