import React from 'react';
import Image from 'next/image';

// Css frame work
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Theme,
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

// Components
import CMListItemButton from '@src/components/dashboard/shares/CMListItemButton';

interface Props {
  title: string;
  homeLabel: string;
  accountLabel: string;
  productLabel: string;
  orderLabel: string;
  notifyLabel: string;
  settingLabel: string;
  signoutLabel: string;
  open: boolean;
  currentIndex: number;
  appLang: string;
  theme: Theme;
  handleDrawerClose: () => void;
  handleClickedMenu: (no: number) => void;
}

/***************************************************
 *                Main Function
 **************************************************/
const CMDrawer = ({
  title,
  homeLabel,
  accountLabel,
  productLabel,
  orderLabel,
  settingLabel,
  notifyLabel,
  signoutLabel,
  open,
  currentIndex,
  appLang,
  theme,
  handleDrawerClose,
  handleClickedMenu,
}: Props) => {
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <Tooltip title={title}>
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
          }}
        >
          <Image
            src={`/images/business_man_thinking_1.svg`}
            alt="Profile"
            width={200}
            height={150}
          />
        </ListItem>
        <Divider />

        <CMListItemButton
          appLang={appLang}
          label={homeLabel}
          Icon={HomeIcon}
          itemNo={0}
          selected={false}
          handleClickedMenu={handleClickedMenu}
        />

        <Divider />

        <CMListItemButton
          appLang={appLang}
          label={accountLabel}
          Icon={ManageAccountsIcon}
          itemNo={1}
          selected={currentIndex === 1 ? true : false}
          handleClickedMenu={handleClickedMenu}
        />

        <CMListItemButton
          appLang={appLang}
          label={productLabel}
          Icon={BusinessCenterIcon}
          itemNo={2}
          selected={currentIndex === 2 ? true : false}
          handleClickedMenu={handleClickedMenu}
        />

        <CMListItemButton
          appLang={appLang}
          label={orderLabel}
          Icon={ShoppingCartIcon}
          itemNo={3}
          selected={currentIndex === 3 ? true : false}
          handleClickedMenu={handleClickedMenu}
        />

        <CMListItemButton
          appLang={appLang}
          label={notifyLabel}
          Icon={NotificationsActiveIcon}
          itemNo={4}
          selected={currentIndex === 4 ? true : false}
          handleClickedMenu={handleClickedMenu}
        />

        <CMListItemButton
          appLang={appLang}
          label={settingLabel}
          Icon={SettingsIcon}
          itemNo={5}
          selected={currentIndex === 5 ? true : false}
          handleClickedMenu={handleClickedMenu}
        />
        <Divider />

        <CMListItemButton
          appLang={appLang}
          label={signoutLabel}
          Icon={PowerSettingsNewtIcon}
          iconColor="secondary"
          itemNo={6}
          selected={currentIndex === 6 ? true : false}
          handleClickedMenu={handleClickedMenu}
        />
      </List>
    </Drawer>
  );
};

export default CMDrawer;
