import React, { useEffect, useContext } from "react";

import Loader from "react-loader-spinner";

import { Switch, Route, useLocation } from "react-router-dom";

import { If, Then, Else } from "react-if";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home";
import RedirectToHome from "./components/ProtectedRoutes/RedirectToHome";
import Products from "./components/Products/Products";
import ProductPage from "./components/Products/ProductPage";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

import { UsersContext } from "./context/Users/UsersContext";
import { ProductsContext } from "./context/Products/ProductsContext";
import { CartContext } from "./context/Cart/CartContext";
import ForwardRoute from "./components/ProtectedRoutes/ForwardRoute";
import { MsgContext } from "./context/Msg/MsgContext";
import Cart from "./components/Cart/Cart";
import Page404 from "./components/Page404";

function App() {
    const location = useLocation();

    const { getUser, isUserLoaded } = useContext(UsersContext);
    const { getProducts, isProductsLoaded } = useContext(ProductsContext);
    const { getCartItems, isCartLoaded } = useContext(CartContext);
    const { setMsg } = useContext(MsgContext);

    useEffect(() => {
        getProducts();
        getUser();
    }, []); // eslint-disable-line

    useEffect(() => {
        if (isUserLoaded) {
            getCartItems();
        }
    }, [isUserLoaded]);  // eslint-disable-line

    useEffect(() => {
        setMsg("");
        window.scrollTo(0, 0);
    }, [location.pathname]);  // eslint-disable-line

    return (
        <If condition={isUserLoaded && isProductsLoaded && isCartLoaded}>
            <Then>
                <Navbar />

                <Switch>
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/store" component={Products} />
                    <Route exact path="/store/:id" component={ProductPage} />
                    <Route exact path="/cart" component={Cart} />
                    <ForwardRoute exact path="/login" component={Login} />
                    <ForwardRoute exact path="/register" component={Register} />
                    <RedirectToHome exact path="/" />
                    <Route component={Page404} />
                </Switch>
            </Then>
            <Else>
                <div className="absolute top-0 w-screen h-screen flex flex-wrap items-center justify-center">
                    <Loader
                        type="Oval"
                        color="#ed64a6"
                        height={80}
                        width={80}
                    />
                </div>
            </Else>
        </If>
    );
}

export default App;
