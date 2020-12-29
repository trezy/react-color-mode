import '../styles.css'

import { ColorModeContextProvider } from 'react-color-mode'

export default function App({ Component, pageProps }) {
  console.log({ColorModeContextProvider})
  return (
    <ColorModeContextProvider>
      <Component {...pageProps} />
    </ColorModeContextProvider>
  )
}
