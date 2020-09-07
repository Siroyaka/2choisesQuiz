import { ActionResultTypes as ActionTypes, answerQuiz, timeoverQuiz } from './actions';
import reducer, { OwnState as State } from './reducers';
export { QuizActionTypes } from './types';

export type QuizState = State;
export const quizReducer = reducer;
export type QuizResultTypes = ActionTypes;

export {
  answerQuiz,
  timeoverQuiz,
}