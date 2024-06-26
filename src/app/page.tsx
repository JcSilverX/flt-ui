import { AvatarDemo } from "@/components/avatar/avatar";
import BadgeExample1 from "@/components/badge/stories/badge-example1";
import { BreadcrumbExample1 } from "@/components/breadcrumb/breadcrumb";
import Button from "@/components/button/button";
import { CheckboxExample } from "@/components/checkbox/checkbox";
import { CollapsibleExample } from "@/components/collapsible/collapsible";
import HoverCardDemo from "@/components/hover-card/stories/hover-card-demo";
import InputOTPDemo from "@/components/input-otp/stories/input-opt-demo";
import InputDemo from "@/components/input/stories/input-demo";
import LabelDemo from "@/components/label/stories/label-demo";
import SheetDemo from "@/components/sheet/stories/sheet.stories";
import React from "react";

export default function Home() {
	return (
		<main className="h-dvh grid place-content-center">
			<SheetDemo />
		</main>
	);
}
