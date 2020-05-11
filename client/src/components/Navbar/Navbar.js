import { Link } from 'react-router-dom';
import React from 'react';

import Category from './Category';
import Price from './Price';
import Search from './Search';

function Navbar() {
  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-primary">
        <Link className="navbar-brand text-white mx-sm-5 mx-2" to="/">
          Sweet Shop
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
              <Category />
              <Price />
              <li className="nav-item">
                <Link
                  to="/cart"
                  className="btn btn-secondary  ml-md-3 ml-1 my-2"
                >
                  My Cart
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
