import { format as formatDate } from 'date-fns';
import axiosInstance from '../utils/axios';

export const createOrder = values => {
  const createOrderReq = (data, token) => {
    const { occasion, person, date, name, email, phone, format } = data;

    const orderData = {
      occasion,
      date: formatDate(date, 'yyyy-MM-dd'),
      person,
      name,
      email,
      phone,
      format,
    };

    return axiosInstance.post('/api/order?_format=json', orderData, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-CSRF-Token': token,
      },
    });
  };

  return new Promise((resolve, reject) => {
    axiosInstance
      .get('/rest/session/token')
      .then(res => {
        createOrderReq(values, res.data)
          .then(resp => resolve(resp.data))
          .catch(error => reject(error));
      })
      .catch(err => reject(err));
  });
};

export default { createOrder };
