export default (state, action) => {
    switch (action.type) {
        case "GET_ALL_PRODUCTS":
            return {
                ...state,
                products: action.payload,
                isProductsLoaded: true,
            };
        default:
            return state;
    }
};
