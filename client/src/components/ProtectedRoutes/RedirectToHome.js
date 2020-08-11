import React from "react";
import { Route, Redirect } from "react-router-dom";

const RedirectToHome = ({ ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
            return <Redirect to="/home" />;
        }}
    />
);

export default RedirectToHome;
