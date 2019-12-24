import React from 'react';
import ReactDOM from 'react-dom';
import {storage} from './storage/storage'
import {Provider} from "react-redux";
import MainLayout from "./classes/mainLayout";
import axios from 'axios'

ReactDOM.render(
    <Provider store={storage}>
        <MainLayout axios={axios} />
    </Provider>,
    document.getElementById('root')
);