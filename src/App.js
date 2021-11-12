import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import RealmApolloProvider from './lib/apolloClient';

import { useRealmApp, RealmAppProvider } from "./RealmApp";
import Welcome from './Containers/Welcome';
import GridDemo from './Containers/GridDemo';
import LoginScreen from './Containers/LoginScreen';

export const APP_ID = process.env.REACT_APP_REALMAPP;

const App = () => {
  return (
    <RealmAppProvider appId={APP_ID}>
      <RealmApolloProvider>
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
      </RealmApolloProvider>
    </RealmAppProvider>
  )
}

export default App;