import { ActionResultTypes as ActionTypes, answerQuiz, timeoverQuiz } from './actions';
import reducer from './reducers';
export { getInitialState } from './reducers';
export { QuizActionTypes } from './types';

export const quizReducer = reducer;
export type QuizResultTypes = ActionTypes;

export {
  answerQuiz,
  timeoverQuiz,
}