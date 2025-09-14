import React from "react";
import FormSignIn from "../components/signInPage/FormSignIn";
import { NavLink } from "react-router";

const SignInPage = () => {
  return (
    <div>
      <h1>Sign in and fuel your steak!</h1>
      <p>Sign in to Kalorie</p>
      <FormSignIn />

      <div className="border-b-1 my-8"></div>

      <p>
        Do not have a Kalorie account? Create yours{" "}
        <NavLink className="text-blue-500" to="/register">
          here
        </NavLink>
      </p>
    </div>
  );
};

export default SignInPage;
