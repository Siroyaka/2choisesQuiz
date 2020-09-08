import { QuizResultTypes } from './types';
import { QuizInfo } from 'lib/makeQuiz'

export const viewResult = (result: boolean[], infos: QuizInfo[]) => ({
  type: QuizResultTypes.VIEWRESULT as QuizResultTypes.VIEWRESULT,
  result,
  infos
});

export const initializeResult = () => ({
  type: QuizResultTypes.INITIALIZE as QuizResultTypes.INITIALIZE
})

export type ActionTypes =
  ReturnType<typeof viewResult> |
  ReturnType<typeof initializeResult>;