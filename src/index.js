import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'

import App from "./App";
import store from './store'

import './assets/styles/index.scss';

// Initialize APP
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider >, document.getElementById('app'))