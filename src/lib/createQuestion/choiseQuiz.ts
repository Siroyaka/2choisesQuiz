import { IQuestion, IQuestionResult } from 'lib/IQuestion';

export class QuestionInfo implements IQuestion<number> {
  id = '';
  choiseLength = 0;

  private choises: string[];
  private quiz: string;
  private choisesValue: number[];
  private explanation: string;

  constructor(id: string, quiz: string, choise: string[], collectIndex: number, explanation?: string) {
    this.id = id;
    this.quiz = quiz;
    this.choises = choise;
    this.choiseLength = choise.length;
    this.choisesValue = choise.map((_, i) => i === collectIndex ? 1 : 0);
    this.explanation = explanation ?? '';
  }

  getQuestion() {
    return this.quiz;
  }
  getChoises() {
    return this.choises;
  }
  getExplanation() {
    return this.explanation;
  }
  getChoisesValue() {
    return this.choisesValue;
  }
  getFailureValue() {
    return 0;
  }
}

export type ResultData = {
  total: number,
  collect: number,
  allChoises: number[],
  hasWrongValue: boolean,
}

export class QuestionResult implements IQuestionResult<number, ResultData> {
  private total: number;
  private collect: number;
  private results: number[];
  private hasWrongValue: boolean;
  answeredCount: number;

  constructor(total: number) {
    this.total = total;
    this.results = [];
    this.collect = 0;
    this.hasWrongValue = false;
    this.answeredCount = 0;
  }

  appendChoiseValue(choiseValue: number, choiseIndex: number) {
    this.answeredCount += 1;
    this.collect += choiseValue;
    if(choiseValue != 1) this.hasWrongValue = true;
    this.results.push(choiseIndex);
  }

  readResult() {
    return {
      total: this.total,
      collect: this.collect,
      allChoises: this.results,
      hasWrongValue: this.hasWrongValue,
    }
  }
}

export type Quiz = (questionNumber: number) => IQuestion<number>;

// 2択から8択までのランダムなクイズを作成する
export const makeTestQuiz: Quiz = (questionNumber) => {
  const id = (questionNumber) + '_testQuiz';
  const len = Math.floor(Math.random() * 7) + 2;
  const choises = [];
  for(let i = 0; i < len; i++) {
    choises.push(String.fromCharCode(65 + i));
  }
  const collectNum = Math.floor(Math.random() * len);
  const collectValue = choises[collectNum];
  choises.splice(collectNum, 1);

  const quiz = `正解は${collectValue}です。`;
  const randomCollect = createRamdomCollect(collectValue, choises);

  return new QuestionInfo(id, quiz, randomCollect.choise, randomCollect.collectIndex);
}

const createRamdomCollect = (collectValue: string, wrongValues: string[]) => {
  const choiseLength = wrongValues.length + 1;
  const collectIndex = Math.floor(Math.random() * choiseLength);
  const spliceValues = [];

  for(let i = 0; i < choiseLength; i++) {
    if(collectIndex === i){
      spliceValues.push(collectValue);
      continue;
    }
    const target = Math.floor(Math.random() * wrongValues.length);
    const value = wrongValues[target];
    spliceValues.push(value);
    wrongValues.splice(target, 1);
  }

  return({
    collectIndex: collectIndex,
    choise: spliceValues
  })
}

// 1桁の掛け算の4択問題を作成する
export const make1MulQuiz = (choiseLength: number): Quiz => (questionNumber) => {
  const id = (questionNumber) + '_1MulQuiz';
  let maxValue = 8;
  const valueA = Math.round(Math.random() * maxValue) + 1;
  const valueB = Math.round(Math.random() * maxValue) + 1;
  const quiz = valueA + ' × ' + valueB + ' = ?';
  const collect = valueA * valueB;
  const wrongValues = [];
  for(let i = 0; i < choiseLength - 1; i++) {
    const randomNum = Math.round(Math.random() * 6);
    let wrongValue = '';
    switch(randomNum) {
      case 0: {
        wrongValue = (collect + 1) + ''
        break;
      }
      case 1: {
        if(collect < 10) {
          wrongValue = (collect + 2) + '';
          break;
        }
        const a = Math.floor(collect / 10);
        const b = collect - a * 10;
        wrongValue = (a + (b * 10)) + ''
        break;
      }
      case 2: {
        wrongValue = (collect + valueB) + ''
        break;
      }
      case 3: {
        wrongValue = (collect - valueB) + ''
        break;
      }
      case 4: {
        wrongValue = (collect + valueA) + ''
        break;
      }
      case 5: {
        wrongValue = (collect - valueA) + ''
        break;
      }
      case 6: {
        wrongValue = (collect - 1) + ''
        break;
      }
    }
    wrongValues.push(wrongValue);
  }
  const randomCollect = createRamdomCollect(collect + '', wrongValues);

  return new QuestionInfo(id, quiz, randomCollect.choise, randomCollect.collectIndex);
}

const pi100 = '1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679';

// 100桁まで作れる
export const makePieQuiz = (questionNumber: number) => {
  const id = (questionNumber) + '_PieQuiz';
  const resDigits = questionNumber - 1;
  const collect = parseInt(pi100[resDigits]);
  const wrongAdd = Math.floor(Math.random() * 9) + 1;
  const wrongValue = (collect + wrongAdd) % 10;
  const quiz = `円周率は3.` + (resDigits > 0 ? pi100.substr(0, resDigits) : '') + '?';
  const randomCollect = createRamdomCollect(collect + '', [wrongValue + '']);

  return new QuestionInfo(id, quiz, randomCollect.choise, randomCollect.collectIndex);
}
