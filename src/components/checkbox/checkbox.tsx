"use client";

import CheckboxContext from "@/context/checkbox-context-provider";
import useCheckboxContext from "@/lib/hooks/use-checkbox-context";
import cn from "@/lib/utils/cn";
import { CheckIcon } from "@radix-ui/react-icons";
import React from "react";

export function CheckboxExample() {
  return (
    <>
      <div className="flex items-start space-x-2">
        <Checkbox id="terms1" />

        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms1"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
          <p className="text-sm text-gray-700">
            You agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
      <div className="flex items-start space-x-2">
        <Checkbox id="terms2" defaultChecked />

        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms2"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions 2
          </label>
          <p className="text-sm text-gray-700">
            You agree to our Terms of Service and Privacy Policy. 2
          </p>
        </div>
      </div>
    </>
  );
}

type CheckboxProps = React.HTMLAttributes<HTMLButtonElement> & {
  reference?: React.RefObject<HTMLButtonElement>;
  defaultChecked?: boolean;
  checked?: boolean;
};

export default function Checkbox({ className, ...props }: CheckboxProps) {
  const { reference: ref, defaultChecked = false } = props;

  // state
  const [isChecked, setIsChecked] = React.useState<boolean>(defaultChecked);

  // derived state

  // event handlers / actions
  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>): void =>
    setIsChecked((prev) => !prev);

  return (
    <CheckboxContext.Provider value={{ isChecked }}>
      <button
        ref={ref}
        role="checkbox"
        aria-checked={isChecked}
        onClick={handleToggle}
        className={cn(
          "peer h-4 w-4 shrink-0 rounded-sm border border-blue-500 shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black/50 disabled:cursor-not-allowed disabled:opacity-50",
          className,
          {}
        )}
        {...props}
      >
        <CheckboxIndicator>
          <CheckIcon width={16} height={16} />
        </CheckboxIndicator>
      </button>
    </CheckboxContext.Provider>
  );
}

type CheckboxIndicatorProps = React.HTMLAttributes<HTMLSpanElement> & {
  reference?: React.RefObject<HTMLSpanElement>;
};

export function CheckboxIndicator({
  className,
  ...props
}: CheckboxIndicatorProps) {
  const { reference: ref } = props;
  const { isChecked } = useCheckboxContext();

  return (
    <>
      {isChecked && (
        <span
          ref={ref}
          className={cn(
            "flex items-center justify-center text-current",
            className,
            {}
          )}
          {...props}
        />
      )}
    </>
  );
}
