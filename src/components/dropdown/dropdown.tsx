"use client";

import cn from "@/lib/utils/cn";
import React from "react";
import Button, { ButtonProps } from "../button/button";
import DropdownContext from "@/context/dropdown-context-provider";
import { createPortal } from "react-dom";
import useIsMounted from "@/lib/hooks/use-is-mounted";
import useDropdownContext from "@/lib/hooks/use-dopdown-context";
import usePositioningEngine from "@/lib/hooks/use-positioning-engine";

type DropdownProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement>;
  direction?: "up-start" | "down-start" | "up-end" | "down-end";
  // | "end"
  // | "start"
  // | "up-centered"
  // | "down-centered"
  // | "start-centered"
  // | "end-centered";
};

export default function Dropdown({
  direction = "down-start",
  className,
  ...props
}: DropdownProps) {
  // state
  const isMounted = useIsMounted();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const dropdownTriggerRef = React.useRef<HTMLButtonElement>(null);
  const dropdownMenuRef = React.useRef<HTMLDivElement>(null);
  const position = usePositioningEngine(
    isOpen,
    dropdownTriggerRef,
    dropdownMenuRef,
    direction
  );

  // derived state

  // event handlers / actions
  const handleClick = (): void => setIsOpen((prev) => !prev);

  // useEffect

  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  return (
    <DropdownContext.Provider
      value={{
        isMounted,
        isOpen,
        dropdownTriggerRef,
        dropdownMenuRef,
        position,
        handleClick,
      }}
    >
      <div className={cn("relative", className)} {...props} />
    </DropdownContext.Provider>
  );
}

type DropdownTriggerProps = ButtonProps;

export function DropdownTrigger({
  variant = "outline",
  ...props
}: DropdownTriggerProps) {
  const { isOpen, dropdownTriggerRef: ref, handleClick } = useDropdownContext();

  return (
    <Button
      reference={ref}
      onClick={handleClick}
      variant={variant}
      aria-haspopup={"menu"}
      aria-expanded={isOpen}
      {...props}
    />
  );
}

type DropdownMenuProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement>;
};

export function DropdownMenu({ className, ...props }: DropdownMenuProps) {
  const {
    isMounted,
    dropdownMenuRef: ref,
    position,
    isOpen,
  } = useDropdownContext();

  return (
    isMounted &&
    createPortal(
      isOpen && (
        <div
          ref={ref}
          className={cn(
            "fixed flex top-0 left-0 flex-col max-w-fit min-w-32 py-2 bg-gray-50 z-[1000] border shadow rounded-xl",
            className
          )}
          style={{ top: position.top, left: position.left }}
          {...props}
        />
      ),
      document.body
    )
  );
}

type DropdownMenuLabelProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement>;
};

export function DropdownMenuLabel({
  className,
  ...props
}: DropdownMenuLabelProps) {
  return (
    <div
      className={cn("px-3 py-1.5 text-sm font-semibold", className)}
      {...props}
    />
  );
}

type DropdownMenuItemProps = React.HTMLAttributes<HTMLDivElement> & {
  reference?: React.RefObject<HTMLDivElement>;
};

export function DropdownMenuItem({
  className,
  ...props
}: DropdownMenuItemProps) {
  return <div className={cn("px-3 py-1.5 text-sm", className)} {...props} />;
}

// export function usePositioningEngine(
//   isOpen: boolean,
//   referenceRef: React.RefObject<HTMLElement>,
//   positionedElementRef: React.RefObject<HTMLElement>
// ) {
//   const [position, setPosition] = React.useState({ top: 0, left: 0 });

//   React.useEffect(() => {
//     const updatePosition = (): void => {
//       if (isOpen && referenceRef.current && positionedElementRef.current) {
//         const dropdownTriggerRect =
//           referenceRef.current.getBoundingClientRect();
//         const dropdownMenuRect =
//           positionedElementRef.current.getBoundingClientRect();

//         const newPosition = {
//           top: dropdownTriggerRect.bottom,
//           left: dropdownTriggerRect.left,
//         };

//         const dropdownMenuHeight = dropdownMenuRect.height;

//         if (newPosition.top + dropdownMenuHeight > window.innerHeight) {
//           if (dropdownMenuHeight > dropdownTriggerRect.top) {
//             newPosition.top = window.scrollY;
//           } else {
//             newPosition.top = dropdownTriggerRect.top - dropdownMenuHeight;
//           }
//         }

//         if (newPosition.left + dropdownMenuRect.width > window.innerWidth) {
//           newPosition.left = window.innerWidth - dropdownMenuRect.width;
//         }

//         setPosition(newPosition);
//       }
//     };

//     updatePosition();
//     window.addEventListener("resize", updatePosition);

//     return () => {
//       window.removeEventListener("resize", updatePosition);
//     };
//   }, [positionedElementRef, referenceRef, isOpen]);

//   return position;
// }

// export function usePositioningEngine(
//   isOpen: boolean,
//   referenceRef: React.RefObject<HTMLElement>,
//   positionedElementRef: React.RefObject<HTMLElement>
// ) {
//   const [position, setPosition] = React.useState({ top: 0, left: 0 });

//   React.useEffect(() => {
//     const updatePosition = (): void => {
//       if (isOpen && referenceRef.current && positionedElementRef.current) {
//         const referenceRect = referenceRef.current.getBoundingClientRect();
//         const positionedElementRect =
//           positionedElementRef.current.getBoundingClientRect();

//         // logic for 'up'
//         // let newPosition = {
//         //   top: referenceRect.top - positionedElementRect.height,
//         //   left: referenceRect.left,
//         // };

//         // logic for 'down'
//         // let newPosition = {
//         //   top: referenceRect.bottom,
//         //   left: referenceRect.left,
//         // };

//         // logic for 'end'
//         // let newPosition = {
//         //   top: referenceRect.top,
//         //   left: referenceRect.right,
//         // };

//         // logic for 'start'
//         // let newPosition = {
//         //   top: referenceRect.top,
//         //   left: referenceRect.left - positionedElementRect.width,
//         // };

//         // logic for 'up-centered'
//         // let newPosition = {
//         //   top: referenceRect.top - positionedElementRect.height,
//         //   left:
//         //     referenceRect.left +
//         //     (referenceRect.width - positionedElementRect.width) / 2,
//         // };

//         // logic for 'down-centered'
//         // let newPosition = {
//         //   top: referenceRect.bottom,
//         //   left:
//         //     referenceRect.left +
//         //     (referenceRect.width - positionedElementRect.width) / 2,
//         // };

//         // logic for 'start-centered'
//         // let newPosition = {
//         //   top:
//         //     referenceRect.top +
//         //     (referenceRect.height - positionedElementRect.height) / 2,
//         //   left: referenceRect.left - positionedElementRect.width,
//         // };

//         // logic for 'end-centered'
//         // let newPosition = {
//         //   top:
//         //     referenceRect.top +
//         //     (referenceRect.height - positionedElementRect.height) / 2,
//         //   left: referenceRect.right,
//         // };

//         // logic for 'down-end'
//         // let newPosition = {
//         //   top: referenceRect.bottom,
//         //   left: referenceRect.right - positionedElementRect.width,
//         // };

//         setPosition(newPosition);
//       }
//     };

//     updatePosition();
//     window.addEventListener("resize", updatePosition);

//     return () => {
//       window.removeEventListener("resize", updatePosition);
//     };
//   }, [positionedElementRef, referenceRef, isOpen]);

//   return position;
// }
