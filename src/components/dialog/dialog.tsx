"use client";

import React from "react";
import Button from "../button/button";
import useFocusTrap from "@/lib/hooks/use-focus-trap";
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

export function Example1() {
  const [[target, isOpen], setIsOpen] = React.useState<[string, boolean]>([
    "",
    false,
  ]);

  const handleOpen = (id: string): void => {
    setIsOpen([id, true]);
  };
  const handleClose = (): void => setIsOpen(["", false]);

  return (
    <>
      <Button size="lg" onClick={() => handleOpen("modal1")}>
        Open Modal 1
      </Button>

      <Dialog
        dialogKey="modal1"
        id={target}
        isOpen={isOpen}
        onHide={handleClose}
        blur
        backdrop="static"
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title 1</DialogTitle>

            <Button variant={"ghost"} onClick={handleClose}>
              &times;
            </Button>
          </DialogHeader>

          <DialogBody>
            <Button size="lg" onClick={() => handleOpen("modal2")}>
              Open Modal 2
            </Button>
          </DialogBody>

          <DialogFooter>
            <Button variant={"destructive"} onClick={handleClose}>
              Cancel
            </Button>
            <Button variant={"primary"}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        dialogKey="modal2"
        id={target}
        isOpen={isOpen}
        onHide={handleClose}
        blur
        backdrop="static"
        animation="fade"
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title 1</DialogTitle>

            <Button variant={"ghost"} onClick={handleClose}>
              &times;
            </Button>
          </DialogHeader>

          <DialogBody>
            <Button size="lg" onClick={() => handleOpen("modal1")}>
              Go back to Modal 1
            </Button>
          </DialogBody>

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

export default function Dialog({
  children,
  dialogKey,
  id,
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

  useFocusTrap(dialogRef, isOpen as boolean && id === dialogKey, initialFocus);

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

    if (backdrop === "static" && !keyboard) {
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
          {isOpen && dialogKey === id && (
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
