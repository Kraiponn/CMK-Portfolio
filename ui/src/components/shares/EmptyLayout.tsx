import React, { ReactNode } from 'react';
import Head from 'next/head';

// Components
import MainContent from '@src/components/shares/MainContent';

interface Props {
  title: string;
  description?: string;
  children: ReactNode;
}

const EmptyLayout = ({ title, description, children }: Props) => {
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
