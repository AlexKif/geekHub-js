import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
  files: [],
  path: [],
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
    setPath: (state, action) => {
      state.path.push(action.payload);
    },
    removeLastPath: (state, action) => {
      state.path.pop();
    },
  }
});

export const { setFile, setFlies, setPath, removeLastPath } = fileManagerSlice.actions;
export default fileManagerSlice.reducer;