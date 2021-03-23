import React from 'react';
import './style.scss';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Registration from "../Registration";
import Login from "../Login";

const App = () => {

  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/registration" component={Registration}/>
      </Switch>
    </Router>
  );
};

export default App;

