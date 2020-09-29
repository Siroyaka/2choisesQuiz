import React, { useEffect, useReducer, useRef, useState } from 'react';

import { ResultData, NameValue as ChoiseValue, QuestionSource } from 'lib/createQuestion/accumulation';
import { IQuestionFormProps } from 'lib/IQuestion';
import StartCountdown from 'components/standalone/StartCountdown';

import { AccumulationActionTypes, accumulationReducer, getInitialState } from './state';

interface OwnProps {
  doExit: (result: ResultData) => boolean,
  valueNames: string[],
  initialValues?: number[],
  timeLimit?: number, // 1問あたりの制限時間
  captionSpeed?: number, // 問題の文字送りの速さ
  questionInterval?: number, // 問題を答えた後にどのくらいインターバルをあけるか
  countdownSpeed?: number, // カウントダウンのインターバルの長さ
  startCountdown?: number, // 初めにいくつカウントダウンするか
}

export type Props = OwnProps & IQuestionFormProps<ChoiseValue, QuestionSource, ResultData>;

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
      timerIdRef.current = setTimeout(
        () => {
          onFinished(quizResult);
        },
        questionInterval ?? 1000
      );
      return;
    };

    // 次の問題へ
    const source: QuestionSource = {
      questionNumber: state.quizResult.answeredCount + 1,
      results: state.quizResult.readResult()
    }
    const question = quiz(source);
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
    const source: QuestionSource = {
      questionNumber: 1,
      results: state.quizResult.readResult()
    }
    const question = quiz(source);
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