"use client";

import React from "react";
import Button, { ButtonProps } from "../button/button";
import cn from "@/lib/utils/cn";
import { CaretSortIcon } from "@radix-ui/react-icons";
import CollapsibleContext from "@/context/collapsible-context-provider";
import useCollapsibleContext from "@/lib/hooks/use-collapsible-context";

export function CollapsibleExample() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-[21.875rem] space-y-2"
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">
          @peduarte starred 3 repositories
        </h4>

        <CollapsibleTrigger size={"sm"}>
          <CaretSortIcon height={16} width={16} />
          <span className="sr-only">Toggle</span>
        </CollapsibleTrigger>
      </div>

      <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
        @radix-ui/primitives
      </div>

      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
          @radix-ui/colors
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
          @radix-ui/react
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

type CollapsibleProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement>;
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Collapsible({
  open,
  onOpenChange,
  className,
  ...props
}: CollapsibleProps) {
  const { reference: ref } = props;

  // state
  const id: string = React.useId();

  // derived state

  // event handlers / actions
  const handleToggle = (evt: React.MouseEvent<HTMLButtonElement>): void =>
    onOpenChange((prev) => !prev);

  return (
    <CollapsibleContext.Provider value={{ id, open, handleToggle }}>
      <div ref={ref} className={cn("", className, {})} {...props} />
    </CollapsibleContext.Provider>
  );
}

type CollapsibleTriggerProps = ButtonProps;

export function CollapsibleTrigger({
  variant = "ghost",
  className,
  ...props
}: CollapsibleTriggerProps) {
  const { reference: ref } = props;
  const { id, open, handleToggle } = useCollapsibleContext();

  return (
    <Button
      reference={ref}
      onClick={handleToggle}
      type="button"
      aria-controls={`jsx-${id}`}
      aria-expanded={open}
      variant={variant}
      className={cn("", className, {})}
      {...props}
    />
  );
}

type CollapsibleContentProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement>;
};

export function CollapsibleContent({
  className,
  ...props
}: CollapsibleContentProps) {
  const { reference: ref } = props;
  const { id, open } = useCollapsibleContext();

  return (
    <div
      ref={ref}
      id={`jsx-${id}`}
      className={cn("", className, {})}
      {...props}
      hidden={!open}
    />
  );
}
