import { Expression, SurveySingleItem } from 'survey-engine/data_types';
import { expWithArgs, generateLocStrings } from 'case-editor-tools/surveys/utils/simple-generators';

/**
 * Question pool item structure for validatedRandomQuestion
 */
export interface QuestionPoolItem {
  key: string;
  role: 'question';
  content: ReturnType<typeof generateLocStrings>;
  items: Array<{
    key: string;
    role: 'answer';
    content: ReturnType<typeof generateLocStrings>;
  }>;
}

/**
 * Options for creating a validatedRandomQuestion survey item
 */
export interface ValidatedRandomQuestionOptions {
  parentKey: string;
  itemKey: string;
  condition?: Expression;
  questionText?: Map<string, string>;
  questionSubText?: Map<string, string>;
  questionPool?: QuestionPoolItem[];
  buttonLabelText?: Map<string, string>;
}

/**
 * Creates a validatedRandomQuestion survey item from scratch.
 * This utility creates the item structure manually to avoid the colon issue
 * with the customQuestion method.
 *
 * @param options - Configuration options for the validatedRandomQuestion
 * @returns A SurveySingleItem configured as a validatedRandomQuestion
 */
export function createValidatedRandomQuestion(
  options: ValidatedRandomQuestionOptions
): SurveySingleItem {
  const {
    parentKey,
    itemKey,
    condition,
    questionText,
    questionSubText,
    questionPool = [],
    buttonLabelText,
  } = options;

  const vrqKey = `${parentKey}.${itemKey}`;
  const defaultButtonLabel = new Map([['nl', 'Ik wil een andere vraag']]);
  const buttonLabel = buttonLabelText || defaultButtonLabel;

  const item: SurveySingleItem = {
    key: vrqKey,
    components: {
      role: 'root',
      order: {
        name: 'sequential',
      },
      items: [
        {
          role: 'title',
          content: questionText ? generateLocStrings(questionText) : [],
        },
        ...(questionSubText
          ? [
            {
              role: 'subtitle',
              content: generateLocStrings(questionSubText),
            },
          ]
          : []),
        {
          key: 'rg',
          role: 'responseGroup',
          items: [
            {
              key: 'vrq',
              role: 'validatedRandomQuestion',
              items: [
                {
                  key: 'questionPool',
                  role: 'questionPool',
                  items: questionPool,
                },
                {
                  key: '5a6i',
                  role: 'buttonLabel',
                  content: generateLocStrings(buttonLabel),
                },
              ],
            },
          ],
        },
      ],
    },
    validations: [
      {
        key: 'v1',
        type: 'hard',
        rule: expWithArgs('hasResponse', vrqKey, 'rg'),
      },
    ],
  };

  if (condition) {
    item.condition = condition;
  }

  return item;
}

/**
 * Helper function to create a validatedRandomQuestion Item class.
 * Use this when creating reusable Item classes similar to other question types.
 *
 * @example
 * ```typescript
 * export class MyValidatedRandomQuestion extends Item {
 *   constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
 *     super(parentKey, 'VRQ');
 *     this.isRequired = isRequired;
 *     this.condition = condition;
 *   }
 *
 *   buildItem() {
 *     return createValidatedRandomQuestionItem({
 *       parentKey: this.parentKey,
 *       itemKey: this.itemKey,
 *       condition: this.condition,
 *       questionText: new Map([['nl', 'Vraag tekst']]),
 *       questionSubText: new Map([['nl', 'Subtekst']]),
 *       questionPool: [],
 *       buttonLabelText: new Map([['nl', 'Ik wil een andere vraag']]),
 *     });
 *   }
 * }
 * ```
 */
export function createValidatedRandomQuestionItem(
  options: ValidatedRandomQuestionOptions
): SurveySingleItem {
  return createValidatedRandomQuestion(options);
}
