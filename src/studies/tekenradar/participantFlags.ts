export const ParticipantFlags = {
  ageFromPDiff: {
    key: 'ageFromPDiff'
  },
  ageCategory: {
    key: 'ageCategory',
    values: {
      child: 'child',
      adult: 'adult'
    }
  },
  contactData: {
    key: 'contactData',
    values: {
      active: 'active',
      autoRemove: 'removedAfter12Weeks',
      manual: 'deletedByUser'
    }
  },
  genderCategory: {
    key: 'gender',
    values: {
      male: 'male',
      female: 'female',
      other: 'other',
      unknown: 'unknown'
    }
  },
  postalCode: {
    key: 'postalCode',
    values: {
      known: 'known'
    }
  },
  tbExposure: {
    key: 'tbExposure',
    values: {
      known: 'known'
    }
  },
  flow: {
    key: 'flow',
    values: {
      TBflow: 'TBflow',
      EMflow: 'EMflow',
      FEflow: 'FEflow',
      LBflow: 'LBflow',
      Chronicflow: 'Chronicflow',
    },
  },
  followUp: {
    key: 'followUp',
    values: {
      active: 'active',
      finished: 'finished',
      quitted: 'quitted',
    }
  },
  weeklyTBreporter: {
    key: 'weeklyTBreporter',
    values: {
      init: 'init',
      true: 'true',
      false: 'false'
    }
  },
  kEM: {
    key: 'kEM',
    values: {
      likely: 'likely'
    }
  }, //LT 11-05-23
  aEM: {
    key: 'aEM',
    values: {
      likely: 'likely'
    }
  }, //LT 11-05-23
  NMG: {
    key: 'NMG',
    values: {
      true: 'true'
    }
  }, //MH 08-08-2024
  LPplus: {
    key: 'LPplus',
    values: {
      likely: 'likely'
    }
  }, //LT 27-08-2024
  PHQ_15_none: {
    key: 'PHQ_15_none',
    values: {
      true: 'true'
    }
  }, //MH 08-08-2024
  BioB: {
    key: 'BioB',
    values: {
      accepted: 'true',
      rejected: 'false'
    }
  },
  consents: {
    defaultStudy: {
      key: 'consentDefaultStudy',
      values: {
        accepted: 'true',
      }
    },
    additionalStudies: {
      key: 'consentAdditionalStudies',
      values: {
        accepted: 'true',
        rejected: 'false'
      }
    },
  }
}
