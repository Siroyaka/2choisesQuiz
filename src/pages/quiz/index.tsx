import React from 'react';

import Head from 'next/head';

import { ResultFormReducers, resultFormInitialState, QuizResultTypes } from 'components/ResultForm/state';
import { QuizInfo, make1MulQuiz } from 'lib/makeQuiz';
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
          <QuizForm
            onFinished={setFinished}
            quiz={make1MulQuiz}
            captionSpeed={10}
            waitSec={1}
            quizLength={5}
          />
        }
        {result.isFinished &&
          <ResultForm {...result}/>
        }
      </main>
    </React.Fragment>
  )
}

export default QuizPage;