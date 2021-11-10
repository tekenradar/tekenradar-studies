import { Group } from 'case-editor-tools/surveys/types';
import { Q1 } from "./exampleQuestions"


export class G1 extends Group {
  // 1:
  Q1: Q1;

  // 2:
  constructor(parentKey: string) {
    super(parentKey, 'G1')

    this.Q1 = new Q1(this.key, true);
  }

  // 3:
  buildGroup() {
    this.addItem(this.Q1.get())
  }
}
