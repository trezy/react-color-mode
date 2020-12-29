# `ColorModeContext`

`ColorModeContext` provides access to all of the data made available by `<ColorModeContextProvider>`. This is mostly exposed for use in class components; if you're using function components, use [`useColorMode`](./usecolormode.md) instead.

_NOTE:_ `<ColorModeContextProvider>` must be available in a higher scope\* for this to be used.

## Example

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
