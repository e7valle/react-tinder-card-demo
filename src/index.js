import React from "react";
// import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import ReactDOM from "react-dom";


ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
    )


serviceWorker.unregister();