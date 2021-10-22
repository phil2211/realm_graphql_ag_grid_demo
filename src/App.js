import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import Welcome from './Containers/Welcome';
import GridDemo from './Containers/GridDemo';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/welcome">Welcome</Link>
            </li>
            <li>
              <Link to="/grid">Grid Demo</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/welcome">
            <Welcome />
          </Route>
          <Route path="/grid">
            <GridDemo />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;