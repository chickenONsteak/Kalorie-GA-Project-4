import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "../ui/navigation-menu";
import { NavLink } from "react-router";

const NavMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink>
            <NavLink to="main">Home</NavLink>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink>
            <NavLink to="calendar">Calendar</NavLink>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavMenu;
