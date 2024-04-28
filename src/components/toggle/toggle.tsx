"use client";

import React from "react";
import Button, { ButtonProps } from "../button/button";
import cn from "@/lib/utils/cn";
import useControllableState from "@/lib/hooks/use-controllable-state";

type ToggleProps = ButtonProps & {
  /**
   * The pressed state of the toggle when it is initially rendered. Use when you do not need to control its pressed state.
   */
  defaultPressed?: boolean;
  /**
   * The controlled pressed state of the toggle. Must be used in conjunction with onPressedChange.
   */
  pressed?: boolean;
  /**
   * Event handler called when the pressed state of the toggle changes.
   * @returns false
   */
  onPressedChange?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Toggle({
  defaultPressed = false,
  pressed,
  onPressedChange,
  variant = "ghost",
  size,
  className,
  ...props
}: ToggleProps) {
  const { reference: ref } = props;

  // state
  const [isPressed = false, setIsPressed] = useControllableState({
    prop: pressed,
    onChange: onPressedChange as React.Dispatch<React.SetStateAction<boolean>>,
    defaultProp: defaultPressed,
  });

  // derived state

  // event handlers / actions
  const handleToggle = (evt: React.MouseEvent<HTMLButtonElement>): void => {
    if (!props.disabled) {
      setIsPressed(!isPressed);
    }
  };

  return (
    <Button
      reference={ref}
      onClick={handleToggle}
      aria-pressed={isPressed}
      variant={variant}
      size={size}
      className={cn(className, {
        "bg-gray-100": isPressed,
      })}
      {...props}
    />
  );
}
