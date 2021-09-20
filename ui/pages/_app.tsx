import React, { useState } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '@styles/appStyles.css';
import 'react-toastify/dist/ReactToastify.css';

// React query
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

// Theme settings with Material UI
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { useTheme } from '@src/features/hooks/useTheme';
import createEmotionCache from '@src/configs/createEmotionCache';

// State management
import { PersistGate } from 'redux-persist/integration/react';
import { storeWrapper, persistor } from '@src/features/store';

const clientSideEmotionCache = createEmotionCache();

import axios from 'axios';

axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v2021',
});

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const { theme } = useTheme();

  return (
    <PersistGate loading={null} persistor={persistor}>
      <CacheProvider value={clientSideEmotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>

        <ThemeProvider theme={theme}>
          <CssBaseline />

          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <Hydrate state={pageProps.dehydratedState}>
              <Component {...pageProps} />
            </Hydrate>
          </QueryClientProvider>
        </ThemeProvider>
      </CacheProvider>
    </PersistGate>
  );
}
export default storeWrapper.withRedux(MyApp);
