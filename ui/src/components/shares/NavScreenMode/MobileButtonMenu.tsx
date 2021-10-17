import React from 'react';

// CSS Frame Work
import { Box } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

interface Props {
  isOpenMobileMenu: boolean;
  onToggleMobileMenu: () => void;
}

const MobileButtonMenu = ({ isOpenMobileMenu, onToggleMobileMenu }: Props) => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}></Box>

      <IconButton color="inherit" onClick={() => onToggleMobileMenu()}>
        {isOpenMobileMenu ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
    </>
  );
};

export default MobileButtonMenu;
