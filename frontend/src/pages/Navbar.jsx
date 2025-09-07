import React from "react";
import kalorieLogo from "../assets/kalorie_logo.svg";
import NavMenu from "../components/navbar/NavMenu";
import NavAvatar from "../components/navbar/NavAvatar";

const Navbar = () => {
  return (
    <div className="h-16 w-full border-b-1 shadow-sm bg-white flex flex-row items-center">
      <img className="h-13 w-auto" src={kalorieLogo} alt="Kalorie logo" />

      <div className="flex w-full justify-end m-10">
        <NavMenu />

        <NavAvatar />
      </div>
    </div>
  );
};

export default Navbar;
