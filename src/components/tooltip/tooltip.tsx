"use client";

import React from "react";
import Button, { ButtonProps } from "../button/button";
import cn from "@/lib/utils/cn";
import TooltipContext from "@/context/tooltip-context-provider";
import usePositioningEngine from "@/lib/hooks/use-positioning-engine";
import useTooltipContext from "@/lib/hooks/use-tooltip-context";
import { createPortal } from "react-dom";
import useIsMounted from "@/lib/hooks/use-is-mounted";
import { TPlacement } from "../dropdown/dropdown";

const TooltipProvider = TooltipContext.Provider;

type TooltipProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement>;
  placement?: TPlacement;
  delayDuration?: number;
};

export default function Tooltip({
  placement = "top",
  delayDuration = 700,
  className,
  ...props
}: TooltipProps) {
  // state
  const isMounted = useIsMounted();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  let timeoutId: NodeJS.Timeout;
  const tooltipTriggerRef = React.useRef<HTMLButtonElement>(null);
  const tooltipContentRef = React.useRef<HTMLDivElement>(null);
  const { x, y } = usePositioningEngine(
    isOpen,
    setIsOpen,
    tooltipTriggerRef,
    tooltipContentRef,
    placement
  );
  const id: string = React.useId();

  // derived state

  // event handlers / actions
  const handleShow = (): void => setIsOpen(true);
  const handleHide = (): void => {
    setIsOpen(false);
    clearTimeout(timeoutId);
  };

  const handleFocus = (evt: React.FocusEvent<HTMLButtonElement>): void => {
    handleShow();
  };

  const handleBlur = (evt: React.FocusEvent<HTMLButtonElement>): void => {
    handleHide();
  };

  const handleMouseEnter = (evt: React.MouseEvent<HTMLButtonElement>): void => {
    timeoutId = setTimeout(() => handleShow(), delayDuration);
  };

  const handleMouseLeave = (evt: React.MouseEvent<HTMLButtonElement>): void => {
    handleHide();
  };

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLButtonElement>): void => {
    if (evt.key !== "Escape") return;

    handleHide();
  };

  // useEffect

  return (
    <TooltipProvider
      value={{
        isMounted,
        x,
        y,
        id,
        isOpen,
        tooltipTriggerRef,
        tooltipContentRef,
        handleMouseEnter,
        handleMouseLeave,
        handleFocus,
        handleBlur,
        handleKeyDown,
      }}
    >
      {props.children}
    </TooltipProvider>
  );
}

type TooltipTriggerProps = ButtonProps;

export function TooltipTrigger({
  variant = "outline",
  className,
  ...props
}: TooltipTriggerProps) {
  const { reference: ref } = props;
  const {
    tooltipTriggerRef,
    handleMouseEnter,
    handleMouseLeave,
    handleFocus,
    handleBlur,
    handleKeyDown,
  } = useTooltipContext();

  return (
    <Button
      reference={ref ?? tooltipTriggerRef}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onPointerEnter={handleMouseEnter}
      onPointerLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      variant={variant}
      className={cn("", className, {})}
      {...props}
    />
  );
}

type TooltipContentProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement>;
};

export function TooltipContent({ className, ...props }: TooltipContentProps) {
  const { reference: ref } = props;
  const { isMounted, id, isOpen, x, y, tooltipContentRef } =
    useTooltipContext();

  return (
    isMounted &&
    createPortal(
      isOpen && (
        <div
          ref={ref ?? tooltipContentRef}
          aria-labelledby={`jsx-${id}`}
          className={cn(
            "fixed top-0 left-0 z-50 overflow-hidden rounded-md bg-blue-500 px-3 py-1.5 text-xs text-gray-50",
            className,
            {}
          )}
          style={{
            transform: `translate(${x}px, ${y}px)`,
          }}
          {...props}
        />
      ),
      document.body
    )
  );
}
