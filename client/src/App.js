import { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Nav from './components/Nav';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import './App.css';

/**
 * The component will have the following states:
 * - user (default: null)
 * - hasFailedAuth (default: false)
 *
 * STRATEGY
 * Run this immediately:
 * 1. Is there a sessionStorage item named "token"?
 *    - no? well, that was easy; they're not logged in. We're done - set hasFailedAuth to true.
 *    - If so, we'll have to continue.
 * 2. We're going to call /api/v1/users/current.
 */
class App extends Component {
  state = {
    user: null,
    hasFailedAuth: false,
  };

  componentDidMount() {
    const token = sessionStorage.getItem('token');

    if (!token) {
      return this.setState({ hasFailedAuth: true });
    }

    // Get the data from the API
    axios
      .get('/api/users/current', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log({ response });
        this.setState({
          user: response.data,
        });
      })
      .catch((error) => {
        this.setState({
          hasFailedAuth: true,
        });
      });
  }

  handleLogout = () => {
    sessionStorage.removeItem('token');
    this.setState({
      user: null,
      hasFailedAuth: true,
    });
  };

  render() {
    return (
      <Router>
        <Nav hasFailedauth={this.state.hasFailedauth} user={this.state.user} />
        <Switch>
          <Route path={'/login'} component={Login} />
          <Route path={'/logout'} component={Logout} />
          <ProtectedRoute path={'/dashboard'} component={Dashboard} />
          <Route path={'/'} exact component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default App;
