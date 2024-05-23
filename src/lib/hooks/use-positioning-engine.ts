import type { TPlacement } from "@/components/dropdown/dropdown";
import React from "react";

export type TReferenceElement = React.RefObject<HTMLElement>;

export type TPosition = {
	x: number;
	y: number;
};

export const initPosition: TPosition = {
	x: 0,
	y: 0,
};

export type TBoundaryRect = {
	x: number;
	y: number;
	width: number;
	height: number;
};

export default function usePositioningEngine(
	isOpen: boolean,
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
	referenceRef: TReferenceElement,
	floatingElementRef: TReferenceElement,
	placement: TPlacement
) {
	// state
	const [{ x, y }, setPosition] = React.useState<TPosition>(initPosition);

	React.useEffect(() => {
		const reference = referenceRef.current;
		const floatingElement = floatingElementRef.current;

		if (!isOpen || !reference || !floatingElement || !placement) return;

		const update = (): void => {
			const referenceRect = reference.getBoundingClientRect();
			const floatingElementRect = floatingElement.getBoundingClientRect();
			const alignment = getAlignment(placement);
			const viewportWidth = window.innerWidth;
			const viewportHeight = window.innerHeight;

			const boundaryRect = {
				x: 0,
				y: 0,
				width: viewportWidth,
				height: viewportHeight,
			};

			let newPosition = computePosition(
				referenceRect,
				floatingElementRect,
				placement,
				boundaryRect
			);

			/**
			 * logic to flip the dropdown, tooltip, popover, etc. here.
			 */
			switch (placement) {
				case "top":
				case "top-start":
				case "top-end":
					if (referenceRect.top < 4) {
						newPosition = computePosition(
							referenceRect,
							floatingElementRect,
							alignment === undefined ? "bottom" : `bottom-${alignment}`,
							boundaryRect
						);
					}
					break;
				case "right":
				case "right-start":
				case "right-end":
					if (newPosition.x + referenceRect.width > viewportWidth - 4) {
						newPosition = computePosition(
							referenceRect,
							floatingElementRect,
							alignment === undefined ? "left" : `left-${alignment}`,
							boundaryRect
						);
					}
					break;
				case "bottom":
				case "bottom-start":
				case "bottom-end":
					if (newPosition.y + floatingElementRect.height > viewportHeight - 4) {
						newPosition = computePosition(
							referenceRect,
							floatingElementRect,
							alignment === undefined ? "top" : `top-${alignment}`,
							boundaryRect
						);
					}
					break;
				case "left":
				case "left-start":
				case "left-end":
					if (referenceRect.left < 4) {
						newPosition = computePosition(
							referenceRect,
							floatingElementRect,
							alignment === undefined ? "right" : `right-${alignment}`,
							boundaryRect
						);
					}
					break;
				default:
					break;
			}

			// check if all four corners of the reference element are outside the viewport
			const isOffScreen =
				referenceRect.right < 0 ||
				referenceRect.left > viewportWidth ||
				referenceRect.bottom < 0 ||
				referenceRect.top > viewportHeight;

			if (isOffScreen) {
				// hide the tooltip when the target is off the screen
				setIsOpen(false);
			}

			setPosition(newPosition);
		};

		update();
		window.addEventListener("resize", update);
		window.addEventListener("scroll", update);

		return () => {
			setIsOpen(false);

			window.removeEventListener("resize", update);
			window.removeEventListener("scroll", update);
		};
	}, [floatingElementRef, isOpen, placement, referenceRef]);

	return {
		x,
		y,
	};
}

type TCoords = { x: number; y: number };
export const initCoords: TCoords = { x: 0, y: 0 };

type TComputePositionReturn = { x: number; y: number };

export const computePosition = (
	reference: DOMRect,
	floating: DOMRect,
	placement: TPlacement,
	boundary: TBoundaryRect
): TComputePositionReturn => {
	let coords: TCoords = computeCoordsFromPlacement(
		reference,
		floating,
		placement
	);

	if (coords.x < boundary.x) {
		coords.x = boundary.x;
	}
	if (coords.y < boundary.y) {
		coords.y = boundary.y;
	}
	if (coords.x + floating.width > boundary.x + boundary.width) {
		coords.x = boundary.x + boundary.width - floating.width;
	}
	if (coords.y + floating.height > boundary.y + boundary.height) {
		coords.y = boundary.y + boundary.height - floating.height;
	}

	return coords;
};

export const computeCoordsFromPlacement = (
	reference: DOMRect,
	floating: DOMRect,
	placement: TPlacement
): TCoords => {
	const X: number = reference.x + (reference.width - floating.width) / 2;
	const Y: number = reference.y + (reference.height - floating.height) / 2;

	let coords: TCoords = initCoords;

	switch (placement) {
		case "top":
			coords = {
				x: X,
				y: reference.y - floating.height,
			};
			break;
		case "top-start":
			coords = {
				x: reference.x,
				y: reference.y - floating.height,
			};
			break;
		case "top-end":
			coords = {
				x: reference.x + reference.width - floating.width,
				y: reference.y - floating.height,
			};
			break;
		case "right":
			coords = {
				x: reference.x + reference.width,
				y: Y,
			};
			break;
		case "right-start":
			coords = {
				x: reference.x + reference.width,
				y: reference.y + reference.height - floating.height,
			};
			break;
		case "right-end":
			coords = {
				x: reference.x + reference.width,
				y: reference.y,
			};
			break;
		case "bottom":
			coords = {
				x: X,
				y: reference.y + reference.height,
			};
			break;
		case "bottom-start":
			coords = {
				x: reference.x,
				y: reference.y + reference.height,
			};
			break;
		case "bottom-end":
			coords = {
				x: reference.x + reference.width - floating.width,
				y: reference.y + reference.height,
			};
			break;
		case "left":
			coords = {
				x: reference.x - floating.width,
				y: Y,
			};
			break;
		case "left-start":
			coords = {
				x: reference.x - floating.width,
				y: reference.y + reference.height - floating.height,
			};
			break;
		case "left-end":
			coords = {
				x: reference.x - floating.width,
				y: reference.y,
			};
			break;
		default:
			coords = {
				x: reference.x,
				y: reference.y,
			};
	}

	return coords;
};

export type TSide = "top" | "right" | "bottom" | "left";

export const getSide = (placement: TPlacement): TSide => {
	return placement.split("-")[0] as TSide;
};

export type TAlignment = "start" | "end";

export const getAlignment = (placement: TPlacement): TAlignment => {
	return placement.split("-")[1] as TAlignment;
};
