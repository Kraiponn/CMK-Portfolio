import React, { useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import Image from 'next/image';

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
  Avatar,
} from '@mui/material';
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import LanguageIcon from '@mui/icons-material/Language';
// import PublicIcon from '@mui/icons-material/Public';
import Logo from 'public/images/shopping2.png';
import { Box } from '@mui/system';

import thFlag from 'public/images/th-flag.png';
import enUSFlag from 'public/images/en-us-flag.png';

import { useAppDispatch, useAppSelector } from '@src/features/hooks/useStore';
import {
  toggleThemeMode,
  setAppLanguages,
} from '@src/features/store/slices/ui';

import { enUs, th, EN_US_LOCALE_TYPE } from '@src/features/languages';
import {
  cmSecondaryColor,
  cmWhiteColor,
  cmYellowColor,
  cmDarkColor,
} from '@src/utils/colorsType';

interface Props {}

const TopNavbar = (props: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { themeMode } = useAppSelector((state) => state.ui);

  const translateMsg = router.locale === EN_US_LOCALE_TYPE ? enUs : th;
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
    const { pathname } = router;
    dispatch(setAppLanguages(lang));

    router.push(`${pathname}`, `${pathname}`, { locale: lang });
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
          <Link>
            <Tooltip title={translateMsg.homePage.title}>
              <Avatar
                src="/images/monster-green.png"
                sx={{ width: 35, height: 35 }}
                alt="logo"
              />
            </Tooltip>
          </Link>
        </NextLink>
        <Box sx={{ flexGrow: 1 }}></Box>

        <NextLink href="/auth/signup" passHref locale={router.locale}>
          <Link underline="none" color="inherit">
            <Typography
              variant="h5"
              component="h5"
              sx={{
                color:
                  router.pathname === '/auth/signup'
                    ? cmYellowColor
                    : cmWhiteColor,
                marginRight: '1.2rem',
                ':hover': {
                  color: cmYellowColor,
                },
              }}
            >
              {translateMsg.topNavBar.signup}
            </Typography>
          </Link>
        </NextLink>

        <NextLink href="/auth/signin" passHref locale={router.locale}>
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
              {translateMsg.topNavBar.signin}
            </Typography>
          </Link>
        </NextLink>

        <NextLink href="/about" passHref locale={router.locale}>
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
              {translateMsg.topNavBar.about}
            </Typography>
          </Link>
        </NextLink>

        <Tooltip title="Theme mode" placement="bottom">
          <IconButton
            color="inherit"
            onClick={() => dispatch(toggleThemeMode())}
          >
            {!themeMode ? <BrightnessHighIcon /> : <Brightness2Icon />}
          </IconButton>
        </Tooltip>

        <Tooltip title="Changed languages" placement="bottom">
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
            <Image src={thFlag} alt="Th-flag" width={30} height={30} />{' '}
            &nbsp;Thai
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => handleSelectAppLang('en-US')}>
            <Image src={enUSFlag} alt="enUS-flag" width={30} height={30} />{' '}
            &nbsp;English
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavbar;
