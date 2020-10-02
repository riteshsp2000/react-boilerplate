import React from 'react';

// Libraries
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

// Components
import ActivityIndicator from '../components/shared/ActivityIndicator';

// Helpers
import createBrowserHistory from '../helpers/history';

// Asynchronous Loading of Pages in different chunks
const AsyncHome = Loadable({
  loader: () => import('./Home'),
  loading: ActivityIndicator,
});

function App() {
  return (
    <Router history={createBrowserHistory}>
      <Switch>
        <Route path='/' exact>
          <AsyncHome />
        </Route>
        <Redirect to='/' />
      </Switch>
    </Router>
  );
}

export default App;
