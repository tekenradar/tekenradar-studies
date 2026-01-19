
/**
 * Type definition for a survey JSON object
 */
export interface SurveyJson {
  surveyDefinition?: {
    key: string;
    [key: string]: unknown;
  };
}

/**
 * Extracts and validates the survey key from a survey JSON object.
 * Validates that the top-level `surveyKey` matches `surveyDefinition.key` if present.
 *
 * @param surveyJson - The survey JSON object containing a surveyKey field
 * @returns The survey key string
 * @throws Error if surveyKey is missing, not a string, empty, or doesn't match surveyDefinition.key
 *
 * @example
 * ```typescript
 * const survey = { surveyKey: "WeeklyTB", surveyDefinition: { key: "WeeklyTB" }, ... };
 * const key = extractSurveyKey(survey); // Returns "WeeklyTB"
 * ```
 */
export function extractSurveyKey(surveyJson: SurveyJson): string {
  if (!surveyJson || typeof surveyJson !== 'object') {
    throw new Error('Invalid survey JSON: expected an object');
  }

  // Validate that surveyKey matches surveyDefinition.key if surveyDefinition exists
  if (surveyJson.surveyDefinition) {
    const definitionKey = surveyJson.surveyDefinition.key;

    if (typeof definitionKey !== 'string') {
      throw new Error(`surveyDefinition.key must be a string, got ${typeof definitionKey}`);
    }

    return definitionKey;
  }

  throw new Error('Survey JSON is missing the required "surveyDefinition" field');
}
