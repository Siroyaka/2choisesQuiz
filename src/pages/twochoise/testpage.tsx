import React from 'react';

import Head from 'next/head';

import { make2ChoiseTestQuiz } from 'lib/createQuestion/choiseQuiz';
import QuizComponent from 'components/AnyChoise';

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

const TestQuizPage: React.FC<Props> = (props) => {
  const title = 'テストクイズ';
  return(
    <React.Fragment>
      <HeadItem title={title}/>
      <main className='h-full'>
        <QuizComponent
          title='テストクイズ'
          hashTags={[]}
          quiz={make2ChoiseTestQuiz}
          captionSpeed={10}
          quizLength={5}
          timeLimit={10}
          countdownSpeed={500}
          notShare
        />
      </main>
    </React.Fragment>
  )
}

export default TestQuizPage;