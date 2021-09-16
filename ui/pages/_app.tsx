import '@styles/appStyles.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

// Include multi languages lib
import { NextIntlProvider } from 'next-intl';

// Theme settings with Material UI
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { useTheme } from '@src/features/hooks/useTheme';
import createEmotionCache from '@src/configs/createEmotionCache';

// State management
import { storeWrapper } from '@src/features/store';

const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, pageProps }: AppProps) {
  const { theme } = useTheme();

  // return <Component {...pageProps} />;
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />

        <NextIntlProvider messages={pageProps.messages}>
          <Component {...pageProps} />
        </NextIntlProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
export default storeWrapper.withRedux(MyApp);
