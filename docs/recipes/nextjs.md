# Using `react-color-mode` with Next.js

This library was originally designed to work with Next.js, so integrating it is *beautifully* simple.

## Install the script

`react-color-mode` provides a `<script>` tag that needs to be injected as high as possible into your document (preferably in the `<head>`). This script allows us to setup the color mode before the rest of the page is loaded, preventing the page from flickering on page load. It needs to be installed in your [custom document](https://nextjs.org/docs/advanced-features/custom-document) \(Learn more about custom documents at [https://nextjs.org/docs/advanced-features/custom-document](https://nextjs.org/docs/advanced-features/custom-document)\):

```javascript
// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript } from 'react-color-mode'

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
```

## Install the Context Provider

[`<ColorModeContextProvider>`](../api/colormodecontextprovider.md) provides a `React.Context` from which you can access and update the current color mode. The easiest wayto use this provider in a Next.js app is by installing it in your [custom app](https://nextjs.org/docs/advanced-features/custom-app) \(Learn more about custom apps at [https://nextjs.org/docs/advanced-features/custom-app](https://nextjs.org/docs/advanced-features/custom-app)\):


```jsx
// pages/_app.js
import { ColorModeContextProvider } from 'react-color-mode'

export default function App({ Component, pageProps }) {
  return (
    <ColorModeContextProvider>
      <Component {...pageProps} />
    </ColorModeContextProvider>
  )
}
```

## Use and update the color mode

Once you've installed the `<ColorModeContextProvider>`, accessing and updating the color mode becomes simple using the [`useColorMode`](../api/usecolormode.md) hook:

```jsx
// pages/index.js
import { useColorMode } from 'react-color-mode'

export default function HomePage() {
  const {
    colorMode,
    updateColorMode,
  } = useColorMode()

  const isDarkMode = colorMode === 'dark'

  return (
    <div style={{
      backgroundColor: isDarkMode ? 'black' : 'white',
      color: isDarkMode ? 'white' : 'black',
    }}>
      <p>Hello!</p>

      <button onClick={() => updateColorMode('dark')}>
        Dark mode
      </button>
      <button onClick={() => updateColorMode('light')}>
        Light mode
      </button>
      <button onClick={() => updateColorMode('system')}>
        System mode
      </button>
    </div>
  )
}
```
