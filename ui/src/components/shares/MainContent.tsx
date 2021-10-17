import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const MainContent = ({ children }: Props) => {
  return <main>{children}</main>;
};

export default MainContent;
