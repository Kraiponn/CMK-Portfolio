import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import Image from 'next/image';

import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import {
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
  Tooltip,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PowerSettingsNewtIcon from '@mui/icons-material/PowerSettingsNew';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

import EmptyLayout from '@src/components/shares/EmptyLayout';
import Backdrop from '@src/components/shares/Backdrop';
import Loader from '@src/components/shares/Loader';

// State management
import { useAppDispatch, useAppSelector } from '@src/features/hooks/useStore';
import { getAuthState, signout } from '@src/features/store/slices/auth';

// App Languages
import { EN_US_LOCALE_TYPE, enUs, th } from '@src/features/languages';

import {
  cmDarkColor,
  cmBlackColor,
  cmPrimaryColor,
  cmSecondaryColor,
  cmGrey50Color,
  cmRedColor,
  cmWhiteColor,
} from '@src/utils/colorsType';
import Cookies from 'js-cookie';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // background: theme.palette.primary.dark,
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

/***************************************************
 *    Main Function
 */
export default function DashboardPage() {
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  const pageLangObj = router.locale === EN_US_LOCALE_TYPE ? enUs : th;
  const dbLangObj = pageLangObj.dashboardPage;
  const token = Cookies.get('authToken');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClickedMenu = (itemNo: number) => {
    switch (itemNo) {
      case 0:
        router.push('/', '/', { locale: router.locale });
        break;

      case 1:
        router.push('/', '/', { locale: router.locale });
        break;
      case 2:
        router.push('/', '/', { locale: router.locale });
        break;
      case 3:
        router.push('/', '/', { locale: router.locale });
        break;
      case 4:
        router.push('/', '/', { locale: router.locale });
        break;
      case 5:
        router.push('/', '/', { locale: router.locale });
        break;
      case 6: {
        dispatch(signout());
        router.push('/auth/signin', '/auth/signin', { locale: router.locale });
        break;
      }

      default:
        router.push('/', '/', { locale: router.locale });
    }
  };

  // Make sure user is signin
  if (!user && !token) {
    router.push('/auth/signin', '/auth/signin', {
      locale: router.locale,
    });
  } else if (!user && token) {
    dispatch(getAuthState());
  }

  return (
    <EmptyLayout title={dbLangObj.appbarTitle}>
      <Box sx={{ display: 'flex' }}>
        {/* <CssBaseline /> */}
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" noWrap component="div">
              {dbLangObj.appbarTitle}
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <Tooltip title={dbLangObj.drawerMenu.minimizeMenu}>
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

            <ListItem
              button
              onClick={() => handleClickedMenu(0)}
              color="primary"
            >
              <ListItemIcon>
                <HomeIcon color="inherit" />
              </ListItemIcon>
              <ListItemText
                primary={dbLangObj.drawerMenu.home}
                primaryTypographyProps={{
                  fontFamily:
                    router.locale === EN_US_LOCALE_TYPE
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
                primary={dbLangObj.drawerMenu.account}
                primaryTypographyProps={{
                  fontFamily:
                    router.locale === EN_US_LOCALE_TYPE
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
                primary={dbLangObj.drawerMenu.product}
                primaryTypographyProps={{
                  fontFamily:
                    router.locale === EN_US_LOCALE_TYPE
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
                primary={dbLangObj.drawerMenu.order}
                primaryTypographyProps={{
                  fontFamily:
                    router.locale === EN_US_LOCALE_TYPE
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
                primary={dbLangObj.drawerMenu.notification}
                primaryTypographyProps={{
                  fontFamily:
                    router.locale === EN_US_LOCALE_TYPE
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
                primary={dbLangObj.drawerMenu.setting}
                primaryTypographyProps={{
                  fontFamily:
                    router.locale === EN_US_LOCALE_TYPE
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
                primary={dbLangObj.drawerMenu.signout}
                primaryTypographyProps={{
                  fontFamily:
                    router.locale === EN_US_LOCALE_TYPE
                      ? 'JosefinSans-Medium'
                      : 'Prompt-Medium',
                  fontWeight: 'bold',
                }}
              />
            </ListItem>
          </List>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            dolor purus non enim praesent elementum facilisis leo vel. Risus at
            ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
            rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
            sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
            integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
            eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
            quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
            vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.
          </Typography>
          <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
            ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
            elementum integer enim neque volutpat ac tincidunt. Ornare
            suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
            volutpat consequat mauris. Elementum eu facilisis sed odio morbi.
            Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt
            ornare massa eget egestas purus viverra accumsan in. In hendrerit
            gravida rutrum quisque non tellus orci ac. Pellentesque nec nam
            aliquam sem et tortor. Habitant morbi tristique senectus et.
            Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean
            euismod elementum nisi quis eleifend. Commodo viverra maecenas
            accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam
            ultrices sagittis orci a.
          </Typography>
        </Box>
      </Box>
    </EmptyLayout>
  );
}
