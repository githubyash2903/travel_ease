import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function FlightForm({ value = {}, onSubmit }: any) {
  const [form, setForm] = useState({
    airline: "",
    source: "",
    destination: "",
    departure: "",
    arrival: "",
    total_seats: 1,
    price: 0,
    stops: 0,
    is_active: true,
    ...value,
  });

  const update = (k: string, v: any) =>
    setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Airline *">
          <Input value={form.airline} onChange={e => update("airline", e.target.value)} />
        </Field>

        <Field label="Total Seats *">
          <Input type="number" value={form.total_seats} onChange={e => update("total_seats", +e.target.value)} />
        </Field>

        <Field label="Source (IATA) *">
          <Input maxLength={3} value={form.source} onChange={e => update("source", e.target.value.toUpperCase())} />
        </Field>

        <Field label="Destination (IATA) *">
          <Input maxLength={3} value={form.destination} onChange={e => update("destination", e.target.value.toUpperCase())} />
        </Field>

        <Field label="Departure *">
          <Input type="datetime-local" value={form.departure} onChange={e => update("departure", e.target.value)} />
        </Field>

        <Field label="Arrival *">
          <Input type="datetime-local" value={form.arrival} onChange={e => update("arrival", e.target.value)} />
        </Field>

        <Field label="Price *">
          <Input type="number" value={form.price} onChange={e => update("price", +e.target.value)} />
        </Field>

        <Field label="Stops">
          <Input type="number" value={form.stops} onChange={e => update("stops", +e.target.value)} />
        </Field>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Checkbox checked={form.is_active} onCheckedChange={v => update("is_active", Boolean(v))} />
        <Label>Active</Label>
      </div>

      <Button className="w-full" onClick={() => onSubmit(form)}>
        Save Flight
      </Button>
    </div>
  );
}

function Field({ label, children }: any) {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
