import React from 'react';

import Header from './Header';
import ResultForm from './ResultForm';
import { ResultFormReducers, resultFormInitialState, QuizResultTypes } from './ResultForm/state';
import QuizForm, {Props as QuizFormProps} from './QuizForm';
import InitialForm from './InitialForm';
import SoundEffect from 'lib/soundEffect';
import { ResultData } from 'lib/createQuestion/choiseQuiz';
import { IQuestionResultFormProps } from 'lib/IQuestion';

type Props = IQuestionResultFormProps & Omit<QuizFormProps, 'onFinished'>;

const TwoChoise: React.FC<Props> = (props) => {
  const [result, dispatch] = React.useReducer(ResultFormReducers, resultFormInitialState);
  const [endInitialize, setEndInitialize] = React.useState(false);
  const se = React.useRef<SoundEffect>();

  const {
    title
  } = props;

  const setFinished = React.useCallback((result: ResultData) => {
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

  const onClickStart = React.useCallback((flg: boolean) => {
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
  }, [se]);
  return(
    <div className='max-w-6xl mx-auto'>
      <Header/>
      <div className='py-16'>
        {!endInitialize && 
          <InitialForm
            title={title}
            onClickStart={onClickStart}
          />
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
      </div>
    </div>
  )
}

export default TwoChoise;