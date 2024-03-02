import React from "react";
import SelectorEngine from "../utils/selector-engine";

type TFocusDirection = "backward" | "forward";

/**
 * Used to trap focus within a specified element.
 *
 * @param ref
 * @param isOpen
 * @param autoFocus
 */
export default function useFocusTrap(
	/**
	 * References the target element.
	 */
	ref: React.RefObject<HTMLElement>,
	/**
	 * Indicates whether the target is visible.
	 */
	isOpen: boolean,
	/**
	 * Specifies the index of the focusable child to automatically focus on mount.
	 */
	autoFocus = 0
) {
	React.useEffect(() => {
		const trapElement = ref.current;

		// guard clause
		if (!trapElement) return;

		const elements = SelectorEngine.focusableChildren(trapElement);

		// event handlers / actions
		const handleKeyDown = (event: KeyboardEvent): void => {
			if (event.key !== "Tab") return;

			// prevent default behaviour
			event.preventDefault();

			const newDirection: TFocusDirection = event.shiftKey
				? "backward"
				: "forward";

			if (!elements || elements.length === 0) return;

			const currentActiveIndex = getCurrentActiveIndex(elements);

			if (newDirection === "backward") {
				// !!Shift + Tab: move focus backward
				const prevIndex =
					currentActiveIndex === 0
						? elements.length - 1
						: currentActiveIndex - 1;

				elements[prevIndex].focus();
			} else if (newDirection === "forward") {
				// !!Tab: move focus forward
				const nextIndex = (currentActiveIndex + 1) % elements.length;

				elements[nextIndex].focus();
			}
		};

		/**
		 * Returns the index of the currently active element.
		 * @param elements
		 * @returns number
		 */
		const getCurrentActiveIndex = (elements: NodeListOf<HTMLElement>) => {
			return Array.from(elements).findIndex(
				(element) => element === document.activeElement
			);
		};

		const activateFocusTrap = (): void => {
			if (isOpen) {
				trapElement.addEventListener("keydown", handleKeyDown);

				// !!DEFAULT: if no element with autoFocus attribute is found,
				//            focus is set to the first focusable element.
				const firstFocusableEl =
					autoFocus >= 0 ? elements[autoFocus] : elements[0];

				if (firstFocusableEl) {
					firstFocusableEl.focus();
				} else {
					trapElement.focus();
				}
			}
		};

		const deactivateFocusTrap = (): void => {
			trapElement.removeEventListener("keydown", handleKeyDown);
		};

		activateFocusTrap();
		return deactivateFocusTrap;
	}, [autoFocus, isOpen, ref]);
}
