import React from 'react';

import { QuizActionTypes } from './types';
import { ActionResultTypes } from './actions';
import { QuizInfo } from 'lib/makeQuiz';

export interface OwnState {
  isAnswered: boolean,
  isSetQuiz: boolean,
  isInitialize: boolean,
  totalLength: number,
  answeredCount: number,
  quizResult: boolean[],
  quizInfo: QuizInfo[],
  viewingQuiz: string,
  collectValue: 'A' | 'B' | 'N',
  choiseValues: {A: string, B: string},
}

type State = OwnState;

const reducer: React.Reducer<State, ActionResultTypes> = (state, action) => {
  switch (action.type) {
    case QuizActionTypes.ANSWER: {
      const newState = {...state};
      newState.isInitialize = false;
      newState.isSetQuiz = false;
      newState.isAnswered = true;
      newState.answeredCount = newState.answeredCount + 1;
      const quizResult = state.collectValue === action.choises;
      newState.quizResult.push(quizResult);

      return newState;
    }
    case QuizActionTypes.NEXTQUESTION: {
      const newState = {...state};

      // 問題の設定
      newState.collectValue = action.answer;
      newState.choiseValues = action.choises;
      newState.viewingQuiz = action.question;
      const collectValue = action.answer === 'A' ? action.choises.A : action.choises.B;
      const info = action.question.replace('?', collectValue);
      newState.quizInfo.push(info);
      newState.isInitialize = false;
      newState.isAnswered = false;
      newState.isSetQuiz = true;

      return newState;
    }
    default: {
      return state;
    }
  }
}

export default reducer;