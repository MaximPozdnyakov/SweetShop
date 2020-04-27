import React, { useContext } from "react";

import { ProductsContext } from "../../context/Products/ProductsContext";

function Category() {
    const { filterByCategory } = useContext(ProductsContext);

    const changeCategory = (e) => {
        e.preventDefault();
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
                <a
                    className="dropdown-item"
                    href="/"
                    value="Our Products"
                    onClick={changeCategory}
                >
                    All
                </a>
                <a
                    className="dropdown-item"
                    href="/"
                    value="Big Cake"
                    onClick={changeCategory}
                >
                    Big Cakes
                </a>
                <a
                    className="dropdown-item"
                    href="/"
                    value="Small Cake"
                    onClick={changeCategory}
                >
                    Small Cakes
                </a>
                <a
                    className="dropdown-item"
                    href="/"
                    value="Candy"
                    onClick={changeCategory}
                >
                    Candy
                </a>
            </div>
        </li>
    );
}

export default Category;
