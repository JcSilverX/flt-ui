import React from "react";
import ScrollArea from "../scroll-area";
import Separator from "@/components/separator/separator";

const TAG_COUNT = 50;
const tags = Array.from({ length: TAG_COUNT }).map(
	(_, i, a) => `v1.2.0-beta.${a.length - i}`
);

export default function ScrollAreaExample() {
	return (
		<ScrollArea className="h-72 w-48 rounded-md border">
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
