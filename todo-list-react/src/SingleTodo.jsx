import React, {useCallback, useState} from 'react';
import {useParams, useRouteMatch, useHistory} from "react-router-dom";
import {getLSData} from "./store/LocalStorage";
import {useDispatch} from "react-redux";
import {replaceAllTodos} from "./slices/todo";

const SingleTodo = () => {
  const dispatch = useDispatch();
  const todos = getLSData('todos');
  const {id} = useParams();
  const history = useHistory();
  const todo = todos.find(item => item.id === id);
  const [value, setValue] = useState(todo?.value ?? '');
  const isEdit = useRouteMatch("/todo/:id/edit")

  const textHandler = useCallback((e) => {
    setValue(e.target.value)
  }, [])

  const saveHandler = useCallback((e) => {
    todo.value = value
    const todoIndex = todos.findIndex(item => {
      return item.id === todo.id
    });
    todos[todoIndex] = todo
    dispatch(replaceAllTodos(todos))
    history.push("/");

  }, [value])

  return (
    <div className="single-todo-wrapper">
      {
        (isEdit && todo) ?
          <>Edit task:
            <input type="text" value={value} onChange={textHandler}/>
            <button onClick={saveHandler} disabled={!value.length}>Save</button>
          </> : todo?
          <span>Task: {value}</span>:
          <div>Todo not Found</div>
      }
    </div>
  )
};

export default SingleTodo;
