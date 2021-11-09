import { SurveyItemGenerators } from '../../../../case-editor/utils/question-type-generator';
import { Expression, SurveyGroupItem, SurveyItem, SurveySingleItem } from 'survey-engine/lib/data_types';
import { SurveyEngine } from '../../../../case-editor/expression-utils/surveyEngineExpressions';
import { Group } from '../../../../case-editor/types/group';
import { SurveyDefinition } from '../../../../case-editor/types/surveyDefinition';
import { Item } from '../../../../case-editor/types/item';
import { ComponentGenerators } from '../../../../case-editor/utils/componentGenerators';
import {Age} from './demographie'



export class PDiffGroup extends Group {

    isRequired: boolean;
    Q1: DetectTickBite;
    Q2: FeverTickBite;
    Q3: EMTickBite;
    Q4: LymeTickBite1;
    Q5: LymeTickBite2;
    Q6: MedicationLyme;
    Q7: Age;

    
    constructor(parentKey: string) {
        super(parentKey, 'PDiffG');
        this.isRequired = false;

        this.Q1 = new DetectTickBite(this.key, this.isRequired);
        const q1Condition = SurveyEngine.singleChoice.any(this.Q1.key, this.Q1.optionKeys.nameOfOption);

        this.Q2 = new FeverTickBite(this.key, this.isRequired, q1Condition);
        this.Q3 = new EMTickBite(this.key, this.isRequired);
        this.Q4 = new LymeTickBite1(this.key, this.isRequired);
        const q4Condition = SurveyEngine.singleChoice.any(this.Q4.key, this.Q4.optionKeys.nameOfOption);

        this.Q5 = new LymeTickBite2(this.key, this.isRequired, q4Condition);
        this.Q6 = new MedicationLyme(this.key, this.isRequired, q4Condition);
        this.Q7 = new Age(this.key, this.isRequired);
        
    }

    
    buildGroup() {

        this.addItem(this.Q1.get());
        this.addItem(this.Q2.get());
        this.addItem(this.Q3.get());
        this.addItem(this.Q4.get());
        this.addItem(this.Q5.get());
        this.addItem(this.Q6.get());
        this.addItem(this.Q7.get());
        this.addPageBreak();

    }

}


class DetectTickBite extends Item {

    optionKeys = {
        nameOfOption: 'a'
     }

    constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
        super(parentKey, 'DetTB');

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
                ['nl', 'Heb je een tekenbeet opgemerkt?'],
            ]),
            responseOptions: [
                {
                    key: this.optionKeys.nameOfOption, role: 'option',
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


class FeverTickBite extends Item {

    constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
        super(parentKey, 'FevTB');

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
                ['nl', 'Heb je binnen vier weken na de tekenbeet gemeten koorts boven 38,0 graden gehad?'],
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
                {
                    key: 'c', role: 'option',
                    content: new Map([
                        ["nl", "Nee, nog niet"],
                    ])
                },
            ]
        })
    }
}


class EMTickBite extends Item {

    constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
        super(parentKey, 'EMTB');

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
                ['nl', 'Heb je een rode ring of vlek veroorzaakt door een tekenbeet (erythema migrans)?'],
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



class LymeTickBite1 extends Item {

    optionKeys = {
        nameOfOption: 'a'
     }

    constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
        super(parentKey, 'LTB1');

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
                ['nl', 'Heb je een andere vorm van de ziekte van Lyme?'],
            ]),
            responseOptions: [
                {
                    key: this.optionKeys.nameOfOption, role: 'option',
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


class LymeTickBite2 extends Item {

    constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
        super(parentKey, 'LTB2');

        this.isRequired = isRequired;
        this.condition = condition;
    }

    buildItem() {
        return SurveyItemGenerators.multipleChoice({
            parentKey: this.parentKey,
            itemKey: this.itemKey,
            isRequired: this.isRequired,
            condition: this.condition,
            questionText: new Map([
                ['nl', 'Welke andere vorm van de ziekte van Lyme heb je? Kruis alle antwoorden aan die op jou van toepassing zijn.'],
            ]),
            responseOptions: [
                {
                    key: 'a', role: 'option',
                    content: new Map([
                        ["nl", "Koorts"],
                    ])
                },
                {
                    key: 'b', role: 'option',
                    content: new Map([
                        ["nl", "Een positieve bloedtest voor de ziekte van Lyme"],
                    ])
                },
                {
                    key: 'c', role: 'option',
                    content: new Map([
                        ["nl", "Een andere vorm van de ziekte van Lyme"],
                    ])
                },
            ]
        })
    }
}


class MedicationLyme extends Item {

    constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
        super(parentKey, 'MedLyme');

        this.isRequired = isRequired;
        this.condition = condition;
    }

    
    buildItem() {
        return SurveyItemGenerators.multipleChoice({
            parentKey: this.parentKey,
            itemKey: this.itemKey,
            isRequired: this.isRequired,
            condition: this.condition,
            questionText: new Map([
                ['nl', 'Ben je voor deze ziekte van Lyme behandeld met antibiotica?'],
            ]),
            responseOptions: [
                {
                    //TODO: don't make filling in date mandatory to avoid getting stuck due to forgotten date
                    //TODO: date input mode
                    key: 'a', role: 'dateInput',
                    content: new Map([
                        ["nl", "Ja, ik ben gestart op"],
                    ])
                },
                {
                    key: 'b', role: 'option',
                    content: new Map([
                        ["nl", "Nee, maar ik start binnenkort met de behandeling"],
                    ])
                },
                {
                    key: 'c', role: 'option',
                    content: new Map([
                        ["nl", "Nee"],
                    ])
                },
            ]
        })
    }
}

