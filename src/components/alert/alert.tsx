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
          variants={animation as Variants}
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

type AlertTitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
  reference?: React.RefObject<HTMLHeadingElement>;
};

function AlertTitle({ children, className, ...props }: AlertTitleProps) {
  const { reference: ref } = props;

  return (
    <h5
      ref={ref}
      {...props}
      className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    >
      {children}
    </h5>
  );
}

type AlertDescriptionProps = React.HTMLAttributes<HTMLParagraphElement> & {
  reference?: React.RefObject<HTMLParagraphElement>;
};

function AlertDescription({
  children,
  className,
  ...props
}: AlertDescriptionProps) {
  const { reference: ref } = props;

  return (
    <p ref={ref} className="text-sm leading-relaxed" {...props}>
      {children}
    </p>
  );
}

type AlertLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  reference?: React.RefObject<HTMLAnchorElement>;
};

function AlertLink({ children, href, className, ...props }: AlertLinkProps) {
  const { reference: ref } = props;

  return (
    <a ref={ref} href={href}>
      {children}
    </a>
  );
}
