'use client';

import React from "react";
import Button from "../button/button";
import Dialog from "../dialog/dialog";
import DialogHeader from "../dialog/dialog-header";
import DialogTitle from "../dialog/dialog-title";
import DialogContent from "../dialog/dialog-content";
import DialogBody from "../dialog/dialog-body";
import DialogFooter from "../dialog/dialog-footer";

export const AlertDialog = Dialog;
export const AlertDialogContent = DialogContent;
export const AlertDialogHeader = DialogHeader;
export const AlertDialogTitle = DialogTitle;
export const AlertDialogDescription = DialogBody;
export const AlertDialogFooter = DialogFooter;

export const AlertDialogCancel = Button;
export const AlertDialogAction = Button;

export default function AlertDialogExample() {
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
      <Button size="lg" onClick={() => handleOpen("modal3")}>
        Open Alert Dialog
      </Button>

      <AlertDialog
        dialogKey="modal3"
        id={target}
        isOpen={isOpen}
        onHide={handleClose}
        blur
        backdrop="static"
        animation='zoom'
        centered
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Dialog Title 3</AlertDialogTitle>

            <Button variant={"ghost"} onClick={handleClose}>
              &times;
            </Button>
          </AlertDialogHeader>

          <AlertDialogDescription>
            description
          </AlertDialogDescription>

          <AlertDialogFooter>
            <AlertDialogCancel variant={"destructive"} onClick={handleClose}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction variant={"primary"}>Save</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </>
  );
}
