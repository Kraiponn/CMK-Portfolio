import React, { ReactNode } from 'react';
import Head from 'next/head';
import MainContent from './MainContent';

import { useAppSelector } from '@src/features/hooks/useStore';

import Backdrop from '@src/components/Backdrop';
import Loader from '@src/components/Loader';
import TopNavbar from './TopNavbar';

interface Props {
  title: string;
  description?: string;
  children: ReactNode;
}

const Layout = ({ title, description, children }: Props) => {
  const { isLoader } = useAppSelector((state) => state.ui);

  return (
    <>
      <Head>
        <title>{title}</title>
        {description && <meta name={title} content={description} />}
      </Head>

      <Loader isLoading={isLoader} />
      <Backdrop openBackDrop={isLoader} />

      <TopNavbar />
      <MainContent>{children}</MainContent>
    </>
  );
};

export default Layout;
