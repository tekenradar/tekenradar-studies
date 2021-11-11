
//import { SurveyItemGenerators } from '../../../../case-editor/utils/question-type-generator';
import { Expression } from 'survey-engine/lib/data_types';
import { Group, Item } from 'case-editor-tools/surveys/types';
import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';


export class PreviousTickBitesGroup extends Group {

    Q1: PreviousTickBites1;
    Q2: PreviousTickBites2;

    //TODO: add potential boolean isRequired as parameter
    constructor(parentKey: string,isRequired?: boolean) {
        super(parentKey, 'PTBG');


        this.Q1 = new PreviousTickBites1(this.key,isRequired);
        const q10Condition = SurveyEngine.singleChoice.none(this.Q1.key, this.Q1.optionKeys.nameOfOption);
        this.Q2 = new PreviousTickBites2(this.key,isRequired,q10Condition);

    }

    buildGroup() {

        this.addItem(this.Q1.get());
        this.addItem(this.Q2.get());

    }
}


class PreviousTickBites1 extends Item {

    optionKeys = {
        nameOfOption: 'a'
     }

    constructor(parentKey: string, isRequired?: boolean, condition?: Expression) {
        super(parentKey, 'PTB1');

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
                ['nl', 'Als je deze tekenbeet niet meetelt, hoeveel tekenbeten heb je dan in de afgelopen 5 jaar opgemerkt?'],
            ]),
            responseOptions: [
                {
                    key: 'a', role: 'option',
                    content: new Map([
                        ["nl", "Geen tekenbeten"],
                    ])
                },
                {
                    key: 'b', role: 'option',
                    content: new Map([
                        ["nl", "1 - 3 tekenbeten"],
                    ])
                },
                {
                    key: 'c', role: 'option',
                    content: new Map([
                        ["nl", "4 - 10 tekenbeten"],
                    ])
                },
                {
                    key: 'd', role: 'option',
                    content: new Map([
                        ["nl", "11 - 50 tekenbeten"],
                    ])
                },
                {
                    key: 'e', role: 'option',
                    content: new Map([
                        ["nl", "Meer dan 50 tekenbeten"],
                    ])
                },
            ]
        })
    }
}



class PreviousTickBites2 extends Item {

    constructor(parentKey: string, isRequired?: boolean, condition?: Expression) {
        super(parentKey, 'PTB2');

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
                ['nl', 'Als je deze tekenbeet niet meetelt, hoeveel tekenbeten heb je dan in de afgelopen 3 maanden opgemerkt?'],
            ]),
            responseOptions: [
                {
                    key: 'a', role: 'option',
                    content: new Map([
                        ["nl", "Geen tekenbeten"],
                    ])
                },
                {
                    key: 'b', role: 'option',
                    content: new Map([
                        ["nl", "1 - 3 tekenbeten"],
                    ])
                },
                {
                    key: 'c', role: 'option',
                    content: new Map([
                        ["nl", "4 - 10 tekenbeten"],
                    ])
                },
                {
                    key: 'd', role: 'option',
                    content: new Map([
                        ["nl", "11 - 50 tekenbeten"],
                    ])
                },
                {
                    key: 'e', role: 'option',
                    content: new Map([
                        ["nl", "Meer dan 50 tekenbeten"],
                    ])
                },
            ]
        })
    }
}
