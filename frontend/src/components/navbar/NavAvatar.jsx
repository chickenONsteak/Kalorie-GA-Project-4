import React, { useContext, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { jwtDecode } from "jwt-decode";
import UserContext from "../../contexts/user";
import avatar from "../../assets/hardcoded_avatar.jpg";

const NavAvatar = () => {
  const userContext = useContext(UserContext);

  const decoded = jwtDecode(userContext.accessToken);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            {/* AVATAR IS HARDCODED, CAN ALLOW USERS TO SET THEIR AVATAR INSTEAD (DIDN'T CREATE THIS FEATURE) */}
            <AvatarImage src={avatar} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{`${decoded.first_name} ${decoded.last_name}`}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => userContext.setAccessToken(null)}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavAvatar;
