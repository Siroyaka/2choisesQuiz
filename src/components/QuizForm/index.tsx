import React, { useEffect } from 'react';

import { quizReducer, QuizState, QuizActionTypes } from './state';
import QuestionWindow from './standalone/QuestionWindow';
import { QuizState as QuizInfoState, QuizInfo } from 'lib/makeQuiz';

export interface OwnProps {
  onFinished: (result: boolean[], info: QuizInfo[]) => void,
  quiz: () => QuizInfoState,
  quizLength: number,
  waitSec?: number,
  captionSpeed?: number,
  questionInterval?: number,
  countdownSpeed?: number,
  startCountdown?: number,
}

type Props = OwnProps;

const initialState = (): QuizState => ({
  isAnswered: false,
  isInitialize: true,
  isSetQuiz: false,
  answeredCount: 0,
  quizResult: [],
  quizInfo: [],
  viewingQuiz: '',
  collectValue: 'N',
  choiseValues: {A: '', B: ''}
})

const QuizForm: React.FC<Props> = (props) => {
  const {
    quiz,
    onFinished,
    quizLength,
    captionSpeed,
    waitSec,
    questionInterval,
    countdownSpeed,
    startCountdown,
  } = props;

  const [state, dispatch] = React.useReducer(quizReducer, {...initialState()});
  const [deadLine, setDeadLine] = React.useState(5);
  const [viewChoises, setViewChoises] = React.useState(false);
  const timerIdRef = React.useRef<any>();

  // 次の問題をセットするセクション
  React.useEffect(() => {
    if(!state.isAnswered) return;
    if(state.answeredCount >= quizLength) {
      console.log('finished');
      timerIdRef.current = setTimeout(
        () => onFinished(state.quizResult, state.quizInfo),
        questionInterval ?? 1000
      )
      return;
    }
    setViewChoises(false);
    const question = quiz();
    timerIdRef.current = setTimeout(
      () => 
        dispatch({
          type: QuizActionTypes.NEXTQUESTION,
          answer: question.answer,
          question: question.quiz,
          choises: question.choiseValues
        }),
        questionInterval ?? 1000
    )
  }, [state.isAnswered, state.isInitialize]);

  useEffect(() => {
    startTimer(startCountdown ?? 3);
    return() => {
      clearTimeout(timerIdRef.current);
    }
  }, [])

  const startTimer = (n: number) => {
    setDeadLine(n);
    if(n <= 0) {
      const question = quiz();
      dispatch({
        type: QuizActionTypes.NEXTQUESTION,
        answer: question.answer,
        question: question.quiz,
        choises: question.choiseValues
      });
      return;
    }
    timerIdRef.current = setTimeout(
      () => startTimer(n - 1),
      countdownSpeed ?? 1000
    );
  }

  const deadLineTimer = (n: number) => {
    setDeadLine(n);
    if(n <= 0) {
      dispatch({
        type: QuizActionTypes.ANSWER,
        choises: 'N'
      });
      return;
    }
    timerIdRef.current = setTimeout(
      () => deadLineTimer(n - 1),
      countdownSpeed ?? 1000
    );
  }

  const pushAnswer = (value: 'A' | 'B') => {
    if(state.isInitialize) return;
    if(state.isAnswered) return;
    if(!viewChoises) return;
    clearTimeout(timerIdRef.current);
    dispatch({
      type: QuizActionTypes.ANSWER,
      choises: value
    });
  }

  const onShownQuestion = React.useCallback(() => {
    setViewChoises(true);
    clearTimeout(timerIdRef.current);
    deadLineTimer(waitSec ?? 5);
  }, []);

  return(
    <div className='h-full flex flex-wrap'>
      <div className='hidden lg:block w-1/5 h-full'>
      </div>
      <div className='w-full lg:w-3/5 h-full bg-red-200'>
        <div id='question-display' className='mt-4 mx-3 border border-black rounded-lg bg-white relative' style={{minHeight: '9rem'}}>
          {state.isSetQuiz && !state.isInitialize &&
          <React.Fragment>
            <div className='mt-6 text-3xl mx-4 flex flex-row justify-center'>
                <QuestionWindow
                  key={state.quizResult.length + '-question'}
                  text={state.viewingQuiz}
                  interval={captionSpeed ?? 100}
                  onFinished={onShownQuestion}
                />
            </div>
            <div className='absolute top-0 left-2'>
              Q.{state.answeredCount + 1}
            </div>
          </React.Fragment>
          }
        </div>
        <div id='answer-buttons' className='flex flex-wrap mt-6'>
          <div className='w-full sm:w-1/2 px-4 py-3'>
            <button
              className='rounded-full quiz-button w-full bg-blue-400 focus:outline-none border border-black active:bg-blue-300'
              onClick={() => pushAnswer('A')}
            >
              {!state.isAnswered && viewChoises && state.choiseValues.A}
              {state.isAnswered && ('A' === state.collectValue ? '〇' : '×') }
            </button>
          </div>
          <div className='w-full sm:w-1/2 px-4 py-3'>
            <button
              className='rounded-full quiz-button w-full bg-blue-400 focus:outline-none border border-black active:bg-blue-300'
              onClick={() => pushAnswer('B')}
            >
              {!state.isAnswered && viewChoises && state.choiseValues.B}
              {state.isAnswered && ('B' === state.collectValue ? '〇' : '×') }
            </button>
          </div>
        </div>
      </div>
      <div className='hidden lg:block w-1/5 h-full'>
      </div>
    </div>
  )
}

export default QuizForm;