import { Reducer } from 'react';

import { QuizInfo } from 'lib/makeQuiz';
import { QuizResultTypes } from './types';
import { ActionTypes } from './actions';

export interface OwnState {
  isFinished: boolean,
  quizResult: boolean[],
  quizInfo: QuizInfo[],
}

export const initialState: OwnState = {
  isFinished: false,
  quizResult: [],
  quizInfo: [],
}

type State = OwnState;

const reducer: Reducer<State, ActionTypes> = (state, action) => {
  switch (action.type) {
    case QuizResultTypes.INITIALIZE: {
      return initialState;
    }
    case QuizResultTypes.VIEWRESULT: {
      const newState = {...state};
      newState.quizInfo = action.infos;
      newState.quizResult = action.result;
      newState.isFinished = true;
      return newState;
    }
    default: {
      return initialState;
    }
  }
}

export default reducer;