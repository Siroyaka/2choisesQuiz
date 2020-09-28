import React from 'react';

import MainForm, { Props as MainFormProps } from './MainForm';

import { IQuestionFormProps } from 'lib/IQuestion';
import SoundEffect from 'lib/soundEffect';
import { ResultData } from 'lib/createQuestion/accumulation';

interface OwnProps {

}

type Props = OwnProps & Omit<MainFormProps, 'onFinished'>;

const Accumulation: React.FC<Props> = (props) => {
  const setFinished = React.useCallback((result: ResultData) => {

  }, [])
  return(
    <div>
      <MainForm
        {...props}
        onFinished={setFinished}
      />
    </div>
  )
}

export default Accumulation;