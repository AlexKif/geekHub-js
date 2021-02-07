import {createSlice} from "@reduxjs/toolkit";
import {setDataInLS} from "../store/LocalStorage";

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
      setDataInLS('todos', state.todos)
    },
    replaceAllTodos: (state, action) => {
      state.todos = action.payload
      setDataInLS('todos', state.todos)
    },
    changeTodoStatus: (state, action) => {
      state.todos[action.payload].isDone = !state.todos[action.payload].isDone
      setDataInLS('todos', state.todos)
    },
    setFilteredTodos: (state, action) => {
      state.filteredTodos = action.payload;
      setDataInLS('filteredTodos', state.filteredTodos)
    }
  }
});

export const { setTodo, setFilteredTodos, replaceAllTodos, changeTodoStatus } = todosSlice.actions;
export default todosSlice.reducer