import React from "react";
import FormRegistration from "../components/registrationPage/FormRegistration";

const Register = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-6 lg:px-8 py-6">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Start your tracking journey
      </h1>
      <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 my-6">
        We just need a few details to get you started...
      </p>

      <FormRegistration />
    </div>
  );
};

export default Register;
