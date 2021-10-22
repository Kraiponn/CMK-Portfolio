import React from 'react';

// Components
import { AppBar } from '@src/components/dashboard/shares/Complements';
import { IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface Props {
  open: boolean;
  title: string;
  handleDrawerOpen: () => void;
}

/***************************************************
 *                Main Function
 **************************************************/
const CMAppbar = ({ open, title, handleDrawerOpen }: Props) => {
  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h5" noWrap component="div">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default CMAppbar;
