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
      state.todos = action.payload;
    },
    setFilteredTodos: (state, action) => {
      state.filteredTodos = action.payload;
    }
  }
});

export const { setTodo, setFilteredTodos } = todosSlice.actions;
export default todosSlice.reducer