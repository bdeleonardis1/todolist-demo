
import React from 'react';
import {Link} from 'react-router-dom';

import "./Dashboard.css";
import TodoApp from "./TodoApp/TodoApp"

function Title(props) {
  return <h1>Brian's TODO List</h1>
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
