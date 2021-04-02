import axios from "axios";
const apiUrl = 'http://localhost:8080'

export const API = {
  getAllTodos: async(query = '') => {
    return await axios({
      method: 'get',
      url: `${apiUrl}/todo${query}`,
    });
  },
  getTodo: async(id) => {
    return await axios({
      method: 'get',
      url: `${apiUrl}/todo/${id}`,
    });
  },
  updateTodo: async(id, value) => {
    return await axios({
      method: 'put',
      url: `${apiUrl}/todo/edit/${id}`,
      data: {
        value
      }
    });
  },
  saveTodo: async(todo) => {
    return await axios({
      method: 'post',
      url: `${apiUrl}/todo`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        isDone: todo.isDone,
        value: todo.value
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
  deleteById: async(id) => {
    return await axios({
      method: 'delete',
      url: `${apiUrl}/todo/delete/${id}`,
    });
  },
}