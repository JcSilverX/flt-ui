import React from "react";
import cn from "@/lib/utils/cn";
import SliderContext from "@/context/slider-context-provider";
import useControllableState from "@/lib/hooks/use-controllable-state";
import useSliderContext from "@/lib/hooks/use-slider-context";
import { clamp } from "@/lib/utils/clamp";

const SliderProvider = SliderContext.Provider;

export type TDirection = "ltr" | "rtl";
export type TPointerEvent = React.PointerEvent<HTMLSpanElement>;

type SlideProviderProps = React.HTMLAttributes<HTMLSpanElement> & {
	reference?: React.RefObject<HTMLSpanElement> | undefined;
	name?: string | undefined;
	disabled?: boolean | undefined;
	orientation?: "horizontal" | "vertical" | undefined;
	dir?: TDirection | undefined;
	min?: number | undefined;
	max?: number | undefined;
	step?: number | undefined;
	value?: number | undefined;
	defaultValue?: number | undefined;
	onValueChange?: React.Dispatch<React.SetStateAction<number>> | undefined;
	onValueCommit?: React.Dispatch<React.SetStateAction<number>> | undefined;
	inverted?: boolean | undefined;
};

export default function Slider({
	name,
	min = 0,
	max = 100,
	step = 1,
	orientation = "horizontal",
	disabled = false,
	defaultValue,
	value: valueProp,
	onValueChange = () => {},
	onValueCommit = () => {},
	inverted = false,
	className,
	...props
}: SlideProviderProps) {
	// state
	const [value = 0, setValue] = useControllableState({
		prop: valueProp,
		defaultProp: defaultValue as number,
		onChange: onValueChange as React.Dispatch<React.SetStateAction<number>>,
	});
	const [isSliding, setIsSliding] = React.useState<boolean>(false);

	// derived state

	// event handlers / actions
	const handlePointerDown = (evt: TPointerEvent): void => {
		setIsSliding(true);

		const rect = evt.currentTarget.getBoundingClientRect();

		const newValue = updateValue(evt, rect);
		setValue(newValue);

		evt.currentTarget.setPointerCapture(evt.pointerId);
		evt.preventDefault();
	};

	const handlePointerMove = (evt: TPointerEvent): void => {
		if (!isSliding) return;

		const rect = evt.currentTarget.getBoundingClientRect();
		const newValue = updateValue(evt, rect);

		setValue(newValue);
		onValueChange(newValue);

		evt.preventDefault();
	};

	const handlePointerUp = (evt: TPointerEvent): void => {
		setIsSliding(false);

		const rect = evt.currentTarget.getBoundingClientRect();

		const newValue = updateValue(evt, rect);
		setValue(newValue);
		onValueCommit(newValue);

		evt.currentTarget.releasePointerCapture(evt.pointerId);
		evt.preventDefault();
	};

	const handlePointerCancel = (evt: TPointerEvent): void => {
		setIsSliding(false);
		setValue(0);
	};

	const updateValue = (evt: TPointerEvent, rect: DOMRect): number => {
		const { clientX, clientY } = evt;

		const percent =
			orientation === "horizontal"
				? (clientX - rect.left) / rect.width
				: (rect.bottom - clientY) / rect.height;

		const rawValue = min + percent * (max - min);

		const steps = Math.round((rawValue - min) / step);
		const adjustedValue = min + steps * step;

		const newValue = clamp(adjustedValue, [min, max]);

		return inverted ? max - newValue + min : newValue;
	};

	const slots = {
		name,
		disabled,
		min,
		max,
		value,
		orientation,
		handlePointerDown,
		handlePointerMove,
		handlePointerUp,
		handlePointerCancel,
	};

	return (
		<SliderProvider value={slots}>
			<SliderImpl className={cn(className)} {...props}>
				<SliderTrack>
					<SliderRange />
				</SliderTrack>
				<SliderThumb />
			</SliderImpl>
		</SliderProvider>
	);
}

type SliderProps = React.HTMLAttributes<HTMLSpanElement> & {
	reference?: React.RefObject<HTMLSpanElement> | undefined;
};

export function SliderImpl({ className, ...props }: SliderProps) {
	const {
		handlePointerDown,
		handlePointerMove,
		handlePointerUp,
		handlePointerCancel,
	} = useSliderContext();

	return (
		<span
			onPointerDown={handlePointerDown}
			onPointerMove={handlePointerMove}
			onPointerUp={handlePointerUp}
			onPointerCancel={handlePointerCancel}
			className={cn(
				"relative flex w-full touch-none select-none items-center",
				className,
				{}
			)}
			{...props}
		/>
	);
}

type SliderTrackProps = React.HTMLAttributes<HTMLSpanElement> & {
	reference?: React.RefObject<HTMLSpanElement> | undefined;
};

export function SliderTrack({ className, ...props }: SliderTrackProps) {
	return (
		<span
			className={cn(
				"relative h-1.5 grow overflow-hidden rounded-full bg-black/20",
				className,
				{}
			)}
			{...props}
		/>
	);
}

type SliderRangeProps = React.HTMLAttributes<HTMLSpanElement> & {
	reference?: React.RefObject<HTMLSpanElement> | undefined;
};

export function SliderRange({ className, ...props }: SliderRangeProps) {
	const { value } = useSliderContext();

	return (
		<span
			className={cn("absolute h-full bg-black/50", className, {})}
			style={{
				left: "0%",
				right: `${100 - value}%`,
			}}
			{...props}
		/>
	);
}

type SliderThumbProps = React.HTMLAttributes<HTMLSpanElement> & {
	reference?: React.RefObject<HTMLSpanElement> | undefined;
};

export function SliderThumb({ className, ...props }: SliderThumbProps) {
	const { value, min, max, orientation } = useSliderContext();

	return (
		<span
			style={{
				position: "absolute",
				left: `calc(${value}% - .5rem)`,
			}}
		>
			<span
				role="slider"
				aria-valuemin={min}
				aria-valuemax={max}
				aria-orientation={orientation}
				aria-valuenow={value}
				data-jsx-orientation={orientation}
				tabIndex={0}
				className={cn(
					"block h-4 w-4 rounded-full border border-black/50 bg-white shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500 disabled:pointer-events-none disabled:opacity-50",
					className,
					{}
				)}
				{...props}
			/>
		</span>
	);
}
