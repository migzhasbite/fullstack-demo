import './Login.scss';
import { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Input from '../../components/Input/Input';

class Login extends Component {
  state = {
    error: '',
    success: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();

    // Make an API call to the login API and pass in our form data.
    axios
      .post('/api/users/login', {
        email: event.target.email.value,
        password: event.target.password.value,
      })
      .then((response) => {
        // If the API returns OK, it'll have a user and a token
        // Set our token to sessionStorage
        sessionStorage.setItem('token', response.data.token);
        // And change our success state to true
        this.setState({ success: true });
      })
      .catch((error) => {
        // Otherwise, leave success state alone, and set the error state to our resonse data
        this.setState({ error: error.message });
      });
  };

  render() {
    return (
      <main className="login-page">
        <form className="login" onSubmit={this.handleSubmit}>
          <h1 className="login__title">Log in</h1>

          <Input type="text" name="email" label="Email" />
          <Input type="password" name="password" label="Password" />

          <button className="login__button">Log in</button>

          {this.state.error && (
            <div className="login__message">{this.state.error}</div>
          )}
          {this.state.success && <Redirect to="/" />}
        </form>
        <p>
          Need an account? <Link to="/signup">Sign up</Link>
        </p>
      </main>
    );
  }
}

export default Login;
