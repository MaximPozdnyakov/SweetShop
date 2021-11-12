import React from "react";
import { Route, Redirect } from "react-router-dom";
import { observer, inject } from "mobx-react";

import UserStore from "../../stores/UserStore";
interface IProps {
    UserStore?: UserStore;
    component: React.ElementType;
    [x: string]: any;
}

class AuthRoute extends React.Component<IProps> {
    render() {
        const { isAuthenticated } = this.props.UserStore!;
        const { component: Component, ...rest } = this.props;
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
    }
}

export default inject("UserStore")(observer(AuthRoute));
