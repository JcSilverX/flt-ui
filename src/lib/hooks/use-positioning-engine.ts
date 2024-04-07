import React from "react";

// TODO
export type TPosition = {
  top: number;
  left: number;
};

export const initPosition: TPosition = {
  top: 0,
  left: 0,
};

export default function usePositioningEngine(
  isOpen: boolean,
  referenceRef: React.RefObject<HTMLElement>,
  positionedElementRef: React.RefObject<HTMLElement>,
  direction: string
) {
  const [position, setPosition] = React.useState<TPosition>(initPosition);

  React.useEffect(() => {
    const reference = referenceRef.current;
    const positionedElement = positionedElementRef.current;

    if (!isOpen || !reference || !positionedElement) return;

    const calculatePosition = (
      referenceRect: DOMRect,
      positionedElementRect: DOMRect,
      direction: string
    ): TPosition => {
      let newPosition: TPosition = { ...initPosition };

      switch (direction) {
        case "up-start":
          // 'logic for `up-start`'
          newPosition = {
            top: referenceRect.top - positionedElementRect.height,
            left: referenceRect.left,
          };
          break;
        case "down-start":
          //'logic for `down-start`'
          newPosition = {
            top: referenceRect.bottom,
            left: referenceRect.left,
          };
          break;
        case "up-end":
          // 'logic for `up-end`'
          newPosition = {
            top: referenceRect.top - positionedElementRect.height,
            left: referenceRect.right - positionedElementRect.width,
          };
          break;
        case "down-end":
          // 'logic for `down-end`'
          newPosition = {
            top: referenceRect.bottom,
            left: referenceRect.right - positionedElementRect.width,
          };
          break;
      }

      return newPosition;
    };

    const updatePosition = (): void => {
      const referenceRect = reference.getBoundingClientRect();
      const positionedElementRect = positionedElement.getBoundingClientRect();

      let newPosition: TPosition = calculatePosition(
        referenceRect,
        positionedElementRect,
        direction
      );

      if (
        newPosition.top + positionedElementRect.height >
        window.innerHeight - 4
      ) {
        console.log("not enough space at the bottom");

        if (direction === "down-start") {
          newPosition = calculatePosition(
            referenceRect,
            positionedElementRect,
            "up-start"
          );
        }
      } else if (newPosition.top < 4) {
        // TODO
        console.log("not enough space at the top");

        if (direction === "down-start") {
          newPosition = calculatePosition(
            referenceRect,
            positionedElementRect,
            "down-start"
          );
        }
      } else if (
        newPosition.left + referenceRect.width >
        window.innerWidth - 4
      ) {
        console.log("not enough space at the end");

        if (direction === "down-start") {
          newPosition = calculatePosition(
            referenceRect,
            positionedElementRect,
            "down-end"
          );
        }
      } else if (referenceRect.left < 4) {
        console.log("not enough space at the start");

        if (direction === "down-start") {
          newPosition = calculatePosition(
            referenceRect,
            positionedElementRect,
            "down-start"
          );
        }
      }

      setPosition(newPosition);
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);

    return () => window.removeEventListener("resize", updatePosition);
  }, [direction, isOpen, positionedElementRef, referenceRef]);

  return position;
}

// NOTE
// if (
//     newPosition.top + positionedElementRect.height >
//     window.innerHeight
//   ) {
//     if (direction === "up" || direction === "up-centered") {
//       newPosition = calculatePosition(
//         referenceRect,
//         positionedElementRect,
//         direction === "up" ? "down" : "down-centered"
//       );
//     } else if (direction === "down" || direction === "down-centered") {
//       newPosition = calculatePosition(
//         referenceRect,
//         positionedElementRect,
//         direction === "down" ? "up" : "up-centered"
//       );
//     } else if (direction === "down-end" || direction === "up-end") {
//       newPosition = calculatePosition(
//         referenceRect,
//         positionedElementRect,
//         direction === "down-end" ? "up-end" : "down-end"
//       );
//     }
//   } else if (
//     newPosition.left + positionedElementRect.width >
//     window.innerWidth
//   ) {
//     if (direction === "down" || direction === "down-end") {
//       newPosition = calculatePosition(
//         referenceRect,
//         positionedElementRect,
//         direction === "down" ? "down-end" : "down"
//       );
//     } else if (direction === "up" || direction === "up-end") {
//       newPosition = calculatePosition(
//         referenceRect,
//         positionedElementRect,
//         direction === "up" ? "up-end" : "up"
//       );
//     } else if (direction === "end" || direction === "end-centered") {
//       newPosition = calculatePosition(
//         referenceRect,
//         positionedElementRect,
//         direction === "end" ? "start" : "start-centered"
//       );
//     }
//   } else if (newPosition.left < 0) {
//     if (direction === "start" || direction === "start-centered") {
//       newPosition = calculatePosition(
//         referenceRect,
//         positionedElementRect,
//         direction === "start" ? "end" : "end-centered"
//       );
//     }
//   }
