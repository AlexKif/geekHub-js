import React from 'react';
import './style.scss';
import { Router, Switch, Route } from "react-router-dom";
import Registration from "../Registration";
import Login from "../Login";
import history from "../../helpers/history";
import FileManager from "../FileManager";

const App = () => {

  return (
    <Router history={history}>
      <Switch>
        <Route exact path={["/login", "/"]} component={Login}/>
        <Route exact path="/registration" component={Registration}/>
        <Route exact path="/file-manager" component={FileManager}/>
      </Switch>
    </Router>
  );
};

export default App;

