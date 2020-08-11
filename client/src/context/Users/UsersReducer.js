export default (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        case "LOGOUT":
            return {
                ...state,
                isAuthenticated: false,
                user: {},
            };
        case "USER_LOADED": {
            return {
                ...state,
                isUserLoaded: true,
            };
        }
        case "USER_NOT_LOADED": {
            return {
                ...state,
                isUserLoaded: false,
            };
        }
        default:
            return state;
    }
};
