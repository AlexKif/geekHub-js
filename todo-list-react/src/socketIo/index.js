import { io } from "socket.io-client";
import store from "../store/index";
import {changeTodoStatus, deleteTodo, editTodo, setAllTodos, setTodo} from "../slices/todo";

export const socket = io("http://localhost:8000");

export const socketInit = () => {
  socket.on('newTodoAdded', (newTodo) => {
    store.dispatch(setTodo(newTodo))
  })
  socket.on('deletedTodo', (id) => {
    store.dispatch(deleteTodo(id))
  })
  socket.on('allTodoComplete', (todos) => {
    store.dispatch(setAllTodos(todos))
  })
  socket.on('singleTodoComplete', (status, changedTodo) => {
    store.dispatch(changeTodoStatus({status, changedTodo}))
  })
  socket.on('deleteCompleted', (todos) => {
    store.dispatch(setAllTodos(todos))
  })
  socket.on('editTodo', (todo) => {
    store.dispatch(editTodo(todo))
  })
}


