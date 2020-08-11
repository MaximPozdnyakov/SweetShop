import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { slide as Menu } from "react-burger-menu";

import { UsersContext } from "../../context/Users/UsersContext";

import { If, Else, Then } from "react-if";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const openMenu = () => setIsMenuOpen(true);
    const closeMenu = () => setIsMenuOpen(false);

    const { isAuthenticated, logout, googleLogout, user } = useContext(
        UsersContext
    );

    const handleLogout = (e) => {
        e.preventDefault();
        if (user.googleId) {
            googleLogout();
        } else {
            logout();
        }
        closeMenu();
    };

    return (
        <header className="bg-pink-500 text-white body-font fixed inset-x-0 top-0 z-50">
            <div className="flex flex-wrap pt-3 px-5 flex-col md:flex-row items-start md:items-center">
                <Link
                    to="/home"
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
                    <If condition={isAuthenticated}>
                        <Then>
                            <Link
                                onClick={handleLogout}
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
            <Menu
                right
                className="block md:hidden"
                isOpen={isMenuOpen}
                onOpen={openMenu}
                onClose={closeMenu}
            >
                <Link to="/home" className="mb-3" onClick={closeMenu}>
                    Home
                </Link>
                <Link to="/store" className="mb-3" onClick={closeMenu}>
                    Store
                </Link>
                <If condition={isAuthenticated}>
                    <Then>
                        <Link
                            onClick={handleLogout}
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
                            onClick={closeMenu}
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="mb-3 bm-item"
                            onClick={closeMenu}
                        >
                            Register
                        </Link>
                    </Else>
                </If>
                <Link to="/cart" className="mb-3" onClick={closeMenu}>
                    <button className="inline-flex items-center bg-pink-600 border-0 py-2 px-12 text-xl focus:outline-none hover:bg-pink-700 rounded text-base md:mt-0">
                        Cart
                    </button>
                </Link>
            </Menu>
        </header>
    );
}

export default Navbar;
