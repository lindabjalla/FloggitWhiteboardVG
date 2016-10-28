import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import {startSocket, getAllWhiteboards} from '../actions/service';
import reducer from '../reducers';

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};
const logger = createLogger();
const store = createStore(reducer, persistedState, applyMiddleware(thunk, logger));

store.dispatch(getAllWhiteboards());
store.dispatch(startSocket());
store.subscribe(()=> {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;
