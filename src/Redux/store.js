import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import authReducer from './reducers/authReducer';
// index file is deault and doesn't have to be named
import reducer from './reducers';

// Array of thunks - break tasks in parallel or partition
const middleware = [thunk];

// Function requires 3 parameters
const store = createStore (
  // An array of empty reducers 
  //() => [authReducer],
  reducer,
  // Empty initial state
  {},
  // Enhancement: data transformation, apply thunking ability
  // spread the current data in the store, and then thunk it
  compose (
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;