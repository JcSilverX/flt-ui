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

        case "start-down":
          // 'logic for `start-down`'
          newPosition = {
            top: referenceRect.top,
            left: referenceRect.left - positionedElementRect.width,
          };
          break;
        case "start-up":
          // 'logic for `start-up`'
          newPosition = {
            top: referenceRect.bottom - positionedElementRect.height,
            left: referenceRect.left - positionedElementRect.width,
          };
          break;
        case "end-down":
          // 'logic for `end-down`'
          newPosition = {
            top: referenceRect.top,
            left: referenceRect.right,
          };
          break;
        case "end-up":
          // 'logic for `end-up`'
          newPosition = {
            top: referenceRect.bottom - positionedElementRect.height,
            left: referenceRect.right,
          };
          break;

        case "up-centered":
          // 'logic for `up-centered`'
          newPosition = {
            top: referenceRect.top - positionedElementRect.height,
            left:
              referenceRect.left +
              (referenceRect.width - positionedElementRect.width) / 2,
          };
          break;
        case "down-centered":
          // 'logic for `down-centered`'
          newPosition = {
            top: referenceRect.bottom,
            left:
              referenceRect.left +
              (referenceRect.width - positionedElementRect.width) / 2,
          };
          break;
        case "start-centered":
          // 'logic for `start-centered`'
          newPosition = {
            top:
              referenceRect.top +
              (referenceRect.height - positionedElementRect.height) / 2,
            left: referenceRect.left - positionedElementRect.width,
          };
          break;
        case "end-centered":
          // 'logic for `end-centered`'
          newPosition = {
            top:
              referenceRect.top +
              (referenceRect.height - positionedElementRect.height) / 2,
            left: referenceRect.right,
          };

          break;
      }

      return newPosition;
    };

    const handleUpDown = (
      referenceRect: DOMRect,
      positionedElementRect: DOMRect,
      newPosition: TPosition
    ): TPosition => {
      if (newPosition.left + referenceRect.width > window.innerWidth - 4) {
        console.log("not enough space at the end");

        newPosition = calculatePosition(
          referenceRect,
          positionedElementRect,
          direction === "down-end" ? "down-end" : "up-end"
        );

        if (
          newPosition.top + positionedElementRect.height >
            window.innerHeight - 4 &&
          !(referenceRect.top < 4)
        ) {
          console.log("not enough space at the bottom");

          newPosition = calculatePosition(
            referenceRect,
            positionedElementRect,
            "up-end"
          );
        }

        if (referenceRect.top < 4) {
          console.log("not enough space at the top");

          newPosition = calculatePosition(
            referenceRect,
            positionedElementRect,
            "down-end"
          );
        }
      } else if (referenceRect.left < 4) {
        console.log("not enough space at the start");

        newPosition = calculatePosition(
          referenceRect,
          positionedElementRect,
          direction === "down-start" ? "down-start" : "up-start"
        );

        if (
          newPosition.top + positionedElementRect.height >
            window.innerHeight - 4 &&
          !(referenceRect.top < 4)
        ) {
          console.log("not enough space at the bottom");

          newPosition = calculatePosition(
            referenceRect,
            positionedElementRect,
            "up-start"
          );
        }

        if (referenceRect.top < 4) {
          console.log("not enough space at the top");

          newPosition = calculatePosition(
            referenceRect,
            positionedElementRect,
            "down-start"
          );
        }
      } else if (
        newPosition.top + positionedElementRect.height >
          window.innerHeight - 4 &&
        !(referenceRect.top < 4)
      ) {
        console.log("not enough space at the bottom");

        newPosition = calculatePosition(
          referenceRect,
          positionedElementRect,
          direction === "down-start" ? "up-start" : "up-end"
        );
      } else if (referenceRect.top < 4) {
        console.log("not enough space at the top");

        newPosition = calculatePosition(
          referenceRect,
          positionedElementRect,
          direction === "down-start" ? "down-start" : "down-end"
        );
      }

      return newPosition;
    };

    const handleStartEnd = (
      referenceRect: DOMRect,
      positionedElementRect: DOMRect,
      newPosition: TPosition
    ): TPosition => {
      if (newPosition.left + referenceRect.width > window.innerWidth - 4) {
        console.log("not enough space at the end");

        newPosition = calculatePosition(
          referenceRect,
          positionedElementRect,
          direction === "down-end" ? "down-end" : "start-down"
        );

        if (
          newPosition.top + positionedElementRect.height >
            window.innerHeight - 4 &&
          !(referenceRect.top < 4)
        ) {
          console.log("not enough space at the bottom");

          newPosition = calculatePosition(
            referenceRect,
            positionedElementRect,
            "start-up"
          );
        }

        if (referenceRect.top < 4) {
          console.log("not enough space at the top");

          newPosition = calculatePosition(
            referenceRect,
            positionedElementRect,
            "start-down"
          );
        }
      } else if (referenceRect.left < 4) {
        console.log("not enough space at the start");

        newPosition = calculatePosition(
          referenceRect,
          positionedElementRect,
          direction === "start-down" ? "end-down" : "end-up"
        );

        if (
          newPosition.top + positionedElementRect.height >
            window.innerHeight - 4 &&
          !(referenceRect.top < 4)
        ) {
          console.log("not enough space at the bottom");

          newPosition = calculatePosition(
            referenceRect,
            positionedElementRect,
            "end-up"
          );
        }

        if (referenceRect.top < 4) {
          console.log("not enough space at the top");

          newPosition = calculatePosition(
            referenceRect,
            positionedElementRect,
            "end-down"
          );
        }
      } else if (
        newPosition.top + positionedElementRect.height >
          window.innerHeight - 4 &&
        !(referenceRect.top < 4)
      ) {
        console.log("not enough space at the bottom");

        newPosition = calculatePosition(
          referenceRect,
          positionedElementRect,
          direction === "start-down" ? "start-up" : "end-up"
        );
      } else if (referenceRect.top < 4) {
        console.log("not enough space at the top");

        newPosition = calculatePosition(
          referenceRect,
          positionedElementRect,
          direction === "start-down" ? "start-down" : "end-down"
        );
      }

      return newPosition;
    };

    const handleCentered = (
      referenceRect: DOMRect,
      positionedElementRect: DOMRect,
      newPosition: TPosition
    ): TPosition => {
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
        direction === "down-start" ||
        direction === "down-end" ||
        direction === "up-start" ||
        direction === "up-end"
      ) {
        newPosition = handleUpDown(
          referenceRect,
          positionedElementRect,
          newPosition
        );
      } else if (
        direction === "start-down" ||
        direction === "start-up" ||
        direction === "end-down" ||
        direction === "end-up"
      ) {
        newPosition = handleStartEnd(
          referenceRect,
          positionedElementRect,
          newPosition
        );
      } else if (
        direction === "up-centered" ||
        direction === "down-centered" ||
        direction === "start-centered" ||
        direction === "end-centered"
      ) {
        newPosition = handleCentered(
          referenceRect,
          positionedElementRect,
          newPosition
        );
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
