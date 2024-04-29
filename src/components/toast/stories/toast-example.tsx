import Button from "@/components/button/button";
import { PersonIcon, Cross2Icon } from "@radix-ui/react-icons";
import React from "react";
import Toast, {
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
} from "../toast";

export default function ToastExample() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <div>
      {" "}
      <Toast position="top-left">
        <div>
          <ToastTitle>FLT</ToastTitle>
          <ToastDescription>
            Hello, world! This is a toast message.
          </ToastDescription>
        </div>
        <ToastClose />
      </Toast>
      <Toast position="top">
        <ToastDescription>
          Hello, world! This is a toast message.
        </ToastDescription>
        <ToastAction>Undo</ToastAction>
      </Toast>
      <Toast position="top-right">
        <div>
          <ToastTitle>FLT</ToastTitle>
          <ToastDescription>
            Hello, world! This is a toast message.
          </ToastDescription>
        </div>
        <ToastClose />
      </Toast>
      <Toast position="bottom-left">
        <div>
          <ToastTitle>FLT</ToastTitle>
          <ToastDescription>
            Hello, world! This is a toast message.
          </ToastDescription>
        </div>
        <ToastClose />
      </Toast>
      <Toast position="bottom">
        <ToastDescription>
          Hello, world! This is a toast message.
        </ToastDescription>
        <ToastClose />
      </Toast>
      <Toast position="bottom-right">
        <div>
          <ToastTitle>FLT</ToastTitle>
          <ToastDescription>
            Hello, world! This is a toast message.
          </ToastDescription>
        </div>
        <ToastClose />
      </Toast>
      {/* CUSTOM */}
      <Button variant={"outline"} size={"sm"} onClick={() => setIsOpen(true)}>
        Open custom toast
      </Button>
      <Toast
        open={isOpen}
        onOpenChange={setIsOpen}
        viewportClassName="top-1/2"
        className="p-0"
      >
        <div className="w-full">
          <div className="flex items-center py-2 px-3 border-b">
            <PersonIcon className="me-2" />
            <strong className="text-sm font-semibold [&+div]:text-sm me-auto">
              FLT
            </strong>
            <small className="text-xs text-gray-700 me-4">Just now</small>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-900/50 hover:text-gray-900 transition-all"
            >
              <Cross2Icon height={16} width={16} />
            </button>
          </div>
          <div className="text-sm opacity-90 p-3">
            Hello, world! This is a toast message.
          </div>
        </div>
      </Toast>
      <Toast viewportClassName="top-1/2" position="bottom-left">
        <ToastTitle>FLT</ToastTitle>
        <ToastDescription>
          Hello, world! This is a toast message.
        </ToastDescription>
        <ToastAction>Undo</ToastAction>
      </Toast>
      <Toast viewportClassName="top-1/4" position="bottom-left" className="">
        <ToastTitle>FLT</ToastTitle>
        <ToastDescription>
          Hello, world! This is a toast message.
        </ToastDescription>
        <ToastAction>Undo</ToastAction>
      </Toast>
    </div>
  );
}
