import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as MobxProvider } from "mobx-react";

import App from "./App";

import GlobalStore from "./stores/GlobalStore";

import "./assets/main.css";

ReactDOM.render(
    <React.StrictMode>
        <MobxProvider {...new GlobalStore()}>
            <Router>
                <App />
            </Router>
        </MobxProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
