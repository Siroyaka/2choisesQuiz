import React from 'react';

import Head from 'next/head';

import InitialMetaData, {commonHashTags} from 'lib/InitialMetaData';
import { make1MulQuiz } from 'lib/createQuestion/choiseQuiz';
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
      <meta key='ogUrl' property="og:url" content={`${InitialMetaData.ogUrl}/twochoise/speed_mul100`}/>
      <meta key='ogTitle' property="og:title" content={title}/>
      <meta key='ogDescription' property="og:description" content={'100問の簡単な掛け算を何問解けるかな？答える時間は1問1秒しかないから急いでね！'}/>
    </Head>
  )
}

const QuizPage: React.FC<Props> = (props) => {
  const title = '超速2択掛け算100問';
  return(
    <React.Fragment>
      <HeadItem title={title}/>
      <main className='h-full'>
        <QuizComponent
          title={title}
          hashTags={[...commonHashTags]}
          quiz={make1MulQuiz(2)}
          captionSpeed={25}
          timeLimit={2}
          quizLength={100}
          startCountdown={4}
          countdownSpeed={500}
          questionInterval={500}
        />
      </main>
    </React.Fragment>
  )
}

export default QuizPage;