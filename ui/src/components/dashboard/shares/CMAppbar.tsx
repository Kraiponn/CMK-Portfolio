import React from 'react';

// Components
import { Box } from '@mui/system';
import { AppBar } from '@src/components/dashboard/shares/Complements';
import { IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

// App state
import { useAppSelector } from '@src/features/hooks/useStore';

interface Props {
  open: boolean;
  title: string;
  handleDrawerOpen: () => void;
}

/***************************************************
 *                Main Function
 **************************************************/
const CMAppbar = ({ open, title, handleDrawerOpen }: Props) => {
  const { user } = useAppSelector((state) => state.auth);

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
        <Box sx={{ flexGrow: 1 }}></Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ManageAccountsIcon />
          &nbsp;
          <Typography variant="h5" noWrap component="div">
            {user?.username ? user.username : ''}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default CMAppbar;
