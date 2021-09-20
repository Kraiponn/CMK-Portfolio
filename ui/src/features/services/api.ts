import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v2021',
});

const cancelToken = axios.CancelToken;
const axiosSource = cancelToken.source();

export { api, cancelToken, axiosSource };
