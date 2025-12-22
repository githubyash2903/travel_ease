import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function HolidayPackageForm({ value = {}, onSubmit }: any) {
  const [form, setForm] = useState({
    title: "",
    destination: "",
    category: "",
    overview: "",
    duration_days: 1,
    duration_nights: 0,
    price: 0,
    taxes: 0,
    rating: 0,
    min_persons: 1,
    cover_image: "",
    images: [],
    inclusions: [],
    itinerary: [],
    is_active: true,
    ...value,
  });

  const update = (k: string, v: any) =>
    setForm((p: any) => ({ ...p, [k]: v }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Title *">
          <Input value={form.title} onChange={e => update("title", e.target.value)} />
        </Field>

        <Field label="Destination *">
          <Input value={form.destination} onChange={e => update("destination", e.target.value)} />
        </Field>

        <Field label="Category *">
          <Input value={form.category} onChange={e => update("category", e.target.value)} />
        </Field>

        <Field label="Min Persons *">
          <Input type="number" value={form.min_persons} onChange={e => update("min_persons", +e.target.value)} />
        </Field>

        <Field label="Duration Days *">
          <Input type="number" value={form.duration_days} onChange={e => update("duration_days", +e.target.value)} />
        </Field>

        <Field label="Duration Nights *">
          <Input type="number" value={form.duration_nights} onChange={e => update("duration_nights", +e.target.value)} />
        </Field>

        <Field label="Price *">
          <Input type="number" value={form.price} onChange={e => update("price", +e.target.value)} />
        </Field>

        <Field label="Taxes">
          <Input type="number" value={form.taxes} onChange={e => update("taxes", +e.target.value)} />
        </Field>

        <Field label="Rating">
          <Input type="number" step="0.1" value={form.rating} onChange={e => update("rating", +e.target.value)} />
        </Field>

        <Field label="Cover Image URL *">
          <Input value={form.cover_image} onChange={e => update("cover_image", e.target.value)} />
        </Field>
      </div>

      <Field label="Overview">
        <Textarea
          rows={4}
          value={form.overview}
          onChange={e => update("overview", e.target.value)}
        />
      </Field>

      <Field label="Inclusions (comma separated)">
        <Input
          value={form.inclusions.join(",")}
          onChange={e =>
            update("inclusions", e.target.value.split(",").map(s => s.trim()))
          }
        />
      </Field>

      <Field label="Gallery Images (comma separated URLs)">
        <Input
          value={form.images.join(",")}
          onChange={e =>
            update("images", e.target.value.split(",").map(s => s.trim()))
          }
        />
      </Field>

      <Field label="Itinerary (JSON)">
        <Textarea
          rows={5}
          value={JSON.stringify(form.itinerary, null, 2)}
          onChange={e => {
            try {
              update("itinerary", JSON.parse(e.target.value));
            } catch {
              // ignore invalid JSON while typing
            }
          }}
        />
      </Field>

      <div className="flex items-center gap-2">
        <Checkbox
          checked={form.is_active}
          onCheckedChange={v => update("is_active", Boolean(v))}
        />
        <Label>Active</Label>
      </div>

      <Button className="w-full" onClick={() => onSubmit(form)}>
        Save Package
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
