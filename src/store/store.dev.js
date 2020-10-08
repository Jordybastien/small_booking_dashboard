import { createStore, compose, applyMiddleware } from 'redux';
import combineReducers from '../reducers';
import thunk from 'redux-thunk';
import RISI from 'redux-immutable-state-invariant';

export default () => {
  const composeEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    combineReducers,
    composeEnhancer(applyMiddleware(thunk, RISI()))
  );
};
