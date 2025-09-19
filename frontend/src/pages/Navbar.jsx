import React, { useContext } from "react";
import kalorieLogo from "../assets/kalorie_logo.svg";
import NavMenu from "../components/navbar/NavMenu";
import NavAvatar from "../components/navbar/NavAvatar";
import { ModeToggle } from "../components/ui/modeToggle";
import UserContext from "../contexts/user";
import { Button } from "../components/ui/button";
import { Link } from "react-router";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { SheetClose, SheetFooter } from "../components/ui/sheet";

const Navbar = () => {
  const userContext = useContext(UserContext);

  return (
    <div className="w-full h-16 flex items-center justify-between px-4 md:px-10 bg-background/10 backdrop-blur-md shadow-sm border-b border-gray-200 ">
      <img
        className="h-14 md:h-20 mb-2 w-auto"
        src={kalorieLogo}
        alt="Kalorie logo"
      />

      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center space-x-4">
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

      {/* MOBILE MENU */}
      <div className="flex md:hidden items-center space-x-2">
        <ModeToggle />

        <Sheet>
          {/* HAMBURGER ICON */}
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-64 flex flex-col">
            <SheetHeader>
              <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
              <SheetDescription className="hidden"></SheetDescription>
            </SheetHeader>

            <div className="flex flex-row items-center justify-center">
              <NavMenu />

              {userContext.accessToken ? (
                <div className="flex justify-start items-center space-x-2">
                  <NavAvatar />
                </div>
              ) : (
                <SheetFooter>
                  <SheetClose asChild>
                    <Button
                      className="bg-gradient-to-r from-sky-400 to-emerald-600 hover:from-sky-500 hover:to-emerald-700 shadow-md font-medium text-base"
                      asChild
                    >
                      <Link to="/sign-in">Sign in</Link>
                    </Button>
                  </SheetClose>
                </SheetFooter>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Navbar;
