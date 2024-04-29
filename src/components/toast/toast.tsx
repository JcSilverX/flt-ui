import ToastContext from "@/context/toast-context-provider";
import React, { AriaAttributes, DOMAttributes } from "react";
import Button, { ButtonProps } from "../button/button";
import cn from "@/lib/utils/cn";
import { Cross2Icon } from "@radix-ui/react-icons";
import useControllableState from "@/lib/hooks/use-controllable-state";
import useToastContext from "@/lib/hooks/use-toast-context";

const ToastProvider = ToastContext.Provider;

export type TDirection = "up" | "down" | "left" | "right";
export type TPosition =
  | "top"
  | "top-left"
  | "top-right"
  | "bottom"
  | "bottom-left"
  | "bottom-right";

type ToastProps = React.HTMLAttributes<HTMLLIElement> & {
  reference?: React.RefObject<HTMLLIElement>;
  label?: string;
  duration?: number;
  swipeDirection?: TDirection;
  swipeTreshold?: number;
  toastCount?: number;
  onToastAdd?: () => void;
  onToastRemove?: () => void;
  isFocusedToastEscapeKeyDownRef?: () => void;
  isClosePausedRef?: () => void;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: React.Dispatch<React.SetStateAction<boolean>>;
  position?: TPosition;
  hotkey?: string[];
  viewportClassName?: string | undefined;
};

// React.HTMLAttributes<T>.className?: string | undefined

export default function Toast({
  label = "Notification",
  duration = 5000,
  swipeDirection = "right",
  swipeTreshold = 50,
  defaultOpen,
  open,
  onOpenChange,
  position = "bottom-right",
  className,
  ...props
}: ToastProps) {
  const { reference: ref, viewportClassName } = props;

  // state
  const [isOpen = true, setIsOpen] = useControllableState({
    prop: open,
    onChange: onOpenChange as React.Dispatch<React.SetStateAction<boolean>>,
    defaultProp: defaultOpen as boolean,
  });
  const toastViewportRef = React.useRef<HTMLOListElement>(null);
  const side: TSide = getSide(position) === "bottom" ? "bottom" : "top";

  // derived state

  // event handlers / actions

  return (
    <ToastProvider
      value={{
        isOpen,
        setIsOpen,
        position,
        side,
        toastViewportRef,
      }}
    >
      <div role="region" aria-label="Notifications F(8)" tabIndex={-1}>
        <ToastViewport className={viewportClassName}>
          {isOpen && (
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
          )}
        </ToastViewport>
      </div>
    </ToastProvider>
  );
}

export type TSide = "top" | "bottom";

export const getSide = (placement: TPosition): TSide => {
  return placement.split("-")[0] as TSide;
};

type ToastViewportProps = React.HTMLAttributes<HTMLOListElement> & {
  reference?: React.RefObject<HTMLOListElement>;
};

export function ToastViewport({ className, ...props }: ToastViewportProps) {
  const { reference: ref } = props;
  const { toastViewportRef, position } = useToastContext();

  return (
    <ol
      ref={ref ?? toastViewportRef}
      tabIndex={-1}
      className={cn(
        "fixed z-[1090] w-full pointer-events-none p-4 sm:max-w-[26.25rem] duration-100 transition-transform ease-out",
        className,
        {
          "top-0 right-1/2 translate-x-1/2": position === "top",
          "top-0 right-0": position === "top-right",
          "top-0 left-0": position === "top-left",
          "bottom-0 right-1/2 translate-x-1/2": position === "bottom",
          "bottom-0 right-0": position === "bottom-right",
          "bottom-0 left-0": position === "bottom-left",
        }
      )}
      {...props}
    />
  );
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

  // state

  // derived state

  // event handlers / actions

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
  const { setIsOpen } = useToastContext();

  // state

  // derived state

  // event handlers / actions
  const handleClose = (): void => setIsOpen(false);

  return (
    <button
      ref={ref}
      onClick={handleClose}
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
