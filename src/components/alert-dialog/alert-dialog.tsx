'use client';

import React from "react";
import Button, { ButtonProps } from "../button/button";
import Dialog from "../dialog/dialog";
import DialogHeader, { DialogHeaderProps } from "../dialog/dialog-header";
import DialogTitle, { DialogTitleProps } from "../dialog/dialog-title";
import DialogContent, { DialogContentProps } from "../dialog/dialog-content";
import DialogBody, { DialogBodyProps } from "../dialog/dialog-body";
import DialogFooter, { DialogFooterProps } from "../dialog/dialog-footer";
import cn from "@/lib/utils/cn";
import DialogProps from "../dialog/dialog-props";

type AlertDialogProps = DialogProps;

export function AlertDialog({ isOpen, onHide, ...props }: AlertDialogProps) {
  return <Dialog isOpen={isOpen} onHide={onHide} centered backdrop='static' animation='zoom' {...props} />
}

type AlertDialogContentProps = DialogContentProps;

export function AlertDialogContent({ className, ...props }: AlertDialogContentProps) {
  return <DialogContent className={cn(className)} {...props} />
}

type AlertDialogHeaderProps = DialogHeaderProps;

export function AlertDialogHeader({ className, ...props }: AlertDialogHeaderProps) {
  return <DialogHeader className={cn(className)} {...props} />;
}


type AlertDialogTitleProps = DialogTitleProps;

export function AlertDialogTitle({ className, ...props }: AlertDialogTitleProps) {
  return <DialogTitle className={cn(className)} {...props} />
}

type AlertDialogDescriptionProps = DialogBodyProps;

export function AlertDialogDescription({ className, ...props }: AlertDialogDescriptionProps) {
  return <DialogBody className={cn(className)} {...props} />
}

type AlertDialogFooterProps = DialogFooterProps;

export function AlertDialogFooter({ className, ...props }: AlertDialogFooterProps) {
  return <DialogFooter className={cn("space-x-2", className)} {...props} />;
}

type AlertButtonProps = ButtonProps;

export function AlertDialogCancel({ variant = 'outline', className, ...props }: AlertButtonProps) {
  return <Button variant={variant} className={cn(className)} {...props} />;
}

export function AlertDialogAction({ variant, className, ...props }: AlertButtonProps) {
  return <Button variant={variant} className={cn(className)} {...props} />;
}

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
            <AlertDialogCancel onClick={handleClose}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction>Save</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
