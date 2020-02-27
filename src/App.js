import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import RegisterForm from './containers/RegisterForm/RegisterForm';
import LoginForm from './containers/LoginForm/LoginForm';
import ProfilePage from './containers/ProfilePage/ProfilePage';

class App extends Component {
  render() {
    //const isAuthenticated = window.sessionStorage.getItem("Authorization");
    return (
      <div>
        <Switch>
          <Route path="/profile" component={ProfilePage}/>
          <Route path="/register" component={RegisterForm}/>
          <Route path="/login" component={LoginForm}/>
          <Redirect from="/" exact to="/login"/>
        </Switch>
      </div>
    );
  }
}

export default App;
