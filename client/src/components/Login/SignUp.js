import React, { useState } from "react";

import { Link } from "react-router-dom";
import FailMsg from "../Messages/FailMsg";
import axios from "axios";

function SignUp(props) {
  const [newUser, setNewUser] = useState({
    email: "",
    password1: "",
    password2: "",
  });

  const { email, password1, password2 } = newUser;

  const [isValid, setIsValid] = useState({
    email: false,
    password1: false,
    password2: false,
    notEmpty: true,
  });

  const [msgFail, setMsgFail] = useState("");

  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(String(email).toLowerCase());
  }

  function validatePassword(password) {
    const regex = /^[A-Za-z]\w{7,14}$/;
    return regex.test(password);
    // password between 7 to 16 characters which contain only characters,
    // numeric digits, underscore and first character must be a letter
  }

  return (
    <form className="col-xl-4 col-lg-6 col-sm-8 mx-auto my-4">
      <legend className="font-weight-bold">SignUp</legend>

      <FailMsg msg={msgFail} />

      <div className="form-group my-4 has-success has-danger">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          type="email"
          className={`form-control ${
            email === "" ? "" : !isValid.email ? "is-invalid" : "is-valid"
          }`}
          id="exampleInputEmail1"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setNewUser({
              email: e.target.value,
              password1,
              password2,
            });
            setIsValid({
              email: validateEmail(e.target.value),
              password1: isValid.password1,
              password2: isValid.password2,
              notEmpty: isValid.notEmpty,
            });
          }}
        />
        <div className="valid-feedback">Success!</div>
        <div className="invalid-feedback">
          Sorry, that email is invalid. Try another?
        </div>
      </div>

      <div className="form-group my-4  has-success has-danger">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
          className={`form-control ${
            password1 === ""
              ? ""
              : !isValid.password1
              ? "is-invalid"
              : "is-valid"
          }`}
          id="exampleInputPassword1"
          placeholder="Enter your password"
          value={password1}
          onChange={(e) => {
            setNewUser({
              email,
              password1: e.target.value,
              password2,
            });
            setIsValid({
              email: isValid.email,
              password1: validatePassword(e.target.value),
              password2: isValid.password2,
              notEmpty: isValid.notEmpty,
            });
          }}
        />
        <div className="valid-feedback">Success!</div>
        <div className="invalid-feedback">
          Password should be between 7 to 16 characters which contain only
          characters, numeric digits, underscore and first character must be a
          letter
        </div>
      </div>
      <div className="form-group my-4  has-success has-danger">
        <label htmlFor="exampleInputPassword2">Repeat Password</label>
        <input
          type="password"
          className={`form-control ${
            password2 === ""
              ? ""
              : !isValid.password2
              ? "is-invalid"
              : "is-valid"
          }`}
          id="exampleInputPassword2"
          placeholder="Repeat your password"
          value={password2}
          onChange={(e) => {
            setNewUser({
              email,
              password1,
              password2: e.target.value,
            });
            setIsValid({
              email: isValid.email,
              password1: isValid.password1,
              password2: password1 === e.target.value,
              notEmpty: isValid.notEmpty,
            });
          }}
        />
        <div className="valid-feedback">Success!</div>
        <div className="invalid-feedback">Passwords should match</div>
      </div>
      <button
        className="btn btn-primary btn-lg btn-block my-4"
        onClick={(e) => {
          e.preventDefault();
          setMsgFail("");
          if (!email || !password1 || !password2) {
            setMsgFail("Please, enter all fields");
          }
          if (!(isValid.email && isValid.password1 && isValid.password2)) {
            setIsValid({
              email: isValid.email,
              password1: isValid.password1,
              password2: isValid.password2,
              notEmpty: false,
            });
          } else {
            axios
              .post("/api/users", newUser)
              .then((res) => {
                if (res.data.msg) {
                  setMsgFail(res.data.msg);
                } else {
                  localStorage.setItem(
                    "successMsg",
                    "You have successfully registered!"
                  );
                  props.history.push("/login");
                }
              })
              .catch((err) => console.log(err));
          }
        }}
      >
        Sign Up
      </button>
      <Link to="/login" className="btn btn-link btn-lg btn-block">
        Login
      </Link>
    </form>
  );
}

export default SignUp;
