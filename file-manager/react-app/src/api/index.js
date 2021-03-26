import axios from "axios";
import {errorNotification} from "../functions";
import history from "../helpers/history";

axios.interceptors.response.use((response) => {
  return response;
}, function (error) {
  if (error.response) {
    if (error.response.status === 400) {
      errorNotification(error.response.data.message);
    }
    if (error.response.status === 403) {
      localStorage.removeItem('token');
      history.push('/login');
    }
  }

  return Promise.reject(error.response);
});

export const API = {
  baseUrl: 'http://localhost:8080',

  registration(email, password) {
    return axios({
      method: 'post',
      url: `${this.baseUrl}/registration`,
      data: {
        email: email,
        password: password
      }
    });
  },

  login(email, password, remember) {
    return axios({
      method: 'post',
      url: `${this.baseUrl}/login`,
      data: {
        email: email,
        password: password,
        remember
      },
      headers: {
        // Authorization: `Bearer ${token}`
      }
    });
  }
}