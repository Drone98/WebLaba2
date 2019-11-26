import React from 'react';
import ReactDOM from 'react-dom';
import {store} from './store/store'
import {Provider} from "react-redux";
import MainLayout from "./classes/mainLayout";


ReactDOM.render(
    <Provider store={store}>
        <MainLayout />
    </Provider>,
    document.getElementById('root')
);


