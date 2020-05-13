export default (state, action) => {
  switch (action.type) {
    case 'GET_USERS':
      return action.payload;
    case 'ADD_USER':
      return [...state, action.payload];
    default:
      return state;
  }
};
