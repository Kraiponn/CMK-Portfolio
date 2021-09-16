import React, { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
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
} from '@mui/material';
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import LanguageIcon from '@mui/icons-material/Language';
import PublicIcon from '@mui/icons-material/Public';
import Logo from 'public/images/shopping1.png';
import { Box } from '@mui/system';

import { useAppDispatch, useAppSelector } from '@src/features/hooks/useStore';
import {
  toggleThemeMode,
  setAppLanguages,
} from '@src/features/store/slices/ui';
import { useTranslations } from 'use-intl';

interface Props {}

const TopNavbar = (props: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const t = useTranslations('TopNavbar');
  const dispatch = useAppDispatch();
  const { themeMode } = useAppSelector((state) => state.ui);
  const router = useRouter();

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

    router.push(`${pathname}?lang=${lang}`);
  };

  return (
    <AppBar sx={{ bgcolor: '#fff' }} elevation={0} position="fixed">
      <Toolbar>
        <NextLink href="/" passHref>
          <Link>
            <Image src={Logo} alt="logo" width={30} height={30} />
          </Link>
        </NextLink>
        <Box sx={{ flexGrow: 1 }}></Box>

        <NextLink href="/" passHref>
          <Link underline="none">
            <Typography
              variant="h4"
              component="h5"
              sx={{
                color: '#000',
                marginRight: '1.2rem',
                ':hover': {
                  color: '#F50057',
                },
              }}
            >
              {t('signin')}
            </Typography>
          </Link>
        </NextLink>

        <NextLink href="/" passHref>
          <Link underline="none">
            <Typography
              variant="h4"
              component="h5"
              sx={{
                color: '#000',
                marginRight: '1.2rem',
                ':hover': {
                  color: '#F50057',
                },
              }}
            >
              {t('about')}
            </Typography>
          </Link>
        </NextLink>

        <Tooltip title="Theme mode" placement="bottom">
          <IconButton
            sx={{ color: '#000' }}
            onClick={() => dispatch(toggleThemeMode())}
          >
            {!themeMode ? <BrightnessHighIcon /> : <Brightness2Icon />}
          </IconButton>
        </Tooltip>

        <Tooltip title="Changed languages" placement="bottom">
          <IconButton sx={{ color: '#000' }} onClick={handleOpenLangMenu}>
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
            <PublicIcon /> &nbsp;Thai
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => handleSelectAppLang('en')}>
            <PublicIcon /> &nbsp;English
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   console.log(context);
//   console.log('query sssssssssss');

//   return {
//     props: {
//       messages: require(`@src/features/languages/en.json`),
//     },
//   };
// };

export default TopNavbar;
