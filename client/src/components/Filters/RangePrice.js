import React, { useContext, useState, useEffect } from 'react';

import { ProductsContext } from '../../context/Products/ProductsContext';

function RangePrice() {
  const [state, setState] = useState({
    fromPrice: '',
    toPrice: '',
  });

  const { fromPrice, toPrice } = state;

  const { allProducts, filterByPrice } = useContext(ProductsContext);

  const minPrice = allProducts.reduce(
    (minItem, item) => {
      if (item.price <= minItem.price) {
        return item;
      }
      return minItem;
    },
    { price: 10000000 }
  ).price;

  const maxPrice = allProducts.reduce(
    (maxItem, item) => {
      if (item.price >= maxItem.price) {
        return item;
      }
      return maxItem;
    },
    { price: -1 }
  ).price;

  useEffect(() => {
    setState({
      fromPrice: minPrice,
      toPrice: maxPrice,
    });
  }, [minPrice, maxPrice]);

  return (
    <div className="form-row text-center mx-3">
      <div className="col form-group">
        <label htmlFor="inputFrom">From</label>
        <input
          id="inputFrom"
          type="text"
          className="form-control form-control-sm"
          placeholder="From"
          value={fromPrice}
          onChange={(e) =>
            setState({ fromPrice: e.target.value, toPrice: toPrice })
          }
          onBlur={() => {
            if (Number(fromPrice) < minPrice) {
              setState({
                fromPrice: minPrice,
                toPrice,
              });
            }
            filterByPrice(Number(fromPrice), toPrice);
          }}
        />
      </div>
      -
      <div className="col  form-group">
        <label htmlFor="inputTo">To</label>
        <input
          id="inputTo"
          type="text"
          className="form-control form-control-sm"
          placeholder="To"
          value={toPrice}
          onChange={(e) =>
            setState({ toPrice: e.target.value, fromPrice: fromPrice })
          }
          onBlur={() => {
            if (Number(toPrice) > maxPrice) {
              setState({
                fromPrice,
                toPrice: maxPrice,
              });
            }
            filterByPrice(fromPrice, Number(toPrice));
          }}
        />
      </div>
    </div>
  );
}

export default RangePrice;
