"use client";

import cn from "@/lib/utils/cn";
import React from "react";
import Button, { ButtonProps } from "../button/button";
import DropdownContext from "@/context/dropdown-context-provider";
import { createPortal } from "react-dom";
import useIsMounted from "@/lib/hooks/use-is-mounted";
import useDropdownContext from "@/lib/hooks/use-dopdown-context";
import usePositioningEngine from "@/lib/hooks/use-positioning-engine";

export type TPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "right"
  | "right-start"
  | "right-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end";

type DropdownProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement>;
  placement?: TPlacement;
};

export default function Dropdown({
  placement = "bottom-start",
  className,
  ...props
}: DropdownProps) {
  // state
  const isMounted = useIsMounted();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const dropdownTriggerRef = React.useRef<HTMLButtonElement>(null);
  const dropdownMenuRef = React.useRef<HTMLDivElement>(null);
  const { x, y } = usePositioningEngine(
    isOpen,
    setIsOpen,
    dropdownTriggerRef,
    dropdownMenuRef,
    placement
  );

  // derived state

  // event handlers / actions
  const handleClick = (): void => setIsOpen((prev) => !prev);

  return (
    <DropdownContext.Provider
      value={{
        isMounted,
        isOpen,
        dropdownTriggerRef,
        dropdownMenuRef,
        x,
        y,
        handleClick,
      }}
    >
      <div className={cn("relative", className)} {...props} />
    </DropdownContext.Provider>
  );
}

type DropdownTriggerProps = ButtonProps;

export function DropdownTrigger({
  variant = "outline",
  ...props
}: DropdownTriggerProps) {
  const { isOpen, dropdownTriggerRef: ref, handleClick } = useDropdownContext();

  return (
    <Button
      reference={ref}
      onClick={handleClick}
      variant={variant}
      aria-haspopup={"menu"}
      aria-expanded={isOpen}
      {...props}
    />
  );
}

type DropdownMenuProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement>;
};

export function DropdownMenu({ className, ...props }: DropdownMenuProps) {
  const {
    isMounted,
    dropdownMenuRef: ref,
    x,
    y,
    isOpen,
  } = useDropdownContext();

  return (
    isMounted &&
    createPortal(
      isOpen && (
        <div
          ref={ref}
          className={cn(
            "fixed flex top-0 left-0 flex-col max-w-fit min-w-32 py-2 bg-gray-50 z-[1000] border shadow rounded-xl",
            className
          )}
          style={{
            transform: `translate(${x}px, ${y}px)`,
          }}
          {...props}
        />
      ),
      document.body
    )
  );
}

type DropdownMenuLabelProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement>;
};

export function DropdownMenuLabel({
  className,
  ...props
}: DropdownMenuLabelProps) {
  return (
    <div
      className={cn("px-3 py-1.5 text-sm font-semibold", className)}
      {...props}
    />
  );
}

type DropdownMenuItemProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement>;
};

export function DropdownMenuItem({
  className,
  ...props
}: DropdownMenuItemProps) {
  return <div className={cn("px-3 py-1.5 text-sm", className)} {...props} />;
}
