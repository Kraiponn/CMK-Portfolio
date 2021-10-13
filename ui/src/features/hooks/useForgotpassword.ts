import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { getErrors } from '../services/handlers/errors';

export interface IForgotPassword {
  isLoading: boolean;
  success: boolean;
  message?: string;
  error: string | null;
}

const useForgotPassword = () => {
  const [state, setState] = useState<IForgotPassword>({
    isLoading: false,
    success: false,
    message: '',
    error: '',
  });

  const requestForgotPassword = async (email: string) => {
    try {
      setState({ ...state, isLoading: true });

      // setTimeout(() => {
      //   setState({
      //     ...state,
      //     success: true,
      //     isLoading: false,
      //     error: '',
      //   });
      // }, 1500);

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forgotpassword`,
        {
          email,
        }
      );

      setState({
        ...state,
        success: true,
        isLoading: false,
        message: data,
        error: '',
      });
    } catch (error) {
      const err = getErrors(error as AxiosError);
      // throw new Error(err);
      setState({
        ...state,
        isLoading: false,
        error: err,
      });
    }
  };

  const clearState = () => {
    setState({
      ...state,
      success: false,
      isLoading: false,
      error: '',
    });
  };

  return {
    isLoading: state.isLoading,
    success: state.success,
    error: state.error,
    requestForgotPassword,
    clearState,
  };
};

export default useForgotPassword;
