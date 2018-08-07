import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import UserReducer from './reducers/UserReducer';

const store = createStore(
    combineReducers({ UserReducer }), // any and all reducers that are created/used will combine and export
    {},                             // any initial state you want to set
    applyMiddleware(createLogger(), thunk, promise()) // allows us to dispatch asynchronous actions
);

export default store;