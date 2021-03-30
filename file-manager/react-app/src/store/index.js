import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import fileManager from "../slices/fileManager";

const reducer = combineReducers({
  fileManager
})

const store = configureStore({
  reducer,
})

export default store;