import React from 'react';

import Head from 'next/head';

import InitialMetaData from 'lib/InitialMetaData';

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
      <meta key='ogUrl' property="og:url" content={`${InitialMetaData.ogUrl}/original/pi_100digits`}/>
      <meta key='ogTitle' property="og:title" content={title}/>
      <meta key='ogDescription' property="og:description" content={'ランダムにキャラクターを成長させよう'}/>
    </Head>
  )
}

const SeedsLikeDqPage: React.FC<Props> = (props) => {
  const title = '成長ゲーム';
  return(
    <React.Fragment>
      <HeadItem title={title}/>
      <main className='h-full'>
      </main>
    </React.Fragment>
  )
}

export default SeedsLikeDqPage;