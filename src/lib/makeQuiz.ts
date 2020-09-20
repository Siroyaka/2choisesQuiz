import { IQuestion, IQuestionResult } from 'lib/IQuestion';

export class Auto2ChoiseQuizInfo implements IQuestion<number> {
  id = ''
  choiseLength = 2

  private choises: string[];
  private quiz: string;
  private choisesValue: number[];
  private explanation: string;

  constructor(id: string, quiz: string, choise: {A: string, B: string}, collectChoise: 'A' | 'B', explanation?: string) {
    this.id = id;
    this.quiz = quiz;
    this.choises = [choise.A, choise.B];
    this.choisesValue = collectChoise === 'A' ? [1, 0] : [0, 1];
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

export type Choise2Result = {
  total: number,
  collect: number,
  allChoises: number[],
  hasWrongValue: boolean,
}

export class Auto2ChoiseQuizResult implements IQuestionResult<number, Choise2Result> {
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

  appendChoiseValue(choiseValue: number, choise: number) {
    this.answeredCount += 1;
    this.collect += choiseValue;
    if(choiseValue != 1) this.hasWrongValue = true;
    this.results.push(choise);
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

export type QuizProps<T1, T2> = {questions: readonly IQuestion<T1>[], results: IQuestionResult<T1, T2>};

export type Choise2Quiz = (questionNumber: number) => IQuestion<number>;

export const makeQuiz: Choise2Quiz = (questionNumber) => {
  const id = (questionNumber) + '_testQuiz';
  const choiseValues = {A: 'A', B: 'B'};

  let quiz = '';
  let answer: 'A' | 'B' = 'A';
  const i = Math.round(Math.random());
  if(i === 1) {
    answer = 'A';
    quiz = 'Aが正解の問題です。';
  } else {
    answer = 'B';
    quiz = 'Bが正解の問題です。';
  }

  const info = new Auto2ChoiseQuizInfo(
    id,
    quiz,
    choiseValues,
    answer,
    `${answer}を選べば正解です。`
  );

  return info;
}

const randomAorB = (id: string, quiz: string, answerValue: string, wrongValue: string) => {
  const i = Math.round(Math.random());
  let answer: 'A' | 'B';
  let choiseValues: {A: string, B: string};
  if(i === 1) {
    answer = 'A';
    choiseValues = {A: answerValue, B: wrongValue};
  } else {
    answer = 'B';
    choiseValues = {B: answerValue, A: wrongValue};
  }

  const info = new Auto2ChoiseQuizInfo(
    id,
    quiz,
    choiseValues,
    answer,
    `${answer}を選べば正解です。`
  );

  return info;
}

//export const makeAddQuiz = (digits: number) => (props: QuizProps<number>) => {
//  const id = (questionNumber) + '_';
//  let maxValue = 0;
//  for(let i = 0; i < digits; i++) {
//    maxValue += (Math.pow(10, i) * 9);
//  }
//  const valueA = Math.round(Math.random() * maxValue);
//  const valueB = Math.round(Math.random() * maxValue);
//  const quiz = valueA + '+' + valueB + '=?';
//  const answerValue = valueA + valueB;
//  const addValue = Math.round(Math.random() * 20);
//  const wrongValue = answerValue + (addValue === 10 ? addValue - 10 : 11);
//  return randomAorB(id, quiz, answerValue + '', wrongValue)
//}

//export const makeMulQuiz = (digits: number) => (props: QuizProps<number>) => {
//  const id = (questionNumber) + '_';
//  let maxValue = 0;
//  for(let i = 0; i < digits; i++) {
//    maxValue += (Math.pow(10, i) * 9);
//  }
//  const valueA = Math.round(Math.random() * maxValue);
//  const valueB = Math.round(Math.random() * maxValue);
//  const quiz = valueA + ' × ' + valueB + ' = ?';
//  const answerValue = valueA * valueB;
//  const addValue = Math.round(Math.random() * 20) * Math.pow(10, digits - 2);
//  const wrongValue = answerValue + (addValue === 10 ? addValue - 10 : 11);
//  return randomAorB(id, quiz, answerValue + '', wrongValue)
//}

export const make1MulQuiz: Choise2Quiz = (questionNumber) => {
  const id = (questionNumber) + '_1MulQuiz';
  let maxValue = 8;
  const valueA = Math.round(Math.random() * maxValue) + 1;
  const valueB = Math.round(Math.random() * maxValue) + 1;
  const quiz = valueA + ' × ' + valueB + ' = ?';
  const answerValue = valueA * valueB;
  const randomNum = Math.round(Math.random() * 6);
  let wrongValue = '';
  switch(randomNum) {
    case 0: {
      wrongValue = (answerValue + 1) + ''
      break;
    }
    case 1: {
      if(answerValue < 10) {
        wrongValue = (answerValue + 2) + '';
        break;
      }
      const a = Math.floor(answerValue / 10);
      const b = answerValue - a * 10;
      wrongValue = (a + (b * 10)) + ''
      break;
    }
    case 2: {
      wrongValue = (answerValue + valueB) + ''
      break;
    }
    case 3: {
      wrongValue = (answerValue - valueB) + ''
      break;
    }
    case 4: {
      wrongValue = (answerValue + valueA) + ''
      break;
    }
    case 5: {
      wrongValue = (answerValue - valueA) + ''
      break;
    }
    case 6: {
      wrongValue = (answerValue - 1) + ''
      break;
    }
  }
  return randomAorB(id, quiz, answerValue + '', wrongValue)
}

const pi100 = '1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679';

// 100桁まで作れる
export const makePieQuiz = (questionNumber: number) => {
  const id = (questionNumber) + '_PieQuiz';
  const resDigits = questionNumber - 1;
  const answerValue = parseInt(pi100[resDigits]);
  const wrongAdd = Math.floor(Math.random() * 9) + 1;
  const wrongValue = (answerValue + wrongAdd) % 10;
  const quiz = `円周率は3.` + (resDigits > 0 ? pi100.substr(0, resDigits) : '') + '?';
  return randomAorB(id, quiz, answerValue + '', wrongValue + '');
}