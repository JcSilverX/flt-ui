"use client";

import cn from "@/lib/utils/cn";
import React from "react";
import Button from "../button/button";
import DropdownContext from "@/context/dropdown-context-provider";

export function DropdownExample() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const handleClick = (): void => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Dropdown>
      <Button onClick={handleClick}>Open Dropdown</Button>

      <DropdownMenu>
        <DropdownMenuItem>item 1</DropdownMenuItem>
        <DropdownMenuItem>item 2</DropdownMenuItem>
        <DropdownMenuItem>item 3</DropdownMenuItem>
      </DropdownMenu>
    </Dropdown>
  );
}

type DropdownProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement>;
};

export default function Dropdown({ className, ...props }: DropdownProps) {
  return (
    <DropdownContext.Provider value={{}}>
      <div className={cn(className)} {...props} />
    </DropdownContext.Provider>
  );
}

type DropdownMenuProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement>;
};

export function DropdownMenu({ className, ...props }: DropdownMenuProps) {
  return <div className={cn(className)} {...props} />;
}

type DropdownMenuItemProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement>;
};

export function DropdownMenuItem({
  className,
  ...props
}: DropdownMenuItemProps) {
  return <div className={cn(className)} {...props} />;
}
