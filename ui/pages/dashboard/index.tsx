import React, { useState, useEffect } from 'react';
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
import { signout } from '@src/features/store/slices/auth';
import Cookies from 'js-cookie';

// App Languages
import { EN_US_LOCALE_TYPE, enUs, th } from '@src/features/languages';

/***************************************************************
 *                   Main Function
 **************************************************************/
const DashboardPage = () => {
  // const { user, token } = useAppSelector((state) => state.auth);
  const { appLang } = useAppSelector((state) => state.ui);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const localToken = Cookies.get('authToken') || '';
  const { dashboardPage: pageLangObj } =
    appLang === EN_US_LOCALE_TYPE ? enUs : th;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClickedMenu = (itemNo: number) => {
    switch (itemNo) {
      case 0:
        router.push('/', '/', { locale: appLang });
        break;

      case 1:
        router.push('/', '/', { locale: appLang });
        break;
      case 2:
        router.push('/', '/', { locale: appLang });
        break;
      case 3:
        router.push('/', '/', { locale: appLang });
        break;
      case 4:
        router.push('/', '/', { locale: appLang });
        break;
      case 5:
        router.push('/', '/', { locale: appLang });
        break;
      case 6: {
        dispatch(signout());
        router.push('/auth/signin', '/auth/signin', { locale: appLang });
        break;
      }

      default:
        router.push('/', '/', { locale: appLang });
    }
  };

  /******************************************
   *  Life cycle control
   */
  useEffect(() => {
    if (!localToken) {
      router.push('/auth/signin', '/auth/signin', {
        locale: appLang,
      });
    }
  }, [appLang, localToken, router]);

  return (
    <EmptyLayout title={pageLangObj.appbarTitle}>
      <Box sx={{ display: 'flex' }}>
        <CMAppBar
          title={pageLangObj.appbarTitle}
          open={open}
          handleDrawerOpen={handleDrawerOpen}
        />

        <CMDrawer
          appLang={appLang}
          theme={theme}
          open={open}
          title={pageLangObj.drawerMenu.minimizeMenu}
          homeLabel={pageLangObj.drawerMenu.home}
          accountLabel={pageLangObj.drawerMenu.account}
          productLabel={pageLangObj.drawerMenu.product}
          orderLabel={pageLangObj.drawerMenu.order}
          notifyLabel={pageLangObj.drawerMenu.notification}
          settingLabel={pageLangObj.drawerMenu.setting}
          signoutLabel={pageLangObj.drawerMenu.signout}
          handleDrawerClose={handleDrawerClose}
          handleClickedMenu={handleClickedMenu}
        />

        <MainContent appLang={appLang} />
      </Box>
    </EmptyLayout>
  );
};

export default DashboardPage;
