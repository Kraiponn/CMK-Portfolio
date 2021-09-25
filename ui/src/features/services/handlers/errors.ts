// Handler all errors
import { AxiosError, AxiosResponse } from 'axios';

export const getErrors = (error: AxiosError) => {
  let response;

  // console.log('Errorss object:', error);

  if (error.response) {
    response = getErrorResponse(error.response);
  } else if (error.request) {
    // console.log('Error request 1:', error.request.data);
    // console.log('Error request:', error.request);

    // response = `Network error: [${error.request}] or API not found.`;
    response = `Api not found or can't connect to network please try again.`;
  } else {
    response = error.message;
    // console.log('Error message', error.message);
  }

  return response;
};

const getErrorResponse = (errResponse: AxiosResponse) => {
  console.log('Error response:', errResponse);

  if (
    errResponse.data.errorDetail &&
    errResponse.data.errorDetail.type === 'E11000 Duplicate field value'
  ) {
    return 'Your user name or email already exists. Please try again.';
  } else if (
    errResponse.status === 400 &&
    errResponse.data.errorDetail.type === 'General'
  ) {
    return 'Password is incorrect.';
  } else if (errResponse.status === 404) {
    return 'Resource not found. Please try again.';
  } else {
    return 'Some thing went wrong. Pleae try again.';
  }
};
