import React from "react";

type TSize = {
  x: number | undefined;
  y: number | undefined;
  width: number | undefined;
  height: number | undefined;
  top: number | undefined;
  right: number | undefined;
  bottom: number | undefined;
  left: number | undefined;
};

const initSize: TSize = {
  x: undefined,
  y: undefined,
  width: undefined,
  height: undefined,
  top: undefined,
  right: undefined,
  bottom: undefined,
  left: undefined,
};

export function useBoundingClient<T extends HTMLElement>(
  ref: React.RefObject<T>
) {
  const [{ x, y, width, height, top, right, bottom, left }, setDimensions] =
    React.useState<TSize>(initSize);

  React.useEffect(() => {
    const refx = ref.current;

    if (!refx) return;

    const { x, y, width, height, top, right, bottom, left } =
      refx.getBoundingClientRect();

    setDimensions({ x, y, width, height, top, right, bottom, left });
  }, [ref]);

  return { x, y, width, height, top, right, bottom, left };
}
