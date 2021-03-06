import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import SignIn from './pages/SignIn';
import Box from './pages/Box';
import SignUp from './pages/SignUp';
import { isAuthenticated } from "./services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route path="/SignUp"  component={SignUp} />
            <PrivateRoute path="/box" component={Box} />
            <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
    </BrowserRouter>
);

export default Routes;