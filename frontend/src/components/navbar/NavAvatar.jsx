import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavAvatar = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src="https://avatars.githubusercontent.com/u/174097077?v=4" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Austin</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Edit goals</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavAvatar;
