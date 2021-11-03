import { SurveyItemGenerators } from '../../../../case-editor/utils/question-type-generator';
import { Expression, SurveyGroupItem, SurveyItem, SurveySingleItem } from 'survey-engine/lib/data_types';
import { SurveyEngine } from '../../../../case-editor/expression-utils/surveyEngineExpressions';
import { Group } from '../../../../case-editor/types/group';
import { SurveyDefinition } from '../../../../case-editor/types/surveyDefinition';
import { Item } from '../../../../case-editor/types/item';
import { ComponentGenerators } from '../../../../case-editor/utils/componentGenerators';



export class TickBiteGroup extends Group {

    Q1: EnvironmentTickBite;
    Q2: ActivityTickBite;
    Q3: PositionTickBite;
    Q4: NumberTickBite;
    Q5: LocationBodyTickBite;
    Q6: RemoveTickBite1;
    Q7: RemoveTickBite2;

    constructor(parentKey: string) {
        super(parentKey, 'TBG');

        this.Q1 = new EnvironmentTickBite(this.key, false);
        this.Q2 = new ActivityTickBite(this.key, false);
        this.Q3 = new PositionTickBite(this.key, false);
        this.Q4 = new NumberTickBite(this.key, false);
        this.Q5 = new LocationBodyTickBite(this.key, false);
        this.Q6 = new RemoveTickBite1(this.key,false);
        this.Q7 = new RemoveTickBite2(this.key, false);
    }

    buildGroup() {

        this.addItem(this.Q1.get());
        this.addItem(this.Q2.get());
        this.addItem(this.Q3.get());
        this.addPageBreak();
        this.addItem(this.Q4.get());
        this.addItem(this.Q5.get());
        this.addItem(this.Q6.get());
        this.addItem(this.Q7.get());
        this.addPageBreak();
    }
}


class EnvironmentTickBite extends Item {

    constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
        super(parentKey, 'EnvTB');

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
                ['nl', 'In welk type omgeving heb je de tekenbeet opgelopen? (meerdere antwoorden mogelijk)'],
            ]),
            responseOptions: [
                {
                    key: 'a', role: 'option',
                    content: new Map([
                        ["nl", "Tuin"],
                    ])
                },
                {
                    key: 'b', role: 'option',
                    content: new Map([
                        ["nl", "Bos"],
                    ])
                },
                {
                    key: 'c', role: 'option',
                    content: new Map([
                        ["nl", "Heide"],
                    ])
                },
                {
                    key: 'd', role: 'option',
                    content: new Map([
                        ["nl", "Weiland"],
                    ])
                },
                {
                    key: 'e', role: 'option',
                    content: new Map([
                        ["nl", "Stadspark"],
                    ])
                },
                {
                    key: 'f', role: 'option',
                    content: new Map([
                        ["nl", "Duinen"],
                    ])
                },
                {
                    key: 'g', role: 'option',
                    content: new Map([
                        ["nl", "Moerasgebied"],
                    ])
                },
                {
                    key: 'h', role: 'input',
                    content: new Map([
                        ["nl", "Anders, namelijk:"],
                    ])
                },
                {
                    key: 'i', role: 'option',
                    content: new Map([
                        ["nl", "Weet niet"],
                    ])
                },
            ]
        })
    }
}


class ActivityTickBite extends Item {

    constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
        super(parentKey, 'ActTB');

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
                ['nl', 'Bij welke activiteit heb je de tekenbeet opgelopen? (meerdere antwoorden mogelijk)'],
            ]),
            responseOptions: [
                {
                    key: 'a', role: 'option',
                    content: new Map([
                        ["nl", "Wandelen"],
                    ])
                },
                {
                    key: 'b', role: 'option',
                    content: new Map([
                        ["nl", "Hond uitlaten"],
                    ])
                },
                {
                    key: 'c', role: 'option',
                    content: new Map([
                        ["nl", "Tuinieren"],
                    ])
                },
                {
                    key: 'd', role: 'option',
                    content: new Map([
                        ["nl", "Picknicken"],
                    ])
                },
                {
                    key: 'e', role: 'option',
                    content: new Map([
                        ["nl", "Groenbeheer"],
                    ])
                },
                {
                    key: 'f', role: 'option',
                    content: new Map([
                        ["nl", "Spelen"],
                    ])
                },
                {
                    key: 'g', role: 'input',
                    content: new Map([
                        ["nl", "Werk gerelateerde activiteit, mijn beroep is:"],
                    ])
                },
                {
                    key: 'h', role: 'input',
                    content: new Map([
                        ["nl", "Anders, namelijk:"],
                    ])
                },
                {
                    key: 'i', role: 'option',
                    content: new Map([
                        ["nl", "Weet niet"],
                    ])
                },
            ]
        })
    }
}


class PositionTickBite extends Item {

    constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
        super(parentKey, 'PosTB');

        this.isRequired = isRequired;
        this.condition = condition;
    }

    //TODO: pop up map for response options 1-3
    //Pop-up map (participants are asked to place a marker on the map,
    //this map is  also to be shown on a map on the homepage)
    buildItem() {
        return SurveyItemGenerators.singleChoice({
            parentKey: this.parentKey,
            itemKey: this.itemKey,
            isRequired: this.isRequired,
            condition: this.condition,
            questionText: new Map([
                ['nl', 'Weet je de locatie waar je de tekenbeet (vermoedelijk) heeft opgelopen?'],
            ]),
            responseOptions: [
                {
                    key: 'a', role: 'option',
                    content: new Map([
                        ["nl", "Ja, ik weet het precies"],
                    ])
                },
                {
                    key: 'b', role: 'option',
                    content: new Map([
                        ["nl", "Ja, ik weet het ongeveer"],
                    ])
                },
                {
                    key: 'c', role: 'option',
                    content: new Map([
                        ["nl", "Ja, ik denk het te weten"],
                    ])
                },
                {
                    key: 'd', role: 'option',
                    content: new Map([
                        ["nl", "Nee, ik weet het"],
                    ])
                },
            ]
        })
    }
}


class NumberTickBite extends Item {

    constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
        super(parentKey, 'NumTB');

        this.isRequired = isRequired;
        this.condition = condition;
    }

    buildItem() {
        return SurveyItemGenerators.numericInput({
            parentKey: this.parentKey,
            itemKey: this.itemKey,
            isRequired: this.isRequired,
            condition: this.condition,
            questionText: new Map([
                ['nl', 'Door hoeveel teken ben je nu gebeten?'],
            ]),
            content: new Map([
                ['nl', '']
            ]),
            //TODO: default preset to 1
            contentBehindInput: true,
            componentProperties: {
                min: 1,
                max: 20
            }
        })
    }
}


class LocationBodyTickBite extends Item {

    constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
        super(parentKey, 'LocTB');

        this.isRequired = isRequired;
        this.condition = condition;
    }

    buildItem() {
        return SurveyItemGenerators.multilineTextInput({
            parentKey: this.parentKey,
            itemKey: this.itemKey,
            isRequired: this.isRequired,
            condition: this.condition,
            questionText: new Map([
                ['nl', 'Wat was de locatie van de tekenbeet op je  lichaam? (graag zo specifiek mogelijk aangeven, bijvoorbeeld: linker been aan de buitenkant boven de enkel. Als je door meerdere teken gebeten bent graag alle lokaties aangeven)'],
            ]),
        })
    }
}


class RemoveTickBite1 extends Item {

    constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
        super(parentKey, 'RemTB1');

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
                ['nl', 'Zit de teek nog vast op het lichaam?'],
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


class RemoveTickBite2 extends Item {

    constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
        super(parentKey, 'RemTB2');

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
                ['nl', 'Heb je de teek bewaard?'],
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

