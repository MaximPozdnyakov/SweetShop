import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import {
    ProductsProvider,
    ProductsContext,
} from "./context/Products/ProductsContext";

import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";

function App() {
    return (
        <ProductsProvider>
            <ProductsContext.Consumer>
                {(value) => {
                    const { loaded } = value;

                    return (
                        <Router>
                            <React.Fragment>
                                <Navbar />
                                {!loaded ? (
                                    <h1>Not Loaded</h1>
                                ) : (
                                    <Switch>
                                        <Route
                                            exact
                                            path="/"
                                            component={Products}
                                        />
                                    </Switch>
                                )}
                            </React.Fragment>
                        </Router>
                    );
                }}
            </ProductsContext.Consumer>
        </ProductsProvider>
    );
}

export default App;
