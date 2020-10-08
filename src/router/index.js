import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from '../views/dashboard';
import NotFound from '../views/notFound';
import Login from '../views/login';
import ProtectedRoute from '../components/protectedRoute';
import ReduxToastr from 'react-redux-toastr';

const Routing = () => {
  return (
    <>
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        getState={(state) => state.toastr}
        progressBar
        closeOnToastrClick
      />
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          {/* TODO: Protect Dashboard */}
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </>
  );
};

export default Routing;
