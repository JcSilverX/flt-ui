"use client";

/* eslint-disable @next/next/no-img-element */
import React from "react";
import cn from "@/lib/utils/cn";
import AvatarContext from "@/context/avatar-context-provider";
import useAvatarContext from "@/lib/hooks/use-avatar-context";
import useIsMounted from "@/lib/hooks/use-is-mounted";

export function AvatarDemo() {
	return (
		<Avatar>
			<AvatarImage
				src="https://avatars.githubusercontent.com/u/125976402?v=4"
				alt="jcsilverx"
			/>
			<AvatarFallback>JSX</AvatarFallback>
		</Avatar>
	);
}

const AvatarProvider = AvatarContext.Provider;

export type ImageLoadingStatus = "idle" | "loading" | "loaded" | "error";

type AvatarProps = React.HTMLAttributes<HTMLSpanElement> & {
	reference?: React.RefObject<HTMLSpanElement> | undefined;
};

export default function Avatar({ className, ...props }: AvatarProps) {
	const { reference: ref } = props;

	// state
	const [imageLoadingStatus, setImageLoadingStatus] =
		React.useState<ImageLoadingStatus>("idle");

	// derived state

	// event handlers / actions

	// scope
	const scope = { imageLoadingStatus, setImageLoadingStatus };

	return (
		<AvatarProvider value={scope}>
			<span
				ref={ref}
				className={cn(
					"relative flex h-10 w-10 flex-shrink-0 overflow-hidden rounded-full",
					className
				)}
				{...props}
			/>
		</AvatarProvider>
	);
}

type AvatarImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
	reference?: React.RefObject<HTMLImageElement> | undefined;
	/**
	 * A callback providing information about the loading status of the image. This is useful in case you want to control more precisely what to render as the image is loading.
	 * @param status
	 * @returns void
	 */
	onLoadingStatusChange?: (status: ImageLoadingStatus) => void;
};

export function AvatarImage({
	onLoadingStatusChange = () => {},
	className,
	...props
}: AvatarImageProps) {
	const { reference: ref, src, alt } = props;
	const { setImageLoadingStatus: onImageLoadingStatusChange } =
		useAvatarContext();

	const imageLoadingStatus = useImageLoadingStatus(src);

	React.useLayoutEffect(() => {
		const handleLoadingStatusChange = (status: ImageLoadingStatus): void => {
			onLoadingStatusChange(status);
			onImageLoadingStatusChange(status);
		};

		if (imageLoadingStatus !== "idle") {
			handleLoadingStatusChange(imageLoadingStatus);
		}
	}, [onLoadingStatusChange, imageLoadingStatus, onImageLoadingStatusChange]);

	return (
		imageLoadingStatus === "loaded" && (
			<img
				ref={ref}
				src={src}
				alt={alt}
				className={cn(
					"aspect-square object-cover w-full h-full",
					className,
					{}
				)}
				{...props}
			/>
		)
	);
}

type AvatarFallbackProps = React.HTMLAttributes<HTMLSpanElement> & {
	reference?: React.RefObject<HTMLSpanElement> | undefined;
	/**
	 * Useful for delaying rendering so it only appears for those with slower connections.
	 */
	delayMs?: number | undefined;
};

export function AvatarFallback({
	delayMs,
	className,
	...props
}: AvatarFallbackProps) {
	const { reference: ref } = props;
	const { imageLoadingStatus } = useAvatarContext();
	const [canRender, setCanRender] = React.useState<boolean>(
		delayMs === undefined
	);

	React.useEffect(() => {
		if (delayMs !== undefined) {
			const timerId = window.setTimeout(() => setCanRender(true), delayMs);

			return () => window.clearTimeout(timerId);
		}
	}, [delayMs]);

	return (
		canRender &&
		imageLoadingStatus !== "loaded" && (
			<span
				ref={ref}
				className={cn(
					"flex items-center justify-center h-full w-full bg-gray-200 rounded-full",
					className,
					{}
				)}
				{...props}
			/>
		)
	);
}

export function useImageLoadingStatus(src?: string | undefined) {
	const [loadingStatus, setLoadingStatus] =
		React.useState<ImageLoadingStatus>("idle");

	React.useEffect(() => {
		if (!src) {
			setLoadingStatus("error");
			return;
		}

		let isMounted: boolean = true;
		const image = new Image();
		setLoadingStatus("loading");

		const updateStatus = (status: ImageLoadingStatus) => (): void => {
			if (!isMounted) return;

			setLoadingStatus(status);
		};

		image.addEventListener("load", updateStatus("loaded"));
		image.addEventListener("error", updateStatus("error"));
		image.src = src;

		return () => {
			isMounted = false;

			image.removeEventListener("load", updateStatus("loaded"));
			image.removeEventListener("error", updateStatus("error"));
		};
	}, [src]);

	return loadingStatus;
}
