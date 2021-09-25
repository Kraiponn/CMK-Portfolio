import React from 'react';
import type { GetStaticPropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';

// import Cookies from 'js-cookie';
import { Container, Toolbar, Typography } from '@mui/material';

// State management
// import { useAppDispatch, useAppSelector } from '@src/features/hooks/useStore';
// import { getAuthState } from '@src/features/store/slices/auth';

// App Languages
import { EN_US_LOCALE_TYPE, enUs, th } from '@src/features/languages';

import Layout from '@src/components/Layout';

const Home: NextPage = () => {
  const router = useRouter();
  // const dispatch = useAppDispatch();
  // const { user } = useAppSelector((state) => state.auth);

  const pageLangObj = router.locale === EN_US_LOCALE_TYPE ? enUs : th;
  const homeLangObj = pageLangObj.homePage;
  // const token = Cookies.get('authToken');

  // Make sure user is signin
  // if (!user && !token) {
  //   router.push('/auth/signin', '/auth/signin', {
  //     locale: router.locale,
  //   });
  // } else if (!user && token) {
  //   dispatch(getAuthState());
  // }

  return (
    <Layout title={homeLangObj.title}>
      <Toolbar />
      <Container sx={{ my: '2rem' }}>
        <Typography variant="h1">{homeLangObj.title}</Typography>
      </Container>
    </Layout>
  );
};

export function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      // messages: require(`@src/features/languages/${locale}.json`),
    },
  };
}

export default Home;
