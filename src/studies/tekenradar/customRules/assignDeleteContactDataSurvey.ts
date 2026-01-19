import { StudyEngine } from "case-editor-tools/expression-utils/studyEngineExpressions";
import { DeleteContactData_key } from "../utils/studyRuleUtils";

export const assignDeleteContactDataSurvey = {
  name: 'assignDeleteContactDataSurvey',
  rules: [
    StudyEngine.ifThen(
      StudyEngine.participantState.hasSurveyKeyAssigned(DeleteContactData_key),
      StudyEngine.participantActions.assignedSurveys.remove(DeleteContactData_key, 'all'),
      StudyEngine.participantActions.assignedSurveys.add(DeleteContactData_key, 'optional', undefined,
        StudyEngine.timestampWithOffset({ minutes: 30 }))
    ),/*
    StudyEngine.ifThen(
      StudyEngine.checkConditionForOldResponses(
        StudyEngine.or(
          StudyEngine.consent.accepted(T0_Invites.StandardInviteGroup.UitnodigingAanvullendOnderzoekConsent.key),
          StudyEngine.consent.accepted(T0_Invites.kEMInviteGroup.UitnodigingOnderzoekConsent.key),
        ),
        'any',
        surveyKeys.T0_Invites,
      ),
    ),
    StudyEngine.if(
      StudyEngine.participantState.lastSubmissionDateOlderThan(StudyEngine.timestampWithOffset({ days: 12 * 7 }), surveyKeys.T0_Invites),
      // Delete contact data now:
      StudyEngine.do(
        StudyEngine.participantActions.confidentialResponses.removeAll(),
        StudyEngine.participantActions.assignedSurveys.remove(surveyKeys.DeleteContactData, 'all'),
        StudyEngine.participantActions.updateFlag(
          ParticipantFlags.contactData.key,
          ParticipantFlags.contactData.values.autoRemove
        )
      ),
      // else:
      StudyEngine.if(
        StudyEngine.participantState.lastSubmissionDateOlderThan(StudyEngine.timestampWithOffset({ days: 8 * 7 }), surveyKeys.T0_Invites),
        //
        StudyEngine.participantActions.assignedSurveys.add(surveyKeys.DeleteContactData, 'optional', undefined, StudyEngine.timestampWithOffset({ days: 4 * 7 })),
        // else:
        StudyEngine.if(
          StudyEngine.participantState.lastSubmissionDateOlderThan(StudyEngine.timestampWithOffset({ days: 4 * 7 }), surveyKeys.T0_Invites),
          //
          StudyEngine.participantActions.assignedSurveys.add(surveyKeys.DeleteContactData, 'optional', undefined, StudyEngine.timestampWithOffset({ days: 8 * 7 })),
          StudyEngine.participantActions.assignedSurveys.add(surveyKeys.DeleteContactData, 'optional', undefined, StudyEngine.timestampWithOffset({ days: 12 * 7 })),
        )
      )
    )*/
  ]
}
