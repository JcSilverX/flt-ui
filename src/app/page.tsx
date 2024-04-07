import AlertDialogExample from "@/components/alert-dialog/alert-dialog";
import { AlertExample1 } from "@/components/alert/alert";
import { Example4 } from "@/components/avatar/avatar";
import Button from "@/components/button/button";
import { CarouselExample1 } from "@/components/carousel/stories/carousel-example1";
import CarouselExample2 from "@/components/carousel/stories/carousel-example2";
import { Example1 } from "@/components/dialog/dialog";
import DropdownExample1 from "@/components/dropdown/stories/dropdown-example1";
import DropdownExample2 from "@/components/dropdown/stories/dropdown-example2";

export default function Home() {
  return (
    <main className="grid gap-4">
      {/* buttons */}
      {/* <Button size={"sm"}>Default</Button>
      <Button variant={"destructive"}>Destructive</Button>
      <Button variant={"outline"}>outline</Button>
      <Button variant={"primary"}>Primary</Button>
      <Button variant={"secondary"}>Secondary</Button>
      <Button variant={"ghost"}>Ghost</Button>
      <Button variant={"link"}>Link</Button> */}

      {/* dialog */}
      {/* <Example1 /> */}

      {/* Alert */}
      {/* <AlertExample1 /> */}

      {/* Alert Dialog */}
      {/* <AlertDialogExample /> */}

      {/* Avatar */}
      {/* <Example4 /> */}

      {/* Dropdown */}
      <header className="h-[500px] flex justify-end items-center">
        <nav>
          <ul>
            <li>
              <DropdownExample1 />
            </li>
          </ul>
        </nav>
      </header>
      {/* <div className="grid grid-flow-col-dense h-full justify-between">

      </div> */}

      {/* Carousel */}
      {/* <CarouselExample1 />
      <CarouselExample2 /> */}
    </main>
  );
}
