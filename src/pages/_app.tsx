import React from 'react';
import 'styles/tailwind.css';

import Head from 'next/head';

import Header from 'components/Header';
import InitialMetaData from 'lib/InitialMetaData';

const HeadItems = () => {
  return (
    <Head>
      <meta name="twitter:card" content="summary_large_image"></meta>
      <meta key='ogUrl' property="og:url" content={InitialMetaData.ogUrl}/>
      <meta key='ogTitle' property="og:title" content={InitialMetaData.ogTitle}/>
      <meta key='ogDescription' property="og:description" content={InitialMetaData.ogDescription}/>
      <meta key='ogImage' property="og:image" content={InitialMetaData.ogImage} />
    </Head>
  )
}

const MyApp = ({ Component, pageProps }) => {
  return(
    <React.Fragment>
      <HeadItems />
      <Component {...pageProps} />
    </React.Fragment>
  )
}

export default MyApp