import { Link } from 'react-router-dom';
import React from 'react';

import Category from './Category';
import Price from './Price';
import Search from './Search';

function Navbar() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-info">
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
          <ul className="navbar-nav justify-content-between align-items-start navbar-collapse">
            <li>
              <ul className="navbar-nav">
                <Category />
                <Price />
                <Search />
              </ul>
            </li>
            <li className="nav-item">
              <Link className="btn btn-primary my-2 mr-sm-5 ml-2" to="/cart">
                My Cart
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
