import React from 'react';

import { QuizActionTypes } from './types';
import { ActionResultTypes } from './actions';

import { makeAddQuiz } from 'lib/makeQuiz';

interface QuizInfo {
  showQuestion: () => string,
  showAnswer: () => string,
}

const quizMaxNum = 5;

export interface OwnState {
  isFinished: boolean,
  isInterval: boolean,
  quizResult: boolean[],
  quizInfo: string[],
  viewingQuiz: string,
  collectValue: 'A' | 'B' | 'N',
  choiseValues: {A: string, B: string},
}

const initialState: OwnState = {
  isFinished: false,
  isInterval: true,
  quizResult: [],
  quizInfo: [],
  viewingQuiz: '',
  collectValue: 'N',
  choiseValues: {A: '', B: ''}
}

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
      return initialState;
    }
    case QuizActionTypes.NEXTQUESTION: {
      const newState = {...state};
      console.log('next question');

      // クイズの最終問題を終えている場合フラグをたてて終わり
      if(newState.quizResult.length >= quizMaxNum) {
        newState.isInterval = false;
        newState.isFinished = true;
        return newState;
      }

      // 問題の設定
      newState.collectValue = action.answer;
      newState.choiseValues = action.choises;
      newState.viewingQuiz = action.question;
      newState.quizInfo.push(action.question);
      newState.isInterval = false;

      return newState;
    }
    default: {
      return state;
    }
  }
}

export default reducer;