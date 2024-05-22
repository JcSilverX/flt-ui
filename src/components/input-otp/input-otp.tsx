"use client";
import InputOTPContext from "@/context/input-otp-context-provider";
import useInputOTPContext from "@/lib/hooks/input-otp-context";
import cn from "@/lib/utils/cn";
import { DotFilledIcon } from "@radix-ui/react-icons";
import React from "react";

const InputOTPProvider = InputOTPContext.Provider;

export type TChangeEvent = React.ChangeEvent<HTMLInputElement>;

type InputOTPProps = React.HTMLAttributes<HTMLDivElement> & {
	reference?: React.RefObject<HTMLDivElement> | undefined;
	maxLength?: number | undefined;
	hasFakeCaret?: boolean | undefined;
};

export default function InputOTP({
	maxLength,
	className,
	...props
}: InputOTPProps) {
	const { children, reference: ref } = props;

	// state
	const [value, setValue] = React.useState<string>("");
	const [isActive, setIsActive] = React.useState<boolean>(false);
	const [hasFakeCaret, sethasFakeCaret] = React.useState<boolean>(false);

	// derived state

	// event handlers / actions
	const handleChange = (evt: TChangeEvent): void => {
		const newValue = evt.target.value;

		setValue(newValue);
	};

	// slots
	const slots = { value, isActive, hasFakeCaret };

	return (
		<InputOTPProvider value={slots}>
			<div
				ref={ref}
				className={cn(
					"relative flex items-center gap-2 cursor-text select-none pointer-events-none h-10 has-[:disabled]:opacity-50 disabled:cursor-not-allowed",
					className,
					{}
				)}
				{...props}
			>
				{children}

				<div className="absolute inset-0 pointer-events-none">
					<input
						value={value}
						onChange={handleChange}
						autoComplete="one-time-code"
						data-jsx-input-otp={true}
						inputMode="numeric"
						pattern="\d+$"
						maxLength={maxLength}
						data-jsx-input-otp-mss="5"
						data-jsx-input-otp-mse="6"
						className={cn(
							"absolute inset-0 w-[calc(100%_+_2.5rem)] h-full flex text-left opacity-100 text-transparent pointer-events-auto bg-transparent caret-transparent border-0 border-solid border-transparent outline-transparent outline outline-0 shadow-none leading-none tracking-[-.5em] text-sm font-mono tabular-nums disabled:cursor-not-allowed",
							{}
						)}
						style={{
							clipPath: "inset(0px 40px 0px 0px)",
						}}
					/>
				</div>
			</div>
		</InputOTPProvider>
	);
}

type InputOTPGroupProps = React.HTMLAttributes<HTMLDivElement> & {
	reference?: React.RefObject<HTMLDivElement> | undefined;
};

export function InputOTPGroup({ className, ...props }: InputOTPGroupProps) {
	const { reference: ref } = props;

	return (
		<div
			ref={ref}
			className={cn("flex items-center", className, {})}
			{...props}
		/>
	);
}

type InputOTPSlotProps = React.HTMLAttributes<HTMLDivElement> & {
	reference?: React.RefObject<HTMLDivElement> | undefined;
	index?: number | undefined;
};

export function InputOTPSlot({ className, ...props }: InputOTPSlotProps) {
	const { reference: ref } = props;
	const { value: char, isActive, hasFakeCaret } = useInputOTPContext();

	return (
		<div
			ref={ref}
			className={cn(
				"relative flex h-10 w-10 items-center justify-center border-y border-r border-black text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
				className,
				{
					"z-10 ring-2 ring-red ring-offset-transparent": isActive,
				}
			)}
			{...props}
		>
			{char}
			{hasFakeCaret && (
				<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
					<div className="h-4 w-px animate-caret-blink bg-black duration-1000" />
				</div>
			)}
		</div>
	);
}

type InputOTPSeparatorProps = React.HTMLAttributes<HTMLDivElement> & {
	reference?: React.RefObject<HTMLDivElement> | undefined;
};

export function InputOTPSeparator({
	className,
	...props
}: InputOTPSeparatorProps) {
	const { reference: ref } = props;

	return (
		<div
			ref={ref}
			role="separator"
			className={cn("", className, {})}
			{...props}
		>
			<DotFilledIcon />
		</div>
	);
}
