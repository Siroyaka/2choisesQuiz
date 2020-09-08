import React from 'react';

import { quizReducer, QuizState, QuizActionTypes } from './state';
import QuestionWindow from './standalone/QuestionWindow';
import { makeAddQuiz, makeMulQuiz } from 'lib/makeQuiz';

interface OwnProps {
  onFinished: (result: boolean[], info: string[]) => void
}

type Props = OwnProps;

const initialState: QuizState = {
  isFinished: false,
  isInterval: true,
  quizResult: [],
  quizInfo: [],
  viewingQuiz: '',
  collectValue: 'N',
  choiseValues: {A: '', B: ''}
}

const QuizForm: React.FC<Props> = (props) => {
  const {
    onFinished
  } = props;
  const [state, dispatch] = React.useReducer(quizReducer, initialState);
  const [deadLine, setDeadLine] = React.useState(5);
  const timerIdRef = React.useRef<any>();

  React.useEffect(() => {
    if(!state.isInterval) return;
    const question = makeMulQuiz(3);
    setTimeout(
      () => 
        dispatch({
          type: QuizActionTypes.NEXTQUESTION,
          answer: question.answer,
          question: question.quiz,
          choises: question.choiseValues
        }),
        1000
    )
  }, [state.isInterval]);

  React.useEffect(() => {
    if(state.isFinished) {
      onFinished(state.quizResult, state.quizInfo);
      return;
    }
    // initialize
    return;
  }, [state.isFinished])

  const timer5Sec = (n: number) => {
    setDeadLine(n);
    if(n <= 0) {
      dispatch({
        type: QuizActionTypes.ANSWER,
        choises: 'N'
      });
      return;
    }
    timerIdRef.current = setTimeout(
      () => timer5Sec(n - 1),
      1000
    );
  }

  const pushAnswer = (value: 'A' | 'B') => {
    clearTimeout(timerIdRef.current);
    dispatch({
      type: QuizActionTypes.ANSWER,
      choises: value
    });
  }

  const onShownQuestion = React.useCallback(() => {
    clearTimeout(timerIdRef.current);
    timer5Sec(5);
  }, []);

  return(
    <div className='h-full flex flex-wrap'>
      <div className='hidden lg:block w-1/5 h-full bg-blue-200'>
        {deadLine}
      </div>
      <div className='w-full lg:w-3/5 h-full bg-red-200'>
        <div id='question-display' className='flex flex-row mt-4 mx-3 border border-black rounded-full items-center justify-center bg-white'>
          <div className='my-12 text-4xl mx-4'>
            {!state.isInterval && 
              <QuestionWindow
                key={state.quizResult.length + '-question'}
                text={state.viewingQuiz}
                interval={100}
                onFinished={onShownQuestion}
              />
            }
          </div>
        </div>
        <div id='answer-buttons' className='flex flex-wrap mt-6'>
          <div className='w-full lg:w-1/2 px-4 py-3'>
            <button
              className='rounded-full quiz-button w-full bg-blue-400 focus:outline-none border border-black'
              onClick={() => pushAnswer('A')}
            >
              {!state.isInterval && state.choiseValues.A}
              {state.isInterval && ('A' === state.collectValue ? '〇' : '×') }
            </button>
          </div>
          <div className='w-full lg:w-1/2 px-4 py-3'>
            <button
              className='rounded-full quiz-button w-full bg-blue-400 focus:outline-none border border-black'
              onClick={() => pushAnswer('B')}
            >
              {!state.isInterval && state.choiseValues.B}
              {state.isInterval && ('B' === state.collectValue ? '〇' : '×') }
            </button>
          </div>
        </div>
      </div>
      <div className='hidden lg:block w-1/5 h-full bg-blue-200'>
      </div>
    </div>
  )
}

export default QuizForm;