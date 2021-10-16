import React, { useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import Image from 'next/image';

import { Box } from '@mui/system';
import {
  AppBar,
  Toolbar,
  Link,
  IconButton,
  Tooltip,
  Typography,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import LanguageIcon from '@mui/icons-material/Language';
// import PublicIcon from '@mui/icons-material/Public';

import thFlag from 'public/images/th-flag.png';
import enUSFlag from 'public/images/en-us-flag.png';

import { useAppDispatch, useAppSelector } from '@src/features/hooks/useStore';
import { signout } from '@src/features/store/slices/auth';
import {
  toggleThemeMode,
  setAppLanguages,
} from '@src/features/store/slices/ui';

import { enUs, th, EN_US_LOCALE_TYPE } from '@src/features/languages';
import {
  cmWhiteColor,
  cmYellowColor,
  cmDarkColor,
} from '@src/utils/colorsType';
import AccountSettings from './AccountSettingMenu';

/*************************************************************************
 *   MAIN METHOD
 */
const TopNavbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { themeMode, appLang } = useAppSelector((state) => state.ui);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const pageLangObj = appLang === EN_US_LOCALE_TYPE ? enUs : th;
  const topNavbarObj = pageLangObj.topNavBar;
  const openLangMenu = Boolean(anchorEl);

  const handleOpenLangMenu = (event: React.MouseEvent<null | HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosedLangMenu = (
    event: React.MouseEvent<null | HTMLElement>
  ) => {
    setAnchorEl(null);
  };

  const handleSelectAppLang = (lang: string) => {
    dispatch(setAppLanguages(lang));

    // router.push(`${pathname}`, `${pathname}`, { locale: lang });
  };

  const handleSignout = () => {
    dispatch(signout());

    router.push('/auth/signin', '/auth/signin', { locale: `${appLang}` });
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
        <NextLink href="/" passHref>
          <Link
            underline="none"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: '5rem',
            }}
          >
            {/* <Tooltip title={pageLangObj.homePage.title}> */}

            <Image
              src={`/images/business_man_thinking_1.svg`}
              alt="logo"
              width={35}
              height={35}
            />
            <Box
              sx={{
                color: `${cmYellowColor}`,
                alignSelf: 'center',
                fontFamily: 'JosefinSans-Bold',
                fontSize: '1.2rem',
              }}
              component="div"
            >
              CML
            </Box>
            {/* </Tooltip> */}
          </Link>
        </NextLink>

        <NextLink href="/products" passHref locale={appLang}>
          <Link underline="none" color="inherit">
            <Typography
              variant="h5"
              component="h5"
              sx={{
                color:
                  router.pathname === '/products'
                    ? cmYellowColor
                    : cmWhiteColor,
                marginRight: '1.2rem',
                ':hover': {
                  color: cmYellowColor,
                },
              }}
            >
              {topNavbarObj.product}
            </Typography>
          </Link>
        </NextLink>

        <NextLink href="/about" passHref locale={appLang}>
          <Link underline="none" color="inherit">
            <Typography
              variant="h5"
              component="h5"
              sx={{
                color:
                  router.pathname === '/about' ? cmYellowColor : cmWhiteColor,
                marginRight: '1.2rem',
                ':hover': {
                  color: cmYellowColor,
                },
              }}
            >
              {topNavbarObj.about}
            </Typography>
          </Link>
        </NextLink>
        <Box sx={{ flexGrow: 1 }}></Box>

        {user ? null : (
          <NextLink href="/auth/signin" passHref locale={appLang}>
            <Link underline="none" color="inherit">
              <Typography
                variant="h5"
                component="h5"
                sx={{
                  color:
                    router.pathname === '/auth/signin'
                      ? cmYellowColor
                      : cmWhiteColor,
                  marginRight: '1.2rem',
                  ':hover': {
                    color: cmYellowColor,
                  },
                }}
              >
                {topNavbarObj.signin}
              </Typography>
            </Link>
          </NextLink>
        )}

        <Tooltip title={topNavbarObj.buttonThemeMode} placement="bottom">
          <IconButton
            color="inherit"
            onClick={() => dispatch(toggleThemeMode())}
          >
            {!themeMode ? <BrightnessHighIcon /> : <Brightness2Icon />}
          </IconButton>
        </Tooltip>

        <Tooltip title={topNavbarObj.buttonLang} placement="bottom">
          <IconButton color="inherit" onClick={handleOpenLangMenu}>
            <LanguageIcon />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={openLangMenu}
          onClose={handleClosedLangMenu}
          onClick={handleClosedLangMenu}
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
          <MenuItem onClick={() => handleSelectAppLang('th')}>
            <Image src={thFlag} alt="Th-flag" width={30} height={30} /> &nbsp;{' '}
            {topNavbarObj.languageMenu.th}
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => handleSelectAppLang('en-US')}>
            <Image src={enUSFlag} alt="enUS-flag" width={30} height={30} />{' '}
            &nbsp; {topNavbarObj.languageMenu.enUs}
          </MenuItem>
        </Menu>

        {user && <AccountSettings onSignout={handleSignout} />}
      </Toolbar>
    </AppBar>
  );
};

export default TopNavbar;
