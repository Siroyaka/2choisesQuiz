import React from 'react';

import Head from 'next/head';

import { makeQuiz } from 'lib/makeQuiz';
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
  return(
    <React.Fragment>
      <HeadItem title={title}/>
      <main>
        <QuizTemplate
          title='テストクイズ'
          hashTags={['テストクイズ']}
          quiz={makeQuiz}
          captionSpeed={10}
          quizLength={5}
          timeLimit={10}
          countdownSpeed={500}
        />
      </main>
    </React.Fragment>
  )
}

export default QuizPage;