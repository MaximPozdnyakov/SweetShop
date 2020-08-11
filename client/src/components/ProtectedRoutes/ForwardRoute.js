import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UsersContext } from "../../context/Users/UsersContext";

const ForwardRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useContext(UsersContext);
    return (
        <Route
            {...rest}
            render={(props) => {
                if (isAuthenticated) {
                    return <Redirect to="/store" />;
                } else {
                    return <Component {...props} />;
                }
            }}
        />
    );
};

export default ForwardRoute;
