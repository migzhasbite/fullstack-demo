import { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import axios from 'axios';
import jwt_decode from 'jwt-decode';

import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Nav from './components/Nav';
import './App.css';

class App extends Component {
  state = {
    currentUser: null,
  };

  componentDidMount() {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.setState({ currentUser: jwt_decode(token) });
    }
  }

  handleLoginSuccess = (user) => {
    console.log(user);
    this.setState({ currentUser: user });
  };

  handleLogout = () => {
    console.log('handleLogout on App');
    sessionStorage.removeItem('token');
    this.setState({
      currentUser: null,
    });
  };

  render() {
    return (
      <Router>
        <Nav user={this.state.currentUser} />
        <Switch>
          <Route
            path={'/login'}
            render={(routerProps) => (
              <Login
                {...routerProps}
                onLoginSuccess={(user) => {
                  this.handleLoginSuccess(user);
                }}
              />
            )}
          />
          <Route
            path={'/logout'}
            render={(routerProps) => (
              <Logout
                {...routerProps}
                handleLogout={() => {
                  this.handleLogout();
                }}
              />
            )}
          />
          <ProtectedRoute path={'/dashboard'} component={Dashboard} />
          <Route path={'/'} exact component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default App;
