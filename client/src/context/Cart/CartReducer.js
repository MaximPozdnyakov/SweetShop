export default (state, action) => {
    switch (action.type) {
        case "GET_ALL_ITEMS":
            return action.payload;

        case "DELETE_ITEM_BY_id":
            const id = action.payload;
            return state.filter((item) => item._id !== id);

        case "UPDATE_QUANTITY_OF_ITEM_BY_ID":
            const { quantity } = action.payload;

            return state.map((item) => {
                if (item._id === action.payload.id) {
                    item.quantity = quantity;
                }
                return item;
            });
        case "ADD_ITEM":
            const { title, price, srcToImg } = action.payload;
            return [
                ...state,
                {
                    title,
                    price,
                    srcToImg,
                    quantity: 1,
                },
            ];
    }
};
