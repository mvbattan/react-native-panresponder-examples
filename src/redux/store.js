import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import Reactotron from 'reactotron-react-native';
import thunk from 'redux-thunk';
import { isEqual } from 'lodash';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

import { ROOT } from '../constants/platform';
import { getCurrentRouteName } from '../utils/navUtils';
import Navigator from '../app/screens';

const nav = (state, action) => {
  const nextState = Navigator.router.getStateForAction(action, state);
  // Prevents navigating twice to the same route but allow navigate if same routes with different params
  if (state && nextState) {
    // Getting routes and params
    const currentParams = Navigator.router.getPathAndParamsForState(state).params;
    const nextParams = action.params;
    const stateRouteName = getCurrentRouteName(state);
    const nextStateRouteName = getCurrentRouteName(nextState);
    // Check if has same route and return original state if have same routes with same params and next state in other case
    if (stateRouteName === nextStateRouteName) {
      return isEqual(currentParams, nextParams) ? state : nextState;
    }
  }
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

const reducers = combineReducers({
  nav
});

const middlewares = [];
const enhancers = [];

/* ------------- React Navigation Middleware ------------- */
middlewares.push(createReactNavigationReduxMiddleware(ROOT, state => state.nav));

/* ------------- Thunk Middleware ------------- */
middlewares.push(thunk);

/* ------------- Assemble Middleware ------------- */
enhancers.push(applyMiddleware(...middlewares));

// in dev mode, we'll create the store through Reactotron
const createAppropriateStore = __DEV__ ? Reactotron.createStore : createStore;
const store = createAppropriateStore(reducers, compose(...enhancers));

export default store;
