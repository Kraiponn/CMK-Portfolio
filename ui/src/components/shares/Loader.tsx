import React from 'react';

import { css } from '@emotion/react';
import HashLoader from 'react-spinners/HashLoader';

interface Props {
  isLoading: boolean;
}

const overrideStyle = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 9999;
  transform: translate(-50%, -50%);
`;

const Loader = ({ isLoading }: Props) => {
  const mLoaderState = isLoading ? (
    <HashLoader
      color={'#ff0'}
      loading={isLoading}
      css={overrideStyle}
      size={150}
    />
  ) : null;

  return mLoaderState;
};

export default Loader;
