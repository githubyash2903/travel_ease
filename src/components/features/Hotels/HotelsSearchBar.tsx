// components/hotel/HotelSearchBar.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";

export function HotelSearchBar() {
  const [params, setParams] = useSearchParams();

  function set(key: string, val: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    val ? params.set(key, val) : params.delete(key);
  }

  function apply() {
    setParams(params);
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-2 bg-background p-4 rounded-xl shadow-sm border">
      <Input placeholder="City" defaultValue={params.get("city") ?? ""} onChange={e => set("city", e.target.value)} />
      <Input type="date" defaultValue={params.get("checkin") ?? ""} onChange={e => set("checkin", e.target.value)} />
      <Input type="date" defaultValue={params.get("checkout") ?? ""} onChange={e => set("checkout", e.target.value)} />
      <Input type="number" min={1} placeholder="Guests" defaultValue={params.get("guests") ?? ""} onChange={e => set("guests", e.target.value)} />
      <Input type="number" min={1} placeholder="Rooms" defaultValue={params.get("rooms") ?? ""} onChange={e => set("rooms", e.target.value)} />
      <Button onClick={apply}>Search</Button>
    </div>
  );
}
