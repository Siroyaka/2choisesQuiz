import React from 'react';

import { ResultFormReducers, resultFormInitialState, QuizResultTypes } from 'components/ResultForm/state';
import { QuizInfo } from 'lib/makeQuiz';
import QuizForm, {OwnProps as QuizFormProps} from 'components/QuizForm';
import ResultForm from 'components/ResultForm';

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
    })
  }, []);
  return(
    <React.Fragment>
      {!result.isFinished && 
        <QuizForm
          {...props}
          onFinished={setFinished}
        />
      }
      {result.isFinished &&
        <ResultForm {...result} title={title} hashTag={hashTag}/>
      }
    </React.Fragment>
  )
}

export default QuizTemplate;