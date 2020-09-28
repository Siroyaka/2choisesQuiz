import React, { useEffect, useReducer, useRef, useState } from 'react';

import { ResultData, NameValue as ChoiseValue } from 'lib/createQuestion/accumulation';
import { IQuestionFormProps } from 'lib/IQuestion';
import StartCountdown from 'components/standalone/StartCountdown';

import { AccumulationActionTypes, accumulationReducer, getInitialState } from './state';

interface OwnProps {
  doExit: (result: ResultData) => boolean,
  valueNames: string[],
  initialValues?: number[],
}

export type Props = OwnProps & IQuestionFormProps<ChoiseValue, number, ResultData>;

const MainForm: React.FC<Props> = (props) => {
  const {
    title,
    quiz,
    onFinished,
    questionInterval,
    timeLimit,
    captionSpeed,
    countdownSpeed,
    startCountdown,
    doExit,
    valueNames,
    initialValues,
  } = props;

  const [state, dispatch] = useReducer(accumulationReducer, getInitialState(doExit, valueNames, initialValues));

  const timerIdRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if(!state.isAnswered) return;

    // 終了条件を確認する
    const quizResult = state.quizResult.readResult();
    if(state.doExit(quizResult)) {
      onFinished(quizResult);
      return;
    };

    // 次の問題へ
    const question = quiz(state.quizResult.answeredCount + 1);
    timerIdRef.current = setTimeout(
      () => {
        dispatch({
          type: AccumulationActionTypes.NEXT,
          question
        })
      },
      questionInterval ?? 1000
    );

  }, [state.isAnswered])

  const startTimerEnd = React.useCallback(() => {
    const question = quiz(1);
    dispatch({
      type: AccumulationActionTypes.NEXT,
      question,
    });
  }, []);

  const pushAnswer = (index: number) => {
    if(state.isInitialize) return;
    if(state.isAnswered) return;
    if(!state.isSetQuiz) return;
    clearTimeout(timerIdRef.current);

    dispatch({
      type: AccumulationActionTypes.ANSWER,
      questionNum: state.quizResult.answeredCount,
      answeredIndex: index,
    });
  }

  const getAnswerButtons = () => {
    if(state.isInitialize) return [];
    if(state.isAnswered) {
      return [];
    }
    if(!state.isSetQuiz) return [];
    if(state.quizInfo.length < 1) return [];
    const quizValue = state.quizInfo[state.quizResult.answeredCount];
    return quizValue.getChoises();
  }

  return(
    <section>
      <h1>{title}</h1>
      <div
        id='question-display'
      >
        {state.displayValue}
      </div>
      {
        state.isInitialize && 
        <StartCountdown
          count={startCountdown}
          countdownSpeed={countdownSpeed}
          onEnd={startTimerEnd}
        />
      }
      <div
        id='answer-buttons'
      >
        {getAnswerButtons().map((x, i) =>
          <button key={`answer-button-${i}`} onClick={() => pushAnswer(i)}>
            {x}
          </button>
        )}
      </div>
    </section>
  )
}

export default MainForm;