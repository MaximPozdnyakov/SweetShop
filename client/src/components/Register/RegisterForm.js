import React from "react";
import { withFormik } from "formik";
import { Link, Redirect } from "react-router-dom";

import AlertDanger from "../Utils/AlertDanger";
import EmailField from "../Utils/EmailField";
import PasswordField from "../Utils/PasswordField";
import ConfirmationPasswordField from "./ConfirmationPasswordField";
import GoogleRegisterBtn from "./GoogleRegisterBtn";

class RegisterForm extends React.Component {
    render() {
        const { email, password, confirmationPassword } = this.props.values;
        const errors = this.props.errors;
        const { handleChange, handleSubmit } = this.props;
        return (
            <form
                onSubmit={handleSubmit}
                className="lg:w-2/6 md:w-1/2 bg-gray-200 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0"
            >
                <h2 className="text-gray-900 text-lg font-semibold title-font mb-5">
                    Register
                </h2>
                <AlertDanger />
                <EmailField {...{ email, handleChange, error: errors.email }} />
                <PasswordField
                    {...{ password, handleChange, error: errors.password }}
                />
                <ConfirmationPasswordField
                    {...{
                        confirmationPassword,
                        handleChange,
                        error: errors.confirmationPassword,
                    }}
                />
                <button
                    className="text-white mt-4 mb-2 bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg"
                    type="submit"
                >
                    Register
                </button>
                <div className="text-center w-full">or</div>
                <GoogleRegisterBtn />
                <p className="text-xs text-gray-800 mt-3">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-pink-500 underline hover:text-pink-600"
                    >
                        Login!
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
        confirmationPassword: "",
    }),

    validate: ({ email, password, confirmationPassword }) => {
        const errors = {};
        //eslint-disable-next-line
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!(email === "" || emailRegex.test(email.toLowerCase()))) {
            errors.email = "Email format is invalid";
        }
        //eslint-disable-next-line
        const passwordRegex = /^[A-Za-z]\w{7,14}$/;
        if (!(password === "" || passwordRegex.test(password))) {
            errors.password = [
                "Password should be between 7 to 16 characters",
                "Which contain only characters, numeric digits, underscore",
                "First character must be a letter",
            ];
        }
        if (!(confirmationPassword === "" || confirmationPassword === password))
            errors.confirmationPassword = "Passwords don't match";
        return errors;
    },

    handleSubmit: async (
        { email, password, confirmationPassword },
        { setFieldError, resetForm, props }
    ) => {
        const requiredMsg = "This field is required";
        if (!email) setFieldError("email", requiredMsg);
        if (!password) setFieldError("password", requiredMsg);
        if (!confirmationPassword)
            setFieldError("confirmationPassword", requiredMsg);
        if (!email || !password || !confirmationPassword) return;
        const { register } = props;
        const user = await register({
            email,
            password1: password,
            password2: confirmationPassword,
        });
        if (!user.msg) return <Redirect to="/store" />;
        resetForm({ values: { email, password, confirmationPassword } });
    },
    displayName: "FormikRegister",
})(RegisterForm);
