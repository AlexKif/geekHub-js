import React from 'react';
import styled from 'styled-components'
import {
  Switch,
  Route,
} from "react-router-dom";
import Todo from "./Todo";
import SingleTodo from "./SingleTodo";

function App() {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          <Todo activeFilter="all"/>
        </Route>
        <Route exact path="/active">
          <Todo activeFilter="active"/>
        </Route>
        <Route exact path="/completed">
          <Todo activeFilter="completed"/>
        </Route>
        <Route exact path="/todo/:id">
          <SingleTodo/>
        </Route>
        <Route exact path="/todo/:id/edit">
          <SingleTodo/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;

const TodoItem = styled.span`
  text-decoration: ${props => props.isDone ? 'line-through': null}
`;

