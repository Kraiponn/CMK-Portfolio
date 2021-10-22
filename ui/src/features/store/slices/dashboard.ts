import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IDashboard {
  currentIndex: number;
  drawerOpen: boolean;
}

const initialState: IDashboard = {
  currentIndex: 1,
  drawerOpen: false,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    selectedItemMenu: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },
    openedDrawerMenu: (state) => {
      state.drawerOpen = true;
    },
    closedDrawerMenu: (state) => {
      state.drawerOpen = false;
    },
  },
});

export const { selectedItemMenu, openedDrawerMenu, closedDrawerMenu } =
  dashboardSlice.actions;
export default dashboardSlice.reducer;
