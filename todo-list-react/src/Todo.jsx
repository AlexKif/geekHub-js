import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {useDispatch, useSelector} from "react-redux"
import {setTodo, setAllTodos, changeTodoStatus, deleteTodo} from "./slices/todo";
import styled from 'styled-components'
import {NavLink, useHistory} from "react-router-dom";
import {API} from "./api";

const Todo = (props) => {
  const [value, setValue] = useState('');
  const [allTodosSwitch, setAllTodosSwitch] = useState(false);
  const [activeFilter, setActiveFilter] = useState(props.activeFilter);
  const history = useHistory();

  const dispatch = useDispatch();
  const {todos} = useSelector((state) => state.todosSlice);

  useEffect(() => {
    API.getAllTodos().then(res => {
      dispatch(setAllTodos(res.data))
    })
  }, [])

  const todoHandler = useCallback((e) => {
    e.preventDefault()
    setValue(e.target.value)
  }, [])

  const onKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      const newTodo = {
        isDone: activeFilter === 'completed',
        value,
      }
      API.saveTodo(newTodo)
      setValue('')
    }
  }, [value])

  const allTodosHandler = useCallback((e) => {
    e.preventDefault();
    const status = e.target.checked
    setAllTodosSwitch(status)
    API.allTodosHandler(status)
  }, [todos, allTodosSwitch])

  const todoStatusHandler = useCallback((e, changedTodo) => {
    e.preventDefault();
    const status = e.target.checked
    API.changeTodoStatus(changedTodo._id, status)
  }, [todos])

  const deleteTodoHandler = useCallback((e, item) => {
    e.preventDefault();

    API.deleteById(item._id)
  }, [todos])

  const filterHandler = useCallback((filterBy) => {
    setActiveFilter(filterBy)
    switch (filterBy) {
      case 'all':
        API.getAllTodos().then(res => {
          dispatch(setAllTodos(res.data))
        })
        break;
      case 'active':
        API.getAllTodos('?filter=active').then(res => {
          dispatch(setAllTodos(res.data))
        })
        break;
      case 'completed':
        API.getAllTodos('?filter=completed').then(res => {
          dispatch(setAllTodos(res.data))
        })
        break;
    }
  }, [])

  const deleteCompletedTodos = useCallback((event) => {
    API.deleteComplete();
  }, [todos])

  const getCountCompletedTodos = useMemo(() => {
    return todos.filter(todo => todo.isDone).length
  }, [todos])

  const editTodoHandler = useCallback((item) => {
    history.push(`/todo/${item._id}/edit`)
  }, [])

  return (
    <div className="app">
      <div className="">
        <input type="checkbox" checked={allTodosSwitch} onChange={allTodosHandler}/>
        <input type="text" value={value} onChange={todoHandler} onKeyDown={onKeyDown} />
      </div>
      {todos?.map((item) => {
        return (
          <div key={item._id} className="todo-list">
            <label>
              <input type="checkbox" checked={item.isDone} onChange={(e) => todoStatusHandler(e, item)}/>
              <TodoItem isDone={item.isDone}>{item.value}</TodoItem>

            </label>
            <button onClick={(e) => deleteTodoHandler(e, item)}>delete</button>
            <button onClick={() => editTodoHandler(item)}>edit</button>
            ID: <span className="todo-id">{item._id}</span>
          </div>
        )
      })}
      <div className="todos-information">
        <div className="">
          <span>Completed todos: {getCountCompletedTodos}</span>
        </div>
        <div className="todo-filter">
          <NavLink activeClassName="selected" to="/" exact onClick={() => filterHandler('all')}>All</NavLink>
          <NavLink activeClassName="selected" to="/active" exact onClick={() => filterHandler('active')}>Active</NavLink>
          <NavLink activeClassName="selected" to="/completed" exact onClick={() => filterHandler('completed')}>Completed</NavLink>
        </div>
        {getCountCompletedTodos ? <button onClick={deleteCompletedTodos} className="delete-completed-todos">Clear completed</button>: null}
      </div>
    </div>
  );
}

export default Todo;

const TodoItem = styled.span`
  text-decoration: ${props => props.isDone ? 'line-through': null}
`;
