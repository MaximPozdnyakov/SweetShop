import React from "react";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";

import { slide as Menu } from "react-burger-menu";

import { If, Else, Then } from "react-if";

class MobileMenu extends React.Component {
    state = {
        isMenuOpen: false,
    };

    toggleMenu = () =>
        this.setState(({ isMenuOpen }) => ({ isMenuOpen: !isMenuOpen }));

    render() {
        const { isAuthenticated } = this.props.UserStore;
        const { isMenuOpen } = this.state;
        return (
            <Menu
                right
                className="block md:hidden"
                isOpen={isMenuOpen}
                onOpen={this.toggleMenu}
                onClose={this.toggleMenu}
            >
                <Link to="/home" className="mb-3" onClick={this.toggleMenu}>
                    Home
                </Link>
                <Link to="/store" className="mb-3" onClick={this.toggleMenu}>
                    Store
                </Link>
                <If condition={isAuthenticated}>
                    <Then>
                        <Link
                            onClick={() => {
                                this.props.handleLogout();
                                this.toggleMenu();
                            }}
                            className="mb-3 bm-item"
                            to="/login"
                        >
                            Logout
                        </Link>
                    </Then>
                    <Else>
                        <Link
                            to="/login"
                            className="mb-3 bm-item"
                            onClick={this.toggleMenu}
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="mb-3 bm-item"
                            onClick={this.toggleMenu}
                        >
                            Register
                        </Link>
                    </Else>
                </If>
                <Link to="/cart" className="mb-3" onClick={this.toggleMenu}>
                    <button className="inline-flex items-center bg-pink-600 border-0 py-2 px-12 text-xl focus:outline-none hover:bg-pink-700 rounded text-base md:mt-0">
                        Cart
                    </button>
                </Link>
            </Menu>
        );
    }
}

export default inject("UserStore")(observer(MobileMenu));
