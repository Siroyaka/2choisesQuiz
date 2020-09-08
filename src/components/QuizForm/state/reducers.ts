import React from 'react';

import { QuizActionTypes } from './types';
import { ActionResultTypes } from './actions';
import { QuizInfo } from 'lib/makeQuiz';

const quizMaxNum = 5;

export interface OwnState {
  isFinished: boolean,
  isInterval: boolean,
  quizResult: boolean[],
  quizInfo: QuizInfo[],
  viewingQuiz: string,
  collectValue: 'A' | 'B' | 'N',
  choiseValues: {A: string, B: string},
}

const setInitialState = (): OwnState  => ({
  isFinished: false,
  isInterval: true,
  quizResult: [],
  quizInfo: [],
  viewingQuiz: '',
  collectValue: 'N',
  choiseValues: {A: '', B: ''}
})

type State = OwnState;

const reducer: React.Reducer<State, ActionResultTypes> = (state, action) => {
  switch (action.type) {
    case QuizActionTypes.ANSWER: {
      if(state.isFinished) return state;
      const newState = {...state};
      // 答えの確認
      const quizResult = state.collectValue === action.choises;
      newState.quizResult.push(quizResult);

      newState.isInterval = true;

      return newState;
    }
    case QuizActionTypes.INITIALIZE: {
      return setInitialState();
    }
    case QuizActionTypes.NEXTQUESTION: {
      const newState = {...state};

      // クイズの最終問題を終えている場合フラグをたてて終わり
      if(newState.quizResult.length >= quizMaxNum) {
        newState.isFinished = true;
        return newState;
      }

      // 問題の設定
      newState.collectValue = action.answer;
      newState.choiseValues = action.choises;
      newState.viewingQuiz = action.question;
      const collectValue = action.answer === 'A' ? action.choises.A : action.choises.B;
      const info = action.question.replace('?', collectValue);
      newState.quizInfo.push(info);
      newState.isInterval = false;

      return newState;
    }
    default: {
      return state;
    }
  }
}

export default reducer;