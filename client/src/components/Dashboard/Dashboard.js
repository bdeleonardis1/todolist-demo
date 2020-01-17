
import React from 'react';
import {Link} from 'react-router-dom';

import "./Dashboard.css";
import TodoApp from "./TodoApp/TodoApp"

class Title extends React.Component {
  constructor(props) {
    super(props);

    this.state = {firstname: null};
  } 

  componentDidMount() {
    fetch('/list/firstname')
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (jsonResponse.firstname) {
          this.setState({firstname: jsonResponse.firstname});
        }
      })
  }

  render() {
    return <h1>{this.state.firstname}'s TODO List</h1>
  }
}

class LogoutLink extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    fetch("/auth/logout/", {method: "POST"})
    return false;
  }

  render() {
  return <Link to="/logout" onClick={this.onClick}>Logout</Link>
  }
}

function Header(props) {
  return <div className="header"><Title/><LogoutLink/></div>
}

function Dashboard(props) {
  return (
    <div>
      <Header/>
      <TodoApp/>
    </div>
  )
}

export default Dashboard;
