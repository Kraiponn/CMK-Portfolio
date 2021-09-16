import type {
  GetServerSidePropsContext,
  GetStaticPropsContext,
  NextPage,
} from 'next';
import { useTranslations } from 'use-intl';

import { Toolbar, Typography } from '@mui/material';
import Layout from '@src/components/Layout';

const Home: NextPage = () => {
  const t = useTranslations('HomePage');

  return (
    <Layout title="Home">
      <Toolbar />
      <Typography variant="h1">{t(`title`)}</Typography>
      <Typography variant="h2">{t(`title`)}</Typography>
      <Typography variant="h3">{t(`title`)}</Typography>
      <Typography variant="h4">{t(`title`)}</Typography>
      <Typography variant="h5">{t(`title`)}</Typography>
    </Layout>
  );
};

// export function getStaticProps({ locale }: GetStaticPropsContext) {
//   console.log(query);
//   console.log('query sssssssssss');

//   return {
//     props: {
//       messages: require(`@src/features/languages/${locale}.json`),
//     },
//   };
// }

export function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  const lang = query.lang ? query.lang : 'en';

  // console.log(context);
  console.log(query);

  return {
    props: {
      messages: require(`@src/features/languages/${lang}.json`),
    },
  };
}

export default Home;
