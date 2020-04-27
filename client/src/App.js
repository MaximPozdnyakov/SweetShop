import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Loader from "react-loader-spinner";

import {
    ProductsProvider,
    ProductsContext,
} from "./context/Products/ProductsContext";

import { CartProvider } from "./context/Cart/CartContext";

import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";

function App() {
    return (
        <CartProvider>
            <ProductsProvider>
                <ProductsContext.Consumer>
                    {(value) => {
                        const { loaded } = value;

                        return (
                            <Router>
                                <React.Fragment>
                                    <Navbar />
                                    {!loaded ? (
                                        <div
                                            className="container justify-content-center d-flex align-items-center"
                                            style={{ height: "80vh" }}
                                        >
                                            <Loader
                                                type="Oval"
                                                color="#00BFFF"
                                                height={200}
                                                width={200}
                                            />
                                        </div>
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
        </CartProvider>
    );
}

export default App;
