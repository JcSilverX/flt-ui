import AlertDialogExample from "@/components/alert-dialog/alert-dialog";
import { AlertExample1 } from "@/components/alert/alert";
import { Example4 } from "@/components/avatar/avatar";
import Button from "@/components/button/button";
import { CarouselExample1 } from "@/components/carousel/stories/carousel-example1";
import { Example1 } from "@/components/dialog/dialog";

export default function Home() {
  return (
    <main className="grid py-16 gap-4">
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
    </main>
  );
}
