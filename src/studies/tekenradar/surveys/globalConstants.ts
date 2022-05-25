export const applyRequiredQuestions = true;

export const SurveySuffix = {
  Adults: 'Adults',
  Kids: 'Kids'
}

export const surveyCategoryNames = {
  Chronicflow: 'Chronicflow',
  Feverflow: 'Feverflow',
  EMflow: 'EMflow',
  Standardflow: 'Standardflow',
  T3: 'T3',
  T6: 'T6',
  T9: 'T9',
  T12: 'T12',
}

export const surveyKeys = {
  WeeklyTB: "WeeklyTB",
  T0_Invites: "T0_Invites",
  EMflow_Adults: `${surveyCategoryNames.EMflow}_${SurveySuffix.Adults}`,
  EMflow_Kids: `${surveyCategoryNames.EMflow}_${SurveySuffix.Kids}`,
  Feverflow_Adults: `${surveyCategoryNames.Feverflow}_${SurveySuffix.Adults}`,
  Standardflow_Kids: `${surveyCategoryNames.Standardflow}_${SurveySuffix.Kids}`,
  Standardflow_Adults: `${surveyCategoryNames.Standardflow}_${SurveySuffix.Adults}`,
  T3_Kids: `${surveyCategoryNames.T3}_${SurveySuffix.Kids}`,
  T3_Adults: `${surveyCategoryNames.T3}_${SurveySuffix.Adults}`,
  T6_Kids: `${surveyCategoryNames.T6}_${SurveySuffix.Kids}`,
  T6_Adults: `${surveyCategoryNames.T6}_${SurveySuffix.Adults}`,
  T9_Kids: `${surveyCategoryNames.T9}_${SurveySuffix.Kids}`,
  T9_Adults: `${surveyCategoryNames.T9}_${SurveySuffix.Adults}`,
  T12_Kids: `${surveyCategoryNames.T12}_${SurveySuffix.Kids}`,
  T12_Adults: `${surveyCategoryNames.T12}_${SurveySuffix.Adults}`,
  QuitWeeklyTB: 'QuitWeekly',
  QuitFollowUp: 'QuitFU',
  DeleteContactData: 'DelContactData',
}


export const TextBorderFormat = 'border-top border-grey-2 pt-2'
