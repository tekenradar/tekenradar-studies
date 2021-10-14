import { ItemGroupComponent, Expression, ComponentProperties, LocalizedObject, ItemComponent, SurveyItem, ExpressionArg, Validation } from "survey-engine/lib/data_types";
import { ComponentEditor } from "../survey-editor/component-editor";
import { ItemEditor } from "../survey-editor/item-editor";
import { CommonExpressions } from "./commonExpressions";
import { ComponentGenerators } from "./componentGenerators";
import { Duration, durationObjectToSeconds } from "./duration";
import { datePickerKey, dropDownKey, inputKey, likertScaleGroupKey, multipleChoiceKey, numericInputKey, responseGroupKey, responsiveBipolarLikertArrayKey, responsiveSingleChoiceArrayKey, singleChoiceKey } from "../constants/key-definitions";
import { generateRandomKey } from "./randomKeyGenerator";
import { expWithArgs, generateHelpGroupComponent, generateLocStrings, generateTitleComponent } from "./simple-generators";
import { SimpleQuestionEditor } from "./simple-question-editor";


export interface OptionDef {
    key: string;
    role: string;
    content?: Map<string, string>;
    items?: Array<StyledTextComponentProp>;
    description?: Map<string, string>;
    displayCondition?: Expression;
    disabled?: Expression;
    style?: Array<{ key: string, value: string }>;
    optionProps?: ComponentProperties;
}

export interface StyledTextComponentProp {
    content: Map<string, string>;
    className?: string;
}

interface GenericQuestionProps {
    parentKey: string;
    itemKey: string;
    version?: number;
    questionText: Map<string, string> | Array<StyledTextComponentProp>;
    questionSubText?: Map<string, string>;
    titleClassName?: string;
    helpGroupContent?: Array<{
        content: Map<string, string>,
        style?: Array<{ key: string, value: string }>,
    }>;
    condition?: Expression;
    topDisplayCompoments?: Array<ItemComponent>;
    bottomDisplayCompoments?: Array<ItemComponent>;
    isRequired?: boolean;
    footnoteText?: Map<string, string>;
    customValidations?: Array<Validation>;
}

interface NumericInputQuestionProps extends GenericQuestionProps {
    content: Map<string, string>;
    contentBehindInput?: boolean;
    componentProperties?: ComponentProperties;
    inputMaxWidth?: string;
}

interface OptionQuestionProps extends GenericQuestionProps {
    responseOptions: Array<OptionDef>;
}

interface LikertGroupQuestionProps extends GenericQuestionProps {
    rows: Array<LikertGroupRow>,
    scaleOptions: Array<{
        key: string;
        className?: string;
        content: Map<string, string>;
    }>,
    stackOnSmallScreen?: boolean;
}

type ResponsiveSingleChoiceArrayVariant = 'horizontal' | 'vertical' | 'table';
type ResponsiveBipolarLikertArrayVariant = 'withLabelRow' | 'vertical' | 'table';

interface ResponsiveSingleChoiceArrayProps {
    scaleOptions: Array<{
        key: string;
        className?: string;
        content: Map<string, string> | StyledTextComponentProp[];
    }>,
    rows: Array<{
        key: string;
        content: Map<string, string> | StyledTextComponentProp[];
        horizontalModeProps?: {
            labelPlacement?: 'none' | 'top' | 'bottom';
            className?: string;
        },
        verticalModeProps?: {
            className?: string;
        }
        tableModeProps?: {
            className?: string;
        }
    }>,
    defaultMode: ResponsiveSingleChoiceArrayVariant;
    responsiveModes?: {
        sm?: ResponsiveSingleChoiceArrayVariant;
        md?: ResponsiveSingleChoiceArrayVariant;
        lg?: ResponsiveSingleChoiceArrayVariant;
        xl?: ResponsiveSingleChoiceArrayVariant;
        xxl?: ResponsiveSingleChoiceArrayVariant;
    },
    rgClassName?: string;
    tableModeProps?: {
        className?: string;
        layout?: "fixed";
        firstColWidth?: string;
        optionHeaderClassName?: string;
        hideRowBorder?: boolean;
    },
    horizontalModeProps?: {
        hideRowBorder?: boolean;
    },
    verticalModeProps?: {
        hideRowBorder?: boolean;
        useReverseOptionOrder?: boolean;
    }
}

interface ResponsiveBipolarLikertArrayProps {
    scaleOptions: Array<{
        key: string;
    }>,
    rows: Array<{
        key: string;
        startLabel: Map<string, string> | StyledTextComponentProp[];
        endLabel: Map<string, string> | StyledTextComponentProp[];
        withLabelRowModeProps?: {
            className?: string;
        },
        verticalModeProps?: {
            className?: string;
        }
        tableModeProps?: {
            className?: string;
        }
    }>,
    defaultMode: ResponsiveBipolarLikertArrayVariant;
    responsiveModes?: {
        sm?: ResponsiveBipolarLikertArrayVariant;
        md?: ResponsiveBipolarLikertArrayVariant;
        lg?: ResponsiveBipolarLikertArrayVariant;
        xl?: ResponsiveBipolarLikertArrayVariant;
        xxl?: ResponsiveBipolarLikertArrayVariant;
    },
    rgClassName?: string;
    tableModeProps?: {
        className?: string;
        layout?: "fixed";
        labelColWidth?: string;
        hideRowBorder?: boolean;
    },
    withLabelRowModeProps?: {
        hideRowBorder?: boolean;
        maxLabelWidth?: string;
        useBottomLabel?: boolean;
    },
    verticalModeProps?: {
        hideRowBorder?: boolean;
    }
}

interface ResponsiveSingleChoiceArrayQuestionProps extends GenericQuestionProps, ResponsiveSingleChoiceArrayProps { }

interface ResponsiveBipolarLikertArrayQuestionProps extends GenericQuestionProps, ResponsiveBipolarLikertArrayProps { }

const generateNumericInputQuestion = (props: NumericInputQuestionProps): SurveyItem => {
    const simpleEditor = new SimpleQuestionEditor(props.parentKey, props.itemKey, props.version ? props.version : 1);

    // QUESTION TEXT
    simpleEditor.setTitle(props.questionText, props.questionSubText, props.titleClassName);

    if (props.condition) {
        simpleEditor.setCondition(props.condition);
    }

    if (props.helpGroupContent) {
        simpleEditor.editor.setHelpGroupComponent(
            generateHelpGroupComponent(props.helpGroupContent)
        )
    }

    if (props.topDisplayCompoments) {
        props.topDisplayCompoments.forEach(comp => simpleEditor.addDisplayComponent(comp))
    }

    const style: Array<{ key: string, value: string }> = [];

    if (props.inputMaxWidth) {
        style.push({
            key: 'inputMaxWidth', value: props.inputMaxWidth,
        })
    }
    if (props.contentBehindInput) {
        style.push({ key: 'labelPlacement', value: 'after' });
    }


    const rg_inner: ItemComponent = {
        key: numericInputKey,
        role: 'numberInput',
        properties: {
            min: props.componentProperties?.min !== undefined ? (typeof (props.componentProperties.min) === 'number' ? { dtype: 'num', num: props.componentProperties.min } : props.componentProperties.min) : undefined,
            max: props.componentProperties?.max !== undefined ? (typeof (props.componentProperties?.max) === 'number' ? { dtype: 'num', num: props.componentProperties.max } : props.componentProperties.max) : undefined,
            stepSize: props.componentProperties?.stepSize ? (typeof (props.componentProperties.stepSize) === 'number' ? { dtype: 'num', num: props.componentProperties.stepSize } : props.componentProperties.stepSize) : undefined,
        },
        content: generateLocStrings(props.content),
        style: style.length > 0 ? style : undefined,
    };
    simpleEditor.setResponseGroupWithContent(rg_inner);

    if (props.bottomDisplayCompoments) {
        props.bottomDisplayCompoments.forEach(comp => simpleEditor.addDisplayComponent(comp))
    }

    if (props.isRequired) {
        simpleEditor.addHasResponseValidation();
    }

    if (props.customValidations) {
        props.customValidations.forEach(v => simpleEditor.editor.addValidation(v));
    }

    if (props.footnoteText) {
        simpleEditor.addDisplayComponent({
            role: 'footnote', content: generateLocStrings(props.footnoteText), style: [
                { key: 'className', value: 'fs-small fst-italic text-center' }
            ]
        })
    }

    return simpleEditor.getItem();
}

const generateSingleChoiceQuestion = (props: OptionQuestionProps): SurveyItem => {
    const simpleEditor = new SimpleQuestionEditor(props.parentKey, props.itemKey, props.version ? props.version : 1);

    // QUESTION TEXT
    simpleEditor.setTitle(props.questionText, props.questionSubText, props.titleClassName);

    if (props.condition) {
        simpleEditor.setCondition(props.condition);
    }

    if (props.helpGroupContent) {
        simpleEditor.editor.setHelpGroupComponent(
            generateHelpGroupComponent(props.helpGroupContent)
        )
    }

    if (props.topDisplayCompoments) {
        props.topDisplayCompoments.forEach(comp => simpleEditor.addDisplayComponent(comp))
    }

    const rg_inner = initSingleChoiceGroup(singleChoiceKey, props.responseOptions);
    simpleEditor.setResponseGroupWithContent(rg_inner);

    if (props.bottomDisplayCompoments) {
        props.bottomDisplayCompoments.forEach(comp => simpleEditor.addDisplayComponent(comp))
    }

    if (props.isRequired) {
        simpleEditor.addHasResponseValidation();
    }

    if (props.customValidations) {
        props.customValidations.forEach(v => simpleEditor.editor.addValidation(v));
    }

    if (props.footnoteText) {
        simpleEditor.addDisplayComponent({
            role: 'footnote', content: generateLocStrings(props.footnoteText), style: [
                { key: 'className', value: 'fs-small fst-italic text-center' }
            ]
        })
    }

    return simpleEditor.getItem();
}

const generateDropDownQuestion = (props: OptionQuestionProps): SurveyItem => {
    const simpleEditor = new SimpleQuestionEditor(props.parentKey, props.itemKey, props.version ? props.version : 1);

    // QUESTION TEXT
    simpleEditor.setTitle(props.questionText, props.questionSubText, props.titleClassName);

    if (props.condition) {
        simpleEditor.setCondition(props.condition);
    }

    if (props.helpGroupContent) {
        simpleEditor.editor.setHelpGroupComponent(
            generateHelpGroupComponent(props.helpGroupContent)
        )
    }

    if (props.topDisplayCompoments) {
        props.topDisplayCompoments.forEach(comp => simpleEditor.addDisplayComponent(comp))
    }

    const rg_inner = initDropdownGroup(dropDownKey, props.responseOptions);
    simpleEditor.setResponseGroupWithContent(rg_inner);

    if (props.bottomDisplayCompoments) {
        props.bottomDisplayCompoments.forEach(comp => simpleEditor.addDisplayComponent(comp))
    }

    if (props.isRequired) {
        simpleEditor.addHasResponseValidation();
    }

    if (props.footnoteText) {
        simpleEditor.addDisplayComponent({
            role: 'footnote', content: generateLocStrings(props.footnoteText), style: [
                { key: 'className', value: 'fs-small fst-italic text-center' }
            ]
        })
    }

    return simpleEditor.getItem();
}


const generateMultipleChoiceQuestion = (props: OptionQuestionProps): SurveyItem => {
    const simpleEditor = new SimpleQuestionEditor(props.parentKey, props.itemKey, props.version ? props.version : 1);

    // QUESTION TEXT
    simpleEditor.setTitle(props.questionText, props.questionSubText, props.titleClassName);

    if (props.condition) {
        simpleEditor.setCondition(props.condition);
    }

    if (props.helpGroupContent) {
        simpleEditor.editor.setHelpGroupComponent(
            generateHelpGroupComponent(props.helpGroupContent)
        )
    }

    if (props.topDisplayCompoments) {
        props.topDisplayCompoments.forEach(comp => simpleEditor.addDisplayComponent(comp))
    }

    const rg_inner = initMultipleChoiceGroup(multipleChoiceKey, props.responseOptions);
    simpleEditor.setResponseGroupWithContent(rg_inner);

    if (props.bottomDisplayCompoments) {
        props.bottomDisplayCompoments.forEach(comp => simpleEditor.addDisplayComponent(comp))
    }

    if (props.isRequired) {
        simpleEditor.addHasResponseValidation();
    }

    if (props.customValidations) {
        props.customValidations.forEach(v => simpleEditor.editor.addValidation(v));
    }

    if (props.footnoteText) {
        simpleEditor.addDisplayComponent({
            role: 'footnote', content: generateLocStrings(props.footnoteText), style: [
                { key: 'className', value: 'fs-small fst-italic text-center' }
            ]
        })
    }

    return simpleEditor.getItem();
}

const generateSimpleLikertGroupQuestion = (props: LikertGroupQuestionProps): SurveyItem => {
    const simpleEditor = new SimpleQuestionEditor(props.parentKey, props.itemKey, props.version ? props.version : 1);

    // QUESTION TEXT
    simpleEditor.setTitle(props.questionText, props.questionSubText, props.titleClassName);

    if (props.condition) {
        simpleEditor.setCondition(props.condition);
    }

    if (props.helpGroupContent) {
        simpleEditor.editor.setHelpGroupComponent(
            generateHelpGroupComponent(props.helpGroupContent)
        )
    }

    if (props.topDisplayCompoments) {
        props.topDisplayCompoments.forEach(comp => simpleEditor.addDisplayComponent(comp))
    }

    const rg_inner = initLikertScaleGroup(
        likertScaleGroupKey,
        props.rows,
        props.scaleOptions,
        props.stackOnSmallScreen,
    );
    simpleEditor.setResponseGroupWithContent(rg_inner);

    if (props.bottomDisplayCompoments) {
        props.bottomDisplayCompoments.forEach(comp => simpleEditor.addDisplayComponent(comp))
    }

    if (props.isRequired) {
        simpleEditor.editor.addValidation({
            key: 'r',
            type: 'hard',
            rule: expWithArgs('and',
                ...props.rows.map(r => expWithArgs(
                    'responseHasKeysAny',
                    [props.parentKey, props.itemKey].join('.'),
                    [responseGroupKey, likertScaleGroupKey, r.key].join('.'),
                    ...props.scaleOptions.map(o => o.key)
                ))
            )
        })
        simpleEditor.addHasResponseValidation();
    }

    if (props.footnoteText) {
        simpleEditor.addDisplayComponent({
            role: 'footnote', content: generateLocStrings(props.footnoteText), style: [
                { key: 'className', value: 'fs-small fst-italic text-center' }
            ]
        })
    }

    return simpleEditor.getItem();
}

const generateResponsiveSingleChoiceArrayQuestion = (props: ResponsiveSingleChoiceArrayQuestionProps): SurveyItem => {
    const simpleEditor = new SimpleQuestionEditor(props.parentKey, props.itemKey, props.version ? props.version : 1);

    // QUESTION TEXT
    simpleEditor.setTitle(props.questionText, props.questionSubText, props.titleClassName);

    if (props.condition) {
        simpleEditor.setCondition(props.condition);
    }

    if (props.helpGroupContent) {
        simpleEditor.editor.setHelpGroupComponent(
            generateHelpGroupComponent(props.helpGroupContent)
        )
    }

    if (props.topDisplayCompoments) {
        props.topDisplayCompoments.forEach(comp => simpleEditor.addDisplayComponent(comp))
    }

    const rg_inner = initResponsiveSingleChoiceArray(
        responsiveSingleChoiceArrayKey,
        {
            ...props,
        },
    );
    simpleEditor.setResponseGroupWithContent(rg_inner);

    if (props.bottomDisplayCompoments) {
        props.bottomDisplayCompoments.forEach(comp => simpleEditor.addDisplayComponent(comp))
    }

    if (props.isRequired) {
        simpleEditor.editor.addValidation({
            key: 'r',
            type: 'hard',
            rule: expWithArgs('and',
                ...props.rows.map(r => expWithArgs(
                    'responseHasKeysAny',
                    [props.parentKey, props.itemKey].join('.'),
                    [responseGroupKey, responsiveSingleChoiceArrayKey, r.key].join('.'),
                    ...props.scaleOptions.map(o => o.key)
                ))
            )
        })
        simpleEditor.addHasResponseValidation();
    }

    if (props.footnoteText) {
        simpleEditor.addDisplayComponent({
            role: 'footnote', content: generateLocStrings(props.footnoteText), style: [
                { key: 'className', value: 'fs-small fst-italic text-center' }
            ]
        })
    }

    return simpleEditor.getItem();
}

const generateResponsiveBipolarLikertArray = (props: ResponsiveBipolarLikertArrayQuestionProps): SurveyItem => {
    const simpleEditor = new SimpleQuestionEditor(props.parentKey, props.itemKey, props.version ? props.version : 1);

    // QUESTION TEXT
    simpleEditor.setTitle(props.questionText, props.questionSubText, props.titleClassName);

    if (props.condition) {
        simpleEditor.setCondition(props.condition);
    }

    if (props.helpGroupContent) {
        simpleEditor.editor.setHelpGroupComponent(
            generateHelpGroupComponent(props.helpGroupContent)
        )
    }

    if (props.topDisplayCompoments) {
        props.topDisplayCompoments.forEach(comp => simpleEditor.addDisplayComponent(comp))
    }

    const rg_inner = initResponsiveBipolarLikertArray(
        responsiveBipolarLikertArrayKey,
        {
            ...props,
        },
    );
    simpleEditor.setResponseGroupWithContent(rg_inner);

    if (props.bottomDisplayCompoments) {
        props.bottomDisplayCompoments.forEach(comp => simpleEditor.addDisplayComponent(comp))
    }

    if (props.isRequired) {
        simpleEditor.editor.addValidation({
            key: 'r',
            type: 'hard',
            rule: expWithArgs('and',
                ...props.rows.map(r => expWithArgs(
                    'responseHasKeysAny',
                    [props.parentKey, props.itemKey].join('.'),
                    [responseGroupKey, responsiveBipolarLikertArrayKey, r.key].join('.'),
                    ...props.scaleOptions.map(o => o.key)
                ))
            )
        })
        simpleEditor.addHasResponseValidation();
    }

    if (props.footnoteText) {
        simpleEditor.addDisplayComponent({
            role: 'footnote', content: generateLocStrings(props.footnoteText), style: [
                { key: 'className', value: 'fs-small fst-italic text-center' }
            ]
        })
    }

    return simpleEditor.getItem();
}

interface NumericSliderProps extends GenericQuestionProps {
    sliderLabel: Map<string, string>;
    noResponseLabel: Map<string, string>;
    min?: number | ExpressionArg;
    max?: number | ExpressionArg;
    stepSize?: number | ExpressionArg;
}

const generateNumericSliderQuestion = (props: NumericSliderProps): SurveyItem => {
    const simpleEditor = new SimpleQuestionEditor(props.parentKey, props.itemKey, props.version ? props.version : 1);

    // QUESTION TEXT
    simpleEditor.setTitle(props.questionText, props.questionSubText, props.titleClassName);

    if (props.condition) {
        simpleEditor.setCondition(props.condition);
    }

    if (props.helpGroupContent) {
        simpleEditor.editor.setHelpGroupComponent(
            generateHelpGroupComponent(props.helpGroupContent)
        )
    }

    if (props.topDisplayCompoments) {
        props.topDisplayCompoments.forEach(comp => simpleEditor.addDisplayComponent(comp))
    }

    const rg_inner: ItemComponent = {
        key: 'slider', role: 'sliderNumeric',
        content: generateLocStrings(props.sliderLabel),
        description: generateLocStrings(props.noResponseLabel),
        properties: {
            min: props.min !== undefined ? (typeof (props.min) === 'number' ? { dtype: 'num', num: props.min } : props.min) : undefined,
            max: props.max !== undefined ? (typeof (props.max) === 'number' ? { dtype: 'num', num: props.max } : props.max) : undefined,
            stepSize: props.stepSize ? (typeof (props.stepSize) === 'number' ? { dtype: 'num', num: props.stepSize } : props.stepSize) : undefined,
        }
    }
    simpleEditor.setResponseGroupWithContent(rg_inner);

    if (props.bottomDisplayCompoments) {
        props.bottomDisplayCompoments.forEach(comp => simpleEditor.addDisplayComponent(comp))
    }

    if (props.isRequired) {
        simpleEditor.addHasResponseValidation();
    }

    if (props.footnoteText) {
        simpleEditor.addDisplayComponent(ComponentGenerators.footnote({ content: props.footnoteText }))
    }

    return simpleEditor.getItem();
}



interface DatePickerInput extends GenericQuestionProps {
    dateInputMode: 'YMD' | 'YM' | 'Y';
    inputLabelText?: Map<string, string>;
    placeholderText?: Map<string, string>;
    minRelativeDate?: {
        reference?: number | Expression;
        delta: Duration;
    };
    maxRelativeDate?: {
        reference?: number | Expression;
        delta: Duration;
    };
}

interface MultiLineTextInput extends GenericQuestionProps {
    inputLabelText?: Map<string, string>;
    placeholderText?: Map<string, string>;
}

const generateDatePickerInput = (props: DatePickerInput): SurveyItem => {
    const simpleEditor = new SimpleQuestionEditor(props.parentKey, props.itemKey, props.version ? props.version : 1);

    // QUESTION TEXT
    simpleEditor.setTitle(props.questionText, props.questionSubText, props.titleClassName);

    if (props.condition) {
        simpleEditor.setCondition(props.condition);
    }

    if (props.helpGroupContent) {
        simpleEditor.editor.setHelpGroupComponent(
            generateHelpGroupComponent(props.helpGroupContent)
        )
    }

    if (props.topDisplayCompoments) {
        props.topDisplayCompoments.forEach(comp => simpleEditor.addDisplayComponent(comp))
    }

    const rg_inner: ItemComponent = {
        key: datePickerKey, role: 'dateInput',
        properties: {
            dateInputMode: { str: props.dateInputMode },
            min: props.minRelativeDate ? {
                dtype: 'exp', exp: CommonExpressions.timestampWithOffset(
                    props.minRelativeDate.delta,
                    props.minRelativeDate.reference
                )
            } : undefined,
            max: props.maxRelativeDate ? {
                dtype: 'exp', exp:
                    expWithArgs(
                        'timestampWithOffset',
                        durationObjectToSeconds(props.maxRelativeDate.delta),
                        props.maxRelativeDate.reference ? props.maxRelativeDate.reference : undefined
                    )
            } : undefined,
        },
        content: props.inputLabelText ? generateLocStrings(props.inputLabelText) : undefined,
        description: props.placeholderText ? generateLocStrings(props.placeholderText) : undefined,
    };
    simpleEditor.setResponseGroupWithContent(rg_inner);

    if (props.bottomDisplayCompoments) {
        props.bottomDisplayCompoments.forEach(comp => simpleEditor.addDisplayComponent(comp))
    }

    if (props.isRequired) {
        simpleEditor.addHasResponseValidation();
    }

    if (props.footnoteText) {
        simpleEditor.addDisplayComponent(ComponentGenerators.footnote({ content: props.footnoteText }))
    }

    return simpleEditor.getItem();
}

const generateMultilineInput = (props: MultiLineTextInput): SurveyItem => {
    const simpleEditor = new SimpleQuestionEditor(props.parentKey, props.itemKey, props.version ? props.version : 1);

    // QUESTION TEXT
    simpleEditor.setTitle(props.questionText, props.questionSubText, props.titleClassName);

    if (props.condition) {
        simpleEditor.setCondition(props.condition);
    }

    if (props.helpGroupContent) {
        simpleEditor.editor.setHelpGroupComponent(
            generateHelpGroupComponent(props.helpGroupContent)
        )
    }

    if (props.topDisplayCompoments) {
        props.topDisplayCompoments.forEach(comp => simpleEditor.addDisplayComponent(comp))
    }

    const rg_inner: ItemComponent = {
        key: inputKey, role: 'multilineTextInput',
        content: props.inputLabelText ? generateLocStrings(props.inputLabelText) : undefined,
        description: props.placeholderText ? generateLocStrings(props.placeholderText) : undefined,
    };
    simpleEditor.setResponseGroupWithContent(rg_inner);

    if (props.bottomDisplayCompoments) {
        props.bottomDisplayCompoments.forEach(comp => simpleEditor.addDisplayComponent(comp))
    }

    if (props.isRequired) {
        simpleEditor.addHasResponseValidation();
    }

    if (props.footnoteText) {
        simpleEditor.addDisplayComponent(ComponentGenerators.footnote({ content: props.footnoteText }))
    }

    return simpleEditor.getItem();
}


interface DisplayProps {
    parentKey: string;
    itemKey: string;
    content: Array<ItemComponent>;
    condition?: Expression;
}

const generateDisplay = (props: DisplayProps): SurveyItem => {
    const simpleEditor = new SimpleQuestionEditor(props.parentKey, props.itemKey, 1);
    props.content.forEach(item => simpleEditor.addDisplayComponent(item))
    if (props.condition) {
        simpleEditor.setCondition(props.condition);
    }
    return simpleEditor.getItem();
}

const generateSurveyEnd = (parentKey: string, content: Map<string, string>, condition?: Expression): SurveyItem => {
    const defaultKey = 'surveyEnd'
    const itemKey = [parentKey, defaultKey].join('.');
    const editor = new ItemEditor(undefined, { itemKey: itemKey, type: 'surveyEnd', isGroup: false });

    editor.setTitleComponent(
        generateTitleComponent(content)
    );

    // CONDITION
    editor.setCondition(condition);

    return editor.getItem();
}

export const SurveyItemGenerators = {
    singleChoice: generateSingleChoiceQuestion,
    responsiveSingleChoiceArray: generateResponsiveSingleChoiceArrayQuestion,
    responsiveBipolarLikertArray: generateResponsiveBipolarLikertArray,
    multipleChoice: generateMultipleChoiceQuestion,
    simpleLikertGroup: generateSimpleLikertGroupQuestion,
    dateInput: generateDatePickerInput,
    multilineTextInput: generateMultilineInput,
    dropDown: generateDropDownQuestion,
    numericSlider: generateNumericSliderQuestion,
    numericInput: generateNumericInputQuestion,
    display: generateDisplay,
    surveyEnd: generateSurveyEnd,
}


export const initSingleChoiceGroup = (
    key: string,
    optionItems: OptionDef[],
    order?: Expression
): ItemGroupComponent => {
    // init group
    return initResponseGroup('singleChoiceGroup', key, optionItems, order);
}

export const initMultipleChoiceGroup = (
    key: string,
    optionItems: OptionDef[],
    order?: Expression
): ItemGroupComponent => {
    // init group
    return initResponseGroup('multipleChoiceGroup', key, optionItems, order);
}

export const initDropdownGroup = (
    key: string,
    optionItems: OptionDef[],
    order?: Expression,
    groupDisabled?: Expression,
    groupContent?: Map<string, string>,
    groupDescription?: Map<string, string>,
): ItemGroupComponent => {
    // init group
    return initResponseGroup('dropDownGroup', key, optionItems, order, groupDisabled,
        groupContent ? generateLocStrings(groupContent) : undefined,
        groupDescription ? generateLocStrings(groupDescription) : undefined,
    );
}

export const initSliderCategoricalGroup = (
    key: string,
    optionItems: OptionDef[],
    order?: Expression,
    groupDisabled?: Expression,
): ItemGroupComponent => {
    // init group
    return initResponseGroup('sliderCategorical', key, optionItems, order, groupDisabled);
}

const initResponseGroup = (
    type: 'singleChoiceGroup' | 'multipleChoiceGroup' | 'dropDownGroup' | 'sliderCategorical',
    key: string,
    optionItems: OptionDef[],
    order?: Expression,
    groupDisabled?: Expression,
    groupContent?: LocalizedObject[],
    groupDescription?: LocalizedObject[],
): ItemGroupComponent => {
    // init group
    const groupEdit = new ComponentEditor(undefined, {
        key: key,
        isGroup: true,
        role: type,
    });

    groupEdit.setOrder(
        order ? order : {
            name: 'sequential'
        }
    );
    if (groupDisabled) {
        groupEdit.setDisabled(groupDisabled);
    }
    if (groupContent) {
        groupEdit.setContent(groupContent);
    }
    if (groupDescription) {
        groupEdit.setDescription(groupDescription);
    }

    // add option items
    optionItems.forEach(optionDef => {
        const optEditor = new ComponentEditor(undefined, {
            key: optionDef.key,
            role: optionDef.role,
        });
        if (optionDef.content) {
            optEditor.setContent(generateLocStrings(optionDef.content));
        }
        if (optionDef.description) {
            optEditor.setDescription(generateLocStrings(optionDef.description));
        }
        if (optionDef.items) {
            optionDef.items.forEach((item, index) => {
                optEditor.addItemComponent({
                    key: index.toFixed(),
                    role: 'text',
                    content: generateLocStrings(item.content),
                    style: item.className ? [{ key: 'className', value: item.className }] : undefined
                });
            })
        }

        switch (optionDef.role) {
            case 'date':
                optEditor.setDType('date');
                break;
            case 'numberInput':
                optEditor.setDType('number');
                break;
        }

        if (optionDef.displayCondition) {
            optEditor.setDisplayCondition(optionDef.displayCondition);
        }
        if (optionDef.disabled) {
            optEditor.setDisabled(optionDef.disabled);
        }
        if (optionDef.style) {
            optEditor.setStyles(optionDef.style);
        }
        if (optionDef.optionProps) {
            if (typeof (optionDef.optionProps.min) === 'number') {
                optionDef.optionProps.min = { dtype: 'num', num: optionDef.optionProps.min }
            }
            if (typeof (optionDef.optionProps.max) === 'number') {
                optionDef.optionProps.max = { dtype: 'num', num: optionDef.optionProps.max }
            }
            if (typeof (optionDef.optionProps.stepSize) === 'number') {
                optionDef.optionProps.stepSize = { dtype: 'num', num: optionDef.optionProps.stepSize }
            }
            optEditor.setProperties(optionDef.optionProps);
        }
        groupEdit.addItemComponent(optEditor.getComponent());
    });
    return groupEdit.getComponent() as ItemGroupComponent;
}

interface HeaderRow {
    role: 'headerRow',
    key: string;
    displayCondition?: Expression;
    disabled?: Expression;
    cells: Array<{
        role: 'text',
        key: string,
        content?: Map<string, string>,
        description?: Map<string, string>,
    }>
}
interface RadioRow {
    role: 'radioRow',
    key: string;
    displayCondition?: Expression;
    disabled?: Expression;
    cells: Array<{
        role: 'label' | 'option',
        key: string,
        content?: Map<string, string>,
        description?: Map<string, string>,
    }>

}

export interface ResponseRowCell {
    role: 'label' | 'check' | 'input' | 'numberInput' | 'dropDownGroup',
    key: string,
    content?: Map<string, string>,
    description?: Map<string, string>,
    properties?: ComponentProperties;
    // for dropdown group
    items?: Array<{
        role: 'option',
        key: string,
        content?: Map<string, string>,
        disabled?: Expression;
        displayCondition?: Expression;
    }>
}


interface ResponseRow {
    role: 'responseRow',
    key: string;
    displayCondition?: Expression;
    disabled?: Expression;
    cells: Array<ResponseRowCell>
}

type MatrixRow = HeaderRow | RadioRow | ResponseRow;

export const initMatrixQuestion = (
    key: string,
    rows: Array<MatrixRow>,
    order?: Expression,
): ItemGroupComponent => {
    // init group
    const groupEdit = new ComponentEditor(undefined, {
        key: key,
        isGroup: true,
        role: 'matrix',
    });

    groupEdit.setOrder(
        order ? order : {
            name: 'sequential'
        }
    );

    // init rows
    rows.forEach(rowDef => {
        const rowEditor = new ComponentEditor(undefined, {
            key: rowDef.key,
            role: rowDef.role,
        });

        if (rowDef.displayCondition) {
            rowEditor.setDisplayCondition(rowDef.displayCondition);
        }
        if (rowDef.disabled) {
            rowEditor.setDisabled(rowDef.disabled);
        }

        switch (rowDef.role) {
            case 'headerRow':
                rowDef.cells.forEach(cell => {
                    const cellEditor = new ComponentEditor(undefined, {
                        key: cell.key,
                        role: cell.role,
                    });
                    if (cell.content) {
                        cellEditor.setContent(generateLocStrings(cell.content));
                    }

                    if (cell.description) {
                        cellEditor.setDescription(generateLocStrings(cell.description));
                    }
                    rowEditor.addItemComponent(cellEditor.getComponent());
                });
                break;
            case 'radioRow':
                rowDef.cells.forEach(cell => {
                    const cellEditor = new ComponentEditor(undefined, {
                        key: cell.key,
                        role: cell.role,
                    });
                    if (cell.content) {
                        cellEditor.setContent(generateLocStrings(cell.content));
                    }

                    if (cell.description) {
                        cellEditor.setDescription(generateLocStrings(cell.description));
                    }
                    rowEditor.addItemComponent(cellEditor.getComponent());
                });
                break;
            case 'responseRow':
                rowDef.cells.forEach(cell => {
                    const cellEditor = new ComponentEditor(undefined, {
                        key: cell.key,
                        role: cell.role,
                    });
                    if (cell.content) {
                        cellEditor.setContent(generateLocStrings(cell.content));
                    }
                    if (cell.description) {
                        cellEditor.setDescription(generateLocStrings(cell.description));
                    }
                    cellEditor.setProperties(cell.properties);
                    if (cell.items) {
                        cell.items.forEach(opt => {
                            const cellOptionEditor = new ComponentEditor(undefined, {
                                key: opt.key,
                                role: opt.role,
                            });
                            if (opt.content) {
                                cellOptionEditor.setContent(generateLocStrings(opt.content));
                            }
                            cellOptionEditor.setDisabled(opt.disabled);
                            cellOptionEditor.setDisplayCondition(opt.displayCondition);
                            cellEditor.addItemComponent(cellOptionEditor.getComponent());
                        })
                    }
                    rowEditor.addItemComponent(cellEditor.getComponent());
                });
                break;
        }

        groupEdit.addItemComponent(rowEditor.getComponent());
    });

    return groupEdit.getComponent() as ItemGroupComponent;
}

interface EQ5DHealthSliderProps {
    role: 'eq5d-health-indicator',
    key: string;
    displayCondition?: Expression;
    disabled?: Expression;
    instructionText: Map<string, string>,
    valueBoxText: Map<string, string>,
    maxHealthText: Map<string, string>,
    minHealthText: Map<string, string>,
}

export const initEQ5DHealthIndicatorQuestion = (
    props: EQ5DHealthSliderProps
): ItemGroupComponent => {
    // init group
    const groupEdit = new ComponentEditor(undefined, {
        key: props.key,
        isGroup: true,
        role: props.role,
    });

    const instructionTextEditor = new ComponentEditor(undefined, { role: 'instruction', });
    instructionTextEditor.setContent(generateLocStrings(props.instructionText))
    groupEdit.addItemComponent(instructionTextEditor.getComponent());

    const valueBoxTextEditor = new ComponentEditor(undefined, { role: 'valuebox', });
    valueBoxTextEditor.setContent(generateLocStrings(props.valueBoxText))
    groupEdit.addItemComponent(valueBoxTextEditor.getComponent());

    const minHealthTextEditor = new ComponentEditor(undefined, { role: 'mintext', });
    minHealthTextEditor.setContent(generateLocStrings(props.minHealthText))
    groupEdit.addItemComponent(minHealthTextEditor.getComponent());

    const maxHealthTextEditor = new ComponentEditor(undefined, { role: 'maxtext', });
    maxHealthTextEditor.setContent(generateLocStrings(props.maxHealthText))
    groupEdit.addItemComponent(maxHealthTextEditor.getComponent());

    return groupEdit.getComponent() as ItemGroupComponent;
}

interface LikertGroupRow {
    key: string;
    content: Map<string, string>;
    descriptions?: ItemComponent[];
    hideTopBorder?: boolean;
    hideLabels?: boolean;
    optionDisabled?: Array<{
        optionKey: string;
        exp: Expression;
    }>;
    displayCondition?: Expression;
}

export const initLikertScaleGroup = (
    key: string,
    rows: Array<LikertGroupRow>,
    scaleOptions: Array<{
        key: string;
        className?: string;
        content: Map<string, string>;
    }>,
    stackOnSmallScreen?: boolean,
    displayCondition?: Expression,
): ItemGroupComponent => {
    const groupEdit = new ComponentEditor(undefined, {
        key: key,
        isGroup: true,
        role: 'likertGroup',
    });

    if (displayCondition) {
        groupEdit.setDisplayCondition(displayCondition);
    }

    rows.forEach((row, index) => {
        groupEdit.addItemComponent({
            key: generateRandomKey(4),
            role: 'text',
            style: [{
                key: 'className', value:
                    'fw-bold' + (index !== 0 ? ' pt-1 mt-2' : '') + ((!row.hideTopBorder && index > 0) ? ' border-top border-1 border-grey-2' : '') + (row.descriptions ? ' mb-0' : ' mb-1')
            }, { key: 'variant', value: 'h6' }],
            content: generateLocStrings(row.content),
        });

        if (row.descriptions) {
            row.descriptions.forEach(desc => {
                groupEdit.addItemComponent(desc);
            });
        }

        const item = initLikertScaleItem(
            row.key,
            scaleOptions.map(option => {
                return {
                    key: option.key,
                    className: option.className,
                    content: row.hideLabels ? undefined : option.content,
                    disabled: row.optionDisabled?.find(cond => cond.optionKey === option.key)?.exp,
                }
            }),
            stackOnSmallScreen,
            row.displayCondition
        )
        groupEdit.addItemComponent(item);
    });



    return groupEdit.getComponent() as ItemGroupComponent;
}

export const initResponsiveSingleChoiceArray = (
    rgKey: string,
    props: ResponsiveSingleChoiceArrayProps,
    displayCondition?: Expression,
): ItemGroupComponent => {
    const groupEdit = new ComponentEditor(undefined, {
        key: rgKey,
        isGroup: true,
        role: 'responsiveSingleChoiceArray',
    });

    if (displayCondition) {
        groupEdit.setDisplayCondition(displayCondition);
    }

    const style: Array<{ key: string, value: string }> = [
        { key: 'defaultMode', value: props.defaultMode },
    ];
    if (props.responsiveModes) {
        if (props.responsiveModes.sm) {
            style.push({ key: 'smMode', value: props.responsiveModes.sm });
        }
        if (props.responsiveModes.md) {
            style.push({ key: 'mdMode', value: props.responsiveModes.md });
        }
        if (props.responsiveModes.lg) {
            style.push({ key: 'lgMode', value: props.responsiveModes.lg });
        }
        if (props.responsiveModes.xl) {
            style.push({ key: 'xlMode', value: props.responsiveModes.xl });
        }
        if (props.responsiveModes.xxl) {
            style.push({ key: 'xxlMode', value: props.responsiveModes.xxl });
        }
    }
    if (props.rgClassName) {
        style.push({ key: 'className', value: props.rgClassName });
    }
    if (props.verticalModeProps) {
        if (props.verticalModeProps.useReverseOptionOrder) {
            style.push({ key: 'verticalModeReverseOrder', value: 'true' });
        }
    }
    if (props.tableModeProps) {
        style.push({ key: 'tableModeClassName', value: 'table-borderless mb-0 ' + props.tableModeProps.className });
        if (props.tableModeProps.layout) {
            style.push({ key: 'tableModeLayout', value: props.tableModeProps.layout });
        }
        if (props.tableModeProps.firstColWidth) {
            style.push({ key: 'tableModeFirstColWidth', value: props.tableModeProps.firstColWidth });
        }
    }
    groupEdit.setStyles(style);

    const defaultBorderClass = 'border-bottom border-grey-2';


    let tableModeOptionHeaderClassName: string | undefined = undefined;
    if (!props.tableModeProps?.hideRowBorder) {
        tableModeOptionHeaderClassName = defaultBorderClass;
    }
    if (props.tableModeProps?.optionHeaderClassName) {
        tableModeOptionHeaderClassName += ' ' + props.tableModeProps.optionHeaderClassName;
    }

    const optionStyles: Array<{ key: string, value: string }> = [];
    if (tableModeOptionHeaderClassName) {
        optionStyles.push({ key: 'tableModeClassName', value: tableModeOptionHeaderClassName })
    }

    groupEdit.addItemComponent({
        key: 'header',
        role: 'options',
        style: optionStyles.length > 0 ? optionStyles : undefined,
        items: props.scaleOptions.map(option => {
            return {
                key: option.key,
                role: 'option',
                style: option.className ? [{ key: 'className', value: option.className }] : undefined,
                content: !Array.isArray(option.content) ? generateLocStrings(option.content) : undefined,
                items: Array.isArray(option.content) ? option.content.map((cont, index) => {
                    return {
                        key: index.toFixed(),
                        role: 'text',
                        content: generateLocStrings(cont.content),
                        style: cont.className ? [{ key: 'className', value: cont.className }] : undefined,
                    }
                }) : [],
            }
        })
    })

    props.rows.forEach((row, index) => {
        let tableModeRowClassName: string | undefined = undefined;
        let horizontalModeRowClassName: string | undefined = undefined;
        let verticalModeRowClassName: string | undefined = undefined;

        const isLast = index === props.rows.length - 1;

        if (!props.tableModeProps?.hideRowBorder && !isLast) {
            tableModeRowClassName = defaultBorderClass;
        }
        if (row.tableModeProps?.className) {
            tableModeRowClassName += ' ' + row.tableModeProps?.className;
        }

        if (!props.horizontalModeProps?.hideRowBorder && !isLast) {
            horizontalModeRowClassName = defaultBorderClass;
        }
        if (row.horizontalModeProps?.className) {
            horizontalModeRowClassName += ' ' + row.horizontalModeProps?.className;
        }

        if (!props.verticalModeProps?.hideRowBorder && !isLast) {
            verticalModeRowClassName = defaultBorderClass;
        }
        if (row.verticalModeProps?.className) {
            verticalModeRowClassName += ' ' + row.verticalModeProps?.className;
        }

        const rowStyles: Array<{ key: string, value: string }> = [];
        if (tableModeRowClassName) {
            rowStyles.push({ key: 'tableModeClassName', value: tableModeRowClassName })
        }
        if (horizontalModeRowClassName) {
            rowStyles.push({ key: 'horizontalModeClassName', value: horizontalModeRowClassName })
        }
        if (verticalModeRowClassName) {
            rowStyles.push({ key: 'verticalModeClassName', value: verticalModeRowClassName })
        }

        if (row.horizontalModeProps?.labelPlacement) {
            rowStyles.push({ key: 'horizontalModeLabelPlacement', value: row.horizontalModeProps.labelPlacement })
        }

        groupEdit.addItemComponent({
            key: row.key,
            role: 'row',
            style: rowStyles.length > 0 ? rowStyles : undefined,
            content: !Array.isArray(row.content) ? generateLocStrings(row.content) : undefined,
            items: Array.isArray(row.content) ? row.content.map((cont, index) => {
                return {
                    key: index.toFixed(),
                    role: 'text',
                    content: generateLocStrings(cont.content),
                    style: cont.className ? [{ key: 'className', value: cont.className }] : undefined,
                }
            }) : [],
        })
    })

    return groupEdit.getComponent() as ItemGroupComponent;
}

export const initResponsiveBipolarLikertArray = (
    rgKey: string,
    props: ResponsiveBipolarLikertArrayProps,
    displayCondition?: Expression,
): ItemGroupComponent => {
    const groupEdit = new ComponentEditor(undefined, {
        key: rgKey,
        isGroup: true,
        role: 'responsiveBipolarLikertScaleArray',
    });

    if (displayCondition) {
        groupEdit.setDisplayCondition(displayCondition);
    }

    const style: Array<{ key: string, value: string }> = [
        { key: 'defaultMode', value: props.defaultMode },
    ];
    if (props.responsiveModes) {
        if (props.responsiveModes.sm) {
            style.push({ key: 'smMode', value: props.responsiveModes.sm });
        }
        if (props.responsiveModes.md) {
            style.push({ key: 'mdMode', value: props.responsiveModes.md });
        }
        if (props.responsiveModes.lg) {
            style.push({ key: 'lgMode', value: props.responsiveModes.lg });
        }
        if (props.responsiveModes.xl) {
            style.push({ key: 'xlMode', value: props.responsiveModes.xl });
        }
        if (props.responsiveModes.xxl) {
            style.push({ key: 'xxlMode', value: props.responsiveModes.xxl });
        }
    }
    if (props.rgClassName) {
        style.push({ key: 'className', value: props.rgClassName });
    }
    if (props.withLabelRowModeProps) {
        if (props.withLabelRowModeProps.maxLabelWidth) {
            style.push({ key: 'labelRowMaxLabelWidth', value: props.withLabelRowModeProps.maxLabelWidth });
        }
    }
    style.push({ key: 'labelRowPosition', value: props.withLabelRowModeProps?.useBottomLabel ? 'bottom' : 'top' })

    if (props.tableModeProps) {
        style.push({ key: 'tableModeClassName', value: 'table-borderless mb-0 ' + props.tableModeProps.className });
        if (props.tableModeProps.layout) {
            style.push({ key: 'tableModeLayout', value: props.tableModeProps.layout });
        }
        if (props.tableModeProps.labelColWidth) {
            style.push({ key: 'tableModeLabelColWidth', value: props.tableModeProps.labelColWidth });
        }
    }
    groupEdit.setStyles(style);

    const defaultBorderClass = 'border-bottom border-grey-2';

    groupEdit.addItemComponent({
        key: 'options',
        role: 'options',
        items: props.scaleOptions.map(option => {
            return {
                key: option.key,
                role: 'option',
            }
        })
    })

    props.rows.forEach((row, index) => {
        let tableModeRowClassName: string | undefined = undefined;
        let withLabelRowModeClassName: string | undefined = undefined;
        let verticalModeRowClassName: string | undefined = undefined;

        const isLast = index === props.rows.length - 1;

        if (!props.tableModeProps?.hideRowBorder && !isLast) {
            tableModeRowClassName = defaultBorderClass;
        }
        if (row.tableModeProps?.className) {
            tableModeRowClassName += ' ' + row.tableModeProps?.className;
        }

        if (!props.withLabelRowModeProps?.hideRowBorder && !isLast) {
            withLabelRowModeClassName = defaultBorderClass;
        }
        if (row.withLabelRowModeProps?.className) {
            withLabelRowModeClassName += ' ' + row.withLabelRowModeProps?.className;
        }

        if (!props.verticalModeProps?.hideRowBorder && !isLast) {
            verticalModeRowClassName = defaultBorderClass;
        }
        if (row.verticalModeProps?.className) {
            verticalModeRowClassName += ' ' + row.verticalModeProps?.className;
        }

        const rowStyles: Array<{ key: string, value: string }> = [];
        if (tableModeRowClassName) {
            rowStyles.push({ key: 'tableModeClassName', value: tableModeRowClassName })
        }
        if (withLabelRowModeClassName) {
            rowStyles.push({ key: 'withLabelRowModeClassName', value: withLabelRowModeClassName })
        }
        if (verticalModeRowClassName) {
            rowStyles.push({ key: 'verticalModeClassName', value: verticalModeRowClassName })
        }

        const startLabel = {
            key: 'start',
            role: 'start',
            content: !Array.isArray(row.startLabel) ? generateLocStrings(row.startLabel) : undefined,
            items: Array.isArray(row.startLabel) ? row.startLabel.map((cont, index) => {
                return {
                    key: index.toFixed(),
                    role: 'text',
                    content: generateLocStrings(cont.content),
                    style: cont.className ? [{ key: 'className', value: cont.className }] : undefined,
                }
            }) : [],
        }

        const endLabel = {
            key: 'end',
            role: 'end',
            content: !Array.isArray(row.endLabel) ? generateLocStrings(row.endLabel) : undefined,
            items: Array.isArray(row.endLabel) ? row.endLabel.map((cont, index) => {
                return {
                    key: index.toFixed(),
                    role: 'text',
                    content: generateLocStrings(cont.content),
                    style: cont.className ? [{ key: 'className', value: cont.className }] : undefined,
                }
            }) : [],
        }

        groupEdit.addItemComponent({
            key: row.key,
            role: 'row',
            style: rowStyles.length > 0 ? rowStyles : undefined,
            items: [
                startLabel, endLabel
            ],
        })
    })

    return groupEdit.getComponent() as ItemGroupComponent;
}


export const initLikertScaleItem = (
    key: string,
    options: Array<{
        key: string;
        className?: string;
        content?: Map<string, string>;
        disabled?: Expression;
    }>,
    stackOnSmallScreen?: boolean,
    displayCondition?: Expression,
): ItemGroupComponent => {
    // init group
    const groupEdit = new ComponentEditor(undefined, {
        key: key,
        isGroup: true,
        role: 'likert',
    });
    groupEdit.setDisplayCondition(displayCondition);
    if (stackOnSmallScreen) {
        groupEdit.setStyles([
            { key: 'responsive', value: 'stackOnSmallScreen' }
        ])
    }

    options.forEach((option) => {
        const optionComponent = new ComponentEditor(undefined, {
            key: option.key,
            role: 'option',
        });
        if (option.content) {
            optionComponent.setContent(generateLocStrings(option.content));
        }
        if (option.className) {
            optionComponent.setStyles([{
                key: 'className', value: option.className
            }]);
        }
        optionComponent.setDisabled(option.disabled);
        groupEdit.addItemComponent(optionComponent.getComponent());
    });

    return groupEdit.getComponent() as ItemGroupComponent;
}
