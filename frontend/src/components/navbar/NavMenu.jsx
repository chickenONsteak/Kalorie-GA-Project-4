import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { NavLink } from "react-router";

const NavMenu = () => {
  return (
    <NavigationMenu className="flex px-4">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink className="font-medium text-base" asChild>
            <NavLink to="main">Home</NavLink>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink className="font-medium text-base" asChild>
            <NavLink to="calendar">Calendar</NavLink>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavMenu;
