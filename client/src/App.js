import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path={'/login'} component={Login} />
        <ProtectedRoute path={'/'} component={null} />
      </Switch>
    </Router>
  );
}

export default App;
