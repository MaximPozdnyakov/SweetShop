export default (state, action) => {
  switch (action.type) {
    case "AUTHORIZE":
      return {
        ...state,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
