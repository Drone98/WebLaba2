import {applyMiddleware, createStore} from "redux";
import reducer from './reducers/reducer';
import thunk from 'redux-thunk';

let persistedState = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : [];

export const storage = createStore(reducer, persistedState, applyMiddleware(thunk));

storage.subscribe(() => {
    localStorage.setItem('state', JSON.stringify(storage.getState()));
});