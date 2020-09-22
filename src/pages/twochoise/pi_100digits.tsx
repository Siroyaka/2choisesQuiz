import React from 'react';

import Head from 'next/head';

import InitialMetaData, { commonHashTags } from 'lib/InitialMetaData';
import { makePieQuiz } from 'lib/createQuestion/choiseQuiz';
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
      <meta key='ogUrl' property="og:url" content={`${InitialMetaData.ogUrl}/twochoise/pi_100digits`}/>
      <meta key='ogTitle' property="og:title" content={title}/>
      <meta key='ogDescription' property="og:description" content={'円周率何桁答えられる？'}/>
    </Head>
  )
}

const Pi100DigitsPage: React.FC<Props> = (props) => {
  const title = '円周率100桁クイズ';
  return(
    <React.Fragment>
      <HeadItem title={title}/>
      <main className='h-full'>
        <QuizComponent
          title={title}
          hashTags={[...commonHashTags, title]}
          quiz={makePieQuiz}
          captionSpeed={0}
          quizLength={100}
          wrongStop
        />
      </main>
    </React.Fragment>
  )
}

export default Pi100DigitsPage;