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

  handleSubmit = (event) => {};

  render() {
    return (
      <main className="login-page">
        <form className="login" onSubmit={this.handleSubmit}>
          <h1 className="login__title">Log in</h1>

          <Input type="text" name="email" label="Email" />
          <Input type="password" name="password" label="Password" />

          <button className="login__button">Log in</button>

          {/* <div className="login__message">{this.state.error}</div>
          <Redirect to="/" /> */}
        </form>
        <p>
          Need an account? <Link to="/signup">Sign up</Link>
        </p>
      </main>
    );
  }
}

export default Login;
