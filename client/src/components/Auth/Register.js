import React, { useState, useContext } from "react";

import { Link, Redirect } from "react-router-dom";
import { UsersContext } from "../../context/Users/UsersContext";

import { If, Then, Else } from "react-if";

import AlertDanger from "../Messages/AlertDanger";

function Register() {
    const { register } = useContext(UsersContext);

    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);
    const onEmailChange = (e) => {
        setEmail(e.target.value);
        setIsValidEmail(validateEmail(e.target.value));
    };
    const validateEmail = (email) =>
        email === "" ||
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email.toLowerCase()
        );

    const [password, setPassword] = useState("");
    const [isValidPassword, setIsValidPassword] = useState(true);
    const onPasswordChange = (e) => {
        setPassword(e.target.value);
        setIsValidPassword(validatePassword(e.target.value));
    };

    function validatePassword(password) {
        const regex = /^[A-Za-z]\w{7,14}$/;
        return password === "" || regex.test(password);
        // password between 7 to 16 characters which contain only characters,
        // numeric digits, underscore and first character must be a letter
    }

    const [secondPassword, setSecondPassword] = useState("");
    const [isValidSecondPassword, setIsValidSecondPassword] = useState(true);
    const onSecondPasswordChange = (e) => {
        setSecondPassword(e.target.value);
        setIsValidSecondPassword(validateSecondPassword(e.target.value));
    };
    const validateSecondPassword = (secondPassword) =>
        secondPassword === "" || secondPassword === password;

    const handleRegister = async (e) => {
        e.preventDefault();
        if (
            email &&
            password &&
            isValidEmail &&
            isValidPassword &&
            isValidSecondPassword
        ) {
            const user = await register({
                email,
                password1: password,
                password2: secondPassword,
            });
            if (!user.msg) {
                return <Redirect to="/store" />;
            }
        } else {
            if (!email) {
                setIsValidEmail(false);
            }
            if (!password) {
                setIsValidPassword(false);
            }
            if (!secondPassword) {
                setIsValidSecondPassword(false);
            }
        }
    };

    const handleGoogleRegister = (e) => {
        e.preventDefault();
        window.location = "http://localhost:5000/api/google-auth";
    };
    return (
        <section className="text-gray-700 body-font">
            <div className="container px-5 py-24 mx-auto flex flex-wrap items-center justify-center">
                <form
                    noValidate
                    className="lg:w-2/6 md:w-1/2 bg-gray-200 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0"
                >
                    <h2 className="text-gray-900 text-lg font-semibold title-font mb-5">
                        Register
                    </h2>
                    <AlertDanger />
                    <div className="flex flex-col mt-3">
                        <label
                            htmlFor="emailLogin"
                            className="mb-2 text-gray-800 text-sm"
                        >
                            Email
                        </label>
                        <input
                            className={`${
                                !isValidEmail ? "border border-red-500" : ""
                            } bg-white rounded border border-gray-400 focus:outline-none focus:border-pink-500 text-base px-4 py-2`}
                            id="emailLogin"
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={onEmailChange}
                        />
                        <If condition={!isValidEmail}>
                            <If condition={!!email}>
                                <Then>
                                    <p className="text-xs text-red-500 mt-1">
                                        Email format is invalid
                                    </p>
                                </Then>
                                <Else>
                                    <p className="text-xs text-red-500 mt-1">
                                        This field is required
                                    </p>
                                </Else>
                            </If>
                        </If>
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="passwordLogin"
                            className="mt-4 mb-2 text-gray-800 text-sm"
                        >
                            Password
                        </label>
                        <input
                            className={`${
                                !isValidPassword ? "border border-red-500" : ""
                            } bg-white rounded border border-gray-400 focus:outline-none focus:border-pink-500 text-base px-4 py-2`}
                            id="passwordLogin"
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={onPasswordChange}
                        />
                        <If condition={!isValidPassword}>
                            <If condition={!!password}>
                                <Then>
                                    <ul className="list-disc ml-3">
                                        <li className="text-xs text-red-500 mt-1">
                                            Password should be between 7 to 16
                                            characters
                                        </li>
                                        <li className="text-xs text-red-500 mt-1">
                                            Which contain only characters,
                                            numeric digits, underscore
                                        </li>
                                        <li className="text-xs text-red-500 mt-1">
                                            First character must be a letter
                                        </li>
                                    </ul>
                                </Then>
                                <Else>
                                    <p className="text-xs text-red-500 mt-1">
                                        This field is required
                                    </p>
                                </Else>
                            </If>
                        </If>
                    </div>

                    <div className="flex flex-col">
                        <label
                            htmlFor="passwordLogin"
                            className="mt-4 mb-2 text-gray-800 text-sm"
                        >
                            Confirm password
                        </label>
                        <input
                            className={`${
                                !isValidPassword ? "border border-red-500" : ""
                            } bg-white rounded border border-gray-400 focus:outline-none focus:border-pink-500 text-base px-4 py-2`}
                            id="passwordLogin"
                            placeholder="Password"
                            type="password"
                            value={secondPassword}
                            onChange={onSecondPasswordChange}
                        />
                        <If condition={!isValidSecondPassword}>
                            <If condition={!!secondPassword}>
                                <Then>
                                    <p className="text-xs text-red-500 mt-1">
                                        Passwords don't match
                                    </p>
                                </Then>
                                <Else>
                                    <p className="text-xs text-red-500 mt-1">
                                        This field is required
                                    </p>
                                </Else>
                            </If>
                        </If>
                    </div>
                    <button
                        className="text-white mt-4 mb-2 bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg"
                        onClick={handleRegister}
                    >
                        Register
                    </button>
                    <div className="text-center w-full">or</div>
                    <button
                        className="text-white mt-2 mb-4 bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg relative"
                        onClick={handleGoogleRegister}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#fff"
                            viewBox="0 0 32 32"
                            width="28px"
                            height="28px"
                            className="absolute"
                            style={{ left: "10px" }}
                        >
                            <path d="M 16.0039 14.0625 L 16.0039 18.2656 L 21.9922 18.2656 C 21.2109 20.8125 19.082 22.6367 16.0039 22.6367 C 12.3398 22.6367 9.36719 19.6641 9.36719 16 C 9.36719 12.3359 12.3359 9.36328 16.0039 9.36328 C 17.6523 9.36328 19.1563 9.96875 20.3164 10.9648 L 23.4102 7.86719 C 21.457 6.08594 18.8555 5 16.0039 5 C 9.92578 5 5 9.92578 5 16 C 5 22.0742 9.92578 27 16.0039 27 C 25.2383 27 27.2773 18.3633 26.3711 14.0781 Z" />
                        </svg>
                        Register with Google
                    </button>
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
            </div>
        </section>
    );
}

export default Register;
