import React from 'react';

import Head from 'next/head';

import { makeTestAccumulations, ResultData } from 'lib/createQuestion/accumulation';
import QuestionComponent from 'components/Accumulation';

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
  const doExit = (result: ResultData) => {
    return result.answeredCount >= 10;
  }
  return(
    <React.Fragment>
      <HeadItem title={title}/>
      <main className='h-full'>
        <QuestionComponent
          title='仲間作成'
          quiz={makeTestAccumulations}
          captionSpeed={10}
          timeLimit={10}
          countdownSpeed={1000}
          valueNames={['体力', '精神', '攻撃力', '防御力', '運']}
          initialValues={[10, 20, 5, 5, 3]}
          doExit={doExit}
        />
      </main>
    </React.Fragment>
  )
}

export default LikeDqSeedsPage;