import React from 'react';

function SignUp() {
  return (
    <form className="col-4 mx-auto my-5">
      <legend className="font-weight-bold">Login</legend>
      <div className="form-group my-5">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          placeholder="Enter your email"
        />
      </div>
      <div className="form-group my-5">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Enter your password"
        />
      </div>
      <button className="btn btn-primary btn-lg btn-block my-5">Login</button>
      <button type="button" class="btn btn-link btn-lg btn-block">
        Sign Up
      </button>
    </form>
  );
}

export default SignUp;
