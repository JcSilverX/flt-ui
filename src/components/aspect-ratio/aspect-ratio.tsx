import cn from "@/lib/utils/cn";
import React from "react";

type AspectRatioProps = React.HTMLAttributes<HTMLDivElement> & {
	reference?: React.RefObject<HTMLDivElement> | undefined;
	/**
	 * The desired ratio
	 */
	ratio?: number | undefined;
};

export default function AspectRatio({
	ratio = 1 / 1,
	className,
	...props
}: AspectRatioProps) {
	const { reference: ref } = props;

	return (
		<div
			data-jsx-aspect-ratio-wrapper=""
			className={cn(`relative w-full`, className, {})}
			style={{
				paddingBottom: `${100 / ratio}%`,
			}}
		>
			<div
				ref={ref}
				className={cn("absolute top-0 right-0 bottom-0 left-0", {})}
				{...props}
			/>
		</div>
	);
}
