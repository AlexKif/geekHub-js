import React, { useState, useEffect, useMemo } from 'react';
import {useDispatch, useSelector} from "react-redux"
import {setTodo, setFilteredTodos} from "./slices/todo";
import uniqueId from 'lodash/uniqueId';
import styled from 'styled-components'

function App() {
  const [value, setValue] = useState('');
  const [allTodosSwitch, setAllTodosSwitch] = useState(false);

  const dispatch = useDispatch();
  const {todos} = useSelector((state) => state.todosSlice);
  const {filteredTodos} = useSelector((state) => state.todosSlice);

  const todoHandler = (e) => {
    e.preventDefault()
    setValue(e.target.value)
  }

  useEffect(() => {
    filterHandler()
  }, [todos])

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      const newTodo = {
        isDone: false,
        value,
        id: uniqueId()
      }
      dispatch(setTodo([newTodo, ...todos]))
      setValue('')
    }
  }


  const allTodosHandler = (e) => {
    const updatedTodos = todos.map(item => {
      return {
        ...item,
        isDone: e.target.checked,
      }
    })
    dispatch(setTodo(updatedTodos))
    setAllTodosSwitch(prevState => !prevState)
  }

  const todoStatusHandler = (e, item) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === item.id) {
        return {
          ...todo,
          isDone: !todo.isDone
        }
      } else {
        return todo
      }
    })
    dispatch(setTodo(updatedTodos))
  }

  const deleteTodo = (e, item) => {
    e.preventDefault();
    const updatedTodos = todos.filter(todo => todo.id !== item.id)
    dispatch(setTodo(updatedTodos))
  }

  const filterHandler = (filterBy = 'all') => {
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
  }

  const deleteCompletedTodos = (e) => {
    e.preventDefault();
    let updatedTodos = todos.filter(todo => !todo.isDone);

    dispatch(setTodo(updatedTodos));
    setAllTodosSwitch(prevState => !prevState);
  }

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
            <input type="checkbox" checked={item.isDone} onChange={(e) => todoStatusHandler(e, item)}/>
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

