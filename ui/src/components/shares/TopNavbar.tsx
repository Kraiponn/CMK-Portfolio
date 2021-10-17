import React, { useState } from 'react';
import { useRouter } from 'next/router';

// CSS Frame Work
import useMediaQuery from '@mui/material/useMediaQuery';
import { AppBar, Toolbar, Link } from '@mui/material';

// App State Managements
import { useAppDispatch, useAppSelector } from '@src/features/hooks/useStore';
import { signout } from '@src/features/store/slices/auth';
import {
  toggleThemeMode,
  setAppLanguages,
} from '@src/features/store/slices/ui';

// Colors System
import { cmDarkColor } from '@src/utils/colorsType';

// Components
import NavLogo from '@src/components/shares/NavLogo';
import DeskTopMenu from '@src/components/shares/NavScreenMode/DeskTopMenu';
import MobileButtonMenu from '@src/components/shares/NavScreenMode/MobileButtonMenu';
import MobileMenu from '@src/components/shares/NavScreenMode/MobileMenu';

/*************************************
 *   MAIN METHOD
 ************************************/
const TopNavbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  let [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false);
  const { themeMode, appLang } = useAppSelector((state) => state.ui);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const openLangMenu = Boolean(anchorEl);
  // const isDesktopMode = useMediaQuery(theme.breakpoints.up('sm'));
  const isMobileScreen = useMediaQuery('(max-width:700px)');

  // Open menu for selected the languages (English, Thai)
  const handleOpenLangMenu = (event: React.MouseEvent<null | HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Close language menu
  const handleClosedLangMenu = (
    event: React.MouseEvent<null | HTMLElement>
  ) => {
    setAnchorEl(null);
  };

  // Selected app language type
  const handleSelectAppLang = (lang: string) => {
    dispatch(setAppLanguages(lang));
  };

  // Toggle app theme (Dark or Light mode)
  const handleToggleThemeMode = () => {
    dispatch(toggleThemeMode());
  };

  // Signout from application
  const handleSignout = () => {
    dispatch(signout());

    router.push('/auth/signin', '/auth/signin', { locale: `${appLang}` });
  };

  // Open mobile menu
  const handleToggleMobileMenu = () => {
    setOpenMobileMenu((openMobileMenu = !openMobileMenu));
  };

  const displayMobileMenu = () => {
    if (openMobileMenu) {
      return (
        <MobileMenu
          appLang={appLang}
          pathname={router.pathname}
          themeMode={themeMode}
          user={user}
          anchorEl={anchorEl}
          openLangMenu={openLangMenu}
          onToggleThemeMode={handleToggleThemeMode}
          onOpenLangMenu={handleOpenLangMenu}
          onClosedLangMenu={handleClosedLangMenu}
          onSelectedAppLang={handleSelectAppLang}
          onSignout={handleSignout}
          isOpenMobileMenu={openMobileMenu}
          onToggleMobileMenu={handleToggleMobileMenu}
        />
      );
    }

    return null;
  };

  return (
    <AppBar
      elevation={1}
      position="fixed"
      sx={{
        background: `linear-gradient(rgba(${cmDarkColor},.8), rgba(${cmDarkColor},.99))`,
      }}
    >
      <Toolbar>
        <NavLogo />

        {/* Check screen size */}
        {!isMobileScreen ? (
          <DeskTopMenu
            appLang={appLang}
            pathname={router.pathname}
            themeMode={themeMode}
            user={user}
            anchorEl={anchorEl}
            openLangMenu={openLangMenu}
            onToggleThemeMode={handleToggleThemeMode}
            onOpenLangMenu={handleOpenLangMenu}
            onClosedLangMenu={handleClosedLangMenu}
            onSelectedAppLang={handleSelectAppLang}
            onSignout={handleSignout}
          />
        ) : (
          <MobileButtonMenu
            isOpenMobileMenu={openMobileMenu}
            onToggleMobileMenu={handleToggleMobileMenu}
          />
        )}

        {isMobileScreen && displayMobileMenu()}
      </Toolbar>
    </AppBar>
  );
};

export default TopNavbar;
