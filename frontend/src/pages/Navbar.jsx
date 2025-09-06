import React from "react";
import kalorieLogo from "../assets/kalorie_logo.svg";
import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <div>
      <div>
        <img src={kalorieLogo} alt="Kalorie logo" />
      </div>
      <div>
        <ul>
          <li>
            <NavLink to="main">Home</NavLink>
          </li>
          <li>
            <NavLink to="calendar">Calendar</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
