import React from 'react';

import Head from 'next/head';

import QuizForm from 'components/QuizForm';
import ResultForm from 'components/ResultForm';

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
  const title = 'クイズ';
  const [finished, setFinished] = React.useState(false);
  return(
    <React.Fragment>
      <HeadItem title={title}/>
      <main>
        {!finished && 
          <QuizForm onFinished={() => setFinished(true)}/>
        }
        {finished &&
          <ResultForm />
        }
      </main>
    </React.Fragment>
  )
}

export default QuizPage;