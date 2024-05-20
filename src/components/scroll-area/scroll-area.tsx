import ScrollAreaContext from "@/context/scroll-area-context-provider";
import useIsMounted from "@/lib/hooks/use-is-mounted";
import useScrollAreaContext from "@/lib/hooks/use-scroll-area-context";
import cn from "@/lib/utils/cn";
import React from "react";

const ScrollAreaProvider = ScrollAreaContext.Provider;
const EVT_POINTER_ENTER = "pointerenter";
const EVT_POINTER_LEAVE = "pointerleave";
const EVT_SCROLL = "scroll";

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
	const isMounted = useIsMounted();
	const [isVisible, setIsVisible] = React.useState<boolean>(false);
	const [scrollbarX, setScrollbarX] = React.useState<number | null>(null);
	const [scrollbarY, setScrollbarY] = React.useState<number | null>(null);
	const [cornerWidth, setCornerWidth] = React.useState<number>(0);
	const [cornerHeight, setCornerHeight] = React.useState<number>(0);
	const scrollAreaViewportRef = React.useRef<HTMLDivElement>(null);
	const scrollAreaScrollbarRef = React.useRef<HTMLDivElement>(null);

	// derived state

	// event handlers / action

	// useEffect
	React.useEffect(() => {
		const scrollAreaViewport = scrollAreaViewportRef.current;
		let timeoutId = 0;

		if (!scrollAreaViewport) return;

		const handleShow = (): void => {
			window.clearTimeout(timeoutId);
			setIsVisible(true);
		};
		const handleHide = () => {
			timeoutId = window.setTimeout(() => setIsVisible(false), scrollHideDelay);
		};

		const handlePointerEnter = (): void => handleShow();
		const handlePointerLeave = (): void => handleHide();

		scrollAreaViewport.addEventListener(EVT_POINTER_ENTER, handlePointerEnter);
		scrollAreaViewport.addEventListener(EVT_POINTER_LEAVE, handlePointerLeave);

		return () => {
			window.clearTimeout(timeoutId);

			scrollAreaViewport.removeEventListener(
				EVT_POINTER_ENTER,
				handlePointerEnter
			);
			scrollAreaViewport.removeEventListener(
				EVT_POINTER_LEAVE,
				handlePointerLeave
			);
		};
	}, [scrollHideDelay]);

	React.useEffect(() => {
		const scrollAreaViewport = scrollAreaViewportRef.current;

		if (!scrollAreaViewport) return;

		const handleScroll = (): void => {
			const {
				scrollTop,
				scrollLeft,
				clientHeight,
				clientWidth,
				scrollWidth,
				scrollHeight,
			} = scrollAreaViewport;
			const verticalHeight: number =
				(clientHeight / scrollHeight) * clientHeight;

			const horizontalWidth: number = (clientWidth / scrollWidth) * clientWidth;

			// setScrollbarY(verticalHeight);
			setCornerWidth(horizontalWidth);
			setScrollbarX((scrollLeft / scrollWidth) * clientWidth);
			setCornerHeight(verticalHeight);
			setScrollbarY((scrollTop / scrollHeight) * clientHeight);
		};

		scrollAreaViewport.addEventListener(EVT_SCROLL, handleScroll);

		return () =>
			scrollAreaViewport.removeEventListener(EVT_SCROLL, handleScroll);
	}, []);

	// scope
	const scope = {
		isMounted,
		isVisible,
		scrollbarX,
		scrollbarY,
		scrollAreaViewportRef,
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
				<ScrollAreaScrollbar reference={scrollAreaScrollbarRef} />
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
	const { scrollAreaViewportRef } = useScrollAreaContext();

	return (
		<div
			ref={ref ?? scrollAreaViewportRef}
			data-jsx-scroll-area-viewport=""
			className={cn(
				"h-full w-full rounded-[inherit] data-[jsx-scroll-area-viewport]:scrollbar-w-none",
				className,
				{}
			)}
			style={{
				overflow: "clip scroll",
			}}
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
	const { isMounted, isVisible, scrollbarX, scrollbarY } =
		useScrollAreaContext();
	const scrollOffset = orientationProp === "vertical" ? scrollbarY : scrollbarX;

	const inlineStyles: React.CSSProperties =
		orientationProp === "vertical"
			? {
					top: 0,
					right: 0,
					bottom: `${0}px`,
			  }
			: {
					bottom: 0,
					left: 0,
					right: `${scrollbarX}px`,
			  };

	return (
		isMounted &&
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
	const { isVisible, scrollbarX, scrollbarY } = useScrollAreaContext();

	const scrollOffset = "vertical" === "vertical" ? scrollbarY : scrollbarX;

	return (
		<span
			ref={ref}
			data-jsx-state={getState(isVisible)}
			className={cn(
				"inline-block relative flex-1 rounded-full bg-black",
				className,
				{}
			)}
			style={{
				transform: `translate3d(0px, ${scrollbarY}px, 0px)`,
			}}
			{...props}
		/>
	);
}

type TState = "visible" | "hidden";

export const getState = (isVisible: boolean): TState => {
	return isVisible ? "visible" : "hidden";
};
