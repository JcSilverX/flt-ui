"use client";

import React from "react";
import Button, { ButtonProps } from "../button/button";
import cn from "@/lib/utils/cn";
import { Cross2Icon } from "@radix-ui/react-icons";
import useIsMounted from "@/lib/hooks/use-is-mounted";
import { createPortal } from "react-dom";

type SheetProps = React.HTMLAttributes<HTMLDivElement> & {
	reference?: React.RefObject<HTMLDivElement>;
};

export default function Sheet({ className, ...props }: SheetProps) {
	const { reference: ref } = props;

	return <div ref={ref} className={cn("", className, {})} {...props} />;
}

type SheetOverlayProps = React.HTMLAttributes<HTMLDivElement> & {
	reference?: React.RefObject<HTMLDivElement>;
};

export function SheetOverlay({ className, ...props }: SheetOverlayProps) {
	const { reference: ref } = props;

	return (
		<div
			ref={ref}
			className={cn(
				"fixed inset-0 z-50 bg-black/80 data-[jsx-state=open]:| data-[jsx-state=closed]:| data-[jsx-state=open]:| data-[jsx-state=closed]:|",
				className,
				{}
			)}
			{...props}
		/>
	);
}

type SheetTriggerProps = ButtonProps;

export function SheetTrigger({ ...props }: SheetTriggerProps) {
	return <Button {...props} />;
}

type SheetCloseProps = ButtonProps;

export function SheetClose({ ...props }: SheetCloseProps) {
	return <Button {...props} />;
}

type SheetHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
	reference?: React.RefObject<HTMLDivElement>;
};

export function SheetHeader({ className, ...props }: SheetHeaderProps) {
	const { reference: ref } = props;

	return (
		<div
			ref={ref}
			className={cn("flex flex-col text-center sm:text-left", className, {})}
			{...props}
		/>
	);
}

type SheetTitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
	reference?: React.RefObject<HTMLHeadingElement>;
};

export function SheetTitle({ className, ...props }: SheetTitleProps) {
	const { reference: ref } = props;

	return (
		<h2
			ref={ref}
			className={cn("text-lg font-semibold text-gray-950", className, {})}
			{...props}
		/>
	);
}

type SheetDescriptionProps = React.HTMLAttributes<HTMLParagraphElement> & {
	reference?: React.RefObject<HTMLParagraphElement>;
};

export function SheetDescription({
	className,
	...props
}: SheetDescriptionProps) {
	const { reference: ref } = props;

	return (
		<p
			ref={ref}
			className={cn("text-sm text-gray-700", className, {})}
			{...props}
		/>
	);
}

type SheetContentProps = React.HTMLAttributes<HTMLDivElement> & {
	reference?: React.RefObject<HTMLDivElement>;
};

type SheetPortalProps = React.HTMLAttributes<HTMLDivElement> & {
	reference?: React.RefObject<HTMLDivElement>;
};

export function SheetPortal({ className, ...props }: SheetPortalProps) {
	const { reference: ref } = props;
	const isMounted = useIsMounted();

	return (
		isMounted &&
		createPortal(
			<div ref={ref} className={cn("", className, {})} {...props} />,
			document.body
		)
	);
}

export function SheetContent({
	children,
	className,
	...props
}: SheetContentProps) {
	const { reference: ref } = props;

	return (
		<SheetPortal>
			<SheetOverlay>
				<div
					ref={ref}
					className={cn(
						"fixed z-50 bg-gray-50 p-6 shadow-lg transition ease-in-out data-[jsx-state=open]:| data-[jsx-state=closed]:| data-[jsx-state=open]:| data-[jsx-state=closed]:|",
						className,
						{
							"inset-y-0 right-0 h-full w-3/4 border-l data-[jsx-state=open]:| data-[jsx-state=closed]:| sm:max-w-sm":
								true,
						}
					)}
					{...props}
				>
					{children}

					<SheetClose
						variant={"ghost"}
						size={"icon"}
						className={cn("absolute top-4 right-4 rounded-sm opacity-70")}
					>
						<Cross2Icon height={16} width={16} />
						<span className="sr-only">Close</span>
					</SheetClose>
				</div>
			</SheetOverlay>
		</SheetPortal>
	);
}

type SheetFooterProps = React.HTMLAttributes<HTMLDivElement> & {
	reference?: React.RefObject<HTMLDivElement>;
};

export function SheetFooter({ className, ...props }: SheetFooterProps) {
	const { reference: ref } = props;

	return (
		<div
			ref={ref}
			className={cn(
				"flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
				className,
				{}
			)}
			{...props}
		/>
	);
}
