import React from "react";
import FormSignIn from "../components/signInPage/FormSignIn";
import { NavLink } from "react-router";

const SignInPage = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-6 lg:px-8 py-6">
      <h1 className="mb-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Sign in and{" "}
        <span className="underline underline-offset-3 decoration-8 decoration-[#22c55e] dark:decoration-[#16a34a]">
          fuel your streak
        </span>
        !
      </h1>
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
