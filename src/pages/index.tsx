import React from 'react';

import Link from 'next/link';
import Head from 'next/head';

const HeadItems: React.FC = () => {
  return(
    <Head>
      <title>選択クイズ</title>
    </Head>
  )
}

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <HeadItems />
      <div className='my-2 mx-4'>
        <Link href='/twochoise'>
          <button className='p-4 border hover:bg-blue-300 bg-blue-400 rounded-full focus:outline-none'>
            2択クイズ
          </button>
        </Link>
      </div>
    </React.Fragment>
  )
}

export default Home;