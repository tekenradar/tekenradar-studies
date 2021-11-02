import { Expression } from 'survey-engine/lib/data_types';
import { StudyEngine } from '../expression-utils/studyEngineExpressions';


export class StudyRules {
    private enterRules?: Expression[];
    private submitRules?: Expression[];
    private timerRules?: Expression[];

    constructor(
        enterRules?: Expression[],
        submitRules?: Expression[],
        timerRules?: Expression[],
    ) {
        this.enterRules = enterRules;
        this.submitRules = submitRules;
        this.timerRules = timerRules;
    }

    get() {
        const rules = [];
        if (this.enterRules) {
            rules.push(
                StudyEngine.ifThen(StudyEngine.checkEventType('ENTER'), ...this.enterRules)
            );
        }
        if (this.submitRules) {
            rules.push(
                StudyEngine.ifThen(StudyEngine.checkEventType('SUBMIT'), ...this.submitRules)
            );
        }
        if (this.timerRules) {
            rules.push(
                StudyEngine.ifThen(StudyEngine.checkEventType('TIMER'), ...this.timerRules)
            );
        }
        return rules;
    }
}