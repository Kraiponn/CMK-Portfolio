import React from 'react';

import { Box } from '@mui/system';
import { IconButton, Tooltip } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

interface Props {
  handleClickBackToHomePage: () => void;
}

const TopNavMenu = ({ handleClickBackToHomePage }: Props) => {
  const handleButtonClick = () => {
    handleClickBackToHomePage();
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <Tooltip title="Back to home">
        <IconButton color="primary" onClick={handleButtonClick}>
          <ExitToAppIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default TopNavMenu;
