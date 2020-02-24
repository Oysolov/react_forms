import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import classes from './App.css';
import RegisterForm from './containers/RegisterForm/RegisterForm';


class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <Switch>
          <Route path="/register" component={RegisterForm}/>
          <Route path="/login" component={RegisterForm}/>
          <Route path="/profile" component={RegisterForm}/>
          <Redirect from="/" exact to="/login"/>
        </Switch>
      </div>
    );
  }
}

export default App;
