import React from 'react';
import ReactDOM from 'react-dom';
import {storage} from './storage/storage'
import {Provider} from "react-redux";
import MainLayout from "./classes/mainLayout";


ReactDOM.render(
    <Provider store={storage}>
        <MainLayout />
    </Provider>,
    document.getElementById('root')
);