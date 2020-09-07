import React from 'react';
import 'styles/tailwind.css';

import Header from 'components/Header';

const MyApp = ({ Component, pageProps }) => {
  return(
    <React.Fragment>
      <Header title='2択クイズ'/>
      <div className='pt-16 h-full'>
        <Component {...pageProps} />
      </div>
    </React.Fragment>
  )
}

export default MyApp