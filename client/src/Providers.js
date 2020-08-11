import React from "react";

import { ProductsProvider } from "./context/Products/ProductsContext";
import { CartProvider } from "./context/Cart/CartContext";
import { UsersProvider } from "./context/Users/UsersContext";
import { MsgProvider } from "./context/Msg/MsgContext";

import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";

function Providers() {
    return (
        <MsgProvider>
            <UsersProvider>
                <CartProvider>
                    <ProductsProvider>
                        <Router>
                            <App />
                        </Router>
                    </ProductsProvider>
                </CartProvider>
            </UsersProvider>
        </MsgProvider>
    );
}

export default Providers;
