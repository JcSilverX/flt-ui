import React from "react";
import Dropdown, {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownTrigger,
} from "../dropdown";

export default function DropdownExample1() {
  return (
    <Dropdown>
      <DropdownTrigger>Open Dropdown 1</DropdownTrigger>

      <DropdownMenu>
        <DropdownMenuLabel>My Profile</DropdownMenuLabel>
        <DropdownMenuItem>
          {/* this is a super duper long test message in a dropdown menu item 1. */}
        </DropdownMenuItem>
        <DropdownMenuItem>
          {/* this is a super duper long test message in a dropdown menu item 2. */}
        </DropdownMenuItem>
      </DropdownMenu>
    </Dropdown>
  );
}
