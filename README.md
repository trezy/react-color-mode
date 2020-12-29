# react-color-mode

`react-color-mode` makes it easy to support your user's color mode preference, whether they like light mode, dark mode, or they want you to respect their system preferences.

## Quick Start

### Requirements

* npm or Yarn
* Node.js
* React 16.8+
* Next.js 9.5+

### Installation

```bash
npm install react-color-mode

# OR

yarn add react-color-mode
```

### Usage

#### Setup your styles

`react-color-mode` will set a special attribute on your `<html>` tag, allowing you to style your site based on it.

```css
/* Set default light mode colors on <html> */
:root {
  background-color: white;
  color: black;
}

/* User is in light mode, but has selected dark mode */
:root[react-color-mode="dark"] {
  background-color: black;
  color: white;
}

/* User is in dark mode and HAS NOT has selected light mode */
@media (prefers-color-scheme: dark) {
  :root:not([react-color-mode="light"]) {
    background-color: black;
    color: white;
  }
}
```

#### Install the script

`react-color-mode` exports a `<script>` tag to be injected into your `<head>`. This script allows us to setup the color mode before the rest of the page is loaded, preventing the page from flickering on page load. It needs to be installed in your [custom document](https://nextjs.org/docs/advanced-features/custom-document) (Learn more about custom documents at https://nextjs.org/docs/advanced-features/custom-document):

```js
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

See the [Configuration](#configuration) section for details on how to make `react-color-mode` a bit more flexible.

## Exports

### `<ColorModeScript>`

`<ColorModeScript>` handles setting up the color mode before the rest of your Next.js application has loaded. See [Install the script](#install-the-script) for installation details.

| Prop          | Default           | Description                                                                                                   |
|---------------|-------------------|---------------------------------------------------------------------------------------------------------------|
| `defaultMode` | `system`          | default color mode is used if one hasn't been explicitly set by your app; can be `system`, `light`, or `dark` |
| `storageKey`  | `react-color-mode` | this is the key that will be set on the `<html>` element, as well as in `localStorage`                        |

#### Example

```jsx
<ColorModeScript
  defaultMode="dark"
  storageKey="my-dark-mode-storage-key" />
```

### `<ColorModeContextProvider>`

`<ColorModeContextProvider>` provides a `React.Context` from which you can access and update the current color mode.

*NOTE:* Make sure to use the same values for `defaultMode` and `storageKey` on both `<ColorModeScript>` and `<ColorModeContextProvider>`, otherwise you may still see a color mode flash when loading the app.

| Prop          | Default           | Description                                                                                                   |
|---------------|-------------------|---------------------------------------------------------------------------------------------------------------|
| `defaultMode` | `system`          | default color mode is used if one hasn't been explicitly set by your app; can be `system`, `light`, or `dark` |
| `storageKey`  | `react-color-mode` | this is the key that will be set on the `<html>` element, as well as in `localStorage`                        |

#### Example

```jsx
// pages/_app.js
import { ColorModeContextProvider } from 'react-color-mode'

export default function App({ Component, pageProps }) {
  return (
    <ColorModeContextProvider
      defaultMode="dark"
      storageKey="my-dark-mode-storage-key">
      <Component {...pageProps} />
    </ColorModeContextProvider>
  )
}
```

### `ColorModeContext`

`ColorModeContext` provides access to all of the data made available by `<ColorModeContextProvider>`. This is mostly exposed for use in class components; if you're using function components, use [`useColorMode`](#usecolormode) instead.

*NOTE:* `<ColorModeContextProvider>` must be available in a higher scope* for this to be used.

#### Example

```jsx
import { ColorModeContext } from 'react-color-mode'

export class DarkModeComponent extends React.Component {
  static contextType = ThemeContext

  render() {
    const isDarkMode = this.context.colorMode === 'dark'

    return (
      <div style={{
        backgroundColor: isDarkMode ? 'black' : 'white',
        color: isDarkMode ? 'white' : 'black',
      }} />
    )
  }
}
```

### `useColorMode`

`useColorMode` is a hook that provides access to all of the data made available by `<ColorModeContextProvider>`.

#### Example

```jsx
import { useColorMode } from 'react-color-mode'

export function DarkModeComponent() {
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
      Hello!
      <button
        disabled={colorMode === 'dark'}
        onClick={() => updateColorMode('dark')}>
        Dark mode
      </button>
      <button
        disabled={colorMode === 'light'}
        onClick={() => updateColorMode('light')}>
        Light mode
      </button>
      <button
        disabled={colorMode === 'system'}
        onClick={() => updateColorMode('system')}>
        System mode
      </button>
    </div>
  )
}
```

## Acknowledgments

* Thanks to @joshwcomeau for his excellent article: https://www.joshwcomeau.com/react/dark-mode/
