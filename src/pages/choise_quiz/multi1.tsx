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
      <meta key='ogUrl' property="og:url" content={`${InitialMetaData.ogUrl}/choise_quiz/multi1`}/>
      <meta key='ogTitle' property="og:title" content={title}/>
      <meta key='ogDescription' property="og:description" content={'1桁の掛け算を10問解いてみよう！'}/>
    </Head>
  )
}

const QuizPage: React.FC<Props> = (props) => {
  const title = '掛け算10問クイズ';
  return(
    <React.Fragment>
      <HeadItem title={title}/>
      <main className='h-full'>
        <QuizComponent
          title={title}
          hashTags={[...commonHashTags, title]}
          quiz={make1MulQuiz(3)}
          quizLength={10}
          startCountdown={4}
        />
      </main>
    </React.Fragment>
  )
}

export default QuizPage;