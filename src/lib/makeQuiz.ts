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
