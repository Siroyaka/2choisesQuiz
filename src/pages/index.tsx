import React from 'react';

import Link from 'next/link';
import Head from 'next/head';

import PagesData from 'lib/PagesData';

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
      <div className='my-2 mx-4'>
        {PagesData.map(x => (
          <nav key={'contents-' + x.title}>
            <Link href={x.href}>
              <button className='p-4 border hover:bg-blue-300 bg-blue-400 rounded-full'>
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