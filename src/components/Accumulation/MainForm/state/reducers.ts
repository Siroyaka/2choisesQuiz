import { Reducer } from 'react';

import { AccumulationActionTypes } from './types';
import { ReturnTypes } from './actions';
import { IQuestionReducerState } from 'lib/IQuestion';
import { AccumulationResult, ResultData, NameValue } from 'lib/createQuestion/accumulation';

type State = IQuestionReducerState<NameValue, ResultData> & {
  doExit: (result: ResultData) => boolean, // 問題の終了を検知する関数
  displayValue: string,
  isAnswered: boolean, // 答えた直後の状態であることを示す
  isSetQuiz: boolean, // クイズをStateに追加した直後の状態であることを示す
  isInitialize: boolean, // 初期状態であることを示す
};

export const getInitialState = (doExit: (result: ResultData) => boolean, names: string[], initialValues?: number[]): State => ({
  isAnswered: false,
  isInitialize: true,
  isSetQuiz: false,
  quizInfo: [],
  quizResult: new AccumulationResult(names, initialValues ?? names.map(_ => 0)),
  doExit: doExit,
  displayValue: ''
})

const reducer: Reducer<State, ReturnTypes> = (state, action) => {
  switch (action.type) {
    case AccumulationActionTypes.ANSWER: {
      const newState = {...state};
      newState.isInitialize = false;
      newState.isSetQuiz = false;
      newState.isAnswered = true;
      const value = newState.quizInfo[action.questionNum].getChoisesValue(action.answeredIndex);
      newState.quizResult.appendChoiseValue(value);
      newState.displayValue = `${value.name}が${value.value}上がりました。`;
      return newState;
    }
    case AccumulationActionTypes.INTERVAL: {
      const newState = {...state};
      newState.isInitialize = false;
      newState.isSetQuiz = false;
      newState.isAnswered = false;
      newState.displayValue = '';
      return newState;
    }
    case AccumulationActionTypes.NEXT: {
      const newState = {...state};

      newState.quizInfo.push(action.question);
      newState.isInitialize = false;
      newState.isAnswered = false;
      newState.isSetQuiz = true;
      newState.displayValue = action.question.getQuestion();
      return newState;
    }
    default: {
      console.error(`Not Set ActionTypes`);
      return state;
    }
  }
}

export default reducer;