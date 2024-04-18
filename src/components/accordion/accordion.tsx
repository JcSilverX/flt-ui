"use client";

import React from "react";
import { ButtonProps } from "../button/button";
import cn from "@/lib/utils/cn";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import AccordionContext from "@/context/accordion-context-provider";
import useAccordionContext from "@/lib/hooks/use-accordion-context";
import AccordionItemContext from "@/context/accordion-item-context-provider";
import useAccordionItemContext from "@/lib/hooks/use-accordion-item-context";

export function ExampleAccordion() {
  return (
    <Accordion
      type="single"
      // defaultValue={"jsx-item-2"}
      className="max-w-[500px] mx-auto"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>trigger 1</AccordionTrigger>
        <AccordionContent>Item 1</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>trigger 2</AccordionTrigger>
        <AccordionContent>Item 2</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>trigger 3</AccordionTrigger>
        <AccordionContent>Item 3</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export type AccordionProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement>;
  /**
   * Determines whether one or multiple items can be opened at the same time.
   */
  type?: "single" | "multiple";
  /**
   * The value of the item to expand when initially rendered and type is "single". Use when you do not need to control the state of the items.
   */
  defaultValue?: string;
  /**
   * The orientation of the accordion.
   */
  orientation?: "vertical" | "horizontal";
};
export default function Accordion({
  type = "single",
  defaultValue = "",
  className,
  ...props
}: AccordionProps) {
  const { children, reference: ref } = props;
  // state
  const [activeIndex, setActiveIndex] = React.useState<string>(defaultValue);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  // derived state
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const buttonEl = event.currentTarget;
    const controlsId = buttonEl.getAttribute("aria-controls");

    if (!controlsId) return;

    const contentEl = document.getElementById(controlsId);

    setActiveIndex(controlsId);
  };

  // event handlers / actions

  // useEffect

  return (
    <AccordionContext.Provider value={{ activeIndex, handleClick }}>
      <div ref={ref} className={cn("w-full", className)} {...props} />
    </AccordionContext.Provider>
  );
}

export type AccordionItemProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement>;
  /**
   * The controlled value of the item to expand when type is "single". Must be used in conjunction with onValueChange
   */
  value?: string;
};
export function AccordionItem({
  value,
  className,
  ...props
}: AccordionItemProps) {
  const { children, reference: ref } = props;
  const { activeIndex } = useAccordionContext();
  const id: string = value!; // React.useId();
  const open: boolean = value === activeIndex;

  // state

  // derived state

  // event handlers / actions

  // useEffect

  return (
    <AccordionItemContext.Provider value={{ id }}>
      <div
        ref={ref}
        className={cn("border-b", className)}
        data-jsx-state={getState(open)}
        {...props}
      />
    </AccordionItemContext.Provider>
  );
}

export type AccordionHeaderProps = React.HTMLAttributes<HTMLHeadingElement> & {
  reference?: React.RefObject<HTMLHeadingElement>;
};

export function AccordionHeader({ className, ...props }: AccordionHeaderProps) {
  const { children, reference: ref } = props;

  return <h3 ref={ref} className={cn("flex", className, {})} {...props} />;
}

export type AccordionTriggerProps = ButtonProps;
export function AccordionTrigger({
  className,
  ...props
}: AccordionTriggerProps) {
  const { children, reference: ref } = props;
  const { handleClick } = useAccordionContext();
  const { id } = useAccordionItemContext();

  return (
    <AccordionHeader>
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        className={cn(
          "flex flex-1 items-center justify-between py-4 text-sm font-medium",
          className
        )}
        // aria-controls={`jsx-${id}`}
        aria-controls={id}
        aria-expanded={false}
        {...props}
      >
        {children}
        <ChevronDownIcon />
      </button>
    </AccordionHeader>
  );
}

export type AccordionContentProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement>;
};
export function AccordionContent({
  className,
  ...props
}: AccordionContentProps) {
  const { children, reference: ref } = props;
  const { id } = useAccordionItemContext();

  return (
    <div
      // id={`jsx-${id}`}
      id={id}
      className="overflow-hidden text-sm"
      // aria-labelledby={`jsx-${id}`}
      aria-labelledby={id}
      role="region"
    >
      <div ref={ref} className={cn("pb-4 pt-0", className)} {...props} />
    </div>
  );
}

// utils
function forEach<T>(
  children: React.ReactNode,
  func: (el: React.ReactElement<T>, index: number) => void
) {
  let index = 0;

  React.Children.forEach(children, (child) => {
    if (React.isValidElement<T>(child)) func(child, index++);
  });
}

function getState(open?: boolean): string {
  return open ? "open" : "closed";
}
