import React from "react";

type TSize = {
  width: number | undefined;
  height: number | undefined;
};

const initSize: TSize = {
  width: undefined,
  height: undefined,
};

export function useMeasure<T extends HTMLElement>(ref: React.RefObject<T>) {
  const [{ width, height }, setDimensions] = React.useState<TSize>(initSize);

  React.useEffect(() => {
    const rfx = ref.current;

    if (!rfx) return;

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;

      setDimensions({ width, height });
    });

    observer.observe(rfx);

    return () => observer.disconnect();
  });

  return { width, height };
}
