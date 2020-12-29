import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript } from 'next-color-mode'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <ColorModeScript />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
