import axios from 'axios';

const axiosInstance = axios.create({
  timeout: 60000,
});

const basicAuth = process.env.BASIC_AUTH;

if (basicAuth) {
  axiosInstance.defaults.headers.common.Authorization = `Basic ${basicAuth}`;
}

axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';
axiosInstance.defaults.headers.common.Accept = 'application/json';
axiosInstance.defaults.headers.common['X-Consumer-ID'] = '5c2158bf-c084-4c56-83a5-5b21926fd580';

export default axiosInstance;
