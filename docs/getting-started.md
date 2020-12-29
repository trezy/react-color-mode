# Getting Started

## Requirements

* npm or Yarn
* Node.js
* React 16.8+

## Installation

```bash
npm install react-color-mode

# OR

yarn add react-color-mode
```

## Usage

### Setup your styles

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

### Install the script

`react-color-mode` exports a `<script>` tag to be injected into your `<head>`. This script allows `react-color-mode` to setup the color mode before the rest of the page is loaded, preventing the page from flickering on page load. This component should be rendered *as early as possible.* See our recipes section for the best way to accomplish this in your app.

```js
import { ColorModeScript } from 'react-color-mode'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
  (
    <>
      <ColorModeScript />
      <App />
    </>
  ),
  document.querySelector('#react-root')
)
```

### Install the Context Provider

The easiest way to use and update the color mode is via the Context API. This can be done with `<ColorModeContextProvider>` and the `useColorMode` hook.

```js
// index.js
import {
  ColorModeScript,
  ColorModeContextProvider,
} from 'react-color-mode'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
  (
    <>
      <ColorModeScript />
      <ColorModeContextProvider>
        <App />
      </ColorModeContextProvider>
    </>
  ),
  document.querySelector('#react-root')
)
```

```js
// App.js
import { useColorMode } from 'react-color-mode'

export default function App() {
  const {
    colorMode,
    updateColorMode,
  } = useColorMode()

  return (
    <>
      <p>The current color mode is: {colorMode}</p>
      <button onClick={() => updateColorMode('dark')}>Dark mode</button>
      <button onClick={() => updateColorMode('light')}>Light mode</button>
      <button onClick={() => updateColorMode('system')}>System mode</button>
    </>
  )
}
```
