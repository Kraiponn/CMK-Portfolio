import React from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import type { GetServerSideProps, NextPage } from 'next';

// MUI components
import { Container, Toolbar, Typography } from '@mui/material';

// State management
import { useAppDispatch, useAppSelector } from '@src/features/hooks/useStore';
import { getAuthState } from '@src/features/store/slices/auth';

// App Languages
import { enUs, EN_US_LOCALE_TYPE, th } from '@src/features/languages';
import Layout from '@src/components/shares/Layout';

/*********************************************
 *    MAIN METHOD
 */
const ProductPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const pageLangObj = router.locale === EN_US_LOCALE_TYPE ? enUs : th;
  const ppLangObj = pageLangObj.productPage;
  const token = Cookies.get('authToken');

  // Make sure user is signin
  if (!user && !token) {
    router.push('/auth/signin', '/auth/signin', {
      locale: router.locale,
    });
  } else if (!user && token) {
    dispatch(getAuthState());
  }

  return (
    <Layout title={ppLangObj.title}>
      <Toolbar />
      <Container sx={{ my: '2rem' }}>
        <Typography variant="h1">{ppLangObj.title}</Typography>
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const { cookies } = context.req;
  // console.log('Server side token', cookies.authToken);

  // if (!cookies.authToken) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {},
  };
};

export default ProductPage;
