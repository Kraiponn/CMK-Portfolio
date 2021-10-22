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

// App Languages
import { EN_US_LOCALE_TYPE, enUs, th } from '@src/features/languages';

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

        <ListItem button onClick={() => handleClickedMenu(0)} color="primary">
          <ListItemIcon>
            <HomeIcon color="inherit" />
          </ListItemIcon>
          <ListItemText
            primary={homeLabel}
            primaryTypographyProps={{
              fontFamily:
                appLang === EN_US_LOCALE_TYPE
                  ? 'JosefinSans-Medium'
                  : 'Prompt-Regular',
              // fontWeight: 'bold',
            }}
          />
        </ListItem>
        <Divider />

        <ListItem button selected>
          <ListItemIcon>
            <ManageAccountsIcon color="inherit" />
          </ListItemIcon>
          <ListItemText
            primary={accountLabel}
            primaryTypographyProps={{
              fontFamily:
                appLang === EN_US_LOCALE_TYPE
                  ? 'JosefinSans-Medium'
                  : 'Prompt-Regular',
              // fontWeight: 'bold',
            }}
          />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <BusinessCenterIcon color="inherit" />
          </ListItemIcon>
          <ListItemText
            primary={productLabel}
            primaryTypographyProps={{
              fontFamily:
                appLang === EN_US_LOCALE_TYPE
                  ? 'JosefinSans-Medium'
                  : 'Prompt-Regular',
              // fontWeight: 'bold',
            }}
          />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <ShoppingCartIcon color="inherit" />
          </ListItemIcon>
          <ListItemText
            primary={orderLabel}
            primaryTypographyProps={{
              fontFamily:
                appLang === EN_US_LOCALE_TYPE
                  ? 'JosefinSans-Medium'
                  : 'Prompt-Regular',
              // fontWeight: 'bold',
            }}
          />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <NotificationsActiveIcon color="inherit" />
          </ListItemIcon>
          <ListItemText
            primary={notifyLabel}
            primaryTypographyProps={{
              fontFamily:
                appLang === EN_US_LOCALE_TYPE
                  ? 'JosefinSans-Medium'
                  : 'Prompt-Regular',
              // fontWeight: 'bold',
            }}
          />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <SettingsIcon color="inherit" />
          </ListItemIcon>
          <ListItemText
            primary={settingLabel}
            primaryTypographyProps={{
              fontFamily:
                appLang === EN_US_LOCALE_TYPE
                  ? 'JosefinSans-Medium'
                  : 'Prompt-Regular',
              // fontWeight: 'bold',
            }}
          />
        </ListItem>
        <Divider />

        <ListItem button onClick={() => handleClickedMenu(6)}>
          <ListItemIcon>
            <PowerSettingsNewtIcon color="secondary" fontSize="large" />
          </ListItemIcon>
          <ListItemText
            primary={signoutLabel}
            primaryTypographyProps={{
              fontFamily:
                appLang === EN_US_LOCALE_TYPE
                  ? 'JosefinSans-Medium'
                  : 'Prompt-Medium',
              fontWeight: 'bold',
            }}
          />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default CMDrawer;
