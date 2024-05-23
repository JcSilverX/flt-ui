"use client";

import React from "react";
import Button, { ButtonProps } from "../button/button";
import cn from "@/lib/utils/cn";
import HoverCardContext from "@/context/hover-card-context-provider";
import { createPortal } from "react-dom";
import useIsMounted from "@/lib/hooks/use-is-mounted";
import useHoverCardContext from "@/lib/hooks/hover-card-context";
import useControllableState from "@/lib/hooks/use-controllable-state";
import usePositioningEngine from "@/lib/hooks/use-positioning-engine";

const HoverCardProvider = HoverCardContext.Provider;

export type TPointerEvent = React.PointerEvent<HTMLButtonElement>;
export type TKeyboardEvent = React.KeyboardEvent<HTMLDivElement>;
export type TPlacement =
	| "top"
	| "top-start"
	| "top-end"
	| "right"
	| "right-start"
	| "right-end"
	| "bottom"
	| "bottom-start"
	| "bottom-end"
	| "left"
	| "left-start"
	| "left-end";

type HoverCardProps = React.HTMLAttributes<HTMLDivElement> & {
	reference?: React.RefObject<HTMLDivElement> | undefined;
	open?: boolean | undefined;
	defaultOpen?: boolean | undefined;
	onOpenChange?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
	openDelay?: number | undefined;
	closeDelay?: number | undefined;
	placement?: TPlacement | undefined;
};

export default function HoverCard({
	open: openProp,
	defaultOpen,
	onOpenChange,
	openDelay = 700,
	closeDelay = 300,
	placement = "bottom",
	className,
	...props
}: HoverCardProps) {
	const { reference: ref } = props;

	// state
	const isMounted = useIsMounted();
	const [isOpen = false, setIsOpen] = useControllableState({
		prop: openProp,
		defaultProp: defaultOpen as boolean,
		onChange: onOpenChange as React.Dispatch<React.SetStateAction<boolean>>,
	});
	const hoverCardTriggerRef = React.useRef<HTMLButtonElement>(null);
	const hoverCardContentRef = React.useRef<HTMLDivElement>(null);
	const openTimerRef = React.useRef(0);
	const closeTimerRef = React.useRef(0);
	const { x, y } = usePositioningEngine(
		isOpen,
		setIsOpen,
		hoverCardTriggerRef,
		hoverCardContentRef,
		placement
	);

	// derived state

	// event handlers / actions
	const handleOpen = (): void => {
		clearTimeout(closeTimerRef.current);

		openTimerRef.current = window.setTimeout(() => setIsOpen(true), openDelay);
	};

	const handleClose = (): void => {
		clearTimeout(closeTimerRef.current);

		closeTimerRef.current = window.setTimeout(
			() => setIsOpen(false),
			closeDelay
		);
	};

	const handleDismiss = (): void => {
		setIsOpen(false);
	};

	// useEffect
	React.useEffect(() => {
		return () => {
			clearTimeout(openTimerRef.current);
			clearTimeout(closeTimerRef.current);
		};
	}, []);

	// scope
	const scope = {
		isMounted,
		isOpen,
		x,
		y,
		hoverCardTriggerRef,
		hoverCardContentRef,
		handleOpen,
		handleClose,
		handleDismiss,
	};

	return (
		<HoverCardProvider value={scope}>
			<div ref={ref} className={cn("", className, {})} {...props} />
		</HoverCardProvider>
	);
}

type HoverCardTriggerProps = ButtonProps;

export function HoverCardTrigger({ ...props }: HoverCardTriggerProps) {
	// state
	const { isOpen, hoverCardTriggerRef, handleOpen, handleClose } =
		useHoverCardContext();

	return (
		<Button
			reference={hoverCardTriggerRef}
			onPointerEnter={handleOpen}
			onPointerLeave={handleClose}
			onFocus={handleOpen}
			onBlur={handleClose}
			data-jsx-state={getState(isOpen)}
			{...props}
		/>
	);
}

type HoverCardPortalProps = React.HTMLAttributes<HTMLDivElement> & {
	reference?: React.RefObject<HTMLDivElement> | undefined;
};
export function HoverCardPortal({ className, ...props }: HoverCardPortalProps) {
	const { reference: ref } = props;

	// state
	const { hoverCardContentRef, isMounted, isOpen, x, y } =
		useHoverCardContext();

	return (
		isMounted &&
		createPortal(
			isOpen && (
				<div
					ref={ref ?? hoverCardContentRef}
					className={cn("fixed top-0 left-0", className, {})}
					style={{
						transform: `translate(${x}px, ${y}px)`,
					}}
					{...props}
				/>
			),
			document.body
		)
	);
}

type HoverCardContentProps = React.HTMLAttributes<HTMLDivElement> & {
	reference?: React.RefObject<HTMLDivElement> | undefined;
};

export function HoverCardContent({
	className,
	...props
}: HoverCardContentProps) {
	const { reference: ref } = props;
	const { isOpen, handleOpen, handleClose, handleDismiss } =
		useHoverCardContext();

	return (
		<HoverCardPortal>
			<div
				ref={ref}
				onPointerEnter={handleOpen}
				onPointerLeave={handleClose}
				data-jsx-state={getState(isOpen)}
				className={cn(
					"z-50 w-64 rounded-md bg-transparent p-4 text-current shadow-md outline-none",
					className,
					{}
				)}
				{...props}
			/>
		</HoverCardPortal>
	);
}

function getState(open?: boolean): string {
	return open ? "open" : "closed";
}
