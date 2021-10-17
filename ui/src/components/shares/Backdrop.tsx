import React from 'react';
import { Box } from '@mui/system';

interface Props {
  openBackDrop: boolean;
}

const Backdrop = ({ openBackDrop }: Props) => {
  return openBackDrop ? (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9998,
        background: 'linear-gradient(rgba(0, 0, 0, .85), rgba(0, 0, 0, 0.99))',
      }}
    ></Box>
  ) : null;
};

export default Backdrop;
