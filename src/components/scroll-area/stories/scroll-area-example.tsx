/* eslint-disable @next/next/no-img-element */
import React from "react";
import ScrollArea, {
	ScrollAreaCorner,
	ScrollAreaScrollbar,
} from "../scroll-area";
import Separator from "@/components/separator/separator";

const TAG_COUNT = 50;
const tags = Array.from({ length: TAG_COUNT }).map(
	(_, i, a) => `v1.2.0-beta.${a.length - i}`
);

export interface Artwork {
	artist: string;
	art: string;
}

export const works: Artwork[] = [
	{
		artist: "Ornella Binni",
		art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
	},
	{
		artist: "Tom Byrom",
		art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
	},
	{
		artist: "Vladimir Malyavko",
		art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
	},
];

export default function ScrollAreaExample() {
	return (
		<>
			<ScrollAreaDemo />
			{/*  */}
			<ScrollAreaHorizontalDemo />
		</>
	);
}

export function ScrollAreaDemo() {
	return (
		<ScrollArea className="h-72 w-48 rounded-md border mb-3">
			<div className="p-4">
				<h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>

				{tags.map((tag) => (
					<React.Fragment key={tag}>
						<div className="text-sm">{tag}</div>
						<Separator className="my-2 bg-black/15" />
					</React.Fragment>
				))}
			</div>
		</ScrollArea>
	);
}

export function ScrollAreaHorizontalDemo() {
	const ref = React.useRef(null);

	return (
		<ScrollArea
			orientation="horizontal"
			className="w-96 whitespace-nowrap rounded-md border"
		>
			<div className="flex w-max space-x-4 p-4">
				{works.map((artwork) => (
					<figure key={artwork.artist} className="flex-shirnk-0">
						<div className="overflow-clip rounded-md">
							<img
								src={artwork.art}
								alt={`Photo by ${artwork.artist}`}
								className="aspect-[3/4] h-fit w-fit object-cover"
								width={300}
								height={400}
							/>
						</div>

						<figcaption className="pt-2 text-xs text-gray-700">
							Photo by{" "}
							<span className="font-semibold text-gray-950">
								{artwork.artist}
							</span>
						</figcaption>
					</figure>
				))}
			</div>
		</ScrollArea>
	);
}
