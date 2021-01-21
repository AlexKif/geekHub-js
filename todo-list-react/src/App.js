import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux"
import {addTodo} from "./slices/todo";
import uniqueId from 'lodash/uniqueId';
import styled from 'styled-components'

function App() {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [allTodosSwitch, setAllTodosSwitch] = useState(false)

  const dispatch = useDispatch();
  const {todosList} = useSelector((state) => state.todosSlice);
  function addNumbers () {
    dispatch(addTodo([5, 10, 15]))
  }

  const todoHandler = (e) => {
    e.preventDefault()
    setValue(e.target.value)
  }

  useEffect(() => {
    if (!todos.length) setAllTodosSwitch(false)
  }, [todos])

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      const tempTodos = [...todos];
      const newTodo = {
        isDone: false,
        value,
        id: uniqueId()
      }
      setTodos([newTodo, ...tempTodos])
      setValue('')
    }
  }

  const allTodosHandler = (e) => {
    setTodos((prevState) => {
      return prevState.map(item => {
        return {
          ...item,
          isDone: e.target.checked,
        }
      })
    });
    setAllTodosSwitch(prevState => !prevState)
  }

  const todoStatusHandler = (e, item) => {
    setTodos(prevState => {
      return prevState.map((todo) =>  {
        if (todo.id === item.id) {
          return {
            ...todo,
            isDone: !todo.isDone
          }
        } else {
          return todo
        }
      })
    })
  }

  const deleteTodo = (e, item) => {
    e.preventDefault();
    const updatedTodos = todos.filter(todo => todo.id !== item.id)
    setTodos(updatedTodos)
  }

  const filterHandler = (e, filterBy) => {
    switch (filterBy) {
      case 'all':
        console.log('all')
        break;
      case 'active':
        console.log('active')
        break;
      case 'completed':
        console.log('completed')
        break;
    }
  }

  const deleteCompletedTodos = (e) => {
    e.preventDefault();
    let updatedTodos = todos.filter(todo => !todo.isDone)
    setTodos(updatedTodos);
    setAllTodosSwitch(prevState => !prevState);
  }

  const getCountCompletedTodos = () => {
    return todos.filter(todo => todo.isDone).length
  }

  return (
    <div className="app">
      <div className="">
          <input type="checkbox" checked={allTodosSwitch} onChange={allTodosHandler}/>
          <input type="text" value={value} onChange={todoHandler} onKeyDown={onKeyDown} />
      </div>

      {todos.map((item, index) => {
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
          <span>Completed todos: {getCountCompletedTodos()}</span>
        </div>
        <div className="todo-filter">
          <input defaultChecked={true} onChange={(e) => filterHandler(e, 'all')} id="allTodos" name="todoFilter" type="radio"/><label htmlFor="allTodos">All</label>
          <input onChange={(e) => filterHandler(e, 'active')} id="activeTodos" name="todoFilter" type="radio"/><label htmlFor="activeTodos">Active</label>
          <input onChange={(e) => filterHandler(e, 'completed')} id="completedTodos" name="todoFilter"  type="radio"/><label htmlFor="completedTodos">Completed</label>
        </div>
        {getCountCompletedTodos() ? <button onClick={deleteCompletedTodos} className="delete-completed-todos">Clear completed</button>: null}
      </div>
    </div>
  );
}

export default App;

const TodoItem = styled.span`
  text-decoration: ${props => props.isDone ? 'line-through': null}
`;

