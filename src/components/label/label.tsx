import cn from "@/lib/utils/cn";
import React from "react";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
	reference?: React.RefObject<HTMLLabelElement> | undefined;
};

export default function Label({ className, ...props }: LabelProps) {
	const { reference: ref } = props;

	return (
		<label
			ref={ref}
			className={cn(
				"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
				className,
				{}
			)}
			{...props}
		/>
	);
}
