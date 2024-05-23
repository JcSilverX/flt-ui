import React from "react";
import Sheet, {
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../sheet";
import Label from "@/components/label/label";
import Input from "@/components/input/input";

export default function SheetDemo() {
	return (
		<Sheet>
			<SheetTrigger variant={"outline"}>Open</SheetTrigger>

			<SheetContent>
				<SheetHeader>
					<SheetTitle>Edit profile</SheetTitle>
					<SheetDescription>
						Make changes to your profile here. Click save when you{"'"}re done.
					</SheetDescription>
				</SheetHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Name
						</Label>
						<Input
							id="name"
							placeholder="Pedro Duarte"
							className="col-span-3"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="username" className="text-right">
							Username
						</Label>
						<Input
							id="username"
							placeholder="@peduarte"
							className="col-span-3"
						/>
					</div>
				</div>
				<SheetFooter>
					<SheetClose type="submit">Save changes</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
