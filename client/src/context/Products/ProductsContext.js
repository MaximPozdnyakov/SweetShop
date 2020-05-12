import React, { createContext, useEffect, useReducer } from 'react';
import ProductsReducer from './ProductsReducer';
import axios from 'axios';

export const ProductsContext = createContext();

export function ProductsProvider(props) {
  const [productsState, dispatch] = useReducer(ProductsReducer, {
    allProducts: [],
    displayedProducts: [],
    loaded: false,
    header: 'Our Products',
  });

  const { allProducts, displayedProducts, loaded, header } = productsState;

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getProducts() {
    axios
      .get('/api/products')
      .then((res) => {
        dispatch({
          type: 'GET_ALL_PRODUCTS',
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function filterByCategory(category) {
    dispatch({
      type: 'FILTER_BY_CATEGORY',
      payload: category,
    });
  }

  function sortByPriceInc() {
    dispatch({
      type: 'SORT_BY_PRICE_INC',
    });
  }

  function sortByPriceDec() {
    dispatch({
      type: 'SORT_BY_PRICE_DEC',
    });
  }

  function filterByPrice(minPrice, maxPrice) {
    dispatch({
      type: 'FILTER_BY_PRICE',
      payload: [minPrice, maxPrice],
    });
  }

  function searchByTitle(searchReq) {
    dispatch({
      type: 'SEARCH',
      payload: searchReq,
    });
  }

  function sortByDate() {
    dispatch({
      type: 'SORT_DY_DATE',
    });
  }

  function clear() {
    dispatch({
      type: 'CLEAR',
    });
  }

  return (
    <ProductsContext.Provider
      value={{
        allProducts,
        displayedProducts,
        header,
        isProductsLoaded: loaded,
        filterByCategory,
        sortByPriceInc,
        sortByPriceDec,
        filterByPrice,
        searchByTitle,
        sortByDate,
        clear,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
}
