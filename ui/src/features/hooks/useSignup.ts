import { IFormSignup, ISignupResult } from '@src/utils/types/auth';

import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

// import { api, axiosSource } from '../services/api';
import axios from 'axios';

import { getErrors } from '../services/handlers/errors';

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v2021',
// });

// const cancelToken = axios.CancelToken;
// const axiosSource = cancelToken.source();

const signup = async (user: IFormSignup) => {
  const cancelToken = axios.CancelToken;
  const axiosSource = cancelToken.source();

  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      { ...user },
      {
        headers: {
          // authorization: `Bearer [tokenHere]`,
          'Content-Type': 'application/json; charset=UTF=8',
        },
        cancelToken: axiosSource.token,
      }
    );

    axiosSource.cancel('Operation canceled.');

    return data;
  } catch (error) {
    // cancel the request (the message parameter is optional)
    axiosSource.cancel('Operation canceled.');

    const msg = getErrors(error as AxiosError);
    throw new Error(msg);
  }
};

const useSignup = () => {
  return useMutation<ISignupResult, Error, IFormSignup>(signup);
};

export default useSignup;
