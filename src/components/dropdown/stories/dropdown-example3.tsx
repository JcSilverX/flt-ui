import Dropdown, {
  DropdownTrigger,
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "../dropdown";

export default function DropdownExample3() {
  return (
    <Dropdown>
      <DropdownTrigger>Open Dropdown 3</DropdownTrigger>

      <DropdownMenu>
        <DropdownMenuLabel>My Profile</DropdownMenuLabel>
        <DropdownMenuItem>
          {/* this is a super duper long test message in a dropdown menu item 1. */}
          one two
        </DropdownMenuItem>
        <DropdownMenuItem>
          {/* this is a super duper long test message in a dropdown menu item 2. */}
          one two
        </DropdownMenuItem>
      </DropdownMenu>
    </Dropdown>
  );
}
