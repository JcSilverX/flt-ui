import React from "react";

export default function useOnClickOutside(
  refs: React.RefObject<HTMLElement>[],
  eventHandler: () => void
) {
  React.useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        event.target instanceof HTMLElement &&
        refs.every((ref) => !ref.current?.contains(event.target as Node))
      ) {
        eventHandler();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [refs, eventHandler]);
}
