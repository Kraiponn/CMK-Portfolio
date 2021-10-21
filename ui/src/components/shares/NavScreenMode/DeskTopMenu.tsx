import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';

// Css frame work
import { Box } from '@mui/system';
import {
  Link,
  IconButton,
  Tooltip,
  Typography,
  // Menu,
  // MenuItem,
  // Divider,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
// import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';
// import Brightness2Icon from '@mui/icons-material/Brightness2';
// import LanguageIcon from '@mui/icons-material/Language';

// Type for this component
import { IUser } from '@src/utils/types/auth';

// App Languages
import { enUs, th, EN_US_LOCALE_TYPE } from '@src/features/languages';

// Colors System
import { cmWhiteColor, cmYellowColor } from '@src/utils/colorsType';

// Components
import AccountSettings from '@src/components/shares/NavScreenMode/AccountSettingMenu';
import thFlag from 'public/images/th-flag.png';
import enUSFlag from 'public/images/en-us-flag.png';
import Settings from '@mui/icons-material/Settings';
import { TH_LOCALE_TYPE } from '@src/features/languages/enUs';

// Interface
interface IProps {
  appLang: string;
  pathname: string;
  user?: IUser | null | undefined;
  themeMode: boolean;
  anchorEl: HTMLElement | null;
  openLangMenu: boolean;
  onToggleThemeMode: () => void;
  onOpenLangMenu: (event: React.MouseEvent<null | HTMLElement>) => void;
  onClosedLangMenu: (event: React.MouseEvent<null | HTMLElement>) => void;
  onSelectedAppLang: (type: string) => void;
  onSignout: () => void;
}

/********************************************
 *              MAIN METHOD
 *******************************************/
const DeskTopMenu = ({
  appLang,
  pathname,
  user,
  // themeMode,
  // anchorEl,
  // openLangMenu,
  // onToggleThemeMode,
  // onOpenLangMenu,
  // onClosedLangMenu,
  // onSelectedAppLang,
  onSignout,
}: IProps) => {
  const router = useRouter();
  const { topNavBar: pageLangObj } = appLang === EN_US_LOCALE_TYPE ? enUs : th;

  // const handleSelectedAppLang = (type: string) => {
  //   onSelectedAppLang(type);
  // };

  const handleNavigateToPage = (pathName: string) => {
    router.push(`/${pathName}`, `/${pathName}`, { locale: appLang });
  };

  return (
    <>
      {/* Product page link */}
      <NextLink href="/products" passHref locale={appLang}>
        <Link underline="none" color="inherit">
          <Typography
            variant="h5"
            component="h5"
            sx={{
              color: appLang === '/products' ? cmYellowColor : cmWhiteColor,
              marginRight: '1.2rem',
              ':hover': {
                color: cmYellowColor,
              },
            }}
          >
            {pageLangObj.product}
          </Typography>
        </Link>
      </NextLink>
      <NextLink href="/about" passHref locale={appLang}>
        <Link underline="none" color="inherit">
          <Typography
            variant="h5"
            component="h5"
            sx={{
              color: pathname === '/about' ? cmYellowColor : cmWhiteColor,
              marginRight: '1.2rem',
              ':hover': {
                color: cmYellowColor,
              },
            }}
          >
            {pageLangObj.about}
          </Typography>
        </Link>
      </NextLink>
      <Box sx={{ flexGrow: 1 }}></Box>
      {/* Signin Link */}
      {user ? null : (
        <NextLink href="/auth/signin" passHref locale={appLang}>
          <Link underline="none" color="inherit">
            <Typography
              variant="h5"
              component="h5"
              sx={{
                color:
                  pathname === '/auth/signin' ? cmYellowColor : cmWhiteColor,
                marginRight: '1.2rem',
                ':hover': {
                  color: cmYellowColor,
                },
              }}
            >
              {pageLangObj.signin}
            </Typography>
          </Link>
        </NextLink>
      )}
      {/* Flag to show app language */}
      {appLang === TH_LOCALE_TYPE ? (
        <Image src={thFlag} alt="Th-flag" width={30} height={30} />
      ) : (
        <Image src={enUSFlag} alt="Th-flag" width={30} height={30} />
      )}
      &nbsp; {/* Setting page link */}
      <Tooltip
        title={pageLangObj.settingLink}
        placement="bottom"
        onClick={() => handleNavigateToPage('setting')}
      >
        <IconButton color="inherit">
          <Settings />
        </IconButton>
      </Tooltip>
      {/* Account setting link */}
      {user && (
        <AccountSettings appLang={appLang} onSignout={() => onSignout()} />
      )}
      {/* <Tooltip title={pageLangObj.buttonThemeMode} placement="bottom">
        <IconButton
          color="inherit"
          // onClick={() => dispatch(toggleThemeMode())}
          onClick={() => onToggleThemeMode()}
        >
          {!themeMode ? <BrightnessHighIcon /> : <Brightness2Icon />}
        </IconButton>
      </Tooltip>

      <Tooltip title={pageLangObj.buttonLang} placement="bottom">
        <IconButton
          color="inherit"
          onClick={(event: React.MouseEvent<null | HTMLElement>) =>
            onOpenLangMenu(event)
          }
        >
          <LanguageIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={openLangMenu}
        onClose={(event: React.MouseEvent<null | HTMLElement>) =>
          onClosedLangMenu(event)
        }
        onClick={(event: React.MouseEvent<null | HTMLElement>) =>
          onClosedLangMenu(event)
        }
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
        <MenuItem onClick={() => handleSelectedAppLang('th')}>
          <Image src={thFlag} alt="Th-flag" width={30} height={30} /> &nbsp;{' '}
          {pageLangObj.languageMenu.th}
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleSelectedAppLang('en-US')}>
          <Image src={enUSFlag} alt="enUS-flag" width={30} height={30} /> &nbsp;{' '}
          {pageLangObj.languageMenu.enUs}
        </MenuItem>
      </Menu> */}
    </>
  );
};

export default DeskTopMenu;
