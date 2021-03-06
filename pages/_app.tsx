import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import { storeWrapper, StoreType } from '@store/store'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import PageWithLayoutType from '@constants/page'
import theme from '@theme/index'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { useStore } from 'react-redux'
import { authorizationProvider } from '@services/interceptor'
import createCache from '@emotion/cache'
import moment from 'moment'
import '@css/main.scss'

moment.locale('mn')

const createEmotionCache = () => {
  return createCache({ key: 'css' })
}

/**
 * withRedux HOC
 * NextJS wrapper for Redux
 */

const clientSideEmotionCache = createEmotionCache()

type Props = AppProps & {
  Component: PageWithLayoutType
  pageProps: any
  emotionCache?: EmotionCache
}

const CustomApp = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: Props) => {
  const Layout = Component.Layout ? Component.Layout : React.Fragment
  const store: StoreType = useStore()
  authorizationProvider()

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  return (
    <CacheProvider value={emotionCache}>
      <PersistGate persistor={persistStore(store)} loading={<div>Loading</div>}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </PersistGate>
    </CacheProvider>
  )
}

export default storeWrapper.withRedux(CustomApp)
