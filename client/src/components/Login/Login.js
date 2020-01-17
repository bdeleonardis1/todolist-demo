import React from 'react';
import {Link} from 'react-router-dom'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loginFailure: false};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var data = {
      username: username,
      password: password
    };

    fetch("/auth/login",
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then((jsonResponse) => {
        console.log("jsonResponse:", jsonResponse);
        if (jsonResponse.successful) {
          this.props.history.push("/");
        } else {
          this.setState({loginFailure: true});
        }

      });
  }

  render() {
    var error = null;
    if (this.state.loginFailure) {
      error = <p className='error'>Incorrect username or password!</p>
    }
    return (
      <div>
        {error}
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Username: <input type='text' id='username' /></label><br />
          <label>Password: <input type='password' id='password' /></label><br />

          <button onClick={this.handleSubmit}>Login</button>
        </form>
        <Link to="/createaccount">Create Account</Link>
      </div>

    )
  }
}

export default Login;