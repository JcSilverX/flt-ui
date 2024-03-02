"use client";

import React from "react";
import Button from "../button/button";
import useFocusTrap from "@/lib/hooks/use-focustrap";
import { createPortal } from "react-dom";
import useIsMounted from "@/lib/hooks/use-is-mounted";
import DialogContext from "@/context/dialog-context-provider";
import { AnimatePresence, Variant } from "framer-motion";
import DialogInner from "./dialog-inner";
import DialogContent from "./dialog-content";
import DialogOverlay from "./dialog-overlay";
import DialogHeader from "./dialog-header";
import DialogBody from "./dialog-body";
import DialogFooter from "./dialog-footer";
import DialogTitle from "./dialog-title";

export default function Example1() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const handleOpen = (): void => setIsOpen(true);
  const handleClose = (): void => setIsOpen(false);

  return (
    <>
      <Button size="lg" onClick={handleOpen}>
        Open Modal 1
      </Button>

      <Dialog isOpen={isOpen} onHide={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title 1</DialogTitle>

            <Button variant={"ghost"} onClick={handleClose}>
              &times;
            </Button>
          </DialogHeader>

          <DialogBody>body</DialogBody>

          <DialogFooter>
            <Button variant={"destructive"}>Cancel</Button>
            <Button variant={"primary"}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

type DialogProps = {
  children: React.ReactNode;
  /**
   * When true The dialog will show itself.
   */
  isOpen: boolean;
  /**
   * A callback fired when the header's close button or the non-static backdrop is clicked. This function is necessary if either of these elements is specified.
   * @returns void
   */
  onHide: () => void;
  /**
   * Include a backdrop component. Use 'static' to create a backdrop that doesn't trigger an "onHide" event when clicked.
   */
  backdrop?: "static" | boolean;
  /**
   * Applies a blurring effect to the backdrop.
   */
  blur?: boolean;
  /**
   * Apply an optional additional class name to backdrop.
   */
  backdropClassName?: string;
  /**
   * Close the dialog when the escape key is pressed.
   */
  keyboard?: boolean;
  /**
   * Enables scrolling within the <ModalBody> instead of the entire modal when content overflows.
   */
  scrollable?: boolean;
  /**
   *
   */
  animation?: boolean | Variant;
  /**
   * Specifies the element that should receive focus when the dialog is opened.
   */
  initialFocus?: number;
  /**
   * Render a dialog in large, extra-large, or small sizes. If not specified, the dialog defaults to medium size.
   */
  size?: "default" | "sm" | "lg" | "xl";
  /**
   * Render a fullscreen dialog. If a breakpoint is specified, the dialog will be fullscreen below that breakpoint size.
   */
  fullscreen?: "default" | "sm" | "md" | "lg" | "xl";
  /**
   * Vertically center the dialog in the window.
   */
  centered?: boolean;
  /**
   * Identifies the element (or elements) that describes the object.
   * @see aria-labelledby
   */
  "aria-labelledby"?: string | undefined;
  /**
   * Defines a string value that describes or annotates the current element.
   * @see related aria-describedby.
   */
  "aria-describedby"?: string | undefined;
};

function Dialog({ children, isOpen, onHide, ...props }: DialogProps) {
  const isMounted = useIsMounted();
  const dialogRef = React.useRef<HTMLDivElement>(null);

  useFocusTrap(dialogRef, isOpen);

  // event handlers / actions
  const onEscapeDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Escape") return;

    onHide();
  };

  return (
    isMounted &&
    createPortal(
      <DialogContext.Provider value={{}}>
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
