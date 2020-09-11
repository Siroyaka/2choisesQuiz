import NextDocument, { Head, Main, NextScript } from 'next/document';

class MyDocument extends NextDocument {
  render() {
    return(
      <html>
        <Head>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default MyDocument;