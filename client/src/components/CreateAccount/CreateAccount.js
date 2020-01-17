import React from 'react';
import {Link} from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {usernameInUse: false};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var firstname = document.getElementById("firstname").value;
        var lastname = document.getElementById("lastname").value;

        var data = {
            username: username,
            password: password,
            firstname: firstname,
            lastname: lastname
        };

        fetch("/auth/createaccount",
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
                if (jsonResponse.successful) {
                    this.props.history.push("/");
                } else {
                    this.setState({usernameInUse: true});
                }

            });
    }

    render() {
        var error = null;
        if (this.state.usernameInUse) {
            error = <p className='error'>That username is already in use!</p>;
        }
        return (
            <div>
                {error}
                <h1>Create Account</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>First name: <input type='text' id='firstname' /></label><br />
                    <label>Last name: <input type='text' id='lastname' /></label><br />
                    <label>Username: <input type='text' id='username' /></label><br />
                    <label>Password: <input type='password' id='password' /></label><br />

                    <button onClick={this.handleSubmit}>Create Account</button>
                </form>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>

        )
    }
}

export default Login;