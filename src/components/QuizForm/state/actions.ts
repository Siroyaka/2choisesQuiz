import { QuizActionTypes } from './types';

export const answerQuiz = (choises: 'A' | 'B' | 'N') => ({
  type: QuizActionTypes.ANSWER as QuizActionTypes.ANSWER,
  choises
});

export const timeoverQuiz = () => ({
  type: QuizActionTypes.TIMEOVER as QuizActionTypes.TIMEOVER
});

export const initialize = () => ({
  type: QuizActionTypes.INITIALIZE as QuizActionTypes.INITIALIZE
})

export type ActionResultTypes =
  ReturnType<typeof answerQuiz> |
  ReturnType<typeof timeoverQuiz> |
  ReturnType<typeof initialize>;
