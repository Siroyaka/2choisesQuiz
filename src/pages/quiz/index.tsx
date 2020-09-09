import React from 'react';

import Head from 'next/head';

import { ResultFormReducers, resultFormInitialState, QuizResultTypes } from 'components/ResultForm/state';
import { QuizInfo, make1MulQuiz, makeQuiz } from 'lib/makeQuiz';
import QuizTemplate from 'components/Template/QuizTemplate';

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
  const title = 'テストクイズ';
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
        <QuizTemplate
          title='テストクイズ'
          hashTag='二択クイズのテスト'
          quiz={makeQuiz}
          countdownSpeed={100}
          captionSpeed={10}
          quizLength={5}
        />
      </main>
    </React.Fragment>
  )
}

export default QuizPage;