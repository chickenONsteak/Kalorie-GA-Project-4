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
import { useQueryClient } from "@tanstack/react-query";

const NavAvatar = () => {
  const userContext = useContext(UserContext);
  const queryClient = useQueryClient();

  const decoded = jwtDecode(userContext.accessToken);

  const handleLogOut = () => {
    userContext.setAccessToken(null);
    // for queryClient.clear(), it clears all cached TanStack query data — meaning useGetAllIntakes hook in CalorieCard and MacroCard components will return undefined
    // isSuccessAllIntakes will then be false and {let macroGoal = 0} will be the fallback, resulting in displaying 0 when user logs out
    queryClient.clear();
  };

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
          {/* NO TIME TO DO CONFIGURE PROFILE PAGE */}
          {/* <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogOut}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavAvatar;
