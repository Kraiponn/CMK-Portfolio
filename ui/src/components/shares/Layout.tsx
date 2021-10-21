import React, { ReactNode, useEffect } from 'react';
import Head from 'next/head';

// App state management
import { useAppDispatch } from '@src/features/hooks/useStore';
import { getAuthState } from '@src/features/store/slices/auth';

// Components
import MainContent from '@src/components/shares/MainContent';
import TopNavbar from '@src/components/shares/TopNavbar';

interface Props {
  title: string;
  description?: string;
  children: ReactNode;
}

/*************************************************************************
 *                            MAIN METHOD
 ************************************************************************/
const Layout = ({ title, description, children }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAuthState());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>{title}</title>
        {description && <meta name={title} content={description} />}
      </Head>

      <TopNavbar />
      <MainContent>{children}</MainContent>
    </>
  );
};

export default Layout;
