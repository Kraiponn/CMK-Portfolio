import React from 'react';

// Css frame work
import { Box } from '@mui/system';
import { IconButton, Typography } from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import CloseIcon from '@mui/icons-material/Close';

// Type for this component
import { IUser } from '@src/utils/types/auth';

// App Languages
import { enUs, th, EN_US_LOCALE_TYPE } from '@src/features/languages';

// Colors System
import { cmPrimaryColor, cmYellowColor } from '@src/utils/colorsType';

// Components
import MobileMenuLink from '@src/components/shares/NavScreenMode/MobileMenuLink';

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
  isOpenMobileMenu: boolean;
  onToggleMobileMenu: () => void;
}

/********************************************
 *              MAIN METHOD
 *******************************************/
const MobileMenu = ({
  appLang,
  pathname,
  user,
  onSignout,
  onToggleMobileMenu,
}: IProps) => {
  const { topNavBar: pageLangObj } = appLang === EN_US_LOCALE_TYPE ? enUs : th;

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        background: `${cmPrimaryColor}`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
          height: '54px',
          p: 2,
        }}
      >
        <IconButton color="inherit" onClick={() => onToggleMobileMenu()}>
          <CloseIcon fontSize="large" />
        </IconButton>
      </Box>

      <Box
        sx={{
          width: '50%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <MobileMenuLink
          title={pageLangObj.home}
          pathname="/"
          isActive={pathname === '/' ? true : false}
          marginTop={'3rem'}
          padding={'1rem 0px'}
        />

        <MobileMenuLink
          title={pageLangObj.product}
          pathname="/products"
          isActive={pathname === '/products' ? true : false}
          marginTop={'0'}
          padding={'1rem 0px'}
        />

        <MobileMenuLink
          title={pageLangObj.setting}
          pathname="/setting"
          isActive={pathname === '/setting' ? true : false}
          marginTop={'0'}
          padding={'1rem 0px'}
        />

        <MobileMenuLink
          title={pageLangObj.about}
          pathname="/about"
          isActive={pathname === '/about' ? true : false}
          marginTop={'0'}
          padding={'1rem 0px'}
        />

        {!user && (
          <MobileMenuLink
            title={pageLangObj.signin}
            pathname="/auth/signin"
            isActive={pathname === '/auth/signin' ? true : false}
            marginTop={'0'}
            padding={'1rem 0px'}
          />
        )}

        {user && (
          <IconButton
            onClick={() => onSignout()}
            color="inherit"
            sx={{
              mt: '0',
              p: '1rem 0',
              '&:hover': {
                color: `${cmYellowColor}`,
                transform: 'scale(1.1)',
              },
            }}
          >
            <PowerSettingsNewIcon fontSize="large" />
            <Typography variant="h4" component="h5">
              &nbsp;{pageLangObj.signout}
            </Typography>
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default MobileMenu;
