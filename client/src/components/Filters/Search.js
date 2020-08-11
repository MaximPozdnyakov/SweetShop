import React, { useState, useContext } from 'react';

import { ProductsContext } from '../../context/Products/ProductsContext';

function Search() {
  const { searchByTitle } = useContext(ProductsContext);

  const [state, setState] = useState('');

  return (
    <form className="form-inline my-2 mx-4 justify-content-center d-none d-lg-flex align-items-center">
      <div className="input-group">
        <input
          type="search"
          className="form-control mr-sm-2l"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="button-addon2"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <div className="input-group-append">
          <button
            className="btn btn-secondary my-2 my-sm-0"
            onClick={(e) => {
              e.preventDefault();
              searchByTitle(state);
              setState('');
            }}
            type="button"
            id="button-addon2"
          >
            SEARCH
          </button>
        </div>
      </div>
    </form>
    // <form className="form-inline my-2 mx-2 justify-content-center">
    //   <input
    //     className="form-control mr-sm-2"
    //     type="search"
    //     placeholder="Search"
    //     aria-label="Search"
    //     value={state}
    //     onChange={(e) => setState(e.target.value)}
    //   />
    //   <button
    // className="btn btn-primary my-2 my-sm-0"
    // onClick={(e) => {
    //   e.preventDefault();
    //   searchByTitle(state);
    //   setState('');
    // }}
    //   >
    //     Search
    //   </button>
    // </form>
  );
}

export default Search;
