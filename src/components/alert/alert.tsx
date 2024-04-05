"use client";

import React from "react";
import { VariantProps, cva } from "class-variance-authority";
import cn from "@/lib/utils/cn";
import Button from "../button/button";
import AlertDescription from "./alert-description";
import AlertLink from "./alert-link";
import AlertTitle from "./alert-title";

export function AlertExample1() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen((prev) => !prev)}>Open alert</Button>

      <Alert show={isOpen}>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add <AlertLink>components</AlertLink> to your app using the
          cli.
        </AlertDescription>
      </Alert>
    </>
  );
}

const AlertVariants = cva(
  "relative w-full py-3 text-sm px-4 mb-4 rounded-lg border",
  {
    variants: {
      variant: {
        default: "bg-inherit text-inherit",
        destructive: "border-red-500/50 text-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type AlertProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof AlertVariants> & {
    reference?: React.RefObject<HTMLDivElement>;
    show?: boolean;
  };

export default function Alert({
  show,
  variant,
  className,
  ...props
}: AlertProps) {
  const { reference: ref } = props;

  return (
    <>
      {show && (
        <div
          key={"alert"}
          ref={ref}
          role="alert"
          className={cn(AlertVariants({ variant, className }))}
          {...props}
        />
      )}
    </>
  );
}
