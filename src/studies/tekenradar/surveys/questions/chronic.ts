import { Expression } from 'survey-engine/lib/data_types';
import { Group, Item } from 'case-editor-tools/surveys/types';
import { SurveyItems, SurveyEngine } from 'case-editor-tools/surveys';
import { TickBiteOtherGroup } from './tickBite';
import { PreviousTickBitesGroup } from './prevTickBites'
import { FormerLymeGroup, LymeDiagnosis1, LymeDiagnosis2 } from './diagnosisTherapy'



export class ChronicGroup extends Group {

    G1_9: TickBiteOtherGroup

    //TODO: Lyme Questions as group in diagnosisTherpay.ts???
    Q10: LymeDiagnosis1;
    Q11: LymeDiagnosis2;

    Q12: ChronicLymeDiagnosis1;
    Q13: ChronicLymeDiagnosis2;
    Q14: ChronicLymeTherapy1;
    Q15: ChronicLymeTherapy2;
     
    G16_17: PreviousTickBitesGroup;



    constructor(parentKey: string) {
        super(parentKey, 'CLG');

        this.G1_9 = new TickBiteOtherGroup(this.key);

        this.Q10 = new LymeDiagnosis1(this.key,false);
        const Q10condition = SurveyEngine.singleChoice.any(this.Q10.key, this.Q10.optionKeys.nameOfOption);
        this.Q11 = new LymeDiagnosis2(this.key,false,Q10condition);

        this.Q12 = new ChronicLymeDiagnosis1(this.key,false);
        this.Q13 = new ChronicLymeDiagnosis2(this.key,false);
        this.Q14 = new ChronicLymeTherapy1(this.key,false);
        this.Q15 = new ChronicLymeTherapy2(this.key,false);

        this.G16_17 = new PreviousTickBitesGroup(this.key);

    }

    buildGroup() {

        this.addItem(this.G1_9.get());

        this.addItem(this.Q10.get());
        this.addItem(this.Q11.get());
        this.addItem(this.Q12.get());
        this.addItem(this.Q13.get());
        this.addItem(this.Q14.get());
        this.addItem(this.Q15.get());
        this.addPageBreak();

        this.addItem(this.G16_17.get());
        this.addPageBreak();


    }
}



class ChronicLymeDiagnosis1 extends Item {

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

  
class ChronicLymeDiagnosis2 extends Item {

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

 
  class ChronicLymeTherapy1 extends Item {

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

 
  class ChronicLymeTherapy2 extends Item {

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

