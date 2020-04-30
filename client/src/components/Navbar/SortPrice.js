import React, { useContext, useState, useEffect } from 'react';

import { ProductsContext } from '../../context/Products/ProductsContext';

function SortPrice() {
  const [state, setState] = useState({
    isDec: false,
    isInc: false,
  });

  useEffect(() => {
    if (state.isInc && state.isDec) {
      setState({ isInc: true, isDec: false });
    }
  }, [state.isInc]);

  useEffect(() => {
    if (state.isInc && state.isDec) {
      setState({ isInc: false, isDec: true });
    }
  }, [state.isDec]);

  const { sortByDate, sortByPriceInc, sortByPriceDec } = useContext(
    ProductsContext
  );

  return (
    <>
      <div className="form-check m-2">
        <input
          className="form-check-input"
          type="checkbox"
          checked={state.isInc}
          id="defaultCheck1"
          onChange={() => {
            setState({ isDec: state.isDec, isInc: !state.isInc });
            !state.isInc ? sortByPriceInc() : sortByDate();
          }}
        />
        <label className="form-check-label" htmlFor="defaultCheck1">
          Sort Increasing
        </label>
      </div>

      <div className="form-check m-2">
        <input
          className="form-check-input"
          type="checkbox"
          checked={state.isDec}
          id="defaultCheck1"
          onChange={(e) => {
            setState({ isDec: !state.isDec, isInc: state.isInc });
            !state.isDec ? sortByPriceDec() : sortByDate();
          }}
        />
        <label className="form-check-label" htmlFor="defaultCheck1">
          Sort Decreasing
        </label>
      </div>
    </>
  );
}

export default SortPrice;
