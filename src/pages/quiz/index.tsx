import React from 'react';

import Head from 'next/head';

import { ResultFormReducers, resultFormInitialState, QuizResultTypes } from 'components/ResultForm/state';
import { QuizInfo } from 'lib/makeQuiz';
import QuizForm from 'components/QuizForm';
import ResultForm from 'components/ResultForm';

interface OwnProps {

}

type Props = OwnProps;

const HeadItem: React.FC<{title: string}> = (props) => {
  const {
    title
  } = props;
  return(
    <Head>
      <title>{title}</title>
    </Head>
  )
}

const QuizPage: React.FC<Props> = (props) => {
  const title = 'クイズ';
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
      <HeadItem title={title}/>
      <main>
        {!result.isFinished && 
          <QuizForm onFinished={setFinished}/>
        }
        {result.isFinished &&
          <ResultForm {...result}/>
        }
      </main>
    </React.Fragment>
  )
}

export default QuizPage;