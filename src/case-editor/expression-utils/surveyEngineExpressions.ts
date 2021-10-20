import { Expression } from "survey-engine/lib/data_types"
import { datePickerKey, inputKey, multipleChoiceKey, responseGroupKey, singleChoiceKey } from "../constants/key-definitions"
import { Duration, durationObjectToSeconds } from "../types/duration"
import { generateExpression } from "./expressionGen"

/**
 * Logical OR expression
 * @returns expression that return true if any of the arguments evaluates to true
 */
const or = (...args: Expression[]): Expression => generateExpression('or', undefined, ...args)

/**
 * Logical AND expression
 * @returns expression that return true if all of the arguments evaluates to true
 */
const and = (...args: Expression[]): Expression => generateExpression('and', undefined, ...args)

/**
 * Logical NOT expression
 * @returns expression that negates the argument - true if arg is false, false if arg is true
 */
const not = (arg: Expression): Expression => generateExpression('not', undefined, arg)

/**
 * [===] Equality check
 * @returns expression that return true of both arguments are equal
 */
const eq = (val1: Expression | string | number, val2: Expression | string | number) => generateExpression('eq', undefined, val1, val2);

/**
 * [<] val1 is less than val2?
 * @param val1
 * @param val2
 * @returns
 */
const lt = (val1: Expression | string | number, val2: Expression | string | number) => generateExpression('lt', undefined, val1, val2);

/**
 * [<=] val1 is less than  or equal to val2?
 * @param val1
 * @param val2
 * @returns
 */
const lte = (val1: Expression | string | number, val2: Expression | string | number) => generateExpression('lte', undefined, val1, val2);

/**
 * [>] val1 is greater than val2?
 * @param val1
 * @param val2
 * @returns
 */
const gt = (val1: Expression | string | number, val2: Expression | string | number) => generateExpression('gt', undefined, val1, val2);

/**
 * [>=] val1 is greater than or equal to val2?
 * @param val1
 * @param val2
 * @returns
 */
const gte = (val1: Expression | string | number, val2: Expression | string | number) => generateExpression('gte', undefined, val1, val2);

/**
 * Generate a timestamp value (POSIX timestamp). T = T_ref + delta. If 'reference' is not defined, the current time will be used as a reference.
 * @param delta offset for the timestamp generation
 * @param reference optional - a hard coded number, or an expression that should retrieve a timestamp (e.g., surveys assigned from, or response to a date question)
 * @returns
 */
const timestampWithOffset = (delta: Duration, reference?: number | Expression): Expression => generateExpression(
    'timestampWithOffset',
    undefined,
    durationObjectToSeconds(delta),
    reference ? reference : undefined
)

/**
 * Extract value from a response if exits parsed as a number
 * @param itemKey full key of the survey item (e.g. SURVEY.GROUP.QUESTIONKEY)
 * @param responseKey full key of the response slot inside the item (e.g. rg.num)
 * @returns expression that returns the value or undefined
 */
const getResponseValueAsNum = (itemKey: string, responseKey: string): Expression => {
    return generateExpression('getResponseValueAsNum', 'float', itemKey, responseKey);
}

/**
 * Extract value from a response if exits as string
 * @param itemKey full key of the survey item (e.g. SURVEY.GROUP.QUESTIONKEY)
 * @param responseKey full key of the response slot inside the item (e.g. rg.input)
 * @returns expression that returns the value or undefined
 */
const getResponseValueAsStr = (itemKey: string, responseKey: string): Expression => {
    return generateExpression('getResponseValueAsStr', 'string', itemKey, responseKey);
}

/**
 * Count the number of existing response items inside the slot
 * @param itemKey full key of the survey item (e.g. SURVEY.GROUP.QUESTIONKEY)
 * @param responseKey full key of the response slot inside the item (e.g. rg.mcg)
 * @returns expression that returns the number of items of the response slot
 */
const countResponseItems = (itemKey: string, responseKey: string): Expression => {
    return generateExpression('countResponseItems', undefined, itemKey, responseKey);
}

/**
 * Evaluates an expression and checks if the return value is defined
 * @param arg Expression with a potentially undefined return value
 * @returns
 */
const isDefined = (arg: Expression): Expression => {
    return generateExpression('isDefined', undefined, arg);
}

/**
 * Reference to the context variable storing e.g. participant infos
 * @returns
 */
const getContext = (): Expression => {
    return generateExpression('getContext', undefined);
}

/**
 * Reference to the current response array
 * @returns
 */
const getResponses = (): Expression => {
    return generateExpression('getResponses', undefined);
}

/**
 * Reference to the list of currently active survey questions
 * @returns
 */
const getRenderedItems = (): Expression => {
    return generateExpression('getRenderedItems', undefined);
}

/**
 * Extract value of an attribute of the referenced object
 * @param objectRef expression that references an object
 * @param attributeName name of the attribute to be extracted
 * @returns
 */
const getAttribute = (objectRef: Expression, attributeName: string): Expression => {
    return generateExpression('getAttribute', undefined, objectRef, attributeName);
}

/**
 * Extract value at index
 * @param arrayRef expression that references an array
 * @param index position in the array
 * @returns
 */
const getArrayItemAtIndex = (arrayRef: Expression, index: number): Expression => {
    return generateExpression('getArrayItemAtIndex', undefined, arrayRef, index);
}

/**
 * Extract value with a specific key
 * @param arrayRef expression that references an array
 * @param itemKey key of the target item
 * @returns
 */
const getArrayItemByKey = (arrayRef: Expression, itemKey: string): Expression => {
    return generateExpression('getArrayItemByKey', undefined, arrayRef, itemKey);
}

/**
 * Extract value with a specific key from the hierarchical tree
 * @param objectRef expression that references the root object
 * @param itemKey key of the target item
 * @returns
 */
const getObjByHierarchicalKey = (objectRef: Expression, itemKey: string): Expression => {
    return generateExpression('getObjByHierarchicalKey', undefined, objectRef, itemKey);
}

/**
 * Extract value with a specific key from the tree
 * @param objectRef expression that references the root object
 * @param itemKey key of the target item
 * @returns
 */
const getNestedObjectByKey = (objectRef: Expression, itemKey: string): Expression => {
    return generateExpression('getNestedObjectByKey', undefined, objectRef, itemKey);
}


/**
 * Retrieve items by the same key from the previous responses arrays
 * @param itemKey key of the target item
 * @returns
 */
const findPreviousSurveyResponsesByKey = (itemKey: string): Expression => {
    return generateExpression('findPreviousSurveyResponsesByKey', undefined, itemKey);
}

/**
 * Retrieve all previous responses for a specific survey key
 * @param surveyKey key of the target survey
 * @returns
 */
const getPreviousResponses = (surveyKey: string): Expression => {
    return generateExpression('getPreviousResponses', undefined, surveyKey);
}

/**
 * Retrieve last item for a specific key from the previous responses arrays
 * @param itemKey key of the target item
 * @returns
 */
const getLastFromSurveyResponses = (itemKey: string): Expression => {
    return generateExpression('getLastFromSurveyResponses', undefined, itemKey);
}


const filterResponsesByIncludesKeys = (responsesRef: Expression, itemKey: string, searchKeys: string): Expression => {
    return generateExpression('filterResponsesByIncludesKeys', undefined, responsesRef, itemKey, ...searchKeys);
}

const filterResponsesByValue = (responsesRef: Expression, itemKey: string, expectedValue: string): Expression => {
    return generateExpression('filterResponsesByValue', undefined, responsesRef, itemKey, expectedValue);
}

/**
 * Given a list of previous responses (list of single responses), retrieve the latest one.
 * @param responsesRef expression that references a list of response items
 * @returns
 */
const getLastFromSurveyItemResponses = (responsesRef: Expression): Expression => {
    return generateExpression('getLastFromSurveyItemResponses', undefined, responsesRef);
}

/**
 * Calculate time difference between "now" and the reference time in seconds
 * @param referenceTime expression that should return a time (in POSIX timestamp form)
 * @returns expression returns undefined if rerefence time is evaluated to undefined
 */
const getSecondsSince = (referenceTime: Expression): Expression => {
    return generateExpression('getSecondsSince', undefined, referenceTime);
}

/**
 * Get response object for a specific item and slot
 * @param itemKey full key of the survey item (e.g. SURVEY.GROUP.QUESTIONKEY)
 * @param responseKey full key of the response slot inside the item (e.g. rg.num)
 * @returns
 */
const getResponseItem = (itemKey: string, responseKey: string): Expression => {
    return generateExpression('getResponseItem', undefined, itemKey, responseKey);
}

/**
 * Check if an item has a specific response object (by key)
 * @param itemKey full key of the survey item (e.g. SURVEY.GROUP.QUESTIONKEY)
 * @param responseKey full key of the response slot inside the item (e.g. rg.num)
 * @returns
 */
const hasResponse = (itemKey: string, responseKey: string): Expression => {
    return generateExpression('hasResponse', undefined, itemKey, responseKey);
}

/**
 * Evaluate if regex expression is fulfilled on the responses value attribute
 * @param itemKey full key of the survey item (e.g. SURVEY.GROUP.QUESTIONKEY)
 * @param responseKey full key of the response slot inside the item (e.g. rg.input)
 * @param regexPattern regex pattern to check value against
 * @returns
 */
const checkResponseValueWithRegex = (itemKey: string, responseKey: string, regexPattern: string): Expression => {
    return generateExpression('checkResponseValueWithRegex', undefined, itemKey, responseKey, regexPattern);
}

/**
 * Check if any of the following options is selected
 * @param itemKey full key of the survey item (e.g. SURVEY.GROUP.QUESTIONKEY)
 * @param responseKey full key of the response slot inside the item (e.g. rg.scg)
 * @param optionKeys keys of the option that should be selected
 * @returns
 */
const responseHasKeysAny = (itemKey: string, responseKey: string, ...optionKeys: string[]): Expression => {
    return generateExpression('responseHasKeysAny', undefined, itemKey, responseKey, ...optionKeys);
}

/**
 * Check if all of the following options are selected
 * @param itemKey full key of the survey item (e.g. SURVEY.GROUP.QUESTIONKEY)
 * @param responseKey full key of the response slot inside the item (e.g. rg.scg)
 * @param optionKeys keys of the option that should be selected
 * @returns
 */
const responseHasKeysAll = (itemKey: string, responseKey: string, ...optionKeys: string[]): Expression => {
    return generateExpression('responseHasKeysAll', undefined, itemKey, responseKey, ...optionKeys);
}

/**
 * Check if only other options were selected
 * @param itemKey full key of the survey item (e.g. SURVEY.GROUP.QUESTIONKEY)
 * @param responseKey full key of the response slot inside the item (e.g. rg.scg)
 * @param optionKeys keys of the option that shouldn't be selected
 * @returns
 */
const responseHasOnlyKeysOtherThan = (itemKey: string, responseKey: string, ...optionKeys: string[]): Expression => {
    return generateExpression('responseHasOnlyKeysOtherThan', undefined, itemKey, responseKey, ...optionKeys);
}

/**
 * To use evaluated validations rules, we can reference them with this method.
 * @param itemKey full key of the survey item (e.g. SURVEY.GROUP.QUESTIONKEY)
 * @param validationKey key of the validation rule
 * @returns
 */
const getSurveyItemValidation = (itemKey: string, validationKey: string): Expression => {
    return generateExpression('getSurveyItemValidation', undefined, itemKey, validationKey);
}

/**
 * Calculate difference of a selected date input and current timestamp with selected unit
 * @param itemKey full key of the survey item (e.g. SURVEY.GROUP.QUESTIONKEY)
 * @param responseKey full key of the response slot inside the item (e.g. rg.input)
 * @param unit in which unit should the difference be returned
 * @param ignoreSign if set to true, sign (+/-) is ignored and the absolute value of the difference is returned
 * @returns
 */
const dateResponseDiffFromNow = (itemKey: string, responseKey: string, unit: 'years' | 'months' | 'days' | 'hours' | 'minutes' | 'seconds', ignoreSign?: boolean): Expression => {
    return generateExpression('dateResponseDiffFromNow', undefined, itemKey, responseKey, unit, ignoreSign ? 1 : undefined);
}

/**
 * Check participant flags object if contains the specified key value pair
 * @param key retrieve participant flag's value for this key
 * @param value string value to be checked for a match
 * @returns
 */
const hasParticipantFlag = (key: string, value: string): Expression => {
    return eq(
        getAttribute(
            getAttribute(
                getContext(),
                'participantFlags'
            ),
            key,
        ),
        value,
    );
}

/**
 * Counts the number of selected options in a multiple choice question
 * @param itemKey full key of the survey item (e.g. SURVEY.GROUP.QUESTIONKEY)
 * @returns
 */
const multipleChoiceSelectionCount = (itemKey: string): Expression => {
    return countResponseItems(itemKey, [responseGroupKey, multipleChoiceKey].join('.'));
}

const getDatePickerResponseValue = (itemKey: string): Expression => {
    return getResponseValueAsNum(itemKey, [responseGroupKey, datePickerKey].join('.'))
}

const singleChoiceOptionsSelected = (itemKey: string, ...optionKeys: string[]) =>
    responseHasKeysAll(itemKey, [responseGroupKey, singleChoiceKey].join('.'), ...optionKeys)

const multipleChoiceOptionsSelected = (itemKey: string, ...optionKeys: string[]) =>
    responseHasKeysAny(itemKey, [responseGroupKey, multipleChoiceKey].join('.'), ...optionKeys)

const multipleChoiceAllOfTheseSelected = (itemKey: string, ...optionKeys: string[]) =>
    responseHasKeysAll(itemKey, [responseGroupKey, multipleChoiceKey].join('.'), ...optionKeys)

const multipleChoiceOnlyOtherKeysSelected = (itemKey: string, ...optionKeys: string[]) =>
    responseHasOnlyKeysOtherThan(itemKey, [responseGroupKey, multipleChoiceKey].join('.'), ...optionKeys)

const singleChoiceOnlyOtherOptionSelected = (itemKey: string, ...optionKeys: string[]) =>
    responseHasOnlyKeysOtherThan(itemKey, [responseGroupKey, singleChoiceKey].join('.'), ...optionKeys)

const singleChoiceGetNumOptionValue = (itemKey: string, optionKey: string): Expression => {
    return getResponseValueAsNum(itemKey, [responseGroupKey, singleChoiceKey, optionKey].join('.'))
}

const multipleChoiceGetNumOptionValue = (itemKey: string, optionKey: string): Expression => {
    return getResponseValueAsNum(itemKey, [responseGroupKey, multipleChoiceKey, optionKey].join('.'))
}

const singleChoiceTextInputRegexCheck = (itemKey: string, optionKey: string, pattern: string): Expression => {
    return checkResponseValueWithRegex(itemKey, [responseGroupKey, singleChoiceKey, optionKey].join('.'), pattern)
}

const mulitpleChoiceTextInputRegexCheck = (itemKey: string, optionKey: string, pattern: string): Expression => {
    return checkResponseValueWithRegex(itemKey, [responseGroupKey, multipleChoiceKey, optionKey].join('.'), pattern)
}

const textInputRegexCheck = (itemKey: string, pattern: string): Expression => {
    return checkResponseValueWithRegex(itemKey, [responseGroupKey, inputKey].join('.'), pattern)
}

const multilineTextInputRegexCheck = (itemKey: string, pattern: string): Expression => {
    return checkResponseValueWithRegex(itemKey, [responseGroupKey, inputKey].join('.'), pattern)
}

export const NativeSurveyEngineExpressions = {
    getters: {
        // root data reference:
        getContext,
        getResponses,
        getRenderedItems,

        // object access:
        getAttribute,
        getArrayItemAtIndex,
        getArrayItemByKey,
        getObjByHierarchicalKey,
        getNestedObjectByKey,
    },
    // query methods for previous names:
    previousResponses: {
        getItemsByKey: findPreviousSurveyResponsesByKey,
        getLastItemByKey: getLastFromSurveyResponses,
        getAllResponsesForSurveyKey: getPreviousResponses,
        filterResponsesByIncludesKeys,
        filterResponsesByValue,
        getLastFromSurveyItemResponses,
    },

    // client side shortcut methods:
    isDefined,
    hasResponse,
    getResponseItem,
    getResponseValueAsNum,
    getResponseValueAsStr,
    checkResponseValueWithRegex,
    responseHasKeysAny,
    responseHasKeysAll,
    responseHasOnlyKeysOtherThan,
    getSurveyItemValidation,
    dateResponseDiffFromNow,
    countResponseItems,
    compare: {
        eq,
        lt,
        lte,
        gt,
        gte,
    },
    logic: {
        or,
        and,
        not,
    },

    // Other
    getSecondsSince,
    timestampWithOffset,
}

export const SurveyEngine = {
    ...NativeSurveyEngineExpressions,
    singleChoice: {
        any: singleChoiceOptionsSelected,
        none: singleChoiceOnlyOtherOptionSelected,
        getDateValue: singleChoiceGetNumOptionValue,
        getNumValue: singleChoiceGetNumOptionValue,
        regexCheck: singleChoiceTextInputRegexCheck,
    },
    multipleChoice: {
        any: multipleChoiceOptionsSelected,
        none: multipleChoiceOnlyOtherKeysSelected,
        all: multipleChoiceAllOfTheseSelected,
        selectionCount: multipleChoiceSelectionCount,
        getDateValue: multipleChoiceGetNumOptionValue,
        getNumValue: multipleChoiceGetNumOptionValue,
        regexCheck: mulitpleChoiceTextInputRegexCheck,
    },
    textInput: {
        regexCheck: textInputRegexCheck,
    },
    multilineTextInput: {
        regexCheck: multilineTextInputRegexCheck,
    },
    datePicker: {
        get: getDatePickerResponseValue,
    },
    hasParticipantFlag,
}
