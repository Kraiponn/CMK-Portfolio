import React, { ReactNode, useEffect } from 'react';
import Head from 'next/head';

// App state management
import { useAppSelector, useAppDispatch } from '@src/features/hooks/useStore';
import { getAuthState } from '@src/features/store/slices/auth';

// Components
import MainContent from '@src/components/shares/MainContent';

interface Props {
  title: string;
  description?: string;
  children: ReactNode;
}

/*************************************************************************
 *                            MAIN METHOD
 ************************************************************************/
const EmptyLayout = ({ title, description, children }: Props) => {
  const dispatch = useAppDispatch();
  // const { isLoader } = useAppSelector((state) => state.ui);

  useEffect(() => {
    dispatch(getAuthState());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>{title}</title>
        {description && <meta name={title} content={description} />}
      </Head>

      <MainContent>{children}</MainContent>
    </>
  );
};

export default EmptyLayout;
