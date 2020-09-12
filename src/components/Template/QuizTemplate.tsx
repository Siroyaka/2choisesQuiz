import React from 'react';

import { ResultFormReducers, resultFormInitialState, QuizResultTypes } from 'components/ResultForm/state';
import { QuizInfo } from 'lib/makeQuiz';
import QuizForm, {OwnProps as QuizFormProps} from 'components/QuizForm';
import ResultForm from 'components/ResultForm';
import SoundEffect from 'lib/soundEffect';

interface OwnProps {
  title: string,
  hashTags: string[]
}

type Props = OwnProps & Omit<QuizFormProps, 'onFinished'>;

const QuizTemplate: React.FC<Props> = (props) => {
  const {
    title,
    hashTags
  } = props;

  const [result, dispatch] = React.useReducer(ResultFormReducers, resultFormInitialState);
  const [endInitialize, setEndInitialize] = React.useState(false);
  const se = React.useRef<SoundEffect>();

  const setFinished = React.useCallback((result: boolean[], infos: QuizInfo[], totalLength: number) => {
    dispatch({
      type: QuizResultTypes.VIEWRESULT,
      result,
      infos,
      totalLength
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
      <div className='flex flex-col items-center'>
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
        <ResultForm {...result} title={title} hashTags={hashTags}/>
      }
    </React.Fragment>
  )
}

export default QuizTemplate;