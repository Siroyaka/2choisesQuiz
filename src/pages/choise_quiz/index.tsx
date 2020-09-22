import React from 'react';

import Link from 'next/link';
import Head from 'next/head';

import { pageData } from 'lib/pageList/choise_quiz';

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
      <div className='my-2 mx-4'>
        {pageData.map(x => (
          <nav key={'contents-' + x.title}>
            <Link href={x.href}>
              <button className='p-4 border hover:bg-blue-300 bg-blue-400 rounded-full focus:outline-none'>
                {x.title}
              </button>
            </Link>
          </nav>
        ))}
      </div>
    </React.Fragment>
  )
}

export default Home;
