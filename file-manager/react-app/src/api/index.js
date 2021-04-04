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
    });
  },

  createFolder(name, path) {
    const token = localStorage.getItem('token');
    return axios({
      method: 'post',
      url: `${this.baseUrl}/file-manager/folder`,
      data: {
        folderName: name
      },
      params: {
        path
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },

  getFilesByPath(path = []) {
    const token = localStorage.getItem('token');
    return axios({
      method: 'get',
      url: `${this.baseUrl}/file-manager/files`,
      params: {
        path
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },

  uploadFile(data, path = []) {
    const token = localStorage.getItem('token');
    return axios({
      method: 'post',
      url: `${this.baseUrl}/file-manager/files`,
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      params: {
        path
      },
    });
  },

  downloadFile(name, path = []) {
    const token = localStorage.getItem('token');
    return axios({
      method: 'get',
      url: `${this.baseUrl}/file-manager/download/${name}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        path
      },
    });
  },

  deleteItem(name, path = []) {
    const token = localStorage.getItem('token');
    return axios({
      method: 'get',
      url: `${this.baseUrl}/file-manager/delete/${name}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        path
      },
    });
  },

  moveItem(name, from = [], to = [], action) {
    const token = localStorage.getItem('token');
    return axios({
      method: 'get',
      url: `${this.baseUrl}/file-manager/${action}/${name}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        from,
        to
      },
    });
  },

  renameItem(path = [], name, newName) {
    const token = localStorage.getItem('token');
    return axios({
      method: 'post',
      url: `${this.baseUrl}/file-manager/rename/${name}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        newName
      },
      params: {
        path
      },
    });
  },
}