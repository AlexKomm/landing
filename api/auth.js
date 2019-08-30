import axiosInstance from '../utils/axios';
import qs from 'qs';

export const getToken = (clientId, clientSecret) => {
  return new Promise((resolve, reject) => {
    const callback = {
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    };

    axiosInstance
      .post('/oauth/token', qs.stringify(callback), {
        baseURL: process.env.BACKEND_URL,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then(response => resolve(response.data))
      .catch(err => reject(err));
  });
};

export default { getToken };
