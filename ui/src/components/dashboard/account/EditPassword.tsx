import React from 'react';

// Css Frame Work
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

// State Managements
import { useAppSelector } from '@src/features/hooks/useStore';

// Languages
import { enUs, th, EN_US_LOCALE_TYPE } from '@src/features/languages';

// Components

interface Props {
  appLang: string;
}

/************************************************
 *    MAIN METHOD
 */
const EditPassword = () => {
  return (
    <Box
      sx={{
        width: '90%',
        height: '90vh',
        margin: '0 auto',
      }}
    >
      <Typography variant="h2" component="h2">
        Edit Password
      </Typography>
    </Box>
  );
};

export default EditPassword;
