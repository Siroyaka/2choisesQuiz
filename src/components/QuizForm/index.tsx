import React from 'react';

import { quizReducer, QuizState, QuizActionTypes } from './state'

interface OwnProps {

}

type Props = OwnProps;

const initialState: QuizState = {
  isFinished: false,
  answerResult: [],
  quizInfo: [],
  viewingQuiz: '',
  answerValue: 'N',
  choiseValues: {A: '', B: ''}
}

const QuizForm: React.FC<Props> = (props) => {
  const [state, dispatch] = React.useReducer(quizReducer, initialState);

  React.useEffect(() => {
    dispatch({
      type: QuizActionTypes.INITIALIZE
    });
  }, []);

  const pushAnswer = (value: 'A' | 'B') => {
    dispatch({
      type: QuizActionTypes.ANSWER,
      choises: value
    });
  }
  console.log(state.answerResult);

  return(
    <div className='h-full flex flex-wrap'>
      <div className='hidden lg:block w-1/5 h-full bg-blue-200'>
      </div>
      <div className='w-full lg:w-3/5 h-full bg-red-200'>
        <div id='question-display' className='flex flex-row mt-4 mx-3 border border-black rounded-full items-center justify-center bg-white'>
          <div className='my-12 text-4xl'>
            {state.viewingQuiz}
          </div>
        </div>
        <div id='answer-buttons' className='flex flex-wrap mt-6'>
          <div className='w-full lg:w-1/2 px-4 py-3'>
            <button
              className='rounded-full quiz-button w-full bg-blue-400 focus:outline-none border border-black'
              onClick={() => pushAnswer('A')}
            >
              {state.choiseValues.A}
            </button>
          </div>
          <div className='w-full lg:w-1/2 px-4 py-3'>
            <button
              className='rounded-full quiz-button w-full bg-blue-400 focus:outline-none border border-black'
              onClick={() => pushAnswer('B')}
            >
              {state.choiseValues.B}
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