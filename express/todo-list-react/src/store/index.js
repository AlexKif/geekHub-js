import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import todosSlice from '../slices/todo'

const reducer = combineReducers({
  todosSlice
})

const store = configureStore({
  reducer,
})

export default store;