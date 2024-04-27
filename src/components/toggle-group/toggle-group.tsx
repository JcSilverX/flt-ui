"use client";

import React from "react";
import Button, { ButtonProps } from "../button/button";
import cn from "@/lib/utils/cn";
import ToggleGroupContext from "@/context/toggle-group-context-provider";
import useToggleGroupContext from "@/lib/hooks/use-toggle-group-context";

const ToggleGroupProvider = ToggleGroupContext.Provider;

type ToggleGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement>;
  type?: "single" | "multiple";
};

export default function ToggleGroup({
  type = "single",
  className,
  ...props
}: ToggleGroupProps) {
  const { reference: ref } = props;

  // state
  const [isPressed, setIsPressed] = React.useState<boolean>(Boolean);

  // derived state

  // event handlers / actions
  const handleClick = (evt: React.MouseEvent<HTMLButtonElement>): void =>
    setIsPressed((prev) => !prev);

  return (
    <ToggleGroupProvider value={{ isPressed, handleClick }}>
      <div
        ref={ref}
        className={cn("flex items-center justify-center gap-1", className, {})}
        {...props}
      />
    </ToggleGroupProvider>
  );
}

type ToggleGroupItemProps = ButtonProps;

export function ToggleGroupItem({
  variant = "ghost",
  value,
  className,
  ...props
}: ToggleGroupItemProps) {
  const { reference: ref } = props;
  const { isPressed, handleClick } = useToggleGroupContext();

  return (
    <Button
      reference={ref}
      type="button"
      tabIndex={isPressed ? 0 : -1}
      onClick={handleClick}
      aria-pressed={isPressed}
      variant={variant}
      className={cn("", className, {})}
      {...props}
    />
  );
}
