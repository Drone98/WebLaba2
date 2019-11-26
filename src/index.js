import React from 'react';
import ReactDOM from 'react-dom';
import LocalWeather from './classes/localWeather';
import {store} from './store/store'
import {Provider} from "react-redux";


ReactDOM.render(
    <Provider store={store}>
        <LocalWeather />
    </Provider>,
    document.getElementById('root')
);


