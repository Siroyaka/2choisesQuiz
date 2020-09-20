import { QuizResultTypes } from './types';
import { Choise2Result } from 'lib/makeQuiz';

export const viewResult = (result: Choise2Result) => ({
  type: QuizResultTypes.VIEWRESULT as QuizResultTypes.VIEWRESULT,
  result,
});

export const initializeResult = () => ({
  type: QuizResultTypes.INITIALIZE as QuizResultTypes.INITIALIZE
})

export type ActionTypes =
  ReturnType<typeof viewResult> |
  ReturnType<typeof initializeResult>;