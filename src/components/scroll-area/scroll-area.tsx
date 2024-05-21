import React from "react";
import ScrollAreaContext from "@/context/scroll-area-context-provider";
import { useDebounce } from "@/lib/hooks/use-debounce";
import useIsMounted from "@/lib/hooks/use-is-mounted";
import useScrollAreaContext from "@/lib/hooks/use-scroll-area-context";
import { clamp } from "@/lib/utils/clamp";
import cn from "@/lib/utils/cn";

const ScrollAreaProvider = ScrollAreaContext.Provider;

export const EVT_POINTER_ENTER = "pointerenter";
export const EVT_POINTER_LEAVE = "pointerleave";
export const EVT_SCROLL = "scroll";

export type TPointerEvent = React.PointerEvent<HTMLDivElement>;
export type TTimeout = NodeJS.Timeout | number;
export type TDirection = "ltr" | "rtl";
export type TOrientation = "horizontal" | "vertical";

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
	/**
	 * The orientation of the scrollbar
	 */
	orientation?: TOrientation | undefined;
};

export default function ScrollArea({
	type = "hover",
	scrollHideDelay = 600,
	dir = "ltr",
	orientation = "vertical",
	className,
	...props
}: ScrollAreaProps) {
	const { children, reference: ref } = props;

	// state
	const isMounted = useIsMounted();
	const [isVisible, setIsVisible] = React.useState<boolean>(false);

	const [scrollbarXEnabled, setScrollbarXEnabled] =
		React.useState<boolean>(false);
	const [scrollbarYEnabled, setScrollbarYEnabled] =
		React.useState<boolean>(false);

	const [thumbHeight, setThumbHeight] = React.useState<number>(0);
	const [thumbTop, setThumbTop] = React.useState<number>(0);
	const [thumbWidth, setThumbWidth] = React.useState<number>(0);
	const [thumbLeft, setThumbLeft] = React.useState<number>(0);

	const scrollAreaViewportRef = React.useRef<HTMLDivElement>(null);
	const scrollAreaScrollbarRef = React.useRef<HTMLDivElement>(null);

	const [isSliding, setIsSliding] = React.useState<boolean>(false);
	const [startOffset, setStartOffset] = React.useState<number>(0);

	// derived state

	// event handlers / action
	const handlePointerDown = (evt: TPointerEvent): void => {
		setIsSliding(true);

		const startPosition = scrollbarYEnabled ? evt.clientY : evt.clientX;
		const thumbStartPosition = scrollbarYEnabled ? thumbTop : thumbLeft;

		setStartOffset(startPosition - thumbStartPosition);

		evt.currentTarget.setPointerCapture(evt.pointerId);
		evt.preventDefault();
	};

	const handlePointerMove = (evt: TPointerEvent): void => {
		if (!isSliding) return;

		const scrollAreaViewport = scrollAreaViewportRef.current;

		if (!scrollAreaViewport) return;

		const { clientHeight, scrollHeight, clientWidth, scrollWidth } =
			scrollAreaViewport;

		const movePosition: number = scrollbarYEnabled ? evt.clientY : evt.clientX;
		const viewportSize: number = scrollbarYEnabled ? clientHeight : clientWidth;
		const scrollSize: number = scrollbarYEnabled ? scrollHeight : scrollWidth;
		const thumbSize: number = scrollbarYEnabled ? thumbHeight : thumbWidth;

		const newPosition: number = movePosition - startOffset;

		const minPosition: number = 0;
		const maxPosition: number = viewportSize - thumbSize;

		const clampedPosition: number = clamp(newPosition, [
			minPosition,
			maxPosition,
		]);

		if (scrollbarYEnabled) {
			setThumbTop(clampedPosition);
			const newScrollTop = (clampedPosition / viewportSize) * scrollSize;
			scrollAreaViewport.scrollTop = newScrollTop;
		} else {
			setThumbLeft(clampedPosition);
			const newScrollLeft = (clampedPosition / viewportSize) * scrollSize;
			scrollAreaViewport.scrollLeft = newScrollLeft;
		}

		evt.preventDefault();
	};

	const handlePointerUp = (evt: TPointerEvent): void => {
		setIsSliding(false);

		evt.currentTarget.releasePointerCapture(evt.pointerId);
		evt.preventDefault();
	};

	const handlePointerCancel = (evt: TPointerEvent): void => {
		setIsSliding(false);
		setStartOffset(0);
	};

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

			const thumbHeight: number = (clientHeight / scrollHeight) * clientHeight;
			const thumbTop: number = (scrollTop / scrollHeight) * clientHeight;

			setThumbHeight(thumbHeight);
			setThumbTop(thumbTop);

			const thumbWidth: number = (clientWidth / scrollWidth) * clientWidth;
			const thumbLeft: number = (scrollLeft / scrollWidth) * clientWidth;

			setThumbWidth(thumbWidth);
			setThumbLeft(thumbLeft);
		};

		scrollAreaViewport.addEventListener(EVT_SCROLL, handleScroll);
		handleScroll();

		return () =>
			scrollAreaViewport.removeEventListener(EVT_SCROLL, handleScroll);
	}, []);

	// scope
	const scope = {
		isMounted,
		isVisible,
		type,
		orientation,
		thumbHeight,
		thumbTop,
		thumbWidth,
		thumbLeft,
		scrollbarXEnabled,
		setScrollbarXEnabled,
		scrollbarYEnabled,
		setScrollbarYEnabled,
		scrollAreaViewportRef,
		scrollAreaScrollbarRef,
		handlePointerDown,
		handlePointerMove,
		handlePointerUp,
		handlePointerCancel,
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
	const { scrollAreaViewportRef, scrollbarXEnabled, scrollbarYEnabled } =
		useScrollAreaContext();

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
				overflowX: scrollbarXEnabled ? "scroll" : "clip",
				overflowY: scrollbarYEnabled ? "scroll" : "clip",
			}}
			{...props}
		/>
	);
}

type ScrollAreaScrollbarProps = React.HTMLAttributes<HTMLDivElement> & {
	reference?: React.RefObject<HTMLDivElement> | undefined;
};

export function ScrollAreaScrollbar({
	className,
	...props
}: ScrollAreaScrollbarProps) {
	const { reference: ref } = props;
	const {
		scrollAreaScrollbarRef,
		isMounted,
		isVisible,
		type,
		orientation: orientationProp,
		thumbHeight: height,
		thumbWidth: width,
		setScrollbarXEnabled,
		setScrollbarYEnabled,
		handlePointerDown,
		handlePointerMove,
		handlePointerUp,
		handlePointerCancel,
	} = useScrollAreaContext();
	const isHorizontal = orientationProp === "horizontal";

	const inlineStyles: React.CSSProperties = isHorizontal
		? {
				bottom: 0,
				left: 0,
				right: `${width}px`,
		  }
		: {
				top: 0,
				right: 0,
				bottom: `${height}px`,
		  };

	React.useEffect(() => {
		isHorizontal ? setScrollbarXEnabled(true) : setScrollbarYEnabled(true);

		return () =>
			isHorizontal ? setScrollbarXEnabled(false) : setScrollbarYEnabled(false);
	}, [isHorizontal, setScrollbarXEnabled, setScrollbarYEnabled]);

	return (
		isMounted && (
			<div
				ref={ref ?? scrollAreaScrollbarRef}
				data-jsx-orientation={orientationProp}
				data-jsx-state={getState(isVisible)}
				onPointerDown={handlePointerDown}
				onPointerMove={handlePointerMove}
				onPointerUp={handlePointerUp}
				onPointerCancel={handlePointerCancel}
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
				<ScrollAreaThumb orientation={orientationProp} />
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
	orientation?: TOrientation | undefined;
};

export function ScrollAreaThumb({
	orientation,
	className,
	...props
}: ScrollAreaThumbProps) {
	const { reference: ref } = props;
	const {
		isVisible,
		thumbHeight: height,
		thumbTop: top,
		thumbWidth: width,
		thumbLeft: left,
	} = useScrollAreaContext();

	const inlineStyles: React.CSSProperties =
		orientation === "vertical"
			? {
					transform: `translate3d(0px, ${top}px, 0px)`,
					height: `${height}px`,
			  }
			: {
					transform: `translate3d(${left}px, 0px, 0px)`,
					width: `${width}px`,
			  };

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
				...inlineStyles,
			}}
			{...props}
		/>
	);
}

type TState = "visible" | "hidden";

export const getState = (isVisible: boolean): TState => {
	return isVisible ? "visible" : "hidden";
};
