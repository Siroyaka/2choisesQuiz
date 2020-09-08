import { QuizActionTypes } from './types';
import next from 'next';
import { stringify } from 'querystring';

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

export const nextQuestion = (question: string, answer: 'A' | 'B', choises: {A: string, B: string}) => ({
  type: QuizActionTypes.NEXTQUESTION as QuizActionTypes.NEXTQUESTION,
  question,
  answer,
  choises
})

export type ActionResultTypes =
  ReturnType<typeof answerQuiz> |
  ReturnType<typeof timeoverQuiz> |
  ReturnType<typeof nextQuestion> |
  ReturnType<typeof initialize>;
