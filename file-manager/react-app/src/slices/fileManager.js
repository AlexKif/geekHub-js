import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
  files: [],
}

const fileManagerSlice = createSlice({
  name: "fileManager",
  initialState,
  reducers: {
    setFile: (state, action) => {
      state.files.push(action.payload);
    },
    setFlies: (state, action) => {
      state.files = action.payload
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

export const { setFile, setFlies, changeTodoStatus, deleteTodo, editTodo } = fileManagerSlice.actions;
export default fileManagerSlice.reducer;