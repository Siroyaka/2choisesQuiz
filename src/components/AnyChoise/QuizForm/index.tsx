import React, { useEffect } from 'react';

import { quizReducer, getInitialState, QuizActionTypes } from './state';
import QuestionWindow from 'components/standalone/QuestionWindow';
import { Choise2Result } from 'lib/makeQuiz';
import { IQuestionFormProps } from 'lib/IQuestion';
import SoundEffect from 'lib/soundEffect';

export interface OwnProps {
  quizLength: number, // クイズの数
  soundEffect?: SoundEffect, // 音の設定
  wrongStop?: boolean, // 間違ったら終了するか
  collectWord?: string, // 正解したときに表示するテキスト
  wrongWord?: string, // 間違ったときに表示するテキスト
}

export type Props = IQuestionFormProps<number, Choise2Result, number> & OwnProps;

const QuizForm: React.FC<Props> = (props) => {
  const {
    quiz,
    onFinished,
    quizLength,
    captionSpeed,
    timeLimit,
    questionInterval,
    countdownSpeed,
    startCountdown,
    soundEffect,
    wrongStop,
    collectWord,
    wrongWord,
  } = props;

  const [state, dispatch] = React.useReducer(quizReducer, getInitialState(quizLength));
  const [countdown, setCountdown] = React.useState(5);
  const [viewChoises, setViewChoises] = React.useState(false);
  const timerIdRef = React.useRef<any>();
  const [answeredDisplayText, setAnsweredDisplayText] = React.useState('');

  // 次の問題をセットするセクション
  React.useEffect(() => {
    if(!state.isAnswered) return;
    // 答えた問題数が出題予定数に達した場合に終了
    // wrongStop(間違えた場合に終了する)設定の場合には間違えた場合に終了する
    if(state.quizResult.answeredCount >= quizLength || (wrongStop && state.quizResult.readResult().hasWrongValue)) {
      timerIdRef.current = setTimeout(
        () => onFinished(state.quizResult.readResult()),
        questionInterval ?? 1000
      )
      return;
    }
    setViewChoises(false);
    const question = quiz(state.quizResult.answeredCount + 1);
    timerIdRef.current = setTimeout(
      () => 
        dispatch({
          type: QuizActionTypes.NEXTQUESTION,
          question
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
    setCountdown(n);
    if(n <= 0) {
      const question = quiz(1);
      dispatch({
        type: QuizActionTypes.NEXTQUESTION,
        question
      });
      return;
    }
    if(soundEffect) {
      soundEffect.play('tick_sound');
    }
    timerIdRef.current = setTimeout(
      () => startTimer(n - 1),
      countdownSpeed ?? 1000
    );
  }

  const deadLineTimer = (n: number) => {
    setCountdown(n);
    if(n <= 0) {
      if(soundEffect) {
        soundEffect.play('wrong_sound');
      }
      setAnsweredDisplayText(wrongWord ?? '残念！');
      dispatch({
        type: QuizActionTypes.TIMEOVER,
        questionNum: state.quizResult.answeredCount
      });
      return;
    }
    timerIdRef.current = setTimeout(
      () => deadLineTimer(n - 1),
      countdownSpeed ?? 1000
    );
  }

  const pushAnswer = (n: number) => {
    if(state.isInitialize) return;
    if(state.isAnswered) return;
    if(!viewChoises) return;
    clearTimeout(timerIdRef.current);
    let se = '';
    const q = state.quizInfo[state.quizResult.answeredCount].getChoisesValue();
    if(q[n] === 1) {
      setAnsweredDisplayText(collectWord ?? '正解！');
      se = 'collect_sound';
    } else {
      setAnsweredDisplayText(wrongWord ?? '残念！');
      se = 'wrong_sound';
    }
    if(soundEffect) {
      soundEffect.play(se);
    }
    dispatch({
      type: QuizActionTypes.ANSWER,
      answeredValue: n,
      questionNum: state.quizResult.answeredCount
    });
  }

  const onShownQuestion = React.useCallback(() => {
    setViewChoises(true);
    clearTimeout(timerIdRef.current);

    const limit = timeLimit ?? 5;
    if(limit < 1) return;
    deadLineTimer(limit);
  }, []);

  const getButtonValues = () => {
    if(state.isInitialize) return [];
    if(state.isAnswered) {
      const answer = state.quizInfo[state.quizResult.answeredCount - 1].getChoisesValue();
      const collectOrWrong = (n: number) => n === 1 ? '〇' : '×';
      return answer.map(x => collectOrWrong(x));
    }
    if(!viewChoises && (captionSpeed === undefined || captionSpeed > 0)) return [];
    if(state.isSetQuiz) return state.quizInfo[state.quizResult.answeredCount].getChoises();
    return [];
  }

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
                    key={(state.quizResult.answeredCount + 1) + '-question'}
                    text={state.quizInfo[state.quizResult.answeredCount].getQuestion()}
                    interval={captionSpeed ?? 100}
                    onFinished={onShownQuestion}
                  />
              </div>
              <div className='absolute top-0' style={{left: '2px'}}>
                Q.{state.quizResult.answeredCount + 1}
              </div>
              {countdown > 0 && !state.isInitialize &&
                <div className='absolute time-limit-count text-center' style={{right: '4px', bottom: '3px', animationDuration: `${(countdownSpeed ?? 1000) / 1000}s`}}>
                  {countdown}
                </div>
              }
            </React.Fragment>
          }
          {state.isInitialize && 
            <div className='mt-6 text-3xl mx-4 flex flex-row justify-center'>
              {countdown}
            </div>
          }
          {!state.isInitialize && state.isAnswered &&
            <div className='mt-6 text-3xl mx-4 flex flex-row justify-center'>
              {answeredDisplayText}
            </div>
          }
        </div>
        <div id='answer-buttons' className='flex flex-wrap mt-6'>
          {getButtonValues().map((v, i) => (
              <div key={`choise_${i}`} className='w-full sm:w-1/2 px-4 py-3'>
                <button
                  className='rounded-full quiz-button w-full bg-blue-400 focus:outline-none border border-black active:bg-blue-300'
                  onClick={() => pushAnswer(i)}
                >
                  <span>{v}</span>
                </button>
              </div>
            ))
          }
        </div>
      </div>
      <div className='hidden lg:block w-1/5 h-full'>
      </div>
    </div>
  )
}

export default QuizForm;