export default (state, action) => {
  switch (action.type) {
    case 'GET_ALL_PRODUCTS':
      return {
        ...state,
        allProducts: action.payload,
        displayedProducts: action.payload,
        loaded: true,
      };
    case 'FILTER_BY_CATEGORY':
      const category = action.payload;

      if (category === 'Our Products') {
        return {
          ...state,
          displayedProducts: state.allProducts,
          header: category,
        };
      }

      return {
        ...state,
        displayedProducts: state.allProducts.filter(
          (product) => product.category === category
        ),
        header: category,
      };
    case 'SORT_BY_PRICE_INC':
      return {
        ...state,
        displayedProducts: state.displayedProducts.sort(
          (product1, product2) => product1.price <= product2.price
        ),
      };
    case 'SORT_BY_PRICE_DEC':
      return {
        ...state,
        displayedProducts: state.displayedProducts.sort(
          (product1, product2) => product1.price >= product2.price
        ),
      };
    case 'FILTER_BY_PRICE':
      const [minPrice, maxPrice] = action.payload;

      return {
        ...state,
        displayedProducts: state.allProducts.filter(
          (product) => product.price <= maxPrice && product.price >= minPrice
        ),
      };
    case 'SEARCH':
      return {
        ...state,
        displayedProducts: state.allProducts.filter((product) =>
          product.title.includes(action.payload)
        ),
        header: 'Search Results',
      };
    case 'CLEAR':
      return {
        ...state,
        displayedProducts: state.allProducts,
      };
    default:
      return state;
  }
};
