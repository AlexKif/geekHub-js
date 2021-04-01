import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
  files: [],
  path: [],
}

const fileManagerSlice = createSlice({
  name: "fileManager",
  initialState,
  reducers: {
    setFolder: (state, action) => {
      state.files.unshift(action.payload);
    },
    setFile: (state, action) => {
      if (action.payload.length > 1) {
        state.files = [...state.files, ...action.payload];
      } else {
        state.files.push(action.payload[0]);
      }
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

export const { setFolder, setFile, setFlies, setPath, removeLastPath } = fileManagerSlice.actions;
export default fileManagerSlice.reducer;