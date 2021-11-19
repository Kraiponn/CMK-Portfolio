import React from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import Image from 'next/image';

// Css frame work
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

// App Languages
import { EN_US_LOCALE_TYPE, enUs, th } from '@src/features/languages';

// Dashboard types
import {
  MANAGE_ACCOUNT,
  MANAGE_PRODUCT,
  MANAGE_ORDER,
  MANAGE_NOTIFICATION,
  MANAGE_SETTING,
} from '@src/utils/types/dashboard';

// State management
import { useAppDispatch, useAppSelector } from '@src/features/hooks/useStore';

// Components
import { DrawerHeader } from '@src/components/dashboard/shares/Complements';
import AccountSettings from '@src/components/dashboard/account';
import Product from '@src/components/dashboard/product';
import Order from '@src/components/dashboard/order';
import Notification from '@src/components/dashboard/notify';
import AppSettings from '@src/components/dashboard/app';

interface Props {
  appLang: string;
}

/***************************************************
 *                Main Function
 **************************************************/
const MainContent = ({ appLang }: Props) => {
  const { currentItem } = useAppSelector((state) => state.dashboard);

  return (
    <Box component="main" sx={{ flexGrow: 1, px: 1, py: 2 }}>
      <DrawerHeader />

      {currentItem === MANAGE_ACCOUNT ? <AccountSettings /> : null}
      {currentItem === MANAGE_PRODUCT ? <Product /> : null}
      {currentItem === MANAGE_ORDER ? <Order /> : null}
      {currentItem === MANAGE_NOTIFICATION ? <Notification /> : null}
      {currentItem === MANAGE_SETTING ? <AppSettings /> : null}
    </Box>
  );
};

export default MainContent;
