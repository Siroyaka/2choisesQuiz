import { Reducer } from 'react';

import { QuizResultTypes } from './types';
import { ActionTypes } from './actions';
import { Choise2Result } from 'lib/makeQuiz';

export const initialState: State = {
  isFinished: false,
  total: 0,
  collect: 0,
  allChoises: [],
  hasWrongValue: false
}

export type State = Choise2Result & {isFinished: boolean};

const reducer: Reducer<State, ActionTypes> = (state, action) => {
  switch (action.type) {
    case QuizResultTypes.INITIALIZE: {
      return initialState;
    }
    case QuizResultTypes.VIEWRESULT: {
      return {
        ...action.result,
        isFinished: true,
      };
    }
    default: {
      return initialState;
    }
  }
}

export default reducer;