// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="font-montserrat">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
