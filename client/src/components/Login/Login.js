import React, { useContext, useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { UsersContext } from "../../context/Users/UsersContext";
import FailMessages from "../Messages/FailMessages";

function Login(props) {
  const { authorizeAction } = useContext(UsersContext);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [isValid, setIsValid] = useState({
    email: false,
    notEmpty: true,
  });

  const [msgsFail, setMsgsFail] = useState([]);

  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function handleEmailChange(e) {
    setUser({
      ...user,
      email: e.target.value,
    });
    setIsValid({
      ...isValid,
      email: validateEmail(e.target.value),
    });
  }

  function handlePasswordChange(e) {
    setUser({
      ...user,
      password: e.target.value,
    });
  }

  function closeMsgs() {
    setMsgsFail([]);
    console.log(msgsFail);
    setIsValid({
      ...isValid,
      notEmpty: true,
    });
  }

  function authorize(e) {
    e.preventDefault();

    closeMsgs();

    if (!user.password || !user.email) {
      setIsValid({
        ...isValid,
        notEmpty: false,
      });
      setMsgsFail([...msgsFail, "Please, enter all fields"]);
    } else if (isValid.email) {
      axios
        .post("/api/users/login", user)
        .then((res) => {
          if (res.data.msg) {
            setMsgsFail([...msgsFail, res.data.msg]);
          } else {
            authorizeAction(res.data.user._id);
            props.history.push(res.data.link);
          }
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <form className="col-4 mx-auto my-4">
      <legend className="font-weight-bold">Login</legend>

      <FailMessages msgs={msgsFail} />

      <div className="form-group my-4">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          type="email"
          className={`form-control ${
            user.email === "" ? "" : !isValid.email ? "is-invalid" : "is-valid"
          }`}
          id="exampleInputEmail1"
          placeholder="Enter your email"
          value={user.email}
          onChange={(e) => handleEmailChange(e)}
        />
      </div>
      <div className="form-group my-4">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Enter your password"
          value={user.password}
          onChange={(e) => handlePasswordChange(e)}
        />
      </div>
      <button
        onClick={(e) => authorize(e)}
        className="btn btn-primary btn-lg btn-block my-4"
      >
        Login
      </button>
      <Link to="/signup" className="btn btn-link btn-lg btn-block">
        Sign Up
      </Link>
    </form>
  );
}
export default Login;
