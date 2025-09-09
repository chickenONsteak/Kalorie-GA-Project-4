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
        <a
          className="text-blue-500"
          href="/register"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
        {/* 
        target="_blank" — opens in a new tab
        noopener and noreferrer — prevents tabnabbing attack (security reasons) 
        */}
      </p>
    </div>
  );
};

export default SignInPage;
