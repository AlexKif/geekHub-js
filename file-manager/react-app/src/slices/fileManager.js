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
    deleteItem: (state, action) => {
      const index = state.files.findIndex(item => item.id === action.payload.id);
      state.files.splice(index, 1);
    },
    renameItem: (state, action) => {
      const index = state.files.findIndex(item => item.id === action.payload.id);
      state.files[index].name = action.payload.name;
    },
  }
});

export const { setFolder, setFile, setFlies, setPath, removeLastPath, deleteItem, renameItem } = fileManagerSlice.actions;
export default fileManagerSlice.reducer;