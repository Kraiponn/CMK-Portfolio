import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUIState, MOBILE_SCREEN } from '@src/utils/types/ui';

const initialState: IUIState = {
  themeMode: false,
  screenMode: false,
  openMobileMenu: false,
  isLoader: false,
  appLang: 'en',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleThemeMode: (state) => {
      state.themeMode = !state.themeMode;
    },
    setDarkMode: (state) => {
      state.themeMode = true;
    },
    setScreenMode: (state, action: PayloadAction<string>) => {
      if (action.payload === MOBILE_SCREEN) state.screenMode = true;
      else state.screenMode = false;
    },
    toggleMobileMenu: (state) => {
      state.openMobileMenu = !state.openMobileMenu;
    },
    toggleLoader: (state) => {
      state.isLoader = !state.isLoader;
    },
    setAppLanguages: (state, action: PayloadAction<string>) => {
      state.appLang = action.payload;
    },
  },
});

export const {
  toggleThemeMode,
  setDarkMode,
  setScreenMode,
  toggleMobileMenu,
  toggleLoader,
  setAppLanguages,
} = uiSlice.actions;

export default uiSlice.reducer;
