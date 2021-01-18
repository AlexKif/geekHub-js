import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
  todos: []
}

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos = [...state.todos, ...action.payload];
    },
  }
});

export const { addTodo } = todosSlice.actions;
export default todosSlice.reducer