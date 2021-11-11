import React from "react";
import { observer, inject } from "mobx-react";

import LoginForm from "./LoginForm";

class LoginPage extends React.Component {
    render() {
        const { login } = this.props.UserStore;
        return (
            <section className="text-gray-700 body-font">
                <div className="container px-5 py-24 mx-auto flex flex-wrap items-center justify-center">
                    <LoginForm {...{ login }} />
                </div>
            </section>
        );
    }
}

export default inject("UserStore")(observer(LoginPage));
