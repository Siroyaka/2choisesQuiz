import React from 'react';

import Head from 'next/head';

import { makeTestQuiz } from 'lib/createQuestion/choiseQuiz';
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

const LikeDqSeedsPage: React.FC<Props> = (props) => {
  const title = '仲間作成';
  return(
    <React.Fragment>
      <HeadItem title={title}/>
      <main className='h-full'>
        <QuizComponent
          title='テストクイズ'
          hashTags={[]}
          quiz={makeTestQuiz}
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

export default LikeDqSeedsPage;