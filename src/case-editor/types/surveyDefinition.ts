import { SurveyGroupItem, SurveyItem } from "survey-engine/lib/data_types";
import { Logger } from "../logger/logger";
import { ItemEditor } from "../survey-editor/item-editor";
import { SurveyEditor } from "../survey-editor/survey-editor";
import { generateLocStrings } from "../utils/simple-generators";

export interface SurveyProps {
    surveyKey: string;
    name: Map<string, string>;
    description: Map<string, string>;
    durationText: Map<string, string>;
    // max item per page
    // set prefill rules
    // set context rules
}


export abstract class SurveyDefinition {
    key: string;
    editor: SurveyEditor;

    constructor(props: SurveyProps) {
        this.editor = new SurveyEditor();
        this.editor.changeItemKey('survey', props.surveyKey);
        this.key = props.surveyKey;

        // define name and description of the survey
        this.editor.setSurveyName(generateLocStrings(
            props.name
        ));

        this.editor.setSurveyDescription(generateLocStrings(
            props.description
        ));

        this.editor.setSurveyDuration(generateLocStrings(
            props.durationText
        ));

        const rootItemEditor = new ItemEditor(this.editor.findSurveyItem(props.surveyKey) as SurveyGroupItem);
        rootItemEditor.setSelectionMethod({ name: 'sequential' });
        this.editor.updateSurveyItem(rootItemEditor.getItem());
    }

    abstract buildSurvey(): void;

    getSurvey() {
        this.buildSurvey();
        this.checkDuplicateChildKeys();
        return this.editor.getSurvey();
    }

    getSurveyJSON(pretty?: boolean) {
        this.buildSurvey();
        this.checkDuplicateChildKeys();
        return this.editor.getSurveyJSON(pretty);
    }

    addItem(item: SurveyItem) {
        this.editor.addExistingSurveyItem(item, this.key);
    }

    addSurveyItemToPath(item: SurveyItem, parentKey: string) {
        this.editor.addExistingSurveyItem(item, parentKey);
    }

    private checkDuplicateChildKeys() {
        const group = this.editor.getSurvey().current.surveyDefinition;
        const keys = group.items.map(item => item.key);
        const hasDuplicates = keys.some((key, index) => {
            const isDuplicateKey = keys.indexOf(key) !== index;
            if (isDuplicateKey) {
                Logger.error('Duplicate key:');
                Logger.criticalError(`${key} is used twice (at index ${keys.indexOf(key)} and at index ${index})`);
            }
            return isDuplicateKey;
        });
        if (hasDuplicates) {
            Logger.error('\nSurvey item contains duplicate keys.\nPlease check the lines above for more infos.\nProcess stopped prematurely.')
            process.exit(1)
        }
    }
}