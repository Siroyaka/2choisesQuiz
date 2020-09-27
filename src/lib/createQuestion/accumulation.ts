import { IQuestion, IQuestionResult } from 'lib/IQuestion';

export class AccumulationInfo implements IQuestion<{name: string, value: number}> {
  id = '';
  choiseLength = 0;

  constructor(id: string, question: string, ) {
    this.id = id;
    this.choiseLength = 4;
  }
  getQuestion() {
    return '';
  }
  getChoises() {
    return [];
  }
  getExplanation() {
    return '';
  }
  getChoisesValue(index: number) {
    return null
    
  }
  getFailureValue() {
    return {
      name: '',
      value: 0
    };
  }
}

type NameValue = {
  name: string,
  value: number
}

export type ResultData = {
  valueNames: string[],
  values: number[],
}

export class AccumulationResult implements IQuestionResult<NameValue, ResultData> {
  answeredCount: number;

  private valueNames: string[];
  private values: number[];

  constructor(names: string[], initialValues: number[]) {
    this.valueNames = [...names];
    this.values = [...initialValues];
  }

  appendChoiseValue(choiseValue: NameValue) {
    const index = this.valueNames.findIndex(x => x === choiseValue.name);
    this.values[index] += choiseValue.value;
  }

  readResult() {
    return {
      valueNames: this.valueNames,
      values: this.values
    };
  }
}