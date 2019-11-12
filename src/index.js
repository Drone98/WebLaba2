import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducer from './reducers'
import LocalWeather from './localWeather';
import Favorites from './favorites';


ReactDOM.render(
    <LocalWeather />,
    document.getElementById('geo')
);


let persistedState = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : [];

let store = createStore(reducer, persistedState);

const render = () => ReactDOM.render(
    <Favorites
        items={store.getState()}
        onAdd={(name) => store.dispatch({ type: 'ADD',  name: name})}
        onDelete={(name) => store.dispatch({ type: 'DELETE', name: name})}
    />,
    document.getElementById('items')
);

render();
store.subscribe(() => {
    localStorage.setItem('state', JSON.stringify(store.getState()));
});

