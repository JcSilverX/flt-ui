"use client";

import React from "react";

import Button from "@/components/button/button";
import Toast, {
  ToastAction,
  ToastDescription,
  ToastTitle,
} from "@/components/toast/toast";

export default function Home() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <main className="h-dvh grid gap-4 place-items-center">
      {/* <Button onClick={() => setIsOpen((prev) => !prev)} variant={"outline"}>
        Open toast
      </Button>

      <Toast open={isOpen} onOpenChange={setIsOpen} viewportClassName="">
        <ToastTitle>FLT</ToastTitle>
        <ToastDescription>
          Hello, world! This is a toast message.
        </ToastDescription>
        <ToastAction onClick={() => setIsOpen(false)}>Undo</ToastAction>
      </Toast> */}

      <Toast viewportClassName="top-1/2" position="bottom">
        <ToastTitle>FLT</ToastTitle>
        <ToastDescription>
          Hello, world! This is a toast message.
        </ToastDescription>
        <ToastAction>Undo</ToastAction>
      </Toast>
    </main>
  );
}
