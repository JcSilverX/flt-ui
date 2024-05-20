import ScrollAreaContext from "@/context/scroll-area-context-provider";
import useScrollAreaContext from "@/lib/hooks/use-scroll-area-context";
import cn from "@/lib/utils/cn";
import React from "react";

const ScrollAreaProvider = ScrollAreaContext.Provider;

export type TTimeout = NodeJS.Timeout | number;
export type TDirection = "ltr" | "rtl";

type ScrollAreaProps = React.HTMLAttributes<HTMLDivElement> & {
	reference?: React.RefObject<HTMLDivElement> | undefined;
	/**
	 * Describes the nature of scrollbar visibility, similar to how the scrollbar preferences in MacOS control visibility of native scrollbars.
	 *
	 * "auto" means that scrollbars are visible when content is overflowing on the corresponding orientation.
	 *
	 * "always" means that scrollbars are always visible regardless of whether the content is overflowing.
	 *
	 * "scroll" means that scrollbars are visible when the user is scrolling along its corresponding orientation.
	 *
	 * "hover" when the user is scrolling along its corresponding orientation and when the user is hovering over the scroll area.
	 */
	type?: "auto" | "always" | "scroll" | "hover" | undefined;
	/**
	 * If type is set to either "scroll" or "hover", this prop determines the length of time, in milliseconds, before the scrollbars are hidden after the user stops interacting with scrollbars.
	 */
	scrollHideDelay?: number | undefined;
	/**
	 * The reading direction of the scroll area. If omitted, inherits globally from DirectionProvider or assumes LTR (left-to-right) reading mode.
	 */
	dir?: TDirection | undefined;
};

export default function ScrollArea({
	type = "hover",
	scrollHideDelay = 600,
	dir = "ltr",
	className,
	...props
}: ScrollAreaProps) {
	const { children, reference: ref } = props;

	// state
	const [isVisible, setIsVisible] = React.useState<boolean>(false);

	let timeoutId: TTimeout = 0;

	// derived state

	// event handlers / action
	const handleShow = (): void => {
		clearTimeout(timeoutId);
		setIsVisible(true);
	};
	const handleHide = () => {
		timeoutId = setTimeout(() => setIsVisible(false), scrollHideDelay);
	};

	const handlePointerEnter = (): void => handleShow();
	const handlePointerLeave = (): void => handleHide();

	// useEffect

	// scope
	const scope = {
		isVisible,
		handlePointerEnter,
		handlePointerLeave,
	};

	return (
		<ScrollAreaProvider value={scope}>
			<div
				ref={ref}
				className={cn("relative overflow-clip", className, {})}
				{...props}
			>
				<ScrollAreaViewport>
					<div className="min-w-full table">{children}</div>
				</ScrollAreaViewport>
				<ScrollAreaScrollbar />
				<ScrollAreaCorner />
			</div>
		</ScrollAreaProvider>
	);
}

type ScrollAreaViewportProps = React.HTMLAttributes<HTMLDivElement> & {
	reference?: React.RefObject<HTMLDivElement> | undefined;
};

export function ScrollAreaViewport({
	className,
	...props
}: ScrollAreaViewportProps) {
	const { reference: ref } = props;
	const { handlePointerEnter, handlePointerLeave } = useScrollAreaContext();

	return (
		<div
			ref={ref}
			onPointerEnter={handlePointerEnter}
			onPointerLeave={handlePointerLeave}
			className={cn("h-full w-full rounded-[inherit]", className, {})}
			{...props}
		/>
	);
}

type TOrientation = "horizontal" | "vertical";

type ScrollAreaScrollbarProps = React.HTMLAttributes<HTMLDivElement> & {
	reference?: React.RefObject<HTMLDivElement> | undefined;
	orientation?: TOrientation | undefined;
};

export function ScrollAreaScrollbar({
	orientation: orientationProp = "vertical",
	className,
	...props
}: ScrollAreaScrollbarProps) {
	const { reference: ref } = props;
	const { isVisible } = useScrollAreaContext();

	const inlineStyles: React.CSSProperties =
		orientationProp === "vertical"
			? {
					top: 0,
					right: 0,
					bottom: "0px",
			  }
			: {
					bottom: 0,
					left: 0,
					right: "0px",
			  };

	return (
		isVisible && (
			<div
				ref={ref}
				daa-jsx-orientation={orientationProp}
				data-jsx-state={getState(isVisible)}
				className={cn(
					"flex touch-none select-none transition-colors",
					className,
					{
						"h-full w-2.5 border-l border-l-transparent p-[.0625rem]":
							orientationProp === "vertical",
						"h-2.5 flex-col border-t border-t-transparent p-[.0625rem]":
							orientationProp === "horizontal",
					}
				)}
				style={{
					position: "absolute",
					transform: `translate3d(0px, 241px, 0px)`,
					...inlineStyles,
				}}
				{...props}
			>
				<ScrollAreaThumb />
			</div>
		)
	);
}

export function ScrollAreaCorner({ className, ...props }: ScrollAreaProps) {
	const { reference: ref } = props;

	return <div ref={ref} className={cn("bg-black", className, {})} {...props} />;
}

type ScrollAreaThumbProps = React.HTMLAttributes<HTMLSpanElement> & {
	reference?: React.RefObject<HTMLSpanElement> | undefined;
};

export function ScrollAreaThumb({ className, ...props }: ScrollAreaThumbProps) {
	const { reference: ref } = props;
	const { isVisible } = useScrollAreaContext();

	return (
		<span
			ref={ref}
			data-jsx-state={getState(isVisible)}
			className={cn(
				"block relative flex-1 rounded-full bg-black/10",
				className,
				{}
			)}
			{...props}
		/>
	);
}

type TState = "visible" | "hidden";

export const getState = (isVisible: boolean): TState => {
	return isVisible ? "visible" : "hidden";
};
