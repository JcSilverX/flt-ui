import React from "react";
import { ButtonProps } from "../button/button";
import cn from "@/lib/utils/cn";
import useControllableState from "@/lib/hooks/use-controllable-state";
import SwitchContext from "@/context/switch-context-provider";
import useSwitchContext from "@/lib/hooks/use-switch-context";

const SwitchProvider = SwitchContext.Provider;

type SwitchProps = ButtonProps & {
  checked?: boolean | undefined;
  defaultChecked?: boolean | undefined;
  required?: boolean | undefined;
  onCheckedChange?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Switch({
  name,
  checked,
  defaultChecked,
  required,
  disabled,
  value = "on",
  onCheckedChange,
  className,
  ...props
}: SwitchProps) {
  // state
  const [isChecked, setIsChecked] = useControllableState({
    prop: checked,
    defaultProp: defaultChecked as boolean,
    onChange: onCheckedChange as React.Dispatch<React.SetStateAction<boolean>>,
  });

  // derived state

  // event handlers / actions
  const handleToggle = (evt: React.MouseEvent<HTMLButtonElement>): void =>
    setIsChecked((prev) => !prev);

  return (
    <SwitchProvider value={{ isChecked, disabled }}>
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-required={required}
        data-jsx-state={getState(isChecked)}
        data-jsx-disabled={disabled ? "" : undefined}
        disabled={disabled}
        value={value}
        onClick={handleToggle}
        className={cn(
          "inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-500 disabled:cursor-not-allowed disabled:opacity-50 data-[jsx-state=checked]:bg-black data-[jsx-state=unchecked]:bg-transparent",
          className,
          {}
        )}
        {...props}
      >
        <SwitchThumb />
      </button>
    </SwitchProvider>
  );
}

type SwitchThumbProps = React.HTMLAttributes<HTMLSpanElement> & {
  reference?: React.RefObject<HTMLSpanElement> | undefined;
};

export function SwitchThumb({ className, ...props }: SwitchThumbProps) {
  const { isChecked, disabled } = useSwitchContext();

  return (
    <span
      data-jsx-state={getState(isChecked)}
      data-jsx-disabled={disabled ? "" : undefined}
      className={cn(
        "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform data-[jsx-state=checked]:translate-x-4 data-[jsx-state=unchecked]:translate-x-0",
        className,
        {}
      )}
      {...props}
    />
  );
}

function getState(checked?: boolean): string {
  return checked ? "checked" : "unchecked";
}
