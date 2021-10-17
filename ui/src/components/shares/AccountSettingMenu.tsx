import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { Tooltip, Menu, MenuItem, IconButton, Divider } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

// App languages
import { enUs, th, EN_US_LOCALE_TYPE } from '@src/features/languages';

interface Props {
  onSignout: () => void;
}

const AccountSettingMenu = ({ onSignout }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const router = useRouter();

  const pageLangObj = router.locale === EN_US_LOCALE_TYPE ? enUs : th;
  const menuObj = pageLangObj.topNavBar.accountMenu;
  const openAccountMenu = Boolean(anchorEl);

  const handleOpenAccountMenu = (
    event: React.MouseEvent<null | HTMLElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosedAccountMenu = (
    event: React.MouseEvent<null | HTMLElement>
  ) => {
    setAnchorEl(null);
  };

  const handleSelectedMenu = (menuKey: number) => {
    switch (menuKey) {
      case 1: // Redirect to dashboard page
        router.push('/dashboard', '/dashboard', { locale: `${router.locale}` });
        break;
      case 2: // Redirect to settings page
        router.push('/settings', '/settings', { locale: `${router.locale}` });
        break;
      case 3: // Signout and redirect to home page
        onSignout();
        break;

      default:
        router.push('/', '/', { locale: `${router.locale}` });
    }
  };

  return (
    <>
      <Tooltip title={`${menuObj.hover}`} placement="bottom">
        <IconButton color="inherit" onClick={handleOpenAccountMenu}>
          <PersonIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={openAccountMenu}
        onClose={handleClosedAccountMenu}
        onClick={handleClosedAccountMenu}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => handleSelectedMenu(1)}>
          <ManageAccountsIcon />
          &nbsp; {menuObj.dashboard}
        </MenuItem>
        <Divider />

        <MenuItem onClick={() => handleSelectedMenu(2)}>
          <SettingsIcon /> &nbsp; {menuObj.setting}
        </MenuItem>

        <MenuItem onClick={() => handleSelectedMenu(3)}>
          <PowerSettingsNewIcon /> &nbsp; {menuObj.signout}
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountSettingMenu;
