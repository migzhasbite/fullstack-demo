import { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
  componentDidMount() {
    sessionStorage.removeItem('token');
  }
  render() {
    return <Redirect to="/" />;
  }
}

export default Logout;
