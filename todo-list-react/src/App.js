import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux"
import todo, {addTodo} from "./slices/todo";
import uniqueId from 'lodash/uniqueId';
import styled from 'styled-components'

const testData = [
  {
    isDone: true,
    value: "qweqeqeqeq1231321qweqwe13231",
    id: 1
  },
  {
    isDone: false,
    value: "123131qweqeqeq",
    id: 2
  },
  {
    isDone: false,
    value: "qweqewewqewqewqewqeqe",
    id: 3
  },
  {
    isDone: true,
    value: "qweqeqeqeqeqewqeqqwe",
    id: 4
  },
  {
    isDone: true,
    value: "qweqeqeqeq1231321qweqwe13231",
    id: 5
  },
  {
    isDone: false,
    value: "123131qweqeqeq",
    id: 6
  },
]

function App() {

  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([])

  const [value, setValue] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [allTodosSwitch, setAllTodosSwitch] = useState(false);

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
    console.log(filteredTodos)
    switch (activeFilter) {
      case 'all':
        setFilteredTodos(todos)
        break;
      case 'active':
        let activeTodos = todos.filter(item => !item.isDone)
        setFilteredTodos(activeTodos)
        break;
      case 'completed':
        let completedTodos = todos.filter(item => item.isDone)
        setFilteredTodos(completedTodos)
        break;
    }
    // console.log(todos)
    // if (todos.length) setAllTodosSwitch(false)
  }, [todos])

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      const newTodo = {
        isDone: false,
        value,
        id: uniqueId()
      }
      setTodos([newTodo, ...todos])
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
    setTodos(updatedTodos)
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
    setTodos(updatedTodos)
  }

  const deleteTodo = (e, item) => {
    e.preventDefault();
    const updatedTodos = todos.filter(todo => todo.id !== item.id)
    setTodos(updatedTodos)
  }

  const filterHandler = (e, filterBy) => {
    setActiveFilter(filterBy)
    // setAllTodosSwitch(false)
    switch (filterBy) {
      case 'all':
        setFilteredTodos(todos)
        break;
      case 'active':
        let activeTodos = todos.filter(item => !item.isDone)
        setFilteredTodos(activeTodos)
        break;
      case 'completed':
        let completedTodos = todos.filter(item => item.isDone)
        setFilteredTodos(completedTodos)
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
    // return todos.filter(todo => todo.isDone).length
    return 6
  }

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

