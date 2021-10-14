import { Expression } from "../types/expression"
import { multipleChoiceKey, responseGroupKey, singleChoiceKey } from "../constants/key-definitions"
import { Duration, durationObjectToSeconds } from "./duration"
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
const timestampWithOffset = (delta: Duration, reference?: number | Expression) => generateExpression(
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
const getAttribute = (objectRef: string, attributeName: string): Expression => {
    return generateExpression('getAttribute', undefined, objectRef, attributeName);
}

/**
 * Extract value at index
 * @param arrayRef expression that references an array
 * @param index position in the array
 * @returns
 */
const getArrayItemAtIndex = (arrayRef: string, index: number): Expression => {
    return generateExpression('getArrayItemAtIndex', undefined, arrayRef, index);
}

/**
 * Extract value with a specific key
 * @param arrayRef expression that references an array
 * @param itemKey key of the target item
 * @returns
 */
const getArrayItemByKey = (arrayRef: string, itemKey: string): Expression => {
    return generateExpression('getArrayItemByKey', undefined, arrayRef, itemKey);
}

/**
 * Extract value with a specific key from the hierarchical tree
 * @param objectRef expression that references the root object
 * @param itemKey key of the target item
 * @returns
 */
const getObjByHierarchicalKey = (objectRef: string, itemKey: string): Expression => {
    return generateExpression('getObjByHierarchicalKey', undefined, objectRef, itemKey);
}

/**
 * Extract value with a specific key from the tree
 * @param objectRef expression that references the root object
 * @param itemKey key of the target item
 * @returns
 */
const getNestedObjectByKey = (objectRef: string, itemKey: string): Expression => {
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
 * Counts the number of selected options in a multiple choice question
 * @param itemKey full key of the survey item (e.g. SURVEY.GROUP.QUESTIONKEY)
 * @returns
 */
const multipleChoiceSelectionCount = (itemKey: string): Expression => {
    return countResponseItems(itemKey, [responseGroupKey, multipleChoiceKey].join('.'));
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
    }
    getSecondsSince,

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


    // logical and comparision
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
    timestampWithOffset,
}

export const SurveyEngine = {
    ...NativeSurveyEngineExpressions,
    singleChoice: {
        any: singleChoiceOptionsSelected,
        none: singleChoiceOnlyOtherOptionSelected,
        getDateValue: singleChoiceGetDateOptionValue,
        getNumValue: singleChoiceGetNumOptionValue,
    },
    multipleChoice: {
        any: multipleChoiceOptionsSelected,
        none: multipleChoiceOnlyOtherKeysSelected,
        all: multipleChoiceAllOfTheseSelected,
        selectionCount: multipleChoiceSelectionCount,
        getDateValue: multipleChoiceGetDateOptionValue,
        getNumValue: multipleChoiceGetNumOptionValue,
    },
    datePicker: {
        get: getDatePickerResponseValue,
    }
    hasParticipantFlag,
}
