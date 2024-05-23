import React from "react";
import HoverCard, {
	HoverCardContent,
	HoverCardPortal,
	HoverCardTrigger,
} from "../hover-card";
import Avatar, {
	AvatarFallback,
	AvatarImage,
} from "@/components/avatar/avatar";

export default function HoverCardDemo() {
	return (
		<HoverCard>
			<HoverCardTrigger variant={"link"}>@nextjs</HoverCardTrigger>

			<HoverCardContent className="w-80">
				<div className="flex justify-between space-x-4">
					<Avatar>
						<AvatarImage
							src="https://avatars.githubusercontent.com/u/125976402?v=4"
							alt="jcsilverx"
						/>
						<AvatarFallback>JSX</AvatarFallback>
					</Avatar>

					<div className="space-y-1">
						<h4 className="text-sm font-semibold">@nextjs</h4>
						<p className="text-sm">
							The React Framework – created and maintained by @vercel.
						</p>

						<div className="flex items-center pt-2">
							<span className="text-xs text-muted-foreground">
								Joined December 2024
							</span>
						</div>
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	);
}
