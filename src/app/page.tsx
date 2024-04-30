"use client";

import React from "react";

import Tabs, {
  TabsTrigger,
  TabsContent,
  TabsList,
} from "@/components/tabs/tabs";

export default function Home() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return <main className="h-dvh grid gap-4 place-items-center"></main>;
}
