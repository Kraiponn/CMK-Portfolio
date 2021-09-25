import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { getErrors } from '@src/features/services/handlers/errors';

import {
  SignupResult,
  SigninResult,
  IUser,
  IAuthForm,
} from '@src/utils/types/auth';
import Cookies from 'js-cookie';

interface IAuthState {
  token?: string;
  user?: IUser | null | undefined;
  isLoading: boolean;
  success: string;
  error: string;
}

const initialState: IAuthState = {
  token: '',
  user: null,
  isLoading: false,
  success: '',
  error: '',
};

const signup = createAsyncThunk<SignupResult, IAuthForm>(
  'auth/signup',
  async (formValue): Promise<SignupResult> => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          ...formValue,
        },
        {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
          cancelToken: source.token,
        }
      );

      source.cancel('Cancel api resouce');

      return data as SignupResult;
    } catch (error) {
      throw new Error(getErrors(error as AxiosError));
    }
  }
);

const signin = createAsyncThunk<
  SigninResult,
  Omit<IAuthForm, 'username' | 'confirmPassword'>
>('auth/signin', async (formValue): Promise<SigninResult> => {
  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();

  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        ...formValue,
      },
      {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        cancelToken: source.token,
      }
    );

    source.cancel('Cancel api resouce');

    return data as SigninResult;
  } catch (error) {
    throw new Error(getErrors(error as AxiosError));
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSuccessProcess: (state) => {
      state.isLoading = false;
      state.success = '';
      state.error = '';
    },
    getAuthState: (state) => {
      // Get auth from cookies
      const token = Cookies.get('authToken');
      const user = JSON.parse(Cookies.get('authUser') as string);

      state.isLoading = false;
      state.error = '';
      state.success = '';
      state.token = token;
      state.user = user;
    },
    signout: (state) => {
      state.isLoading = false;
      state.error = '';
      state.success = '';
      state.token = '';
      state.user = null;

      // Remove cookies
      Cookies.remove('authToken');
      Cookies.remove('authUser');
    },
  },
  extraReducers: (builder) => {
    /***************************************************
     *    SIGNUP PROCESS
     */
    builder.addCase(signup.pending, (state) => {
      // console.log('Start signup...');

      state.isLoading = true;
      state.error = '';
      state.success = '';
      // state.token = ''
      // state.user = null
    });

    builder.addCase(signup.fulfilled, (state, action) => {
      const { payload } = action;
      // console.log('Fulfilled ...', payload);

      state.isLoading = false;
      state.error = '';
      state.success = payload.data.message;
    });

    builder.addCase(signup.rejected, (state, action) => {
      // console.log('Rejected signup...');

      state.isLoading = false;
      state.success = '';
      state.error = action.error.message || '';
    });

    /***************************************************
     *    SIGNIN PROCESS
     */
    builder.addCase(signin.pending, (state) => {
      // console.log('Signin Start...');

      state.isLoading = true;
      state.error = '';
      state.success = '';
      state.token = '';
      state.user = null;
    });

    builder.addCase(signin.fulfilled, (state, action) => {
      // console.log('Signin Fulfilled ...');
      const { payload } = action;

      state.isLoading = false;
      state.error = '';
      state.success = 'Signin successfully';
      state.token = payload.data.token;
      state.user = payload.data.user;

      Cookies.set('authToken', payload.data.token);
      Cookies.set('authUser', JSON.stringify(payload.data.user));
    });

    builder.addCase(signin.rejected, (state, action) => {
      // console.log('Signin Rejected...');

      state.isLoading = false;
      state.success = '';
      state.error = action.error.message || '';
    });
  },
});

export { signup, signin };
export const { setSuccessProcess, signout, getAuthState } = authSlice.actions;
export default authSlice.reducer;
