import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import SamplePage from './Pages/SamplePage';
import Error404 from './Pages/404';
import Login from './Auth/Login';
import Register from './Auth/Register';
import ForgotPasswordPage from './Auth/ForgotPassword';
import DemoPage from './Pages/demo/DemoPage';
import Home from './Pages/Listing';
import { AuthContext } from '@jumbo/components/context/AuthContext';
import HobbyIndex from './Pages/hobby/HobbyIndex';

const RestrictedRoute = ({ component: Component, ...rest }) => {
  const { kinderCubby_auth } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={props =>
        kinderCubby_auth.access_token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const Routes = () => {
  const { kinderCubby_auth } = useContext(AuthContext);

  const location = useLocation();

  if (location.pathname === '' || location.pathname === '/') {
    return <Redirect to={'/home'} />;
  } else if (kinderCubby_auth.access_token && location.pathname === '/signin') {
    return <Redirect to={'/home'} />;
  }

  return (
    <React.Fragment>
      <Switch>

      <RestrictedRoute exact path="/hobby" component={HobbyIndex} />



        <RestrictedRoute exact path="/" component={Home} />
        <RestrictedRoute exact path="/home" component={Home} />
        <RestrictedRoute path="/demo-page" component={DemoPage} />
        <Route path="/sample-page" component={SamplePage} />
        <Route path="/signin" component={Login} />
        <Route path="/signup" component={Register} />
        <Route path="/forgot-password" component={ForgotPasswordPage} />
        <Route component={Error404} />
      </Switch>
    </React.Fragment>
  );
};

export default Routes;
