import React from 'react';

import { QuizActionTypes } from './types';
import { ActionResultTypes } from './actions';

import { makeQuiz } from 'lib/makeQuiz';

interface QuizInfo {
  showQuestion: () => string,
  showAnswer: () => string,
}

const quizMaxNum = 20;

export interface OwnState {
  isFinished: boolean,
  answerResult: boolean[],
  quizInfo: QuizInfo[],
  viewingQuiz: string,
  answerValue: 'A' | 'B' | 'N',
  choiseValues: {A: string, B: string},
}

type State = OwnState;

const reducer: React.Reducer<State, ActionResultTypes> = (state, action) => {
  switch (action.type) {
    case QuizActionTypes.ANSWER: {
      if(state.isFinished) return state;
      const newState = {...state};
      // 答えの確認
      const quizResult = state.answerValue === action.choises;
      newState.answerResult.push(quizResult);

      // クイズの最終問題を終えている場合フラグをたてて終わり
      if(newState.answerResult.length >= quizMaxNum) {
        newState.isFinished = true;
        return newState;
      }

      // 次の問題をセットする
      const q = makeQuiz();
      newState.answerValue = q.answer;
      newState.choiseValues = q.choiseValues;
      newState.viewingQuiz = q.quiz;

      return newState;
    }
    case QuizActionTypes.INITIALIZE: {
      const newState = {...state};
      // 最初の問題をセットする
      const q = makeQuiz();
      newState.answerValue = q.answer;
      newState.choiseValues = q.choiseValues;
      newState.viewingQuiz = q.quiz;

      return newState;
    }
    default: {
      return state;
    }
  }
}

export default reducer;