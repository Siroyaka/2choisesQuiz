import React from 'react';

import ResultForm from './ResultForm';
import { ResultFormReducers, resultFormInitialState, QuizResultTypes } from './ResultForm/state';
import QuizForm, {Props as QuizFormProps} from './QuizForm';
import SoundEffect from 'lib/soundEffect';
import { Choise2Result } from 'lib/makeQuiz';
import { IQuestionResultFormProps } from 'lib/IQuestion';

type Props = IQuestionResultFormProps & Omit<QuizFormProps, 'onFinished'>;

const TwoChoise: React.FC<Props> = (props) => {
  const [result, dispatch] = React.useReducer(ResultFormReducers, resultFormInitialState);
  const [endInitialize, setEndInitialize] = React.useState(false);
  const se = React.useRef<SoundEffect>();

  const {
    title
  } = props;

  const setFinished = React.useCallback((result: Choise2Result) => {
    dispatch({
      type: QuizResultTypes.VIEWRESULT,
      result,
    })
  }, []);
  React.useEffect(() => {
    dispatch({
      type: QuizResultTypes.INITIALIZE
    });
  }, []);

  const onClickStart = (flg: boolean) => {
    if(flg) {
      // AudioContextのinitializeはここでやる
      // callbackでロード完了を通知する
      se.current = new SoundEffect();
      se.current.pushSource(`/asset/sounds/collect_sound.wav`, 'collect_sound');
      se.current.pushSource(`/asset/sounds/wrong_sound.wav`, 'wrong_sound');
      se.current.pushSource(`/asset/sounds/tick_sound.wav`, 'tick_sound');
      se.current.onload = () => setEndInitialize(true);
      se.current.load();
      return;
    }
    se.current = null;
    setEndInitialize(true);
  }
  return(
    <React.Fragment>
      {!endInitialize && 
      <div className='flex flex-col items-center mx-4'>
        <span className='text-3xl'>iPhone、iPadをお使いの人は音なしを選択してください。</span>
        <div className='flex flex-row pt-2 items-center justify-center'>
          <button
            className='border bg-blue-300 rounded-full py-2 px-4 mx-4 text-2xl focus:outline-none '
            onClick={() => onClickStart(true)}
          >
            音あり
          </button>
          <button
            className='border bg-blue-300 rounded-full py-2 px-4 mx-4 text-2xl focus:outline-none '
            onClick={() => onClickStart(false)}
          >
            音なし
          </button>
        </div>
      </div>
      }
      {!result.isFinished && endInitialize &&
        <QuizForm
          {...props}
          onFinished={setFinished}
          soundEffect={se.current}
        />
      }
      {result.isFinished && endInitialize &&
        <ResultForm {...result} {...props} />
      }
    </React.Fragment>
  )
}

export default TwoChoise;