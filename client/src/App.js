import React from "react";
import { observer, inject } from "mobx-react";
import { Switch, Route, withRouter } from "react-router-dom";

import Loader from "./components/Utils/Loader";
import Navbar from "./components/Navbar/Navbar";

import Home from "./components/Home";
import Products from "./components/Products/Products";
import Page404 from "./components/Page404";
import ProductPage from "./components/Products/ProductPage";
import Cart from "./components/Cart/Cart";
import RegisterPage from "./components/Register/RegisterPage";
import LoginPage from "./components/Login/LoginPage";

import AuthRoute from "./components/Routes/AuthRoute";
import HomeRoute from "./components/Routes/HomeRoute";

class App extends React.Component {
    componentDidUpdate(prevProps) {
        const prevPath = prevProps.location.pathname;
        const currentPath = this.props.location.pathname;
        if (currentPath !== prevPath) {
            this.props.MsgStore.setMsg("");
            window.scrollTo(0, 0);
        }
    }

    render() {
        const { isProductsLoaded } = this.props.ProductsStore;
        const { isUserLoaded } = this.props.UserStore;
        const { isCartLoaded } = this.props.CartStore;
        if (!isProductsLoaded || !isUserLoaded || !isCartLoaded) {
            return <Loader />;
        }

        return (
            <>
                <Navbar />
                <Switch>
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/store" component={Products} />
                    <Route exact path="/store/:id" component={ProductPage} />
                    <Route exact path="/cart" component={Cart} />
                    <AuthRoute exact path="/login" component={LoginPage} />
                    <AuthRoute
                        exact
                        path="/register"
                        component={RegisterPage}
                    />
                    <HomeRoute exact path="/" />
                    <Route component={Page404} />
                </Switch>
            </>
        );
    }
}

export default withRouter(
    inject("ProductsStore", "MsgStore", "UserStore", "CartStore")(observer(App))
);
