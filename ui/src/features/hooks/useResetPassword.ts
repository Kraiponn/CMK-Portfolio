import { getErrors } from '@src/features/services/handlers/errors';
import { IAuthForm } from '@src/utils/types/auth';
import { useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';

interface IResetPwdResult {
  success: boolean;
  data: {
    token: string;
    user: {
      id: string;
      username: string;
      email: string;
      role: string;
      image?: {
        public_id: String;
        secure_url: String;
      };
    };
  };
}

const useResetPassword = () => {
  const postResetPwd = async ({
    password,
    confirmPassword,
    resetToken,
  }: IAuthForm) => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/resetpassword/${resetToken}`;

    // console.log('On Hook', resetToken, baseUrl);

    try {
      const { data } = await axios.put(
        baseUrl,
        {
          password,
          confirmPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            cancelToken: source.token,
          },
        }
      );

      // console.log('Result', data);

      source.cancel('Operation canceled.');

      return data as IResetPwdResult;
    } catch (error) {
      source.cancel('Operation canceled.');

      const errMsg = getErrors(error as AxiosError);
      throw new Error(errMsg);
    }
  };

  const clearModal = () => {
    reset();
  };

  const resetPassword = (formValue: IAuthForm) => {
    mutate(formValue);
  };

  const { isLoading, data, error, reset, mutate } = useMutation<
    IResetPwdResult,
    Error,
    IAuthForm
  >(postResetPwd);

  return {
    isLoading,
    data,
    error,
    reset,
    clearModal,
    resetPassword,
  };
};

export default useResetPassword;
