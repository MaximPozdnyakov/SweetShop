import React from "react";
import { withFormik } from "formik";
import { Link, Redirect } from "react-router-dom";

import AlertDanger from "../Utils/AlertDanger";
import EmailField from "../Utils/EmailField";
import PasswordField from "../Utils/PasswordField";

class LoginForm extends React.Component {
    render() {
        const { email, password } = this.props.values;
        const errors = this.props.errors;
        const { handleChange, handleSubmit } = this.props;
        return (
            <form
                onSubmit={handleSubmit}
                className="lg:w-2/6 md:w-1/2 bg-gray-200 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0"
            >
                <h2 className="text-gray-900 text-lg font-semibold title-font mb-5">
                    Login
                </h2>
                <AlertDanger />
                <EmailField {...{ email, handleChange, error: errors.email }} />
                <PasswordField
                    {...{ password, handleChange, error: errors.password }}
                />
                <button
                    className="text-white mt-4 mb-2 bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg"
                    type="submit"
                >
                    Login
                </button>
                <div className="text-center w-full">or</div>
                <p className="text-xs text-gray-800 mt-3">
                    Don't have an account yet?{" "}
                    <Link
                        to="/register"
                        className="text-pink-500 underline hover:text-pink-600"
                    >
                        Register!
                    </Link>
                </p>
            </form>
        );
    }
}

export default withFormik({
    mapPropsToValues: () => ({
        email: "",
        password: "",
    }),

    validate: ({ email }) => {
        const errors = {};
        //eslint-disable-next-line
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!(email === "" || emailRegex.test(email.toLowerCase()))) {
            errors.email = "Email format is invalid";
        }
        return errors;
    },

    handleSubmit: async (
        { email, password },
        { setFieldError, resetForm, props }
    ) => {
        const requiredMsg = "This field is required";
        if (!email) setFieldError("email", requiredMsg);
        if (!password) setFieldError("password", requiredMsg);
        if (!email || !password) return;
        const { login } = props;
        const user = await login({ email, password });
        if (!user.msg) return <Redirect to="/store" />;
        resetForm({ values: { email, password } });
    },

    displayName: "FormikLogin",
})(LoginForm);
