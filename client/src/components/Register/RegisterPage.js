import React from "react";
import { observer, inject } from "mobx-react";

import RegisterForm from "./RegisterForm";

@inject("UserStore")
@observer
class RegisterPage extends React.Component {
    render() {
        const { register } = this.props.UserStore;
        return (
            <section className="text-gray-700 body-font">
                <div className="container px-5 py-24 mx-auto flex flex-wrap items-center justify-center">
                    <RegisterForm {...{ register }} />
                </div>
            </section>
        );
    }
}

export default RegisterPage;
