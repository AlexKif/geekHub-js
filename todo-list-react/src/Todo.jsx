import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {useDispatch, useSelector} from "react-redux"
import {setTodo, setFilteredTodos, replaceAllTodos, changeTodoStatus} from "./slices/todo";
import uniqueId from 'lodash/uniqueId';
import styled from 'styled-components'
import {getLSData} from "./store/LocalStorage";
import {NavLink} from "react-router-dom";

const Todo = (props) => {
  const [value, setValue] = useState('');
  const [allTodosSwitch, setAllTodosSwitch] = useState(false);
  const [activeFilter, setActiveFilter] = useState(props.activeFilter);

  const dispatch = useDispatch();
  const {todos} = useSelector((state) => state.todosSlice);
  const {filteredTodos} = useSelector((state) => state.todosSlice);

  useEffect(() => {
    filterHandler(activeFilter)
  }, [todos])

  useEffect(() => {
    const todos = getLSData('todos');
    const filteredTodos = getLSData('filteredTodos')

    if (todos) {
      dispatch(replaceAllTodos(todos))
    }
    if (filteredTodos?.length) {
      dispatch(setFilteredTodos(filteredTodos))
      filterHandler(filteredTodos)
    }

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
        id: uniqueId()
      }
      dispatch(setTodo(newTodo))
      setValue('')
    }
  }, [value])

  const allTodosHandler = useCallback((e) => {
    const changedTodos = todos.map(item => ({
      ...item,
      isDone: e.target.checked,
    }))
    dispatch(replaceAllTodos(changedTodos))
    setAllTodosSwitch(prevState => !prevState)
  }, [todos])

  const todoStatusHandler = useCallback((changedTodo) => {
    const todoIndex = todos.findIndex(item => item.id === changedTodo.id)
    dispatch(changeTodoStatus(todoIndex))
  }, [todos])

  const deleteTodo = useCallback((e, item) => {
    e.preventDefault();
    const updatedTodos = todos.filter(todo => todo.id !== item.id)
    dispatch(replaceAllTodos(updatedTodos))
  }, [todos])

  const filterHandler = useCallback((filterBy = 'all') => {
    setActiveFilter(filterBy);
    switch (filterBy) {
      case 'all':
        dispatch(setFilteredTodos(todos));
        break;
      case 'active':
        let activeTodos = todos.filter(item => !item.isDone)
        dispatch(setFilteredTodos(activeTodos));
        break;
      case 'completed':
        let completedTodos = todos.filter(item => item.isDone)
        dispatch(setFilteredTodos(completedTodos));
        break;
    }
  }, [activeFilter, todos])

  const deleteCompletedTodos = useCallback((event) => {
    event.preventDefault();
    let updatedTodos = todos.filter(todo => !todo.isDone);

    dispatch(replaceAllTodos(updatedTodos));
    setAllTodosSwitch(prevState => !prevState);
  }, [])

  const getCountCompletedTodos = useMemo(() => {
    return filteredTodos.filter(todo => todo.isDone).length
  }, [filteredTodos])

  return (
    <div className="app">
      <div className="">
        <input type="checkbox" checked={allTodosSwitch} onChange={allTodosHandler}/>
        <input type="text" value={value} onChange={todoHandler} onKeyDown={onKeyDown} />
      </div>
      {filteredTodos?.map((item, index) => {
        return (
          <div key={item.value + index} className="todo-list">
            <label>
              <input type="checkbox" checked={item.isDone} onChange={() => todoStatusHandler(item)}/>
              <TodoItem isDone={item.isDone}>{item.value}</TodoItem>

            </label>
            <button onClick={(e) => deleteTodo(e, item)}>delete</button>
            ID: <span class="todo-id">{item.id}</span>
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
