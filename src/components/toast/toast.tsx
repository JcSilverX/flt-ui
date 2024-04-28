import ToastContext from "@/context/toast-context-provider";
import React from "react";
import Button, { ButtonProps } from "../button/button";
import cn from "@/lib/utils/cn";
import { Cross2Icon } from "@radix-ui/react-icons";

const ToastProvider = ToastContext.Provider;

type TDirection = "up" | "down" | "left" | "right";

// type ToastProps = {
//   label?: string;
//   duration?: number;
//   swipeDirection?: TDirection;
//   swipeTreshold?: number;
//   toastCount: number;
//   onToastAdd: () => void;
//   onToastRemove: () => void;
//   isFocusedToastEscapeKeyDownRef: () => void;
//   isClosePausedRef: () => void;
// };
type ToastProps = React.HTMLAttributes<HTMLLIElement> & {
  reference?: React.RefObject<HTMLLIElement>;
  label?: string;
  duration?: number;
  swipeDirection?: TDirection;
  swipeTreshold?: number;
};

export default function Toast({
  label = "Notification",
  duration = 5000,
  swipeDirection = "right",
  swipeTreshold = 50,
  className,
  ...props
}: ToastProps) {
  const { children, reference: ref } = props;

  // state

  // derived state

  // event handlers / actions

  return (
    <ToastProvider value={{}}>
      <div role="region" aria-label="Notifications F(8)" tabIndex={-1}>
        <ToastViewPort>
          <li
            ref={ref}
            role="status"
            aria-live="off"
            aria-atomic="true"
            tabIndex={0}
            className={cn(
              "relative flex items-center justify-between space-x-2 py-2 px-3 pointer-events-auto w-full border shadow-lg rounded-md transition-all",
              className,
              {}
            )}
            {...props}
          />
        </ToastViewPort>
      </div>
    </ToastProvider>
  );
}

type ToastViewPortProps = React.HTMLAttributes<HTMLOListElement> & {};

export function ToastViewPort({ className, ...props }: ToastViewPortProps) {
  return (
    <ol
      tabIndex={-1}
      className={cn(
        "fixed z-[1090] w-full pointer-events-none p-4 sm:max-w-[26.25rem] | bottom-0 right-0",
        className,
        {}
      )}
      {...props}
    />
  );
}

type ToastHeaderProps = React.HTMLAttributes<HTMLDivElement> & {};

export function ToastHeader({ className, ...props }: ToastHeaderProps) {
  return <div className={cn("", className, {})} {...props} />;
}

type ToastTitleProps = React.HTMLAttributes<HTMLDivElement> & {};

export function ToastTitle({ className, ...props }: ToastTitleProps) {
  return (
    <div
      className={cn("text-sm font-semibold [&+div]:text-sm", className, {})}
      {...props}
    />
  );
}

type ToastDescriptionProps = React.HTMLAttributes<HTMLDivElement> & {};

export function ToastDescription({
  className,
  ...props
}: ToastDescriptionProps) {
  return <div className={cn("text-sm opacity-90", className, {})} {...props} />;
}

type ToastActionProps = ButtonProps & {};

export function ToastAction({ className, ...props }: ToastActionProps) {
  const { reference: ref } = props;

  return (
    <Button
      reference={ref}
      variant={"outline"}
      size={"sm"}
      className={cn("flex-shrink-0", className, {})}
      {...props}
    />
  );
}

type ToastCloseProps = ButtonProps & {};

export function ToastClose({ className, ...props }: ToastCloseProps) {
  const { reference: ref } = props;

  return (
    <button
      ref={ref}
      className={cn(
        "absolute right-[.4rem] top-[.65rem] text-gray-900/50 hover:text-gray-900 transition-all",
        className,
        {}
      )}
      {...props}
    >
      <Cross2Icon height={16} width={16} />
    </button>
  );
}
