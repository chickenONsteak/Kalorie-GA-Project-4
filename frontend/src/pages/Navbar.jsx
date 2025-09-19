import React, { useContext } from "react";
import kalorieLogo from "../assets/kalorie_logo.svg";
import NavMenu from "../components/navbar/NavMenu";
import NavAvatar from "../components/navbar/NavAvatar";
import { ModeToggle } from "../components/ui/modeToggle";
import UserContext from "../contexts/user";
import { Button } from "../components/ui/button";
import { Link } from "react-router";

const Navbar = () => {
  const userContext = useContext(UserContext);

  return (
    <div className="w-full h-16 flex items-center justify-between px-6 md:px-10 bg-background/10 backdrop-blur-md shadow-sm border-b border-gray-200 ">
      <img className="h-20 w-auto mb-3" src={kalorieLogo} alt="Kalorie logo" />

      <div className="flex items-center space-x-4">
        <ModeToggle className="z-100" />

        <NavMenu />

        {userContext.accessToken ? (
          <NavAvatar />
        ) : (
          <Button
            className="bg-gradient-to-r from-sky-400 to-emerald-600 hover:from-sky-500 hover:to-emerald-700 shadow-md font-medium text-base"
            asChild
          >
            <Link to="/sign-in">Sign in</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
