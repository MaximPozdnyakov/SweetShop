export default (state, action) => {
    switch (action.type) {
        case "GET_ITEMS":
            return {
                ...state,
                cartItems: action.payload,
            };

        case "DELETE_ITEM_BY_ID":
            const id = action.payload;
            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item._id !== id),
            };

        case "UPDATE_QUANTITY_OF_ITEM":
            return {
                ...state,
                cartItems: state.cartItems.map((item) => {
                    if (item._id === action.payload.id) {
                        item.quantity = action.payload.quantity;
                    }
                    return item;
                }),
            };

        case "ADD_ITEM":
            const { ownerId, productId, quantity } = action.payload;
            return {
                ...state,
                cartItems: [
                    ...state.cartItems,
                    {
                        _id: action.payload._id,
                        ownerId,
                        productId,
                        quantity,
                    },
                ],
            };
        case "DELETE_ITEM_BY_OWNER":
            return {
                ...state,
                cartItems: [],
            };
        case "CART_LOADED":
            return {
                ...state,
                isCartLoaded: true,
            };
        case "CART_NOT_LOADED":
            return {
                ...state,
                isCartLoaded: false,
            };
        default:
            return state;
    }
};
