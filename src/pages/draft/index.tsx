import React from 'react';

import Head from 'next/head';

import TopMenu from 'components/template/TopMenu';
import { pageData } from 'lib/pageList/draft';
import PocketLikeCard from 'components/standalone/PocketLikeCard';

const HeadItems: React.FC = () => {
  return(
    <Head>
      <title>試案</title>
    </Head>
  )
}

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <HeadItems />
      <TopMenu title='試案'>
        <div className='my-2 grid grid-cols-1 md:grid-cols-3 gap-2'>
          {pageData.map((v, i) => (
            <PocketLikeCard {...v} key={`contents-${i}`} />
          ))}
        </div>
      </TopMenu>
    </React.Fragment>
  )
}

export default Home;
