import React from 'react';

// Css Frame Work
import { Box } from '@mui/system';
// import { Divider, Typography } from '@mui/material';

// Dashboard types
import {
  EDIT_PROPROFILE,
  EDIT_PASSWORD,
  ADD_USER,
} from '@src/utils/types/dashboard';

// State Managements
import { useAppSelector } from '@src/features/hooks/useStore';

// Languages
// import { enUs, th, EN_US_LOCALE_TYPE } from '@src/features/languages';

// Components
import EditProfile from '@src/components/dashboard/account/EditProfile';
import EditPassword from '@src/components/dashboard/account/EditPassword';
import CreatedUser from '@src/components/dashboard/account/CreatedUser';

/************************************************
 *    MAIN METHOD
 */
const AccountSettings = () => {
  const { drawerListAccountMenu: itemListMenu } = useAppSelector(
    (state) => state.dashboard
  );
  // const { appLang } = useAppSelector((state) => state.ui);

  // const { dashboardPage } = appLang === EN_US_LOCALE_TYPE ? enUs : th;

  return (
    <Box
      sx={{
        width: '100%',
        height: '90vh',
        margin: '1rem auto',
      }}
    >
      {/* <Typography variant="h3" component="h5">
        Account Settings
      </Typography>
      <Divider /> */}

      {itemListMenu.currentItem === EDIT_PROPROFILE ? <EditProfile /> : null}
      {itemListMenu.currentItem === EDIT_PASSWORD ? <EditPassword /> : null}
      {itemListMenu.currentItem === ADD_USER ? <CreatedUser /> : null}
    </Box>
  );
};

export default AccountSettings;
