import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import "./App.css";

import { ProductsProvider } from "./context/Products/ProductsContext";

import { CartProvider } from "./context/Cart/CartContext";

import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import ProductPage from "./components/Products/ProductPage";
import Login from "./components/Login/Login";
import SignUp from "./components/Login/SignUp";
import { UsersProvider, UsersContext } from "./context/Users/UsersContext";
import PrivateRoute from "./components/ProtectedRoutes/PrivateRoute";
import ForwardRoute from "./components/ProtectedRoutes/ForwardRoute";
import Stripe from "./components/Cart/Stripe";

function App() {
  return (
    <CartProvider>
      <ProductsProvider>
        <UsersProvider>
          <UsersContext.Consumer>
            {(value) => {
              const { isAuthenticated } = value;

              return (
                <Router>
                  <>
                    <Navbar />

                    <Switch>
                      <PrivateRoute
                        exact
                        path="/"
                        component={Products}
                        isAuthenticated={isAuthenticated}
                      />

                      <PrivateRoute
                        exact
                        path="/cart"
                        component={Cart}
                        isAuthenticated={isAuthenticated}
                      />

                      <PrivateRoute
                        exact
                        path="/products/:id"
                        component={ProductPage}
                        isAuthenticated={isAuthenticated}
                      />

                      <PrivateRoute
                        exact
                        path="/stripe"
                        component={Stripe}
                        isAuthenticated={isAuthenticated}
                      />

                      <ForwardRoute
                        exact
                        path="/login"
                        component={Login}
                        isAuthenticated={isAuthenticated}
                      />

                      <ForwardRoute
                        exact
                        path="/signup"
                        component={SignUp}
                        isAuthenticated={isAuthenticated}
                      />
                    </Switch>
                  </>
                </Router>
              );
            }}
          </UsersContext.Consumer>
        </UsersProvider>
      </ProductsProvider>
    </CartProvider>
  );
}

export default App;
