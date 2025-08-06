import { Expression } from 'survey-engine/data_types';
import { Item } from 'case-editor-tools/surveys/types';
import { SurveyItems } from 'case-editor-tools/surveys';


export class ChronicLymeDiagnosis1 extends Item {


  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Welke klachten door de ziekte van Lyme heb/had je?'],
      ]),
      className: "row"
    },
    {
      content: new Map([
        ["nl", "Geef hier een beknopte beschrijving van je  klachten, sinds wanneer je hier last van hebt en of dit dagelijks of periodiek is. Geef ook aan of je er op dit moment nog steeds last van hebt."],
      ]),
      className: "row"
    },
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'CLD1');

    this.isRequired = isRequired;
    this.condition = condition;
  }
  //TODO: size of text input field?
  buildItem() {
    return SurveyItems.multilineTextInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain
    })
  }
}


export class ChronicLymeDiagnosis2 extends Item {

  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Hoe is er vastgesteld dat de klachten veroorzaakt worden door de ziekte van Lyme?'],
      ]),
      className: "row"
    },
    {
      content: new Map([
        ["nl", "Geef hier een beknopte beschrijving van het onderzoek dat gedaan is om tot de diagnose te komen, bijvoorbeeld een ruggeprik, huidbiopt of bloedafname. Noem als je het weet ook precies welke test is uitgevoerd, bijvoorbeeld een PCR, ELISA of Lymfocyten transformatie test (LTT)."],
      ]),
      className: "row"
    },
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'CLD2');

    this.isRequired = isRequired;
    this.condition = condition;
  }
  //TODO: size of text input field?
  buildItem() {
    return SurveyItems.multilineTextInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain
    })
  }
}


export class ChronicLymeTherapy1 extends Item {


  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Hoe ben je behandeld voor de ziekte van Lyme?'],
      ]),
      className: "row"
    },
    {
      content: new Map([
        ["nl", "Geef hier de behandelmethode, bijvoorbeeld en antibioticakuur, de startdatum van de behandeling en de duur van de behandeling  aan."],
      ]),
      className: "row"
    },
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'CLT1');

    this.isRequired = isRequired;
    this.condition = condition;
  }
  //TODO: size of text input field?
  buildItem() {
    return SurveyItems.multilineTextInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain
    })
  }
}


export class ChronicLymeTherapy2 extends Item {


  questionTextMain = [
    {
      content: new Map([
        ["nl", 'Is er bij jou ooit eerder een erythema migrans of een andere vorm van lymeziekte vastgesteld?'],
      ]),
      className: "row"
    },
    {
      content: new Map([
        ["nl", "Beschrijf hier of je eerder ook de ziekte van Lyme hebt gehad, of /hoe je hiervoor behandeld bent en of je toen helemaal genezen bent. Of beschrijf de klachten die je na de behandeling bleef houden."],
      ]),
      className: "row"
    },
  ]

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'CLT2');

    this.isRequired = isRequired;
    this.condition = condition;
  }
  //TODO: size of text input field?
  buildItem() {
    return SurveyItems.multilineTextInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: this.questionTextMain
    })
  }
}

