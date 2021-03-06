import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <title>Hotel Simulator - Matic</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, 
user-scalable=no"
        ></meta>
        <Head>
          <link rel="shortcut icon" href="/static/icon.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
