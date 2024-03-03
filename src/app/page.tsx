import { AlertExample1 } from "@/components/alert/alert";
import Button from "@/components/button/button";
import Dialog from "@/components/dialog/dialog";

export default function Home() {
  return (
    <main className="grid pt-4 gap-4 max-w-[20rem] mx-auto">
      {/* buttons */}
      <Button size={"sm"}>Default</Button>
      <Button variant={"destructive"}>Destructive</Button>
      <Button variant={"outline"}>outline</Button>
      <Button variant={"primary"}>Primary</Button>
      <Button variant={"secondary"}>Secondary</Button>
      <Button variant={"ghost"}>Ghost</Button>
      <Button variant={"link"}>Link</Button>

      {/* dialog */}
      <Dialog />

      {/* Alert */}
      <AlertExample1 />
    </main>
  );
}
