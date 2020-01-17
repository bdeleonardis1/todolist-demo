import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './components/Login/Login';
import CreateAccount from './components/CreateAccount/CreateAccount';
import Dashboard from './components/Dashboard/Dashboard';
import Logout from './components/Logout/Logout';

import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loggedIn: true};
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Dashboard}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/createaccount" component={CreateAccount} />
          <Route expact path="/logout" component={Logout}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
