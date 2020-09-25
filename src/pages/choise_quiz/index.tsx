import React from 'react';

import Link from 'next/link';
import Head from 'next/head';

import TopMenu from 'components/template/TopMenu';
import { pageData } from 'lib/pageList/choise_quiz';
import PocketLikeCard from 'components/standalone/PocketLikeCard';

const HeadItems: React.FC = () => {
  return(
    <Head>
      <title>多選択クイズ</title>
    </Head>
  )
}

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <HeadItems />
      <TopMenu title='多選択クイズ'>
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
