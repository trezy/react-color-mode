import '../styles.css'

import { ColorModeContextProvider } from 'next-color-mode'

export default function App({ Component, pageProps }) {
  console.log({ColorModeContextProvider})
  return (
    <ColorModeContextProvider>
      <Component {...pageProps} />
    </ColorModeContextProvider>
  )
}
