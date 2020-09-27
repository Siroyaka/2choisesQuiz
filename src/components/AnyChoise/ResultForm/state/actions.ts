import { QuizResultTypes } from './types';
import { ResultData } from 'lib/createQuestion/choiseQuiz';

export const viewResult = (result: ResultData) => ({
  type: QuizResultTypes.VIEWRESULT as QuizResultTypes.VIEWRESULT,
  result: result as ResultData,
});

export const initializeResult = () => ({
  type: QuizResultTypes.INITIALIZE as QuizResultTypes.INITIALIZE
})

export type ActionTypes =
  ReturnType<typeof viewResult> |
  ReturnType<typeof initializeResult>;