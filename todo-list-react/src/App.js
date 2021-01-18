import React, { useState } from 'react';
import {useDispatch, useSelector} from "react-redux"
import {addTodo} from "./slices/todo";
import uniqueId from 'lodash/uniqueId';
import indexOf from 'lodash/indexOf'

function App() {
  const dispatch = useDispatch();
  const {todosList} = useSelector((state) => state.todosSlice);
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState('');

  function addNumbers () {
    dispatch(addTodo([5, 10, 15]))
  }

  const generateKey = () => {
    return Math.random().toString(16).substring(2);
  }

  const todoHandler = (e) => {
    e.preventDefault()
    setValue(e.target.value)
  }

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
          isDone: e.target.checked,
          value: item.value,
        }
      })
    })
  }

  const todoStatusHandler = (e, item, index) => {
    setTodos(prevState => {
      return prevState.map((todo) =>  {
        if (todo.id === item.id) {
          return {
            ...todo,
            isDone: true
          }
        } else {
          return todo
        }
      })
    })
  }

  console.log(todos)
  return (
    <div className="App">
      <div className="">
          <input type="checkbox" onChange={allTodosHandler}/>
          <input type="text" value={value} onChange={todoHandler} onKeyDown={onKeyDown} />
      </div>


      {/*<span onClick={addNumbers}>add numbers</span>*/}
      {todos.map((item, index) => {
        return (
          <div key={item.value + index}>
            <label>
            <input type="checkbox" onChange={(e) => todoStatusHandler(e, item)}/>
            {item.value}
            </label>

          </div>
        )
      })}
    </div>
  );
}

export default App;
// checked={item.isDone}