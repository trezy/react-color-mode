# `useColorMode`

`useColorMode` is a hook that provides access to all of the data made available by [`<ColorModeContextProvider>`](./colormodecontextprovider.md).

## Example

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
