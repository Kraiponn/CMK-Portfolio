const MANAGE_ACCOUNT = 'APP/MANAGE_ACCOUNT';
const MANAGE_PRODUCT = 'APP/MANAGE_PRODUCT';
const MANAGE_ORDER = 'APP/MANAGE_ORDER';
const MANAGE_NOTIFICATION = 'APP/MANAGE_NOTIFICATION';
const MANAGE_SETTING = 'APP/MANAGE_SETTING';
const SIGN_OUT = 'APP/MANAGE_SIGN_OUT';
const MANAGE_HOME = 'APP/MANAGE_HOME';
const EDIT_PROPROFILE = 'APP/EDIT_PROPROFILE';
const EDIT_PASSWORD = 'APP/EDIT_PASSWORD';
const ADD_USER = 'APP/ADD_USER';

export type DrawerListAccountMenu = {
  openAccount: boolean;
  currentItem: string;
};

export interface IDashboard {
  currentItem: string;
  drawerOpen: boolean;
  drawerListAccountMenu: DrawerListAccountMenu;
}

export {
  MANAGE_ACCOUNT,
  MANAGE_PRODUCT,
  MANAGE_ORDER,
  MANAGE_NOTIFICATION,
  MANAGE_SETTING,
  SIGN_OUT,
  MANAGE_HOME,
  EDIT_PROPROFILE,
  EDIT_PASSWORD,
  ADD_USER,
};
