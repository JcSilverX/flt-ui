import cn from "@/lib/utils/cn";
import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	reference?: React.RefObject<HTMLInputElement> | undefined;
};

export default function Input({ className, ...props }: InputProps) {
	const { reference: ref, type } = props;

	return (
		<input
			ref={ref}
			type={type}
			className={cn(
				"flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-transparent file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
				className,
				{}
			)}
			{...props}
		/>
	);
}
