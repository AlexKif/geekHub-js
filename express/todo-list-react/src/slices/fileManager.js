import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
  todos: [],
  filteredTodos: []
}

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    setAllTodos: (state, action) => {
      state.todos = action.payload
    },
    changeTodoStatus: (state, action) => {
      const index = state.todos.findIndex(item => item._id === action.payload.changedTodo._id)
      state.todos[index].isDone = action.payload.status
    },
    deleteTodo: (state, action) => {
      const index = state.todos.findIndex(item => {
        return item._id === action.payload
      })
      state.todos.splice(index, 1);
    },
    editTodo: (state, action) => {
      const index = state.todos.findIndex(item => {
        return item._id === action.payload._id
      })
      state.todos.splice(index, 1, action.payload);
    },
  }
});

export const { setTodo, setAllTodos, changeTodoStatus, deleteTodo, editTodo } = todosSlice.actions;
export default todosSlice.reducer