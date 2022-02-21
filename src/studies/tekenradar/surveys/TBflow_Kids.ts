import { SurveyEngine } from 'case-editor-tools/surveys';
import { SurveyDefinition } from 'case-editor-tools/surveys/types';
import { ParticipantFlags } from '../participantFlags';
import { applyRequiredQuestions } from './globalConstants';
import { Gender, Residence } from './questions/demographie';
import { Doctor, FormerLymeGroup, GeneralTherapy1, GeneralTherapy2 } from './questions/diagnosisTherapy';
import { PreviousTickBitesGroup } from './questions/prevTickBites';
import { ActivityTickBite, DateTickBite, DoctorTickBite, DurationTickBite, EnvironmentTickBite, IntroTB, LocationBodyTickBite, NumberTickBite, RemoveTick1, RemoveTick2, RemoveTick3, RemoveTick4, ReportedTickBites, TBGeneralHeader, TickBiteLocationGroup } from './questions/tickBite';

class TBflow_KidsDef extends SurveyDefinition {
  T1: IntroTB;
  Q1: EnvironmentTickBite;
  Q2: ActivityTickBite;
  Q3: TickBiteLocationGroup;
  Q4: NumberTickBite;
  Q5: LocationBodyTickBite;
  Q6: RemoveTick1;
  Q7: RemoveTick2;
  Q8: RemoveTick3;
  Q9: RemoveTick4;
  G10_11: PreviousTickBitesGroup;
  Q12: ReportedTickBites;

  H1: TBGeneralHeader;
  P1: Residence;
  P2: Gender;

  Q13: DateTickBite;
  Q14: DurationTickBite;
  Q15: DoctorTickBite;
  Q16: Doctor;

  G17_19: FormerLymeGroup;

  Q20_a: GeneralTherapy1;
  Q20_b: GeneralTherapy2;

  constructor(isRequired?: boolean) {
    super({
      surveyKey: 'TBflow_Kids',
      name: new Map([
        ['nl', 'Tekenbeetmelding']
      ]),
      description: new Map([
        ['nl', 'Klik hier om je melding af te ronden.']
      ]),
      durationText: new Map([
        ['nl', 'Invullen duurt ongeveer 10-20 minuten.']
      ]),
      availableFor: 'temporary_participants',
    });

    const required = isRequired !== undefined ? isRequired : false;

    this.T1 = new IntroTB(this.key, required);
    this.Q1 = new EnvironmentTickBite(this.key, required);
    this.Q2 = new ActivityTickBite(this.key, required);
    this.Q3 = new TickBiteLocationGroup(this.key, required);
    this.Q4 = new NumberTickBite(this.key, required);
    this.Q5 = new LocationBodyTickBite(this.key, required);

    this.Q6 = new RemoveTick1(this.key, required);
    const q6Condition = SurveyEngine.singleChoice.any(this.Q6.key, this.Q6.optionKeys.no);
    this.Q7 = new RemoveTick2(this.key, required, q6Condition);
    this.Q8 = new RemoveTick3(this.key, required, q6Condition);
    this.Q9 = new RemoveTick4(this.key, required, q6Condition);

    this.G10_11 = new PreviousTickBitesGroup(this.key, isRequired);

    this.Q12 = new ReportedTickBites(this.key, required);

    this.H1 = new TBGeneralHeader(this.key, required);

    // If the respondent is not logged in ask p1 and p2,
    //if he is logged in, skip these two questions here as they
    //will be asked lateron in de questionaire (chapter S-A)
    this.P1 = new Residence(this.key, required,
      SurveyEngine.logic.or(
        SurveyEngine.logic.not(SurveyEngine.isLoggedIn()),
        SurveyEngine.logic.not(SurveyEngine.participantFlags.hasKey(ParticipantFlags.postalCode.key))
      )
    );
    this.P2 = new Gender(this.key, required,
      SurveyEngine.logic.or(
        SurveyEngine.logic.not(SurveyEngine.isLoggedIn()),
        SurveyEngine.logic.not(SurveyEngine.participantFlags.hasKey(ParticipantFlags.genderCategory.key))
      )
    );

    this.Q13 = new DateTickBite(this.key, required);
    this.Q14 = new DurationTickBite(this.key, required);
    this.Q15 = new DoctorTickBite(this.key, required);
    const q15Condition = SurveyEngine.singleChoice.any(this.Q15.key, this.Q15.optionKeys.yes);
    this.Q16 = new Doctor(this.key, required, q15Condition);

    this.G17_19 = new FormerLymeGroup(this.key, isRequired);

    this.Q20_a = new GeneralTherapy1(this.key, required);
    const Q20_a_number = SurveyEngine.getResponseValueAsNum(this.Q20_a.key, 'rg.scg.b');
    this.Q20_b = new GeneralTherapy2(this.key, required, Q20_a_number);
  }

  buildSurvey() {

    this.addItem(this.T1.get());
    this.addItem(this.Q1.get());
    this.addItem(this.Q2.get());
    this.addItem(this.Q3.get());
    this.addItem(this.Q4.get());
    this.addItem(this.Q5.get());
    this.addItem(this.Q6.get());
    this.addItem(this.Q7.get());
    this.addItem(this.Q8.get());
    this.addItem(this.Q9.get());
    this.addItem(this.G10_11.get());
    this.addItem(this.Q12.get());

    this.addPageBreak();
    this.addItem(this.H1.get());
    this.addItem(this.P1.get());
    this.addItem(this.P2.get());
    this.addItem(this.Q13.get());
    this.addItem(this.Q14.get());
    this.addItem(this.Q15.get());
    this.addItem(this.Q16.get());
    this.addItem(this.G17_19.get());
    this.addItem(this.Q20_a.get());
    this.addItem(this.Q20_b.get());
  }
}

export const TBflow_Kids = new TBflow_KidsDef(applyRequiredQuestions);
