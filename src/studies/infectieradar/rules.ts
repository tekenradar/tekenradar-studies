import { Expression } from "survey-engine/lib/data_types";
import { StudyEngine } from "../../case-editor/expression-utils/studyEngineExpressions";
import { StudyRules } from "../../case-editor/types/studyRules";
import { ParticipantFlags } from "./participantFlags";

const surveyKeys = {
    intake: 'intake',
    weekly: 'weekly'
}

/**
 * Define what should happen, when persons enter the study first time:
 */
const entryRules: Expression[] = [
    StudyEngine.participantActions.assignedSurveys.add(surveyKeys.intake, 'normal')
];


/**
 * Define what should happen, when persons submit a survey:
 */
const handleIntake = StudyEngine.ifThen(
    StudyEngine.checkSurveyResponseKey(surveyKeys.intake),
    // then do:
    StudyEngine.participantActions.assignedSurveys.removeAll(),
    StudyEngine.participantActions.assignedSurveys.add(surveyKeys.weekly, 'prio'),
    StudyEngine.participantActions.assignedSurveys.add(surveyKeys.intake, 'optional'),
)

const handleWeekly = StudyEngine.ifThen(
    StudyEngine.checkSurveyResponseKey(surveyKeys.weekly),
    // then do:
    StudyEngine.participantActions.assignedSurveys.removeAll(),
    StudyEngine.participantActions.assignedSurveys.add(surveyKeys.intake, 'optional'),
    StudyEngine.participantActions.assignedSurveys.add(surveyKeys.weekly, 'prio', StudyEngine.timestampWithOffset({
        hours: 1,
    })),
    // Manage flags:
    StudyEngine.ifThen(
        // if has ongoing symptoms:
        StudyEngine.singleChoice.any(`${surveyKeys.weekly}.HS.Q4`, '2'),
        // then:
        StudyEngine.participantActions.updateFlag(
            ParticipantFlags.hasOnGoingSymptoms.key,
            ParticipantFlags.hasOnGoingSymptoms.values.yes
        )
    ),
    StudyEngine.ifThen(
        // if does not have ongoing symptoms:
        StudyEngine.not(StudyEngine.singleChoice.any(`${surveyKeys.weekly}.HS.Q4`, '2')),
        // then:
        StudyEngine.participantActions.updateFlag(
            ParticipantFlags.hasOnGoingSymptoms.key,
            ParticipantFlags.hasOnGoingSymptoms.values.no
        )
    )
)

const submitRules: Expression[] = [
    handleIntake,
    handleWeekly,
];

/**
 * STUDY RULES
 */
export const studyRules = new StudyRules(
    entryRules,
    submitRules,
)