import React from 'react';

import Header from './Header';
import ResultForm from './ResultForm';
import QuizForm, {Props as QuizFormProps} from './QuizForm';
import InitialForm from './InitialForm';
import SoundEffect from 'lib/soundEffect';
import { ResultData } from 'lib/createQuestion/choiseQuiz';
import { IQuestionResultFormProps } from 'lib/IQuestion';

type Props = IQuestionResultFormProps & Omit<QuizFormProps, 'onFinished'>;

enum AnyChoiseFormType {
  Initial,
  Quiz,
  Result,
}

type AnyChoiseContents = {type: AnyChoiseFormType, result: ResultData}

const AnyChoise: React.FC<Props> = (props) => {
  const [anyChoiseContents, setAnyChoiseContents] = React.useState<AnyChoiseContents>({type: AnyChoiseFormType.Initial, result: null})
  const se = React.useRef<SoundEffect>();

  const {
    title
  } = props;

  const startQuiz = React.useCallback(() => setAnyChoiseContents({type: AnyChoiseFormType.Quiz, result: null}), []);
  const toResult = React.useCallback((result: ResultData) => setAnyChoiseContents({type: AnyChoiseFormType.Result, result: result}), []);
  const doInitialize = React.useCallback(() => setAnyChoiseContents({type: AnyChoiseFormType.Initial, result: null}), []);

  const onClickStart = React.useCallback((flg: boolean) => {
    if(flg) {
      // AudioContextのinitializeはここでやる
      // callbackでロード完了を通知する
      se.current = new SoundEffect();
      se.current.pushSource(`/asset/sounds/collect_sound.wav`, 'collect_sound');
      se.current.pushSource(`/asset/sounds/wrong_sound.wav`, 'wrong_sound');
      se.current.pushSource(`/asset/sounds/tick_sound.wav`, 'tick_sound');
      se.current.onload = startQuiz;
      se.current.load();
      return;
    }
    se.current = null;
    startQuiz();
  }, [se]);
  return(
    <div className='max-w-6xl mx-auto'>
      <Header/>
      <div className='py-16'>
        {anyChoiseContents.type === AnyChoiseFormType.Initial && 
          <InitialForm
            title={title}
            onClickStart={onClickStart}
          />
        }
        {anyChoiseContents.type === AnyChoiseFormType.Quiz &&
          <QuizForm
            {...props}
            onFinished={toResult}
            soundEffect={se.current}
          />
        }
        {anyChoiseContents.type === AnyChoiseFormType.Result &&
          <ResultForm {...anyChoiseContents.result} {...props} doInitialize={doInitialize}/>
        }
      </div>
    </div>
  )
}

export default AnyChoise;