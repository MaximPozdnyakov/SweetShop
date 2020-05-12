import React from 'react';

import { Link } from 'react-router-dom';

function Login() {
  return (
    <form className="col-4 mx-auto my-4">
      <legend className="font-weight-bold">Login</legend>
      <div className="form-group my-4">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          placeholder="Enter your email"
        />
      </div>
      <div className="form-group my-4">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Enter your password"
        />
      </div>
      <button className="btn btn-primary btn-lg btn-block my-4">Login</button>
      <Link to="/signup" class="btn btn-link btn-lg btn-block">
        Sign Up
      </Link>
    </form>
  );
}
export default Login;
