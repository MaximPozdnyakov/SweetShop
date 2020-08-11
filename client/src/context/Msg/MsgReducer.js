export default (state, action) => {
    switch (action.type) {
        case "SET_MSG":
            return {
                msg: action.payload,
            };
        default:
            return state;
    }
};
