import React, { useState, useContext } from "react";

import { ProductsContext } from "../../context/Products/ProductsContext";

function Search() {
    const { searchByTitle } = useContext(ProductsContext);

    const [state, setState] = useState("");

    return (
        <form className="form-inline my-5 justify-content-center">
            <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={state}
                onChange={(e) => setState(e.target.value)}
            />
            <button
                className="btn btn-primary my-2 my-sm-0"
                onClick={(e) => {
                    e.preventDefault();
                    searchByTitle(state);
                    setState("");
                }}
            >
                Search
            </button>
        </form>
    );
}

export default Search;
