import React from 'react';

import Head from 'next/head';

import QuizTemplate from 'components/Template/QuizTemplate';
import { make1MulQuiz } from 'lib/makeQuiz';

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
  const title = '超速2択掛け算100問';
  return(
    <React.Fragment>
      <HeadItem title={title}/>
      <main>
        <QuizTemplate
          title={title}
          hashTag={title}
          quiz={make1MulQuiz}
          captionSpeed={10}
          waitSec={2}
          quizLength={100}
          countdownSpeed={500}
          startCountdown={5}
          questionInterval={500}
        />
      </main>
    </React.Fragment>
  )
}

export default QuizPage;