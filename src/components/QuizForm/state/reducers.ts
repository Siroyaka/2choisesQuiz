import React from 'react';

import { QuizActionTypes } from './types';
import { ActionResultTypes } from './actions';
import { IQuestionReducerState } from 'lib/IQuestion';
import { Choise2Result, Auto2ChoiseQuizResult } from 'lib/makeQuiz';

type State = IQuestionReducerState<number, Choise2Result>;

export const getInitialState = (quizLength: number): IQuestionReducerState<number, Choise2Result> => ({
  isAnswered: false,
  isInitialize: true,
  isSetQuiz: false,
  totalLength: quizLength,
  quizResult: new Auto2ChoiseQuizResult(quizLength),
  quizInfo: [],
})

const reducer: React.Reducer<State, ActionResultTypes> = (state, action) => {
  switch (action.type) {
    case QuizActionTypes.ANSWER: {
      const newState = {...state};
      newState.isInitialize = false;
      newState.isSetQuiz = false;
      newState.isAnswered = true;
      const value = newState.quizInfo[action.questionNum].getChoisesValue()[action.answeredValue];
      newState.quizResult.appendChoiseValue(value, action.answeredValue);

      return newState;
    }
    case QuizActionTypes.TIMEOVER: {
      const newState = {...state};
      newState.isInitialize = false;
      newState.isSetQuiz = false;
      newState.isAnswered = true;
      const value = newState.quizInfo[action.questionNum].getFailureValue();
      newState.quizResult.appendChoiseValue(value, -1);

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