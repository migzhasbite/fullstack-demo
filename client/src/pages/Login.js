import { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  state = {
    formData: null,
    isError: false,
  };

  handleChange = (e) => {
    this.setState({
      formData: { ...this.state.formData, [e.target.name]: e.target.value },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // This works because of the proxy property on /client/package.json.
    axios
      .post('/api/users/login', this.state.formData)
      .then((res) => {
        sessionStorage.setItem('token', res.data.token);
        this.setState({ success: true });
        // FIXME: redirect to the original sender page
      })
      .catch((error) => {
        this.setState({ isError: true });
      });
  };

  render() {
    return (
      <div className="login">
        <h1>Login</h1>
        {this.state.isError && <div className="err">ERROR!</div>}
        {this.state.success && <Redirect to="/" />}
        <form onSubmit={this.handleSubmit}>
          <label>Email</label>
          <input type="email" name="email" onChange={this.handleChange} />
          <label>Password</label>
          <input type="password" name="password" onChange={this.handleChange} />
          <button>Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
