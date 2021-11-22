import './Signup.scss';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Input from '../../components/Input/Input';

class Signup extends Component {
  handleSubmit = (event) => {};

  render() {
    return (
      <main className="signup-page">
        <form className="signup" onSubmit={this.handleSubmit}>
          <h1 className="signup__title">Sign up</h1>

          <Input type="text" name="first_name" label="First name" />
          <Input type="text" name="last_name" label="Last name" />
          <Input type="text" name="phone" label="Phone" />
          <Input type="text" name="address" label="Address" />
          <Input type="text" name="email" label="Email" />
          <Input type="password" name="password" label="Password" />

          <button className="signup__button">Sign up</button>

          {/* <div className="signup__message">Signed up!</div>

          <div className="signup__message">{this.state.error}</div> */}
        </form>
        <p>
          Have an account? <Link to="/login">Log in</Link>
        </p>
      </main>
    );
  }
}

export default Signup;
