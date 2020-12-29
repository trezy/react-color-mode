# `<ColorModeContextProvider>`

`<ColorModeContextProvider>` provides a `React.Context` from which you can access and update the current color mode.

_NOTE:_ Make sure to use the same values for `defaultMode` and `storageKey` on both [`<ColorModeScript>`](./colormodescript.md) and `<ColorModeContextProvider>`, otherwise you may still see a color mode flash when loading the app.

| Prop | Default | Description |
| :--- | :--- | :--- |
| `defaultMode` | `system` | default color mode is used if one hasn't been explicitly set by your app; can be `system`, `light`, or `dark` |
| `storageKey` | `react-color-mode` | this is the key that will be set on the `<html>` element, as well as in `localStorage` |

## Example

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
