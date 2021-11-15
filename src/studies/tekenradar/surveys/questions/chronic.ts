import { Expression } from 'survey-engine/lib/data_types';
import { Item } from 'case-editor-tools/surveys/types';
import { SurveyItems } from 'case-editor-tools/surveys';



export class ChronicLymeDiagnosis1 extends Item {

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
        questionText: new Map([
          ['nl', 'Welke klachten door de ziekte van Lyme heb/had je? Geef hier een beknopte beschrijving van je  klachten, sinds wanneer je hier last van hebt en of dit dagelijks of periodiek is. Geef ook aan of je er op dit moment nog steeds last van hebt.'],
        ]),
      })
    }
  }

  
export class ChronicLymeDiagnosis2 extends Item {

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
        questionText: new Map([
          ['nl', 'Hoe is er vastgesteld dat de klachten veroorzaakt worden door de ziekte van Lyme? Geef hier een beknopte beschrijving van het onderzoek dat gedaan is om tot de diagnose te komen, bijvoorbeeld een ruggeprik, huidbiopt of bloedafname. Noem als je het weet ook precies welke test is uitgevoerd, bijvoorbeeld een PCR, ELISA of Lymfocyten transformatie test (LTT).'],
        ]),
      })
    }
  }

 
  export class ChronicLymeTherapy1 extends Item {

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
        questionText: new Map([
          ['nl', '. Hoe ben je behandeld voor de ziekte van Lyme? Geef hier de behandelmethode, bijvoorbeeld en antibioticakuur, de startdatum van de behandeling en de duur van de behandeling  aan.'],
        ]),
      })
    }
  }

 
  export class ChronicLymeTherapy2 extends Item {

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
        questionText: new Map([
          ['nl', 'Is er bij jou ooit eerder een erythema migrans of een andere vorm van de ziekte van Lyme vastgesteld? Beschrijf hier of je eerder ook de ziekte van Lyme hebt gehad, of /hoe je hiervoor behandeld bent en of je toen helemaal genezen bent. Of beschrijf de klachten die je na de behandeling bleef houden.'],
        ]),
      })
    }
  }

