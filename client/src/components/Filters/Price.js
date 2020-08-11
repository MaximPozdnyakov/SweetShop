import React from "react";

import SortPrice from "./SortPrice";
import RangePrice from "./RangePrice";

function Price() {
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
                Price
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <RangePrice />
                <SortPrice />
            </div>
        </li>
    );
}

export default Price;
