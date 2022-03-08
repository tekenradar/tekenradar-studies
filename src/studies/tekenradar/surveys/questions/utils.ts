import { ClozeItemTypes, SingleChoiceOptionTypes } from "case-editor-tools/surveys";
import { OptionDef } from "case-editor-tools/surveys/types";




export function clozeItemDropdownHours(optionKey: string): OptionDef {
  const ddVal =  ClozeItemTypes.dropDown({
    key: optionKey, options: [
      SingleChoiceOptionTypes.option('0', new Map([['nl', "00"]])),
      SingleChoiceOptionTypes.option('1', new Map([['nl', "01"]])),
      SingleChoiceOptionTypes.option('2', new Map([['nl', "02"]])),
      SingleChoiceOptionTypes.option('3', new Map([['nl', "03"]])),
      SingleChoiceOptionTypes.option('4', new Map([['nl', "04"]])),
      SingleChoiceOptionTypes.option('5', new Map([['nl', "05"]])),
      SingleChoiceOptionTypes.option('6', new Map([['nl', "06"]])),
      SingleChoiceOptionTypes.option('7', new Map([['nl', "07"]])),
      SingleChoiceOptionTypes.option('8', new Map([['nl', "08"]])),
      SingleChoiceOptionTypes.option('9', new Map([['nl', "09"]])),
      SingleChoiceOptionTypes.option('10', new Map([['nl', "10"]])),
      SingleChoiceOptionTypes.option('11', new Map([['nl', "11"]])),
      SingleChoiceOptionTypes.option('12', new Map([['nl', "12"]])),
      SingleChoiceOptionTypes.option('13', new Map([['nl', "13"]])),
      SingleChoiceOptionTypes.option('14', new Map([['nl', "14"]])),
      SingleChoiceOptionTypes.option('15', new Map([['nl', "15"]])),
      SingleChoiceOptionTypes.option('16', new Map([['nl', "16"]])),
      SingleChoiceOptionTypes.option('17', new Map([['nl', "17"]])),
      SingleChoiceOptionTypes.option('18', new Map([['nl', "18"]])),
      SingleChoiceOptionTypes.option('19', new Map([['nl', "19"]])),
      SingleChoiceOptionTypes.option('20', new Map([['nl', "20"]])),
      SingleChoiceOptionTypes.option('21', new Map([['nl', "21"]])),
      SingleChoiceOptionTypes.option('22', new Map([['nl', "22"]])),
      SingleChoiceOptionTypes.option('23', new Map([['nl', "23"]])),
      SingleChoiceOptionTypes.option('24', new Map([['nl', "24"]])),
    ]
  })
  return ddVal
}
