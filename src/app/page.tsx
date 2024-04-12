import AlertDialogExample from "@/components/alert-dialog/alert-dialog";
import { AlertExample1 } from "@/components/alert/alert";
import { Example4 } from "@/components/avatar/avatar";
import Button from "@/components/button/button";
import { CarouselExample1 } from "@/components/carousel/stories/carousel-example1";
import CarouselExample2 from "@/components/carousel/stories/carousel-example2";
import { Example1 } from "@/components/dialog/dialog";
import DropdownExample1 from "@/components/dropdown/stories/dropdown-example1";
import DropdownExample2 from "@/components/dropdown/stories/dropdown-example2";
import DropdownExample3 from "@/components/dropdown/stories/dropdown-example3";
import DropdownExample4 from "@/components/dropdown/stories/dropdown-example4";
import DropdownExample5 from "@/components/dropdown/stories/dropdown-example5";
import DropdownExample6 from "@/components/dropdown/stories/dropdown-example6";
import DropdownExample7 from "@/components/dropdown/stories/dropdown-example7";
import DropdownExample8 from "@/components/dropdown/stories/dropdown-example8";
import DropdownExample9 from "@/components/dropdown/stories/dropdown-example9";
import { SpinnerExample } from "@/components/spinner/spinner";

export default function Home() {
  return (
    <main className="h-dvh grid gap-4">
      {/* buttons */}
      <Button size={"sm"}>Default</Button>
      <Button variant={"destructive"}>Destructive</Button>
      <Button variant={"outline"}>outline</Button>
      <Button variant={"primary"}>Primary</Button>
      <Button variant={"secondary"}>Secondary</Button>
      <Button variant={"ghost"}>Ghost</Button>
      <Button variant={"link"}>Link</Button>

      {/* dialog */}
      <Example1 />

      {/* Alert */}
      <AlertExample1 />

      {/* Alert Dialog */}
      <AlertDialogExample />

      {/* Avatar */}
      <Example4 />

      {/* Carousel */}
      <CarouselExample1 />
      <CarouselExample2 />

      {/* Dropdown */}
      <DropdownExample1 />

      {/* Spinner */}
      <div className="flex justify-center">
        <SpinnerExample />
      </div>
    </main>
  );
}
