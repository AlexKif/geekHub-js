import React, {useCallback, useEffect, useState} from 'react';
import {useParams, useRouteMatch, useHistory} from "react-router-dom";
import {API} from "./api";

const SingleTodo = () => {
  const {id} = useParams();
  const [todo, setTodo] = useState({});
  const history = useHistory();
  const [value, setValue] = useState('');
  const isEdit = useRouteMatch("/todo/:id/edit")

  useEffect(() => {
    API.getTodo(id).then(res => {
      setTodo(res.data)
      setValue(res.data.value)
    })
  }, [])

  const textHandler = useCallback((e) => {
    setValue(e.target.value)
  }, [])

  const saveHandler = useCallback((e) => {
    API.updateTodo(id, value).then(res => {
      history.push("/");
    })

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
