import { IQuestionContents, IAnswerCollector } from 'lib/IQuestion';

export class AccumulationInfo implements IQuestionContents<NameValue> {
  id = '';
  choiseLength = 0;

  private question: string;
  private choises: string[];
  private choiseValues: NameValue[];

  constructor(id: string, question: string, choises: string[], choiseValues: NameValue[]) {
    this.id = id;
    this.choiseLength = choises.length;
    this.question = question;
    this.choises = [...choises];
    this.choiseValues = [...choiseValues];
  }

  getQuestion() {
    return this.question;
  }

  getChoises() {
    return this.choises;
  }
  
  getChoisesValue(choise: number[]) {
    return this.choiseValues[choise[0]];
  }

  getFailureValue() {
    return {
      name: null,
      value: 0
    };
  }
}

export type NameValue = {
  name: string,
  value: number
}

export type ResultData = {
  readonly answeredCount: number,
  readonly results: {name: string, value: number}[],
}

export class AccumulationResult implements IAnswerCollector<NameValue, ResultData> {
  answeredCount: number;

  private valueNames: string[];
  private values: number[];

  constructor(names: string[], initialValues: number[]) {
    this.answeredCount = 0;
    this.valueNames = [...names];
    this.values = [...initialValues];
  }

  appendChoiseValue(choiseValue: NameValue) {
    this.answeredCount += 1;
    const index = this.valueNames.findIndex(x => x === choiseValue.name);
    if(index < 0) return;
    this.values[index] += choiseValue.value;
  }

  readResult() {
    const result = this.valueNames.map((x, i) => ({name: x, value: this.values[i]}));
    return {
      answeredCount: this.answeredCount,
      results: result
    };
  }
}

export type QuestionSource = {questionNumber: number, results: ResultData};

export type Question = (source: QuestionSource) => IQuestionContents<NameValue>;

export const makeTestAccumulations: Question = (source) => {
  const id = `${source.questionNumber}_testQuiz`;

  const testSeedValues: SeedValue[] = [
    {
      max: 5,
      min: 1,
      name: '体力',
    },
    {
      max: 5,
      min: 1,
      name: '精神',
    },
    {
      max: 3,
      min: 1,
      name: '攻撃力'
    },
    {
      max: 3,
      min: 1,
      name: '防御力'
    },
    {
      max: 3,
      min: 1,
      name: '運'
    }
  ]

  const testValues = makeRandomAccumulations(testSeedValues)(source);
  return testValues;
}

const defaultGetDisplayTexts = (nameValues: NameValue[], results: ResultData) => {
  const d = results.results.reduce((acc, x) => acc + `${x.name}: ${x.value} \n`, '')
  return d;
}

export type SeedValue = {
  max: number,
  name: string,
  min?: number,
  viewValue?: string
}

export const makeRandomAccumulations = (values: SeedValue[], getDisplayTexts?: (NameValues: NameValue[], results: ResultData) => string): Question => (source) => {
  const id = `${source.questionNumber}_accumulation_question`;

  const getRandomValue = (max: number, min?: number) => {
    const range = (max + 1) - (min ?? 0);
    return Math.floor(Math.random() * range) + (min ?? 0);
  }

  const choises: string[] = values.map(x => x.viewValue ?? (x.name + ' UP'));
  const choiseValues: NameValue[] = values.map(x => ({name: x.name, value: getRandomValue(x.max, x.min)}));

  const info = new AccumulationInfo(
    id,
    getDisplayTexts ? getDisplayTexts(choiseValues, source.results) : defaultGetDisplayTexts(choiseValues, source.results),
    choises,
    choiseValues
  )
  return info;
}
