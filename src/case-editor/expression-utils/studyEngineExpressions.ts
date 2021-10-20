import { Expression } from "survey-engine/lib/data_types"
import { multipleChoiceKey, responseGroupKey, singleChoiceKey } from "../constants/key-definitions"
import { Duration, durationObjectToSeconds } from "../types/duration"
import { generateExpression } from "./expressionGen"

const or = (...args: Expression[]): Expression => generateExpression('or', undefined, ...args)
const and = (...args: Expression[]): Expression => generateExpression('and', undefined, ...args)
const not = (arg: Expression): Expression => generateExpression('not', undefined, arg)

/**
 * Check if the current event has the given type
 * @param equalsType string with the possible values: 'ENTER', 'SUBMIT', 'TIMER
 * @returns if event type matches the argument, return true otherwise false
 */
const checkEventType = (equalsType: 'ENTER' | 'SUBMIT' | 'TIMER') => generateExpression('checkEventType', undefined, equalsType)

/**
 * Check if the submitted survey has a specific key
 * @param surveyKey string to check for
 * @returns true, if the survey has the key, false otherwise
 */
const checkSurveyResponseKey = (surveyKey: string) => generateExpression('checkSurveyResponseKey', undefined, surveyKey);

/**
 * Check survey response item, if any of the defined option keys is present in the given response group
 * @param itemKey full key to the survey item, in the form, e.g., <surveyKey>.<groupKey>.<itemKey>
 * @param responseSlotKey full key to the response group, e.g., 'rg.scg'
 * @param optionKeys list of option keys to be checked for.
 * @returns true if any of the option keys are present in the item's response. If item or the response group is not found, return false.
 */
const responseHasKeysAny = (itemKey: string, responseSlotKey: string, ...optionKeys: string[]) => generateExpression('responseHasKeysAny', undefined, itemKey, responseSlotKey, ...optionKeys);

/**
 * Check survey response item, if only other keys have been selected
 * @param itemKey full key to the survey item, in the form, e.g., <surveyKey>.<groupKey>.<itemKey>
 * @param responseSlotKey full key to the response group, e.g., 'rg.mcg'
 * @param optionKeys list of option keys to be checked for.
 * @returns true if a response key is present, but is not in the list defined by optionKeys. If item or the response group is not found, returns false.
 */
const responseHasOnlyKeysOtherThan = (itemKey: string, responseSlotKey: string, ...optionKeys: string[]) => generateExpression('responseHasOnlyKeysOtherThan', undefined, itemKey, responseSlotKey, ...optionKeys)

const getResponseValueAsNum = (itemKey: string, responseKey: string): Expression => {
    return generateExpression('getResponseValueAsNum', 'float', itemKey, responseKey);
}

const getResponseValueAsStr = (itemKey: string, responseKey: string): Expression => {
    return generateExpression('getResponseValueAsStr', 'string', itemKey, responseKey);
}

const countResponseItems = (itemKey: string, responseKey: string): Expression => {
    return generateExpression('countResponseItems', undefined, itemKey, responseKey);
}

/**
 * Method to run a check on previous responses of the participant.
 * @param condition expression that will be evaluated on each retrieved response
 * @param checkType - optional - 'all'/'any'/<number>: determines how to calculate the final value of the check. Default: 'all'. 'all' means, all the retrieved responses need to fulfil the condition, otherwise the methods returns false. 'any' means at least one retrieved response needs to fulfil the condtion. In both cases, if there were no responses retrieved, returns false. If a number is given here, it means, at least this many response need to fulfil the condition.
 * @param surveyKey - optional - filter for responses of this survey.
 * @param querySince - optional - retrieve responses that were submitted later than this timestamp. Expressions need to return a timestamp, or hard coded numbers can be used as well.
 * @param queryUntil - optional - retrieve responses that were submitted before this timestamp. Expressions need to return a timestamp, or hard coded numbers can be used as well.
 * @returns true/false
 */
const checkConditionForOldResponses = (
    condition: Expression,
    checkType?: number | 'all' | 'any',
    surveyKey?: string,
    querySince?: number | Expression,
    queryUntil?: number | Expression,
): Expression => generateExpression('checkConditionForOldResponses', undefined, condition, checkType, surveyKey, querySince, queryUntil)

/**
 * Method to access the timestamp for when the participant entered the study
 * @returns timestamp
 */
const getStudyEntryTime = () => generateExpression('getStudyEntryTime');

/**
 * Determines if a specific survey key is currently assigned to the participant.
 * @param surveyKey - string - key of the survey to check for.
 * @returns true if the participant has a survey with this surveyKey assigned, otherwise false.
 */
const hasSurveyKeyAssigned = (surveyKey: string) => generateExpression('hasSurveyKeyAssigned', undefined, surveyKey);

/**
 * Method to access the timestamp for a surveyKey is assigned from
 * @param surveyKey - string - key of the survey to check for.
 * @returns timestamp
 */
const getSurveyKeyAssignedFrom = (surveyKey: string) => generateExpression('getSurveyKeyAssignedFrom', undefined, surveyKey);

/**
 * Method to access the timestamp for a surveyKey is assigned until
 * @param surveyKey - string - key of the survey to check for.
 * @returns timestamp
 */
const getSurveyKeyAssignedUntil = (surveyKey: string) => generateExpression('getSurveyKeyAssignedUntil', undefined, surveyKey);

/**
 * Check if a participant has a specific study status
 * @param status - string
 * @returns true/false
 */
const hasStudyStatus = (status: string) => generateExpression('getSurveyKeyAssignedUntil', undefined, status);

/**
 * Check if a participant flag is present
 * @param key look up this flag
 * @param value and for this value
 * @returns return true if key - value pair (with case sensitive matching for both key and value) is present. If any of the two is different, or participant flags is empty, it returns false.
 */
const hasParticipantFlag = (key: string, value: string) => generateExpression('hasParticipantFlag', undefined, key, value);

/**
 * Check if the last submission is older than the reference timestamp
 * @param reference look up this flag
 * @param surveyKey - optional - check for this specific survey key. If empty, it would check for all the submissions.
 * @returns boolean
 */
const lastSubmissionDateOlderThan = (reference: number | Expression, surveyKey?: string) => generateExpression('lastSubmissionDateOlderThan', undefined, reference, surveyKey);

const eq = (val1: Expression | string | number, val2: Expression | string | number) => generateExpression('eq', undefined, val1, val2);
const lt = (val1: Expression | string | number, val2: Expression | string | number) => generateExpression('lt', undefined, val1, val2);
const lte = (val1: Expression | string | number, val2: Expression | string | number) => generateExpression('lte', undefined, val1, val2);
const gt = (val1: Expression | string | number, val2: Expression | string | number) => generateExpression('gt', undefined, val1, val2);
const gte = (val1: Expression | string | number, val2: Expression | string | number) => generateExpression('gte', undefined, val1, val2);

/**
 * Generate a timestamp value (POSIX timestamp). T = T_ref + delta. If 'reference' is not defined, the current time will be used as a reference.
 * @param delta offset for the timestamp generation
 * @param reference optional - a hard coded number, or an expression that should retrieve a timestamp (e.g., surveys assigned from, or response to a date question)
 * @returns
 */
const timestampWithOffset = (delta: Duration, reference?: number | Expression) => generateExpression(
    'timestampWithOffset',
    undefined,
    durationObjectToSeconds(delta),
    reference ? reference : undefined
)

/**
 * Control flow method to use an if-else like structure
 * @param condition expression, return value interpreted as boolean
 * @param actionIfTrue if condition evaluates to true, this action will be performed.
 * @param actionIfFalse optional, if defined and the condition returns false, this action will be performed.
 * @returns
 */
const IF = (condition: Expression, actionIfTrue: Expression, actionIfFalse?: Expression): Expression => generateExpression('IF', undefined, condition, actionIfTrue, actionIfFalse)

/**
 * Perform a list of expressions / actions
 * @param args: list of expressions to be evaluated
 * @returns
 */
const DO = (...args: Expression[]): Expression => generateExpression('DO', undefined, ...args)

/**
 * Simple if statement (without else), that checks for the condition and executes the list of actions.
 * @param condition condition to check, return value interpreted as boolean
 * @param args list of actions to be performed if condition evaluates to true, otherwise they are ignored
 * @returns
 */
const IFTHEN = (condition: Expression, ...args: Expression[]): Expression => generateExpression('IFTHEN', undefined, condition, ...args)

/**
 * Update the participant's study status
 * @param status new status value
 * @returns
 */
const UPDATE_STUDY_STATUS = (status: string): Expression => generateExpression('UPDATE_STUDY_STATUS', undefined, status)

/**
 * Add or update a participant flag
 * @param key
 * @param newValue
 * @returns
 */
const UPDATE_FLAG = (key: string, newValue: string) => generateExpression('UPDATE_FLAG', undefined, key, newValue)

const REMOVE_FLAG = (key: string) => generateExpression('REMOVE_FLAG', undefined, key);

const ADD_NEW_SURVEY = (surveyKey: string,
    category: 'prio' | 'normal' | 'optional',
    activeFrom?: number | Expression,
    activeUntil?: number | Expression) => generateExpression('ADD_NEW_SURVEY', undefined, surveyKey, activeFrom !== undefined ? activeFrom : 0, activeUntil !== undefined ? activeUntil : 0, category)

const REMOVE_ALL_SURVEYS = () => generateExpression('REMOVE_ALL_SURVEYS')

/**
 * When submitting the response, item response with the given key would be added to the report array
 * @param itemKey find and add this item to the report array
 * @returns
 */
const ADD_REPORT = (itemKey: string) => generateExpression('ADD_REPORT', undefined, itemKey);

const REMOVE_SURVEY_BY_KEY = (
    surveyKey: string,
    selector: 'first' | 'last' | 'all'
) => {
    if (selector === 'all') {
        return generateExpression('REMOVE_SURVEYS_BY_KEY', undefined, surveyKey);
    } else {
        return generateExpression('REMOVE_SURVEY_BY_KEY', undefined, surveyKey, selector);
    }
}

const REMOVE_ALL_REPORTS = () => generateExpression('REMOVE_ALL_REPORTS')

const REMOVE_REPORT_BY_KEY = (
    surveyKey: string,
    selector: 'first' | 'last' | 'all'
) => {
    if (selector === 'all') {
        return generateExpression('REMOVE_REPORTS_BY_KEY', undefined, surveyKey);
    } else {
        return generateExpression('REMOVE_REPORT_BY_KEY', undefined, surveyKey, selector);
    }
}

// ##################
// Extra methods:

const singleChoiceOptionsSelected = (itemKey: string, ...optionKeys: string[]) => generateExpression('responseHasKeysAny', undefined, itemKey, [responseGroupKey, singleChoiceKey].join('.'), ...optionKeys)
const multipleChoiceOptionsSelected = (itemKey: string, ...optionKeys: string[]) => generateExpression('responseHasKeysAny', undefined, itemKey, [responseGroupKey, multipleChoiceKey].join('.'), ...optionKeys)

const multipleChoiceAllOfTheseSelected = (itemKey: string, ...optionKeys: string[]) => and(
    ...optionKeys.map(option => generateExpression('responseHasKeysAny', undefined, itemKey, [responseGroupKey, multipleChoiceKey].join('.'), option))
);


const multipleChoiceOnlyOtherKeysSelected = (itemKey: string, ...optionKeys: string[]) => generateExpression('responseHasOnlyKeysOtherThan', undefined, itemKey, [responseGroupKey, multipleChoiceKey].join('.'), ...optionKeys)
const singleChoiceOnlyOtherOptionSelected = (itemKey: string, ...optionKeys: string[]) => generateExpression('responseHasOnlyKeysOtherThan', undefined, itemKey, [responseGroupKey, singleChoiceKey].join('.'), ...optionKeys)

const stopParticipation = () => UPDATE_STUDY_STATUS('inactive');
const finishParticipation = () => UPDATE_STUDY_STATUS('finished');

/**
 * If a survey is assigned with validFrom <= now and validUnil >= now
 * @param surveyKey which survey it should check for
 * @returns
 */
const hasSurveyKeyActive = (surveyKey: string) => {
    return and(
        lte(
            getSurveyKeyAssignedFrom(surveyKey),
            timestampWithOffset({ seconds: 1 })
        ),
        gte(
            getSurveyKeyAssignedUntil(surveyKey),
            timestampWithOffset({ seconds: -1 })
        ),
    )
}

/**
 * Results of "T_ref = reference + delta" will be checked against "validFrom" of the assinged survey (if present). True T_ref > T_validFrom.
 * @param surveyKey which survey it should check for
 * @param delta delta time to the reference time (by default current time).
 * @param reference optional reference time. If undefined it will take the current time.
 * @returns
 */
const hasSurveyKeyValidFromOlderThan = (surveyKey: string, delta: Duration, reference?: number | Expression) => {
    return lt(
        getSurveyKeyAssignedFrom(surveyKey),
        timestampWithOffset(delta, reference)
    );
}

/**
 * Results of "T_ref = reference + delta" will be checked against "validUntil" of the assinged survey (if present). True T_ref < T_validUntil.
 * @param surveyKey which survey it should check for
 * @param delta delta time to the reference time (by default current time).
 * @param reference optional reference time. If undefined it will take the current time.
 * @returns
 */
const hasSurveyKeyValidUntilSoonerThan = (surveyKey: string, delta: Duration, reference?: number | Expression) => {
    return gt(
        timestampWithOffset(delta, reference),
        getSurveyKeyAssignedUntil(surveyKey)
    );
}

export const NativeStudyEngineExpressions = {
    checkEventType,
    // Response checkers
    checkSurveyResponseKey,
    responseHasKeysAny,
    responseHasOnlyKeysOtherThan,
    getResponseValueAsNum,
    getResponseValueAsStr,
    countResponseItems,
    // Old responses
    checkConditionForOldResponses,
    // Participant state:
    participantState: {
        getStudyEntryTime,
        hasSurveyKeyAssigned,
        getSurveyKeyAssignedFrom,
        getSurveyKeyAssignedUntil,
        hasStudyStatus,
        hasParticipantFlag,
        lastSubmissionDateOlderThan,
    },
    // logical and comparision
    eq,
    lt,
    lte,
    gt,
    gte,
    or,
    and,
    not,

    // Other
    timestampWithOffset,
}

export const StudyEngineActions = {
    if: IF,
    do: DO,
    ifThen: IFTHEN,
    participantActions: {
        updateStudyStatus: UPDATE_STUDY_STATUS,
        updateFlag: UPDATE_FLAG,
        removeFlag: REMOVE_FLAG,
        assignedSurveys: {
            add: ADD_NEW_SURVEY,
            removeAll: REMOVE_ALL_SURVEYS,
            remove: REMOVE_SURVEY_BY_KEY,
        },
        reports: {
            add: ADD_REPORT,
            removeAll: REMOVE_ALL_REPORTS,
            remove: REMOVE_REPORT_BY_KEY,
        },

        // Extra methods:
        stopParticipation,
        finishParticipation,
    }
}

export const StudyEngine = {
    ...NativeStudyEngineExpressions,
    ...StudyEngineActions,
    singleChoice: {
        any: singleChoiceOptionsSelected,
        none: singleChoiceOnlyOtherOptionSelected
    },
    multipleChoice: {
        any: multipleChoiceOptionsSelected,
        none: multipleChoiceOnlyOtherKeysSelected,
        all: multipleChoiceAllOfTheseSelected,
    },
    survey: {
        isActive: hasSurveyKeyActive,
        validFromOlderThan: hasSurveyKeyValidFromOlderThan,
        validUntilSoonerThan: hasSurveyKeyValidUntilSoonerThan,
    }
}
