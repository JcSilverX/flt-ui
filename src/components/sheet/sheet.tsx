import React from "react";
import Button, { ButtonProps } from "../button/button";

type SheetProps = React.HTMLAttributes<HTMLDivElement> & {
	reference?: React.RefObject<HTMLDivElement>;
};

export default function Sheet({ ...props }: SheetProps) {
	return <div {...props} />;
}

type SheetOverlayProps = React.HTMLAttributes<HTMLDivElement> & {
	reference?: React.RefObject<HTMLDivElement>;
};

export function SheetOverlay({ ...props }: SheetOverlayProps) {
	return <div {...props} />;
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

export function SheetHeader({ ...props }: SheetHeaderProps) {
	return <div {...props} />;
}

type SheetTitleProps = React.HTMLAttributes<HTMLDivElement> & {
	reference?: React.RefObject<HTMLDivElement>;
};

export function SheetTitle({ ...props }: SheetTitleProps) {
	return <div {...props} />;
}

type SheetDescriptionProps = React.HTMLAttributes<HTMLDivElement> & {
	reference?: React.RefObject<HTMLDivElement>;
};

export function SheetDescription({ ...props }: SheetDescriptionProps) {
	return <div {...props} />;
}

type SheetContentProps = React.HTMLAttributes<HTMLDivElement> & {
	reference?: React.RefObject<HTMLDivElement>;
};

type SheetPortalProps = React.HTMLAttributes<HTMLDivElement> & {
	reference?: React.RefObject<HTMLDivElement>;
};

export function SheetPortal({ ...props }: SheetPortalProps) {
	return <div {...props} />;
}

export function SheetContent({ ...props }: SheetContentProps) {
	return <div {...props} />;
}

type SheetFooterProps = React.HTMLAttributes<HTMLDivElement> & {
	reference?: React.RefObject<HTMLDivElement>;
};

export function SheetFooter({ ...props }: SheetFooterProps) {
	return <div {...props} />;
}
