import Dropdown, {
  DropdownTrigger,
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "../dropdown";

export default function DropdownExample8() {
  return (
    <Dropdown>
      <DropdownTrigger>Open Dropdown 8</DropdownTrigger>

      <DropdownMenu>
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuItem>one</DropdownMenuItem>
        <DropdownMenuItem>two</DropdownMenuItem>
      </DropdownMenu>
    </Dropdown>
  );
}
