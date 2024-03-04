"use client";

import React from "react";
import { VariantProps, cva } from "class-variance-authority";
import cn from "@/lib/utils/cn";
import Button from "../button/button";
import {
  AnimatePresence,
  AnimationProps,
  Transition,
  Variants,
  motion,
} from "framer-motion";
import AlertDescription from "./alert-description";
import AlertLink from "./alert-link";
import AlertTitle from "./alert-title";

const AlertAnimation = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

export function AlertExample1() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen((prev) => !prev)}>Open alert</Button>

      <Alert show={isOpen} animation={AlertAnimation}>
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

type Animation = Omit<AnimationProps, "variants" | "transition">;

type AlertProps = VariantProps<typeof AlertVariants> & {
  children: React.ReactNode;
  reference?: React.RefObject<HTMLDivElement>;
  show?: boolean;
  animation?: false | Animation;
  transition?: Transition;
  className?: string;
};

export default function Alert({
  children,
  show,
  variant,
  className,
  animation,
  transition,
  ...props
}: AlertProps) {
  const { reference: ref } = props;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={"alert"}
          ref={ref}
          role="alert"
          variants={animation === false ? {} : animation as Variants}
          initial={"initial"}
          animate={"animate"}
          exit={"exit"}
          transition={transition}
          className={cn(AlertVariants({ variant, className }))}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}





