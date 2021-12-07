import { Expression } from 'survey-engine/lib/data_types';
import { Group, Item } from 'case-editor-tools/surveys/types';
import { SurveyItems } from 'case-editor-tools/surveys';
import { ComponentGenerators } from 'case-editor-tools/surveys/utils/componentGenerators';





export class Followup extends Group {

    //TODO: tick bite report intro question and condition
    //TODO: intro text (different than EM/Lyme groups)

    Q1: NewTB;
    


    constructor(parentKey: string,isRequired?: boolean, condition?: Expression) {
        super(parentKey, 'FollowupG');

        this.groupEditor.setCondition(condition);
    
        const required = isRequired !== undefined ? isRequired : false;

        this.Q1 = new NewTB(this.key, required);

    }

    
    buildGroup() {

        this.addItem(this.Q1.get());
    }

}



class Text1FU extends Item{

    markdownContent = `
    De volgende vragen gaan over mogelijke tekenbeten opgelopen sinds het invullen van de vorige vragenlijst 3 maanden geleden.
    `
  
    constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
      super(parentKey, 'Text1FU');
  
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
                  ["nl", this.markdownContent],
              ]),
              className: ''
          })
      ]
      })
    }
  }
  
  


class NewTB extends Item {

    optionKeys = {
        nameOfOption: 'b'
     }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'NewTB');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Heb je sinds je de vorige vragenlijst 3 maanden geleden invulde nieuwe tekenbeten opgemerkt?'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Nee, sindsdien heb ik geen tekenbeten opgemerkt"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Ja"],
          ])
        },
      ]
    })
  }
}


class ReportedTB2 extends Item {

    optionKeys = {
        nameOfOption: 'a'
     }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'RepTB2');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Heb je al deze nieuwe tekenbeten gemeld via je account op tekenradar.nl?'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Nee"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Ja"],
          ])
        },
      ]
    })
  }
}


class FeverFU1 extends Item {

    optionKeys = {
        nameOfOption: 'a'
     }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'FFU1');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Heb je in de periode na de tekenbeet koorts gehad?'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Ja"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Nee"],
          ])
        },
      ]
    })
  }
}

class FeverFU2 extends Item {

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'FFU2');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.multilineTextInput({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Op welke dagen heb je koorts gehad en hoeveel graden was de koorts?'],
      ]),
      
    })
  }
}


class Text2FU extends Item{

    markdownContent = `
    De volgende vragen gaan over **nieuwe** uitingen van de ziekte van Lyme die bij jou ontstaan zijn sinds het invullen van de vorige vragenlijst 3 maanden geleden. 
    `
  
    constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
      super(parentKey, 'Text2FU');
  
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
                  ["nl", this.markdownContent],
              ]),
              className: ''
          })
      ]
      })
    }
  }


class LymeFU extends Item {

    optionKeys = {
        nameOfOption: 'b'
     }

  constructor(parentKey: string, isRequired: boolean, condition?: Expression) {
    super(parentKey, 'LFU');

    this.isRequired = isRequired;
    this.condition = condition;
  }

  buildItem() {
    return SurveyItems.singleChoice({
      parentKey: this.parentKey,
      itemKey: this.itemKey,
      isRequired: this.isRequired,
      condition: this.condition,
      questionText: new Map([
        ['nl', 'Heeft een arts bij jou een nieuwe vorm van de ziekte van Lyme vastgesteld in de afgelopen 3 maanden? (bijvoorbeeld een nieuwe erythema migrans of  andere ziekte van Lyme)?'],
      ]),
      responseOptions: [
        {
          key: 'a', role: 'option',
          content: new Map([
            ["nl", "Nee"],
          ])
        },
        {
          key: 'b', role: 'option',
          content: new Map([
            ["nl", "Ja"],
          ])
        },
      ]
    })
  }
}
