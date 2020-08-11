import React, { useContext } from 'react';

import { ProductsContext } from '../../context/Products/ProductsContext';
import { Link } from 'react-router-dom';

function Category() {
  const { filterByCategory } = useContext(ProductsContext);

  const changeCategory = (e) => {
    filterByCategory(e.target.attributes.value.value);
  };

  return (
    <li className="nav-item dropdown ml-2 my-sm-2">
      <a
        className="nav-link text-white dropdown-toggle"
        href="/"
        id="navbarDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Category
      </a>
      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        <Link
          className="dropdown-item"
          to="/"
          value="Our Products"
          onClick={changeCategory}
        >
          All
        </Link>
        <Link
          className="dropdown-item"
          to="/"
          value="Big Cake"
          onClick={changeCategory}
        >
          Big Cakes
        </Link>
        <Link
          className="dropdown-item"
          to="/"
          value="Small Cake"
          onClick={changeCategory}
        >
          Small Cakes
        </Link>
        <Link
          className="dropdown-item"
          to="/"
          value="Candy"
          onClick={changeCategory}
        >
          Candy
        </Link>
      </div>
    </li>
  );
}

export default Category;
