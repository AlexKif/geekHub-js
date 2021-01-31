import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {useDispatch, useSelector} from "react-redux"
import {setTodo, setFilteredTodos, replaceAllTodos, changeTodoStatus} from "./slices/todo";
import uniqueId from 'lodash/uniqueId';
import styled from 'styled-components'

function App() {
  const [value, setValue] = useState('');
  const [allTodosSwitch, setAllTodosSwitch] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const dispatch = useDispatch();
  const {todos} = useSelector((state) => state.todosSlice);
  const {filteredTodos} = useSelector((state) => state.todosSlice);


  const todoHandler = useCallback((e) => {
    e.preventDefault()
    setValue(e.target.value)
  }, [])

  useEffect(() => {
    filterHandler(activeFilter)
  }, [todos])


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
          <div key={item.value + index}>
            <label>
            <input type="checkbox" checked={item.isDone} onChange={() => todoStatusHandler(item)}/>
            <TodoItem isDone={item.isDone}>{item.value}</TodoItem>

            </label>
            <button onClick={(e) => deleteTodo(e, item)}>delete</button>
          </div>
        )
      })}
      <div className="todos-information">
        <div className="">
          <span>Completed todos: {getCountCompletedTodos}</span>
        </div>
        <div className="todo-filter">
          <input defaultChecked={true} onChange={() => filterHandler('all')} id="allTodos" name="todoFilter" type="radio"/><label htmlFor="allTodos">All</label>
          <input onChange={() => filterHandler('active')} id="activeTodos" name="todoFilter" type="radio"/><label htmlFor="activeTodos">Active</label>
          <input onChange={() => filterHandler('completed')} id="completedTodos" name="todoFilter"  type="radio"/><label htmlFor="completedTodos">Completed</label>
        </div>
        {getCountCompletedTodos ? <button onClick={deleteCompletedTodos} className="delete-completed-todos">Clear completed</button>: null}
      </div>
    </div>
  );
}

export default App;

const TodoItem = styled.span`
  text-decoration: ${props => props.isDone ? 'line-through': null}
`;

