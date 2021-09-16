/************************************
 * User interface and theme types
 */
export interface IUIState {
  themeMode: boolean;
  screenMode: boolean;
  openMobileMenu: boolean;
  isLoader: boolean;
  appLang: string;
}

export const MOBILE_SCREEN = 'uislice/MOBILE_SCREEN';
