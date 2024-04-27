// 'use client'
import ToggleGroup, {
  ToggleGroupItem,
} from "@/components/toggle-group/toggle-group";

export default function Home() {
  return (
    <main className="h-dvh grid gap-4 place-items-center">
      <ToggleGroup type="single">
        <ToggleGroupItem value="a" aria-label="Left aligned">
          A
        </ToggleGroupItem>
        <ToggleGroupItem value="b" aria-label="Center aligned">
          B
        </ToggleGroupItem>
        <ToggleGroupItem value="c" aria-label="Right aligned">
          C
        </ToggleGroupItem>
      </ToggleGroup>
    </main>
  );
}
