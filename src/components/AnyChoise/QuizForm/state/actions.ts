import { QuizActionTypes } from './types';
import { IQuestionContents } from 'lib/IQuestion';
import { ChoiseValue } from 'lib/createQuestion/choiseQuiz';

export const answerQuiz = (questionNum: number, answeredValue: number) => ({
  type: QuizActionTypes.ANSWER as QuizActionTypes.ANSWER,
  questionNum,
  answeredValue
});

export const timeoverQuiz = (questionNum: number) => ({
  type: QuizActionTypes.TIMEOVER as QuizActionTypes.TIMEOVER,
  questionNum,
});

export const initialize = () => ({
  type: QuizActionTypes.INITIALIZE as QuizActionTypes.INITIALIZE
})

export const setInterval = () => ({
  type: QuizActionTypes.INTERVAL as QuizActionTypes.INTERVAL,
})

export const nextQuestion = (question: IQuestionContents<ChoiseValue>) => ({
  type: QuizActionTypes.NEXTQUESTION as QuizActionTypes.NEXTQUESTION,
  question: question as IQuestionContents<ChoiseValue>
})

export type ActionResultTypes =
  ReturnType<typeof answerQuiz> |
  ReturnType<typeof timeoverQuiz> |
  ReturnType<typeof nextQuestion> |
  ReturnType<typeof setInterval> |
  ReturnType<typeof initialize>;
