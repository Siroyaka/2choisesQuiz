import React from 'react';

import Head from 'next/head';

import { makeTestAccumulations } from 'lib/createQuestion/accumulation';
import QuestionComponent from 'components/Accumulation';
import { exitOfQuestionCount } from 'lib/Useful';

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
        <QuestionComponent
          title='仲間作成'
          quiz={makeTestAccumulations}
          valueNames={['体力', '精神', '攻撃力', '防御力', '運']}
          initialValues={[10, 20, 5, 5, 3]}
          doExit={exitOfQuestionCount(5)}
        />
      </main>
    </React.Fragment>
  )
}

export default LikeDqSeedsPage;