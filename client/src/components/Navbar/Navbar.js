import { Link } from "react-router-dom";
import React, { useContext } from "react";

import Category from "./Category";
import Price from "./Price";
import Search from "./Search";
import { ProductsContext } from "../../context/Products/ProductsContext";
import { UsersContext } from "../../context/Users/UsersContext";
import Logout from "../Login/Logout";

function Navbar() {
  const { clear } = useContext(ProductsContext);

  const { isAuthenticated } = useContext(UsersContext);

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-primary">
        <Link className="navbar-brand text-white mx-sm-5 mx-2" to="/">
          Sweet Shop
        </Link>
        <Link
          className="nav-link active font-weight-bold d-md-none d-block text-white"
          to="/cart"
          style={{ fontSize: "1.2em" }}
        >
          <i className="fas fa-shopping-cart mr-1"></i>Cart
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav navbar-collapse justify-content-sm-between align-items-start">
            <ul className="navbar-nav ml-sm-5 ml-2 ml-md-0 align-items-md-center">
              <li className="nav-item mx-2 d-md-flex d-none">
                <Link
                  className="nav-link active font-weight-bold"
                  to="/cart"
                  style={{ fontSize: "1.2em" }}
                >
                  <i className="fas fa-shopping-cart mr-1"></i>Cart
                </Link>
              </li>
              {isAuthenticated ? (
                <Logout />
              ) : (
                <li className="nav-item mx-2">
                  <Link className="nav-link active" to="/login">
                    Login
                  </Link>
                </li>
              )}
              <Category />
              <Price />

              <li className="nav-item ml-2 my-sm-2">
                <Link className="nav-link" to="/" onClick={clear}>
                  Clear
                </Link>
              </li>
            </ul>

            <Search />
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
