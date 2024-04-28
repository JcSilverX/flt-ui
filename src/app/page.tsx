"use client";

import Button from "@/components/button/button";
import Toast, {
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastHeader,
  ToastTitle,
} from "@/components/toast/toast";
import { Cross2Icon, PersonIcon } from "@radix-ui/react-icons";
import { Title } from "@radix-ui/react-toast";
import React from "react";
// import * as Toast from "@radix-ui/react-toast";

export default function Home() {
  const [isPressed, setIsPressed] = React.useState<boolean>(false);

  return (
    <main className="h-dvh grid gap-4 place-items-center">
      {/* <Toast className="">
        <ToastTitle className="flex flex-nowrap whitespace-nowrap items-center">
          <PersonIcon className="me-2" />
          FLT
          <small className="!text-xs !font-normal !text-gray-700 ml-auto me-5">
            20 seconds ago
          </small>
        </ToastTitle>
        <ToastDescription>
          Hello, world! This is a toast message.
        </ToastDescription>
        <ToastAction className="ml-3 mb-2 last:m-0">Undo</ToastAction>
        <ToastAction className="ml-3 mb-2">Undo</ToastAction>
        <ToastClose />
      </Toast> */}
      {/* 
      <Toast>
        <div className="grid gap-1">
          <ToastTitle className="p-0 border-0">FLT</ToastTitle>
          <ToastDescription className="p-0">
            Hello, world! This is a toast message.
          </ToastDescription>
        </div>
        <ToastAction>Undo</ToastAction>
        <ToastClose className="opacity-1" />
      </Toast> */}

      <Toast>
        <div>
          <ToastTitle>FLT</ToastTitle>
          <ToastDescription>
            Hello, world! This is a toast message.
          </ToastDescription>
        </div>
        <ToastAction>Undo</ToastAction>
      </Toast>

      {/* <Toast className="relative w-[21.875rem] max-w-full pointer-events-auto bg-clip-padding border shadow-lg rounded">
        <ToastDescription className="p-3">
          Hello, world! This is a toast message.
        </ToastDescription>

        <ToastClose className="top-[.9rem]" />
      </Toast>

      <Toast className="relative w-[21.875rem] max-w-full pointer-events-auto bg-clip-padding border shadow-lg rounded">
        <ToastTitle className="py-2 px-3 border-">FLT</ToastTitle>
        <ToastDescription className="p-3 border-t">
          Hello, world! This is a toast message.
        </ToastDescription>

        <ToastClose />
      </Toast>

      <Toast className="relative w-[21.875rem] max-w-full pointer-events-auto bg-clip-padding border shadow-lg rounded">
        <div className="flex items-center py-2 px-3 border-b">
          <PersonIcon className="me-2" />
          <strong className="text-sm font-semibold [&+div]:text-sm mr-auto">
            FLT
          </strong>
          <small className="text-xs text-gray-700 me-5">Just now</small>
        </div>
        <div className="p-3">Hello, world! This is a toast message.</div>

        <ToastClose />
      </Toast> */}
    </main>
  );
}
