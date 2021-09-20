import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { getErrors } from '@src/features/services/handlers/errors';

import Cookies from 'js-cookie';
// import { ISignupResult } from '@src/utils/types/auth';
// import { IFormSignup } from '@src/utils/types/auth';

export interface IFormSignup {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  role: string;
  image?: {
    public_id: string;
    secure_url: string;
  };
}

interface IAuthState {
  token?: string;
  user?: IUser | null;
  isLoading: boolean;
  success: string;
  error: string;
}

type SignupResult = {
  success: boolean;
  data: {
    message: string;
  };
};

type SigninResult = {
  success: boolean;
  data: {
    token: string;
    user?: IUser;
  };
};

const initialState: IAuthState = {
  token: '',
  user: null,
  isLoading: false,
  success: '',
  error: '',
};

const signup = createAsyncThunk<SignupResult, IFormSignup>(
  'auth/signup',
  async (user): Promise<SignupResult> => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          ...user,
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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSuccessProcess: (state) => {
      state.isLoading = false;
      state.success = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state) => {
      console.log('Start signup...');

      state.isLoading = true;
      state.error = '';
      state.success = '';
      // state.token = ''
      // state.user = null
    });

    builder.addCase(signup.fulfilled, (state, action) => {
      const { payload } = action;
      console.log('Fulfilled ...', payload);

      state.isLoading = false;
      state.error = '';
      state.success = payload.data.message;
    });

    builder.addCase(signup.rejected, (state, action) => {
      console.log('Rejected signup...');

      state.isLoading = false;
      state.success = '';
      state.error = action.error.message || '';
    });
  },
});

export { signup };
export const { setSuccessProcess } = authSlice.actions;
export default authSlice.reducer;
