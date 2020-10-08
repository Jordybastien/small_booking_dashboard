import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { setCallBackLink } from '../../actions/callBackLink';

const ProtectedRoute = ({ isAuth, path, component, dispatch, ...rest }) => {
  const oldPath = window.location.pathname;

  useEffect(() => {
    if (!isAuth) {
      dispatch(setCallBackLink(oldPath));
    }
  }, [dispatch, isAuth, oldPath]);
  
  return isAuth ? (
    <Route path={path} {...rest} component={component} />
  ) : (
    <Redirect to='/login' />
  );
};

ProtectedRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

const mapStateToProps = ({ authedUser }) => {
  return {
    isAuth: Object.keys(authedUser).length !== 0,
  };
};

export default withRouter(connect(mapStateToProps)(ProtectedRoute));
