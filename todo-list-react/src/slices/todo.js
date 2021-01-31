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
      state.todos.unshift(action.payload);
    },
    replaceAllTodos: (state, action) => {
      state.todos = action.payload
    },
    changeTodoStatus: (state, action) => {
      state.todos[action.payload].isDone = !state.todos[action.payload].isDone
    },
    setFilteredTodos: (state, action) => {
      state.filteredTodos = action.payload;
    }
  }
});

export const { setTodo, setFilteredTodos, replaceAllTodos, changeTodoStatus } = todosSlice.actions;
export default todosSlice.reducer