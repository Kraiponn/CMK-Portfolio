import { getErrors } from '@src/features/services/handlers/errors';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  IDashboard,
  MANAGE_HOME,
  MANAGE_ACCOUNT,
  MANAGE_PRODUCT,
  MANAGE_ORDER,
  EDIT_PROPROFILE,
  EDIT_PASSWORD,
  ADD_USER,
} from '@src/utils/types/dashboard';

import axios, { AxiosError } from 'axios';

const initialState: IDashboard = {
  currentItem: MANAGE_HOME,
  drawerOpen: false,
  drawerListAccountMenu: {
    openAccount: false,
    currentItem: EDIT_PROPROFILE,
  },
};

// export const editedUser = createAsyncThunk<IEditedUserResult, IFormValue>(
//   'dashboard/editUser',
//   async (formValue) => {
//     console.log('On redux ', formValue);

//     const cancelToken = axios.CancelToken;
//     const source = cancelToken.source();

//     try {
//       const { data } = await axios.put(
//         `${process.env.NEXT_PUBLIC_API_URL}/users/updateduser/${formValue.userId}`,
//         formValue.form,
//         {
//           headers: {
//             'Content-Type': 'application/json; charset=UTF-8',
//             Authorization: `Bearer ${formValue.token}`,
//           },
//           cancelToken: source.token,
//         }
//       );

//       source.cancel('Cancel api resouce');

//       return data as IEditedUserResult;
//     } catch (error) {
//       throw new Error(getErrors(error as AxiosError));
//     }
//   }
// );

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    selectedItemMenu: (state, action: PayloadAction<string>) => {
      state.drawerListAccountMenu.openAccount = false;
      state.currentItem = action.payload;
    },
    openedDrawerMenu: (state) => {
      state.drawerOpen = true;
    },
    closedDrawerMenu: (state) => {
      state.drawerListAccountMenu.openAccount = false;
      state.drawerOpen = false;
    },
    toggleAccountMenu: (state, action: PayloadAction<string>) => {
      state.drawerListAccountMenu.openAccount =
        !state.drawerListAccountMenu.openAccount;

      state.currentItem = action.payload;
    },
    selectedAccountMenu: (state, action: PayloadAction<string>) => {
      state.drawerListAccountMenu.currentItem = action.payload;
    },
  },
  extraReducers: (builder) => {
    /***************************************************
     *    Edited User PROCESS
     */
    // builder.addCase(editedUser.pending, (state) => {
    //   console.log('EditedUser Start...');
    // });
    // builder.addCase(editedUser.fulfilled, (state, action) => {
    //   console.log('EditedUser Fulfilled ...');
    //   const { payload } = action;
    //   console.log('EditedUser fulfilled data', payload);
    // });
    // builder.addCase(editedUser.rejected, (state, action) => {
    //   console.log('EditedUser Rejected...');
    // });
  },
});

export const {
  selectedItemMenu,
  openedDrawerMenu,
  closedDrawerMenu,
  toggleAccountMenu,
  selectedAccountMenu,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
