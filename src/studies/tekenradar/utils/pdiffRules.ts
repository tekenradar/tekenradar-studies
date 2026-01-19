import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { ParticipantFlags } from "../participantFlags";

import { PDiff_key } from "./studyRuleUtils";

const Q6DateInputKey = `rg.scg.a.date`;
const getQ6DateValue = () => StudyEngine.getResponseValueAsNum(`${PDiff_key}.D6`, Q6DateInputKey);


const D1_optionKeys = {
  yes: 'a',
  no: 'b',
}

const D2_optionKeys = {
  yes: 'a',
  no: 'b',
}

const D3_optionKeys = {
  yes: 'a',
  no: 'b',
}

const D4_optionKeys = {
  yes: 'a',
  no: 'b',
}

const D5_optionKeys = {
  fever: 'a',
  posTest: 'b',
  andere: 'c',
}

const D6_optionKeys = {
  yes: 'a',
  yes_date: 'date',
  startSoon: 'b',
  no: 'c',
}

export const hasTBFlowCondition = () => StudyEngine.and(
  StudyEngine.singleChoice.any(`${PDiff_key}.D1`, D1_optionKeys.yes),
  StudyEngine.singleChoice.none(`${PDiff_key}.D2`, D2_optionKeys.yes),
  StudyEngine.singleChoice.any(`${PDiff_key}.D3`, D3_optionKeys.no),
  StudyEngine.singleChoice.any(`${PDiff_key}.D4`, D4_optionKeys.no),
)

export const hasEMFlowCondition = () => StudyEngine.or(
  StudyEngine.and(
    StudyEngine.singleChoice.any(`${PDiff_key}.D3`, D3_optionKeys.yes),
    StudyEngine.singleChoice.any(`${PDiff_key}.D4`, D4_optionKeys.no),
  ),
  StudyEngine.and(
    StudyEngine.singleChoice.any(`${PDiff_key}.D3`, D3_optionKeys.yes),
    StudyEngine.singleChoice.any(`${PDiff_key}.D4`, D4_optionKeys.yes),
    StudyEngine.multipleChoice.none(`${PDiff_key}.D5`, D5_optionKeys.andere),
  ),
  StudyEngine.and(
    StudyEngine.singleChoice.any(`${PDiff_key}.D3`, D3_optionKeys.yes),
    StudyEngine.singleChoice.any(`${PDiff_key}.D4`, D4_optionKeys.yes),
    StudyEngine.multipleChoice.any(`${PDiff_key}.D5`, D5_optionKeys.andere),
    StudyEngine.singleChoice.any(`${PDiff_key}.D6`, D6_optionKeys.no),
  ),
)

export const hasFEflowCondition = () => StudyEngine.or(
  StudyEngine.and(
    StudyEngine.singleChoice.any(`${PDiff_key}.D1`, D1_optionKeys.yes),
    StudyEngine.singleChoice.any(`${PDiff_key}.D2`, D2_optionKeys.yes),
    StudyEngine.singleChoice.any(`${PDiff_key}.D3`, D3_optionKeys.no),
    StudyEngine.singleChoice.any(`${PDiff_key}.D4`, D4_optionKeys.no),
  ),
  StudyEngine.and(
    StudyEngine.singleChoice.any(`${PDiff_key}.D1`, D1_optionKeys.yes),
    StudyEngine.singleChoice.any(`${PDiff_key}.D2`, D2_optionKeys.yes),
    StudyEngine.singleChoice.any(`${PDiff_key}.D3`, D3_optionKeys.no),
    StudyEngine.singleChoice.any(`${PDiff_key}.D4`, D4_optionKeys.yes),
    StudyEngine.multipleChoice.any(`${PDiff_key}.D5`, D5_optionKeys.fever),
    StudyEngine.multipleChoice.none(`${PDiff_key}.D5`, D5_optionKeys.posTest, D5_optionKeys.andere),
  ),
)

export const hasLBflowCondition = () => StudyEngine.or(
  StudyEngine.and(
    StudyEngine.singleChoice.any(`${PDiff_key}.D3`, D3_optionKeys.yes),
    StudyEngine.singleChoice.any(`${PDiff_key}.D4`, D4_optionKeys.yes),
    StudyEngine.multipleChoice.any(`${PDiff_key}.D5`, D5_optionKeys.andere),
    StudyEngine.or(
      StudyEngine.and(
        StudyEngine.singleChoice.any(`${PDiff_key}.D6`, D6_optionKeys.yes),
        StudyEngine.gte(
          getQ6DateValue(),
          StudyEngine.timestampWithOffset({ days: -4 }),
        ),
      ),
      StudyEngine.singleChoice.any(`${PDiff_key}.D6`, D6_optionKeys.startSoon)
    )
  ),
  StudyEngine.and(
    StudyEngine.singleChoice.any(`${PDiff_key}.D3`, D3_optionKeys.no),
    StudyEngine.singleChoice.any(`${PDiff_key}.D4`, D4_optionKeys.yes),
    // Q5 has no influence here
    StudyEngine.or(
      StudyEngine.and(
        StudyEngine.singleChoice.any(`${PDiff_key}.D6`, D6_optionKeys.yes),
        StudyEngine.gte(
          getQ6DateValue(),
          StudyEngine.timestampWithOffset({ days: -4 }),
        ),
      ),
      StudyEngine.singleChoice.any(`${PDiff_key}.D6`, D6_optionKeys.startSoon, D6_optionKeys.no)
    )
  ),
)

export const hasChronicflowCondition = () => {
  const Q6dateCondition = StudyEngine.and(
    StudyEngine.singleChoice.any(`${PDiff_key}.D6`, D6_optionKeys.yes),
    StudyEngine.or(
      StudyEngine.lt(
        getQ6DateValue(),
        StudyEngine.timestampWithOffset({ days: -4 }),
      ),
      // Not defined, aka 0
      StudyEngine.not(
        StudyEngine.hasResponseKey(
          `${PDiff_key}.D6`,
          Q6DateInputKey
        )
      ),
    )
  );

  return StudyEngine.or(
    StudyEngine.and(
      StudyEngine.singleChoice.any(`${PDiff_key}.D3`, D3_optionKeys.yes),
      StudyEngine.singleChoice.any(`${PDiff_key}.D4`, D4_optionKeys.yes),
      StudyEngine.multipleChoice.any(`${PDiff_key}.D5`, D5_optionKeys.andere),
      Q6dateCondition
    ),
    StudyEngine.and(
      StudyEngine.singleChoice.any(`${PDiff_key}.D1`, D1_optionKeys.yes),
      StudyEngine.singleChoice.none(`${PDiff_key}.D2`, D2_optionKeys.yes),
      StudyEngine.singleChoice.any(`${PDiff_key}.D3`, D3_optionKeys.no),
      StudyEngine.singleChoice.any(`${PDiff_key}.D4`, D4_optionKeys.yes),
      Q6dateCondition
    ),
    StudyEngine.and(
      StudyEngine.singleChoice.any(`${PDiff_key}.D1`, D1_optionKeys.no),
      StudyEngine.singleChoice.any(`${PDiff_key}.D3`, D3_optionKeys.no),
      StudyEngine.singleChoice.any(`${PDiff_key}.D4`, D4_optionKeys.yes),
      Q6dateCondition
    )
  )
}


const D7_optionKeys = {
  yes: 'a',
  alreadyDoing: 'c',
}

export const hasWeeklyTBCondition = () => StudyEngine.or(
  // Already in weekly reporting:
  StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.weeklyTBreporter.key, ParticipantFlags.weeklyTBreporter.values.true),
  StudyEngine.participantState.hasParticipantFlagKeyAndValue(ParticipantFlags.weeklyTBreporter.key, ParticipantFlags.weeklyTBreporter.values.init),
  // Or wants to join:
  StudyEngine.singleChoice.any(
    `${PDiff_key}.D7`,
    D7_optionKeys.yes,
    D7_optionKeys.alreadyDoing,
  ),
)
