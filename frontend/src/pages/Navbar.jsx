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
    <div className="h-16 w-full border-b-1 shadow-sm flex flex-row items-center bg-background/10 backdrop-blur-md">
      <img className="h-13 w-auto" src={kalorieLogo} alt="Kalorie logo" />

      <div className="flex w-full justify-end m-10">
        <ModeToggle />

        <NavMenu />

        {userContext.accessToken ? (
          <NavAvatar />
        ) : (
          <Button asChild>
            <Link to="/sign-in">Sign in</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
