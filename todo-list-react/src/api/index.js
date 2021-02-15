import axios from "axios";
const apiUrl = 'http://localhost:3005'

export const API = {
  getAllTodos: async(query = '') => {
    return await axios({
      method: 'get',
      url: `${apiUrl}/todo${query}`,
    });
  },
  saveTodo: async(isDone, value) => {
    return await axios({
      method: 'post',
      url: `${apiUrl}/todo`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        isDone,
        value
      }
    });
  },
  allTodosHandler: async (status) => {
    return await axios({
      method: 'put',
      url: `${apiUrl}/todo/complete`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        status
      }
    });
  },
  changeTodoStatus: async (id, status) => {
    return await axios({
      method: 'put',
      url: `${apiUrl}/todo/complete/${id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        status
      }
    });
  },
  deleteComplete: async() => {
    return await axios({
      method: 'post',
      url: `${apiUrl}/todo/complete/clear`,
    });
  },
}