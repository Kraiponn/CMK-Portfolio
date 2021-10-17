import React from 'react';

// Css Frame Work
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

// State Managements
import { useAppSelector } from '@src/features/hooks/useStore';

// Languages
import { enUs, th, EN_US_LOCALE_TYPE } from '@src/features/languages';

interface Props {}

/************************************************
 *    MAIN METHOD
 */
const AppSettings = (props: Props) => {
  return (
    <Box sx={{}}>
      <Typography variant="h2" component="h2">
        App Settings
      </Typography>
    </Box>
  );
};

export default AppSettings;
