import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

// Css frame work
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

// Components
import EmptyLayout from '@src/components/shares/EmptyLayout';
// import Backdrop from '@src/components/shares/Backdrop';
// import Loader from '@src/components/shares/Loader';
import MainContent from '@src/components/dashboard/shares/MainContent';
import CMAppBar from '@src/components/dashboard/shares/CMAppbar';
import CMDrawer from '@src/components/dashboard/shares/CMDrawer';

// State management
import { useAppDispatch, useAppSelector } from '@src/features/hooks/useStore';
import {
  openedDrawerMenu,
  closedDrawerMenu,
} from '@src/features/store/slices/dashboard';
import { getAuthState } from '@src/features/store/slices/auth';
import Cookies from 'js-cookie';

// App Languages
import { EN_US_LOCALE_TYPE, enUs, th } from '@src/features/languages';

/***************************************************************
 *                   Main Function
 **************************************************************/
const DashboardPage = () => {
  const { drawerOpen } = useAppSelector((state) => state.dashboard);
  const { appLang } = useAppSelector((state) => state.ui);
  // const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const theme = useTheme();

  const localToken = Cookies.get('authToken') || '';
  const { dashboardPage: pageLangObj } =
    appLang === EN_US_LOCALE_TYPE ? enUs : th;

  const handleDrawerOpen = () => {
    dispatch(openedDrawerMenu());
  };

  const handleDrawerClose = () => {
    dispatch(closedDrawerMenu());
  };

  /******************************************
   *  Life cycle control
   */
  useEffect(() => {
    if (!localToken) {
      router.push('/auth/signin', '/auth/signin', {
        locale: appLang,
      });
    } else {
      dispatch(getAuthState());
    }
  }, [appLang, localToken, router, dispatch]);

  return (
    <EmptyLayout title={pageLangObj.appbarTitle}>
      <Box sx={{ display: 'flex' }}>
        <CMAppBar
          title={pageLangObj.appbarTitle}
          open={drawerOpen}
          handleDrawerOpen={handleDrawerOpen}
        />

        <CMDrawer
          appLang={appLang}
          theme={theme}
          handleDrawerClose={handleDrawerClose}
        />

        <MainContent appLang={appLang} />
      </Box>
    </EmptyLayout>
  );
};

export default DashboardPage;
