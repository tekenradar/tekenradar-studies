
import { Expression } from 'survey-engine/lib/data_types';
import { Group, Item } from 'case-editor-tools/surveys/types';
import { SurveyEngine, SurveyItems } from 'case-editor-tools/surveys';


export class PreviousTickBitesGroup extends Group {

    Q1: PreviousTickBites1;
    Q2: PreviousTickBites2;

   
    constructor(parentKey: string, isRequired?: boolean) {
        super(parentKey, 'PTBG');


        this.Q1 = new PreviousTickBites1(this.key,isRequired);
        const q1Condition = SurveyEngine.singleChoice.none(this.Q1.key, this.Q1.optionKeys.nameOfOption);
        this.Q2 = new PreviousTickBites2(this.key,isRequired,q1Condition);

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
            //TODO bold text "in de afgelopen 5 jaar" ?
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

    //TODO bold text "in de afgelopen 3 maanden" ?
    questionTextMain = [
        {
            content: new Map([
                ["nl", 'Als je deze tekenbeet niet meetelt, hoeveel tekenbeten heb je dan '],
            ]),
        },
        {
            content: new Map([
                ["nl", "in de afgelopen 3 maanden "],
            ]),
            className: "text-primary"
        },
        {
            content: new Map([
                ["nl", "opgemerkt?"],
            ]),
        },
    ]

    questionTextFollowup = [
        {
            content: new Map([
                ["nl", 'Hoeveel tekenbeten heb je sinds je de vorige vragenlijst 3 maanden geleden invulde opgemerkt die nog niet gemeld zijn via je account op tekenradar.nl?'],
            ]),
        }
    ]

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
            questionText: this.isPartOf('FollowupG') ? this.questionTextFollowup : this.questionTextMain,
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
