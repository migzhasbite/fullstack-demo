import './Dashboard.scss';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Dashboard extends Component {
  state = {
    user: null,
    failedAuth: false,
  };

  componentDidMount() {
    // we'll need to check for a token
    // if the token is there, save it as a variable called "token"
    const token = sessionStorage.getItem('token');
    console.log(token);

    // if the token is not there, we are definitely not logged in...
    // we should set our failedAuth state to true and return out
    if (!token) {
      return this.setState({ failedAuth: true });
    }

    // if we DO have a token...
    // ...we'll make that call to our /api/users/current API...
    // and we'll bring in that token as an Authorization header that
    // says "Bearer TOKEN-GOES-HERE"
    axios
      .get('/api/users/current', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // If that works, set the user state to the API result and render to page
        this.setState({ user: response.data });
      })
      .catch((error) => {
        // ...Otherwise we'll set that failedAuth state from line 9 to true.
        this.setState({ failedAuth: true });
      });
  }

  handleLogout = () => {
    // we should be able to "log out" by just removing that token sessionStorage.
    sessionStorage.removeItem('token');
    // After that, we'll save the states of our user to null, and failedAuth to true
    this.setState({ user: null, failedAuth: true });
  };

  render() {
    // if that failedAuth state is TRUE, tell us that we need to log in.
    if (this.state.failedAuth) {
      return (
        <main className="dashboard">
          <p>
            You must be <Link to="/login">logged in</Link> to see this page.
          </p>
        </main>
      );
    }

    if (!this.state.user) {
      return (
        <main className="dashboard">
          <p>Loading...</p>
        </main>
      );
    }

    const { email } = this.state.user;

    return (
      <main className="dashboard">
        <h1 className="dashboard__title">Dashboard</h1>
        <p>Welcome back, {email}! 👋</p>

        <button className="dashboard__logout" onClick={this.handleLogout}>
          Log out
        </button>
      </main>
    );
  }
}

export default Dashboard;
