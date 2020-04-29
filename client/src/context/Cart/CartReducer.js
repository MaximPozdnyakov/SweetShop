export default (state, action) => {
  switch (action.type) {
    case 'GET_ALL_ITEMS':
      return {
        ...state,
        cartItems: action.payload,
        isCartLoaded: true,
      };

    case 'DELETE_ITEM_BY_id':
      const id = action.payload;
      console.log('id', id);
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item._id !== id),
      };

    case 'UPDATE_QUANTITY_OF_ITEM_BY_ID':
      const { quantity } = action.payload;

      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item._id === action.payload.id) {
            item.quantity = quantity;
          }
          return item;
        }),
      };

    case 'ADD_ITEM':
      const { title, price, srcToImg } = action.payload;
      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          {
            _id: action.payload.id,
            title,
            price,
            srcToImg,
            quantity: 1,
          },
        ],
      };
    default:
      return state;
  }
};
