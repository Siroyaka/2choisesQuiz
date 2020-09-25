import React from 'react';

import Link from 'next/link';
import Head from 'next/head';

import TopMenu from 'components/template/TopMenu';
import PocketLikeCard from 'components/standalone/PocketLikeCard';
import { pageData } from 'lib/pageList/twochoise';

const HeadItems: React.FC = () => {
  return(
    <Head>
      <title>2択クイズ</title>
    </Head>
  )
}

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <HeadItems />
      <TopMenu title='2択クイズ'>
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
