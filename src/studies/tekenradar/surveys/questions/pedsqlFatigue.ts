import { Expression } from 'survey-engine/data_types';
import { Item, Group } from 'case-editor-tools/surveys/types';
import { SurveyItems } from 'case-editor-tools/surveys';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';


export class PedsqlFatigue_2_4 extends Group {
  Header: Header_2_4;
  Q1: Q1_2_4;
  Q2: Q2_2_4;
  Q3: Q3_2_4;

  constructor(parentKey: string, isRequired?: boolean, condition?: Expression) {
    super(parentKey, 'PedsqlFatigue_2_4');

    this.groupEditor.setCondition(condition);

    const required = isRequired !== undefined ? isRequired : false;

    this.Header = new Header_2_4(this.key);
    this.Q1 = new Q1_2_4(this.key, required);
    this.Q2 = new Q2_2_4(this.key, required);
    this.Q3 = new Q3_2_4(this.key, required);
  }

  buildGroup() {
    this.addItem(this.Header.get());
    this.addItem(this.Q1.get());
    this.addItem(this.Q2.get());
    this.addItem(this.Q3.get());
  }
}


export class PedsqlFatigue_5_7 extends Group {
  Header: Header_5_7;
  Q1: Q1_5_7;
  Q2: Q2_5_7;
  Q3: Q3_5_7;

  constructor(parentKey: string, isRequired?: boolean, condition?: Expression) {
    super(parentKey, 'PedsqlFatigue_5_7');

    this.groupEditor.setCondition(condition);

    const required = isRequired !== undefined ? isRequired : false;

    this.Header = new Header_5_7(this.key);
    this.Q1 = new Q1_5_7(this.key, required);
    this.Q2 = new Q2_5_7(this.key, required);
    this.Q3 = new Q3_5_7(this.key, required);
  }

  buildGroup() {
    this.addItem(this.Header.get());
    this.addItem(this.Q1.get());
    this.addItem(this.Q2.get());
    this.addItem(this.Q3.get());
  }
}


export class PedsqlFatigue_8_12 extends Group {
  Header: Header_8_12;
  Q1: Q1_8_12;
  Q2: Q2_8_12;
  Q3: Q3_8_12;

  constructor(parentKey: string, isRequired?: boolean, condition?: Expression) {
    super(parentKey, 'PedsqlFatigue_8_12');

    this.groupEditor.setCondition(condition);

    const required = isRequired !== undefined ? isRequired : false;

    this.Header = new Header_8_12(this.key);
    this.Q1 = new Q1_8_12(this.key, required);
    this.Q2 = new Q2_8_12(this.key, required);
    this.Q3 = new Q3_8_12(this.key, required);
  }

  buildGroup() {
    this.addItem(this.Header.get());
    this.addItem(this.Q1.get());
    this.addItem(this.Q2.get());
    this.addItem(this.Q3.get());
  }
}


export class PedsqlFatigue_13_18 extends Group {
  Header: Header_13_18;
  Q1: Q1_13_18;
  Q2: Q2_13_18;
  Q3: Q3_13_18;

  constructor(parentKey: string, isRequired?: boolean, condition?: Expression) {
    super(parentKey, 'PedsqlFatigue_13_18');

    this.groupEditor.setCondition(condition);

    const required = isRequired !== undefined ? isRequired : false;

    this.Header = new Header_13_18(this.key);
    this.Q1 = new Q1_13_18(this.key, required);
    this.Q2 = new Q2_13_18(this.key, required);
    this.Q3 = new Q3_13_18(this.key, required);
  }

  buildGroup() {
    this.addItem(this.Header.get());
    this.addItem(this.Q1.get());
    this.addItem(this.Q2.get());
    this.addItem(this.Q3.get());
  }
}


class Header_2_4 extends Item {
  markdownContent_G1 = `
# Vermoeidheid
De vragen hieronder zijn voor **een ouder/verzorger**.

Hieronder staat een lijst van dingen die een probleem kunnen zijn voor je kind. Kun je ons vertellen **hoe vaak** je kind in de **afgelopen week** met elk van deze dingen problemen heeft gehad? Vink het cijfer aan dat het beste van toepassing is. Je kunt kiezen uit:
  - **0** als het **nooit** een probleem is
  - **1** als het **bijna nooit** een probleem is
  - **2** als het **soms** een probleem is
  - **3** als het **vaak** een probleem is
  - **4** als het **bijna altijd** een probleem is

Er zijn geen goede of foute antwoorden.

##### Hoe vaak heeft je kind in de **afgelopen week** problemen gehad met:
    `

  constructor(parentKey: string, condition?: Expression) {
    super(parentKey, 'Header');

    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.display({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      content: [
        ComponentGenerators.markdown({
          content: new Map([ // this.isPartOf("Followupflow_Kids") ? this.qTextKids : this.qTextMain,
            ["nl", this.markdownContent_G1],
          ]),
          className: ''
        })
      ]
    })
  }
}


class Header_5_7 extends Item {
  markdownContent_G1 = `
# Vermoeidheid
De vragen hieronder zijn voor **een ouder/verzorger**.

Hieronder staat een lijst van dingen die een probleem kunnen zijn voor je kind. Kun je ons vertellen **hoe vaak** je kind in de **afgelopen week** met elk van deze dingen problemen heeft gehad? Vink het cijfer aan dat het beste van toepassing is. Je kunt kiezen uit:
  - **0** als het **nooit** een probleem is
  - **1** als het **bijna nooit** een probleem is
  - **2** als het **soms** een probleem is
  - **3** als het **vaak** een probleem is
  - **4** als het **bijna altijd** een probleem is

Er zijn geen goede of foute antwoorden.

##### Hoezeer heeft je kind in de **afgelopen week** een probleem gehad met:
    `

  constructor(parentKey: string, condition?: Expression) {
    super(parentKey, 'Header');

    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.display({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      content: [
        ComponentGenerators.markdown({
          content: new Map([ // this.isPartOf("Followupflow_Kids") ? this.qTextKids : this.qTextMain,
            ["nl", this.markdownContent_G1],
          ]),
          className: ''
        })
      ]
    })
  }
}


class Header_8_12 extends Item {
  markdownContent = `
# Vermoeidheid
De vragen hieronder zijn voor een minderjarige. Als een ouder/verzorger helpt met invullen laat dan **je kind zelf** de antwoorden kiezen.

Op deze pagina staat een lijst van dingen die een probleem voor jou kunnen zijn. Kun je ons vertellen **hoe vaak** je in de **afgelopen week** met elk van deze dingen problemen hebt gehad?
Klik het bolletje aan bij:
  - **0** als het **nooit** een probleem is
  - **1** als het **bijna nooit** een probleem is
  - **2** als het **soms** een probleem is
  - **3** als het **vaak** een probleem is
  - **4** als het **bijna altijd** een probleem is

Er zijn geen goede of foute antwoorden.

##### Hoezeer is dit voor jou in de **afgelopen week** een probleem geweest:
`

  constructor(parentKey: string, condition?: Expression) {
    super(parentKey, 'Header');

    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.display({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      content: [
        ComponentGenerators.markdown({
          content: new Map([ // this.isPartOf("Followupflow_Kids") ? this.qTextKids : this.qTextMain,
            ["nl", this.markdownContent],
          ]),
          className: ''
        })
      ]
    })
  }
}


class Header_13_18 extends Item {
  markdownContent = `
# Vermoeidheid
De vragen hieronder zijn voor een minderjarige. Als een ouder/verzorger helpt met invullen laat dan **je kind zelf** de antwoorden kiezen.

Op deze pagina staat een lijst van dingen die een probleem voor jou kunnen zijn. Kun je ons vertellen **hoe vaak** je in de **afgelopen week** met elk van deze dingen problemen hebt gehad?
Klik het bolletje aan bij:
  - **0** als het **nooit** een probleem is
  - **1** als het **bijna nooit** een probleem is
  - **2** als het **soms** een probleem is
  - **3** als het **vaak** een probleem is
  - **4** als het **bijna altijd** een probleem is

Er zijn geen goede of foute antwoorden.

##### Hoezeer is dit voor jou in de **afgelopen week** een probleem geweest:
`

  constructor(parentKey: string, condition?: Expression) {
    super(parentKey, 'Header');

    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.display({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      content: [
        ComponentGenerators.markdown({
          content: new Map([ // this.isPartOf("Followupflow_Kids") ? this.qTextKids : this.qTextMain,
            ["nl", this.markdownContent],
          ]),
          className: ''
        })
      ]
    })
  }
}

const optionHint = ComponentGenerators.markdown({
  content: new Map([['nl', `
0 = Nooit, 1 = Bijna nooit, 2 = Soms, 3 = Vaak, 4 = Bijna altijd
        `]])
});

const scaleOptions = [
  {
    key: '0', content: new Map([
      ["nl", "0"],
    ])
  }, {
    key: '1', content: new Map([
      ["nl", "1"],
    ])
  }, {
    key: '2', content: new Map([
      ["nl", "2"],
    ])
  }, {
    key: '3', content: new Map([
      ["nl", "3"],
    ])
  }, {
    key: '4', content: new Map([
      ["nl", "4"],
    ])
  }
];


class Q1_2_4 extends Item {
  questionTextMain = [
    {
      content: new Map([
        ["nl", "Algemene vermoeidheid (problemen met...)"],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q1');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.responsiveSingleChoiceArray({
      defaultMode: 'horizontal',
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      topDisplayCompoments: [optionHint],
      scaleOptions: scaleOptions,
      rows: [
        {
          key: 'a', content: new Map([
            ["nl", "Moe voelen"],
          ])
        },
        {
          key: 'b',
          content: new Map([
            ["nl", "Lichamelijk zwak voelen (niet sterk)"],
          ])
        },
        {
          key: 'c',
          content: new Map([
            ["nl", "Te moe voelen om dingen te doen die hij/zij leuk vindt"],
          ])
        },
        {
          key: 'd',
          content: new Map([
            ["nl", "Te moe voelen om tijd door te brengen met zijn/haar vrienden"],
          ])
        },
        {
          key: 'e',
          content: new Map([
            ["nl", "Moeite om dingen af te maken"],
          ])
        },
        {
          key: 'f',
          content: new Map([
            ["nl", "Moeite om aan dingen te beginnen"],
          ])
        },
      ]
    })
  }
}


class Q1_5_7 extends Item {
  questionTextMain = [
    {
      content: new Map([
        ["nl", "Algemene vermoeidheid (problemen met...)"],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q1');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.responsiveSingleChoiceArray({
      defaultMode: 'horizontal',
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      topDisplayCompoments: [optionHint],
      scaleOptions: scaleOptions,
      rows: [
        {
          key: 'a', content: new Map([
            ["nl", "Moe voelen"],
          ])
        },
        {
          key: 'b',
          content: new Map([
            ["nl", "Lichamelijk zwak voelen (niet sterk)"],
          ])
        },
        {
          key: 'c',
          content: new Map([
            ["nl", "Te moe voelen om dingen te doen die hij/zij leuk vindt"],
          ])
        },
        {
          key: 'd',
          content: new Map([
            ["nl", "Te moe voelen om tijd door te brengen met zijn/haar vrienden"],
          ])
        },
        {
          key: 'e',
          content: new Map([
            ["nl", "Moeite om dingen af te maken"],
          ])
        },
        {
          key: 'f',
          content: new Map([
            ["nl", "Moeite om aan dingen te beginnen"],
          ])
        },
      ]
    })
  }
}


class Q1_8_12 extends Item {
  questionTextMain = [
    {
      content: new Map([
        ["nl", "Algemene vermoeidheid (problemen met...)"],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q1');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.responsiveSingleChoiceArray({
      defaultMode: 'horizontal',
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      topDisplayCompoments: [optionHint],
      scaleOptions: scaleOptions,
      rows: [
        {
          key: 'a', content: new Map([
            ["nl", "Ik voel me moe"],
          ])
        },
        {
          key: 'b',
          content: new Map([
            ["nl", "Ik voel me lichamelijk zwak (niet sterk)"],
          ])
        },
        {
          key: 'c',
          content: new Map([
            ["nl", "Ik voel me te moe om dingen te doen die ik leuk vind"],
          ])
        },
        {
          key: 'd',
          content: new Map([
            ["nl", "Ik voel me te moe om tijd met mijn vrienden door te brengen"],
          ])
        },
        {
          key: 'e',
          content: new Map([
            ["nl", "Ik vind het lastig dingen af te maken"],
          ])
        },
        {
          key: 'f',
          content: new Map([
            ["nl", "Ik vind het lastig dingen te beginnen"],
          ])
        },
      ]
    })
  }
}


class Q1_13_18 extends Item {
  questionTextMain = [
    {
      content: new Map([
        ["nl", "Algemene vermoeidheid (problemen met...)"],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q1');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.responsiveSingleChoiceArray({
      defaultMode: 'horizontal',
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      topDisplayCompoments: [optionHint],
      scaleOptions: scaleOptions,
      rows: [
        {
          key: 'a', content: new Map([
            ["nl", "Ik voel me moe"],
          ])
        },
        {
          key: 'b',
          content: new Map([
            ["nl", "Ik voel me lichamelijk zwak (niet sterk)"],
          ])
        },
        {
          key: 'c',
          content: new Map([
            ["nl", "Ik voel me te moe om dingen te doen die ik leuk vind"],
          ])
        },
        {
          key: 'd',
          content: new Map([
            ["nl", "Ik voel me te moe om tijd met mijn vrienden door te brengen"],
          ])
        },
        {
          key: 'e',
          content: new Map([
            ["nl", "Ik vind het lastig dingen af te maken"],
          ])
        },
        {
          key: 'f',
          content: new Map([
            ["nl", "Ik vind het lastig dingen te beginnen"],
          ])
        },
      ]
    })
  }
}


class Q2_2_4 extends Item {
  questionTextMain = [
    {
      content: new Map([
        ["nl", "Slaap/Rust vermoeidheid (problemen met...)"],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q2');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.responsiveSingleChoiceArray({
      defaultMode: 'horizontal',
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      topDisplayCompoments: [optionHint],
      scaleOptions: scaleOptions,
      rows: [
        {
          key: 'a', content: new Map([
            ["nl", "Veel slapen"],
          ])
        },
        {
          key: 'b',
          content: new Map([
            ["nl", "Moeite om de nacht door te slapen"],
          ])
        },
        {
          key: 'c',
          content: new Map([
            ["nl", "Moe voelen wanneer hij/zij 's ochtends wakker wordt"],
          ])
        },
        {
          key: 'd',
          content: new Map([
            ["nl", "Veel rusten"],
          ])
        },
        {
          key: 'e',
          content: new Map([
            ["nl", "Veel dutjes doen"],
          ])
        },
        {
          key: 'f',
          content: new Map([
            ["nl", "Veel tijd in bed doorbrengen"],
          ])
        },
      ]
    })
  }
}


class Q2_5_7 extends Item {
  questionTextMain = [
    {
      content: new Map([
        ["nl", "Slaap/Rust vermoeidheid (problemen met...)"],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q2');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.responsiveSingleChoiceArray({
      defaultMode: 'horizontal',
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      topDisplayCompoments: [optionHint],
      scaleOptions: scaleOptions,
      rows: [
        {
          key: 'a', content: new Map([
            ["nl", "Veel slapen"],
          ])
        },
        {
          key: 'b',
          content: new Map([
            ["nl", "Moeite om de nacht door te slapen"],
          ])
        },
        {
          key: 'c',
          content: new Map([
            ["nl", "Moe voelen wanneer hij/zij 's ochtends wakker wordt"],
          ])
        },
        {
          key: 'd',
          content: new Map([
            ["nl", "Veel rusten"],
          ])
        },
        {
          key: 'e',
          content: new Map([
            ["nl", "Veel dutjes doen"],
          ])
        },
        {
          key: 'f',
          content: new Map([
            ["nl", "Veel tijd in bed doorbrengen"],
          ])
        },
      ]
    })
  }
}


class Q2_8_12 extends Item {
  questionTextMain = [
    {
      content: new Map([
        ["nl", "Slaap/Rust vermoeidheid (problemen met...)"],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q2');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.responsiveSingleChoiceArray({
      defaultMode: 'horizontal',
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      topDisplayCompoments: [optionHint],
      scaleOptions: scaleOptions,
      rows: [
        {
          key: 'a', content: new Map([
            ["nl", "Ik slaap veel"],
          ])
        },
        {
          key: 'b',
          content: new Map([
            ["nl", "Het is moeilijk voor me om ‘s nachts door te slapen"],
          ])
        },
        {
          key: 'c',
          content: new Map([
            ["nl", "Ik voel me moe als ik ‘s ochtends wakker word"],
          ])
        },
        {
          key: 'd',
          content: new Map([
            ["nl", "Ik rust veel"],
          ])
        },
        {
          key: 'e',
          content: new Map([
            ["nl", "Ik doe veel dutjes"],
          ])
        },
        {
          key: 'f',
          content: new Map([
            ["nl", "Ik breng veel tijd door in bed"],
          ])
        },
      ]
    })
  }
}


class Q2_13_18 extends Item {
  questionTextMain = [
    {
      content: new Map([
        ["nl", "Slaap/Rust vermoeidheid (problemen met...)"],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q2');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.responsiveSingleChoiceArray({
      defaultMode: 'horizontal',
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      topDisplayCompoments: [optionHint],
      scaleOptions: scaleOptions,
      rows: [
        {
          key: 'a', content: new Map([
            ["nl", "Ik slaap veel"],
          ])
        },
        {
          key: 'b',
          content: new Map([
            ["nl", "Het is moeilijk voor me om ‘s nachts door te slapen"],
          ])
        },
        {
          key: 'c',
          content: new Map([
            ["nl", "Ik voel me moe als ik ‘s ochtends wakker word"],
          ])
        },
        {
          key: 'd',
          content: new Map([
            ["nl", "Ik rust veel"],
          ])
        },
        {
          key: 'e',
          content: new Map([
            ["nl", "Ik doe veel dutjes"],
          ])
        },
        {
          key: 'f',
          content: new Map([
            ["nl", "Ik breng veel tijd door in bed"],
          ])
        },
      ]
    })
  }
}


class Q3_2_4 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", "Cognitieve vermoeidheid (problemen met...)"],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q3');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.responsiveSingleChoiceArray({
      defaultMode: 'horizontal',
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      topDisplayCompoments: [optionHint],
      scaleOptions: scaleOptions,
      rows: [
        {
          key: 'a', content: new Map([
            ["nl", "Moeite om zijn/haar aandacht bij dingen te houden"],
          ])
        },
        {
          key: 'b',
          content: new Map([
            ["nl", "Moeite om te onthouden wat mensen hem/haar vertellen"],
          ])
        },
        {
          key: 'c',
          content: new Map([
            ["nl", "Moeite om te onthouden wat hij/zij net gehoord heeft"],
          ])
        },
        {
          key: 'd',
          content: new Map([
            ["nl", "Moeite met snel denken"],
          ])
        },
        {
          key: 'e',
          content: new Map([
            ["nl", "Moeite te onthouden waar hij/zij net aan dacht"],
          ])
        },
        {
          key: 'f',
          content: new Map([
            ["nl", "Moeite om meer dan één ding tegelijk te onthouden"],
          ])
        },
      ]
    })
  }
}


class Q3_5_7 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", "Cognitieve vermoeidheid (problemen met...)"],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q3');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.responsiveSingleChoiceArray({
      defaultMode: 'horizontal',
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      topDisplayCompoments: [optionHint],
      scaleOptions: scaleOptions,
      rows: [
        {
          key: 'a', content: new Map([
            ["nl", "Moeite om zijn/haar aandacht bij dingen te houden"],
          ])
        },
        {
          key: 'b',
          content: new Map([
            ["nl", "Moeite om te onthouden wat mensen hem/haar vertellen"],
          ])
        },
        {
          key: 'c',
          content: new Map([
            ["nl", "Moeite om te onthouden wat hij/zij net gehoord heeft"],
          ])
        },
        {
          key: 'd',
          content: new Map([
            ["nl", "Moeite met snel denken"],
          ])
        },
        {
          key: 'e',
          content: new Map([
            ["nl", "Moeite te onthouden waar hij/zij net aan dacht"],
          ])
        },
        {
          key: 'f',
          content: new Map([
            ["nl", "Moeite om meer dan één ding tegelijk te onthouden"],
          ])
        },
      ]
    })
  }
}


class Q3_8_12 extends Item {
  questionTextMain = [
    {
      content: new Map([
        ["nl", "Cognitieve vermoeidheid (problemen met...)"],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q3');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.responsiveSingleChoiceArray({
      defaultMode: 'horizontal',
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      topDisplayCompoments: [optionHint],
      scaleOptions: scaleOptions,
      rows: [
        {
          key: 'a', content: new Map([
            ["nl", "Ik heb moeite mijn aandacht bij dingen te houden"],
          ])
        },
        {
          key: 'b',
          content: new Map([
            ["nl", "Het is moeilijk voor me te onthouden wat mensen me vertellen"],
          ])
        },
        {
          key: 'c',
          content: new Map([
            ["nl", "Het is moeilijk voor me te onthouden wat ik net gehoord heb"],
          ])
        },
        {
          key: 'd',
          content: new Map([
            ["nl", "Het is moeilijk voor me om snel te denken"],
          ])
        },
        {
          key: 'e',
          content: new Map([
            ["nl", "Ik vind het lastig om te onthouden waar ik net aan dacht"],
          ])
        },
        {
          key: 'f',
          content: new Map([
            ["nl", "Ik vind het lastig om meer dan één ding tegelijk te onthouden"],
          ])
        },
      ]
    })
  }
}


class Q3_13_18 extends Item {
  questionTextMain = [
    {
      content: new Map([
        ["nl", "Cognitieve vermoeidheid (problemen met...)"],
      ]),
    }
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'Q3');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.responsiveSingleChoiceArray({
      defaultMode: 'horizontal',
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain,
      topDisplayCompoments: [optionHint],
      scaleOptions: scaleOptions,
      rows: [
        {
          key: 'a', content: new Map([
            ["nl", "Ik heb moeite mijn aandacht bij dingen te houden"],
          ])
        },
        {
          key: 'b',
          content: new Map([
            ["nl", "Het is moeilijk voor me te onthouden wat mensen me vertellen"],
          ])
        },
        {
          key: 'c',
          content: new Map([
            ["nl", "Het is moeilijk voor me te onthouden wat ik net gehoord heb"],
          ])
        },
        {
          key: 'd',
          content: new Map([
            ["nl", "Het is moeilijk voor me om snel te denken"],
          ])
        },
        {
          key: 'e',
          content: new Map([
            ["nl", "Ik vind het lastig om te onthouden waar ik net aan dacht"],
          ])
        },
        {
          key: 'f',
          content: new Map([
            ["nl", "Ik vind het lastig om meer dan één ding tegelijk te onthouden"],
          ])
        },
      ]
    })
  }
}
