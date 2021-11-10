import React from "react";
import { Route, Redirect } from "react-router-dom";

const HomeRoute = ({ ...rest }) => (
    <Route
        {...rest}
        render={() => {
            return <Redirect to="/home" />;
        }}
    />
);

export default HomeRoute;
