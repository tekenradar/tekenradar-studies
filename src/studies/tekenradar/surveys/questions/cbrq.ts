import { Expression } from 'survey-engine/data_types';
import { Item, Group } from 'case-editor-tools/surveys/types';
import { SurveyItems } from 'case-editor-tools/surveys';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';

export class CBRQ_Header extends Item {

  markdownContent1 = `
# Opvattingen over klachten

In de voorgaande vragen heeft u aangegeven dat u lichamelijke of psychische klachten heeft. Wij willen graag meer weten over deze klachten. Ook willen we meer weten over de gevolgen van deze klachten voor uw leven. De volgende vragen gaan over hoe u met de klachten omgaat en wat de gevolgen van deze klachten zijn voor uw lichamelijke gezondheid en psychisch welbevinden.


Er zijn geen goede of foute antwoorden.  We zijn geïnteresseerd in uw opvattingen en niet in die van uw naasten of van hulpverleners.


Beantwoord de vragen eerlijk en denk niet te lang na over uw antwoorden `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'CBRQ_Header');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.display({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      content: [
        ComponentGenerators.markdown({
          content: new Map([
            ["nl", this.markdownContent1],
          ]),
          className: ''
        })
      ]
    })
  }
}

export class CBRQGroup1 extends Group {
  questions: Item[];

  constructor(parentKey: string) {
    super(parentKey, 'CBRQGroup1');

    this.questions = [
      new CBRQItem(this.key, 'P185', 'Ik ben bang dat mijn klachten erger worden door lichamelijke inspanning.', true),
      new CBRQItem(this.key, 'P186', 'Lichaamsbeweging vermindert mijn klachten.', true),
      new CBRQItem(this.key, 'P187', 'De veiligste manier om te voorkomen dat mijn klachten erger worden is ervoor te zorgen dat ik geen onnodige activiteiten verricht.', true),
      new CBRQItem(this.key, 'P191', 'Lichamelijke activiteit verergert mijn klachten.', true),
      new CBRQItem(this.key, 'P192', 'Minder doen helpt tegen de klachten.', true),
      new CBRQItem(this.key, 'P195', 'Ik zou lichamelijke inspanning moeten vermijden wanneer ik klachten heb.', true),
      new CBRQItem(this.key, 'P196', 'Ik maak me er zorgen over dat ik blijvend bedlegerig word als gevolg van mijn klachten.', true),
      new CBRQItem(this.key, 'P197', 'Ik denk dat als mijn klachten te erg worden ze nooit meer zullen afnemen.', true),
      new CBRQItem(this.key, 'P198', 'Mijn ziekte is verschrikkelijk en ik word er door overspoeld.', true),
      new CBRQItem(this.key, 'P199', 'Ik zal me nooit meer goed voelen.', true),
      new CBRQItem(this.key, 'P200', 'Wanneer ik klachten heb denk ik er voortdurend aan.', true),
      new CBRQItem(this.key, 'P201', 'Als ik klachten heb maak ik mij hier zorgen over.', true),
      new CBRQItem(this.key, 'P202', 'Als ik klachten heb is het moeilijk om aan iets anders te denken.', true),
      new CBRQItem(this.key, 'P203', 'Ik denk veel aan mijn klachten.', true),
      new CBRQItem(this.key, 'P204', 'Mijn klachten zijn altijd in mijn gedachten aanwezig.', true),
      new CBRQItem(this.key, 'P205', 'Ik besteed veel tijd aan het nadenken over mijn ziekte.', true),
    ];
  }

  buildGroup() {
    this.questions.forEach(question => {
      this.addItem(question.buildItem());
    });
  }
}

class CBRQItem extends Item {
  questionText: Map<string, string>;

  constructor(parentKey: string, itemKey: string, question: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, itemKey);
    this.questionText = new Map([["nl", "Geef aan in hoeverre u het eens of oneens bent met de volgende uitspraken over uw huidige klachten door een bolletje aan te klikken in de kolom. "]]);
    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      questionText: this.questionText,
      responseOptions: [
        { key: 'a', role: 'option', content: new Map([["nl", "in hoge mate mee oneens"]]) },
        { key: 'b', role: 'option', content: new Map([["nl", "mee oneens"]]) },
        { key: 'c', role: 'option', content: new Map([["nl", "niet eens en niet mee oneens"]]) },
        { key: 'd', role: 'option', content: new Map([["nl", "mee eens"]]) },
        { key: 'e', role: 'option', content: new Map([["nl", "in hoge mate mee eens"]]) },
      ]
    });
  }
}

export class CBRQ_Header2 extends Item {

  markdownContent2 = `
# We willen graag weten hoe u op dit moment omgaat met uw klachten. Hieronder worden een aantal verschillende manieren van omgaan met klachten genoemd. `

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'CBRQ_Header2');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.display({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      condition: this.condition,
      content: [
        ComponentGenerators.markdown({
          content: new Map([
            ["nl", this.markdownContent2],
          ]),
          className: ''
        })
      ]
    })
  }
}

export class CBRQGroup2 extends Group {
  questions: Item[];

  constructor(parentKey: string) {
    super(parentKey, 'CBRQGroup2');

    this.questions = [
      new CBRQItem2(this.key, 'P212', 'Ik blijf in bed om mijn klachten onder controle te houden.', true),
      new CBRQItem2(this.key, 'P213', 'Als ik klachten heb ga ik rusten.', true),
      new CBRQItem2(this.key, 'P214', 'Ik heb de neiging om activiteiten te vermijden die mijn klachten verergeren.', true),
      new CBRQItem2(this.key, 'P215', 'Ik slaap overdag om mijn klachten onder controle te houden.', true),
      new CBRQItem2(this.key, 'P216', 'Wanneer ik mij energiek voel heb ik de neiging om te veel te doen.', true),
      new CBRQItem2(this.key, 'P217', 'Ik merk dat ik mijzelf haast om dingen af te maken voordat ik in elkaar stort.', true),
      new CBRQItem2(this.key, 'P218', 'Ik heb de neiging te veel te doen en vervolgens te rusten.', true),
      new CBRQItem2(this.key, 'P219', 'Ik heb de neiging om op een goede dag veel te doen en op een slechte dag te rusten.', true),
      new CBRQItem2(this.key, 'P220', 'Ik ga slapen als ik moe ben om mijn klachten onder controle te houden.', true),
      new CBRQItem2(this.key, 'P221', 'Ik vermijd sociale contacten als ik mij er niet goed genoeg voor voel.', true),
      new CBRQItem2(this.key, 'P222', 'Ik vermijd inspanning om mijn klachten onder controle te houden.', true),
      new CBRQItem2(this.key, 'P223', 'Als het op dingen doen aankomt ben ik iemand van "alles of niets".', true),
      new CBRQItem2(this.key, 'P224', 'Ik vermijd stressvolle situaties.', true),
    ];
  }

  buildGroup() {
    this.questions.forEach(question => {
      this.addItem(question.buildItem());
    });
  }
}


class CBRQItem2 extends Item {
  questionText: Map<string, string>;

  constructor(parentKey: string, itemKey: string, question: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, itemKey);
    this.questionText = new Map([["nl", "Geef aan hoe vaak u op de volgende manieren met klachten omgaat door een kruisje te zetten in het hokje wat op u van toepassing is. Kies het antwoord wat het beste bij U past, niet wat u denkt dat de meeste mensen zouden doen. "]]);
    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      questionText: this.questionText,
      responseOptions: [
        { key: 'a', role: 'option', content: new Map([["nl", "Nooit"]]) },
        { key: 'b', role: 'option', content: new Map([["nl", "Soms"]]) },
        { key: 'c', role: 'option', content: new Map([["nl", "Regelmatig"]]) },
        { key: 'd', role: 'option', content: new Map([["nl", "Vaak"]]) },
        { key: 'e', role: 'option', content: new Map([["nl", "Altijd"]]) },
      ]
    });
  }
}
