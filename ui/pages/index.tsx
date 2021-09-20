import React from 'react';
import { useRouter } from 'next/router';

import { Container, Toolbar, Typography } from '@mui/material';
import type {
  // GetServerSidePropsContext,
  GetStaticPropsContext,
  NextPage,
} from 'next';
import { enUs, th, EN_US_LOCALE_TYPE } from '@src/features/languages';

import Layout from '@src/components/Layout';

const Home: NextPage = () => {
  const router = useRouter();
  const translateMsg = router.locale === EN_US_LOCALE_TYPE ? enUs : th;

  return (
    <Layout title={translateMsg.homePage.title}>
      <Toolbar />
      <Container sx={{ my: '2rem' }}>
        <Typography variant="h1">{translateMsg.homePage.title}</Typography>
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
