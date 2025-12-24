// components/room/RoomFilters.tsx
import { Input } from "@/components/ui/input";
import { useSearchParams } from "react-router-dom";

export function RoomFilters() {
  const [params, setParams] = useSearchParams();

  function update(k: string, v: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    v ? params.set(k, v) : params.delete(k);
    setParams(params);
  }

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Min Price"
        type="number"
        onBlur={e => update("minPrice", e.target.value)}
      />
      <Input
        placeholder="Max Price"
        type="number"
        onBlur={e => update("maxPrice", e.target.value)}
      />
    </div>
  );
}
