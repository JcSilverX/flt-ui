"use client";

import React from "react";
import Button from "../button/button";
import useFocusTrap from "@/lib/hooks/use-focustrap";
import { createPortal } from "react-dom";
import useIsMounted from "@/lib/hooks/use-is-mounted";
import DialogContext from "@/context/dialog-context-provider";
import { AnimatePresence } from "framer-motion";
import DialogInner from "./dialog-inner";
import DialogContent from "./dialog-content";
import DialogOverlay from "./dialog-overlay";
import DialogHeader from "./dialog-header";
import DialogBody from "./dialog-body";
import DialogFooter from "./dialog-footer";
import DialogTitle from "./dialog-title";
import defaultVariants from "./def-dialog-animations";
import DialogProps from "./dialog-props";

export default function Example1() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const handleOpen = (): void => setIsOpen(true);
  const handleClose = (): void => setIsOpen(false);

  return (
    <>
      <Button size="lg" onClick={handleOpen}>
        Open Modal 1
      </Button>

      <Dialog
        isOpen={isOpen}
        onHide={handleClose}
        blur
        backdrop="static"
        animation="zoom"
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title 1</DialogTitle>

            <Button variant={"ghost"} onClick={handleClose}>
              &times;
            </Button>
          </DialogHeader>

          <DialogBody>body</DialogBody>

          <DialogFooter>
            <Button variant={"destructive"} onClick={handleClose}>
              Cancel
            </Button>
            <Button variant={"primary"}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function Dialog({
  children,
  isOpen,
  onHide,
  backdrop,
  blur,
  backdropClassName,
  dialogClassName,
  keyboard,
  scrollable,
  animation = "fade",
  initialFocus,
  size,
  fullscreen,
  centered,
  ...props
}: DialogProps) {
  // state
  const isMounted = useIsMounted();
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const [animateStaticDialog, setAnimateStaticDialog] =
    React.useState<boolean>(false);

  useFocusTrap(dialogRef, isOpen, initialFocus);

  const variants =
    animation === false
      ? {}
      : defaultVariants[animation as "zoom" | "fade"] || animation;
  const backdropVariants = animation === false ? {} : defaultVariants.backdrop;

  // event handlers / actions
  const handleStaticAnimation = (): void => {
    setAnimateStaticDialog(true);
    setTimeout(() => setAnimateStaticDialog(false), 100);
  };

  const onEscapeDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key !== "Escape") return;

    if (backdrop === "static") {
      handleStaticAnimation();
      return;
    }

    if (keyboard === false) return;

    onHide();
  };

  const onClickOutside = (): void => {
    if (backdrop === "static") {
      handleStaticAnimation();
      return;
    }

    onHide();
  };

  const onStopPropagation = (event: React.MouseEvent<HTMLDivElement>) =>
    event.stopPropagation();

  return (
    isMounted &&
    createPortal(
      <DialogContext.Provider
        value={{
          backdrop,
          blur,
          backdropClassName,
          dialogClassName,
          scrollable,
          animation: variants,
          backdropAnimation: backdropVariants,
          size,
          fullscreen,
          centered,
          animateStaticDialog,
          onClickOutside,
          onStopPropagation,
        }}
      >
        <AnimatePresence>
          {isOpen && (
            <DialogOverlay>
              <div
                ref={dialogRef}
                {...props}
                role={"dialog"}
                aria-modal={true}
                onKeyDown={onEscapeDown}
                className="fixed top-0 left-0 z-[1055] w-full h-full overflow-x-hidden overflow-y-auto outline-0"
                tabIndex={-1}
              >
                <DialogInner>{children}</DialogInner>
              </div>
            </DialogOverlay>
          )}
        </AnimatePresence>
      </DialogContext.Provider>,
      document.body
    )
  );
}
