import React from 'react';

import { ResultFormReducers, resultFormInitialState, QuizResultTypes } from 'components/ResultForm/state';
import { QuizInfo } from 'lib/makeQuiz';
import QuizForm, {OwnProps as QuizFormProps} from 'components/QuizForm';
import ResultForm from 'components/ResultForm';
import SoundEffect from 'lib/soundEffect';

interface OwnProps {
  title: string,
  hashTag: string
}

type Props = OwnProps & Omit<QuizFormProps, 'onFinished'>;

const QuizTemplate: React.FC<Props> = (props) => {
  const {
    title,
    hashTag
  } = props;

  const [result, dispatch] = React.useReducer(ResultFormReducers, resultFormInitialState);
  const [endInitialize, setEndInitialize] = React.useState(false);
  const se = React.useRef<SoundEffect>();

  const setFinished = React.useCallback((result: boolean[], infos: QuizInfo[]) => {
    dispatch({
      type: QuizResultTypes.VIEWRESULT,
      result,
      infos
    })
  }, []);
  React.useEffect(() => {
    dispatch({
      type: QuizResultTypes.INITIALIZE
    });
    // AudioContextのinitializeはここでやる
    // callbackでロード完了を通知する
    se.current = new SoundEffect();
    se.current.pushSource('/asset/collect_sound.wav', 'collect_sound');
    se.current.pushSource('/asset/wrong_sound.wav', 'wrong_sound');
    se.current.pushSource('/asset/tick_sound.wav', 'tick_sound');
    se.current.onload = () => setEndInitialize(true);
    se.current.load();
  }, []);
  return(
    <React.Fragment>
      {!result.isFinished && endInitialize &&
        <QuizForm
          {...props}
          onFinished={setFinished}
          soundEffect={se.current}
        />
      }
      {result.isFinished && endInitialize &&
        <ResultForm {...result} title={title} hashTag={hashTag}/>
      }
    </React.Fragment>
  )
}

export default QuizTemplate;