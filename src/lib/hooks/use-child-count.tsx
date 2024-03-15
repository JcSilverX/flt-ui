import React from "react";

export function useChildCount(ref: React.RefObject<HTMLElement>) {
  const [numberOfCols, setNumberOfCols] = React.useState<number>(0);

  React.useEffect(() => {
    const parentElement = ref.current!;

    // guard against `ref.current` being null.
    if (!parentElement || parentElement.childElementCount === 0) return;

    setNumberOfCols(parentElement.childElementCount);
  }, [ref]);

  return numberOfCols;
}
