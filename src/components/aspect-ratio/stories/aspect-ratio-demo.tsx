import React from "react";
import Image from "next/image";
import AspectRatio from "../aspect-ratio";

export default function AspectRatioDemo() {
	return (
		<div className="w-[28.125rem] overflow-clip rounded-md shadow">
			<AspectRatio ratio={16 / 9} className="bg-gray-400">
				<Image
					src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
					alt="Photo by Drew Beamer"
					fill
					className="rounded-md object-cover"
				/>
			</AspectRatio>
		</div>
	);
}
