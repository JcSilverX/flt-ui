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
  defaultValue?: string | string[];
};

export default function ToggleGroup({
  type = "single",
  defaultValue,
  className,
  ...props
}: ToggleGroupProps) {
  const { reference: ref } = props;

  // state
  const [pressedItems, setPressedItems] = React.useState<string[]>(() => {
    if (type === "multiple" && Array.isArray(defaultValue)) {
      return defaultValue;
    } else if (type === "single" && typeof defaultValue === "string") {
      return [defaultValue];
    }

    return [];
  });
  // derived state

  // event handlers / actions
  const handleClick = (value: string): void => {
    if (type === "single") {
      setPressedItems((prev) => {
        if (prev.includes(value)) {
          return [];
        } else {
          return [value];
        }
      });
    } else {
      setPressedItems((prev) => {
        if (prev.includes(value)) {
          return prev.filter((item) => item !== value);
        } else {
          return [...prev, value];
        }
      });
    }
  };

  return (
    <ToggleGroupProvider value={{ pressedItems, handleClick }}>
      <div
        ref={ref}
        role="group"
        tabIndex={0}
        className={cn(
          "flex items-center justify-center gap-1 outline-none",
          className,
          {}
        )}
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
  const { pressedItems, handleClick } = useToggleGroupContext();

  const handleClickWrapper = () =>
    typeof value === "string" && handleClick(value);
  const isPressed: boolean =
    typeof value === "string" && pressedItems.includes(value);

  return (
    <Button
      reference={ref}
      type="button"
      tabIndex={isPressed ? 0 : -1}
      onClick={handleClickWrapper}
      aria-pressed={isPressed}
      variant={variant}
      className={cn("", className, {
        "bg-gray-100": isPressed,
      })}
      {...props}
    />
  );
}
