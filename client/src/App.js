import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Switch>
        {/* <Route /> */}
        <ProtectedRoute path={'/'} component={null} />
      </Switch>
    </Router>
  );
}

export default App;
