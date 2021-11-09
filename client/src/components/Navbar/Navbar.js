import React from "react";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";

import { If, Else, Then } from "react-if";
import MobileMenu from "./MobileMenu";

@inject("UserStore")
@observer
class Navbar extends React.Component {
    handleLogout = (e) => {
        e.preventDefault();
        const { user, googleLogout, logout } = this.props.UserStore;
        if (user.googleId) {
            googleLogout();
        } else {
            logout();
        }
    };

    render() {
        return (
            <header className="bg-pink-500 text-white body-font fixed inset-x-0 top-0 z-50">
                <div className="flex flex-wrap pt-3 px-5 flex-col md:flex-row items-start md:items-center">
                    <Link
                        to="/store"
                        className="title-font text-xl font-medium pb-3"
                    >
                        Sweet Shop
                    </Link>
                    <nav className="md:ml-auto hidden md:flex flex-wrap items-center text-base justify-center">
                        <Link to="/home" className="mr-5 pb-3">
                            Home
                        </Link>
                        <Link to="/store" className="mr-5 pb-3">
                            Store
                        </Link>
                        <If condition={this.props.UserStore.isAuthenticated}>
                            <Then>
                                <Link
                                    onClick={this.handleLogout}
                                    className="mr-5 pb-3"
                                    to="/login"
                                >
                                    Logout
                                </Link>
                            </Then>
                            <Else>
                                <Link to="/login" className="mr-5 pb-3">
                                    Login
                                </Link>
                                <Link to="/register" className="mr-5 pb-3">
                                    Register
                                </Link>
                            </Else>
                        </If>
                        <Link to="/cart" className="mr-5 pb-3">
                            <button className="inline-flex items-center bg-pink-600 border-0 py-1 px-3 focus:outline-none hover:bg-pink-700 rounded text-base md:mt-0">
                                Cart
                            </button>
                        </Link>
                    </nav>
                </div>
                <MobileMenu handleLogout={this.handleLogout} />
            </header>
        );
    }
}

export default Navbar;
