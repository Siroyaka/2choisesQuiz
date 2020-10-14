import React from 'react';

import { QuizActionTypes } from './types';
import { ActionResultTypes } from './actions';
import { IQuestionReducerState } from 'lib/IQuestion';
import { QuestionResult, ResultData, ChoiseValue } from 'lib/createQuestion/choiseQuiz';

type State = IQuestionReducerState<ChoiseValue, ResultData> & {
  totalLength: number, // 問題数の総量
  isAnswered: boolean, // 答えた直後の状態であることを示す
  isSetQuiz: boolean, // クイズをStateに追加した直後の状態であることを示す
  isInitialize: boolean, // 初期状態であることを示す
};

export const getInitialState = (quizLength: number): State => ({
  isAnswered: false,
  isInitialize: true,
  isSetQuiz: false,
  totalLength: quizLength,
  quizResult: new QuestionResult(quizLength),
  quizInfo: [],
})

const reducer: React.Reducer<State, ActionResultTypes> = (state, action) => {
  switch (action.type) {
    case QuizActionTypes.ANSWER: {
      const newState = {...state};
      newState.isInitialize = false;
      newState.isSetQuiz = false;
      newState.isAnswered = true;
      const value = newState.quizInfo[action.questionNum].getChoisesValue([action.answeredValue]);
      newState.quizResult.appendChoiseValue(value);
      return newState;
    }
    case QuizActionTypes.TIMEOVER: {
      const newState = {...state};
      newState.isInitialize = false;
      newState.isSetQuiz = false;
      newState.isAnswered = true;
      const value = newState.quizInfo[action.questionNum].getFailureValue();
      newState.quizResult.appendChoiseValue(value);

      return newState;
    }
    case QuizActionTypes.NEXTQUESTION: {
      const newState = {...state};

      // 問題の設定
      newState.quizInfo.push(action.question);
      newState.isInitialize = false;
      newState.isAnswered = false;
      newState.isSetQuiz = true;

      return newState;
    }
    case QuizActionTypes.INTERVAL: {
      const newState = {...state};
      newState.isInitialize = false;
      newState.isSetQuiz = false;
      newState.isAnswered = false;
      return newState;
    }
    default: {
      return state;
    }
  }
}

export default reducer;