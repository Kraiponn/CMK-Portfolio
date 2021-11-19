import React from 'react';
import Image, { ImageLoaderProps } from 'next/image';
import { useRouter } from 'next/router';

// Css frame work
import {
  Divider,
  List,
  ListItem,
  IconButton,
  Tooltip,
  Theme,
  Avatar,
} from '@mui/material';
import {
  DrawerHeader,
  Drawer,
} from '@src/components/dashboard/shares/Complements';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PowerSettingsNewtIcon from '@mui/icons-material/PowerSettingsNew';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

// Colors system
import { cmPrimaryColor } from '@src/utils/colorsType';

// State management
import {
  MANAGE_HOME,
  MANAGE_ACCOUNT,
  MANAGE_PRODUCT,
  MANAGE_ORDER,
  MANAGE_NOTIFICATION,
  MANAGE_SETTING,
  SIGN_OUT,
} from '@src/utils/types/dashboard';
import { useAppDispatch, useAppSelector } from '@src/features/hooks/useStore';
import {
  toggleAccountMenu,
  selectedItemMenu,
} from '@src/features/store/slices/dashboard';
import { signout } from '@src/features/store/slices/auth';

// App Languages
import { EN_US_LOCALE_TYPE, enUs, th } from '@src/features/languages';

// Components
import CMListItemButton from '@src/components/dashboard/shares/CMListItemButton';
import CMListAccountMenu from '@src/components/dashboard/shares/CMListAccountMenu';

interface Props {
  appLang: string;
  theme: Theme;
  handleDrawerClose: () => void;
}

// const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
//   return `https://res.cloudinary.com/${src}?w=${width}&q=${quality || 75}`;
// };

/***************************************************
 *                Main Function
 **************************************************/
const CMDrawer = ({ appLang, theme, handleDrawerClose }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { drawerListAccountMenu, currentItem, drawerOpen } = useAppSelector(
    (state) => state.dashboard
  );
  const { user } = useAppSelector((state) => state.auth);

  const { dashboardPage: pageLangObj } =
    appLang === EN_US_LOCALE_TYPE ? enUs : th;

  const handleDrawerMenuItemSelect = (itemType: string) => {
    switch (itemType) {
      case MANAGE_HOME:
        router.push('/', '/', { locale: appLang });
        break;
      case MANAGE_ACCOUNT:
        dispatch(toggleAccountMenu(itemType));
        break;
      case MANAGE_PRODUCT:
        dispatch(selectedItemMenu(itemType));
        break;
      case MANAGE_ORDER:
        dispatch(selectedItemMenu(itemType));
        break;
      case MANAGE_NOTIFICATION:
        dispatch(selectedItemMenu(itemType));
        break;
      case MANAGE_SETTING:
        dispatch(selectedItemMenu(itemType));
        break;
      case SIGN_OUT:
        dispatch(signout());
        router.push('/auth/signin', '/auth/signin', { locale: appLang });
        break;
    }
  };

  return (
    <Drawer variant="permanent" open={drawerOpen}>
      <DrawerHeader>
        <Tooltip title={pageLangObj.appbarTitle}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon fontSize="large" />
            ) : (
              <ChevronLeftIcon fontSize="large" />
            )}
          </IconButton>
        </Tooltip>
      </DrawerHeader>
      {/* <Divider /> */}

      <List
        sx={{
          paddingTop: '0',
          height: '100vh',
        }}
      >
        <ListItem
          sx={{
            bgcolor: `${cmPrimaryColor}`,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {drawerOpen ? (
            <>
              {user?.image?.secure_url ? (
                <Avatar
                  alt="profile"
                  sx={{
                    width: 150,
                    height: 150,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                  }}
                  variant="circular"
                  src={user.image.secure_url}
                />
              ) : (
                <Image
                  src={`/images/business_man_thinking_1.svg`}
                  alt="Profile"
                  width={200}
                  height={150}
                />
              )}
            </>
          ) : (
            <Image
              src={`/images/business_man_thinking_1.svg`}
              alt="Profile"
              width={200}
              height={150}
            />
          )}
        </ListItem>

        <Divider />

        <CMListItemButton
          appLang={appLang}
          label={pageLangObj.drawerMenu.home}
          Icon={HomeIcon}
          itemNo={0}
          selected={false}
          handleClickedMenu={() => handleDrawerMenuItemSelect(MANAGE_HOME)}
        />

        <Divider />

        <CMListAccountMenu
          appLang={appLang}
          role={user?.role || 'User'}
          label={pageLangObj.drawerMenu.account.title}
          Icon={ManageAccountsIcon}
          itemNo={1}
          selected={currentItem === MANAGE_ACCOUNT ? true : false}
          openSubMenu={drawerListAccountMenu.openAccount}
          handleClickedMenu={() => handleDrawerMenuItemSelect(MANAGE_ACCOUNT)}
        />

        {user?.role === 'Admin' && (
          <CMListItemButton
            appLang={appLang}
            label={pageLangObj.drawerMenu.product}
            Icon={BusinessCenterIcon}
            itemNo={2}
            selected={currentItem === MANAGE_PRODUCT ? true : false}
            handleClickedMenu={() => handleDrawerMenuItemSelect(MANAGE_PRODUCT)}
          />
        )}

        <CMListItemButton
          appLang={appLang}
          label={pageLangObj.drawerMenu.order}
          Icon={ShoppingCartIcon}
          itemNo={3}
          selected={currentItem === MANAGE_ORDER ? true : false}
          handleClickedMenu={() => handleDrawerMenuItemSelect(MANAGE_ORDER)}
        />

        <CMListItemButton
          appLang={appLang}
          label={pageLangObj.drawerMenu.notification}
          Icon={NotificationsActiveIcon}
          itemNo={4}
          selected={currentItem === MANAGE_NOTIFICATION ? true : false}
          handleClickedMenu={() =>
            handleDrawerMenuItemSelect(MANAGE_NOTIFICATION)
          }
        />

        <CMListItemButton
          appLang={appLang}
          label={pageLangObj.drawerMenu.setting}
          Icon={SettingsIcon}
          itemNo={5}
          selected={currentItem === MANAGE_SETTING ? true : false}
          handleClickedMenu={() => handleDrawerMenuItemSelect(MANAGE_SETTING)}
        />
        <Divider />

        <CMListItemButton
          appLang={appLang}
          label={pageLangObj.drawerMenu.signout}
          Icon={PowerSettingsNewtIcon}
          iconColor="secondary"
          itemNo={6}
          selected={currentItem === SIGN_OUT ? true : false}
          handleClickedMenu={() => handleDrawerMenuItemSelect(SIGN_OUT)}
        />
      </List>
    </Drawer>
  );
};

export default CMDrawer;
